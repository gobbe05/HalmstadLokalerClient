import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useTranslation } from "react-i18next";

type Props = {
    broker: string
}
const ContactForm = ({broker}: Props) => {
    const [companyName, setCompanyName] = useState<string>("")
    const [message, setMessage] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [phone, setPhone] = useState<string>("")

    const navigate = useNavigate()
    const { t } = useTranslation();

    const sendFirstMessage = async (event: FormEvent) => {
        event.preventDefault()
        const response = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/api/message/`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({receiver: broker, company: companyName, message, email, phone})
        })
        if(response.status == 200) {
            const data = await response.json()
            toast.success(t('contactform.success'))
            navigate("/meddelanden/" + data.conversation)

        } else {
            toast.error(t('contactform.error'))
        }
    }

    return (
        <form onSubmit={sendFirstMessage} className="w-full p-8 text-gray-700">
            <div className="flex justify-between">
                <h1 className="text-2xl font-semibold">{t('contactform.header')}</h1>
            </div>

            <p className="mt-4">{t('contactform.companyName')}</p>
            <input
                onChange={(event) => setCompanyName(event.target.value)}  
                className="w-full text-gray-600 font-semibold border-b-2 border-gray-300 bg-gray-100 outline-none focus:border-blue-500 p-3 mt-1 transition-all duration-300"/>

            <p className="mt-4">{t('contactform.email')}</p>
            <input
                onChange={(event) => setEmail(event.target.value)}  
                className="w-full text-gray-600 font-semibold border-b-2 border-gray-300 bg-gray-100 outline-none focus:border-blue-500 p-3 mt-1 transition-all duration-300"/>
            
            <p className="mt-4">{t('contactform.phone')}</p>
            <input
                onChange={(event) => setPhone(event.target.value)}  
                className="w-full text-gray-600 font-semibold border-b-2 border-gray-300 bg-gray-100 outline-none focus:border-blue-500 p-3 mt-1 transition-all duration-300"/>

            <p className="mt-4">{t('contactform.message')}</p>               
            <textarea
                onChange={(event) => setMessage(event.target.value)} 
                className="w-full text-gray-600 font-semibold border-b-2 border-gray-300 bg-gray-100 outline-none focus:border-blue-500 p-3 mt-1 transition-colors duration-300"/>
            
            <button
                type="submit"
                className="w-full mt-2 p-3 bg-blue-500 hover:bg-blue-600 hover:shadow-lg rounded-lg text-white font-semibold transition-all duration-300">
                {t('contactform.send')}
            </button>
        </form>
    )
}

export default ContactForm