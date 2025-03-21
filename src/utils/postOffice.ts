export default async function postOffice(name: string, location: string, size: number, type: string, price: number, position: {lat: number, lng: number}, images: File[], files: File[], tags: Array<string>, description: string): Promise<Array<any>> {
    const formData = new FormData()
    formData.append("name", name)
    formData.append("location", location)
    formData.append("size", size.toString())
    formData.append("price", price.toString())
    formData.append("lat", position.lat.toString()),
    formData.append("lng", position.lng.toString()),
    formData.append("tags", JSON.stringify(tags))
    formData.append("type", type)
    formData.append("description", description)
    images.forEach((image) => {
        formData.append("images[]", image)
    })
    files.forEach((file) => {
        formData.append("files[]", file)
    })
    
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