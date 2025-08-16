import { FaArrowRight } from "react-icons/fa";
import LocationInput from "../../../pages/hyr-ut-lokal/locationinput";
import IOfficeFormData from "./IOfficeFormData";
import { Link } from "react-router-dom";
import officetypes from "../../../../utils/officeTypes";

interface Step1BasicInfoProps {
    formData: IOfficeFormData;
    setFormData: React.Dispatch<React.SetStateAction<IOfficeFormData>>;
    nextStep: () => void;
    handleClose?: () => void;
    method: "POST" | "PUT";
}

const Step1BasicInfo = ({ formData, setFormData, nextStep, handleClose, method }: Step1BasicInfoProps) => {
    return (
        <div className="flex flex-col gap-6 h-full">
            <h1 className="text-2xl font-bold text-primary">Steg 1: Grundläggande Information</h1>
            {/* Name Input */}
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral mb-1">
                    Namn
                </label>
                <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Ange namn på lokalen"
                />
            </div>

            {/* Location Input */}
            <div>
                <label htmlFor="location" className="block text-sm font-medium text-neutral mb-1">
                    Plats
                </label>
                {method === "POST" ?
                <LocationInput
                    setLocation={(location) => {
                        setFormData((formData: any) => {
                            return { ...formData, location }; // Added return statement
                        });
                    }}
                    setMarker={(marker) => {
                        setFormData((formData: any) => {
                            return { ...formData, marker }; // Added return statement
                        });
                    }}
                />:
                <input disabled className="w-full px-4 py-2 border border-gray-300 rounded-md" placeholder={formData.location} />}
            </div>

            {/* Office Types */}
            <div>
                <label htmlFor="types" className="block text-sm font-medium text-neutral mb-1">
                    Typ av lokal
                </label>
                <div className="flex flex-wrap gap-2">
                    {officetypes.map((type) => (
                        <button
                            key={type.id}
                            type="button"
                            onClick={() => {
                                if (formData.types.some((t: any) => t.id === type.id)) {
                                    setFormData({
                                        ...formData,
                                        types: formData.types.filter((t: any) => t.id !== type.id),
                                    });
                                } else {
                                    setFormData({ ...formData, types: [...formData.types, type] });
                                }
                            }}
                            className={`px-4 py-2 rounded-md text-sm font-medium ${
                                formData.types.some((t: any) => t.id === type.id)
                                    ? "bg-primary text-white"
                                    : "bg-gray-200 text-neutral hover:bg-gray-300"
                            }`}
                        >
                            {type.name}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex justify-between items-center mt-auto">
                {/* Cancel Button */}
               {handleClose != undefined ? 
                <button
                    onClick={handleClose}
                    className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 transition-all"
                    >
                    Avbryt
                </button> : 
               <Link to="/">
                    <button
                        className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 transition-all"
                    >
                        Avbryt
                    </button>
                </Link>} 
                {/* Next Button */}
                <button
                    onClick={nextStep}
                    className="ml-auto flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark transition-all"
                >
                    <span>Nästa</span> <FaArrowRight />
                </button>
            </div>
        </div>
    );
};

export default Step1BasicInfo;