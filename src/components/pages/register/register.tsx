// src/components/login.tsx
import React, { useState } from "react";
import { useAuth } from "../../../context/Auth/AuthContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Logo from "../../layout/logo";
import { Bounce, toast } from "react-toastify";
import BackButton from "../../buttons/backbutton";

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
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
  <div className="flex items-stretch w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
    
    <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('https://images.prismic.io/visithalland2/f4cd3cc9-8848-4399-a0c5-5ade146dad27_Halmstad_Halland_AlexanderHall_small.jpeg?ixlib=gatsbyFP&auto=compress%2Cformat&fit=max')" }}>
      <div className="bg-black opacity-40 w-full h-full"></div>
    </div>

    <div className="w-1/2 p-12">
      <div className="mb-6">
        <BackButton link="/" />
      </div>
      <Logo />
      <h2 className="text-2xl font-semibold text-gray-700 mt-6">Registrera ett nytt konto</h2>

      <form onSubmit={handleRegister} className="flex flex-col gap-6 mt-8">
        
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          className="text-gray-600 font-semibold border-b-2 border-gray-300 bg-gray-100 outline-none focus:border-blue-500 p-3 transition-all duration-300"
          placeholder="Email..."
        />

        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          className="text-gray-600 font-semibold border-b-2 border-gray-300 bg-gray-100 outline-none focus:border-blue-500 p-3 transition-all duration-300"
          placeholder="Användarnamn..."
        />

        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className="text-gray-600 font-semibold border-b-2 border-gray-300 bg-gray-100 outline-none focus:border-blue-500 p-3 transition-all duration-300"
          placeholder="Lösenord..."
        />

        <input
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="text-gray-600 font-semibold border-b-2 border-gray-300 bg-gray-100 outline-none focus:border-blue-500 p-3 transition-all duration-300"
          placeholder="Bekräfta lösenord..."
        />

        <button
          type="submit"
          className="p-3 bg-blue-500 hover:bg-blue-600 hover:shadow-lg rounded-lg text-white font-semibold transition-all duration-300"
        >
          Registrera dig
        </button>
      </form>

      <p className="mt-4 text-center text-gray-600">
        Har du redan ett konto?{' '}
        <Link className="text-blue-500 underline underline-offset-2" to="/login">
          Logga in!
        </Link>
      </p>
    </div>
  </div>
</div>

  ) 
};

export default Register;
