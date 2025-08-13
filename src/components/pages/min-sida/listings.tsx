import { useQuery } from "@tanstack/react-query"
import Loading from "../../layout/loading"
import FiveHundred from "../../layout/FiveHundred"
import IOffice from "../../../interfaces/IOffice"
import MyPageOfficeCard from "../../cards/mypageofficecard"
import ShowAllButton from "../../buttons/showallbutton"
import { Link } from "react-router-dom"

export default function Listings() {
    const {isPending,error,data} = useQuery({
        queryKey: ['my-offices'],
        queryFn: () => {
            return fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/api/office/self?limit=5`, {
                credentials: "include"
            }).then(response => response.json())
        }
    })

    if(isPending) return <Loading />
    if(error) return <FiveHundred />    
    return (
        <div className="flex flex-col col-span-2 gap-4 bg-white text-neutral border border-gray-200 rounded-md p-8">
            <h1 className="text-2xl font-semibold mb-4">Dina annonser</h1>
            {data.offices.map((office: IOffice) => <MyPageOfficeCard office={office} />)}
            <div className="flex mt-4">
                <Link className="bg-primary hover:bg-primary-dark text-white flex items-center px-6 py-3 rounded-md" to="/min-sida/alla-kontor">Visa alla dina annonser</Link>
            </div>
        </div>
    )
}