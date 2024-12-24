import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import Loading from "../../layout/loading"
import ContactButton from "../../buttons/contactbutton"
import { useAuth } from "../../../context/Auth/AuthContext"

export default function Lokal() {
    const {id} = useParams()

    const {isAuthenticated} = useAuth()

    const {isPending, data, error} = useQuery({
        queryKey: ['office'],
        queryFn: () => {
            return fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/api/office/${id}`).then(response => response.json())
        }
    })

    if(isPending || !id) return <Loading />
    if(error) return "There was an error " + error.message

    return (
        <div className="flex-grow bg-white">
            <div className="flex w-2/3 mx-auto my-16 p-16">
                <div className="w-2/3">
                    <img className="w-full" src={data.office.image} />
                    <div className="flex justify-between mt-4">
                        <div>
                            <h1 className="text-2xl font-semibold">{data.office.name}</h1>
                            <h3 className="text-xl font-light">{data.office.location}</h3>
                        </div>
                        {isAuthenticated && <ContactButton broker={data.office.owner} />}
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
        </div>
    )
}