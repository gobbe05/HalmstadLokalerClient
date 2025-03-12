import { useQuery, useQueryClient } from '@tanstack/react-query';
import IArticle from '../../../interfaces/IArticle';
import CreateArticleModal from './CreateArticleModal';
import { useState } from 'react';
import NewsCard from '../../cards/newscard';

export default function Nyheter() {
    const [show, setShow] = useState<boolean>(false)

    const {data: isAdmin, error: isAdminError, isPending: isAdminPending} = useQuery({
        queryKey: ["isAdmin"],
        queryFn: async () => {
            const response = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/auth/isadmin`, {
                credentials: "include"
            })
            const data = await response.json()
            return data.isAdmin || false
        }
    })
    const {data: news, error, isPending} = useQuery({
        queryKey: ["news"],
        queryFn: async () => {
            const response = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/api/article`)
            const data = await response.json()
            return data.articles as IArticle[]
        }
    })

    return (
        <>
        <div className="bg-white p-16 mx-auto w-1/2 my-16">
            {isAdmin && <button onClick={() => setShow(true)} className="bg-green-300 text-gray-600 font-semibold rounded py-2 px-4">Skapa ny</button>}

            <h1 className="text-center text-2xl font-bold text-gray-700">Nyheter</h1>
            <div className="grid grid-cols-1 gap-4 mt-8">
                {news?.map((article, index) => (
                    <NewsCard key={index} isAdmin={isAdmin} article={article} />
                ))}
            </div>
            {news && news.length == 0 && <h1 className="text-center text-xl font-semibold text-gray-700">Tyvärr, det finns inga nyheter för dig att visa</h1>}
        </div>
        <CreateArticleModal show={show} handleClose={() => {setShow(false)}} />
        </>
    );
}