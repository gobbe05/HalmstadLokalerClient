import { useEffect, useState } from "react"
import IConversation from "../../../interfaces/IConversation"
import Conversation from "./conversation"
import { useQuery } from "@tanstack/react-query"
import Loading from "../../layout/loading"
import FiveHundred from "../../layout/FiveHundred"

export default function Meddelanden() {
    const {isPending,error,data} = useQuery({
        queryKey: ['conversations'],
        queryFn: () => {
            return fetch(`http://${import.meta.env.VITE_SERVER_IP}:${import.meta.env.VITE_SERVER_PORT}/api/conversation`, {
                credentials: "include"
            }).then(response => response.json())
        }
    })

    if(isPending) return <Loading />
    if(error) return <FiveHundred />
    return (
        <div className="w-2/3 p-16 mx-auto my-16 bg-white">
            <h1 className="text-2xl">Meddelanden</h1>
            {data.conversations.map((conversation: IConversation) => <Conversation passedConversation={conversation} />)}
        </div>
    )
}

