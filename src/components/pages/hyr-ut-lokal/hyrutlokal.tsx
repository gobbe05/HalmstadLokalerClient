import React, { useState, FormEvent } from 'react';
import { TextField, Button, Grid, Typography, Container, MenuItem, Select, InputLabel, FormControl, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import postOffice from '../../../utils/postOffice'; // Adjust the import according to your project structure
import BackButton from '../../buttons/backbutton';

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
    const [image, setImage] = useState<File | null>(null);
    const [type, setType] = useState<string>("kontor");
    const [tags, setTags] = useState<Array<string>>([]);
    const [description, setDescription] = useState<string>("");
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const navigate = useNavigate();

    const handleForm = async (event: FormEvent) => {
        event.preventDefault();
        if (!validate()) {
            toast.error("Formuläret innehåller fel. Kontrollera och försök igen.");
            return;
        }

        // Errors because it doesn't recognize the null check previously done by !validate()
        //@ts-ignore
        const office = await postOffice(name, location, size, type, price, marker, image, tags, description);
        if (office) {
            toast.success("Skapade en ny annons");
            navigate("/");
            return;
        }
        toast.error("Det uppstod ett fel när din annons skulle skapas");
    };

    const validate = (): boolean => {
        const newErrors: { [key: string]: string } = {};
        // Add validation logic here
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
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
                        <TextField
                            fullWidth
                            label="Plats"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            error={!!errors.location}
                            helperText={errors.location}
                        />
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
                        <Button
                            variant="contained"
                            component="label"
                        >
                            Ladda upp bild
                            <input
                                type="file"
                                hidden
                                onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
                            />
                        </Button>
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