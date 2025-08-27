import { FaArrowLeft, FaArrowRight, FaFileUpload, FaTrashAlt } from "react-icons/fa";
import AddImageButton from "../AddImageButton";
import { useTranslation } from 'react-i18next';

const Step3Media = ({ formData, setFormData, nextStep, prevStep }: any) => {
    const { t } = useTranslation();
    const handleDocumentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setFormData({ ...formData, documents: [...formData.documents, file] });
        }
    };

    const handleRemoveDocument = (index: number) => {
        setFormData({
            ...formData,
            documents: formData.documents.filter((_: any, i: number) => i !== index),
        });
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const files = Array.from(event.target.files);
            setFormData({
                ...formData,
                images: [...formData.images, ...files],
            });
        }
    };

    const handleRemoveImage = (index: number) => {
        setFormData({
            ...formData,
            images: formData.images.filter((_: any, i: number) => i !== index),
        });
    };

    return (
        <div className="flex flex-col gap-6 h-full">
            <h1 className="text-2xl font-bold text-primary">{t('officeform.step3Title', 'Steg 3: Media')}</h1>

            {/* Document Upload */}
            <div>
                <label htmlFor="documents" className="block text-sm font-medium text-neutral mb-1">
                    {t('officeform.uploadDocuments', 'Ladda upp dokument')}
                </label>
                <div className="flex items-center gap-4">
                    <label
                        htmlFor="document-upload"
                        className="flex items-center cursor-pointer bg-accent text-white px-6 py-3 rounded-md hover:bg-accent-dark transition-all"
                    >
                        <FaFileUpload className="mr-2" />
                        {t('officeform.selectDocument', 'Välj dokument')}
                        <input
                            id="document-upload"
                            type="file"
                            accept=".pdf"
                            hidden
                            onChange={handleDocumentChange}
                        />
                    </label>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                    {formData.documents.map((doc: File, index: number) => (
                        <div
                            key={index}
                            className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-md"
                        >
                            <span className="text-sm text-neutral">{doc.name}</span>
                            <button
                                onClick={() => handleRemoveDocument(index)}
                                className="text-red-500 hover:text-red-700"
                            >
                                <FaTrashAlt />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Image Upload */}
            <div>
                <label htmlFor="images" className="block text-sm font-medium text-neutral mb-1">
                    {t('officeform.uploadImages', 'Ladda upp bilder')}
                </label>
                <AddImageButton
                    handleImageChange={handleImageChange}
                    images={formData.images}
                    handleRemoveImage={handleRemoveImage}
                    setImages={(files: File[]) => setFormData({ ...formData, images: [...formData.images, ...files] })}
                />
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-auto">
                <button
                    onClick={prevStep}
                    className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark transition-all"
                >
                    <FaArrowLeft />
                    <span>{t('officeform.back', 'Backa')}</span>
                </button>
                <button
                    onClick={nextStep}
                    className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark transition-all"
                >
                    <span>{t('officeform.next', 'Nästa')}</span>
                    <FaArrowRight />
                </button>
            </div>
        </div>
    );
};

export default Step3Media;