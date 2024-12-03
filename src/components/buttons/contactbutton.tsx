import { Box} from "@mui/material";
import Modal from "@mui/material/Modal";
import { FormEvent, useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type Props = {
    broker: string;
}

export default function ContactButton({broker}: Props) {
    const [open, setOpen] = useState<boolean>(false)
    const [subject, setSubject] = useState<string>("")
    const [message, setMessage] = useState<string>("")

    const navigate = useNavigate()

    const sendFirstMessage = async (event: FormEvent) => {
        event.preventDefault()
        const response = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/api/message/first`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({broker, message, subject})
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
      <>
        <div>
            <button onClick={() => {setOpen(true)}} className="flex items-center gap-2 px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white transition-all">
                <HiOutlineMail size={18}/>
                <p className="font-semibold text-sm">Kontakta försäljaren</p>
            </button>
        </div> 
        <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
            <Box style={{transform: 'translate(-50%,-50%)'}} className="rounded outline-none w-1/2 absolute top-1/2 left-1/2 transform-[-50%, -50%] bg-white">
                <form onSubmit={sendFirstMessage} className="p-8 text-gray-700">
                    <div className="flex justify-between">
                        <h1 className="text-2xl font-semibold">Skicka ett meddelande</h1>
                        <button onClick={() => {setOpen(false)}}><IoMdClose size={32} /></button>
                    </div> 
                    <p className="mt-8">Ämne</p>
                    <input
                        onChange={(event) => setSubject(event.target.value)}  
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
            </Box>
        </Modal>
        </> 
    )
}