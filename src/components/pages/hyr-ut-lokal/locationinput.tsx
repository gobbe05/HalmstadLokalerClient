import { TextField } from "@mui/material";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import { useState } from "react";

type markerType = {
    lat: number,
    lng: number
} | undefined;

const LocationInput = ({setLocation, setMarker} : {setLocation : React.Dispatch<React.SetStateAction<string>>, setMarker: React.Dispatch<React.SetStateAction<markerType>>}) => {
    const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
    
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API, // Replace with your Google Maps API key
        libraries: ["places"]
    });

    const onLoad = (autoC: google.maps.places.Autocomplete) => {setAutocomplete(autoC)};
    const onPlaceChanged = () => {
    if (autocomplete) {
        const place = autocomplete.getPlace();
        if(place.geometry && place.geometry.location) {
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();
            setMarker({lat, lng});
            setLocation(place.formatted_address || "");
        }
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
    };

    if (loadError) {
        return <div>Error loading Google Maps API</div>;
    }
    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    return (
            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                <TextField
                    className="w-full" 
                    />
            </Autocomplete>  
    )
}

export default LocationInput