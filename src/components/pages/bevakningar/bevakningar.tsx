import { useEffect, useState } from "react"
import IOffice from "../../../interfaces/IOffice"
import getSavedSearches from "../../../utils/getSavedSearches"
import { useAuth } from "../../../context/Auth/AuthContext"
import { Link } from "react-router-dom"
import { HiOutlineUserCircle } from "react-icons/hi2"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { RxCross2 } from "react-icons/rx"
import { HiOutlineSearch } from "react-icons/hi"
import OfficeCardLong from "../../cards/officecardlong"

export default function Bevakningar() {
    const {isAuthenticated} = useAuth()
    
    const {isPending, error, data} = useQuery({
        queryKey: ["offices-savedsearch"],
        queryFn: async () => {
           return await getSavedSearches() 
        }
    })

    if(!data || !data.length) {
        return (
            <div className="w-2/3 p-32 my-32 mx-auto text-gray-700 bg-white">
                <h1 className="text-center text-2xl font-semibold">Woops, här var det tomt</h1>
                {!isAuthenticated ? 
                <div className="flex flex-col items-center">
                    <p className="text-lg">Logga in för att kunna spara och bevaka dina sökningar.</p>
                    <Link to="/login" className="flex items-center gap-2 mt-8 px-4 py-2 bg-blue-500 text-white rounded"><HiOutlineUserCircle size={24}/>Logga in</Link>
                </div>:
                <div className="flex flex-col items-center">
                    <p className="text-lg">Leta efter annonser och spara dina sökningar.</p>
                </div>}
            </div>
        )
    }

    return (
        <div className="w-2/3 flex flex-col p-16 my-16 mx-auto text-gray-700 bg-white">
            <h1 className="text-2xl font-semibold text-center">Dina bevakningar</h1>
            <SavedSearches />
            <Offices offices={data}/>
        </div>
    )
}

const SavedSearches = () => {
    const {isPending, error, data} = useQuery({
        queryKey: ["savedsearches"],
        queryFn: async () => {
            const response = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/api/savedsearch`, {credentials: "include"})
            if(response.status == 204) return {savedSearches: []}
            const data = await response.json()
            return data 
        }
    }) 
    
    if(isPending) return ""
    if(error) return ""
    return (
        <div>
            <h1 className="flex items-center gap-2"><HiOutlineSearch size={24} /><span className="text-lg font-semibold">Sparade sökningar</span></h1>
            <div className="mt-4">
            {data.savedSearches.map((search: {_id: string, searchString: string}) => <SavedSearch search={search} key={search._id} />)}
            </div>
        </div>
    )
}

const SavedSearch = ({search}: {search: {searchString: string}}) => {
    const queryClient = useQueryClient()
    const RemoveSearch = async () => {
        const response = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/api/savedsearch/toggle`, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({search: search.searchString}),
            headers: {
                "Content-Type" : "application/json"
            }
        })
        queryClient.invalidateQueries({queryKey: ["savedsearches"]})
        queryClient.invalidateQueries({queryKey: ["offices-savedsearch"]})    
    }
       
    return (
        <div className="flex gap-2 items-center">
            <p>{search.searchString}</p>
            <button className="text-red-500 hover:bg-red-500 hover:text-white rounded" onClick={RemoveSearch}><RxCross2 size={24}/></button>
        </div>
    )
}

const Offices = ({offices}: {offices: IOffice[]}) => {
    return (
        <div className="grid gap-8 mt-8">
            {offices.map((office: IOffice) => (<OfficeCardLong office={office} key={office._id}/>))}
        </div>
    )
}