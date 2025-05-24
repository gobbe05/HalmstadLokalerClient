import { useQuery } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"
import Loading from "../../layout/loading"
import ContactButton from "../../buttons/contactbutton"
import { useAuth } from "../../../context/Auth/AuthContext"
import IOffice from "../../../interfaces/IOffice"
import OfficeCard from "../../cards/officecard"
import { useEffect, useState } from "react"
import { HiArrowLeft } from "react-icons/hi2"
import ImagesContainer from "./imagescontainer"
import ProfileCard from "../profile/profile"
import { FaRegUserCircle } from "react-icons/fa"

export default function Lokal() {
    const {id} = useParams()
    const navigate = useNavigate()
    const [imageLoading, setImageLoading] = useState<boolean>(true)
    const [imageError, setImageError] = useState<boolean>(false)
    const [openProfile, setOpenProfile] = useState<boolean>(false)

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
        setOpenProfile(false)
    }, [data?.office])

    if (isPending || !id) return <Loading />;
    if (error) return <div>There was an error: {error.message}</div>;
    if (!data?.office) return <div>Office details not found.</div>;

    return (
        <div className="flex-grow" key={id}>
            <div className="flex flex-col gap-16 md:w-2/3 mx-auto text-gray-700 bg-white xl:p-8 md:mt-8 md:rounded-lg shadow-lg">  
                <div className={`w-full rounded bg-white py-8 p-8 xl:px-12`}>
                    {/* Header Section */}
                    <div className="py-4 flex justify-between items-center">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex gap-1 hover:gap-2 items-center hover:px-4 py-2 rounded-full hover:bg-gray-700 hover:text-white transition-all"
                        >
                            <HiArrowLeft size={20} />
                            <span className="text-sm font-medium">Gå tillbaks</span>
                        </button>
                    </div>
                    {/* Main */}
                    <div className="mt-8 grid grid-cols-3 gap-8">
                        <div className="col-span-3 lg:col-span-2 space-y-6">
                            <div>
                                <ImagesContainer images={data.office.images.slice(0,3)} imageLoading={imageLoading} imageError={imageError}/>
                                <button onClick={() => setOpenProfile(true)} className="mt-2 flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition-colors duration-300"><FaRegUserCircle size={16}/>Visa säljare</button>
                            </div> 
                            {/* Office Info */}
                            <div>
                                <h1 className="text-2xl font-semibold">{data.office.name}</h1>
                                <p className="text-gray-500">{data.office.location}</p>
                            </div>
                            {/* Size and Price */}
                            <div className="grid sm:grid-cols-2 gap-8">
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
            {<ProfileCard openProfile={openProfile} setOpenProfile={setOpenProfile} id={data.office.owner} />}
            <OtherOffices seller={data.office.owner} />
        </div>
    )
}

const OtherOffices = ({seller}: {seller: string}) => {
    const {error, isPending, data} = useQuery({
        queryKey: ["other-offices"],
        queryFn: async () => {
            const response = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/api/office/user/${seller}?limit=8`)
            const data = await response.json()
            return data
        }
    })
    
    if (error || isPending) return <Loading />
    return (
        <div className="md:w-2/3 mx-auto text-gray-700 bg-white p-8 md:p-16 md:my-32 rounded-lg shadow-lg">
            <h1 className="text-2xl font-semibold text-gray-700 text-center mt-16 md:mt-0">Andra lokaler från samma säljare</h1>
            <div className="py-8 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-12 w-full">
                {data.offices.length > 0 && data.offices.map((office: IOffice) => (
                    <OfficeCard
                    key={office._id} // Assuming each office has a unique ID
                    office={office} 
                    />
                ))}
                {data.offices.length === 0 && (
                    <div className="text-center text-gray-500">Inga andra lokaler hittades från samma säljare.</div>
                )}
            </div>
        </div>
    )
}