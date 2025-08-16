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
      const respone = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/api/office?limit=4`)
      const data = await respone.json()
      setPreviousOffices(data.offices)
      setNoPreviousOffices(true)
      return
    }
    const offices = await Promise.all(officeIds.map(async (item) => {
      const response = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/api/office/${item._id}`)
      if(response.status === 404) {
        localStorage.setItem(historyKey, JSON.stringify(officeIds.filter(office => office._id !== item._id)))
        return null; // Skip if office not found
      }
      // Assuming the response contains an office object
      const data = await response.json()
      return data.office
    }))
    setPreviousOffices(offices)
  }

  useEffect(() => {
    getOfficesFromLocalStorage()  
  }, [])

  return (
      <div className="max-w-5xl mx-auto py-16 pb-64">
        <div className="flex flex-col">
          {/* Section Heading */}
          <h1 className="text-4xl font-bold text-primary">
            {noPreviouosOffices ? "Populära lokaler i Halmstad" : "Senast tittade på lokaler"} 
          </h1>
          <p className="font-semibold mt-1 text-neutral">
            {noPreviouosOffices ? "Här är några av de mest populära lokalerna i Halmstad" : "Här kommer de senaste lokaler du tittat på..."} 
          </p>

          {/* Grid Section */}
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-12 w-full">
            {previousOffices.map((office: IOffice) => (
              office && <OfficeCard
                key={office._id} // Assuming each office has a unique ID
                office={office} 
              />
            ))}
          </div>

          {/* CTA Button */}
          <Link 
            to="/lediga-lokaler" 
            className="mt-12 mr-auto px-6 py-3 rounded-md border bg-primary text-white hover:bg-primary-dark hover:text-white transition-all duration-300"
          >
            Visa alla lediga lokaler
          </Link>
        </div>
      </div>

      )
}