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
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">
              {noPreviouosOffices ? "Populära lokaler i Halmstad" : "Senast visade lokaler"} 
            </h2>
            <p className="text-neutral/80">
              {noPreviouosOffices 
                ? "De mest eftertraktade lokalerna just nu" 
                : "Fortsätt utforska lokaler du varit intresserad av"} 
            </p>
          </div>
          
          <Link 
            to="/lediga-lokaler" 
            className="mt-4 md:mt-0 inline-flex items-center text-primary hover:text-primary-dark transition-colors group"
          >
            <span>Visa alla lediga lokaler</span>
            <svg 
              className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Grid Section */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {previousOffices.map((office: IOffice) => (
            office && (
              <div key={office._id} className="transform transition-all duration-300 hover:-translate-y-1">
                <OfficeCard office={office} />
              </div>
            )
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 text-center md:hidden">
          <Link 
            to="/lediga-lokaler" 
            className="inline-flex items-center justify-center w-full px-6 py-3 rounded-xl bg-primary text-white hover:bg-primary-dark transition-all"
          >
            Visa alla lediga lokaler
          </Link>
        </div>
      </div>
    </div>
  )
}