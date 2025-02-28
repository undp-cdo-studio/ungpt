declare module 'pdf-parse' {
    interface PDFData {
        text: string;
        numpages: number;
        info: {
            PDFFormatVersion: string;
            IsAcroFormPresent: boolean;
            IsXFAPresent: boolean;
            [key: string]: any;
        };
        metadata: any;
        version: string;
    }

    function pdfParse(dataBuffer: Buffer, options?: {
        pagerender?: (pageData: any) => string;
        max?: number;
        version?: string;
    }): Promise<PDFData>;

    export default pdfParse;
} 