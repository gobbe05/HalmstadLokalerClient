import { FaRegEdit, FaRegEye, FaRegTrashAlt } from "react-icons/fa"
import IOffice from "../../interfaces/IOffice"
import { useState } from "react"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from "@mui/material"
import { useQueryClient } from "@tanstack/react-query"

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
        <div className="w-full flex bg-white text-gray-700 border rounded-md overflow-hidden group transition-all">
            <div className="h-32 min-w-32 bg-gray-700">
                <img src={office.thumbnail} className="h-full" />
            </div>
            <div className="w-full flex flex-col h-full px-8 py-4">
                <h1 className="text-xl">{office.name}</h1>
                <h3 className="font-light text-gray-500">{office.location}</h3>
                <div className="ml-auto flex gap-4 mt-auto">
                    <button className="hover:bg-gray-300 p-2 rounded-full transition-all"><FaRegEye /></button>
                    <button className="hover:bg-gray-300 p-2 rounded-full transition-all"><FaRegEdit /></button>
                    <button onClick={() => setOpenRemove(true)} className="hover:bg-gray-300 p-2 rounded-full transition-all"><FaRegTrashAlt /></button>
                </div>
            </div>
            <Dialog
                open={openRemove}>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Är du säker på att du vill ta bort det här kontoret?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button onClick={() => setOpenRemove(false)} className="p-2 rounded hover:bg-gray-100">Close</button>
                    <button onClick={() => handleRemove()} className="p-2 rounded hover:bg-red-100 text-red-500">Remove</button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default MyPageOfficeCard