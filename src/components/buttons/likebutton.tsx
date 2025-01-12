import { useQuery, useQueryClient } from "@tanstack/react-query"
import { FaHeart, FaRegHeart } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

const LikeButton = ({id} : {id: string}) => {
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
    return (
        <div className="absolute bottom-2 left-2 flex justify-end">
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