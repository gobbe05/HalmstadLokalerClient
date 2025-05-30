// src/components/login.tsx
import React, { FormEvent, useState } from "react";
import { useAuth } from "../../../context/Auth/AuthContext";
import { Link, Navigate } from "react-router-dom";
import Logo from "../../layout/logo";
import { toast } from "react-toastify";
import BackButton from "../../buttons/backbutton";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login, isAuthenticated } = useAuth();

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault()
    login(username, password)  
  };

  if(isAuthenticated) {
    return <Navigate to="/"></Navigate>
  }
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col lg:flex-row items-stretch shadow-lg rounded-lg overflow-hidden h-full lg:h-auto w-full lg:max-w-4xl bg-white">
        <div className="lg:w-1/2 h-48 lg:h-auto bg-cover bg-center bg-[url('https://images.prismic.io/visithalland2/f4cd3cc9-8848-4399-a0c5-5ade146dad27_Halmstad_Halland_AlexanderHall_small.jpeg?ixlib=gatsbyFP&auto=compress%2Cformat&fit=max')]">
          <div className="bg-black opacity-50 w-full h-full"></div>
        </div>

        <form onSubmit={handleLogin} className="lg:w-1/2 p-12 my-auto">
          <div className="mb-6">
            <BackButton link="/" />
          </div>
          <Logo />

          <h2 className="text-2xl font-semibold text-gray-700 mt-8">Logga in</h2>

          <div className="flex flex-col gap-6 mt-6">
            <div className="w-full">
              <p className="font-semibold text-gray-500">Användarnamn / E-post</p>
              <input
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 w-full text-gray-600 font-semibold border-b-2 border-gray-300 bg-gray-100 outline-none focus:border-blue-500 p-3 transition-all duration-300"
                placeholder="Användarnamn..."
                type="text"
              />
            </div> 

            <div className="w-full">
              <p className="font-semibold text-gray-500">Lösenord</p>
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-gray-600 font-semibold border-b-2 border-gray-300 bg-gray-100 outline-none focus:border-blue-500 p-3 transition-all duration-300"
                placeholder="Lösenord..."
                type="password"
              />
            </div>

            <button
              type="submit"
              className="p-3 bg-blue-500 hover:bg-blue-600 hover:shadow-lg rounded-lg text-white font-semibold transition-all duration-300"
            >
              Logga in
            </button>
          </div>

          <p className="mt-6 text-center text-gray-600">
            Har du inget konto?{' '}
            <Link className="text-blue-500 underline underline-offset-2" to="/register">
              Skapa ett nytt!
            </Link>
          </p>
        </form>
      </div>
    </div>

  ) 
};

export default Login;
