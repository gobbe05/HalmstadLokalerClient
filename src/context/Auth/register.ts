import INewUser from "./INewUser"

export default async function register (newUser: INewUser): Promise<Response> {
    const response = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/auth/register`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(newUser)
    })
    return response
    throw new Error("500")
  }