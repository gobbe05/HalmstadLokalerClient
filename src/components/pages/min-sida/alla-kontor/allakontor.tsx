import { useQuery } from "@tanstack/react-query"
import { useAuth } from "../../../../context/Auth/AuthContext"
import Loading from "../../../layout/loading"
import FiveHundred from "../../../layout/FiveHundred"
import IOffice from "../../../../interfaces/IOffice"
import OfficeCardLong from "../../../cards/officecardlong"
import { useEffect } from "react"
import BackButton from "../../../buttons/backbutton"

export default function AllaKontor() {
    const {authId} = useAuth()
    const {isPending, error, data} = useQuery({
        queryKey: ["allmyoffices"],
        queryFn: () => {
            return fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/api/office/user/${authId}`)
            .then(response => response.json())
        } 
    })

    useEffect(() => {console.log(data)}, [])

    if(isPending) return <Loading />
    if(error) return <FiveHundred />
    return (
        <div className="w-2/3 mx-auto my-16 p-16 rounded bg-white">
            <BackButton link="/min-sida" />
            <h1 className="text-2xl font-semibold text-gray-700 mt-2">Alla kontor</h1>
            <div className="flex flex-col gap-4 mt-8">
                {data.offices.map((office: IOffice) => <OfficeCardLong office={office} />)}
            </div>
        </div>
    )
}