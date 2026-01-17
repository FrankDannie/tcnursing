/// <reference types="vite/client" />

declare module '*.svg' {
  const content: string;
  export default content;
}

declare global {
  interface Window {
    showSaveFilePicker?: (options?: SaveFilePickerOptions) => Promise<FileSystemFileHandle>;
  }

  interface SaveFilePickerOptions {
    suggestedName?: string;
    types?: {
      description?: string;
      accept: Record<string, string[]>;
    }[];
  }

  interface FileSystemFileHandle {
    createWritable: () => Promise<FileSystemWritableFileStream>;
  }

  interface FileSystemWritableFileStream extends WritableStream {
    write: (data: Blob | BufferSource | string) => Promise<void>;
    close: () => Promise<void>;
  }
}

export {};