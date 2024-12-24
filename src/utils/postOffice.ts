export default async function postOffice(name: string, location: string, size: number, type: string, price: number, position: {lat: number, lng: number}, image: File, tags: Array<string>, description: string): Promise<Array<any>> {
    const formData = new FormData()
    formData.append("name", name)
    formData.append("location", location)
    formData.append("size", size.toString())
    formData.append("price", price.toString())
    formData.append("lat", position.lat.toString()),
    formData.append("lng", position.lng.toString()),
    formData.append("tags", tags.toString())
    formData.append("image", image)
    formData.append("type", type)
    formData.append("description", description)
    
    const response = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/api/office`, {
        method: "POST",
        credentials: "include",
        body: formData
    })
    if(response.status != 201) throw new Error("There was an error fetching offices")
    const data = await response.json()
    if(!data) throw new Error("There was an error when fetching offices")
    return data.office
}