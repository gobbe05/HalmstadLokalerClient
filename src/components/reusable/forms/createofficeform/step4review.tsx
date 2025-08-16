import { Button } from "@mui/material";
import { FaArrowLeft, FaCheck } from "react-icons/fa";

const Step4Review = ({ formData, handleSubmit, prevStep }: any) => {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-primary">Steg 4: Granska och Skicka</h1>

            {/* Basic Information */}
            <div className="bg-gray-100 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-neutral mb-2">Grundläggande Information</h2>
                <p className="text-sm text-neutral">
                    <strong>Namn:</strong> {formData.name}
                </p>
                <p className="text-sm text-neutral">
                    <strong>Plats:</strong> {formData.location}
                </p>
                <p className="text-sm text-neutral">
                    <strong>Typer:</strong> {formData.types.map((type: any) => type.name).join(", ")}
                </p>
            </div>

            {/* Details */}
            <div className="bg-gray-100 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-neutral mb-2">Detaljer</h2>
                <p className="text-sm text-neutral">
                    <strong>Storlek:</strong> {formData.size} kvm
                </p>
                <p className="text-sm text-neutral">
                    <strong>Pris:</strong> {formData.price} kr/mån
                </p>
                <p className="text-sm text-neutral">
                    <strong>Beskrivning:</strong> {formData.description}
                </p>
                <p className="text-sm text-neutral">
                    <strong>Taggar:</strong> {formData.tags.join(", ")}
                </p>
            </div>

            {/* Media */}
            <div className="bg-gray-100 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-neutral mb-2">Media</h2>
                <p className="text-sm text-neutral">
                    <strong>Dokument:</strong> {formData.documents.map((doc: File) => doc.name).join(", ")}
                </p>
                <p className="text-sm text-neutral">
                    <strong>Bilder:</strong> {formData.images.map((img: File) => img.name).join(", ")}
                </p>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
                <button
                    onClick={prevStep}
                    className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark transition-all"
                >
                    <FaArrowLeft />
                    <span>Backa</span>
                </button>
                <button
                    onClick={handleSubmit}
                    className="flex items-center gap-2 bg-success text-white px-6 py-3 rounded-md hover:bg-success-dark transition-all"
                >
                    <span>Skicka</span>
                    <FaCheck />
                </button>
            </div>
        </div>
    );
};

export default Step4Review;