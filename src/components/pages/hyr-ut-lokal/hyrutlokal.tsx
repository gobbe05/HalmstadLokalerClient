import React, { useState, FormEvent } from 'react';
import { TextField, Button, Grid, Container, MenuItem, Select, InputLabel, FormControl, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import postOffice from '../../../utils/postOffice'; // Adjust the import according to your project structure
import BackButton from '../../buttons/backbutton';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import LocationInput from './locationinput';
import { TagsInput } from 'react-tag-input-component';
import ArticleIcon from '@mui/icons-material/Article';

type markerType = {
    lat: number,
    lng: number
} | undefined;

const HyrUtLokal = () => {
    const [marker, setMarker] = useState<markerType>(undefined);
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
        <Container maxWidth="sm" className="bg-white my-16 p-8 rounded-lg shadow-md">
            <div>
                <BackButton link={"/"}/>
                <h1 className="text-2xl font-semibold">Lägg upp en ny annons</h1> 
            </div>
            <form className="mt-4" onSubmit={handleForm}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Namn"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            error={!!errors.name}
                            helperText={errors.name}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <LocationInput setLocation={setLocation} setMarker={setMarker} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Storlek (kvm)"
                            type="number"
                            value={size}
                            onChange={(e) => setSize(Number(e.target.value))}
                            error={!!errors.size}
                            helperText={errors.size}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Pris (SEK)"
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value))}
                            error={!!errors.price}
                            helperText={errors.price}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel>Typ</InputLabel>
                            <Select
                                value={type}
                                onChange={(e) => setType(e.target.value as string)}
                            >
                                <MenuItem value="kontor">Kontor</MenuItem>
                                <MenuItem value="lager">Lager</MenuItem>
                                <MenuItem value="butik">Butik</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
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
                    </Grid>
                    <Grid item xs={12}>
                        <TagsInput value={tags} onChange={setTags} name="tags" placeHolder="Taggar..."/>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            component="label"
                            startIcon={<ArticleIcon />}
                        >
                            Välj dokument
                            <input
                                type="file"
                                hidden
                                onChange={handleDocumentChange}
                            />
                        </Button>
                        {documents.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-4">
                                {documents.map((document, index) => (
                                    <Chip key={index} label={document.name} />
                                ))}
                            </div>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            component="label"
                            startIcon={<AddPhotoAlternateIcon />}
                        >
                            Välj bild
                            <input
                                type="file"
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
                                    <Chip key={index} label={image.name} />
                                ))}
                            </div>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Skapa annons
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default HyrUtLokal;