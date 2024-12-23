import React, { useState } from "react";
import { Upload } from "lucide-react";

function FileUpload({ setImages, imageList }) {
  const [imagePreview, setImagePreview] = useState([]);

  const handleFileUpload = (event) => {
    const files = event.target.files;
    setImages(files);
    const previews = Array.from(files).map((file) => URL.createObjectURL(file));
    setImagePreview(previews);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-8 h-8 mb-4 text-gray-500" />
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            multiple
            className="hidden"
            onChange={handleFileUpload}
            accept="image/png, image/gif, image/jpeg"
          />
        </label>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {imagePreview.map((image, index) => (
          <div key={index} className="relative aspect-square">
            <img
              src={image}
              className="w-full h-full object-cover rounded-lg"
              alt={`Uploaded image ${index + 1}`}
            />
          </div>
        ))}
      </div>

      {imageList && (
        <div className="grid grid-cols-3 gap-4">
          {imageList.map((image, index) => (
            <div key={index} className="relative aspect-square">
              <img
                src={image?.url}
                className="w-full h-full object-cover rounded-lg"
                alt={`Uploaded image ${index + 1}`}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FileUpload;
