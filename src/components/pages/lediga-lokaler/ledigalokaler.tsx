import { useEffect, useState } from "react"
import IOffice from "../../../interfaces/IOffice"
import OfficeCardLong from "../../cards/officecardlong"
import { SaveSearchButton } from "./savesearchbuttont"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import Loading from "../../layout/loading"
import { Accordion, AccordionDetails, AccordionSummary, Pagination } from "@mui/material"
import officeTypes from "../../../utils/officeTypes"
import CategoryButton from "./categorybutton"
import { useLocation } from "react-router-dom"
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Filter } from "@mui/icons-material"
import { HiOutlineSearch } from "react-icons/hi"


const LedigaLokaler = () => {
    const limit = 10

    const queryParams = new URLSearchParams(window.location.search);
    const [search, setSearch] = useState<string | undefined>(undefined)
    const [submittedSearch, setSubmittedSearch] = useState<string>("")
    const [priceMin, setPriceMin] = useState<number | undefined>()
    const [priceMax, setPriceMax] = useState<number | undefined>()
    const [sizeMin, setSizeMin] = useState<number | undefined>()
    const [sizeMax, setSizeMax] = useState<number | undefined>()
    const [type, setType] = useState<string>()
    const [page, setPage] = useState<number>(1)
    const [pageCount, setPageCount] = useState<number>(0)
    const [searchString, setSearchString] = useState<string>("?")
    const [types, setTypes] = useState<Array<string>>([])
  
    const location = useLocation()

    const queryClient = useQueryClient()
    const { error, isPending, data } = useQuery({
    queryKey: ["offices", submittedSearch],
        queryFn: async () => {
            if (submittedSearch === undefined) return []; // Don't fetch if search is empty
            // Construct query parameters
            const params = new URLSearchParams({
            search: search || "",
            sizeMin: sizeMin?.toString() || "",
            sizeMax: sizeMax?.toString() || "",
            priceMin: priceMin?.toString() || "",
            priceMax: priceMax?.toString() || "",
            limit: limit?.toString() || "",
            page: page?.toString() || "",
            });

            // Append multiple types if provided
            types?.forEach((t) => params.append("types", t));

            // Update the search string state
            setSearchString(params.toString());

            // Fetch data
            const res = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/api/office?${params}`);
            if (!res.ok) throw new Error("Error fetching offices");

            const { offices } = await res.json();
            if (!offices) throw new Error("Invalid response format");

            search && setSubmittedSearch(search);

            return offices;
        },
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmittedSearch(search || ""); // Store last submitted search term
        queryClient.invalidateQueries({ queryKey: ["offices"] });
    };

    const updatePageCount = async () => {
        const response = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/api/office/count?${searchString}`)
        const {count} = await response.json()
        setPageCount(Math.ceil(count / limit))
    }

    useEffect(() => {
        if (location.state) {
            setTypes(location.state.types || []);
            setSearch(location.state.search || "");
        }
    }, [location.state])
    useEffect(() => {
        queryClient.invalidateQueries({queryKey: ["offices"]})
    }, [page])
    useEffect(() => {
        updatePageCount()
        queryClient.invalidateQueries({queryKey: ["offices"]})
    }, [searchString])

    if(error || isPending) return <Loading />
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="w-full bg-gradient-to-br from-primary to-primary-dark text-white py-12">
                <div className="max-w-6xl mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold">Hitta en lokal som passar dig</h1>
                    <p className="mt-4 text-lg md:text-xl opacity-90">Sök bland lokaler i Halmstad</p>
                </div>
            </div>
            <div className="max-w-6xl mx-auto px-4 -mt-8">
                <SearchBar handleSearch={handleSearch} setSearch={setSearch} search={search} />
            </div>

            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* Save Search Bar */}
                {submittedSearch && (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Filter className="text-gray-500" />
                            <span className="text-gray-600">Aktiv sökning: <span className="font-medium text-gray-900">{submittedSearch}</span></span>
                        </div>
                        <SaveSearchButton submittedSearch={submittedSearch} />
                    </div>
                )}

                <div className="grid xl:grid-cols-4 gap-6">
                    {/* Filters for mobile */}
                    <Accordion 
                        className="xl:hidden bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                        style={{ boxShadow: 'none' }}
                    >
                        <AccordionSummary
                            expandIcon={<ArrowDownwardIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                            className="border-b"
                        >
                            <div className="flex items-center space-x-2">
                                <Filter className="text-gray-500" />
                                <span className="font-medium">Filtrera sökning</span>
                            </div>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Filters 
                                setPriceMin={setPriceMin} 
                                setPriceMax={setPriceMax} 
                                setSizeMin={setSizeMin} 
                                setSizeMax={setSizeMax} 
                                setTypes={setTypes} 
                                types={types} 
                            />
                        </AccordionDetails>
                    </Accordion>

                    {/* Filters for desktop */}
                    <div className="hidden xl:block sticky top-4 h-fit">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center space-x-2 mb-6">
                                <Filter className="text-gray-500" />
                                <h2 className="font-medium">Filtrera sökning</h2>
                            </div>
                            <Filters 
                                setPriceMin={setPriceMin} 
                                setPriceMax={setPriceMax} 
                                setSizeMin={setSizeMin} 
                                setSizeMax={setSizeMax} 
                                setTypes={setTypes} 
                                types={types} 
                            />
                        </div>
                    </div>

                    {/* Results Section */}
                    <div className="xl:col-span-3">
                        {/* Loading State */}
                        {isPending && (
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                                <div className="animate-pulse space-y-4">
                                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                                    <div className="space-y-3">
                                        <div className="h-3 bg-gray-200 rounded"></div>
                                        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Error State */}
                        {error && (
                            <div className="bg-red-50 rounded-lg border border-red-200 p-8 text-center">
                                <h3 className="text-red-800 font-semibold text-lg">Något gick fel</h3>
                                <p className="text-red-600 mt-2">Det gick inte att hämta lokalerna. Försök igen senare.</p>
                            </div>
                        )}

                        {/* No Results */}
                        {!isPending && !error && !data.length && (
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                                <h3 className="text-2xl font-semibold text-gray-800">Inga resultat hittades</h3>
                                <p className="text-gray-600 mt-2">Prova att ändra dina sökkriterier för att se fler resultat</p>
                            </div>
                        )}

                        {/* Results List */}
                        {!isPending && !error && data.length > 0 && (
                            <div className="space-y-4">
                                {data.map((office: IOffice) => (
                                    <div key={office._id} className="transition-all duration-200">
                                        <OfficeCardLong office={office} />
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Pagination */}
                        {data.length > 0 && (
                            <div className="flex justify-center xl:justify-start mt-8">
                                <Pagination
                                    count={pageCount}
                                    page={page}
                                    onChange={(_, page) => { setPage(page) }}
                                    shape="rounded"
                                    variant="outlined"
                                    color="primary"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
interface FiltersProps {
    setPriceMin: React.Dispatch<React.SetStateAction<number | undefined>>
    setPriceMax: React.Dispatch<React.SetStateAction<number | undefined>>
    setSizeMin: React.Dispatch<React.SetStateAction<number | undefined>>
    setSizeMax: React.Dispatch<React.SetStateAction<number | undefined>>
    setTypes: React.Dispatch<React.SetStateAction<Array<string>>>
    types: Array<string>
}
const Filters = ({setPriceMin, setPriceMax, setSizeMin, setSizeMax, setTypes, types}: FiltersProps) => {
    return (
        <div className="space-y-6">
            {/* Price Filter */}
            <div className="space-y-4">
                <div className="border-b pb-2">
                    <label className="text-sm font-medium text-gray-700">Pris (kr/månad)</label>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="flex-1">
                        <input
                            onChange={(event) => { setPriceMin(+event.target.value) }} 
                            type="number"
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors outline-none"
                            placeholder="Från"
                        />
                    </div>
                    <span className="text-gray-400">-</span>
                    <div className="flex-1">
                        <input 
                            onChange={(event) => { setPriceMax(+event.target.value) }}
                            type="number"
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors outline-none"
                            placeholder="Till"
                        />
                    </div>
                </div>
            </div>

            {/* Size Filter */}
            <div className="space-y-4">
                <div className="border-b pb-2">
                    <label className="text-sm font-medium text-gray-700">Storlek (m²)</label>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="flex-1">
                        <input
                            onChange={(event) => { setSizeMin(+event.target.value) }} 
                            type="number"
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors outline-none"
                            placeholder="Från"
                        />
                    </div>
                    <span className="text-gray-400">-</span>
                    <div className="flex-1">
                        <input 
                            onChange={(event) => { setSizeMax(+event.target.value) }}
                            type="number"
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors outline-none"
                            placeholder="Till"
                        />
                    </div>
                </div>
            </div>

            {/* Type Filter */}
            <div className="space-y-4">
                <div className="border-b pb-2">
                    <label className="text-sm font-medium text-gray-700">Lokaltyp</label>
                </div>
                <div className="grid grid-cols-1 gap-2">
                    {officeTypes.map((type) => (
                        <CategoryButton setTypes={setTypes} types={types} type={type.name} key={type.id} />
                    ))}
                </div>
            </div>
        </div>
    )
}

interface SearchBarProps {
    handleSearch: (e: React.FormEvent) => void
    search: string | undefined
    setSearch: React.Dispatch<React.SetStateAction<string | undefined>>
}
const SearchBar = ({handleSearch, search, setSearch}: SearchBarProps) => {
    return (
        <form 
            onSubmit={(e) => {e.preventDefault(); handleSearch(e);}}
            className="bg-white rounded-lg shadow-lg"
        >
            <div className="flex">
                <div className="flex-1 flex items-center pl-4">
                    <HiOutlineSearch className="w-5 h-5 text-gray-400 mr-2" />
                    <input 
                        type="search" 
                        id="default-search" 
                        value={search || ""}
                        className="w-full p-4 text-gray-900 bg-transparent border-0 focus:ring-0 outline-none" 
                        placeholder="Sök efter arbetsplatser..."
                        onChange={(e) => setSearch(e.target.value)}
                        required 
                    />
                </div>
                <button 
                    type="submit" 
                    className="bg-primary hover:bg-primary-dark text-white font-medium px-8 py-4 transition-colors rounded-r-lg"
                >
                    Sök
                </button>
            </div>
        </form>
    )
}

export default LedigaLokaler