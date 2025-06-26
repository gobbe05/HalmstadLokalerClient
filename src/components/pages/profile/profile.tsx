import { useEffect, useState, useRef } from 'react';
import OfficeCardLong from '../../cards/officecardlong';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { FaTimes } from 'react-icons/fa';

const ProfileCard = ({openProfile, setOpenProfile, id}: {openProfile: boolean, setOpenProfile: React.Dispatch<React.SetStateAction<boolean>>, id: string}) => {
    const [limit, setLimit] = useState<number | null>(3)
    const boxRef = useRef<HTMLDivElement>(null);

    const queryClient = useQueryClient()
    const {isPending,error, data: officesData} = useQuery({
        queryKey: ['profile-offices-'+id],
        queryFn: () => {
            return fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/api/office/user/${id}/${limit ? `?limit=${limit}` : ""}`, {
                credentials: "include"
            }).then(response => response.json())
        }
    })
    const {isPending: isPending2, error: error2, data: profileData} = useQuery({
        queryKey: ['profile-'+id],
        queryFn: () => {
            return fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/auth/user/${id}`, {
                credentials: "include"
            }).then(response => response.json())
        }
    })

  useEffect(() => {
    queryClient.invalidateQueries({queryKey: ['profile-offices-'+id]})
  }
  , [limit])

  return (
    <div onClick={(event) => {
        if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
            setOpenProfile(false);
        }
    }} className={`w-screen h-screen fixed z-10 left-0 top-0 bg-gray-500 bg-opacity-50 ${!openProfile && "hidden" }`}>
        <div ref={boxRef} className="bg-white rounded-2xl shadow-lg max-w-2xl overflow-hidden w-full p-8 mx-auto mt-10">
            <div className="flex justify-between items-center mb-4">
                <button onClick={() => setOpenProfile(false)} className="text-gray-700 bg-white hover:bg-gray-700 hover:text-white p-1 rounded-full transition-all ml-auto"><FaTimes size={24}/></button>
            </div>
            <div className="flex flex-col items-center">
                <img src={`https://api.dicebear.com/5.x/initials/svg?seed=${profileData && profileData.user.username}`} alt="Profile" className="w-32 h-32 rounded-full border border-gray-300" />
                <h2 className="text-2xl font-bold text-gray-800">{profileData && profileData.user.firstName + profileData.user.lastName}</h2>
                <p className="text-sm text-gray-500 mb-10">{profileData && "@"+profileData.user.username}</p>

                {<div className="text-center text-gray-700 mb-6">
                    <p><strong>Email:</strong> {profileData && profileData.user.email}</p>
                    <p><strong>Telefon:</strong> {profileData && profileData.user.phoneNumber}</p>
                    <p><strong>Företag:</strong> {profileData && profileData.user.companyName}</p>
                    <p><strong>Org. Nr:</strong> {profileData && profileData.user.orgNr}</p>
                    <p><strong>Fakturaadress:</strong> {profileData && profileData.user.invoiceAddress}</p>
                </div>} 

                <div className={`${!officesData?.offices?.length && "hidden"} w-full overflow-scroll max-h-[40dvh]`}>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Offices</h3>
                    <div className="grid gap-4">
                        {officesData && officesData.offices.length > 0 && officesData.offices.map((office) => (
                            <OfficeCardLong office={office} key={office._id}/>
                        ))}
                    </div>
                    <div className="flex justify-center mt-4">
                        <button onClick={() => {setLimit(prev => prev == null ? 3 : null)}} className="text-gray-700 border border-gray-700 hover:bg-gray-700 hover:text-white rounded-full px-4 py-2 transition-all">{limit == null ? "Visa mindre" : "Visa alla annonser"}</button>
                    </div>

                </div>
            </div>
        </div>
    </div> 
  );
};

export default ProfileCard;
