import { useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"

interface IUser {
    _id: string, username: string, type: string, email: string, acceptDate: Date
}

export default function Accept() {
    const {error, isPending, data} = useQuery({
        queryKey: ["not-accepted-users"],
        queryFn: async () => {
            const response = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/auth/toaccept`, {
                credentials: "include"
            })
            return response.json()
        } 
    })
    
    if(isPending) return <div>Loading...</div>
    if(error) return <div>Error: {error.message}</div>
    return (
        <div className="bg-white p-8">
            {data.users.map((user: IUser) => (<UserToAccept key={user._id} user={user} />))}
            <div className="flex flex-col gap-2">
                {data.acceptedUsers.map((user: IUser) => {
                    return (
                        <div className="bg-green-200 p-4 rounded-lg shadow-md mb-4">
                            <h3 className="font-semibold text-lg">{user.username}</h3>
                            <p>{user.type}</p>
                            <p>{user.email}</p>
                            <p>Date: {user.acceptDate?.toString()}</p>
                        </div>
                    )
                })}
            </div> 
        </div>
    )
}

const UserToAccept = ({user}:{user: IUser}) => {
    const queryClient = useQueryClient()
    const handleAccept = async () => {
        const response = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/auth/accept/${user._id}`, {
            method: "PUT",
            credentials: "include"
        })
        if(response.status == 200) {
            queryClient.invalidateQueries({queryKey: ["not-accepted-users"]})
            toast.success(`Användaren ${user.username} med adressen ${user.email} har accepterats.`)
        }
    }
    return (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
            <h3 className="font-semibold text-lg">{user.username}</h3>
            <p className="text-gray-600">{user.type}</p>
            <p className="text-gray-600">{user.email}</p>
            <button onClick={handleAccept} className="p-2 bg-blue-500 text-white rounded-lg mt-2">Acceptera</button>
        </div>
    )
}