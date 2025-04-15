import { FaRegEdit, FaRegEye, FaRegEyeSlash, FaRegTrashAlt, FaSave } from "react-icons/fa"
import IOffice from "../../interfaces/IOffice"
import { FormEvent, useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import RemoveDialog from "../reusable/dialogs/removedialog"
import { FaUpRightFromSquare } from "react-icons/fa6";
import OfficeForm from "../reusable/forms/officeform"
import { Link } from "react-router-dom"
import { Modal } from "@mui/material"
import { MdOutlineImageNotSupported } from "react-icons/md"

interface MyPageOfficeCardProps {
    office: IOffice
}

const MyPageOfficeCard = ({office}: MyPageOfficeCardProps) => {
    const [openRemove, setOpenRemove] = useState<boolean>(false)
    const [openEdit, setOpenEdit] = useState<boolean>(false)
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
        <>
            <div key={"mypage-office-" + office._id} className="w-full flex bg-white text-gray-700 border rounded-md overflow-hidden group transition-all">
                <div className="h-32 w-32 min-w-32 bg-gray-700">
                    {
                        office.thumbnails[0] ?
                        <img src={import.meta.env.VITE_BUCKET_ADDRESS + office.thumbnails[0]} className="w-full h-full object-cover" />
                        :
                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                            <MdOutlineImageNotSupported size={32} />
                        </div>
                    }
                </div>
                <div className="w-full flex flex-col h-full px-8 py-4">
                    <h1 className="text-xl">{office.name}</h1>
                    <h3 className="font-light text-gray-500">{office.location}</h3>
                    <div className="ml-auto flex gap-4 mt-auto">
                        {!office.hidden && <Link className="text-gray-700 hover:bg-gray-300 p-2 rounded-full transition-all" to={`/lokal/${office._id}`}><FaUpRightFromSquare /></Link>}
                        <HideButton id={office._id} hidden={office.hidden} />
                        <button onClick={() => setOpenEdit(prev => !prev)} className="hover:bg-gray-300 p-2 rounded-full transition-all"><FaRegEdit /></button>
                        <button onClick={() => setOpenRemove(true)} className="hover:bg-gray-300 p-2 rounded-full transition-all"><FaRegTrashAlt /></button>
                    </div>
                </div>
                <RemoveDialog open={openRemove} setOpen={setOpenRemove} handleRemove={handleRemove} dialogText={"Är du säker på att du vill ta bort det här kontoret?"} />            
            </div>
            <EditForm open={openEdit} setOpenEdit={setOpenEdit} id={office._id} />
        </>
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

const EditForm = ({open, setOpenEdit, id}: {open: boolean, setOpenEdit: (value: boolean) => void, id: string}) => {
    const handleClose = () => {
        setOpenEdit(false)
    }
    return (
        <Modal onClose={handleClose} open={open} className="flex items-center justify-center">
            <div className="bg-white overflow-y-scroll w-2/3 h-3/4 p-16 rounded-md shadow-lg">
                <OfficeForm handleClose={handleClose} id={id} method={"PUT"}/>
            </div>
        </Modal>
    )
}
export default MyPageOfficeCard