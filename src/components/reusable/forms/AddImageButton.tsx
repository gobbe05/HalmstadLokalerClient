import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

interface AddImageButtonProps {
    handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleRemoveImage: (index: number) => void;
    images: File[];
    setImages: (images: File[]) => File[];
}

export default function AddImageButton({
    handleImageChange,
    images,
    handleRemoveImage,
    setImages,
}: AddImageButtonProps) {
    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const files = Array.from(event.dataTransfer.files).filter((file) => file.type.startsWith("image/"));
        setImages(files);
    };

    return (
        <div>
            <div
                className="flex flex-col items-center justify-center border-2 border-dashed border-accent rounded-lg p-6 bg-gray-50 hover:bg-gray-100 transition-all cursor-pointer"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
            >
                <p className="text-gray-500">Dra och släpp bilder här eller klicka för att ladda upp</p>
                <label
                    htmlFor="image-upload"
                    className="cursor-pointer px-4 py-2 bg-accent text-white rounded-lg shadow hover:bg-accent-dark transition mt-2"
                >
                    Välj bilder
                </label>
                <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="hidden"
                />
            </div>
            <div className="flex flex-wrap gap-4 mt-4">
                {images.map((image, index) => (
                    <div key={index} className="relative w-24 h-24 bg-gray-200 rounded-md overflow-hidden">
                        <img
                            src={URL.createObjectURL(image)}
                            alt={`Image ${index + 1}`}
                            className="w-full h-full object-cover rounded-lg shadow"
                        />
                        <button
                            onClick={() => handleRemoveImage(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
                        >
                            <FaTrashAlt size={12} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}