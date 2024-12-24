import { useEffect, useState } from "react"
import IOffice from "../../../interfaces/IOffice"
import OfficeCardLong from "../../cards/officecardlong"
import { SaveSearchButton } from "./savesearchbuttont"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import Loading from "../../layout/loading"

const LedigaLokaler = () => {
    const [search, setSearch] = useState<string | undefined>(undefined)
    const [submittedSearch, setSubmittedSearch] = useState<string | undefined>(undefined)
    const [priceMin, setPriceMin] = useState<number | undefined>()
    const [priceMax, setPriceMax] = useState<number | undefined>()
    const [sizeMin, setSizeMin] = useState<number | undefined>()
    const [sizeMax, setSizeMax] = useState<number | undefined>()
    const [type, setType] = useState<string>()
  
    const queryClient = useQueryClient()
    const {error, isPending, data} = useQuery({
        queryKey: ["offices"],
        queryFn: async () => {
            const urlParams = new URLSearchParams()
            if(type) urlParams.append("type", type)
            if(search) urlParams.append("search", search)
            if(sizeMin) urlParams.append("sizeMin", sizeMin.toString())
            if(sizeMax) urlParams.append("sizeMax", sizeMax.toString())
            if(priceMin) urlParams.append("priceMin", priceMin.toString())
            if(priceMax) urlParams.append("priceMax", priceMax.toString())
            const response = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/api/office?${urlParams.toString()}`)
            if(response.status != 200) throw new Error("There was an error fetching offices")
            const data = await response.json()
            if(!data) throw new Error("There was an error when fetching offices")
            if(search && search != "") setSubmittedSearch(search)
            return data.offices
        }
    })

    if(error || isPending) return <Loading />
    return (
    <div className="flex flex-col w-2/3 mx-auto text-gray-700 bg-white p-16 my-16 rounded">
            <h1 className="text-2xl font-semibold text-center">Hitta en lokal som passar dig</h1>
            <div className="mt-8">
                <form className="w-full mt-8">
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
                            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 outline-none" 
                            placeholder="Sök efter arbetsplatser..."
                            onChange={(e) => setSearch(e.target.value)}
                            required 
                        />
                        <button 
                            onClick={(e) => { e.preventDefault(); queryClient.invalidateQueries({queryKey: ["offices"]})}} 
                            type="submit" 
                            className="absolute right-2.5 bottom-2.5 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg text-sm px-4 py-2 focus:ring-4 focus:outline-none focus:ring-blue-300"
                        >
                            Sök
                        </button>
                    </div>
                </form>

                <div className="mt-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-content-center gap-6">
                        <div className="flex flex-col">
                            <label htmlFor="size" className="text-sm text-gray-700">Pris (kr/månad)</label>
                            <div className="mt-2 flex flex-grow">
                                <input
                                    onChange={(event) => {setPriceMin(+event.target.value)}} 
                                    type="number"
                                    className="w-32 px-4 py-2 text-sm text-gray-500 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    placeholder="Min"/>
                                <p className="my-auto mx-2 text-xl text-gray-500 font-bold">-</p>
                                <input 
                                    onChange={(event) => {setPriceMax(+event.target.value)}}
                                    type="number"
                                    className="w-32 px-4 py-2 text-sm text-gray-500 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    placeholder="Max"/>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="size" className="text-sm text-gray-700">Storlek (m²)</label>
                            <div className="mt-2 flex flex-grow">
                                <input
                                    onChange={(event) => {setSizeMin(+event.target.value)}} 
                                    type="number"
                                    className="w-32 px-4 py-2 text-sm text-gray-500 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    placeholder="Min"/>
                                <p className="my-auto mx-2 text-xl text-gray-500 font-bold">-</p>
                                <input 
                                    onChange={(event) => {setSizeMax(+event.target.value)}}
                                    type="number"
                                    className="w-32 px-4 py-2 text-sm text-gray-500 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    placeholder="Max"/>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="location" className="text-sm text-gray-700">Typ</label>
                            <select
                                id="location" 
                                className="mt-2 px-4 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                onChange={(e) => setType(e.target.value)} 
                            >
                                <option value="" selected></option>
                                <option value="kontor">Kontor</option>
                                <option value="studio">Studio</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="grid gap-8 w-full mx-auto mt-8">
                    <div className={`flex items-center justify-between ${!submittedSearch && "hidden"}`}>
                            <SaveSearchButton submittedSearch={submittedSearch} />
                    </div>
                    {data.map((office: IOffice) => <OfficeCardLong office={office} key={office._id}/>)}
                </div>
            </div> 
        </div>
    )
}

export default LedigaLokaler