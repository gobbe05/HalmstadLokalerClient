const validateForm = (data: {
    name: string;
    size: number;
    price: number;
    types: Array<{name: string, id: number}>;
    description: string;
    location: string;
    marker?: { lat: number; lng: number };
}): Record<string, string> => {
    let errors: Record<string, string> = {};
    
    if (!data.name.trim()) {
        errors.name = "Namn är obligatoriskt";
    }
    
    if (data.size <= 0 || isNaN(data.size)) {
        errors.size = "Storlek måste vara ett positivt nummer";
    }
    
    if (data.price < 0 || isNaN(data.price)) {
        errors.price = "Pris måste vara 0 eller mer";
    }
    
    if (data.types.length < 0) {
        errors.type = "Välj en typ";
    }
    
    if (!data.description.trim()) {
        errors.description = "Beskrivning är obligatorisk";
    }
    
    if (!data.location.trim()) {
        errors.location = "Plats är obligatorisk";
    }
    
    if (!data.marker || !data.marker.lat || !data.marker.lng) {
        errors.marker = "Markeringsposition krävs";
    }
    
    return errors;
};

export default validateForm;