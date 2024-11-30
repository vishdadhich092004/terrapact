import React, { useState } from "react";

interface ImageUploadProps {
  onImageUpload: (file: File | null) => void;
}

const ImageUpload = ({ onImageUpload }: ImageUploadProps) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setPreview(URL.createObjectURL(file));
      onImageUpload(file);
    } else {
      setPreview(null);
      onImageUpload(null);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-[#a24c02] font-medium">Upload Image</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mt-2 block w-full text-sm text-gray-500 file:mr-4  file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-[#a24c02] hover:file:bg-blue-100"
      />
      {preview && (
        <div className="mt-4">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-40 object-cover rounded-md shadow-md"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
