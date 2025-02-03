// src/components/home.tsx
import React, { FormEvent, useState } from "react";
import BoxesSection from "./boxessection";
import TextSection from "./textsection";
import ListToday from "./listtoday";
import PreviousLookedAt from "./previouslookedat";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate()

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    navigate(`/lediga-lokaler?search=${search}`)
  }

  return (
    <div 
      className="flex justify-center items-center gap-16 bg-gray-400 bg-blend-multiply bg-cover bg-center py-48 rounded"
      style={{
        backgroundImage: "url('https://www.halmstad.se/images/18.11d2c7de185c4e35fb5f995/1715169490732/Stadsvy-med-biblioteket-dronarvy.webp')",
      }}
    >
      <div className="flex flex-col items-start bg-white bg-opacity-90 p-16 rounded shadow-lg">
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
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 outline-none" 
              placeholder="Sök efter arbetsplatser..." 
              required 
            />
            <button 
              type="submit" 
              className="absolute right-2.5 bottom-2.5 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg text-sm px-4 py-2 focus:ring-4 focus:outline-none focus:ring-blue-300"
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
