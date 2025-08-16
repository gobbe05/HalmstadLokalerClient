import { useEffect, useState, useRef } from 'react';
import OfficeCardLong from '../../cards/officecardlong';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import ContactButton from '../../buttons/contactbutton';
import { useAuth } from '../../../context/Auth/AuthContext';
import { IoIosCall } from 'react-icons/io';
import { IoBusinessOutline, IoCallOutline, IoMailOutline } from 'react-icons/io5';

const ProfileCard = ({showOffices, id}: {showOffices: boolean, id: string}) => {
    const [limit, setLimit] = useState<number | null>(3)
    const boxRef = useRef<HTMLDivElement>(null);

    const {isAuthenticated, type} = useAuth()

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
    <div>
        <div ref={boxRef} className="overflow-hidden mt-8">
            <div className="flex flex-col items-start">
                <div className="flex flex-col items-center">
                    <img src={`https://api.dicebear.com/5.x/initials/svg?seed=${profileData && profileData.user.username}`} alt="Profile" className="w-24 h-24 rounded-full border border-gray-300" />
                    <h2 className="mt-2 text-2xl font-bold text-gray-800">{profileData && profileData.user.firstName + profileData.user.lastName}</h2>
                    <p className="text-sm text-gray-500 mb-8">{profileData && "@"+profileData.user.username}</p>
                    {isAuthenticated && type === "buyer" && (
                        <ContactButton broker={id} />
                    )}
                </div> 

                <div className="flex flex-col gap-1 text-gray-700 mt-8">
                    <p className="flex items-center gap-2"><IoMailOutline /> {profileData && profileData.user.email}</p>
                    <p className="flex items-center gap-2"><IoCallOutline /> {profileData && profileData.user.phoneNumber}</p>
                    <p className="flex items-center gap-2"><IoBusinessOutline /> {profileData && profileData.user.companyName}</p>
                </div>

                <div className={`${!officesData?.offices?.length || !showOffices && "hidden"} w-full overflow-scroll max-h-[40dvh]`}>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Offices</h3>
                    <div className="grid gap-4">
                        {officesData && officesData.offices.length > 0 && officesData.offices.map((office: any) => (
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
