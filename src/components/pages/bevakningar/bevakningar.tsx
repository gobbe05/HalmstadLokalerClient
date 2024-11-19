import { useEffect, useState } from "react"
import IOffice from "../../../interfaces/IOffice"
import getSavedSearches from "../../../utils/getSavedSearches.ts"
import SavedSearch from "./savedsearch.tsx"
import { useAuth } from "../../../context/Auth/AuthContext.tsx"
import { Link } from "react-router-dom"
import { HiOutlineUserCircle } from "react-icons/hi2"

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
            <div className="grid gap-8 mt-8">
                {offices.map((office: IOffice) => (<SavedSearch office={office} key={office._id}/>))}
            </div>
        </div>
    )
}