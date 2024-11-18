import Links from "./links";
import Logo from "./logo";

export default function Header () {
    return (
        <div className="flex items-center justify-between bg-white py-4 px-8 shadow-md">
            <Logo />
            <Links />
        </div>
    ) 
}