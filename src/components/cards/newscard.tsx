import { CardContent, Typography } from "@mui/material";
import IArticle from "../../interfaces/IArticle";
import { useState } from "react";
import EditArticleModal from "../pages/nyheter/EditArticleModal";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

interface NewsCardProps {
    article: IArticle
}

export default function NewsCard({article}: NewsCardProps) {
    const [showEdit, setShowEdit] = useState<boolean>(false)
    
    const handleClose = () => {
        setShowEdit(false)
    }
    const handleDelete = () => {

    }
    return (
        <div>
            <div className="bg-white p-4 rounded-md shadow-md">
                <img
                    className="max-h-48"
                    height="140"
                    src={article.image}
                    alt={article.title}
                />
                <CardContent>
                    <div className="flex items-center gap-4">
                        <h1>{article.title}</h1>
                        <div> 
                            <button onClick={() => setShowEdit(prev => !prev)} className="hover:bg-gray-300 p-2 rounded-full transition-all"><FaRegEdit /></button>
                            <button onClick={handleDelete} className="hover:bg-gray-300 p-2 rounded-full transition-all"><FaRegTrashAlt /></button>
                        </div>
                    </div>
                    <Typography>
                        <div dangerouslySetInnerHTML={{__html: article.content}}></div> 
                    </Typography>
                </CardContent>
            </div>
            <EditArticleModal article={article} handleClose={handleClose} show={showEdit} />
        </div>
    )
}