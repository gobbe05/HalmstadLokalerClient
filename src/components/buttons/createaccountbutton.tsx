import { HiOutlineUserCircle } from "react-icons/hi2";
import { Link } from "react-router-dom";

export default function CreateAccountButton() {
    return (
        <Link to="/register" className="flex items-center gap-2 rounded-full border px-4 py-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white transition-all">
            <HiOutlineUserCircle size={24}/>
            <p>Skapa ett konto</p>
        </Link>
    )
}