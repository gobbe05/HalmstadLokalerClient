interface FirstRegisterStageProps {
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  errors: { [key: string]: string };
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
  accountType: "buyer" | "seller";
  setAccountType: React.Dispatch<React.SetStateAction<"buyer" | "seller">>;
}

const FirstRegisterStage = ({setEmail, errors, setUsername, setPassword, setConfirmPassword, accountType, setAccountType}: FirstRegisterStageProps) => {
  return (
    <>
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
    </>
  )
}

export default FirstRegisterStage;