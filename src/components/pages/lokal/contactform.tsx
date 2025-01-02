import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

type Props = {
    broker: string
}
const ContactForm = ({broker}: Props) => {
    const [companyName, setCompanyName] = useState<string>("")
    const [message, setMessage] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [phone, setPhone] = useState<string>("")

    const navigate = useNavigate()

    const sendFirstMessage = async (event: FormEvent) => {
        event.preventDefault()
        const response = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/api/message/first`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({broker, company: companyName, message, email, phone})
        })
        if(response.status == 200) {
            const data = await response.json()
            toast.success("Succesfully sent message")
            navigate("/meddelanden/" + data.conversation)

        } else {
            toast.error("There was an error sending your message")
        }
    }

    return (
        <form onSubmit={sendFirstMessage} className="w-full p-8 text-gray-700">
            <div className="flex justify-between">
                <h1 className="text-2xl font-semibold">Skicka ett meddelande</h1>
            </div>

            <p className="mt-4">Företagsnamn</p>
            <input
                onChange={(event) => setCompanyName(event.target.value)}  
                className="w-full text-gray-600 font-semibold border-b-2 border-gray-300 bg-gray-100 outline-none focus:border-blue-500 p-3 mt-1 transition-all duration-300"/>

            <p className="mt-4">E-post</p>
            <input
                onChange={(event) => setEmail(event.target.value)}  
                className="w-full text-gray-600 font-semibold border-b-2 border-gray-300 bg-gray-100 outline-none focus:border-blue-500 p-3 mt-1 transition-all duration-300"/>
            
            <p className="mt-4">Telefon</p>
            <input
                onChange={(event) => setPhone(event.target.value)}  
                className="w-full text-gray-600 font-semibold border-b-2 border-gray-300 bg-gray-100 outline-none focus:border-blue-500 p-3 mt-1 transition-all duration-300"/>

            <p className="mt-4">Meddelande</p>               
            <textarea
                onChange={(event) => setMessage(event.target.value)} 
                className="w-full text-gray-600 font-semibold border-b-2 border-gray-300 bg-gray-100 outline-none focus:border-blue-500 p-3 mt-1 transition-colors duration-300"/>
            
            <button
                type="submit"
                className="w-full mt-2 p-3 bg-blue-500 hover:bg-blue-600 hover:shadow-lg rounded-lg text-white font-semibold transition-all duration-300">
                Skicka
            </button>
        </form>
    )
}

export default ContactForm