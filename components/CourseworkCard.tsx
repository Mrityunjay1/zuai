import { Card } from "@/components/ui/card";
import {
  Clock,
  FileIcon,
  Hand,
  Lightbulb,
  Star,
  WholeWord,
} from "lucide-react";
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
            <Lightbulb className="w-3 h-3" />
            <p className="text-sm">Physics HL</p>
          </div>
          <div className="flex items-center bg-white space-x-2 rounded-full p-1">
            <Clock className="w-3 h-3" />
            <span className="text-sm">18 min read</span>
          </div>
          <div className="flex items-center bg-white space-x-2 rounded-full p-1">
            <WholeWord className="w-3 h-3" />
            <span className="text-sm">2388 words</span>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4">
          <div className="flex items-center bg-white space-x-2 rounded-full p-1">
            <Star className="w-3 h-3" />
            <span className="text-sm">7/7</span>
          </div>
          <div className="flex items-center bg-white space-x-2 rounded-full p-1">
            <Hand className="w-3 h-" />
            <span className="text-sm">English</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
