import { useEffect, useState } from "react"
import IOffice from "../../../interfaces/IOffice"
import getSavedSearches from "../../../utils/getSavedSearches.ts"
import SavedSearch from "./savedsearch.tsx"

export default function Bevakningar() {
    const [offices, setOffices] = useState<Array<IOffice>>([])
    
    const loadSavedSearch = async () => {
        const loadedOffices = await getSavedSearches()
        setOffices(loadedOffices)
    }

    useEffect(() => {
        loadSavedSearch()
    }, [])

    if(!offices.length) {
        return (
            <div className="w-2/3 p-16 my-16 mx-auto text-gray-700 bg-white">
                <h1 className="text-center text-2xl font-semibold">Woops, här var det tomt</h1>
            </div>
        )
    }

    return (
        <div className="w-2/3 flex flex-col p-16 my-16 mx-auto text-gray-700 bg-white">
            <h1 className="text-2xl font-semibold text-center">Dina bevakningar</h1>
            <div className="mt-8">
                {offices.map((office: IOffice) => (<SavedSearch office={office} key={office._id}/>))}
            </div>
        </div>
    )
}