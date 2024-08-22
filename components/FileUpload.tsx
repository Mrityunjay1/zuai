import React, { useState, useCallback } from "react";
import Image from "next/image";
import Upload from "../app/assets/upload_file.png";
import { useFileStore } from "@/hooks/useFileStore";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

export default function FileUpload({ onFileSelect }: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { files, addFile, removeFile, clearFiles } = useFileStore();

  const handleFile = useCallback(
    (selectedFile: File) => {
      setError(null);
      const maxSize = 25 * 1024 * 1024; // 25MB in bytes
      if (selectedFile.size > maxSize) {
        setError("File size exceeds 25MB limit.");
        return;
      }
      if (!selectedFile.type.includes("pdf")) {
        setError("Please upload a PDF file.");
        return;
      }
      setFile(selectedFile);
      onFileSelect(selectedFile);
    },
    [onFileSelect]
  );

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFile(e.dataTransfer.files[0]);
      }
    },
    [handleFile]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      if (e.target.files && e.target.files[0]) {
        addFile(e.target.files[0]);
      }
    },
    [handleFile]
  );

  return (
    <div className="w-full bg-white">
      <label
        className={`flex flex-col items-center justify-center w-full  border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 ${
          dragActive ? "border-blue-500 bg-blue-50" : ""
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <Image src={Upload} alt="upload" width={20} height={20} />
          <p className="font-semibold text-lg text-gray-400 text-center mt-2">
            {file ? file.name : "Drag and drop a PDF"}
          </p>
          <p className="text-gray-400 text-center text-sm">
            *Limit 25 MB per file.
          </p>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
        <input
          type="file"
          className="hidden"
          onChange={handleChange}
          accept=".pdf"
        />
      </label>
    </div>
  );
}
