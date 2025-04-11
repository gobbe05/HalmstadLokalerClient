import { useState } from "react";
import { FaTimes } from "react-icons/fa";

interface ImagesContainerProps {
    images: string[];
    imageLoading: boolean;
    imageError: boolean;
}

export default function ImagesContainer({images}: ImagesContainerProps) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [imageError, setImageError] = useState(false);

    return (
    <div>
      {/* Image Grid */}
      <div className="grid md:grid-rows-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className={`relative cursor-pointer ${
              index === 0 ? "md:col-span-2 md:row-span-2" : "md:col-span-1 md:row-span-1"
            } group`}
            onClick={() => setSelectedImage(image)}
          >
            <img
              src={imageError ? "/fallback-image.jpg" : import.meta.env.VITE_BUCKET_ADDRESS + image}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover rounded-md transition-all hover:opacity-80"
            />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all rounded-md"></div>
          </div>
        ))}
      </div>

      {/* Modal for full-size image */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-3xl w-full">
            <button
              className="absolute top-2 right-2 text-white bg-gray-800 p-2 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              <FaTimes />
            </button>
            <img
              src={import.meta.env.VITE_BUCKET_ADDRESS + selectedImage}
              alt="Selected Office Image"
              className="w-full max-h-[80vh] object-contain rounded-md"
            />
          </div>
        </div>
      )}
    </div>
  );
}