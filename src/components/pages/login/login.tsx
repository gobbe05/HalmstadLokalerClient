// src/components/login.tsx
import React, { FormEvent, useState } from "react";
import { useAuth } from "../../../context/Auth/AuthContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Logo from "../../layout/logo";
import { Bounce, toast } from "react-toastify";
import BackButton from "../../buttons/backbutton";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login, isAuthenticated } = useAuth();

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault()
    toast.promise(login(username, password), {
      pending: "Kontrollerar dina inloggningsuppgifter", 
      success: "Inloggning lyckades",
      error: "Något gick tyvärr fel. Försök igen!"
    }, {
      position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        pauseOnHover: false,
        draggable: true,
        theme: "colored",
        transition: Bounce,
    })
  };
  if(isAuthenticated) {
    return <Navigate to="/"></Navigate>
  }
  return (
    <div className="w-dvw h-dvh flex">
      <div className="m-auto flex items-center">
        <div>
          <div className="shadow-lg h-[300px] w-[400px] bg-cover bg-[url(https://images.prismic.io/visithalland2/f4cd3cc9-8848-4399-a0c5-5ade146dad27_Halmstad_Halland_AlexanderHall_small.jpeg?ixlib=gatsbyFP&auto=compress%2Cformat&fit=max)]" />
        </div>
        <form  onSubmit={handleLogin} className="p-12 bg-white shadow-2xl rounded-lg">
          <div className="pe-64">
            <div className="mb-2">
              <BackButton link="/"/>
            </div>
            <Logo />
            
            <h2 className="text-xl text-gray-700 mt-8">Logga in</h2>
          </div>
          <div className="flex flex-col gap-4 mt-4">
            <input  onChange={(e) => {setUsername(e.target.value)}} 
                  className="text-gray-600 font-semibold border-b-2 border-gray-300 bg-gray-100 outline-none focus:border-blue-500 p-2 transition-all duration-500" placeholder="Användarnamn..."/>
            <input  onChange={(e) => {setPassword(e.target.value)}}
                  className="text-gray-600 font-semibold border-b-2 border-gray-300 bg-gray-100 outline-none focus:border-blue-500 p-2 transition-all duration-500" placeholder="Lösenord..." type="password" />
            <button type="submit" className="p-2 bg-blue-500 hover:bg-blue-600 hover:shadow-lg rounded text-white transition-all duration-500">Logga in</button>
          </div>
          <p className="mt-2">Har du inget konto? <Link className="text-blue-500 underline underline-offset-2" to="/register">Skapa ett nytt!</Link></p>
        </form>
      </div>
    </div>
  ) 
};

export default Login;
