/* TODO */
/* Specify data typ of return value */

export default async function getOffices(search?: string): Promise<Array<any>> {
    const response = await fetch(`http://${import.meta.env.VITE_SERVER_IP}:${import.meta.env.VITE_SERVER_PORT}/api/office${search ? `?search=${search}` : ``}`)
    if(response.status != 200) throw new Error("There was an error fetching offices")
    const data = await response.json()
    if(!data) throw new Error("There was an error when fetching offices")
    return data.offices
}