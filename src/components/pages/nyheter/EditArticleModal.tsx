import { Box, Button, Modal, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import IArticle from "../../../interfaces/IArticle";

interface EditArticleModalProps {
    article: IArticle,
    handleClose: () => void,
    show: boolean,
}

export default function EditArticleModal({article, handleClose, show}: EditArticleModalProps) {
    const [title, setTitle] = useState<undefined | string>(undefined);
    const [content, setContent] = useState<undefined | string>(undefined);
    const [image, setImage] = useState<undefined | string>(undefined)
    
    const handleSubmit = () => {

    }

    useEffect(() => {
        if(!article) return
        setTitle(article.title)
        setContent(article.content)
        setImage(article.image)
    }, [article])

    return (
        <Modal open={show} onClose={handleClose}>
            <Box sx={{ 
                position: 'absolute', 
                top: '50%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)', 
                width: 400, 
                bgcolor: 'background.paper', 
                boxShadow: 24, 
                p: 4 
            }}>
                <h2>Create New Article</h2>
                <TextField
                    label="Title"
                    fullWidth
                    margin="normal"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    label="Image URL"
                    fullWidth
                    margin="normal"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                />
                <ReactQuill
                    value={content}
                    onChange={setContent}
                    modules={{
                        toolbar: [
                            [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
                            [{size: []}],
                            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                            []                                         
                        ],
                    }}
                />
                <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>
                    Submit
                </Button>
            </Box>
        </Modal>
    )
}