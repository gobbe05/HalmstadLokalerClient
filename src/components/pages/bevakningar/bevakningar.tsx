import { useEffect, useState } from "react"
import IOffice from "../../../interfaces/IOffice"
import getSavedSearches from "../../../utils/getSavedSearches.ts"
import SavedSearch from "./savedsearch.tsx"
import { useAuth } from "../../../context/Auth/AuthContext.tsx"
import { Link } from "react-router-dom"
import { HiOutlineUserCircle } from "react-icons/hi2"
import { useQuery } from "@tanstack/react-query"
import { RxCross2 } from "react-icons/rx"
import { HiOutlineSearch } from "react-icons/hi"

export default function Bevakningar() {
    const [offices, setOffices] = useState<Array<IOffice>>([])
    const {isAuthenticated} = useAuth()
    
    const loadSavedSearch = async () => {
        const loadedOffices = await getSavedSearches()
        setOffices(loadedOffices)
    }

    useEffect(() => {
        loadSavedSearch()
    }, [])

    if(!offices.length) {
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
            <Offices />
        </div>
    )
}

const SavedSearches = () => {
    const {isPending, error, data} = useQuery({
        queryKey: ["savedsearches"],
        queryFn: () => {
            return fetch(`http://${import.meta.env.VITE_SERVER_IP}:${import.meta.env.VITE_SERVER_PORT}/api/savedsearch`, {credentials: "include"})
            .then(response => response.json())
        }
    }) 
    
    if(isPending) return ""
    if(error) return ""
    return (
        <div>
            <h1 className="flex items-center gap-2"><HiOutlineSearch size={24} /><span className="text-lg font-semibold">Sparade sökningar</span></h1>
            <div className="mt-4">
            {data.savedSearches.map((search: {searchString: string}) => 
                <div className="flex gap-2 items-center">
                    <p>{search.searchString}</p>
                    <button className="text-red-500 hover:bg-red-500 hover:text-white rounded"><RxCross2 size={24}/></button>
                </div>)}
            </div>
        </div>
    )
}

const Offices = () => {
    const {isPending, error, data} = useQuery({
        queryKey: ["offices-savedsearch"],
        queryFn: async () => {
            let officesToReturn: Array<IOffice> = []
            const response = await fetch(`http://${import.meta.env.VITE_SERVER_IP}:${import.meta.env.VITE_SERVER_PORT}/api/savedsearch`, {
                credentials: "include"
            })
            if(response.status != 200) throw new Error("There was an error fetching saved searches");

            const data = await response.json()
            if(!data) throw new Error("There was an error when fetching saved searches");

            const {savedSearches} = data
            if(!savedSearches) throw new Error("No saved searches find");
            
            for(let i = 0; i < savedSearches.length; i++) {
                const {searchString} = savedSearches[i]
                const response = await fetch(`http://${import.meta.env.VITE_SERVER_IP}:${import.meta.env.VITE_SERVER_PORT}/api/office?search=${searchString}`)
                if(response.status != 200) throw new Error("Fetch call failed")
                const {offices} = await response.json()
                if(!offices) return [];
                officesToReturn = [...officesToReturn, ...offices]
            }
            return officesToReturn
        }
    })
    if(isPending) return ""
    if(error) return ""
    return (
        <div className="grid gap-8 mt-8">
            {data.map((office: IOffice) => (<SavedSearch office={office} key={office._id}/>))}
        </div>
    )
}