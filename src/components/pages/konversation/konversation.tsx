import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import IMessage from "../../../interfaces/IMessage"
import SendMessageForm from "./sendmessage"
import { useQuery } from "@tanstack/react-query"
import { useAuth } from "../../../context/Auth/AuthContext"

export default function Konversation() {
    const {id} = useParams()
    const navigate = useNavigate()
    
    const [messages, setMessages] = useState<Array<IMessage>>([])

    const {isPending, error, data} = useQuery({
        queryKey: ['messages'],
        queryFn: async () => {
            const response = await fetch(`http://${import.meta.env.VITE_SERVER_IP}:${import.meta.env.VITE_SERVER_PORT}/api/message/${id}`, {
                credentials: "include"
            })
            return response.json()
        }
    })

    if(isPending || !id) return (<>Loading...</>);
    if(error) return 'An error has occurred: ' + error.message;

    return (
        <div className="flex flex-col gap-8 w-2/3 mx-auto my-16 p-16 bg-white">
            <div className="flex flex-col gap-4">
                {data.messages.map((message: IMessage) => <Message message={message} key={message._id}/>)}
            </div>
            <SendMessageForm conversation={id}/>
        </div>
    )
}

type MessageProps = {
    message: IMessage    
}
const Message = ({message} : MessageProps) => {
    const [sender, setSender] = useState<string>("")
    const {authId} = useAuth()

    const GetSenderName = async () => {
        const response = await fetch(`http://${import.meta.env.VITE_SERVER_IP}:${import.meta.env.VITE_SERVER_PORT}/auth/username/${message.sender}`)
        const data = await response.json() 
        setSender(data.username)
    }

    useEffect(() => {
        GetSenderName()
    }, [message])

    return (
        <div className={`${message.sender == authId ? "bg-blue-500 text-white" : "bg-gray-200"} p-2`}>
            <h1>{sender}</h1>
            <p>{message.message}</p>
        </div>
    )
}