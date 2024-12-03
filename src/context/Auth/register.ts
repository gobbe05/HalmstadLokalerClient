export default async function register (email: string, username: string, password: string): Promise<number | Error> {
    const response = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/auth/register`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        username,
        password,
        email
      })
    })
    if(response.status == 200) {
      return 200
    }
    throw new Error("500")
  }