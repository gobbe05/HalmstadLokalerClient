import { useEffect, useState } from "react"
import IConversation from "../../../interfaces/IConversation"
import IMessage from "../../../interfaces/IMessage"
import { Link } from "react-router-dom"

export default function Conversation({passedConversation}: {passedConversation: IConversation}) {
    return (
        <Link to={`/meddelanden/${passedConversation._id}`} className="flex flex-col border border-gray-700 rounded p-4">
            <p>{passedConversation._id}</p>
            <LatestMessage id={passedConversation._id}/>
        </Link>
    )
}

const LatestMessage = ({id}: {id: string}) => {
    const [latestMessage, setLatestMessage] = useState<IMessage | undefined>()
    const GetLatestMessage = async () => {
        const response = await fetch(`http://${import.meta.env.VITE_SERVER_IP}:${import.meta.env.VITE_SERVER_PORT}/api/message/latest/${id}`, {
            credentials: "include"
        })
        const data = await response.json()
        setLatestMessage(data.message.message)
    }

    useEffect(() => {
        GetLatestMessage()
    }, [])

    return (
        <>
            {latestMessage}
        </>)
}