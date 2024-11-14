import Links from "./links";
import Logo from "./logo";

export default function Header () {
    return (
        <div className="flex items-center bg-white py-4 px-8">
            <Logo />
            <Links />
        </div>
    ) 
}