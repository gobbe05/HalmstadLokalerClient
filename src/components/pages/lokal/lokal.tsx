import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import Loading from "../../layout/loading"
import ContactButton from "../../buttons/contactbutton"
import { useAuth } from "../../../context/Auth/AuthContext"
import IOffice from "../../../interfaces/IOffice"
import OfficeCard from "../../cards/officecard"

export default function Lokal() {
    const {id} = useParams()

    const {isAuthenticated, type} = useAuth()

    const {isPending, data, error} = useQuery({
        queryKey: ['office'],
        queryFn: () => {
            return fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/api/office/${id}`).then(response => response.json())
        }
    })

    if(isPending || !id) return <Loading />
    if(error) return "There was an error " + error.message

    return (
        <div className="flex-grow">
            <div className="flex w-2/3 mx-auto my-16 p-16 rounded bg-white">
                <div className="w-2/3">
                    <img className="w-full" src={data.office.image} />
                    <div className="flex justify-between mt-4">
                        <div>
                            <h1 className="text-2xl font-semibold">{data.office.name}</h1>
                            <h3 className="text-xl font-light">{data.office.location}</h3>
                        </div>
                        {isAuthenticated && type == "buyer" && <ContactButton broker={data.office.owner} />}
                    </div>
                    <div className="flex gap-12 mt-4">
                        <div>
                            <h3 className="font-light">Yta</h3>
                            <p className="font-semibold">{data.office.size} m^2</p>
                        </div>
                        <div>
                            <h3 className="font-light">Pris</h3>
                            <p className="font-semibold">{data.office.price} kr/mån</p>
                        </div>
                    </div>

                    <h3 className="font-semibold text-lg mt-8">Beskrivning</h3>
                    <p>{data.office.description}</p>
                </div> 
            </div>
            <OtherOffices />
        </div>
    )
}

const OtherOffices = () => {
    const {error, isPending, data} = useQuery({
        queryKey: ["other-offices"],
        queryFn: async () => {
            const response = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/api/office?limit=8`)
            const data = await response.json()
            return data
        }
    })
    
    if (error || isPending) return <Loading />
    return (
        <div className="bg-white p-16 mb-16 w-2/3 mx-auto">
            <h1 className="text-2xl font-semibold text-gray-700 text-center">Andra lokaler</h1>
            <div className="py-8 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-12 w-full">
                {data.offices.map((office: IOffice) => (
                    <OfficeCard
                    key={office._id} // Assuming each office has a unique ID
                    office={office} 
                    />
                ))}
            </div>
        </div>
    )
}