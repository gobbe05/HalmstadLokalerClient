import { Link } from "react-router-dom";
import { HiOutlineBell, HiOutlineChatBubbleLeftEllipsis, HiOutlineHeart, HiOutlineUserCircle } from "react-icons/hi2";
import { HiOutlineLogout, HiOutlineSearch } from "react-icons/hi";
import { useAuth } from "../../context/Auth/AuthContext";
import NewOfficeButton from "../buttons/newofficebutton";
import { IconType } from "react-icons";


export default function Links() {
    const {logout, isAuthenticated, type} = useAuth();
    return (
        <div className="flex flex-col-reverse md:flex-row items-stretch gap-6">
            {type != "buyer" && <NewOfficeButton link="/hyr-ut-lokal"/>}
            <HeaderLink text="Lediga lokaler" link="/lediga-lokaler" Icon={HiOutlineSearch}/>
            <HeaderLink text="Bevakningar" link="/bevakningar" Icon={HiOutlineBell}/>
            
            {isAuthenticated ? 
            <>
                <HeaderLink text="Sparade lokaler" link="/sparade-lokaler" Icon={HiOutlineHeart} />
                <HeaderLink link="/meddelanden" text="Meddelanden" Icon={HiOutlineChatBubbleLeftEllipsis }/>  
                {type != "buyer" && <HeaderLink link="/min-sida" text="Min Sida" Icon={HiOutlineUserCircle} /> }
                <button className="flex md:flex-col gap-2 md:gap-0 hover:text-red-500 transition-colors duration-300" onClick={logout}><HiOutlineLogout className="md:mx-auto" size={24}/><p className="text-sm">Logout</p></button>
            </> : 
            <HeaderLink link="/login" text="Logga in" Icon={HiOutlineUserCircle }/>}
            
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
        <Link to={link} className="flex md:flex-col gap-2 md:gap-0 items-center text-gray-700 hover:text-blue-500 transition-colors duration-300"><Icon className="md:mx-auto" size={24}/><p className="text-sm">{text}</p></Link>
    )
}