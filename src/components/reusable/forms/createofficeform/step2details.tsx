import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { TagsInput } from "react-tag-input-component";

const Step2Details = ({ formData, setFormData, nextStep, prevStep }: any) => {
    return (
        <div className="flex flex-col gap-6 h-full">
            <h1 className="text-2xl font-bold text-primary">Steg 2: Detaljer</h1>

            {/* Size Input */}
            <div>
                <label htmlFor="size" className="block text-sm font-medium text-neutral mb-1">
                    Storlek (kvm)
                </label>
                <input
                    id="size"
                    type="number"
                    value={formData.size}
                    onChange={(e) => setFormData({ ...formData, size: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Ange storlek i kvadratmeter"
                />
            </div>

            {/* Price Input */}
            <div>
                <label htmlFor="price" className="block text-sm font-medium text-neutral mb-1">
                    Pris (kr/mån)
                </label>
                <input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Ange pris per månad"
                />
            </div>

            {/* Description Input */}
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-neutral mb-1">
                    Beskrivning
                </label>
                <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    rows={4}
                    placeholder="Beskriv lokalen"
                />
            </div>

            {/* Tags Input */}
            <div>
                <label htmlFor="tags" className="block text-sm font-medium text-neutral mb-1">
                    Taggar
                </label>
                <TagsInput
                    value={formData.tags}
                    onChange={(tags) => setFormData({ ...formData, tags })}
                    name="tags"
                    placeHolder="Lägg till taggar..."
                    classNames={{
                        tag: "bg-primary text-white px-2 py-1 rounded-md",
                        input: "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
                    }}
                />
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-auto">
                <button
                    onClick={prevStep}
                    className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark transition-all"
                >
                    <FaArrowLeft />
                    <span>Backa</span>
                </button>
                <button
                    onClick={nextStep}
                    className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark transition-all"
                >
                    <span>Nästa</span>
                    <FaArrowRight />
                </button>
            </div>
        </div>
    );
};

export default Step2Details;