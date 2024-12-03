import IOffice from "../interfaces/IOffice";

export default async function getSavedSearches(): Promise<Array<IOffice>> {
    let officesToReturn: Array<IOffice> = []
    const response = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/api/savedsearch`, {
        credentials: "include"
    })
    if(response.status != 200) throw new Error("There was an error fetching saved searches");

    const data = await response.json()
    if(!data) throw new Error("There was an error when fetching saved searches");

    const {savedSearches} = data
    if(!savedSearches) throw new Error("No saved searches find");
    
    for(let i = 0; i < savedSearches.length; i++) {
        const {searchString} = savedSearches[i]
        const response = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/api/office?search=${searchString}`)
        if(response.status != 200) throw new Error("Fetch call failed")
        const {offices} = await response.json()
        if(!offices) return [];
        officesToReturn = [...officesToReturn, ...offices]
    }
    return officesToReturn
}   