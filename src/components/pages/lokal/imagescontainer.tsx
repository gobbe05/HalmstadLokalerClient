import { useState } from "react";
import { useTranslation } from "react-i18next";
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
    const { t } = useTranslation();

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
            <div className="relative bg-gray-900/5 h-[300px] md:h-[400px]">
                <button
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full z-10 transition-colors shadow-lg backdrop-blur-sm"
                    onClick={handlePrev}
                    aria-label="Previous image"
                >
                    <FaChevronLeft size={20} />
                </button>
                <div
                    className="w-full h-full cursor-zoom-in"
                    onClick={() => openModal(currentIndex)}
                >
                    {imageError ? (
                        <div className="h-full w-full flex items-center justify-center bg-gray-100">
                            <div className="text-center">
                                <MdOutlineImageNotSupported size={40} className="mx-auto mb-2 text-gray-400" />
                                <p className="text-sm text-gray-500">{t('imagescontainer.couldNotLoad')}</p>
                            </div>
                        </div>
                    ) : (
                        <img
                            src={import.meta.env.VITE_BUCKET_ADDRESS + images[currentIndex]}
                            alt={`Office Image ${currentIndex + 1}`}
                            className="w-full h-full object-cover"
                            onError={() => setImageError(true)}
                        />
                    )}
                </div>
                <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full z-10 transition-colors shadow-lg backdrop-blur-sm"
                    onClick={handleNext}
                    aria-label="Next image"
                >
                    <FaChevronRight size={20} />
                </button>
                {/* Image counter and dots */}
                <div className="absolute bottom-4 left-0 right-0 flex flex-col items-center gap-2">
                    <div className="px-3 py-1 bg-black/50 rounded-full text-white text-sm backdrop-blur-sm">
                        {currentIndex + 1} / {images.length}
                    </div>
                    <div className="flex gap-2">
                        {images.map((_, idx) => (
                            <button
                                key={idx}
                                className={`w-2 h-2 rounded-full transition-colors ${
                                    idx === currentIndex 
                                        ? "bg-white shadow-sm" 
                                        : "bg-white/50 hover:bg-white/75"
                                }`}
                                onClick={() => setCurrentIndex(idx)}
                                aria-label={`Go to image ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Modal for full-size image */}
            {showModal && (
                <div
                    className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                    onClick={closeModal}
                >
                    <div className="relative max-w-5xl w-full">
                        <button
                            className="absolute -top-12 right-0 text-white/90 hover:text-white p-2 transition-colors"
                            onClick={(e) => {
                                e.stopPropagation();
                                closeModal();
                            }}
                        >
                            <FaTimes size={24} />
                        </button>
                        {imageError ? (
                            <div className="h-[80vh] w-full flex items-center justify-center">
                                <div className="text-center">
                                    <MdOutlineImageNotSupported size={48} className="mx-auto mb-3 text-gray-400" />
                                    <p className="text-gray-400">{t('imagescontainer.couldNotLoad')}</p>
                                </div>
                            </div>
                        ) : (
                            <img
                                src={import.meta.env.VITE_BUCKET_ADDRESS + images[modalIndex]}
                                alt="Selected Office Image"
                                className="w-full h-[80vh] object-contain"
                                onError={() => setImageError(true)}
                            />
                        )}
                        {/* Modal navigation */}
                        {images.length > 1 && (
                            <>
                                <button
                                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-4 rounded-full z-10 transition-colors backdrop-blur-sm"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setModalIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
                                        setImageError(false);
                                    }}
                                    aria-label="Previous modal image"
                                >
                                    <FaChevronLeft size={24} />
                                </button>
                                <button
                                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-4 rounded-full z-10 transition-colors backdrop-blur-sm"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setModalIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
                                        setImageError(false);
                                    }}
                                    aria-label="Next modal image"
                                >
                                    <FaChevronRight size={24} />
                                </button>
                            </>
                        )}
                        {/* Image counter */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 rounded-full text-white backdrop-blur-sm">
                            {modalIndex + 1} / {images.length}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}