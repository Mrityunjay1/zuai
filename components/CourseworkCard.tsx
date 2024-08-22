import { Card } from "@/components/ui/card";
import { FileIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";

interface PdfViewerProps {
  pdfUrl: string;
}

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`;
export default function CourseworkCard({ pdfUrl }: PdfViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(false);

  console.log(pdfUrl);

  useEffect(() => {
    const renderPdf = async () => {
      if (!pdfUrl || !canvasRef.current) return;

      const loadingTask = pdfjsLib.getDocument(pdfUrl);
      const pdf = await loadingTask.promise;
      const page = await pdf.getPage(1); // Render the first page
      const viewport = page.getViewport({ scale: 1 });
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      if (!context) return;

      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport,
      };

      await page.render(renderContext).promise;
    };

    renderPdf();

    // Clean up
    return () => {
      if (canvasRef.current) {
        canvasRef.current.width = 0;
        canvasRef.current.height = 0;
      }
    };
  }, [pdfUrl]);
  return (
    <Card className="flex flex-col bg-slate-100 md:flex-row max-w-2xl p-4 space-x-4 space-y-4 md:space-y-0">
      <div className="w-1/4  h-64 md:h-auto relative">
        {loading ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-lg">
            <span>Loading PDF...</span>
          </div>
        ) : (
          <div className="relative">
            <canvas ref={canvasRef} className="w-full h-auto rounded-lg" />
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 hover:opacity-100 transition-opacity duration-200 rounded-lg"
            >
              <FileIcon className="w-8 h-8" />
              <span className="sr-only">Open PDF</span>
            </a>
          </div>
        )}
      </div>
      <div className="flex flex-col flex-1 justify-between lg:w-1/2">
        <div>
          <h2 className="text-xl font-bold">
            How does the temperature of a Copp...
          </h2>
          <p className="text-muted-foreground">
            How does the temperature of a Copper pipe affect the time it takes a
            magnet t...
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4">
          <div className="flex items-center bg-white space-x-2 rounded-full p-1">
            <LightbulbIcon className="w-3 h-3" />
            <p className="text-sm">Physics HL</p>
          </div>
          <div className="flex items-center bg-white space-x-2 rounded-full p-1">
            <ClockIcon className="w-3 h-3" />
            <span className="text-sm">18 min read</span>
          </div>
          <div className="flex items-center bg-white space-x-2 rounded-full p-1">
            <WholeWordIcon className="w-3 h-3" />
            <span className="text-sm">2388 words</span>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4">
          <div className="flex items-center bg-white space-x-2 rounded-full p-1">
            <StarIcon className="w-3 h-3" />
            <span className="text-sm">7/7</span>
          </div>
          <div className="flex items-center bg-white space-x-2 rounded-full p-1">
            <HandIcon className="w-3 h-" />
            <span className="text-sm">English</span>
          </div>
        </div>
      </div>
    </Card>
  );
}

function ClockIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function HandIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
      <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" />
      <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
      <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
    </svg>
  );
}

function LightbulbIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </svg>
  );
}

function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function WholeWordIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="7" cy="12" r="3" />
      <path d="M10 9v6" />
      <circle cx="17" cy="12" r="3" />
      <path d="M14 7v8" />
      <path d="M22 17v1c0 .5-.5 1-1 1H3c-.5 0-1-.5-1-1v-1" />
    </svg>
  );
}
