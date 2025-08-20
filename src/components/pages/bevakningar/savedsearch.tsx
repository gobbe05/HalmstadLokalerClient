import { useQueryClient } from "@tanstack/react-query"

import { HiOutlineSearch } from "react-icons/hi";

const SavedSearch = ({search, active, setActiveSavedSearch}: {search: {searchString: string}, active: boolean, setActiveSavedSearch: React.Dispatch<React.SetStateAction<string | undefined>>}) => {
    const queryClient = useQueryClient() 
       
    return (
        <button 
            onClick={() => setActiveSavedSearch(search.searchString)} 
            className={`w-full px-6 py-4 text-left transition-all duration-200 ${
                active 
                ? "bg-primary/5 border-l-4 border-primary" 
                : "hover:bg-gray-50 border-l-4 border-transparent"
            }`}
        >
            <div className="flex items-center gap-3">
                <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                    active 
                    ? "bg-primary/10 text-primary" 
                    : "bg-gray-100 text-gray-400"
                }`}>
                    <HiOutlineSearch size={18} />
                </div>
                <div className="min-w-0">
                    <p className={`font-medium truncate ${
                        active ? "text-gray-900" : "text-gray-600"
                    }`}>
                        {search.searchString}
                    </p>
                    <p className={`text-sm ${
                        active ? "text-gray-600" : "text-gray-400"
                    }`}>
                        Bevakning aktiv
                    </p>
                </div>
            </div>
        </button>
    )
}

export default SavedSearch