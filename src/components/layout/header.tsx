import { useState } from "react";
import Links from "./links";
import Logo from "./logo";
import { IoClose, IoMenu } from "react-icons/io5";

export default function Header () {
    const [open, setOpen] = useState<boolean>(false)
    return (
        <>
            <div className="flex items-center justify-between z-10 py-4 px-8 bg-white text-gray-700 shadow-sm">
                <Logo />
                <div className="hidden md:block">
                    <Links />
                </div>
                <p onClick={() => {setOpen(true)}} className="md:hidden block"><IoMenu size={36}/></p>
            </div>
            <div className="md:hidden">
                <SidePanel open={open} setOpen={setOpen}/>
            </div>
        </> 
    ) 
}

interface SidePanel {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
const SidePanel = ({open, setOpen}:SidePanel) => {
    return (
        <div className={`${open ? "" : "hidden"} h-screen fixed z-10 top-0 right-0 z-1 p-16 text-gray-700 bg-white`}>
            <div className="flex items-center">
                <Logo />
                <p onClick={() => setOpen(false)}className="ml-8"><IoClose size={36} /></p>
            </div>
            <div className="mt-8">
                <Links />
            </div>
        </div>
    )
}