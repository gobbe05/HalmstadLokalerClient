import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { MdOutlineImageNotSupported } from "react-icons/md";

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
      <div className="grid sm:grid-rows-2 grid-cols-1 sm:grid-cols-3 gap-4 min-h-[128px] max-h-[128px] md:min-h-[256px] md:max-h-[256px]">
        {images.length > 0 ? images.map((image, index) => (
          <div
            key={index}
            className={`rounded-lg max-h-[128px] md:max-h-[256px] bg-gray-700 relative cursor-pointer ${
              index === 0 ? "sm:col-span-2 sm:row-span-2" : "hidden sm:block sm:col-span-1 sm:row-span-1"
            } group`}
            onClick={() => setSelectedImage(image)}
            >
            {
              imageError ? (
              <div className="h-full w-full flex items-center justify-center text-gray-300">
                <MdOutlineImageNotSupported size={32} />
              </div>
              ) : (
                <img
                  src={import.meta.env.VITE_BUCKET_ADDRESS + image}
                  alt={`Office Image ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 ease-in-out rounded-md"
                  onError={() => setImageError(true)}
                />
              )
            } 
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all rounded-md"></div>
          </div>
        )):
        <div className="bg-gray-700 relative sm:col-span-2 sm:row-span-2 group">
          <div className="h-full w-full flex items-center justify-center text-gray-300">
            <MdOutlineImageNotSupported size={32} />
          </div>
        </div>}
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