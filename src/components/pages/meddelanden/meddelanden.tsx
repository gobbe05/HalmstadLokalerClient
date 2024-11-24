import { useEffect, useState } from "react"
import IConversation from "../../../interfaces/IConversation"
import Conversation from "./conversation"

export default function Meddelanden() {
    const [conversations, setConversations] = useState<Array<IConversation>>([])
    const GetConversations = async () => {
        const response = await fetch(`http://${import.meta.env.VITE_SERVER_IP}:${import.meta.env.VITE_SERVER_PORT}/api/conversation`, {
            credentials: "include"
        })
        const data = await response.json()
        setConversations(data.conversations)
    }

    useEffect(() => {
        GetConversations()
    }, [])
    return (
        <div className="w-2/3 p-16 mx-auto my-16 bg-white">
            <h1 className="text-2xl">Meddelanden</h1>
            {conversations.map((conversation) => <Conversation passedConversation={conversation} />)}
        </div>
    )
}

