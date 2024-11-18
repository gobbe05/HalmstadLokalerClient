import { useEffect, useState } from "react"
import IOffice from "../../../interfaces/IOffice"
import getOffices from "../../../utils/getOffices"
import OfficeCardLong from "../../cards/officecardlong"

const LedigaLokaler = () => {
    const [offices, setOffices] = useState<Array<IOffice>>([])
    const [search, setSearch] = useState<string | undefined>(undefined)
    const [price, setPrice] = useState<number>(0)
    const [size, setSize] = useState<number>(0)
    const [type, setType] = useState<string>("kontor")
    
    const loadOffices = async (search?: string) => {
        const offices = search ? await getOffices(search) : await getOffices()
        setOffices(offices)
    }

    useEffect(() => {
       loadOffices()
    }, [])

    return (
    <div className="flex flex-col w-2/3 mx-auto text-gray-700 bg-white p-16 mt-16 rounded">
            <h1 className="text-2xl font-semibold text-center">Hitta en lokal som passar dig</h1>
            <div className="mx-auto mt-8">
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
                            onClick={(e) => { e.preventDefault(); loadOffices(search) }} 
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
                            <label htmlFor="size" className="text-sm text-gray-700">Pris (kr)</label>
                            <span className="text-sm text-gray-600">{price} kr/mån</span>
                            <input 
                                type="range" 
                                id="price" 
                                min="0" 
                                max="10000" 
                                step="500" 
                                className="my-auto appearance-none w-full h-2 bg-gray-200 rounded-lg cursor-pointer"
                                onChange={(e) => setPrice(+e.target.value)} 
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="size" className="text-sm text-gray-700">Storlek (m²)</label>
                            <input 
                                type="number" 
                                id="size" 
                                placeholder="M²"
                                className="mt-2 px-4 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                onChange={(e) => setSize(+e.target.value)} 
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="location" className="text-sm text-gray-700">Plats</label>
                            <select
                                id="location" 
                                className="mt-2 px-4 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                onChange={(e) => setType(e.target.value)} 
                            >
                                <option value="kontor" selected>Kontor</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/*
                <div className="w-full flex justify-center gap-8 mt-4">
                    <OfficeTypeRing name={"Kontor"} Icon={HiBuildingOffice} />
                    <OfficeTypeRing name={"Kontor"} Icon={HiBuildingOffice} />
                    <OfficeTypeRing name={"Kontor"} Icon={HiBuildingOffice} />
                    <OfficeTypeRing name={"Kontor"} Icon={HiBuildingOffice} />
                    <OfficeTypeRing name={"Kontor"} Icon={HiBuildingOffice} />
                </div>
                */}
                <div className="grid gap-8 w-full mx-auto mt-8">
                    <div className="flex justify-between">
                        <div>
                            <select
                                id="location" 
                                className="mt-2 px-4 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                onChange={(e) => setType(e.target.value)} 
                            >
                                <option value="kontor" selected>Kontor</option>
                            </select>
                        </div>
                        <button className="">

                        </button>
                    </div>
                    {offices.map((office: IOffice) => <OfficeCardLong office={office} key={office._id}/>)}
                </div>
            </div> 
        </div>
    )
}

export default LedigaLokaler