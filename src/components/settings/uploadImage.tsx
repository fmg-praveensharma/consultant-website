// components/ImageUpload.tsx
"use client";
import React, { useState } from "react";

interface ImageUploadProps {
  onChange: (files: string[]) => void;
  error?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, error }) => {
  const [filePreviews, setFilePreviews] = useState<string[]>([]);

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const previews = files.map((file) => URL.createObjectURL(file));
    setFilePreviews(previews);
    onChange(previews);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">
        Show Your Best Self!
      </label>
      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
        <div className="space-y-1 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M28 8H20v12H8v8h12v12h8V28h12v-8H28V8z"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="flex text-sm text-gray-600">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
            >
              <span>Click here to upload photos or drop here</span>
              <input
                id="file-upload"
                type="file"
                className="sr-only"
                multiple
                onChange={handleFilesChange}
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
      </div>
      <div className="mt-4 flex space-x-4">
        {filePreviews.map((preview, index) => (
          <div key={index} className="relative">
            <img
              src={preview}
              alt={`Preview ${index}`}
              className="w-20 h-20 object-cover rounded-md"
            />
            <button
              type="button"
              className="absolute top-0 right-0 bg-white rounded-full p-1"
              onClick={() => {
                const newPreviews = filePreviews.filter((_, i) => i !== index);
                setFilePreviews(newPreviews);
                onChange(newPreviews);
              }}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;
