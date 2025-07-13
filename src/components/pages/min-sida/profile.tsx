import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { AiOutlineCheck, AiOutlineLoading3Quarters } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";


export default function MyProfile({id}: {id: string}) {
    const [openEditProfile, setOpenEditProfile] = useState(false);

    const queryClient = useQueryClient();
    const {isPending: isPending2, error: error2, data: profileData} = useQuery({
        queryKey: ['profile-'+id],
        queryFn: () => {
            return fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/auth/user/${id}`, {
                credentials: "include"
            }).then(response => response.json())
        }
    })
    return (
        <>
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <div className="flex flex-col items-center mb-6">
                <img src={`https://api.dicebear.com/5.x/initials/svg?seed=${profileData && profileData.user.username}`} alt="Profile" className="w-24 h-24 rounded-full border border-gray-300" />
                <h2 className="text-2xl font-bold text-gray-800">{profileData && profileData.user.firstName + profileData.user.lastName}</h2>
                <p className="text-sm text-gray-500 mb-10">{profileData && "@"+profileData.user.username}</p>

                <div className="text-gray-700 mb-6 mr-auto">
                    <p><strong>Email:</strong> {profileData && profileData.user.email}</p>
                    <p><strong>Företag:</strong> {profileData && profileData.user.companyName}</p>
                    <p><strong>Telefon:</strong> {profileData && profileData.user.phoneNumber}</p>
                    <p><strong>Org. Nr:</strong> {profileData && profileData.user.orgNr}</p>
                    <p><strong>Fakturaadress:</strong> {profileData && profileData.user.invoiceAddress}</p>
                </div>
            </div>
            <p className="text-gray-600 mb-2">Hantera din profilinformation och inställningar.</p>
            <button onClick={() => setOpenEditProfile(true)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                Redigera Profil
            </button>
        </div>
        <EditProfileModal 
            isOpen={openEditProfile} 
            onClose={() => {
                setOpenEditProfile(false)
                queryClient.invalidateQueries({queryKey: ['profile-'+id]}) // Invalidate the profile query to refresh data
            }} 
            profileData={profileData}
        />
        </>
        );
}

interface EditProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    profileData: any; // Adjust type as needed
}
const EditProfileModal = ({isOpen, onClose, profileData}: EditProfileModalProps) => {
    const [firstName, setFirstName] = useState(profileData && profileData.user.firstName);
    const [lastName, setLastName] = useState(profileData && profileData.user.lastName);
    const [phoneNumber, setPhoneNumber] = useState(profileData && profileData.user.phoneNumber);
    const [invoiceAddress, setInvoiceAddress] = useState(profileData && profileData.user.invoiceAddress);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    
    if (!isOpen) return null;
    const onSuccess = () => {
        setSuccess(true);
        setLoading(false);
        setTimeout(() => {
            setSuccess(false);
            onClose();
        }, 2000);
    }
    const onError = () => {
        setError(true);
        setLoading(false);
        setTimeout(() => {
            setError(false);
        }, 2000);
    }
    const submitForm = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Handle form submission logic here
        const response = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/auth/user/${profileData.user._id}`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstName,
                lastName,
                phoneNumber,
                invoiceAddress
            })
        });
        if(response.ok) {setTimeout(onSuccess, 1000);}
        else {setTimeout(onError, 500);}
    }
            
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Redigera Profil</h2>
                {/* Form for editing profile goes here */}
                <form onSubmit={submitForm}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="firstName">Förnamn</label>
                        <input 
                            type="text" 
                            id="firstName" 
                            defaultValue={profileData && profileData.user.firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="lastName">Efternamn</label>
                        <input 
                            type="text" 
                            id="lastName" 
                            defaultValue={profileData && profileData.user.lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="email">E-post</label>
                        <input
                            disabled 
                            type="email" 
                            id="email" 
                            defaultValue={profileData && profileData.user.email} 
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2" htmlFor="phoneNumber">Telefonnummer</label>
                        <input 
                            type="text" 
                            id="phoneNumber" 
                            defaultValue={profileData && profileData.user.phoneNumber} 
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="companyName">Företagsnamn</label>
                        <input 
                            disabled
                            type="text" 
                            id="companyName" 
                            defaultValue={profileData && profileData.user.companyName} 
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="orgNr">Organisationsnummer</label>
                        <input
                            disabled 
                            type="text" 
                            id="orgNr" 
                            defaultValue={profileData && profileData.user.orgNr} 
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-gray-700 mb-2" htmlFor="invoiceAddress">Fakturaadress</label>
                        <input 
                            type="text" 
                            id="invoiceAddress"
                            defaultValue={profileData && profileData.user.invoiceAddress}
                            onChange={(e) => setInvoiceAddress(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                    <p className="text-sm">Kontakta support@halmstadlokaler.se om du vill ändra e-post, företagsnamn eller organisationsnummer.</p>
                    <div className="mt-4 flex gap-2">
                        <button onClick={onClose} className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition-colors">
                            Stäng
                        </button>
                        <button type="submit" className={`w-32 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors ${loading ? "bg-gray-300 hover:bg-gray-400 cursor-not-allowed" : ""} ${success ? 'bg-green-500 hover:bg-green-600 cursor-not-allowed' : ''} ${error ? "bg-red-500 hover:bg-red-600 cursor-not-allowed":""}`} disabled={success}>
                            {loading && <AiOutlineLoading3Quarters className="mx-auto"/>}
                            {success && <AiOutlineCheck className="mx-auto" />}
                            {error && <RxCross2 className="mx-auto" />}
                            {!loading && !success && !error && "Spara"}
                        </button>
                    </div> 
                </form>
                
            </div>
        </div>
    );
}