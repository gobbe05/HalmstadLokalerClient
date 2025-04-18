// src/components/home.tsx
import React, { FormEvent, useEffect, useState } from "react";
import BoxesSection from "./boxessection";
import TextSection from "./textsection";
import ListToday from "./listtoday";
import PreviousLookedAt from "./previouslookedat";
import { useNavigate } from "react-router-dom";
import Multiselect from "multiselect-react-dropdown";
import officetypes from "../../../utils/officeTypes";

const Home: React.FC = () => {
  return (
    <>
      <div className="w-full flex flex-col text-gray-700">
        <HomeHero />
        <div className="w-full bg-white">
          <PreviousLookedAt />
        </div>
        <div className="bg-slate-600 text-white">
          <TextSection />
        </div>
        <ListToday />
        <div className="bg-slate-600 text-white py-32 px-4 sm:px-8 lg:px-16">
          <BoxesSection />   
        </div>
      </div>
    </>
  )
};

const HomeHero = () => {
  const [search, setSearch] = useState<string>("")
  const [types, setTypes] = useState<{name: string, id: number}[]>([])
  const [placeholder, setPlaceholder] = useState<string>("Välj kontorstyp")
  const navigate = useNavigate()

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    navigate(`/lediga-lokaler`, {
      state: {
        search: search,
        types: types.map(x => x.name)
      }
    })
  }

  useEffect(() => {
    if (types.length == 1)
      setPlaceholder("1 vald")
    else if (types.length > 1)
      setPlaceholder(`${types.length} valda`)
    else
      setPlaceholder("Välj kontorstyp")
  }, [types])

  return (
    <div 
      className="flex justify-center items-center gap-16 bg-gray-400 bg-blend-multiply bg-cover bg-center py-48 rounded"
      style={{
        backgroundImage: "url('https://www.halmstad.se/images/18.11d2c7de185c4e35fb5f995/1715169490732/Stadsvy-med-biblioteket-dronarvy.webp')",
      }}
    >
      <div className="flex flex-col items-start bg-white bg-opacity-90 md:p-16 p-8 rounded shadow-lg max-w-[720px] md:m-0 m-4">
        <h1 className="text-3xl font-semibold text-gray-800">
          Hitta en lokal i Halmstad som passar dig
        </h1>
        <p className="mt-2 text-gray-700">
          Vi hjälper dig på vägen
        </p>

        <form className="w-full mt-8" onSubmit={handleSubmit}>
          <label htmlFor="default-search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg 
                className="w-5 h-5 text-gray-500" 
                aria-hidden="true" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 20 20"
              >
                <path 
                  stroke="currentColor" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input 
              type="search" 
              id="default-search"
              onChange={(event) => {setSearch(event.target.value)}}
              className="w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 outline-none" 
              placeholder="Sök efter arbetsplatser..." 
              required 
            />
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
              <Multiselect className="bg-gray-50 border-gray-300 text-gray-500 text-sm rounded-lg startpage-multiselect" 
                options={officetypes}
                selectedValues={types}
                placeholder={placeholder}
                onSelect={(_, type) => setTypes(prev => [...prev, type])} 
                onRemove={(_, type) => setTypes(prev => prev.filter(x => x.id != type.id))} 
                displayValue={"name"}
                showCheckbox={true}
                

                style={
                  {inputField: {
                    padding: "1rem",
                    marginTop: "0",
                  },
                  searchBox: {
                    padding: "0rem 0.5rem",
                  }}}
              />
              <button 
              type="submit" 
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg text-sm px-4 py-2 focus:ring-4 focus:outline-none focus:ring-blue-300 transition-all"
            >
              Sök
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Home;
