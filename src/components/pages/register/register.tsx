// src/components/login.tsx
import React, { useState } from "react";
import { useAuth } from "../../../context/Auth/AuthContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Logo from "../../layout/logo";
import { Bounce, toast } from "react-toastify";
import BackButton from "../../buttons/backbutton";
import FirstRegisterStage from "./firstregisterstage";
import SecondRegisterStage from "./secondregisterstage";
import { HiArrowLeft, HiHome } from "react-icons/hi2";

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [accountType, setAccountType] = useState<"seller" | "buyer">("buyer")
  const [firstName, setFirstName] = useState<string | undefined>("");
  const [lastName, setLastName] = useState<string | undefined>("");
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>("");
  const [companyName, setCompanyName] = useState<string | undefined>("");
  const [orgNr, setOrgNr] = useState<string | undefined>("");
  const [invoiceAddress, setInvoiceAddress] = useState<string | undefined>("");

  const [stage, setStage] = useState<1 | 2>(1); // 1 for first stage, 2 for second stage

  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!validateFirstStage()) return;
    if (accountType == "seller" && stage === 1) {
      setStage(2);
      return;
    }
    try {
      const registerPromise = accountType == "buyer" ? register({
        email, username, password, confirmPassword, accountType
      }) : register({
        email, username, password, confirmPassword, accountType, firstName, lastName, phoneNumber, companyName, orgNr, invoiceAddress
      });
      // Show toast notification with promise handling
      // This will show a loading state while the promise is pending
      // and will show success or error based on the promise result
      // The promise should resolve to a status code, e.g., 200 for success
      // and any other code for failure
      // Note: Adjust the promise handling based on your actual register function implementation
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

  const validateFirstStage = (): boolean => {
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
        <div className="mb-6 flex gap-2">
          {stage === 2 &&
          <div className="flex">
            <button onClick={() => setStage(1)} className="flex gap-2 items-center px-4 py-2 rounded-full text-gray-700 hover:bg-gray-700 hover:text-white transition-all"><HiArrowLeft size={16} /> <span className="text-sm">Backa</span></button>
          </div>} 
          <div className="flex">
            <Link to={"/"} className="flex gap-2 items-center px-4 py-2 rounded-full text-gray-700 hover:bg-gray-700 hover:text-white transition-all"><span className="text-sm">Hem</span><HiHome size={16} /></Link>
          </div> 
        </div>
        <Logo />
        <h2 className="text-xl font-semibold text-gray-700 mt-6">Registrera ett nytt konto</h2>
        <p className="text-sm">Efter att ditt konto har godkänts kommer du att få en bekräftelse via e-post.</p>

        <form onSubmit={handleRegister} className="flex flex-col gap-6 mt-8">
        {stage === 1 && 
        <FirstRegisterStage 
          setEmail={setEmail} 
          errors={errors} 
          setUsername={setUsername} 
          setConfirmPassword={setConfirmPassword} 
          setPassword={setPassword} 
          accountType={accountType} 
          setAccountType={setAccountType}
        />}  
        
        {stage === 2 &&
        <SecondRegisterStage 
          setFirstName={setFirstName} 
          setLastName={setLastName} 
          setPhoneNumber={setPhoneNumber}
          setCompanyName={setCompanyName} 
          setOrgNr={setOrgNr} 
          setInvoiceAddress={setInvoiceAddress} 
          errors={errors} 
        />}
        
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
