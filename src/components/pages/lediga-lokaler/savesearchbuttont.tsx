import { useEffect, useState } from "react"
import { HiBellAlert, HiOutlineBellAlert } from "react-icons/hi2"
import { useAuth } from "../../../context/Auth/AuthContext"

export const SaveSearchButton = ({submittedSearch}: {submittedSearch: string | undefined}) => {
    const [triggerRefetch, setTriggerRefetch] = useState<boolean>(false)
    const {isAuthenticated} = useAuth()
    const toggleSearchButton = async () => {
        await fetch(`http://${import.meta.env.VITE_SERVER_IP}:${import.meta.env.VITE_SERVER_PORT}/api/savedsearch/toggle`, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({search: submittedSearch}),
            headers: {
                "Content-Type" : "application/json"
            }
        })
        setTriggerRefetch(prev => !prev)
    }
    if(!isAuthenticated) return <></>;
    return (
        <button onClick={toggleSearchButton} className="flex items-center gap-2 border px-4 py-2 rounded-lg border-gray-700 text-gray-700">
            <Bell submittedSearch={submittedSearch} triggerRefetch={triggerRefetch}/>
            <p className="font-semibold">Bevaka sökning</p>
        </button>
    )
}
const Bell = ({submittedSearch, triggerRefetch}: {submittedSearch: string | undefined, triggerRefetch: boolean}) => {
    const [inSearch, setInSearch] = useState<boolean>(false)

    const checkIfInSearch = async () => {
        if(!submittedSearch) return;
        const response = await fetch(`http://${import.meta.env.VITE_SERVER_IP}:${import.meta.env.VITE_SERVER_PORT}/api/savedsearch/insavedsearch?search=${submittedSearch}`, {
            method: "GET",
            credentials: "include"
        })
        const data = await response.json()
        setInSearch(data.inSavedSearch) 
    }

    useEffect(() => {
        checkIfInSearch()
    }, [submittedSearch, triggerRefetch])

    return (
        <>{inSearch ? <HiBellAlert size={24}/> : <HiOutlineBellAlert size={24}/>}</>
    )
}