import IConversation from "../../../interfaces/IConversation"
import { Link } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import FiveHundred from "../../layout/FiveHundred"

export default function Conversation({passedConversation}: {passedConversation: IConversation}) {
    return (
        <Link to={`/meddelanden/${passedConversation._id}`} className="flex flex-col border border-gray-700 rounded p-4">
            <p>{passedConversation.subject}</p>
            <LatestMessage id={passedConversation._id}/>
        </Link>
    )
}

const LatestMessage = ({id}: {id: string}) => {
    const {isPending,error,data} = useQuery({
        queryKey: ['latestmessage'],
        queryFn: () => {
            return fetch(`http://${import.meta.env.VITE_SERVER_IP}:${import.meta.env.VITE_SERVER_PORT}/api/message/latest/${id}`, {
                credentials: "include"
            }).then(response => response.json())
        }
    })
   
    if(isPending) return <LoadingConversation />
    if(error) return <FiveHundred />
    return (
        <>
        {data.message.message}
        </>)
}

const LoadingConversation = () => {
    return ("Loading...")    
}