interface CategoryButtonProps {
    setTypes: React.Dispatch<React.SetStateAction<string[]>>;
    types: string[];
    type: string;
}
export default function CategoryButton({setTypes, types, type}: CategoryButtonProps) {
    return (
        <div onClick={() => setTypes(prev => prev.includes(type) ? prev.filter(el => el !== type) : [...prev, type]) } className={`py-2 px-4 border ${types.includes(type) ? "bg-blue-400 text-white" : "border-gray-200 hover:bg-gray-200"} rounded-lg cursor-pointer`}>{type}</div>
    )
} 