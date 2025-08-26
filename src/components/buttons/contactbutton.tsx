import { Box } from "@mui/material";
import Modal from "@mui/material/Modal";
import { FormEvent, useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";

type Props = {
    broker: string;
}

interface FormData {
    companyName: string;
    email: string;
    phone: string;
    message: string;
}

interface FormErrors {
    companyName?: string;
    email?: string;
    phone?: string;
    message?: string;
}

export default function ContactButton({ broker }: Props) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        companyName: "",
        email: "",
        phone: "",
        message: ""
    });
    const [errors, setErrors] = useState<FormErrors>({});

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};
        
        if (!formData.email) {
            newErrors.email = "E-post krävs";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Ogiltig e-postadress";
        }

        if (!formData.message.trim()) {
            newErrors.message = "Meddelande krävs";
        }

        if (formData.phone && !/^[0-9+\-\s()]*$/.test(formData.phone)) {
            newErrors.phone = "Ogiltigt telefonnummer";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handleClose = () => {
        setOpen(false);
        setFormData({
            companyName: "",
            email: "",
            phone: "",
            message: ""
        });
        setErrors({});
    };

    const sendFirstMessage = async (event: FormEvent) => {
        event.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/api/message/`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    receiver: broker,
                    company: formData.companyName,
                    email: formData.email,
                    phone: formData.phone,
                    message: formData.message
                })
            });

            if (response.ok) {
                toast.success("Meddelandet har skickats!");
                handleClose();
            } else {
                const data = await response.json();
                toast.error(data.message || "Det gick inte att skicka meddelandet");
            }
        } catch (error) {
            toast.error("Ett fel uppstod. Försök igen senare.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-white font-medium transition-all"
            >
                <span className="hidden sm:block">Kontakta</span>
                <HiOutlineMail className="w-5 h-5" />
            </button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="contact-modal-title"
                aria-describedby="contact-modal-description"
            >
                <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-xl shadow-xl">
                    <form onSubmit={sendFirstMessage} className="relative">
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-100">
                            <div>
                                <h2 id="contact-modal-title" className="text-xl font-semibold text-gray-900">
                                    Kontakta säljare
                                </h2>
                                <p className="text-sm text-gray-500 mt-1">
                                    Fyll i formuläret nedan för att skicka ett meddelande
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={handleClose}
                                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                aria-label="Stäng"
                            >
                                <IoClose className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Form Fields */}
                        <div className="p-6 space-y-4">
                            {/* Company Name */}
                            <div>
                                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                                    Företagsnamn
                                </label>
                                <input
                                    id="companyName"
                                    name="companyName"
                                    type="text"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                                    placeholder="Ditt företag (valfritt)"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    E-post <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2.5 rounded-lg border ${
                                        errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200'
                                    } focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors`}
                                    placeholder="din@email.se"
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                )}
                            </div>

                            {/* Phone */}
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                    Telefon
                                </label>
                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2.5 rounded-lg border ${
                                        errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-200'
                                    } focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors`}
                                    placeholder="+46 70 123 45 67"
                                />
                                {errors.phone && (
                                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                                )}
                            </div>

                            {/* Message */}
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                                    Meddelande <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2.5 rounded-lg border ${
                                        errors.message ? 'border-red-300 bg-red-50' : 'border-gray-200'
                                    } focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors`}
                                    placeholder="Skriv ditt meddelande här..."
                                />
                                {errors.message && (
                                    <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-gray-100">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-2.5 px-4 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium 
                                    transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
                                    disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? "Skickar..." : "Skicka meddelande"}
                            </button>
                        </div>
                    </form>
                </Box>
            </Modal>
        </>
    );
}
