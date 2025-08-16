import {useQuery} from "@tanstack/react-query";
import ProfileCard from "../profile/profile";
import { useState } from "react";

interface ISeller {
    username: string;
    email: string;
    _id: string;
}

export default function Sellers() {
    const [openProfile, setOpenProfile] = useState<boolean>(false)
    const [id, setId] = useState<string | null>(null)
    const {error, isPending, data} = useQuery({
        queryKey: ["sellers"],
        queryFn: async () => {
            const response = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/api/seller`, {
                credentials: "include"
            })
            const data = await response.json()
            return data
        }
    })
    return (
        <div className="flex flex-col w-full xl:w-2/3 mx-auto text-gray-700 bg-white xl:p-16 sm:p-8 xl:mt-16 xl:mb-32 xl:rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-center">
                Säljare
            </h1>
            <div className="flex flex-col gap-8 mt-16">
                {data && data.sellers.map((seller: ISeller) => (<SellerCard setId={setId} setOpenProfile={setOpenProfile} seller={seller} key={seller._id} />))}
            </div>
            {id && <ProfileCard showOffices={false} id={id}/>}
        </div>
    );
}

interface SellerCardProps {
   seller: ISeller;
   setOpenProfile: React.Dispatch<React.SetStateAction<boolean>>;
   setId: React.Dispatch<React.SetStateAction<string | null>>;
}
const SellerCard = ({seller, setOpenProfile, setId}:SellerCardProps) => {
    return (
        <button onClick={() => {
            setOpenProfile(true)
            setId(seller._id)
        }}>
            <div className="flex items-center gap-4 p-4 rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200 hover:border-gray-400 hover:bg-gray-50 cursor-pointer">
                <div>
                    <img src={`https://api.dicebear.com/5.x/initials/svg?seed=${seller.username}`} alt="Profile" className="w-16 h-16 rounded-full border border-gray-300" />   
                </div>
                <div>
                    <h2 className="text-xl text-gray-700 font-bold">{seller.username}</h2>
                    <p className="text-gray-600">{seller.email}</p>
                </div>  
            </div>
        </button>
    );
}