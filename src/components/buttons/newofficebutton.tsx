import { HiOutlinePlusCircle } from "react-icons/hi2";
import { Link } from "react-router-dom";

type Props = {
    link: string;
}

export default function NewOfficeButton({link}: Props) {
    return (
        <Link to={link}><p className="flex items-center gap-1 rounded bg-blue-500 hover:bg-blue-600 shadow-md font-semibold text-white py-2 px-4 ml-4 transition-all"><HiOutlinePlusCircle size={24} />Hyr ut en lokal</p></Link>
    )
}