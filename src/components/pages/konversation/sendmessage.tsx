import { FormEvent, useState } from "react";
import postMessage from '../../../utils/postMessage'
import { useQueryClient } from "@tanstack/react-query";

type SendMessageFormProps = {
    conversation: string
}

export default function SendMessageForm({conversation}: SendMessageFormProps) {
    const [message, setMessage] = useState<string>("")
    const queryClient = useQueryClient()

    const SendMessage = async (event: FormEvent) => {
        event.preventDefault()
        const status = await postMessage(message, conversation)
        queryClient.invalidateQueries({queryKey: ['messages']})
    }

    return (
        <form onSubmit={SendMessage} className="w-full mt-8">
            <label htmlFor="default-search" className="sr-only">
                Search
            </label>
            <div className="relative">
                <input 
                type="search" 
                id="default-search" 
                className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 outline-none" 
                placeholder="Skicka ett meddelande..."
                onChange={(e) => {setMessage(e.target.value)}} 
                required 
                />
                <button 
                type="submit" 
                className="absolute right-2.5 bottom-2.5 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg text-sm px-4 py-2 focus:ring-4 focus:outline-none focus:ring-blue-300"
                >
                Skicka
                </button>
            </div>
        </form>
    )
}