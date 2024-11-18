import { HiOutlinePlusCircle } from "react-icons/hi2";
import { Link } from "react-router-dom";

type Props = {
    link: string;
}

export default function NewOfficeButton({link}: Props) {
    return (
        <Link to={link}><p className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition-colors duration-300"><HiOutlinePlusCircle size={24} />Hyr ut en lokal</p></Link>
    )
}