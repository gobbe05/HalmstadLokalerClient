import { FaRegEdit, FaRegEye, FaRegEyeSlash, FaRegTrashAlt } from "react-icons/fa"
import IOffice from "../../interfaces/IOffice"
import { useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import RemoveDialog from "../reusable/dialogs/removedialog"

interface MyPageOfficeCardProps {
    office: IOffice
}

const MyPageOfficeCard = ({office}: MyPageOfficeCardProps) => {
    const [openRemove, setOpenRemove] = useState<boolean>(false)
    const queryClient = useQueryClient()
    const handleRemove = async () => {
        const response = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/api/office/${office._id}`, {
            method: "DELETE",
            credentials: "include"
        })
        queryClient.invalidateQueries({queryKey: ["my-offices"]})
        setOpenRemove(false)
    }
    return (
        <div key={"mypage-office-" + office._id} className="w-full flex bg-white text-gray-700 border rounded-md overflow-hidden group transition-all">
            <div className="h-32 w-32 min-w-32 bg-gray-700">
                <img src={office.thumbnails[0]} className="w-full h-full object-cover" />
            </div>
            <div className="w-full flex flex-col h-full px-8 py-4">
                <h1 className="text-xl">{office.name}</h1>
                <h3 className="font-light text-gray-500">{office.location}</h3>
                <div className="ml-auto flex gap-4 mt-auto">
                    <HideButton id={office._id} hidden={office.hidden} />
                    <button className="hover:bg-gray-300 p-2 rounded-full transition-all"><FaRegEdit /></button>
                    <button onClick={() => setOpenRemove(true)} className="hover:bg-gray-300 p-2 rounded-full transition-all"><FaRegTrashAlt /></button>
                </div>
            </div>
            <RemoveDialog open={openRemove} setOpen={setOpenRemove} handleRemove={handleRemove} dialogText={"Är du säker på att du vill ta bort det här kontoret?"} />            
        </div>
    )
}
interface HideButtonProps {
    id: string,
    hidden: boolean
}
const HideButton = ({id, hidden} : HideButtonProps) => {
    const queryClient = useQueryClient()
    const ToggleHidden = async () => {
        const response = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/api/office/${id}/hidden`, {
            credentials: "include"
        })
        if(response.status == 200) {toast.success("Successfully toggled visibility of office")}
        else {toast.error("Failed to toggle visibility of office")}
        queryClient.invalidateQueries({queryKey: ["my-offices"]})
        queryClient.invalidateQueries({queryKey: ["all-my-offices"]})
    }
    return (
        <button onClick={ToggleHidden} className="hover:bg-gray-300 p-2 rounded-full transition-all">{!hidden ? <FaRegEye /> : <FaRegEyeSlash />}</button>
    )
}

export default MyPageOfficeCard