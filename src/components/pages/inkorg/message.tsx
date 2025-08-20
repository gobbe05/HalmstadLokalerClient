import IConversation from "../../../interfaces/IConversation"
import { Link } from "react-router-dom"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import FiveHundred from "../../layout/FiveHundred"
import { HiOutlineTrash } from "react-icons/hi2"
import { toast } from "react-toastify"
import IMessage from "../../../interfaces/IMessage"
import { useEffect, useState } from "react"
import RemoveDialog from "../../reusable/dialogs/removedialog"

type Props = {
    passedMessage: IMessage;
    activeMessageId: string | null;
    showRemove: boolean;
    setActiveMessageId: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function Message({ passedMessage, activeMessageId, setActiveMessageId, showRemove }: Props) {
    const [openRemove, setOpenRemove] = useState<boolean>(false)

    const queryClient = useQueryClient();
    const handleRemove = async () => {
        const response = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/api/message/${passedMessage._id}`, {
            method: "DELETE",
            credentials: "include",
        });
        if (response.status == 200) toast.success("Tog bort konversation");
        if (response.status == 500) toast.error("Någonting gick fel...");
        queryClient.invalidateQueries({ queryKey: ["messages"] });
    };

    return (
       <>
            <div
                onClick={() => setActiveMessageId(passedMessage._id)}
                className={`flex items-center justify-between px-6 py-4 ${
                    activeMessageId == passedMessage._id 
                    ? "bg-primary/5 border-l-4 border-primary" 
                    : "hover:bg-gray-50"
                } transition-all duration-200 cursor-pointer`}
            >
                {/* Message Preview */}
                <div className="w-full">
                    <LatestMessage id={passedMessage._id} />
                </div>

                {/* Delete Button */}
                {showRemove &&
                    <button
                        onClick={(e) => {setOpenRemove(true); e.stopPropagation()}}
                        className="ml-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
                        title="Ta bort meddelande"
                    >
                        <HiOutlineTrash size={20} />
                    </button>
                }
            </div>
            <RemoveDialog open={openRemove} setOpen={setOpenRemove} handleRemove={handleRemove} dialogText={"Är du säker på att du vill ta bort detta meddelandet?"}/>
        </> 
    );
}

const LatestMessage = ({id}: {id: string}) => {
    const {isPending,error,data} = useQuery({
        queryKey: [`latestmessage+${id}`],
        queryFn: () => {
            return fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/api/message/${id}`, {
                credentials: "include"
            }).then(response => response.json())
        }
    })
   
    if(isPending) return <LoadingMessage />
    if(error) return <FiveHundred />
    return (
        <div>
            <p className="font-semibold text-gray-900">{data.message.email}</p>
            <p className="text-sm text-gray-600 mt-1 line-clamp-1">{data.message.message}</p>
        </div>
    )
}

const LoadingMessage = () => {
    return ("...")    
}
