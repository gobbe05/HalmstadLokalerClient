export default async function register (email: string, username: string, password: string): Promise<number | Error> {
    const response = await fetch(`http://${import.meta.env.VITE_SERVER_IP}:${import.meta.env.VITE_SERVER_PORT}/auth/register`, {
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