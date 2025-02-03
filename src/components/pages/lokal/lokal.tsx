import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"
import Loading from "../../layout/loading"
import ContactButton from "../../buttons/contactbutton"
import { useAuth } from "../../../context/Auth/AuthContext"
import IOffice from "../../../interfaces/IOffice"
import OfficeCard from "../../cards/officecard"
import { useEffect, useState } from "react"
import { HiArrowLeft } from "react-icons/hi2"
import LikeButton from "../../buttons/likebutton"

export default function Lokal() {
    const {id} = useParams()
    const navigate = useNavigate()
    const [imageLoading, setImageLoading] = useState<boolean>(true)
    const [imageError, setImageError] = useState<boolean>(false)

    const {isAuthenticated, type} = useAuth()

    const {isPending, data, error} = useQuery({
        queryKey: ['office', id],
        queryFn: () => {
            return fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/api/office/${id}`).then(response => response.json())
        }
    })

    const addToPreviousLookedAt = () => {
        const historyKey = 'visitedOffices';
         // Retrieve the existing visited offices from localStorage, or default to an empty array.
        const storedHistory = localStorage.getItem(historyKey);
        const visitedOffices: {_id: string}[] = storedHistory ? JSON.parse(storedHistory) : []; 
        
       
        // Check if the current office is already in the history.
        const alreadyVisited = visitedOffices.some((item) => item._id === id); 

        // Check if the current office is already in the history
        if (!visitedOffices.find(item => item._id === id)) {
        // Add the new office. You might want to limit the history to a certain size.
        const newHistory = [...visitedOffices, { _id: id }];
        localStorage.setItem(historyKey, JSON.stringify(newHistory));
        }
    }

    useEffect(() => {
        setImageLoading(true)
        setImageError(false)
        addToPreviousLookedAt()
    }, [data?.office])

    if (isPending || !id) return <Loading />;
    if (error) return <div>There was an error: {error.message}</div>;
    if (!data?.office) return <div>Office details not found.</div>;

    return (
        <div className="flex-grow" key={id}>
            <div className="flex flex-col gap-16 w-2/3 mx-auto text-gray-700 bg-white p-16 my-32 rounded-lg shadow-lg">  
                <div className={`w-full rounded bg-white py-8 px-16`}>
                    {/* Header Section */}
                    <div className="py-4 flex justify-between items-center border-b border-gray-200">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition"
                        >
                            <HiArrowLeft size={20} />
                            <span className="text-sm font-medium">Gå tillbaks</span>
                        </button>
                    </div>
                    {/* Main */}
                    <div className="mt-8 grid grid-cols-3 gap-8">
                        <div className="col-span-2 space-y-6">
                            {/* Image */}
                            <div className="relative">
                                {imageLoading && !imageError && <Loading />}
                                <img
                                    src={imageError ? "/fallback-image.jpg" : data.office.images[0]}
                                    alt={data.office.name}
                                    onError={() => setImageError(true)}
                                    onLoad={() => setImageLoading(false)}
                                    className="w-full h-96 object-cover rounded-md"
                                />
                                <LikeButton id={data.office._id}/>
                            </div>
                            {/* Office Info */}
                            <div>
                                <h1 className="text-2xl font-semibold">{data.office.name}</h1>
                                <p className="text-gray-500">{data.office.location}</p>
                            </div>
                            {/* Size and Price */}
                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-gray-500">Yta</h3>
                                    <p className="text-lg font-semibold">{data.office.size} m²</p>
                                </div>
                                <div>
                                    <h3 className="text-gray-500">Pris</h3>
                                    <p className="text-lg font-semibold">{data.office.price} kr/mån</p>
                                </div>
                            </div>

                            {/* Description */}
                            {data.office.description && (
                            <div>
                                <h3 className="text-lg font-semibold">Beskrivning</h3>
                                <p className="text-gray-700">{data.office.description}</p>
                            </div>
                            )}
                            {/* Tags */}
                            {data.office.tags.length > 0 && (
                            <div>
                                <h3 className="text-lg font-semibold">Taggar</h3>
                                <div className="flex gap-2 flex-wrap mt-2">
                                {data.office.tags.map((tag: any) => (
                                    <span
                                    key={tag}
                                    className="text-sm bg-gray-200 text-gray-700 px-3 py-1 rounded-full"
                                    >
                                    {tag}
                                    </span>
                                ))}
                                </div>
                            </div>
                            )}

                            {/* Contact Button */}
                            {isAuthenticated && type === "buyer" && (
                            <ContactButton broker={data.office.owner} />
                            )}
                        </div>
                    </div>
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
        <div className="w-2/3 mx-auto text-gray-700 bg-white p-16 my-32 rounded-lg shadow-lg">
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