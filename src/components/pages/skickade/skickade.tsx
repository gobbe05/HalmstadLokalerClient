import { useQuery } from "@tanstack/react-query"
import { useAuth } from "../../../context/Auth/AuthContext"
import IMessage from "../../../interfaces/IMessage"
import { useEffect, useState } from "react"
import Message from "../inkorg/message"

export default function Skickade() {
    const [activeMessageId, setActiveMessageId] = useState<string | null>(null)
    const [activeMessage, setActiveMessage] = useState<IMessage | null>(null)

    const {authId} = useAuth()
    const {data, error, isPending} = useQuery({
        queryKey: ["sent-messages"],
        queryFn: async () => {
            const response = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/api/message/sent/${authId}`,
                {
                    credentials: "include"
                }
            )
            if(!response.ok) {
                throw new Error("Failed to fetch messages")
            }

            const data = await response.json()
            setActiveMessageId(data.messages[0]?._id || null)
            return data 
        }
    })

    const updateActiveMessage = async () => {
        if(!activeMessageId) {
            setActiveMessage(null)
            return
        }
        const response = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/api/message/${activeMessageId}`, {
            credentials: "include"
        })
        const data = await response.json()
        setActiveMessage(data.message)
    }

    useEffect(() => {
        updateActiveMessage()
    }, [activeMessageId])

    if(isPending) return <div>Loading...</div>
    if(error) return <div>Error: {error.message}</div>
    return (
        <>
        <div className="flex-grow my-16 p-4 md:p-0 mx-auto md:grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
        {/* Inbox Section */}
        <div className="col-span-1 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-gray-800">Inkorg</h1>
            <div className="flex flex-col gap-4 mt-6 max-h-64 lg:max-h-max overflow-y-auto">
                {data.messages && data.messages.length > 0 ? (
                    data.messages.map((message: IMessage) => (
                        <Message
                            key={message._id}
                            passedMessage={message}
                            activeMessageId={activeMessageId}
                            setActiveMessageId={setActiveMessageId}
                            showRemove={false}
                        />
                    ))
                ) : (
                    <p className="text-gray-600">Här var det tomt. Kom tillbaks senare.</p>
                )}
            </div>
        </div>

        {/* Message Details Section */}
        <div className="mt-8 md:mt-0 col-span-2 p-6 bg-white rounded-lg shadow-md">
            <div className="space-y-4">
                <h1 className="text-2xl font-bold text-gray-800">Meddelande</h1>
                <div>
                    <h3 className="font-semibold text-lg text-gray-800">Företag</h3>
                    <p className="text-gray-600">{activeMessage?.company || "Ingen information tillgänglig."}</p>
                </div>
                <div>
                    <h3 className="font-semibold text-lg text-gray-800">E-mail</h3>
                    <p className="text-gray-600">{activeMessage?.email || "Ingen information tillgänglig."}</p>
                </div>
                <div>
                    <h3 className="font-semibold text-lg text-gray-800">Telefon</h3>
                    <p className="text-gray-600">{activeMessage?.phone || "Ingen information tillgänglig."}</p>
                </div>
                <div>
                    <h3 className="font-semibold text-lg text-gray-800">Meddelande</h3>
                    <p className="text-gray-600">{activeMessage?.message || "Ingen information tillgänglig."}</p>
                </div>
            </div>
        </div>
    </div>
        </>
    )
}