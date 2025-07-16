import { useQuery, useQueryClient } from "@tanstack/react-query"
import { FaHeart, FaRegHeart } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

const LikeButton = ({id, longButton} : {id: string, longButton?: boolean}) => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()


    const {data, isLoading, error} = useQuery({
        queryKey: ["like", id],
        queryFn: async () => {
            const response = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/api/saved/status/${id}`, {
                credentials: "include"
            })
            const data = await response.json()
            return data
        }
    })

    // Handle like toggle
    const ToggleLike = async (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        const url = `${import.meta.env.VITE_SERVER_ADDRESS}/api/saved`;
        const options: {credentials: "include", headers: {"Content-Type": string}} = {
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        };
        let response;
        if (data.saved) {
            response = await fetch(`${url}/${id}`, { method: "DELETE", ...options });
        } else {
            response = await fetch(url, {
            method: "POST",
            body: JSON.stringify({ office: id }),
            ...options,
            });
        }

        if(response.status == 401) navigate("/login");

        queryClient.invalidateQueries({ queryKey: [`like`, id] });
        queryClient.invalidateQueries({ queryKey: ["saved-offices"] });
    }

    if(isLoading || error) return ""
    if(data === "noauth") return ""
    if(longButton) return (
        <button onClick={ToggleLike} className={`group sm:border-2 border border-red-500 ${data.saved ? "bg-red-500" : "bg-white"} sm:bg-white sm:hover:bg-gray-100 sm:border-gray-500 text-gray-700 flex items-center px-4 rounded-md shadow-sm font-semibold transition-all`}>
            <span className="mr-2 sm:block hidden">Spara lokal</span>
            {data.saved ? <FaHeart className="text-white sm:text-red-500" /> : <FaRegHeart size={16} className="text-red-500 sm:text-black sm:group-hover:text-red-500 transition-all"/>}
        </button>
    )
    return (
        <div className="absolute bottom-2 left-2 hidden md:flex justify-end ">
            <button
                onClick={ToggleLike}
                className="bg-white flex items-center justify-center border border-gray-400 p-2 rounded-full hover:bg-gray-100 transition-all"
            >
                {data.saved ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
            </button>
        </div>
    )
}

export default LikeButton