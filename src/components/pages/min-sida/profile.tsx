import { useQuery } from "@tanstack/react-query";

export default function MyProfile({id}: {id: string}) {
    

    const {isPending: isPending2, error: error2, data: profileData} = useQuery({
        queryKey: ['profile-'+id],
        queryFn: () => {
            return fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/auth/user/${id}`, {
                credentials: "include"
            }).then(response => response.json())
        }
    })
    return (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <div className="flex flex-col items-center mb-6">
                <img src={`https://api.dicebear.com/5.x/initials/svg?seed=${profileData && profileData.user.username}`} alt="Profile" className="w-24 h-24 rounded-full border border-gray-300" />
                <h2 className="text-2xl font-bold text-gray-800">{profileData && profileData.user.firstName + profileData.user.lastName}</h2>
                <p className="text-sm text-gray-500 mb-10">{profileData && "@"+profileData.user.username}</p>

                <div className="text-gray-700 mb-6 mr-auto">
                    <p><strong>Email:</strong> {profileData && profileData.user.email}</p>
                    <p><strong>Företag:</strong> {profileData && profileData.user.companyName}</p>
                    <p><strong>Org. Nr:</strong> {profileData && profileData.user.orgNr}</p>
                    <p><strong>Fakturaadress:</strong> {profileData && profileData.user.invoiceAddress}</p>
                </div>
            </div>
            <p className="text-gray-600 mb-2">Hantera din profilinformation och inställningar.</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                Redigera Profil
            </button>
        </div>
    );
}