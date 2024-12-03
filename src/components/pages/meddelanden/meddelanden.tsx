import IConversation from "../../../interfaces/IConversation"
import Conversation from "./conversation"
import { useQuery } from "@tanstack/react-query"
import Loading from "../../layout/loading"
import FiveHundred from "../../layout/FiveHundred"

export default function Meddelanden() {
    const {isPending,error,data} = useQuery({
        queryKey: ['conversations'],
        queryFn: () => {
            return fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/api/conversation`, {
                credentials: "include"
            }).then(response => response.json())
        }
    })

    if(isPending) return <Loading />
    if(error) return <FiveHundred />
    return (
        <div className="w-1/2 p-16 mx-auto my-16 text-gray-700 bg-white rounded">
            <h1 className="text-2xl font-semibold">Meddelanden</h1>
            <div className="flex flex-col gap-2 mt-4">
                {data.conversations.length == 1 ? data.conversations.map((conversation: IConversation) => <Conversation passedConversation={conversation} />) : <p className="">Här var det tomt. Påbörja en konversation och kom tillbaks.</p>}
            </div>
        </div>
    )
}

