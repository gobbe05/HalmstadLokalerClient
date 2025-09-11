
import { useQuery } from "@tanstack/react-query"
import { Helmet } from "react-helmet-async"
import { useAuth } from "../../../context/Auth/AuthContext"
import IMessage from "../../../interfaces/IMessage"
import { useEffect, useState } from "react"
import Message from "../inkorg/message"
import { useTranslation } from 'react-i18next';

export default function Skickade() {
    const [activeMessageId, setActiveMessageId] = useState<string | null>(null)
    const [activeMessage, setActiveMessage] = useState<IMessage | null>(null)
    const { t } = useTranslation();
    const pageTitle = t('skickade.header', 'Skickade meddelanden') + " | HalmstadLokaler";
    const pageDescription = t('skickade.headerText', 'Se alla meddelanden du har skickat');

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
                throw new Error(t('skickade.errorFetch', 'Failed to fetch messages'))
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
                    <h3 className="text-xl font-bold text-red-700">{t('skickade.errorTitle', 'Något gick fel')}</h3>
                    <p className="mt-2 text-red-600 text-center">{error.message || t('skickade.errorText', 'Kunde inte hämta meddelanden. Försök igen senare.')}</p>
                </div>
            )
        }

        if (!data?.messages?.length) {
            return (
                <div className="flex flex-col items-center justify-center min-h-[400px] p-8 bg-gray-50 rounded-lg border border-gray-200">
                    <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                    <h3 className="text-xl font-bold text-gray-700">{t('skickade.noneTitle', 'Inga skickade meddelanden')}</h3>
                    <p className="mt-2 text-gray-600 text-center">{t('skickade.noneText', 'Du har inte skickat några meddelanden än.')}</p>
                </div>
            )
        }

        return (
            <div className="w-full max-w-6xl mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-6">
                    {/* Messages List */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">{t('skickade.listTitle', 'Skickade meddelanden')}</h2>
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
                                <h2 className="text-xl font-semibold text-gray-800 pb-4 border-b">{t('skickade.detailsTitle', 'Meddelandedetaljer')}</h2>
                                <div className="grid gap-6">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">{t('skickade.company', 'Företag')}</h3>
                                        <p className="mt-1 text-gray-900">{activeMessage.company}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">{t('skickade.email', 'E-post')}</h3>
                                        <p className="mt-1 text-gray-900">{activeMessage.email}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">{t('skickade.phone', 'Telefon')}</h3>
                                        <p className="mt-1 text-gray-900">{activeMessage.phone}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">{t('skickade.message', 'Meddelande')}</h3>
                                        <p className="mt-1 text-gray-900 whitespace-pre-wrap">{activeMessage.message}</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full py-12">
                                <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                </svg>
                                <p className="text-gray-500">{t('skickade.selectMessage', 'Välj ett meddelande för att se detaljerna')}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            <Helmet>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://halmstadlokaler.se/skickade" />
            </Helmet>
            <div className="min-h-screen bg-gray-50">
                <div className="w-full bg-gradient-to-br from-primary to-primary-dark text-white py-12 mb-8">
                    <div className="max-w-6xl mx-auto px-4">
                        <h1 className="text-4xl md:text-5xl font-bold">{t('skickade.header', 'Skickade meddelanden')}</h1>
                        <p className="mt-4 text-lg md:text-xl opacity-90">{t('skickade.headerText', 'Se alla meddelanden du har skickat')}</p>
                    </div>
                </div>
                {renderContent()}
            </div>
        </>
    )
}