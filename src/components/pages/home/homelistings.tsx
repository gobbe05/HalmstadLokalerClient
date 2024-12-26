import { Link } from "react-router-dom"
import IOffice from "../../../interfaces/IOffice"
import OfficeCard from "../../cards/officecard"
import { useQuery } from "@tanstack/react-query"
import Loading from "../../layout/loading"

export default function HomeListings() {
    const {error, isPending, data} = useQuery({
      queryKey: ["home-listings"],
      queryFn: async () => {
        const response = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/api/office?limit=8`)
        const data = await response.json()
        return data
      }
    })

    if(error ||isPending) return <Loading />
    return (
        <div className="w-11/12 lg:w-2/3 mx-auto py-16">
          <div className="flex flex-col items-center">
            {/* Section Heading */}
            <h1 className="text-3xl font-semibold text-gray-800 text-center">
              Populära lokaler i Halmstad
            </h1>
            <p className="mt-4 text-gray-600 text-center">
              Utforska några av de mest eftertraktade kontorsutrymmena i området.
            </p>

            {/* Grid Section */}
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-12 w-full">
              {data.offices.map((office: IOffice) => (
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