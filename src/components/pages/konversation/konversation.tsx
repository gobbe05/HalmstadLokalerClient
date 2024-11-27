import { useState } from "react"
import { useParams } from "react-router-dom"
import IMessage from "../../../interfaces/IMessage"
import SendMessageForm from "./sendmessage"
import { useQuery } from "@tanstack/react-query"
import Message from "./message"
import LoadingMessage from "./loadingmessage"

export default function Konversation() {
    const {id} = useParams()
    
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

    if(isPending || !id) return (<LoadingMessage />);
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

