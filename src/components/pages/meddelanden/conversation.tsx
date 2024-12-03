import IConversation from "../../../interfaces/IConversation"
import { Link } from "react-router-dom"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import FiveHundred from "../../layout/FiveHundred"
import { HiOutlineTrash } from "react-icons/hi2"
import { toast } from "react-toastify"

export default function Conversation({passedConversation}: {passedConversation: IConversation}) {
    const queryClient = useQueryClient()
    const deleteConversation = async () => {
        const response = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/api/conversation/${passedConversation._id}`, {
            method: "DELETE",
            credentials: "include"
        })
        if(response.status == 200) toast.success("Tog bort konversation");
        if(response.status == 500) toast.success("Någonting gick fel...");
        queryClient.invalidateQueries({queryKey: [`conversations`]})
    }
    return (
        <div className="flex items-stretch justify-between overflow-hidden rounded text-gray-700 transition-all">
            <Link to={`/meddelanden/${passedConversation._id}`} className="hover:bg-gray-100 flex-grow p-4">
                <p className="flex flex-col text-lg font-semibold">{passedConversation.subject}</p>
                <LatestMessage id={passedConversation._id}/>
            </Link>
            <button onClick={deleteConversation} className="flex items-center justify-center p-4 bg-red-400 hover:bg-red-500 text-white transition-all">
                <HiOutlineTrash size={24}/>
            </button>
        </div>
    )
}

const LatestMessage = ({id}: {id: string}) => {
    const {isPending,error,data} = useQuery({
        queryKey: [`latestmessage+${id}`],
        queryFn: () => {
            return fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/api/message/latest/${id}`, {
                credentials: "include"
            }).then(response => response.json())
        }
    })
   
    if(isPending) return <LoadingMessage />
    if(error) return <FiveHundred />
    return (
        <p className="font-light text-sm">
            {data.message.message}
        </p>)
}

const LoadingMessage = () => {
    return ("...")    
}
