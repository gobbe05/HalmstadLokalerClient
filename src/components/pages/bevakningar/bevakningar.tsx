import IOffice from "../../../interfaces/IOffice"
import getSavedSearches from "../../../utils/getSavedSearches"
import { useAuth } from "../../../context/Auth/AuthContext"
import { Link } from "react-router-dom"
import { HiOutlineUserCircle } from "react-icons/hi2"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { HiOutlineSearch } from "react-icons/hi"
import OfficeCardLong from "../../cards/officecardlong"
import SavedSearch from "./savedsearch"
import { useEffect, useState } from "react"
import { FaSearch, FaTrashAlt } from "react-icons/fa"

export default function Bevakningar() {
    const [activeSavedSearch, setActiveSavedSearch] = useState<string | undefined>(undefined)
    const {isAuthenticated} = useAuth()
    const queryClient = useQueryClient() 
    const RemoveSearch = async () => {
        const response = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/api/savedsearch/toggle`, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({search: activeSavedSearch}),
            headers: {
                "Content-Type" : "application/json"
            }
        })
        setActiveSavedSearch(undefined)
        queryClient.invalidateQueries({queryKey: ["savedsearches"]})
        queryClient.invalidateQueries({queryKey: ["offices-savedsearch"]})    
    }
    const {isPending, error, data} = useQuery({
        queryKey: ["offices-savedsearch"],
        queryFn: async () => {
            const response = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/api/office?search=${activeSavedSearch}`, {credentials: "include"})
            const data = await response.json()
            return data.offices || []
        }
    })

    useEffect(() => {
        queryClient.invalidateQueries({queryKey: ["offices-savedsearch"]})
    }, [activeSavedSearch])

    if(!data || !data.length) {
        return (
            <>
            <div className="hidden bg-white p-8 col-span-1 rounded-lg shadow-lg">
                <SavedSearches activeSavedSearch={activeSavedSearch} setActiveSavedSearch={setActiveSavedSearch} />
            </div>
            <div className="flex flex-col w-2/3 mx-auto text-gray-700 bg-white p-16 my-32 rounded-lg shadow-lg">
                <div className="flex flex-col items-center justify-center mt-4 py-8">
                    <h3 className="text-2xl font-bold">Inga sparade bevakningar</h3>
                    {!isAuthenticated ? 
                    <div className="flex flex-col items-center">
                        <p className="mt-2 text-lg text-gray-600">Logga in för att kunna spara och bevaka dina sökningar.</p>
                        <Link to="/login" className="flex items-center gap-2 mt-8 px-4 py-2 bg-blue-500 text-white rounded"><HiOutlineUserCircle size={24}/>Logga in</Link>
                    </div>:
                    <div className="flex flex-col items-center">
                        <p className="mt-2 text-lg text-gray-600">Leta efter annonser och spara dina sökningar.</p>
                    </div>}
                </div>
            </div></>
        )
    }

    return (
        <div className="grid grid-cols-3 gap-8 w-2/3 mx-auto text-gray-700 my-32">
            <div className="bg-white p-8 col-span-1 rounded-lg shadow-lg">
                <SavedSearches activeSavedSearch={activeSavedSearch} setActiveSavedSearch={setActiveSavedSearch} />
            </div>
            <div className="bg-white p-8 col-span-2 rounded-lg shadow-lg">
                <h1 className="text-lg font-semibold">Resultat för sökning "{activeSavedSearch}"</h1>
                <div className="flex gap-2 mt-4">
                    <Link className="flex gap-2 py-2 px-3 items-center border border-gray-600 rounded text-gray-600" to={`/lediga-lokaler?search=${activeSavedSearch}`}><FaSearch size={16} /><span className="font-semibold">Gå till sökning</span></Link>
                    <button onClick={RemoveSearch} className="flex gap-2 py-2 px-3 items-center border border-gray-600 rounded text-gray-600"><FaTrashAlt size={16} /><span className="font-semibold">Ta bort</span></button>
                </div>
                {data && data.length ? <Offices offices={data} /> : <p className="mt-8 text-lg text-gray-600">Inga annonser hittades för denna sökning.</p>}
            </div> 
        </div>
    )
}

const SavedSearches = ({activeSavedSearch, setActiveSavedSearch} : {activeSavedSearch : string | undefined, setActiveSavedSearch: React.Dispatch<React.SetStateAction<string | undefined>>}) => {
    const {isPending, error, data} = useQuery({
        queryKey: ["savedsearches"],
        queryFn: async () => {
            const response = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/api/savedsearch`, {credentials: "include"})
            if(response.status == 204) return {savedSearches: []}
            const data = await response.json()
            setActiveSavedSearch(data.savedSearches[0].searchString)
            return data
        }
    }) 
    
    if(isPending) return ""
    if(error) return ""
    if(!data.savedSearches.length) return ""
    return (
        <div>
            <h1 className="flex items-center gap-2"><span className="text-lg font-semibold text-nowrap">Dina bevakningar</span></h1>
            <div className="mt-4">
                {data.savedSearches.map((search: {_id: string, searchString: string}) => <SavedSearch setActiveSavedSearch={setActiveSavedSearch} active={activeSavedSearch==search.searchString} search={search} key={search._id} />)}
            </div>
        </div>
    )
}

const Offices = ({offices}: {offices: IOffice[]}) => {
    return (
        <div className="grid gap-4 mt-8">
            {offices.map((office: IOffice) => (<OfficeCardLong office={office} key={office._id}/>))}
        </div>
    )
}