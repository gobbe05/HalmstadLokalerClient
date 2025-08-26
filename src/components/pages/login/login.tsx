// src/components/login.tsx
import React, { FormEvent, useState } from "react";
import { useTranslation } from 'react-i18next';
import { useAuth } from "../../../context/Auth/AuthContext";
import { Link, Navigate } from "react-router-dom";
import Logo from "../../layout/logo";
import { toast } from "react-toastify";
import BackButton from "../../buttons/backbutton";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login, isAuthenticated } = useAuth();
    const { t } = useTranslation();

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

          <h2 className="text-2xl font-semibold text-neutral mt-8">{t('login.title', 'Logga in')}</h2>

          <div className="flex flex-col gap-6 mt-6">
            <div className="w-full">
              <p className="font-semibold text-neutral">{t('login.usernameOrEmail', 'Användarnamn / E-post')}</p>
              <input
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 w-full text-gray-600 font-semibold border-b-2 border-gray-300 bg-gray-100 outline-none focus:border-primary p-3 transition-all duration-300"
                placeholder={t('login.usernamePlaceholder', 'Användarnamn...')}
                type="text"
              />
            </div> 

            <div className="w-full">
              <p className="font-semibold text-neutral">{t('login.password', 'Lösenord')}</p>
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-gray-600 font-semibold border-b-2 border-gray-300 bg-gray-100 outline-none focus:border-primary p-3 transition-all duration-300"
                placeholder={t('login.passwordPlaceholder', 'Lösenord...')}
                type="password"
              />
            </div>

            <button
              type="submit"
              className="p-3 bg-primary hover:bg-primary-dark hover:shadow-lg rounded-lg text-white font-semibold transition-all duration-300"
            >
              {t('login.loginButton', 'Logga in')}
            </button>
          </div>

          <p className="mt-6 text-center text-gray-600">
            {t('login.noAccount', 'Har du inget konto?')}{' '}
            <Link className="text-accent underline underline-offset-2" to="/register">
              {t('login.createNew', 'Skapa ett nytt!')}
            </Link>
          </p>
        </form>
      </div>
    </div>
  ) 
};

export default Login;
