export default async function postMessage(message: string, conversation: string) {
    const response = await fetch(`http://${import.meta.env.VITE_SERVER_IP}:${import.meta.env.VITE_SERVER_PORT}/api/message`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({conversation, message})
    })
    if(response.status != 200) throw new Error("There was an error sending message")
    const data = await response.json()
    if(!data) throw new Error("There was an error when sending message what")
    return data.office
}