import { useQuery } from "@tanstack/react-query"

export default function Listings() {
    const {isPending,error,data} = useQuery({
        queryKey: ['my-offices'],
        queryFn: () => {
            return fetch(``, {
                credentials: "include"
            })
        }
    })
    return (
        <div className="bg-white rounded p-8">
            <p>Dina annonser</p>

        </div>
    )
}