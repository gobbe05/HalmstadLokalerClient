import { AdvancedMarker, APIProvider, Map } from "@vis.gl/react-google-maps"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { HiArrowLeft } from "react-icons/hi2"
import { Link, useNavigate, useParams } from "react-router-dom"
import postOffice from "../../../utils/postOffice"
import { toast } from "react-toastify"
import BackButton from "../../buttons/backbutton"

type markerType = {
    lat: number,
    lng: number
} | undefined

export default function HyrUtLokal() {
    const [marker, setMarker] = useState<markerType>(undefined)
    const [name, setName] = useState<string>("")
    const [location, setLocation] = useState<string>("")
    const [size, setSize] = useState<number | undefined>(undefined)
    const [price, setPrice] = useState<number | undefined>(undefined)
    const [image, setImage] = useState<File | null>(null)
    const [type, setType] = useState<string>("")

    const navigate = useNavigate()

    const handleForm = async (event:  FormEvent) => {
        event.preventDefault()
        if(!size || !price || !marker || !image) {
            toast.error("Fyll i all information")
            return;
        }
        const office = await postOffice(name, location, size, price, marker, image)
        if(office) {
            toast.success("Skapade en ny annons")
            navigate("/")
            return
        }
        toast.error("Det uppstod ett fel när din annons skulle skapas")
    }

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        if(event.target.files) {
            setImage(event.target.files[0])
        }
    }
    useEffect(() => {
        console.log(image)
    }, [image])

    return (
        <div className="w-full flex flex-col items-center my-16 text-gray-700"> 
            <div className="w-[1024px] flex items-center gap-24 bg-white p-16 rounded">
                <form onSubmit={handleForm} className="flex-grow flex flex-col gap-4">
                    <BackButton link="/"/>
                    <h1 className="text-2xl font-semibold">Lägg upp en ny annons</h1>
                    <input onChange={(event) => {setName(event.target.value)}} 
                        className="text-gray-600 font-semibold border-b-2 border-gray-300 bg-gray-100 outline-none focus:border-blue-500 p-2 transition-all duration-500" 
                        name="name" 
                        placeholder="Namn..."/>
                    <input onChange={(event) => {setLocation(event.target.value)}} 
                        className="text-gray-600 font-semibold border-b-2 border-gray-300 bg-gray-100 outline-none focus:border-blue-500 p-2 transition-all duration-500" 
                        name="location" 
                        placeholder="Adress..."/>
                    <input onChange={(event) => {setSize(+event.target.value)}} 
                        className="w-32 text-gray-600 font-semibold border-b-2 border-gray-300 bg-gray-100 outline-none focus:border-blue-500 p-2 transition-all duration-500" 
                        name="size" type="number" 
                        placeholder="10 kvm"/>
                    <input onChange={(event) => {setPrice(+event.target.value)}} 
                        className="w-32 text-gray-600 font-semibold border-b-2 border-gray-300 bg-gray-100 outline-none focus:border-blue-500 p-2 transition-all duration-500"
                        type="number"
                        placeholder="100 kr/mån"/>
                    <select onChange={(event) => {setType(event.target.value)}} className="w-32 text-gray-600 font-semibold border-b-2 border-gray-300 bg-gray-100 outline-none focus:border-blue-500 p-2 transition-all duration-500">
                        <option value="Kontor" selected>Kontor</option>
                    </select>
                    <h1 className="text-lg font-semibold mt-4" onChange={handleImageChange}>Ladda upp en bild</h1>
                    <input
                        onChange={handleImageChange}
                        className="w-full text-gray-500 font-medium text-sm bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-2 file:px-4 file:mr-4 file:bg-gray-700 file:hover:bg-gray-600 file:text-white rounded file:transition-all" 
                        type="file"/>                    
                    
                    
                    <button className="p-2 bg-blue-500 hover:bg-blue-600 hover:shadow-lg rounded text-white transition-all duration-500">Skapa annons</button>
                </form>
            <div>
                <h1 className="text-xl font-semibold my-4">Klicka i den platsen som lokalen ligger på</h1>
                <ChooseLocation setMarker={setMarker} marker={marker}/>
            </div>
            </div>
        </div>
    )
}

const ChooseLocation = ({setMarker, marker}: {setMarker: React.Dispatch<React.SetStateAction<markerType>>, marker: markerType}) => {

    const position = {lat: 56.6744, lng: 12.8578 };
    const handleMapClick = (ev: any) => {
        const {lat, lng} = ev.detail.latLng
        setMarker({lat, lng})
    }

    return (
            <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API}>
                <div className="h-96 w-96">
                    <Map onClick={handleMapClick} defaultZoom={13} defaultCenter={position} mapId={"a78e92d174ef543b "}>
                        {marker && <AdvancedMarker position={marker}></AdvancedMarker>}
                    </Map>
                </div>
            </APIProvider>
    )
}