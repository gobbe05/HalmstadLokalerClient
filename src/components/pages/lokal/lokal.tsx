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
        const storedHistory = localStorage.getItem(historyKey);
        let visitedOffices: {_id: string}[] = storedHistory ? JSON.parse(storedHistory) : [];

        // Remove the current office if it already exists
        visitedOffices = visitedOffices.filter((item) => item._id !== id);

        // Add the current office to the front
        visitedOffices.unshift({ _id: id! });

        // Keep only the latest 4
        visitedOffices = visitedOffices.slice(0, 4);

        localStorage.setItem(historyKey, JSON.stringify(visitedOffices));
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
        <div className="bg-white flex-grow" key={id}>
            <div className="max-w-3xl mx-auto text-neutral xl:py-16 md:rounded-lg">  
                <div className={`w-full rounded bg-white`}> 
                    {/* Main */}
                    <div>
                        <div className="w-full">
                            <ImagesContainer images={data.office.images.slice(0,3)} imageLoading={imageLoading} imageError={imageError}/>
                        </div>
                        {/* Office Info */}
                        <div className="flex items-center justify-between mb-4 mt-4">
                            <div>
                                <h1 className="text-2xl font-semibold">{data.office.name}</h1>
                                <p className="text-gray-500">{data.office.location}</p>
                            </div>
                            <div>
                                {isAuthenticated && type === "buyer" && (
                                <LikeButton id={data.office._id} longButton={true}/>)}
                            </div>
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
                        <hr className="border-slate-300 my-8"/>
                        {/* Description */}
                        {data.office.description && (
                        <div>
                            <h3 className="text-lg font-semibold">Beskrivning</h3>
                            <p className="text-gray-700">{data.office.description}</p>
                        </div>
                        )}
                        {/* Tags */}
                        {data.office.tags.length > 0 && (
                        <div className="my-8">
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
                    </div>
                </div>
                <hr />
                <div>
                    <ProfileCard showOffices={false} id={data.office.owner} />
                </div>
            </div>
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
        <div className="text-gray-700 bg-gray-100 p-8 md:p-16 md:my-32">
            <h1 className="text-2xl font-semibold text-gray-700 text-center mt-16 md:mt-0">Andra lokaler från samma säljare</h1>
            <div className="max-w-3xl mx-auto py-8 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-12 w-full">
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