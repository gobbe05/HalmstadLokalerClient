import { useQuery } from "@tanstack/react-query"
import Loading from "../../layout/loading"
import IMessage from "../../../interfaces/IMessage"
import { useEffect, useState } from "react"
import Message from "./message"

export default function Inkorg() {
    const [activeMessageId, setActiveMessageId] = useState<string | null>(null)
    const [activeMessage, setActiveMessage] = useState<IMessage | null>(null)
    const {isPending, error, data} = useQuery({
        queryKey: ['messages'],
        queryFn: async () => {
            const response = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/api/message`, {
                credentials: "include"
            })
            const data = await response.json()
            setActiveMessageId(data.messages[0]?._id || null);
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

    if(isPending || error) return <Loading />
   return (
    <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-primary to-primary-dark text-white">
            <div className="max-w-7xl mx-auto px-4 py-16 md:py-20">
                <div className="max-w-3xl">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                        Inkorg
                    </h1>
                    <p className="text-lg md:text-xl text-white/90">
                        Hantera dina meddelanden och förfrågningar från intresserade köpare.
                    </p>
                </div>
            </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 -mt-8 pb-16 relative z-10">
            <div className="grid md:grid-cols-3 gap-6">
                {/* Messages List */}
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                        <h2 className="text-xl font-semibold text-gray-900">Inkomna meddelanden</h2>
                    </div>
                    <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
                        {data.messages && data.messages.length > 0 ? (
                            data.messages.map((message: IMessage) => (
                                <Message
                                    key={message._id}
                                    passedMessage={message}
                                    activeMessageId={activeMessageId}
                                    setActiveMessageId={setActiveMessageId}
                                    showRemove={true}
                                />
                            ))
                        ) : (
                            <div className="p-6 text-center">
                                <p className="text-gray-500">Inga meddelanden att visa.</p>
                                <p className="text-sm text-gray-400">Nya meddelanden visas här när de kommer in.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Message Details */}
                <div className="md:col-span-2">
                    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-gray-100">
                            <h2 className="text-xl font-semibold text-gray-900">Meddelandedetaljer</h2>
                        </div>
                        {activeMessage ? (
                            <div className="p-6 space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="bg-gray-50 rounded-xl p-4">
                                        <h3 className="text-sm font-medium text-gray-500 mb-1">Företag</h3>
                                        <p className="text-gray-900">{activeMessage.company || "Ej angivet"}</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-4">
                                        <h3 className="text-sm font-medium text-gray-500 mb-1">E-post</h3>
                                        <p className="text-gray-900">{activeMessage.email || "Ej angivet"}</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-4">
                                        <h3 className="text-sm font-medium text-gray-500 mb-1">Telefon</h3>
                                        <p className="text-gray-900">{activeMessage.phone || "Ej angivet"}</p>
                                    </div>
                                </div>
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <h3 className="text-sm font-medium text-gray-500 mb-2">Meddelande</h3>
                                    <p className="text-gray-900 whitespace-pre-wrap">{activeMessage.message || "Inget meddelande"}</p>
                                </div>
                            </div>
                        ) : (
                            <div className="p-6 text-center">
                                <p className="text-gray-500">Välj ett meddelande från listan för att visa detaljer</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
);
 
}

