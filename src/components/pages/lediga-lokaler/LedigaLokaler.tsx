import { HiBuildingOffice } from "react-icons/hi2"
import OfficeTypeRing from "../../cards/officetypering"
import { useEffect, useState } from "react"
import IOffice from "../../../interfaces/IOffice"
import getOffices from "../../../utils/getOffices"
import OfficeCardLong from "../../cards/officecardlong"

const LedigaLokaler = () => {
    const [offices, setOffices] = useState<Array<IOffice>>([])
    const [search, setSearch] = useState<string | undefined>(undefined)
    
    const loadOffices = async (search?: string) => {
        const offices = search ? await getOffices(search) : await getOffices()
        setOffices(offices)
    }

    useEffect(() => {
       loadOffices()
    }, [])

    return (
        <div className="flex flex-col w-full">
        <div className="w-full flex justify-center gap-8 mt-16">
            <OfficeTypeRing name={"Kontor"} Icon={HiBuildingOffice} />
            <OfficeTypeRing name={"Kontor"} Icon={HiBuildingOffice} />
            <OfficeTypeRing name={"Kontor"} Icon={HiBuildingOffice} />
            <OfficeTypeRing name={"Kontor"} Icon={HiBuildingOffice} />
            <OfficeTypeRing name={"Kontor"} Icon={HiBuildingOffice} />
        </div>
        <div className="w-1/2 mx-auto mt-16">
            <form className="w-full mx-auto">   
                <label className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input onChange={(e) => setSearch(e.target.value)} type="search" id="default-search" className="block w-full p-4 ps-10 text-sm outline-none text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 " placeholder="Search Mockups, Logos..." required />
                    <button onClick={(e) => {e.preventDefault(); loadOffices(search)}} type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-500 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">Search</button>
                </div>
            </form>
            <div className="grid gap-8 w-full mx-auto mt-8">
                {offices.map((office: IOffice) => <OfficeCardLong location={office.location} price={office.price} size={office.size} image={office.image}/>)}
            </div>
        </div> 
        </div>
    )
}

export default LedigaLokaler