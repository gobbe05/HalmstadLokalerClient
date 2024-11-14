import { HiArrowLeft } from "react-icons/hi2";
import { Link } from "react-router-dom";

type Props = {
    link: string;
}

export default function BackButton({link}: Props) {
    return (
        <div className="flex">
            <Link to={link} className="flex gap-1 hover:gap-2 items-center hover:px-4 py-2 rounded-full hover:bg-gray-700 hover:text-white transition-all"><HiArrowLeft size={16} /> <span className="text-sm">Gå tillbaks</span></Link>
        </div>
    )
}