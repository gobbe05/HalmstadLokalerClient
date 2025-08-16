import { Button, Chip, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import {FormEvent, useEffect, useState} from 'react'
import { TagsInput } from 'react-tag-input-component'
import ArticleIcon from '@mui/icons-material/Article';
import getOffice from '../../../utils/getOffice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import LocationInput from '../../pages/hyr-ut-lokal/locationinput';
import validateForm from './validateofficeform';
import Multiselect from 'multiselect-react-dropdown';
import AddImageButton from './AddImageButton';
import { IoMdClose } from 'react-icons/io';

interface OfficeFormProps {
    id?: string,
    method: "POST" | "PUT",
    handleClose?: () => void | undefined
}
type markerType = {
    lat: number,
    lng: number
} | undefined;
const OfficeForm = ({id, method, handleClose}: OfficeFormProps) => {
    const [marker, setMarker] = useState<markerType>(undefined);
    const [name, setName] = useState<string>('')
    const [size, setSize] = useState<number>(0)
    const [price, setPrice] = useState<number>(0)
    const [description, setDescription] = useState<string>('')
    const [location, setLocation] = useState<string>('')
    const [tags, setTags] = useState<string[]>([])
    const [documents, setDocuments] = useState<File[]>([])
    const [images, setImages] = useState<File[]>([])
    const [currentImage, setCurrentImage] = useState<File | null>(null)
    const [currentImagePreview, setCurrentImagePreview] = useState<string | null>(null)
    const [errors, setErrors] = useState<{[key: string]: string}>({})
    const [existingDocuments, setExistingDocuments] = useState<string[]>([])
    const [existingImages, setExistingImages] = useState<string[]>([])
    const [existingThumbnails, setExistingThumbnails] = useState<string[]>([])
    const [types, setTypes] = useState<{name: string, id: number}[]>([])

    // Define which office types should exist
    const officetypes = [
    { name: "Butiker", id: 1 },
    { name: "Industrier & verkstäder", id: 2 },
    { name: "Kontor", id: 3 },
    { name: "Kontorshotell & Coworking", id: 4 },
    { name: "Lager & logistik", id: 5 },
    { name: "Resturanger & cafeer", id: 6 },
    { name: "Skola, vård & omsorg", id: 7 },
    { name: "Övrigt", id: 8 }
];

    const navigate = useNavigate()

    const handleDocumentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setDocuments([...documents, file]);
        }
    }
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setCurrentImage(file);
            setCurrentImagePreview(URL.createObjectURL(file));
        }
    };
    const clearCurrentImage = () => {
        setCurrentImage(null);
        setCurrentImagePreview(null);
    }
    const addImage = () => {
        setImages([...images, currentImage!]);
        setCurrentImage(null);
        setCurrentImagePreview(null);
    }
    
    const handleForm = async (event: FormEvent) => {
        event.preventDefault()

        const validationErrors = validateForm({ name, size, price, types, description, location, marker });
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const formData = new FormData()
        formData.append("name", name)
        formData.append("location", location)
        formData.append("size", size.toString())
        formData.append("price", price.toString())
        marker && formData.append("lat", marker.lat.toString()),
        marker && formData.append("lng", marker.lng.toString()),
        formData.append("tags", JSON.stringify(tags))
        //formData.append("type", type)
        formData.append("types", JSON.stringify(types.map((item) => item.name)))
        formData.append("description", description)
        existingDocuments && existingDocuments.forEach((document) => {
            formData.append("existingDocuments[]", document)
        })
        existingImages && existingImages.forEach((image) => {
            formData.append("existingImages[]", image)
        })
        existingThumbnails && existingThumbnails.forEach((thumbnail) => {
            formData.append("existingThumbnails[]", thumbnail)
        })
        images.forEach((image) => {
            formData.append("images[]", image)
        })
        documents.forEach((file) => {
            formData.append("files[]", file)
        })

        if(method == "POST") {
            const response = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/api/office`, {
                method: "POST",
                credentials: "include",
                body: formData
            })
            if(response.status == 201) {
                toast.success("Successfully created office")
                navigate("/")
            } else {
                toast.error("Failed to create office")
            }
        } else if (method == "PUT") {
            const response = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/api/office/${id}`, {
                method: "PUT",
                credentials: "include",
                body: formData
            })
            if(response.status == 200) {
                toast.success("Successfully updated office")
                navigate(0)
            } else {
                toast.error("Failed to update office")
            }
        }
    };
    
    useEffect(() => {
        if(id) {
            // Fetch office data
            getOffice(id).then((office) => {
                if(!office) return
                setName(office.name)
                setSize(office.size)
                setPrice(office.price)
                setLocation(office.location)
                setMarker(office.position)
                //setType(office.type)
                setTypes(office.types.map((item, index) => {return {name: item, id: index}}))
                setDescription(office.description)
                setTags(office.tags)
                
                // Populate documents and images with fetched links
                setExistingDocuments(office.documents)
                setExistingImages(office.images) 
                setExistingThumbnails(office.thumbnails)
            }
            ).catch((error) => {
                console.error(error)
            })
        }
    }, [id])

    return (
        <form className="mt-4" onSubmit={handleForm}>
            {method == "PUT" && 
            <div className="flex gap-2 justify-end w-full mb-8">
                <Button type="submit" variant="contained" color="success">Spara</Button>
                <Button type="button" onClick={() => {handleClose && handleClose()}} variant="contained" color="error" className="ml-auto mb-8">Avbryt</Button>
            </div>}
            <div className="grid grid-cols-1 gap-4">
                <div>
                    <TextField
                        fullWidth
                        label="Namn"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        error={!!errors.name}
                        helperText={errors.name}
                    />
                </div>
                {method == "POST" &&
                <div>
                    <LocationInput setLocation={setLocation} setMarker={setMarker} />
                </div>} 
                <div>
                    <TextField
                        fullWidth
                        label="Storlek (kvm)"
                        type="number"
                        value={size}
                        onChange={(e) => setSize(Number(e.target.value))}
                        error={!!errors.size}
                        helperText={errors.size}
                    />
                </div>
                <div>
                    <TextField
                        fullWidth
                        label="Pris (kr/mån)"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        error={!!errors.price}
                        helperText={errors.price}
                    />
                </div>
                <div>
                    <FormControl fullWidth>
                        <Multiselect 
                            options={officetypes}
                            selectedValues={types}
                            onSelect={(_, type) => setTypes(prev => [...prev, type])} 
                            onRemove={(_, type) => setTypes(prev => prev.filter(x => x.id != type.id))} 
                            displayValue={"name"}
                            />
                    </FormControl>
                </div>
                <div>
                    <TextField
                        fullWidth
                        label="Beskrivning"
                        multiline
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        error={!!errors.description}
                        helperText={errors.description}
                    />
                </div>
                <div>
                    <TagsInput value={tags} onChange={setTags} name="tags" placeHolder="Taggar..."/>
                </div>
                <div>
                    <div className="flex gap-2">
                        <Button
                            variant="contained"
                            component="label"
                            startIcon={<ArticleIcon />}
                        >
                            Välj dokument
                            <input
                                type="file"
                                accept=".pdf"
                                hidden
                                onChange={handleDocumentChange}
                            />
                        </Button>
                        {/*<AddImageButton handleImageChange={handleImageChange} /> */}
                    </div>
                    {documents.length + existingDocuments.length > 0 && (
                        <h3 className="mt-4">Dokument</h3>
                    )}
                    {documents.length + existingDocuments.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                            {existingDocuments.map((document, index) => (
                                <Chip onDelete={() => {setExistingDocuments(prev => prev.filter((_, i) => i!=index))}} key={index} label={document} />
                            ))}
                            {documents.map((document, index) => (
                                <Chip onDelete={() => {setDocuments(prev => prev.filter((_, i) => i!=index))}} key={index} label={document.name} />
                            ))}
                        </div>
                    )}
                    </div>
                    <div className="flex flex-col gap-4">
                        <div>
                        {images.length > 0 && <h3>Nya bilder</h3>}
                            {images.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {images.map((image, index) => (
                                    <Chip onDelete={() => {setImages(prev => prev.filter((_, i) => i!=index))}} key={index} label={image.name} />
                                ))}
                            </div>
                        )}
                        </div>
                        <div>
                        {existingImages.length > 0 && <h3>Redan tillagda bilder</h3>}
                        {existingImages.length > 0 && (
                            <div className="flex gap-2 my-4">
                                {existingImages.map((image, index) => (
                                    <PreviousImages key={index} image={image} setExistingImages={setExistingImages} setExistingThumbnails={setExistingThumbnails} />                                    
                                ))}
                            </div>)}
                        </div>
                    </div>
                <div>
                {method == "POST" &&
                <Button type="submit" variant="contained" color="primary" fullWidth>Skapa annons</Button>}
                </div>
            </div>
        </form>
    )
}

interface PreviousImageProps {
    image: string
    setExistingImages: React.Dispatch<React.SetStateAction<string[]>>
    setExistingThumbnails: React.Dispatch<React.SetStateAction<string[]>>
}
const PreviousImages = ({image, setExistingImages, setExistingThumbnails}: PreviousImageProps) => {
    return (
        <div onClick={() => {
                setExistingImages(prev => prev.filter((img) => img != image))
                setExistingThumbnails(prev => prev.filter((img) => img != "thumbnail-" + image))
            }} className="relative group cursor-pointer">
            <img src={import.meta.env.VITE_BUCKET_ADDRESS + image} className="max-h-48 flex-wrap" />
            <div className="group-hover:bg-opacity-50 bg-opacity-0 bg-gray-600 absolute h-full w-full flex justify-center items-center top-0 left-0 transition-all">
                <h1 className="group-hover:opacity-100 opacity-0 transition-all text-white bg-red-500 rounded-full p-2"><IoMdClose size={32} /></h1>
            </div>
        </div>
        
    )
}

export default OfficeForm