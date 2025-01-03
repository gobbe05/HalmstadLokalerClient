import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import Loading from "../../layout/loading"
import ContactButton from "../../buttons/contactbutton"
import { useAuth } from "../../../context/Auth/AuthContext"
import IOffice from "../../../interfaces/IOffice"
import OfficeCard from "../../cards/officecard"
import { useEffect, useState } from "react"
import ContactForm from "./contactform"


export default function Lokal() {
    const {id} = useParams()
    const [imageLoading, setImageLoading] = useState<boolean>(true)

    const {isAuthenticated, type} = useAuth()

    const queryClient = useQueryClient()
    const {isPending, data, error} = useQuery({
        queryKey: ['office'],
        queryFn: () => {
            return fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/api/office/${id}`).then(response => response.json())
        }
    })

    useEffect(() => {
        queryClient.invalidateQueries({queryKey: ["office"]})
    }, [id])

    if(isPending || !id) return <Loading />
    if(error) return "There was an error " + error.message

    return (
        <div className="flex-grow">
            <div className="flex w-2/3 gap-8 min-h-64 mx-auto my-16 text-gray-700">
                <div className={`w-2/3 ${imageLoading && "hidden"} rounded bg-white p-16`}>
                    <img onLoad={() => setImageLoading(false)} className="min-h-[260px] max-h-[400px]" src={data.office.image} />
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

                    {data.office.description &&
                    <div>
                        <h3 className="font-semibold text-lg mt-8">Beskrivning</h3>
                        <p>{data.office.description}</p>
                    </div>} 

                    {data.office.tags.length != 0 &&
                    <div className="mt-4">
                        <h1 className="text-lg font-semibold">Taggar</h1>
                        <div className="flex gap-2 mt-2">
                            {data.office.tags.map((tag: string) => {
                                return <Tag tag={tag}/>
                            })} 
                        </div>
                    </div> 
                    }
                </div> 
                <div className="flex flex-grow rounded bg-white p-4">
                    <ContactForm />
                </div>
            </div>
            <OtherOffices />
        </div>
    )
}

interface TagProps {
    tag: string
}
const Tag = ({tag}: TagProps) => {
    return (
        <div className="px-4 py-0.5 bg-gray-300 text-gray-800 rounded-full">
            <p className="font-light">{tag}</p>
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