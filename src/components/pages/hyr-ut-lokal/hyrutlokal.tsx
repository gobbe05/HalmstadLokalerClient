import { AdvancedMarker, Map } from "@vis.gl/react-google-maps"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { useNavigate} from "react-router-dom"
import postOffice from "../../../utils/postOffice"
import { toast } from "react-toastify"
import BackButton from "../../buttons/backbutton"
import { TagsInput } from "react-tag-input-component"
import { Autocomplete, LoadScript } from "@react-google-maps/api"

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
    const [type, setType] = useState<string>("kontor")
    const [tags, setTags] = useState<Array<string>>([])
    const [description, setDescription] = useState<string>("")

    const navigate = useNavigate()

    const handleForm = async (event:  FormEvent) => {
        event.preventDefault()
        if(!size || !price || !marker || !image) {
            toast.error("Fyll i all information")
            return;
        }
        const office = await postOffice(name, location, size, type, price, marker, image, tags, description)
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

    return (

        <div className="w-full flex flex-col items-center my-16 text-gray-700"> 
            <div className="w-[1024px] flex items-center gap-24 bg-white p-16 rounded">
                <form onSubmit={handleForm} className="flex-grow flex flex-col gap-4">
                    <BackButton link="/"/>
                    <h1 className="text-2xl font-semibold">Lägg upp en ny annons</h1>
                    <input onChange={(event) => {setName(event.target.value)}} 
                        className="text-gray-600 font-semibold border-b-2 border-gray-300 bg-gray-100 outline-none focus:border-blue-500 p-2 transition-all duration-500" 
                        name="name" 
                        placeholder="Rubrik..."/>
                    <textarea onChange={(event) => {setDescription(event.target.value)}} 
                        className="w-full text-gray-600 font-semibold border-b-2 border-gray-300 bg-gray-100 outline-none focus:border-blue-500 p-2 transition-all duration-500"
                        placeholder="Beskrivning..."/>
                    <LocationInput setLocation={setLocation} setMarker={setMarker}/>
                    
                    <input onChange={(event) => {setSize(+event.target.value)}} 
                        className="w-32 text-gray-600 font-semibold border-b-2 border-gray-300 bg-gray-100 outline-none focus:border-blue-500 p-2 transition-all duration-500" 
                        name="size" type="number" 
                        placeholder="10 kvm"/>
                    <input onChange={(event) => {setPrice(+event.target.value)}} 
                        className="w-32 text-gray-600 font-semibold border-b-2 border-gray-300 bg-gray-100 outline-none focus:border-blue-500 p-2 transition-all duration-500"
                        type="number"
                        placeholder="100 kr/mån"/>
                    
                    <TagsInput
                        value={tags}
                        onChange={setTags}
                        name="tags"
                        placeHolder="Taggar..."
                    />
                    <select defaultValue={"Kontor"} onChange={(event) => {setType(event.target.value)}} className="w-32 text-gray-600 font-semibold border-b-2 border-gray-300 bg-gray-100 outline-none focus:border-blue-500 p-2 transition-all duration-500">
                        <option value="Kontor">Kontor</option>
                    </select>
                    <h1 className="text-lg font-semibold mt-4" onChange={handleImageChange}>Ladda upp en bild</h1>
                    <input
                        onChange={handleImageChange}
                        className="w-full text-gray-500 font-medium text-sm bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-2 file:px-4 file:mr-4 file:bg-gray-700 file:hover:bg-gray-600 file:text-white rounded file:transition-all" 
                        type="file"/>                    
                    
                    
                    <button className="p-2 bg-blue-500 hover:bg-blue-600 hover:shadow-lg rounded text-white transition-all duration-500">Skapa annons</button>
                </form>
            </div>
        </div>
    )
}

const LocationInput = ({setLocation, setMarker} : {setLocation : React.Dispatch<React.SetStateAction<string>>, setMarker: React.Dispatch<React.SetStateAction<markerType>>}) => {
    const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

    const onLoad = (autoC: google.maps.places.Autocomplete) => {setAutocomplete(autoC)};

    const onPlaceChanged = () => {
    if (autocomplete) {
        const place = autocomplete.getPlace();
        if(place.geometry && place.geometry.location) {
            const lat = place.geometry.location.lat()
            const lng = place.geometry.location.lng()

            setMarker({lat, lng})
            setLocation(place.formatted_address || "");
        }
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };

    return (
            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                <input
                    className="w-full text-gray-600 font-semibold border-b-2 border-gray-300 bg-gray-100 outline-none focus:border-blue-500 p-2 transition-all duration-500" 
                    name="location" 
                    placeholder="Adress..."/>
            </Autocomplete>  
    )
}

const ChooseLocation = ({setMarker, marker}: {setMarker: React.Dispatch<React.SetStateAction<markerType>>, marker: markerType}) => {

    const position = {lat: 56.6744, lng: 12.8578 };
    const handleMapClick = (ev: any) => {
        const {lat, lng} = ev.detail.latLng
        setMarker({lat, lng})
    }

    return (
        <div className="h-96 w-96">
            <Map onClick={handleMapClick} defaultZoom={13} defaultCenter={position} mapId={"a78e92d174ef543b "}>
                {marker && <AdvancedMarker position={marker}></AdvancedMarker>}
            </Map>
        </div>
    )
}