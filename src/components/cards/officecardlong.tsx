import { Link } from "react-router-dom";
import IOffice from "../../interfaces/IOffice";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function OfficeCardLong({office}: {office: IOffice}) {
    const queryClient = useQueryClient()
    const {error, isPending, data} = useQuery({
        queryKey: [`like-${office._id}`],
        queryFn: async () => {
            const response = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/api/saved/status/${office._id}`,{
                credentials: "include"
            })
            if(response.status == 401) return "noauth"
            const data = await response.json()
            return data
        }
    })
    
    const ToggleLike = async (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault()
        if(data.saved) {
            await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/api/saved/${office._id}`, {
                method: "DELETE",
                credentials: "include"
            })
        } else {
            await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/api/saved`, {
                method: "POST",
                credentials: "include",
                body: JSON.stringify({office: office._id}),
                headers: {
                    "Content-Type" : "application/json"
                }
            })
        }
        queryClient.invalidateQueries({queryKey: [`like-${office._id}`]})
    }
    if(error || isPending) return ""
    return (
        <Link to={"/lokal/"+office._id} className="w-full flex bg-white text-gray-700 border rounded-md shadow hover:shadow-md overflow-hidden group transition-all">
            <div className="h-full min-w-48 bg-gray-500">
                <img className="h-full" src={office.thumbnail}/>
            </div>
            <div className="flex flex-col justify-between w-full p-4">
                <div className="text-gray-700"> 
                    <div className="flex items-center gap-4">
                        <h1 className="text-xl font-semibold group-hover:underline underline-offset-2">{office.name}</h1> 
                    </div>
                    <p className="text-sm font-light">{office.location}</p>
                    <p className="font-xl font-bold mt-2">{office.size} m2</p>
                    <p className="h-16 mt-4 text-sm text-ellipsis overflow-hidden">{office.description}</p> 
                </div>
                {data != "noauth" &&
                <button onClick={ToggleLike} className="relative flex justify-end">
                    <i className="border border-gray-700 p-2 rounded-full">
                       {data.saved ? <FaHeart /> : <FaRegHeart />} 
                    </i>
                </button>} 
            </div>
            
        </Link>
    )
}