import { CardContent, Typography } from "@mui/material";
import IArticle from "../../interfaces/IArticle";
import { useState } from "react";
import EditArticleModal from "../pages/nyheter/EditArticleModal";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { useAuth } from "../../context/Auth/AuthContext";
import { useQueryClient } from "@tanstack/react-query";

interface NewsCardProps {
    article: IArticle,
    isAdmin: boolean
}

export default function NewsCard({article, isAdmin}: NewsCardProps) {
    const [showEdit, setShowEdit] = useState<boolean>(false)
    const queryClient = useQueryClient()

    const handleClose = () => {
        setShowEdit(false)
    }
    const handleDelete = async () => {
        if(!confirm("Är du säker på att du vill ta bort denna nyheten?")) return
        await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/api/article/${article._id}`, {
            method: "DELETE",
            credentials: "include"
        })
        queryClient.invalidateQueries({queryKey: []})        
    }
    return (
        <div>
            <div className="bg-white p-2 rounded-md ">
                
                <CardContent className="flex justify-between">
                    <div>
                        <img
                    className="max-h-36"
                    height="140"
                    src={article.image}
                    alt={article.title}
                />
                        <div className="flex items-center gap-4 mt-4 mb-2">
                            <h1>{article.title}</h1>
                            {isAdmin && <div> 
                                <button onClick={() => setShowEdit(prev => !prev)} className="hover:bg-gray-300 p-2 rounded-full transition-all"><FaRegEdit /></button>
                                <button onClick={handleDelete} className="hover:bg-gray-300 p-2 rounded-full transition-all"><FaRegTrashAlt /></button>
                            </div>} 
                        </div>
                        <Typography>
                            <div dangerouslySetInnerHTML={{__html: article.content}}></div> 
                        </Typography>
                    </div> 
                    
                </CardContent>
            </div>
            <EditArticleModal article={article} handleClose={handleClose} show={showEdit} />
        </div>
    )
}