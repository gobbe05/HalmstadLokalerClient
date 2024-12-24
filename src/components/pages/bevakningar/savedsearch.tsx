import { useQueryClient } from "@tanstack/react-query"
import { RxCross2 } from "react-icons/rx"

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

export default SavedSearch