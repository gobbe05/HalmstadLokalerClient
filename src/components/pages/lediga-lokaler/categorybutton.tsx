import { useTranslation } from "react-i18next";

interface CategoryButtonProps {
    setTypes: React.Dispatch<React.SetStateAction<string[]>>;
    types: string[];
    type: string;
}
export default function CategoryButton({setTypes, types, type}: CategoryButtonProps) {
    const { t } = useTranslation();
    return (
        <div onClick={() => setTypes(prev => prev.includes(type) ? prev.filter(el => el !== type) : [...prev, type]) } className={`py-2 px-4 border ${types.includes(type) ? "bg-primary text-white" : "border-gray-200 hover:bg-gray-200"} rounded-lg cursor-pointer`}>
            {t(`categorybutton.${type}`)}
        </div>
    )
} 