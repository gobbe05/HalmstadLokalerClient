import { Box, Modal } from '@mui/material';
import { IoClose } from 'react-icons/io5';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

export type ContactType = 'email' | 'phone' | null;

interface ContactInfoModalProps {
    type: ContactType;
    userId: string;
    onClose: () => void;
}

const ContactInfoModal = ({ type, userId, onClose }: ContactInfoModalProps) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [info, setInfo] = useState<string>('');

    useEffect(() => {
        const fetchContactInfo = async () => {
            if (!type || !userId) return;
            
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_SERVER_ADDRESS}/auth/${type}/${userId}`,
                    { credentials: 'include' }
                );

                if (!response.ok) {
                    throw new Error('Kunde inte hämta informationen');
                }

                const data = await response.json();
                setInfo(data[type === 'email' ? 'email' : 'phoneNumber']);
            } catch (err) {
                setError((err as Error).message);
                toast.error('Ett fel uppstod vid hämtning av information');
            } finally {
                setLoading(false);
            }
        };

        fetchContactInfo();
    }, [type, userId]);
    return (
        <Modal
            open={type !== null}
            onClose={onClose}
            aria-labelledby="contact-info-modal"
        >
            <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-white rounded-xl shadow-xl">
                <div className="relative">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900">
                            {type === 'email' ? 'E-postadress' : 'Telefonnummer'}
                        </h2>
                        <button
                            onClick={onClose}
                            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <IoClose className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        {loading ? (
                            <div className="flex items-center justify-center py-4">
                                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        ) : error ? (
                            <div className="text-center text-red-500">
                                {error}
                            </div>
                        ) : info ? (
                            <div className="flex flex-col items-center gap-4">
                                <p className="text-xl font-medium text-gray-900">{info}</p>
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(info);
                                        toast.success("Kopierat till urklipp!");
                                    }}
                                    className="px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 hover:bg-primary/5 rounded-lg transition-colors"
                                >
                                    Kopiera
                                </button>
                            </div>
                        ) : (
                            <div className="text-center text-gray-500">
                                Ingen {type === 'email' ? 'e-postadress' : 'telefonnummer'} tillgänglig
                            </div>
                        )}
                    </div>
                </div>
            </Box>
        </Modal>
    );
};

export default ContactInfoModal;
