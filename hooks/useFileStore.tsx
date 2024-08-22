// stores/fileStore.ts
import { create } from "zustand";

interface FileData {
  name: string;
  size: number;
  type: string;
  dataUrl: string;
  rawData: string; // Base64 encoded file data
}

interface FileStoreState {
  files: FileData[];
  addFile: (file: File) => void;
  removeFile: (fileName: string) => void;
  clearFiles: () => void;
}

export const useFileStore = create<FileStoreState>((set) => {
  // Load initial files from local storage
  const loadFilesFromLocalStorage = () => {
    const savedFiles = localStorage.getItem("uploadedFiles");
    return savedFiles ? JSON.parse(savedFiles) : [];
  };

  return {
    files: loadFilesFromLocalStorage(),

    addFile: (file: File) => {
      const reader = new FileReader();
      reader.onload = () => {
        const fileData: FileData = {
          name: file.name,
          size: file.size,
          type: file.type,
          dataUrl: URL.createObjectURL(file), // Object URL for immediate display
          rawData: reader.result as string, // Base64 encoded data
        };
        set((state) => {
          const updatedFiles = [...state.files, fileData];
          localStorage.setItem("uploadedFiles", JSON.stringify(updatedFiles));
          return { files: updatedFiles };
        });
      };
      reader.readAsDataURL(file);
    },

    removeFile: (fileName: string) =>
      set((state) => {
        const updatedFiles = state.files.filter(
          (file) => file.name !== fileName
        );
        localStorage.setItem("uploadedFiles", JSON.stringify(updatedFiles));
        return { files: updatedFiles };
      }),

    clearFiles: () =>
      set(() => {
        localStorage.removeItem("uploadedFiles");
        return { files: [] };
      }),
  };
});
