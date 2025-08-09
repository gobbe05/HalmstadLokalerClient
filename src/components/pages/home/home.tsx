// src/components/home.tsx
import React, { FormEvent, useEffect, useState } from "react";
import BoxesSection from "./boxessection";
import TextSection from "./textsection";
import ListToday from "./listtoday";
import PreviousLookedAt from "./previouslookedat";
import { useNavigate } from "react-router-dom";
import Multiselect from "multiselect-react-dropdown";
import officetypes from "../../../utils/officeTypes";
import { HiOutlineSearch } from "react-icons/hi";

const Home: React.FC = () => {
  return (
    <>
      <div className="w-full flex flex-col">
        <HomeHero />
       <div>
          <TextSection />
        </div>
        <div className="w-full bg-white">
          <PreviousLookedAt />
        </div> 
        <div className="bg-primary text-white py-32">
          <BoxesSection />   
        </div>
        <ListToday />
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
      className="flex justify-center items-center gap-16 bg-gray-400 bg-blend-multiply bg-cover bg-center py-32 rounded"
      style={{
        backgroundImage: "url('https://www.halmstad.se/images/18.11d2c7de185c4e35fb5f995/1715169490732/Stadsvy-med-biblioteket-dronarvy.webp')",
      }}
    >
      <div className="flex flex-col items-start bg-primary bg-opacity-90 md:p-16 p-8 rounded shadow-lg max-w-5xl w-full md:m-0 m-4">
        <h1 className="text-4xl font-bold text-white">
          Hitta en lokal i Halmstad som passar dig
        </h1>
        <p className="mt-1 text-white">
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
              className="w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-secondary focus:border-secondary outline-none" 
              placeholder="Sök efter arbetsplatser..." 
              required 
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
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
              className="flex items-center justify-center bg-accent hover:text-accent-dark text-white font-medium rounded-full text-sm px-4 py-2 focus:ring-4 focus:outline-none focus:ring-blue-300 transition-all"
            >
              <HiOutlineSearch className="inline mr-2" size={18}/>
              <span className="text-lg">Sök</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Home;
