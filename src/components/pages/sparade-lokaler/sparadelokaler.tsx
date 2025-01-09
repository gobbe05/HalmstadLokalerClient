import { useQuery } from "@tanstack/react-query"
import Loading from "../../layout/loading"
import OfficeCardLong from "../../cards/officecardlong"
import ISavedOffice from "../../../interfaces/ISavedOffice"

const SparadeLokaler = () => {
    const {error, isPending, data} = useQuery({
        queryKey: ["saved-offices"],
        queryFn: async () => {
            const response = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/api/saved`, {
                credentials: "include"
            })
            const data = await response.json()
            return data
        }
    })

    return (
        <div className="flex flex-col gap-16 w-2/3 mx-auto text-gray-700 bg-white p-16 my-32 rounded-lg shadow-lg"> 
            {!error && !isPending && !data.offices.length ? 
            <div className="flex flex-col items-center justify-center mt-4 py-8">
                <h3 className="text-2xl font-bold">Inga sparade lokaler</h3>
                <p className="mt-2 text-lg text-gray-600">Spara en lokal och kom tillbaka senare.</p>
            </div>
            :
            
            <div>
                <h1 className="text-2xl font-bold text-center">
                    Dina sparade lokaler
                </h1>
                {error || isPending ? <Loading /> : <div className="grid gap-8 mt-16">{data.offices.map((savedOffice: ISavedOffice) => <OfficeCardLong key={savedOffice._id} office={savedOffice.office}/>)}</div>}
            </div>}
            </div>
    )
}

export default SparadeLokaler