import IConversation from "../../../interfaces/IConversation"
import { Link } from "react-router-dom"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import FiveHundred from "../../layout/FiveHundred"
import { HiOutlineTrash } from "react-icons/hi2"
import { toast } from "react-toastify"
import IMessage from "../../../interfaces/IMessage"
import { useEffect } from "react"

type Props = {
    passedMessage: IMessage;
    activeMessageId: string | null;
    setActiveMessageId: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function Message({ passedMessage, activeMessageId, setActiveMessageId }: Props) {
    const queryClient = useQueryClient();
    const deleteConversation = async () => {
        const response = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/api/conversation/${passedMessage._id}`, {
            method: "DELETE",
            credentials: "include",
        });
        if (response.status == 200) toast.success("Tog bort konversation");
        if (response.status == 500) toast.error("Någonting gick fel...");
        queryClient.invalidateQueries({ queryKey: ["conversations"] });
    };

    useEffect(() => {
        console.log(activeMessageId);
    }, [activeMessageId]);

    return (
        <div
            onClick={() => setActiveMessageId(passedMessage._id)}
            className={`flex items-center justify-between p-4 ${activeMessageId == passedMessage._id ? "bg-blue-400 text-white" : "bg-gray-50 hover:bg-gray-100"} rounded-lg transition cursor-pointer`}
        >
            {/* Message Preview */}
            <div className="w-full">
                <LatestMessage id={passedMessage._id} />
            </div>

            {/* Delete Button */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    deleteConversation();
                }}
                className="ml-4 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
                <HiOutlineTrash size={20} />
            </button>
        </div>
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
        <div className="p-2">
            <p className="font-semibold">{data.message.email}</p>
            <p className="text-sm">{data.message.message}</p>
        </div>
    )
}

const LoadingMessage = () => {
    return ("...")    
}
