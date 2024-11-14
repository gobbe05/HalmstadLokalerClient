import { HiMail, HiOutlineMail } from "react-icons/hi";
import { Link } from "react-router-dom";

type Props = {
    link: string;
}

export default function ContactButton({link}: Props) {
    return (
        <Link to={link} className="flex items-center gap-2 px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white transition-all">
            <HiOutlineMail size={18}/>
            <p className="font-semibold text-sm">Kontakta försäljaren</p>
        </Link>
    )
}