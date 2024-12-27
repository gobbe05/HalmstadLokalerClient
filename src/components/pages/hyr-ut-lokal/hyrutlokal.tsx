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
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const navigate = useNavigate()

    const handleForm = async (event:  FormEvent) => {
        event.preventDefault()
        if (!validate()) {
            toast.error("Formuläret innehåller fel. Kontrollera och försök igen.");
            return;
        }

        // Errors because it doesn't recognize the null check previously done by !validate()
        //@ts-ignore
        const office = await postOffice(name, location, size, type, price, marker, image, tags, description)
        if(office) {
            toast.success("Skapade en ny annons")
            navigate("/")
            return
        }
        toast.error("Det uppstod ett fel när din annons skulle skapas")
    }

    const validate = (): boolean => {
        const newErrors: { [key: string]: string } = {};

        if (!name.trim()) newErrors.name = "Rubrik är obligatoriskt.";
        if (!description.trim()) newErrors.description = "Beskrivning är obligatoriskt.";
        if (!location.trim()) newErrors.location = "Adress är obligatoriskt.";
        if (!size || size <= 0) newErrors.size = "Storlek måste vara ett positivt tal.";
        if (!price || price <= 0) newErrors.price = "Pris måste vara ett positivt tal.";
        if (!marker) newErrors.location = "Välj en giltig adress.";
        if (!image) newErrors.image = "Ladda upp en bild.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        if(event.target.files) {
            setImage(event.target.files[0])
        }
    }

    return (

        <div className="w-full flex flex-col items-center my-16 text-gray-700"> 
            <div className="w-[1024px] flex items-center gap-24 bg-white p-16 rounded">
                <form onSubmit={handleForm} className="flex-grow flex flex-col gap-4">
                    <BackButton link="/" />
                    <h1 className="text-2xl font-semibold">Lägg upp en ny annons</h1>

                    <div>
                        <input
                        onChange={(event) => setName(event.target.value)}
                        className={`text-gray-600 font-semibold border-b-2 ${errors.name ? 'border-red-500' : 'border-gray-300'} bg-gray-100 outline-none focus:border-blue-500 p-2 transition-all duration-500`}
                        name="name"
                        placeholder="Rubrik..."
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>

                    <div>
                        <textarea
                        onChange={(event) => setDescription(event.target.value)}
                        className={`w-full text-gray-600 font-semibold border-b-2 ${errors.description ? 'border-red-500' : 'border-gray-300'} bg-gray-100 outline-none focus:border-blue-500 p-2 transition-all duration-500`}
                        placeholder="Beskrivning..."
                        />
                        {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                    </div>

                    <LocationInput setLocation={setLocation} setMarker={setMarker} />
                    {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}

                    <div>
                        <input
                        onChange={(event) => setSize(+event.target.value)}
                        className={`w-32 text-gray-600 font-semibold border-b-2 ${errors.size ? 'border-red-500' : 'border-gray-300'} bg-gray-100 outline-none focus:border-blue-500 p-2 transition-all duration-500`}
                        name="size"
                        type="number"
                        placeholder="10 kvm"
                        />
                        {errors.size && <p className="text-red-500 text-sm">{errors.size}</p>}
                    </div>

                    <div>
                        <input
                        onChange={(event) => setPrice(+event.target.value)}
                        className={`w-32 text-gray-600 font-semibold border-b-2 ${errors.price ? 'border-red-500' : 'border-gray-300'} bg-gray-100 outline-none focus:border-blue-500 p-2 transition-all duration-500`}
                        type="number"
                        placeholder="100 kr/mån"
                        />
                        {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
                    </div>

                    <TagsInput value={tags} onChange={setTags} name="tags" placeHolder="Taggar..." />

                    <div>
                        <select
                        defaultValue={"Kontor"}
                        onChange={(event) => setType(event.target.value)}
                        className="w-32 text-gray-600 font-semibold border-b-2 border-gray-300 bg-gray-100 outline-none focus:border-blue-500 p-2 transition-all duration-500"
                        >
                        <option value="Kontor">Kontor</option>
                        </select>
                    </div>

                    <div>
                        <h1 className="text-lg font-semibold mt-4">Ladda upp en bild</h1>
                        <input
                        onChange={handleImageChange}
                        className={`w-full text-gray-500 font-medium text-sm bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-2 file:px-4 file:mr-4 file:bg-gray-700 file:hover:bg-gray-600 file:text-white rounded file:transition-all ${errors.image ? 'border-red-500' : 'border-gray-300'}`}
                        type="file"
                        />
                        {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
                    </div>

                    <button className="p-2 bg-blue-500 hover:bg-blue-600 hover:shadow-lg rounded text-white transition-all duration-500">
                        Skapa annons
                    </button>
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