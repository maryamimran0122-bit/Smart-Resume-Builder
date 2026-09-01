import { ResumeData } from '../types/resume';

export const exportResumeToPDF = async (
    resume: ResumeData,
    onToast: (
        msg: string,
        type?: 'success' | 'error' | 'info'
    ) => void,
    targetElementId: string = 'resume-preview-container'
) => {

    console.log('PDF PRINT EXPORT STARTED');

    const resumeElement =
        document.getElementById(targetElementId);

    if (!resumeElement) {

        console.error(
            `#${targetElementId} was not found`
        );

        onToast(
            'Resume preview not found.',
            'error'
        );

        return;
    }

    try {

        onToast(
            'Preparing resume for PDF...',
            'info'
        );

        /*
         * Remember the current page state.
         */
        const originalTitle =
            document.title;

        /*
         * Create a temporary print stylesheet.
         *
         * IMPORTANT:
         * We are NOT cloning the resume.
         * We are NOT removing its existing CSS.
         *
         * Chrome will print the actual resume element
         * using the exact CSS currently displayed.
         */
        const printStyle =
            document.createElement('style');

        printStyle.id =
            'vita-pdf-print-style';

        printStyle.textContent = `

            @page {
                size: A4;
                margin: 0;
            }

            @media print {

                html,
                body {
                    width: 210mm !important;
                    min-width: 210mm !important;

                    margin: 0 !important;
                    padding: 0 !important;

                    background: white !important;
                }


                /*
                 * Hide everything on the application
                 * except the resume.
                 */
                body > * {
                    visibility: hidden !important;
                }


                /*
                 * Make the resume visible.
                 */
                #${targetElementId} {
                    visibility: visible !important;

                    display: block !important;

                    position: absolute !important;

                    left: 0 !important;
                    top: 0 !important;

                    width: 210mm !important;

                    min-width: 210mm !important;

                    margin: 0 !important;

                    padding: 0 !important;

                    transform: none !important;

                    box-shadow: none !important;

                    overflow: visible !important;
                }


                #${targetElementId} * {
                    visibility: visible !important;
                }


                /*
                 * Preserve exact colors.
                 */
                * {
                    -webkit-print-color-adjust: exact !important;
                    print-color-adjust: exact !important;
                }


                /*
                 * Do not let images get cropped.
                 */
                img {
                    -webkit-print-color-adjust: exact !important;
                    print-color-adjust: exact !important;
                }
            }
        `;


        document.head.appendChild(
            printStyle
        );


        /*
         * Give Chrome a moment to apply the print
         * stylesheet before printing.
         */
        await new Promise<void>(
            resolve => {
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        resolve();
                    });
                });
            }
        );


        /*
         * Make the browser title useful if the user
         * chooses Save to PDF.
         */
        const fullName =
            resume.personal?.fullName ||
            'Resume';

        const title =
            resume.title ||
            'Resume';

        const safeName =
            fullName
                .replace(
                    /[^a-zA-Z0-9]+/g,
                    '_'
                )
                .replace(
                    /^_+|_+$/g,
                    ''
                );

        const safeTitle =
            title
                .replace(
                    /[^a-zA-Z0-9]+/g,
                    '_'
                )
                .replace(
                    /^_+|_+$/g,
                    ''
                );

        document.title =
            `${safeName || 'Resume'}_${safeTitle || 'Resume'}`;


        /*
         * Tell the browser to print.
         *
         * Chrome understands the actual CSS:
         * - Tailwind
         * - gradients
         * - modern colors
         * - flex
         * - grid
         * - fonts
         * - borders
         * - icons
         */
        window.print();


        /*
         * Restore the page after printing.
         */
        const cleanup = () => {

            if (
                printStyle.parentNode
            ) {
                printStyle.parentNode
                    .removeChild(
                        printStyle
                    );
            }

            document.title =
                originalTitle;

            window.removeEventListener(
                'afterprint',
                cleanup
            );

            onToast(
                'PDF print dialog opened. Choose "Save to PDF".',
                'success'
            );
        };


        window.addEventListener(
            'afterprint',
            cleanup
        );

    } catch (error) {

        console.error(
            'PDF PRINT ERROR:',
            error
        );

        const message =
            error instanceof Error
                ? error.message
                : String(error);

        onToast(
            `PDF export failed: ${message}`,
            'error'
        );
    }
};