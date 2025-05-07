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
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [accountType, setAccountType] = useState<"seller" | "buyer">("buyer")
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!validate()) return;
    try {
      const registerPromise = register(email, username, password, confirmPassword, accountType)
      toast.promise(registerPromise, {
        pending: "Kontrollerar dina inloggningsuppgifter", 
        success: "Registrering lyckades! Du kommer nu att omdirigeras till inloggningssidan.",
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
    } catch(e) {
      toast.error("Ett oväntat fel uppstod.")
    }
  };

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!email) newErrors.email = "Email är obligatoriskt.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Ogiltig e-postadress.";

    if (!username) newErrors.username = "Användarnamn är obligatoriskt.";

    if (!password) newErrors.password = "Lösenord är obligatoriskt.";
    else if (password.length < 6)
      newErrors.password = "Lösenordet måste vara minst 6 tecken.";

    if (!confirmPassword) newErrors.confirmPassword = "Bekräfta lösenord.";
    else if (password !== confirmPassword)
      newErrors.confirmPassword = "Lösenorden matchar inte.";

    if (!accountType) newErrors.accountType = "Välj en kontotyp.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  if(isAuthenticated) {
    return <Navigate to="/"></Navigate>
  }
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col lg:flex-row items-stretch h-full  w-full  bg-white shadow-lg rounded-lg overflow-hidden">
      
      <div className="lg:w-1/2 h-48 lg:h-auto bg-cover bg-center" style={{ backgroundImage: "url('https://images.prismic.io/visithalland2/f4cd3cc9-8848-4399-a0c5-5ade146dad27_Halmstad_Halland_AlexanderHall_small.jpeg?ixlib=gatsbyFP&auto=compress%2Cformat&fit=max')" }}>
        <div className="bg-black opacity-40 w-full h-full"></div>
      </div>

      <div className="lg:w-1/2 p-8 lg:p-16 my-auto">
        <div className="mb-6">
          <BackButton link="/login" />
        </div>
        <Logo />
        <h2 className="text-xl font-semibold text-gray-700 mt-6">Registrera ett nytt konto</h2>
        <p className="text-sm">Efter att ditt konto har godkänts kommer du att få en bekräftelse via e-post.</p>

        <form onSubmit={handleRegister} className="flex flex-col gap-6 mt-8">
        <div>
            <label className="font-semibold text-gray-500">Email</label>
            <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            className={`mt-1 w-full text-gray-600 font-semibold border-b-2 ${errors.email ? 'border-red-500' : 'border-gray-300'} bg-gray-100 outline-none focus:border-blue-500 p-3 transition-all duration-300`}
            placeholder="Email..."
          /> 
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div>
          <label className="font-semibold text-gray-500">Användarnamn</label>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            className={`mt-1 w-full text-gray-600 font-semibold border-b-2 ${errors.username ? 'border-red-500' : 'border-gray-300'} bg-gray-100 outline-none focus:border-blue-500 p-3 transition-all duration-300`}
            placeholder="Användarnamn..."
          />
          {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
        </div>

        <div>
          <label className="font-semibold text-gray-500">Lösenord</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className={`mt-1 w-full text-gray-600 font-semibold border-b-2 ${errors.password ? 'border-red-500' : 'border-gray-300'} bg-gray-100 outline-none focus:border-blue-500 p-3 transition-all duration-300`}
            placeholder="Lösenord..."
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>

        <div>
          <label className="font-semibold text-gray-500">Bekräfta Lösenord</label>
          <input
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`mt-1 w-full text-gray-600 font-semibold border-b-2 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} bg-gray-100 outline-none focus:border-blue-500 p-3 transition-all duration-300`}
            placeholder="Bekräfta lösenord..."
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
        </div>
        <div className="flex items-stretch w-full rounded-lg overflow-hidden font-semibold text-gray-600">
          <div onClick={() => {setAccountType("buyer")}} className={`${accountType == "buyer" ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200"} transition-all cursor-pointer w-1/2 p-4 text-center`}>
            <h3>Köpare</h3>
          </div>
          <div onClick={() => {setAccountType("seller")}} className={`${accountType == "seller" ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200"} transition-all cursor-pointer w-1/2 p-4 text-center`}>
            <h3>Säljare</h3>
          </div>
        </div>
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
