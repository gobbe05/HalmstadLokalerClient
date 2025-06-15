interface SecondRegisterStageProps {
  setFirstName: React.Dispatch<React.SetStateAction<string | undefined>>;
  setLastName: React.Dispatch<React.SetStateAction<string | undefined>>;
  setCompanyName: React.Dispatch<React.SetStateAction<string | undefined>>;
  setOrgNr: React.Dispatch<React.SetStateAction<string | undefined>>;
  setInvoiceAddress: React.Dispatch<React.SetStateAction<string | undefined>>;
  errors: { [key: string]: string };

}
const SecondRegisterStage = ({setFirstName, setLastName, setCompanyName, setOrgNr, setInvoiceAddress, errors}: SecondRegisterStageProps) => {
  return (
    <>
      <div>
        <label className="font-semibold text-gray-500">Förnamn</label>
        <input
          type="text"
          onChange={(e) => setFirstName(e.target.value)}
          className={`mt-1 w-full text-gray-600 font-semibold border-b-2 ${errors.firstname ? 'border-red-500' : 'border-gray-300'} bg-gray-100 outline-none focus:border-blue-500 p-3 transition-all duration-300`}
          placeholder="Förnamn..."
        /> 
        {errors.firstname && <p className="text-red-500 text-sm">{errors.firstname}</p>}
      </div>
      <div>
        <label className="font-semibold text-gray-500">Efternamn</label>
        <input
          type="text"
          onChange={(e) => setLastName(e.target.value)}
          className={`mt-1 w-full text-gray-600 font-semibold border-b-2 ${errors.lastname? 'border-red-500' : 'border-gray-300'} bg-gray-100 outline-none focus:border-blue-500 p-3 transition-all duration-300`}
          placeholder="Efternamn..."
        /> 
        {errors.lastname && <p className="text-red-500 text-sm">{errors.lastname}</p>}
      </div>
      <div>
        <label className="font-semibold text-gray-500">Företag</label>
        <input
          type="text"
          onChange={(e) => setCompanyName(e.target.value)}
          className={`mt-1 w-full text-gray-600 font-semibold border-b-2 ${errors.company ? 'border-red-500' : 'border-gray-300'} bg-gray-100 outline-none focus:border-blue-500 p-3 transition-all duration-300`}
          placeholder="Företag..."
        /> 
        {errors.company && <p className="text-red-500 text-sm">{errors.company}</p>}
      </div>
      <div>
        <label className="font-semibold text-gray-500">Org. Nr</label>
        <input
          type="text"
          onChange={(e) => setOrgNr(e.target.value)}
          className={`mt-1 w-full text-gray-600 font-semibold border-b-2 ${errors.orgnr? 'border-red-500' : 'border-gray-300'} bg-gray-100 outline-none focus:border-blue-500 p-3 transition-all duration-300`}
          placeholder="Org. Nr..."
        /> 
        {errors.orgnr && <p className="text-red-500 text-sm">{errors.orgnr}</p>}
      </div>
      <div>
        <label className="font-semibold text-gray-500">Faktureringsadress</label>
        <input
          type="text"
          onChange={(e) => setInvoiceAddress(e.target.value)}
          className={`mt-1 w-full text-gray-600 font-semibold border-b-2 ${errors.invoice ? 'border-red-500' : 'border-gray-300'} bg-gray-100 outline-none focus:border-blue-500 p-3 transition-all duration-300`}
          placeholder="Faktureringsadress..."
        /> 
        {errors.invoice && <p className="text-red-500 text-sm">{errors.invoice}</p>}
      </div>
    </>
  )
}

export default SecondRegisterStage;