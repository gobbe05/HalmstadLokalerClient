import { useQuery } from "@tanstack/react-query"
import Loading from "../../layout/loading"
import FiveHundred from "../../layout/FiveHundred"
import IOffice from "../../../interfaces/IOffice"
import MyPageOfficeCard from "../../cards/mypageofficecard"
import ShowAllButton from "../../buttons/showallbutton"

export default function Listings() {
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
                <ShowAllButton link={`/min-sida/alla-kontor`} text="Visa alla annonser" />
            </div>
        </div>
    )
}