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

    const renderContent = () => {
        if (isPending) {
            return (
                <div className="flex justify-center items-center min-h-[400px]">
                    <div className="animate-pulse flex flex-col items-center">
                        <div className="h-8 w-32 bg-gray-200 rounded mb-4"></div>
                        <div className="h-4 w-48 bg-gray-200 rounded"></div>
                    </div>
                </div>
            )
        }

        if (error) {
            return (
                <div className="flex flex-col items-center justify-center min-h-[400px] p-8 bg-red-50 rounded-lg border border-red-200">
                    <svg className="w-12 h-12 text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <h3 className="text-xl font-bold text-red-700">Något gick fel</h3>
                    <p className="mt-2 text-red-600 text-center">{error.message || "Kunde inte hämta meddelanden. Försök igen senare."}</p>
                </div>
            )
        }

        if (!data?.messages?.length) {
            return (
                <div className="flex flex-col items-center justify-center min-h-[400px] p-8 bg-gray-50 rounded-lg border border-gray-200">
                    <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                    <h3 className="text-xl font-bold text-gray-700">Inga skickade meddelanden</h3>
                    <p className="mt-2 text-gray-600 text-center">Du har inte skickat några meddelanden än.</p>
                </div>
            )
        }

        return (
            <div className="w-full max-w-6xl mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-6">
                    {/* Messages List */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Skickade meddelanden</h2>
                        <div className="flex flex-col gap-3 max-h-[600px] overflow-y-auto">
                            {data.messages.map((message: IMessage) => (
                                <Message
                                    key={message._id}
                                    passedMessage={message}
                                    activeMessageId={activeMessageId}
                                    setActiveMessageId={setActiveMessageId}
                                    showRemove={false}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Message Details */}
                    <div className="md:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        {activeMessage ? (
                            <div className="space-y-6">
                                <h2 className="text-xl font-semibold text-gray-800 pb-4 border-b">Meddelandedetaljer</h2>
                                <div className="grid gap-6">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Företag</h3>
                                        <p className="mt-1 text-gray-900">{activeMessage.company}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">E-post</h3>
                                        <p className="mt-1 text-gray-900">{activeMessage.email}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Telefon</h3>
                                        <p className="mt-1 text-gray-900">{activeMessage.phone}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Meddelande</h3>
                                        <p className="mt-1 text-gray-900 whitespace-pre-wrap">{activeMessage.message}</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full py-12">
                                <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                </svg>
                                <p className="text-gray-500">Välj ett meddelande för att se detaljerna</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="w-full bg-gradient-to-br from-primary to-primary-dark text-white py-12 mb-8">
                <div className="max-w-6xl mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold">Skickade meddelanden</h1>
                    <p className="mt-4 text-lg md:text-xl opacity-90">Se alla meddelanden du har skickat</p>
                </div>
            </div>
            {renderContent()}
        </div>
    )
}