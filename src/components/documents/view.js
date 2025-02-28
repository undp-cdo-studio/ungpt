import React, { useEffect, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import 'pdfjs-dist/build/pdf.worker.entry';

const PdfViewer = ({ url }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const fetchPdf = async () => {
            const pdf = await pdfjsLib.getDocument(url).promise;
            const page = await pdf.getPage(1);
            const scale = 1.5;
            const viewport = page.getViewport({ scale });
            const canvas = canvasRef.current;
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            const renderContext = {
                canvasContext: canvas.getContext('2d'),
                viewport: viewport
            };
            await page.render(renderContext).promise;
        };

        fetchPdf();
    }, [url]);

    return <canvas ref={canvasRef}></canvas>;
};

export default PdfViewer;
