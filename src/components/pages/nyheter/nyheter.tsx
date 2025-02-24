import React from 'react';
import { Container, Grid, Card, CardContent, Typography, CardMedia } from '@mui/material';

const newsArticles = [
    {
        title: "Nyhet 1",
        description: "Detta är en kort beskrivning av nyhet 1.",
        imageUrl: "https://picsum.photos/150",
    },
    {
        title: "Nyhet 2",
        description: "Detta är en kort beskrivning av nyhet 2.",
        imageUrl: "https://picsum.photos/150"
    },
    {
        title: "Nyhet 3",
        description: "Detta är en kort beskrivning av nyhet 3.",
        imageUrl: "https://via.placeholder.com/150",
    },
];

export default function Nyheter() {
    return (
        <div className="mx-auto w-2/3 my-16">
            <div className="grid grid-cols-1 gap-4">
                {newsArticles.map((article, index) => (
                    <div key={index}>
                        <div className="bg-white p-4 rounded-md shadow-md">
                            <img
                                height="140"
                                src={article.imageUrl}
                                alt={article.title}
                            />
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {article.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {article.description}
                                </Typography>
                            </CardContent>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}