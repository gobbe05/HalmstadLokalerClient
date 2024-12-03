import { useEffect, useState } from "react"
import { useAuth } from "../../../context/Auth/AuthContext"
import IMessage from "../../../interfaces/IMessage"

type MessageProps = {
    message: IMessage    
}
const Message = ({message} : MessageProps) => {
    const [sender, setSender] = useState<string>("")
    const {authId} = useAuth()

    const GetSenderName = async () => {
        const response = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/auth/username/${message.sender}`)
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

export default Message