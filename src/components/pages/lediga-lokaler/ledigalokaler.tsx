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
        <div className="bg-white">
            <div className="flex flex-col w-full xl:w-2/3 mx-auto text-gray-700 xl:p-16 sm:p-8 xl:mb-32">
                {/* Heading */}
                <h1 className="text-2xl mt-8 sm:mb-8 xl:my-0 font-bold text-center text-gray-700">Hitta en lokal som passar dig</h1>

                {/* Search Form */}
                <SearchBar handleSearch={handleSearch} setSearch={setSearch} search={search} />
                <div className="grid xl:grid-cols-4 gap-4 mt-8">
                    {/* Results */}
                    <div className="xl:col-span-3">
                        <div className="grid sm:gap-4">
                            {/* Save Search */}
                            <div className={`flex items-center justify-between ${!submittedSearch && "hidden"}`}>
                                <SaveSearchButton submittedSearch={submittedSearch} />
                            </div>

                            {/* No Results */}
                            {!data.length && (
                                <div className="text-center text-gray-700 py-16">
                                    <h1 className="text-2xl font-semibold">Här var det tomt...</h1>
                                    <p className="text-lg">Testa med att utöka din sökning</p>
                                </div>
                            )}

                            {/* Results List */}
                            {data.map((office: IOffice) => (
                                <OfficeCardLong office={office} key={office._id} />
                            ))}

                            {/* Pagination */}
                            {!!data.length && (
                                <Pagination
                                    count={pageCount}
                                    page={page}
                                    onChange={(_, page) => { setPage(page) }}
                                    className="mx-auto xl:mx-0 mt-8"
                                    shape="rounded"
                                />
                            )}
                        </div>
                    </div>
                    {/* Filters for mobile screens */}
                    <Accordion style={{borderRadius:10, boxShadow: "none", backgroundColor: "rgb(255 255 255)", borderWidth: 1}} className="mx-4 sm:mx-0 xl:hidden">
                        <AccordionSummary
                            expandIcon={<ArrowDownwardIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            <h3>Filtrera</h3>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Filters setPriceMin={setPriceMin} setPriceMax={setPriceMax} setSizeMin={setSizeMin} setSizeMax={setSizeMax} setTypes={setTypes} types={types} />
                        </AccordionDetails>
                    </Accordion>
                    {/* Filters for big screens */}
                    <div className="hidden xl:block">
                        <Filters setPriceMin={setPriceMin} setPriceMax={setPriceMax} setSizeMin={setSizeMin} setSizeMax={setSizeMax} setTypes={setTypes} types={types} />
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
        <div className="col-span-1">
            <div>
                <div className="grid grid-cols-1 gap-4">
                    {/* Price Filter */}
                    <div className="p-4 bg-gray-50 border">
                        <label htmlFor="size" className="block text-sm font-medium text-gray-700">Pris (kr/månad)</label>
                        <div className="mt-3 flex">
                            <input
                                onChange={(event) => { setPriceMin(+event.target.value) }} 
                                type="number"
                                className="w-1/2 px-4 py-2 text-sm text-gray-900 border border-gray-300 rounded-l-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                placeholder="Min"
                            />
                            <span className="mx-2 text-xl text-gray-500 font-semibold">-</span>
                            <input 
                                onChange={(event) => { setPriceMax(+event.target.value) }}
                                type="number"
                                className="w-1/2 px-4 py-2 text-sm text-gray-900 border border-gray-300 rounded-r-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                placeholder="Max"
                            />
                        </div>
                    </div>

                    {/* Size Filter */}
                    <div className="p-4 bg-gray-50 border">
                        <label htmlFor="size" className="block text-sm font-medium text-gray-700">Storlek (m²)</label>
                        <div className="mt-3 flex">
                            <input
                                onChange={(event) => { setSizeMin(+event.target.value) }} 
                                type="number"
                                className="w-1/2 px-4 py-2 text-sm text-gray-900 border border-gray-300 rounded-l-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                placeholder="Min"
                            />
                            <span className="mx-2 text-xl text-gray-500 font-semibold">-</span>
                            <input 
                                onChange={(event) => { setSizeMax(+event.target.value) }}
                                type="number"
                                className="w-1/2 px-4 py-2 text-sm text-gray-900 border border-gray-300 rounded-r-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                placeholder="Max"
                            />
                        </div>
                    </div>

                    {/* Type Filter */}
                    <div className="p-4 bg-gray-50 border">
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700">Typ</label>
                        <div className="flex flex-col gap-2 mt-4">
                            {officeTypes.map((type) => (
                                <CategoryButton setTypes={setTypes} types={types} type={type.name} key={type.id} />
                            ))}
                        </div>
                    </div>
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
        <>
            <form className="p-4 sm:p-0 w-full mt-8" onSubmit={(e) => {e.preventDefault(); handleSearch(e);}}>
                <label htmlFor="default-search" className="sr-only">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg 
                            className="w-5 h-5 text-gray-500" 
                            aria-hidden="true" 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 20 20"
                        >
                            <path 
                                stroke="currentColor" 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth="2" 
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                    </div>
                    <input 
                        type="search" 
                        id="default-search" 
                        value={search || ""}
                        className="block w-full p-4 pl-12 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 outline-none shadow-sm" 
                        placeholder="Sök efter arbetsplatser..."
                        onChange={(e) => setSearch(e.target.value)}
                        required 
                    />
                    <button 
                        onClick={(e) => handleSearch(e)} 
                        type="button" 
                        className="absolute right-2.5 bottom-2.5 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg text-sm px-4 py-2 focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-md"
                    >
                        <HiOutlineSearch size={20} />
                    </button>
                </div>
            </form> 
        </>
    )
}

export default LedigaLokaler