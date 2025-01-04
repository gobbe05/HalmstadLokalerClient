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
    const [companyName, setCompanyName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [phone, setPhone] = useState<string>("")
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
            body: JSON.stringify({broker, companyName, email, phone, message})
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
    {/* Button to Open Modal */}
    <div>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white font-medium transition-all"
      >
        <HiOutlineMail size={18} />
        <span>Kontakta försäljaren</span>
      </button>
    </div>

    {/* Modal for Contact Form */}
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="contact-modal-title"
      aria-describedby="contact-modal-description"
    >
      <Box
        style={{ transform: "translate(-50%, -50%)" }}
        className="absolute top-1/2 left-1/2 w-full max-w-md bg-white rounded-lg shadow-lg p-6 transform"
      >
        <form onSubmit={sendFirstMessage} className="space-y-4 text-gray-700">
          {/* Modal Header */}
          <div className="flex justify-between items-center">
            <h1 id="contact-modal-title" className="text-xl font-bold">
              Skicka ett meddelande
            </h1>
            <button
                type="button"
                onClick={() => {setOpen(false)}}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                &#10005; {/* Close (X) icon */}
              </button>
          </div>

          {/* Company Name */}
          <div>
            <label htmlFor="company-name" className="block text-sm font-medium">
              Företagsnamn
            </label>
            <input
              id="company-name"
              type="text"
              onChange={(event) => setCompanyName(event.target.value)}
              className="w-full mt-1 p-3 border border-gray-300 rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              E-post
            </label>
            <input
              id="email"
              type="email"
              onChange={(event) => setEmail(event.target.value)}
              className="w-full mt-1 p-3 border border-gray-300 rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium">
              Telefon
            </label>
            <input
              id="phone"
              type="tel"
              onChange={(event) => setPhone(event.target.value)}
              className="w-full mt-1 p-3 border border-gray-300 rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium">
              Meddelande
            </label>
            <textarea
              id="message"
              rows={4}
              onChange={(event) => setMessage(event.target.value)}
              className="w-full mt-1 p-3 border border-gray-300 rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded font-semibold shadow-md transition-all duration-300"
          >
            Skicka
          </button>
        </form>
      </Box>
    </Modal>
  </>
);
 
}