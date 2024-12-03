export default async function getOfficesLimit(limit: number): Promise<Array<any>> {
    if(!limit) throw new Error("No limit was given")
    const response = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/api/office?limit=${limit}`)
    if(response.status != 200) throw new Error("There was an error fetching offices")
    const data = await response.json()
    if(!data) throw new Error("There was an error when fetching offices")
    return data.offices
}