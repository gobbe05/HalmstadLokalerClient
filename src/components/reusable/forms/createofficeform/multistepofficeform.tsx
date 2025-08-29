import { useEffect, useState } from "react";
import DOMPurify from 'dompurify';
import Step1BasicInfo from "./step1basicinfo";
import Step2Details from "./step2details";
import Step3Media from "./step3media";
import Step4Review from "./step4review";
import { MdOutlineImageNotSupported } from "react-icons/md";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import validateForm from "../validateofficeform";
import IOfficeFormData from "./IOfficeFormData";
import getOffice from "../../../../utils/getOffice"; // Utility function to fetch office data
import officetypes from "../../../../utils/officeTypes";
import { useTranslation } from 'react-i18next';
const MultiStepOfficeForm = ({ id, method, handleClose }: { id?: string; method: "POST" | "PUT"; handleClose?: () => void }) => {
    const { t } = useTranslation();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<IOfficeFormData>({
        name: "",
        location: "",
        marker: undefined,
        types: [],
        size: 0,
        price: 0,
        description: "",
        tags: [],
        images: [],
        documents: [],
        existingDocuments: [],
        existingImages: [],
        existingThumbnails: [],
    });

    const navigate = useNavigate();

    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);

    const handleSubmit = async () => {
        const validationErrors = validateForm({
            name: formData.name,
            size: formData.size,
            price: formData.price,
            types: formData.types,
            description: formData.description,
            location: formData.location,
            images: formData.images,
            marker: formData.marker,
        });

        if (Object.keys(validationErrors).length > 0) {
            Object.values(validationErrors).forEach((error) => {
                toast.error(error);
            });
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name);
        formDataToSend.append("location", formData.location);
        formDataToSend.append("size", formData.size.toString());
        formDataToSend.append("price", formData.price.toString());
        if (formData.marker) {
            formDataToSend.append("lat", formData.marker.lat.toString());
            formDataToSend.append("lng", formData.marker.lng.toString());
        }
        formDataToSend.append("tags", JSON.stringify(formData.tags));
        formDataToSend.append("types", JSON.stringify(formData.types.map((type: any) => type.name)));
        formDataToSend.append("description", formData.description);

        formData.existingDocuments.forEach((doc) => {
            formDataToSend.append("existingDocuments[]", doc);
        });
        formData.existingImages.forEach((img) => {
            formDataToSend.append("existingImages[]", img);
        });
        formData.existingThumbnails.forEach((thumb) => {
            formDataToSend.append("existingThumbnails[]", thumb);
        });
        formData.images.forEach((image: File) => {
            formDataToSend.append("images[]", image);
        });
        formData.documents.forEach((doc: File) => {
            formDataToSend.append("files[]", doc);
        });

        const url = method === "POST" ? "/api/office" : `/api/office/${id}`;
        const response = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}${url}`, {
            method,
            credentials: "include",
            body: formDataToSend,
        });

        if (response.ok) {
            toast.success(method === "POST" ? t('officeform.created', 'Annons skapad!') : t('officeform.updated', 'Annons uppdaterad!'));
            navigate("/");
        } else {
            const data = await response.json();
            toast.error(t('officeform.error', 'Något gick fel. Försök igen.') + (data.message ? ` ${data.message}` : ""));
        }
    };

    // Populate formData if method is PUT and id is provided
    useEffect(() => {
        if (method === "PUT" && id) {
            getOffice(id)
                .then((office) => {
                    if (!office) return;

                    const mappedTypes = office.types
                        .map((type: string) => officetypes.find((t) => t.name === type))
                        .filter((type) => type !== undefined); // Filter out unmatched types

                    setFormData({
                        name: office.name,
                        location: office.location,
                        marker: office.position,
                        types: mappedTypes as { name: string; id: number }[], // Ensure correct type
                        size: office.size,
                        price: office.price,
                        description: office.description,
                        tags: office.tags,
                        images: [],
                        documents: [],
                        existingDocuments: office.documents,
                        existingImages: office.images,
                        existingThumbnails: office.thumbnails,
                    });
                })
                .catch((error) => {
                    console.error("Failed to fetch office data:", error);
                    toast.error(t('officeform.fetchError', 'Kunde inte hämta kontorsdata.'));
                });
        }
    }, [id, method, t]);

    return (
        <div className="grid lg:grid-cols-2 gap-6">
            {/* Form Section */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                {/* Progress Bar */}
                <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-xl font-semibold text-gray-900">
                            {method === "POST" ? t('officeform.createTitle', 'Skapa ny annons') : t('officeform.editTitle', 'Redigera annons')}
                        </h2>
                        <span className="text-sm text-gray-500">{t('officeform.step', {step, total: 4, defaultValue: 'Steg {{step}} av {{total}}'})}</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-primary transition-all duration-300" 
                            style={{ width: `${(step / 4) * 100}%` }}
                        />
                    </div>
                </div>

                <div className="p-6">
                    {step === 1 && <Step1BasicInfo method={method} handleClose={handleClose} formData={formData} setFormData={setFormData} nextStep={nextStep} />}
                    {step === 2 && <Step2Details formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />}
                    {step === 3 && <Step3Media formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />}
                    {step === 4 && <Step4Review formData={formData} handleSubmit={handleSubmit} prevStep={prevStep} />}
                </div>
            </div>

            {/* Preview Section */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-semibold text-gray-900">{t('officeform.preview', 'Förhandsgranskning')}</h2>
                    <p className="text-sm text-gray-500 mt-1">{t('officeform.previewDesc', 'Se hur din annons kommer att se ut')}</p>
                </div>

                <div className="p-6">
                    {/* Images */}
                    <div className="rounded-xl overflow-hidden bg-gray-100 mb-6">
                        {formData.images.length > 0 ? (
                            <img
                                src={URL.createObjectURL(formData.images[0])}
                                alt={t('officeform.mainImage', 'Huvudbild')}
                                className="w-full h-48 object-cover"
                            />
                        ) : (
                            <div className="w-full h-48 flex flex-col items-center justify-center bg-gray-50 text-gray-400">
                                <MdOutlineImageNotSupported size={32} />
                                <p className="text-sm mt-2">{t('officeform.noImage', 'Ingen bild uppladdad än')}</p>
                            </div>
                        )}
                    </div>

                    {/* Office Info */}
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                            {formData.name || t('officeform.namePlaceholder', 'Namn på lokal')}
                        </h1>
                        <div className="flex items-center gap-2 text-gray-500">
                            <span>{formData.location || t('officeform.noLocation', 'Plats ej angiven')}</span>
                            {formData.types.length > 0 && (
                                <>
                                    <span>•</span>
                                    <span>{formData.types.map(t => t.name).join(", ")}</span>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Size and Price */}
                    <div className="grid grid-cols-2 gap-6 mb-6">
                        <div className="p-4 bg-gray-50 rounded-xl">
                            <p className="text-sm text-gray-500 mb-1">{t('officeform.area', 'Yta')}</p>
                            <p className="text-lg font-semibold text-gray-900">
                                {formData.size > 0 ? `${formData.size} m²` : "—"}
                            </p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-xl">
                            <p className="text-sm text-gray-500 mb-1">{t('officeform.price', 'Pris')}</p>
                            <p className="text-lg font-semibold text-gray-900">
                                {formData.price > 0 ? `${formData.price.toLocaleString()} kr/mån` : "—"}
                            </p>
                        </div>
                    </div>

                    {/* Description */}
                    {formData.description && (
                        <div className="mb-6">
                            <h3 className="text-sm font-medium text-gray-900 mb-2">{t('officeform.description', 'Beskrivning')}</h3>
                            <div
                                className="text-gray-600 prose prose-sm max-w-none"
                                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(formData.description) }}
                            />
                        </div>
                    )}

                    {/* Tags */}
                    {formData.tags.length > 0 && (
                        <div>
                            <h3 className="text-sm font-medium text-gray-900 mb-2">{t('officeform.tags', 'Taggar')}</h3>
                            <div className="flex flex-wrap gap-2">
                                {formData.tags.map((tag: string, index: number) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MultiStepOfficeForm;