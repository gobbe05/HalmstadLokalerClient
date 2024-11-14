// src/components/login.tsx
import React, { useState } from "react";
import { useAuth } from "../../../context/Auth/AuthContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Logo from "../../layout/logo";
import { Bounce, toast } from "react-toastify";

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async () => {
    const registerPromise = register(email, username, password, confirmPassword)
    toast.promise(registerPromise, {
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
    if(await registerPromise == 200) {
      navigate("/login")
    } else {
      navigate("/register")
    }
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
        <div className="p-12 bg-white shadow-2xl rounded-lg">
          <div className="pe-64">
            <Logo />
            <h2 className="text-xl text-gray-700 mt-16">Registrera ett nytt konto</h2>
          </div>
          <div className="flex flex-col gap-4 mt-2">
            <input  onChange={(e) => {setEmail(e.target.value)}} 
                  className="text-gray-600 font-semibold border-b-2 border-gray-300 bg-gray-100 outline-none focus:border-blue-500 p-2 transition-all duration-500" placeholder="Email..."/>
            <input  onChange={(e) => {setUsername(e.target.value)}}
                  className="text-gray-600 font-semibold border-b-2 border-gray-300 bg-gray-100 outline-none focus:border-blue-500 p-2 transition-all duration-500" placeholder="Användarnamn..." />
            <input  onChange={(e) => {setPassword(e.target.value)}}
                  className="text-gray-600 font-semibold border-b-2 border-gray-300 bg-gray-100 outline-none focus:border-blue-500 p-2 transition-all duration-500" placeholder="Lösenord..." type="password" />
            <input  onChange={(e) => {setConfirmPassword(e.target.value)}}
                  className="text-gray-600 font-semibold border-b-2 border-gray-300 bg-gray-100 outline-none focus:border-blue-500 p-2 transition-all duration-500" placeholder="Bekräfta Lösenord..." type="password" />
            <button className="p-2 bg-blue-500 hover:bg-blue-600 hover:shadow-lg rounded text-white transition-all duration-500" onClick={handleRegister}>Registrera dig</button>
          </div>
          <p className="mt-2">Har du redan ett konto? <Link className="text-blue-500 underline underline-offset-2" to="/login">Logga in!</Link></p>
        </div>
      </div>
    </div>
  ) 
};

export default Register;
