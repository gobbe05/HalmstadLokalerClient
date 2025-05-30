import { useQuery } from "@tanstack/react-query"

export default function Statistics() {
    return (
        <div className="bg-white py-16 lg:pt-8 p-8 lg:rounded">
            <h3 className="text-2xl font-semibold">Statistik</h3>
            <div className="mt-4">
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
        <p>Visningar: {data.views}</p>
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
        <p>Annonser: {data.count}</p>
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
        <p>Klick: {data.visits}</p>
    )
}