import { IconType } from "react-icons";
import { Link } from "react-router-dom";

interface IOfficeTypeCardProps {
    name: string,
    link: string,
    Icon: IconType
}

const OfficeTypeCard = ({name, link, Icon}: IOfficeTypeCardProps) => {
    return (
        <Link to={link} className="group flex items-center gap-4 w-full border-b border-gray-700 hover:bg-blue-500 hover:text-white bg-white rounded-md p-4 transition-all">
           <Icon className="group-hover:text-white text-blue-500" size={32}/>
           <h1 className="font-semibold">{name}</h1>
        </Link>
    )
}

export default OfficeTypeCard