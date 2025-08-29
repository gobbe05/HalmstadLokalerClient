import { Button } from "@mui/material";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { useTranslation } from 'react-i18next';

const Step4Review = ({ formData, handleSubmit, prevStep }: any) => {
    const { t } = useTranslation();
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-primary">{t('officeform.step4Title', 'Steg 4: Granska och Skicka')}</h1>

            {/* Basic Information */}
            <div className="bg-gray-100 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-neutral mb-2">{t('officeform.basicInfo', 'Grundläggande Information')}</h2>
                <p className="text-sm text-neutral">
                    <strong>{t('officeform.name', 'Namn')}:</strong> {formData.name}
                </p>
                <p className="text-sm text-neutral">
                    <strong>{t('officeform.location', 'Plats')}:</strong> {formData.location}
                </p>
                <p className="text-sm text-neutral">
                    <strong>{t('officeform.type', 'Typer')}:</strong> {formData.types.map((type: any) => t(`categorybutton.${type.name}`, type.name)).join(", ")}
                </p>
            </div>

            {/* Details */}
            <div className="bg-gray-100 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-neutral mb-2">{t('officeform.details', 'Detaljer')}</h2>
                <p className="text-sm text-neutral">
                    <strong>{t('officeform.area', 'Storlek')}:</strong> {formData.size} {t('officeform.sqm', 'kvm')}
                </p>
                <p className="text-sm text-neutral">
                    <strong>{t('officeform.price', 'Pris')}:</strong> {formData.price} {t('officeform.pricePerMonth', 'kr/mån')}
                </p>
                <div className="text-sm text-neutral">
                    <strong>{t('officeform.description', 'Beskrivning')}:</strong>
                    <div
                        className="mt-1"
                        dangerouslySetInnerHTML={{ __html: formData.description }}
                    />
                </div>
                <p className="text-sm text-neutral">
                    <strong>{t('officeform.tags', 'Taggar')}:</strong> {formData.tags.join(", ")}
                </p>
            </div>

            {/* Media */}
            <div className="bg-gray-100 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-neutral mb-2">{t('officeform.media', 'Media')}</h2>
                <p className="text-sm text-neutral">
                    <strong>{t('officeform.documents', 'Dokument')}:</strong> {formData.documents.map((doc: File) => doc.name).join(", ")}
                </p>
                <p className="text-sm text-neutral">
                    <strong>{t('officeform.images', 'Bilder')}:</strong> {formData.images.map((img: File) => img.name).join(", ")}
                </p>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
                <button
                    onClick={prevStep}
                    className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark transition-all"
                >
                    <FaArrowLeft />
                    <span>{t('officeform.back', 'Backa')}</span>
                </button>
                <button
                    onClick={handleSubmit}
                    className="flex items-center gap-2 bg-success text-white px-6 py-3 rounded-md hover:bg-success-dark transition-all"
                >
                    <span>{t('officeform.send', 'Skicka')}</span>
                    <FaCheck />
                </button>
            </div>
        </div>
    );
};

export default Step4Review;