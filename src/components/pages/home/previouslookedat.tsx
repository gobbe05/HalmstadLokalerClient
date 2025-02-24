import { Link } from "react-router-dom"
import IOffice from "../../../interfaces/IOffice"
import OfficeCard from "../../cards/officecard"
import { useEffect, useState } from "react"

export default function PreviousLookedAt() {
  const [previousOffices, setPreviousOffices] = useState<IOffice[]>([])
  const [noPreviouosOffices, setNoPreviousOffices] = useState<boolean>(false)

  const getOfficesFromLocalStorage = async () => {
    const historyKey = 'visitedOffices';

    const storedHistory = localStorage.getItem(historyKey);
    const officeIds: {_id: string}[] = storedHistory ? JSON.parse(storedHistory) : [];
    if(officeIds.length == 0) {
      const respone = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/api/office?limit=8`)
      const data = await respone.json()
      setPreviousOffices(data.offices)
      setNoPreviousOffices(true)
      return
    }
    const offices = await Promise.all(officeIds.map(async (item) => {
      const response = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/api/office/${item._id}`)
      const data = await response.json()
      return data.office
    }))
    setPreviousOffices(offices)
  }

  useEffect(() => {
    getOfficesFromLocalStorage()  
  }, [])

  return (
      <div className="w-11/12 lg:w-2/3 mx-auto py-16">
        <div className="flex flex-col items-center">
          {/* Section Heading */}
          <h1 className="text-3xl font-semibold text-gray-800 text-center">
            {noPreviouosOffices ? "Populära lokaler i Halmstad" : "Senast tittade på lokaler"} 
          </h1>
          <p className="mt-4 text-gray-600 text-center">
            {noPreviouosOffices ? "Här är några av de mest populära lokaler i Halmstad" : "Välkommen tillbaks, här är de senaste lokaler du tittat på"} 
          </p>

          {/* Grid Section */}
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-12 w-full">
            {previousOffices.map((office: IOffice) => (
              <OfficeCard
                key={office._id} // Assuming each office has a unique ID
                office={office} 
              />
            ))}
          </div>

          {/* CTA Button */}
          <Link 
            to="/lediga-lokaler" 
            className="mt-12 px-6 py-3 rounded-full border border-gray-700 text-gray-700 hover:bg-gray-700 hover:text-white transition-all duration-300"
          >
            Visa alla lediga lokaler
          </Link>
        </div>
      </div>

      )
}