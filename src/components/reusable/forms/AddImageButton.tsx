import { Button, Modal } from "@mui/material";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useState } from "react";

interface AddImageButtonProps {
    handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    currentImagePreview: string | null;
    addImage: () => void;
    clearCurrentImage: () => void;
}

export default function AddImageButton({
    handleImageChange,
    currentImagePreview,
    addImage,
    clearCurrentImage,
}: AddImageButtonProps) {
    const [open, setOpen] = useState<boolean>(false);

    const handleClose = () => {
        setOpen(false);
        clearCurrentImage();
    };

    const handleOpen = () => setOpen(true);

    return (
        <>
            <Button
                variant="contained"
                startIcon={<AddPhotoAlternateIcon />}
                onClick={handleOpen}
            >
                Välj bild
            </Button>
            <Modal open={open} onClose={handleClose} className="flex justify-center items-center">
                <div className="w-1/2 h-1/2 bg-white rounded-lg shadow-lg flex flex-col items-center justify-center p-4">
                    {!currentImagePreview ? (
                        <div className="flex flex-col items-center gap-4 mt-auto">
                            <label
                                htmlFor="image-upload"
                                className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
                            >
                                Välj en bild
                            </label>
                            <input
                                id="image-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </div>
                    ) : (
                        <img
                            src={currentImagePreview}
                            alt="Preview"
                            style={{ maxWidth: "100%", maxHeight: "300px" }}
                            className="my-auto"
                        />
                    )}
                    <div className="flex gap-2 mt-auto ml-auto">
                        {currentImagePreview && (
                            <Button
                                variant="contained"
                                color="success"
                                onClick={() => {addImage(); handleClose();}}
                            >
                                Lägg till bild
                            </Button>
                        )}
                        <Button
                            variant="contained"
                            color="error"
                            onClick={handleClose}
                        >
                            Avbryt
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
}