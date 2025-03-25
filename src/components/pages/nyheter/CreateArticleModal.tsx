import React, { useEffect, useState } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreateArticleModal = ({ show, handleClose }: { show: boolean, handleClose: () => void }) => {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async () => {
        const formData = new FormData()
        const response = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/api/article`, {
            method: "POST",
            credentials:  "include",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                title,
                image, 
                content
            })
        })
        handleClose();
    };

    return (
        <Modal open={show} onClose={handleClose}>
            <Box sx={{ 
                position: 'absolute', 
                top: '50%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)', 
                width: 720, 
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
    );
};

export default CreateArticleModal;