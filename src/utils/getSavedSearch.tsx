import IOffice from "../interfaces/IOffice";

export default async function getSavedSearch(): Promise<Array<IOffice>> {
    const response = await fetch(`http://${import.meta.env.VITE_SERVER_IP}:${import.meta.env.VITE_SERVER_PORT}/api/office/savedsearches`)
    if(response.status != 200) throw new Error("There was an error fetching saved searches")
    const data = await response.json()
    if(!data) throw new Error("There was an error when fetching saved searches")
    return data.offices
}   