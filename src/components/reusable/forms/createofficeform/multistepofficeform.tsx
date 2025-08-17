import { useEffect, useState } from "react";
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
const MultiStepOfficeForm = ({ id, method, handleClose }: { id?: string; method: "POST" | "PUT"; handleClose?: () => void }) => {
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
            toast.success(method === "POST" ? "Annons skapad!" : "Annons uppdaterad!");
            navigate("/");
        } else {
            const data = await response.json();
            toast.error("Något gick fel. Försök igen." + (data.message ? ` ${data.message}` : ""));
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
                    toast.error("Kunde inte hämta kontorsdata.");
                });
        }
    }, [id, method]);

    return (
        <div className="grid grid-cols-2 gap-8">
            {/* Form Section */}
            <div className="bg-white p-8 rounded-md border border-gray-200">
                {step === 1 && <Step1BasicInfo method={method} handleClose={handleClose} formData={formData} setFormData={setFormData} nextStep={nextStep} />}
                {step === 2 && <Step2Details formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />}
                {step === 3 && <Step3Media formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />}
                {step === 4 && <Step4Review formData={formData} handleSubmit={handleSubmit} prevStep={prevStep} />}
            </div>

            {/* Preview Section */}
            <div className="bg-white p-8 rounded-md border border-gray-200 text-neutral">
                <h2 className="text-xl font-semibold mb-4">Förhandsgranskning</h2>
                <div className="max-w-3xl mx-auto">
                    {/* Images */}
                    <div className="w-full">
                        <div>
                            {formData.images.length > 0 ? (
                                formData.images.slice(0, 1).map((image: File, index: number) => (
                                    <img
                                        key={index}
                                        src={URL.createObjectURL(image)}
                                        alt={`Image ${index + 1}`}
                                        className="w-full h-32 object-cover"
                                    />
                                ))
                            ) : (
                                <div className="bg-neutral flex items-center justify-center h-32 w-full">
                                    <MdOutlineImageNotSupported size={32} className="text-gray-300" />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Office Info */}
                    <div className="flex items-center justify-between mb-4 mt-4">
                        <div>
                            <h1 className="text-2xl font-semibold">{formData.name || "Inget namn angivet"}</h1>
                            <p className="text-gray-500">{formData.location || "Ingen plats angiven"}</p>
                        </div>
                    </div>

                    {/* Size and Price */}
                    <div className="grid sm:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-gray-500">Yta</h3>
                            <p className="text-lg font-semibold">{formData.size > 0 ? `${formData.size} m²` : "Yta ej angivet"}</p>
                        </div>
                        <div>
                            <h3 className="text-gray-500">Pris</h3>
                            <p className="text-lg font-semibold">{formData.price > 0 ? `${formData.price} kr/mån` : "Pris ej angivet"}</p>
                        </div>
                    </div>
                    <hr className="border-slate-300 my-8" />

                    {/* Description */}
                    <div>
                        <h3 className="text-lg font-semibold">Beskrivning</h3>
                        <p className="text-neutral">{formData.description || "Ingen beskrivning angiven"}</p>
                    </div>

                    {/* Tags */}
                    <div className="my-8">
                        <h3 className="text-lg font-semibold">Taggar</h3>
                        <div className="flex gap-2 flex-wrap mt-2">
                            {formData.tags.length > 0 ? formData.tags.map((tag: string, index: number) => (
                                <span
                                    key={index}
                                    className="text-sm bg-gray-200 text-neutral px-3 py-1 rounded-full"
                                >
                                    {tag}
                                </span>
                            )) : <span className="text-neutral">Inga taggar angivna</span>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MultiStepOfficeForm;