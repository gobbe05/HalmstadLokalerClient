import { useQueryClient } from "@tanstack/react-query"

const SavedSearch = ({search, active, setActiveSavedSearch}: {search: {searchString: string}, active: boolean, setActiveSavedSearch: React.Dispatch<React.SetStateAction<string | undefined>>}) => {
    const queryClient = useQueryClient() 
       
    return (
        <div onClick={() => setActiveSavedSearch(search.searchString)} className={`select-none cursor-pointer w-full p-4 rounded ${active ? "bg-primary text-white" : "bg-gray-100 hover:bg-gray-200"} transition-all`}>
            <p>{search.searchString}</p>
        </div>
    )
}

export default SavedSearch