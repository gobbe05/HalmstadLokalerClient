import INewUser from "./INewUser"

export default async function register (newUser: INewUser): Promise<number | Error> {
    const response = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/auth/register`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(newUser)
    })
    if(response.status == 200) {
      return 200
    }
    throw new Error("500")
  }