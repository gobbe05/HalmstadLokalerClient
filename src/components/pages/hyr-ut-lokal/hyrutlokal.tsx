import React, { useState, FormEvent } from 'react';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import postOffice from '../../../utils/postOffice'; // Adjust the import according to your project structure
import BackButton from '../../buttons/backbutton';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import LocationInput from './locationinput';
import { TagsInput } from 'react-tag-input-component';
import ArticleIcon from '@mui/icons-material/Article';
import OfficeForm from '../../reusable/forms/officeform';

const HyrUtLokal = () => {
    const [name, setName] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [size, setSize] = useState<number | undefined>(undefined);
    const [price, setPrice] = useState<number | undefined>(undefined);
    const [images, setImages] = useState<File[]>([]);
    const [currentImage, setCurrentImage] = useState<File | null>(null);
    const [currentImagePreview, setCurrentImagePreview] = useState<string | null>(null); 
    const [type, setType] = useState<string>("kontor");
    const [tags, setTags] = useState<Array<string>>([]);
    const [description, setDescription] = useState<string>("");
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [documents, setDocuments] = useState<File[]>([]);

    const navigate = useNavigate();

    const handleForm = async (event: FormEvent) => {
        event.preventDefault();
        if (!validate()) {
            toast.error("Formuläret innehåller fel. Kontrollera och försök igen.");
            return;
        }

        // Errors because it doesn't recognize the null check previously done by !validate()
        //@ts-ignore
        const office = await postOffice(name, location, size, type, price, marker, images, documents, tags, description);
        if (office) {
            toast.success("Skapade en ny annons");
            navigate("/");
            return;
        }
        toast.error("Det uppstod ett fel när din annons skulle skapas");
    };

    const validate = (): boolean => {
        const newErrors: { [key: string]: string } = {};
        if (!name.trim()) newErrors.name = "Rubrik är obligatoriskt.";
        if (!description.trim()) newErrors.description = "Beskrivning är obligatoriskt.";
        if (!location.trim()) newErrors.location = "Adress är obligatoriskt.";
        if (!size || size <= 0) newErrors.size = "Storlek måste vara ett positivt tal.";
        if (!price || price <= 0) newErrors.price = "Pris måste vara ett positivt tal.";
        if (!marker) newErrors.location = "Välj en giltig adress.";
        if (!images.length) newErrors.image = "Ladda upp en bild.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setCurrentImage(file);
            setCurrentImagePreview(URL.createObjectURL(file));
        }
    };
    const handleDocumentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setDocuments([...documents, file]);
        }
    }
    const addImage = () => {
        if (currentImage) {
            setImages([...images, currentImage]);
            setCurrentImage(null);
            setCurrentImagePreview(null);
        }
    };

    return (
        <div className="w-1/2 bg-white mx-auto my-16 p-8 rounded-lg shadow-md">
            <div>
                <BackButton link={"/"}/>
                <h1 className="text-2xl font-semibold">Lägg upp en ny annons</h1> 
            </div>
            <OfficeForm method="POST" />
        </div>
    );
};

export default HyrUtLokal;