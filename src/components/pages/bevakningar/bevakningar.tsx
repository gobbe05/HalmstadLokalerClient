import IOffice from "../../../interfaces/IOffice"
import getSavedSearches from "../../../utils/getSavedSearches"
import { useAuth } from "../../../context/Auth/AuthContext"
import { Link } from "react-router-dom"
import { HiOutlineUserCircle } from "react-icons/hi2"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { RxCross2 } from "react-icons/rx"
import { HiOutlineSearch } from "react-icons/hi"
import OfficeCardLong from "../../cards/officecardlong"
import SavedSearch from "./savedsearch"

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
            </div>
        )
    }

    return (
        <div className="flex flex-col w-2/3 mx-auto text-gray-700 bg-white p-16 my-32 rounded-lg shadow-lg">
            <div className="bg-white p-16">
                <h1 className="text-2xl font-semibold text-center">Dina bevakningar</h1>
                <Offices offices={data}/>
            </div>
            <div className="bg-white p-8">
                <SavedSearches />
            </div>
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
    if(!data.savedSearches.length) return ""
    return (
        <div>
            <h1 className="flex items-center gap-2"><span className="text-lg font-semibold text-nowrap">Sparade sökningar</span><HiOutlineSearch size={24} /></h1>
            <div className="mt-4">
                {data.savedSearches.map((search: {_id: string, searchString: string}) => <SavedSearch search={search} key={search._id} />)}
            </div>
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