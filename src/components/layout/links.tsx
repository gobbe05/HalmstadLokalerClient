import { Link } from "react-router-dom";
import { HiOutlineBell, HiOutlineUserCircle, HiOutlinePlusCircle  } from "react-icons/hi2";
import { HiOutlineLogout, HiOutlineSearch } from "react-icons/hi";
import { useAuth } from "../../context/Auth/AuthContext";
import NewOfficeButton from "../buttons/newofficebutton";


export default function Links() {
    const {logout, isAuthenticated} = useAuth();
    return (
        <div className="flex items-stretch gap-4 ml-auto text-gray-700">
            <NewOfficeButton link="/hyr-ut-lokal"/>
            <Link to="/lediga-lokaler"><HiOutlineSearch className="mx-auto" size={24}/><p className="text-sm">Lediga lokaler</p></Link>
            {/*<Link to="/meddelanden"><HiOutlineChatBubbleBottomCenterText className="mx-auto" size={24}/><p className="text-sm">Meddelanden</p></Link>*/}
            <Link to="/bevakningar"><HiOutlineBell className="mx-auto" size={24}/><p className="text-sm">Bevakningar</p></Link>
            {isAuthenticated ? <button onClick={logout}><HiOutlineLogout className="mx-auto" size={24}/><p className="text-sm">Logout</p></button> : <Link to="/login"><HiOutlineUserCircle className="mx-auto" size={24}/><p className="text-sm">Logga in</p></Link>}
        </div>
    )
}