import { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import { MdOutlineImageNotSupported } from "react-icons/md";

interface ImagesContainerProps {
    images: string[];
    imageLoading: boolean;
    imageError: boolean;
}

export default function ImagesContainer({ images }: ImagesContainerProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [modalIndex, setModalIndex] = useState(0);
    const [imageError, setImageError] = useState(false);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const openModal = (index: number) => {
        setModalIndex(index);
        setShowModal(true);
        setImageError(false);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    if (!images || images.length === 0) {
        return (
            <div className="bg-gray-700 flex items-center justify-center min-h-[128px] max-h-[128px] md:min-h-[256px] md:max-h-[256px]">
                <MdOutlineImageNotSupported size={32} className="text-gray-300" />
            </div>
        );
    }

    return (
        <div>
            {/* Carousel */}
            <div className="relative flex items-center justify-center min-h-[128px] max-h-[128px] md:min-h-[256px] md:max-h-[256px] bg-gray-700">
                <button
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-800 bg-opacity-60 text-white p-2 rounded-full z-10 hover:bg-opacity-90"
                    onClick={handlePrev}
                    aria-label="Previous image"
                >
                    <FaChevronLeft />
                </button>
                <div
                    className="flex items-center justify-center cursor-pointer"
                    onClick={() => openModal(currentIndex)}
                >
                    {imageError ? (
                        <div className="h-full w-full flex items-center justify-center text-gray-300">
                            <MdOutlineImageNotSupported size={32} />
                        </div>
                    ) : (
                        <img
                            src={import.meta.env.VITE_BUCKET_ADDRESS + images[currentIndex]}
                            alt={`Office Image ${currentIndex + 1}`}
                            className="h-full max-h-[128px] md:max-h-[256px] rounded-md transition-transform duration-500 ease-in-out"
                            onError={() => setImageError(true)}
                        />
                    )}
                </div>
                <button
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-800 bg-opacity-60 text-white p-2 rounded-full z-10 hover:bg-opacity-90"
                    onClick={handleNext}
                    aria-label="Next image"
                >
                    <FaChevronRight />
                </button>
                {/* Dots */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
                    {images.map((_, idx) => (
                        <button
                            key={idx}
                            className={`w-2 h-2 rounded-full ${idx === currentIndex ? "bg-white" : "bg-gray-400"} transition`}
                            onClick={() => setCurrentIndex(idx)}
                            aria-label={`Go to image ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>

            {/* Modal for full-size image */}
            {showModal && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
                    onClick={closeModal}
                >
                    <div className="relative max-w-3xl w-full">
                        <button
                            className="absolute top-2 right-2 text-white bg-gray-800 p-2 rounded-full"
                            onClick={(e) => {
                                e.stopPropagation();
                                closeModal();
                            }}
                        >
                            <FaTimes />
                        </button>
                        <img
                            src={import.meta.env.VITE_BUCKET_ADDRESS + images[modalIndex]}
                            alt="Selected Office Image"
                            className="w-full max-h-[80vh] object-contain rounded-md"
                            onError={() => setImageError(true)}
                        />
                        {/* Modal navigation */}
                        {images.length > 1 && (
                            <>
                                <button
                                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-800 bg-opacity-60 text-white p-2 rounded-full z-10 hover:bg-opacity-90"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setModalIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
                                        setImageError(false);
                                    }}
                                    aria-label="Previous modal image"
                                >
                                    <FaChevronLeft />
                                </button>
                                <button
                                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-800 bg-opacity-60 text-white p-2 rounded-full z-10 hover:bg-opacity-90"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setModalIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
                                        setImageError(false);
                                    }}
                                    aria-label="Next modal image"
                                >
                                    <FaChevronRight />
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}