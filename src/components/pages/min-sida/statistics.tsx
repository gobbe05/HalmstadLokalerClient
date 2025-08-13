import { useQuery } from "@tanstack/react-query"
import { IoBusiness, IoEye, IoOpen } from "react-icons/io5"

export default function Statistics() {
    return (
        <div className="bg-white text-neutral border border-gray-200 rounded-md py-16 lg:pt-8 p-8">
            <h3 className="text-2xl font-semibold">Statistik</h3>
            <div className="flex justify-between mt-8 font-semibold">
                <Offices />
                <Views />
                <Visits />
            </div> 
        </div>
    )
}

const Views = () => {
    const {isPending, data} = useQuery({
        queryKey: ["viewcount"],
        queryFn: () => {
            return fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/api/statistics/views`, {credentials: "include"}).then(response => response.json())
        }
    })
    if(isPending) return
    return (
        <p className="text-center"><IoEye className="text-primary mx-auto" size={32} /> {data.views}</p>
    )
}

const Offices = () => {
    const {isPending, data} = useQuery({
        queryKey: ["officescount"],
        queryFn: () => {
            return fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/api/statistics/offices`, {credentials: "include"}).then(response => response.json())
        }
    })
    if(isPending) return
    return (
        <p className="text-center"><IoBusiness className="text-primary mx-auto" size={32} /> {data.count}</p>
    )
}
const Visits = () => {
    const {isPending, data} = useQuery({
        queryKey: ["clicks"],
        queryFn: () => {
            return fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/api/statistics/visits`, {credentials: "include"}).then(response => response.json())
        }
    })
    if(isPending) return
    return (
        <p className="text-center"><IoOpen className=" text-primary mx-auto" size={32} /> {data.visits}</p>
    )
}