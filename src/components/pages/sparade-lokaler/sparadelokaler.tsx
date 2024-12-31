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
        <div className="flex flex-col w-2/3 mx-auto text-gray-700 bg-white p-16 my-32 rounded"> 
            {!error && !isPending && !data.offices.length ? <div className="text-center mt-4 py-8">
                <h3 className="text-2xl font-semibold">Här var det tomt...</h3>
                <p className="mt-1 text-lg">Spara en lokal och kom tillbaks</p>
            </div>
            :
            <h1 className="text-2xl font-semibold text-center">Dina sparade lokaler</h1>}
            <div className="flex flex-col gap-8 mt-16 mx-16">
                {error || isPending ? <Loading /> : data.offices.map((savedOffice: ISavedOffice) => <OfficeCardLong key={savedOffice._id} office={savedOffice.office}/>)}
            </div>
        </div>
    )
}

export default SparadeLokaler