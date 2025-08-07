import { Bounce, toast } from "react-toastify";

interface validateFirstStageFromServerProps {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
    accountType: "buyer" | "seller";
}

const validateFirstStageFromServer = async ({email, username, password, confirmPassword, accountType} : validateFirstStageFromServerProps) => {
    const response = fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/auth/register/validateFirst`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            username,
            password,
            confirmPassword,
            accountType
        }),
        credentials: "include"
    });
    const ok = (await response).ok

    const data = await (await response).json()
    if(!ok) {
        toast.error(data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            pauseOnHover: false,
            draggable: true,
            theme: "colored",
            transition: Bounce,
        });
        return false;
    } else {
        toast.success("Inloggningsuppgifter validerade!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            pauseOnHover: false,
            draggable: true,
            theme: "colored",
            transition: Bounce,
        });
        return true;
    }
}

export default validateFirstStageFromServer;