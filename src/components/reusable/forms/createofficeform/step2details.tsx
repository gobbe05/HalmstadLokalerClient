import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { TagsInput } from "react-tag-input-component";
import { useTranslation } from 'react-i18next';

const Step2Details = ({ formData, setFormData, nextStep, prevStep }: any) => {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col gap-6 h-full">
            <h1 className="text-2xl font-bold text-primary">{t('officeform.step2Title', 'Steg 2: Detaljer')}</h1>

            {/* Size Input */}
            <div>
                <label htmlFor="size" className="block text-sm font-medium text-neutral mb-1">
                    {t('officeform.area', 'Storlek (kvm)')}
                </label>
                <input
                    id="size"
                    type="number"
                    value={formData.size}
                    onChange={(e) => setFormData({ ...formData, size: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder={t('officeform.areaPlaceholder', 'Ange storlek i kvadratmeter')}
                />
            </div>

            {/* Price Input */}
            <div>
                <label htmlFor="price" className="block text-sm font-medium text-neutral mb-1">
                    {t('officeform.price', 'Pris (kr/mån)')}
                </label>
                <input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder={t('officeform.pricePlaceholder', 'Ange pris per månad')}
                />
            </div>

            {/* Description Input */}
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-neutral mb-1">
                    {t('officeform.description', 'Beskrivning')}
                </label>
                <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    rows={4}
                    placeholder={t('officeform.descriptionPlaceholder', 'Beskriv lokalen')}
                />
            </div>

            {/* Tags Input */}
            <div>
                <label htmlFor="tags" className="block text-sm font-medium text-neutral mb-1">
                    {t('officeform.tags', 'Taggar')}
                </label>
                <TagsInput
                    value={formData.tags}
                    onChange={(tags) => setFormData({ ...formData, tags })}
                    name="tags"
                    placeHolder={t('officeform.tagsPlaceholder', 'Lägg till taggar...')}
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

export default Step2Details;