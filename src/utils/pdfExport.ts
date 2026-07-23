import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ResumeData } from '../types/resume';

// Cache converted color results for maximum performance
const colorCache = new Map<string, string>();

/**
 * Converts an oklch(...) or complex CSS color string to a standard rgb(...) or rgba(...) color
 * using the browser's DOM CSS computation.
 */
const convertOklchColor = (oklchStr: string): string => {
  if (!oklchStr) return 'rgb(0, 0, 0)';
  const normalized = oklchStr.trim().toLowerCase();
  if (colorCache.has(normalized)) {
    return colorCache.get(normalized)!;
  }

  let result = 'rgb(79, 70, 229)'; // Sensible fallback (indigo)
  try {
    const div = document.createElement('div');
    div.style.color = oklchStr;
    document.body.appendChild(div);
    const computed = window.getComputedStyle(div).color;
    document.body.removeChild(div);
    if (computed && computed !== '' && !computed.toLowerCase().includes('oklch')) {
      result = computed;
    }
  } catch (e) {
    // Fallback if computation fails
  }

  colorCache.set(normalized, result);
  return result;
};

/**
 * Replaces all unsupported oklch(...) color functions and keywords in CSS string with standard browser-supported RGB/RGBA colors.
 */
export const sanitizeCssOklch = (cssText: string): string => {
  if (!cssText || !cssText.toLowerCase().includes('oklch')) return cssText;
  let sanitized = cssText.replace(/oklch\s*\([^\)]+\)/gi, (match) => convertOklchColor(match));
  sanitized = sanitized.replace(/in\s+oklch/gi, 'in srgb');
  return sanitized;
};

/**
 * Exports any target resume preview element as a high-quality A4 PDF document.
 * Handles modern Tailwind v4 oklch color function conversion in html2canvas.
 */
export const exportResumeToPDF = async (
  resume: ResumeData,
  onToast: (msg: string, type?: 'success' | 'error' | 'info') => void,
  targetElementId: string = 'resume-preview-container'
) => {
  onToast('Generating high-resolution vector PDF...', 'info');
  const previewContainer = document.getElementById(targetElementId);
  if (!previewContainer) {
    onToast('Resume preview element not found', 'error');
    return;
  }

  try {
    const canvas = await html2canvas(previewContainer, {
      scale: 2.5,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: 1200,
      onclone: (clonedDoc) => {
        // Force light mode on cloned body so preview renders clean paper colors
        clonedDoc.documentElement.classList.remove('dark');
        clonedDoc.body.classList.remove('dark');

        const clonedPreview = clonedDoc.getElementById(targetElementId);
        if (clonedPreview) {
          clonedPreview.style.transform = 'none';
          clonedPreview.style.boxShadow = 'none';
          clonedPreview.style.border = 'none';
          clonedPreview.style.padding = '0';
          clonedPreview.style.margin = '0 auto';
          clonedPreview.style.backgroundColor = '#ffffff';
        }

        // 1. Process and replace all <style> elements in clonedDoc
        const styleElements = Array.from(clonedDoc.querySelectorAll('style'));
        styleElements.forEach((oldStyle) => {
          let cssText = oldStyle.textContent || '';
          if (!cssText && oldStyle.sheet) {
            try {
              const rules = oldStyle.sheet.cssRules;
              if (rules) {
                for (let i = 0; i < rules.length; i++) {
                  cssText += rules[i].cssText + '\n';
                }
              }
            } catch (e) {
              // ignore
            }
          }

          if (cssText.toLowerCase().includes('oklch')) {
            const sanitized = sanitizeCssOklch(cssText);
            const newStyle = clonedDoc.createElement('style');
            newStyle.textContent = sanitized;
            if (oldStyle.parentNode) {
              oldStyle.parentNode.replaceChild(newStyle, oldStyle);
            } else {
              clonedDoc.head.appendChild(newStyle);
            }
          }
        });

        // 2. Process and replace all <link rel="stylesheet"> elements
        const linkElements = Array.from(clonedDoc.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]'));
        linkElements.forEach((link) => {
          try {
            let rulesText = '';
            if (link.sheet) {
              const rules = link.sheet.cssRules;
              if (rules) {
                for (let i = 0; i < rules.length; i++) {
                  rulesText += rules[i].cssText + '\n';
                }
              }
            }
            if (rulesText.toLowerCase().includes('oklch')) {
              const sanitized = sanitizeCssOklch(rulesText);
              const newStyle = clonedDoc.createElement('style');
              newStyle.textContent = sanitized;
              clonedDoc.head.appendChild(newStyle);
              link.remove();
            }
          } catch (e) {
            // Ignore potential cross-origin stylesheet access restriction
          }
        });

        // 3. Traverse all elements in clonedDoc and replace any oklch in inline style or computed properties
        const allElements = Array.from(clonedDoc.querySelectorAll<HTMLElement>('*'));
        allElements.forEach((el) => {
          // Sanitize style attribute
          const styleAttr = el.getAttribute('style');
          if (styleAttr && styleAttr.toLowerCase().includes('oklch')) {
            el.setAttribute('style', sanitizeCssOklch(styleAttr));
          }

          // Force explicit inline colors for text, background, and borders if computed value contains oklch
          try {
            const computed = window.getComputedStyle(el);
            const colorProps = ['color', 'backgroundColor', 'borderColor', 'outlineColor', 'fill', 'stroke'] as const;
            colorProps.forEach((prop) => {
              const val = computed[prop];
              if (val && val.toLowerCase().includes('oklch')) {
                el.style[prop] = convertOklchColor(val);
              }
            });
          } catch (e) {
            // ignore
          }
        });
      }
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.98);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    });

    const pdfWidth = 210; // A4 mm width
    const pdfPageHeight = 297; // A4 mm height
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    // Render page 1
    pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
    heightLeft -= pdfPageHeight;

    // Multi-page handling if resume exceeds 1 A4 page
    while (heightLeft > 5) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfPageHeight;
    }

    const nameSlug = (resume.personal.fullName || 'Resume').replace(/[^a-zA-Z0-9]/g, '_');
    const titleSlug = (resume.title || 'Draft').replace(/[^a-zA-Z0-9]/g, '_');
    const fileName = `${nameSlug}_${titleSlug}_VITA.pdf`;

    pdf.save(fileName);
    onToast(`Downloaded ${fileName} successfully!`, 'success');
  } catch (err) {
    console.error('PDF Export Error:', err);
    onToast('Failed to export PDF: ' + (err instanceof Error ? err.message : String(err)), 'error');
  }
};

