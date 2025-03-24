import { Button, Chip, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import {FormEvent, useEffect, useState} from 'react'
import { TagsInput } from 'react-tag-input-component'
import ArticleIcon from '@mui/icons-material/Article';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import getOffice from '../../../utils/getOffice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import LocationInput from '../../pages/hyr-ut-lokal/locationinput';
import validateForm from './validateofficeform';
import Multiselect from 'multiselect-react-dropdown';

interface OfficeFormProps {
    id?: string,
    method: "POST" | "PUT"
}
type markerType = {
    lat: number,
    lng: number
} | undefined;
const OfficeForm = ({id, method}: OfficeFormProps) => {
    const [marker, setMarker] = useState<markerType>(undefined);
    const [name, setName] = useState<string>('')
    const [size, setSize] = useState<number>(0)
    const [price, setPrice] = useState<number>(0)
    //const [type, setType] = useState<string>('temp')
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
    const [existingThumbnails, setExistingThumbnails] = useState<string[] | undefined>(undefined)
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
    const addImage = () => {
        setImages([...images, currentImage!]);
        setCurrentImage(null);
        setCurrentImagePreview(null);
    }
    
    const handleForm = async (event: FormEvent) => {
        event.preventDefault()

        const validationErrors = validateForm({ name, size, price, types, description, location, marker });
        if (Object.keys(validationErrors).length > 0) {
            console.log(validationErrors)
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
    useEffect(() => {
        console.log(types)
    }, [types])

    return (
        <form className="mt-4" onSubmit={handleForm}>
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
                        {documents.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-4">
                                {documents.map((document, index) => (
                                    <Chip onDelete={() => {setDocuments(prev => prev.filter((_, i) => i!=index))}} key={index} label={document.name} />
                                ))}
                            </div>
                        )}
                    </div>
                    <div>
                        <Button
                            variant="contained"
                            component="label"
                            startIcon={<AddPhotoAlternateIcon />}
                        >
                            Välj bild
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={handleImageChange}
                            />
                        </Button>
                        {currentImagePreview && (
                            <div style={{ marginTop: '10px' }}>
                                <img src={currentImagePreview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                                <Button
                                    variant="contained"
                                    color="success"
                                    onClick={addImage}
                                    style={{ marginTop: '10px' }}
                                >
                                    Lägg till bild
                                </Button>
                            </div>
                        )}
                        {images.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-4">
                                {images.map((image, index) => (
                                    <Chip onDelete={() => {setImages(prev => prev.filter((_, i) => i!=index))}} key={index} label={image.name} />
                                ))}
                            </div>
                        )}
                    </div>
                    <div>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            {method == "POST" ? "Skapa annons" : "Uppdatera annons"} 
                        </Button>
                    </div>
                </div>
            </form>
    )
}

export default OfficeForm