import { useQuery } from "@tanstack/react-query"
import { useAuth } from "../../../context/Auth/AuthContext"
import OfficeCardLong from "../../cards/officecardlong"
import Loading from "../../layout/loading"
import FiveHundred from "../../layout/FiveHundred"
import IOffice from "../../../interfaces/IOffice"
import { Link } from "react-router-dom"
import MyPageOfficeCard from "../../cards/mypageofficecard"

export default function Listings() {
    const {authId} = useAuth()

    const {isPending,error,data} = useQuery({
        queryKey: ['my-offices'],
        queryFn: () => {
            return fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/api/office/self?limit=4`, {
                credentials: "include"
            }).then(response => response.json())
        }
    })

    if(isPending) return <Loading />
    if(error) return <FiveHundred />    
    return (
        <div className="flex flex-col col-span-2 gap-4 bg-white text-gray-700 rounded p-8">
            <h1 className="text-2xl font-semibold mb-4">Dina annonser</h1>
            {data.offices.map((office: IOffice) => <MyPageOfficeCard office={office} />)}
            <div className="flex justify-center mt-4">
                <Link to="/min-sida/alla-kontor" className="border border-gray-700 hover:bg-gray-700 hover:text-white rounded-full px-4 py-2 transition-all">Visa alla dina annonser</Link>
            </div>
        </div>
    )
}