import IOffice from "../../../interfaces/IOffice"
import { Link } from "react-router-dom"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import OfficeCardLong from "../../cards/officecardlong"
import SavedSearch from "./savedsearch"
import { useEffect, useState } from "react"
import { FaSearch, FaTrashAlt } from "react-icons/fa"
import Loading from "../../layout/loading"
import { useAuth } from "../../../context/Auth/AuthContext"
import { useSavedSearch } from "../../../context/savedSearchContext"

/**
 * This component works by first fetching the saved searches from the server. If there are no saved searches, a message is displayed to the user.
 * The saved searches are then displayed in a list, and the user can click on a saved search to view the results of that search.
 * The results are fetched from the server and displayed in a list of OfficeCardLong components.
 * @returns Component for displaying saved searches and the results of the active saved search.
 */
export default function Bevakningar() {
    const {activeSavedSearch, setActiveSavedSearch} = useSavedSearch()
    const queryClient = useQueryClient()
    const {isAuthenticated} = useAuth()
    const RemoveSearch = async () => {
        const response = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/api/savedsearch/toggle`, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({search: activeSavedSearch}),
            headers: {
                "Content-Type" : "application/json"
            }
        })
        if(response.ok) {
            queryClient.invalidateQueries({ queryKey: ["savedsearches"] });

            // Refetch saved searches and select a new one if available
            const updatedSearches = await queryClient.fetchQuery({
                queryKey: ["savedsearches"],
                queryFn: async () => {
                    const res = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/api/savedsearch?limit=2`, { credentials: "include" });
                    if (res.status === 204) return { savedSearches: [] };
                    return await res.json();
                }
            });
            setActiveSavedSearch(updatedSearches.savedSearches.length > 0 ? updatedSearches.savedSearches[0].searchString : undefined);
            queryClient.invalidateQueries({ queryKey: ["offices-savedsearch"] });
        }
    }
    const {isPending, error, data} = useQuery({
        queryKey: ["savedsearches"],
        queryFn: async () => {
            const response = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/api/savedsearch?limit=2`, {credentials: "include"})
            if(response.status == 204) return {savedSearches: []}
            const data = await response.json()
            if(data.savedSearches.length > 0 && !activeSavedSearch) {
                setActiveSavedSearch(data.savedSearches[0].searchString)
            }
            return data
        }
    }) 

    useEffect(() => {
        if(activeSavedSearch) {
            queryClient.invalidateQueries({queryKey: ["offices-savedsearch"]})
        }
    }, [activeSavedSearch])

    if(!activeSavedSearch || !isAuthenticated) return (
        <div className="flex flex-col gap-16 w-2/3 mx-auto text-gray-700 bg-white p-16 my-32 rounded-lg shadow-lg">
            <div className="flex flex-col items-center justify-center mt-4 py-8">
                <h3 className="text-2xl font-bold">Du har inga bevakningar</h3>
                <p className="mt-2 text-lg text-gray-600">Spara en sökning och kom tillbaks senare.</p>
            </div>
        </div>)
    if(isPending || error) return <Loading /> 
    return (
        <div className="grid lg:grid-cols-3 sm:gap-8 w-full sm:w-4/5 md:w-2/3 mx-auto text-gray-700 sm:my-32">
            {/* Selection for saved searches */}
            <SavedSearches savedSearches={data.savedSearches} activeSavedSearch={activeSavedSearch} setActiveSavedSearch={setActiveSavedSearch} />
            <div className="bg-white pb-32 pt-16 sm:pt-8 sm:pb-8 p-8 lg:col-span-2 sm:rounded-lg sm:shadow-lg">
                <h1 className="text-lg font-semibold">Resultat för sökning "{activeSavedSearch}"</h1>
                <div className="flex gap-2 mt-4">
                    <Link className="flex gap-2 py-2 px-3 items-center border border-gray-600 rounded text-gray-600" to={`/lediga-lokaler?search=${activeSavedSearch}`}><FaSearch size={16} /><span className="font-semibold">Gå till sökning</span></Link>
                    <button onClick={RemoveSearch} className="flex gap-2 py-2 px-3 items-center border border-gray-600 rounded text-gray-600"><FaTrashAlt size={16} /><span className="font-semibold">Ta bort</span></button>
                </div>
                {/* Show offices from saved search if one is selected */}
                {activeSavedSearch && <Offices activeSavedSearch={activeSavedSearch} />}
            </div> 
        </div>
    )
}

/**
 * @returns Component for selection of saved search to show 
 */
const SavedSearches = ({savedSearches, activeSavedSearch, setActiveSavedSearch} : {savedSearches: Array<{_id: string, searchString: string}>, activeSavedSearch : string | undefined, setActiveSavedSearch: React.Dispatch<React.SetStateAction<string | undefined>>}) => { 
    return (
        <div className="bg-white pt-32 sm:pt-8 p-8 col-span-1 sm:rounded-lg sm:shadow-lg">
            <h1 className="flex items-center gap-2"><span className="text-lg font-semibold text-nowrap">Dina bevakningar</span></h1>
            <div className="mt-4">
                {savedSearches.map((search: {_id: string, searchString: string}) => <SavedSearch setActiveSavedSearch={setActiveSavedSearch} active={activeSavedSearch==search.searchString} search={search} key={search._id} />)}
            </div>
        </div>
    )
}

const Offices = ({activeSavedSearch} : {activeSavedSearch: string}) => {
    const {error, isPending, data} = useQuery({
        queryKey: ["offices-savedsearch"],
        queryFn: async () => {
            const response = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/api/office?search=${activeSavedSearch}&limit=6`, {credentials: "include"})
            const data = await response.json()
            return data.offices || []
        }
    })

    if(isPending) return <p className="mt-8 text-lg text-gray-600">Laddar annonser...</p>
    if(error) return <p className="mt-8 text-lg text-gray-600">Ett fel uppstod när annonserna skulle hämtas.</p>
    if(!data.length) return <p className="mt-8 text-lg text-gray-600">Inga annonser hittades för denna sökning.</p>
    return (
        <div className="grid gap-4 mt-8">
            {data.map((office: IOffice) => (<OfficeCardLong office={office} key={office._id}/>))}
        </div>
    )
}