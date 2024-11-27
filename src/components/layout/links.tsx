import { Link } from "react-router-dom";
import { HiOutlineBell, HiOutlineChatBubbleLeftEllipsis, HiOutlineUserCircle } from "react-icons/hi2";
import { HiOutlineLogout, HiOutlineSearch } from "react-icons/hi";
import { useAuth } from "../../context/Auth/AuthContext";
import NewOfficeButton from "../buttons/newofficebutton";
import { IconType } from "react-icons";


export default function Links() {
    const {logout, isAuthenticated} = useAuth();
    return (
        <div className="flex items-stretch gap-6 text-gray-700">
            <NewOfficeButton link="/hyr-ut-lokal"/>
            <HeaderLink text="Lediga lokaler" link="/lediga-lokaler" Icon={HiOutlineSearch}/>
            <HeaderLink text="Bevakningar" link="/bevakningar" Icon={HiOutlineBell}/>
            
            {isAuthenticated ? 
            <>
                <Link to="/meddelanden" className="hover:text-blue-500 transition-colors duration-300"><HiOutlineChatBubbleLeftEllipsis className="mx-auto" size={24}/><p className="text-sm">Meddelanden</p></Link>   
                <Link to="/min-sida" className="hover:text-blue-500 transition-colors duration-300"><HiOutlineUserCircle className="mx-auto" size={24}/><p className="text-sm">Min Sida</p></Link>
                <button className="hover:text-red-500 transition-colors duration-300" onClick={logout}><HiOutlineLogout className="mx-auto" size={24}/><p className="text-sm">Logout</p></button>
            </> : 
            <Link to="/login" className="hover:text-blue-500 transition-colors duration-300"><HiOutlineUserCircle className="mx-auto" size={24}/><p className="text-sm">Logga in</p></Link>}
            
            {/*<Link to="/meddelanden"><HiOutlineChatBubbleBottomCenterText className="mx-auto" size={24}/><p className="text-sm">Meddelanden</p></Link>*/}
        </div>
    )
}

type HeaderLinkProps = {
    link: string;
    Icon: IconType;
    text: string;
}

const HeaderLink = ({text, link, Icon}: HeaderLinkProps) => {
    return (

            <Link to={link} className="flex flex-col items-center text-gray-700 hover:text-blue-500 transition-colors duration-300"><Icon className="mx-auto" size={24}/><p className="text-sm">{text}</p></Link>
    )
}