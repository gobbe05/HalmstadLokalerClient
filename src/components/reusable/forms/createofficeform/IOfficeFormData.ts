export default interface IOfficeFormData {
    name: string;
    description: string;
    location: string;
    price: number;
    size: number;
    tags: string[];
    types: Array<{ name: string; id: number }>;
    images: File[];
    documents: File[];
    existingDocuments: string[];
    existingImages: string[];
    existingThumbnails: string[];
    marker?: {
        lat: number;
        lng: number;
    };
}