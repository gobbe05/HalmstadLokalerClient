// src/components/home.tsx
import React, { useEffect, useState } from "react";
import OfficeCard from "../../cards/officecard";
import IOffice from "../../../interfaces/IOffice";
import getOfficesLimit from "../../../utils/getOfficesLimit";
import { Link } from "react-router-dom";
import MapSection from "./mapSection";
import { HiOutlinePlusCircle, HiOutlineSearchCircle } from "react-icons/hi";
import NewOfficeButton from "../../buttons/newofficebutton";

const Home: React.FC = () => {
  const [offices, setOffices] = useState<Array<IOffice>>([])

  const loadOffices = async () => {
    setOffices(await getOfficesLimit(6))
  }
  useEffect(() => {
    loadOffices()
  }, [])
  return (
    <>
      <div className="w-full flex flex-col gap-32 text-gray-700">
        <div className="flex justify-center items-center gap-16 bg-cover bg-center bg-[url('https://www.halmstad.se/images/18.11d2c7de185c4e35fb5f995/1715169490732/Stadsvy-med-biblioteket-dronarvy.webp')] py-32 rounded"> 
          <div className="flex flex-col items-center bg-[rgb(255,255,255,0.9)] p-16 rounded">
            <h1 className="text-3xl text-center font-semibold">Hitta en lokal i Halmstad som passar dig</h1>
            <p className="mt-2">Lorem ipsum dolor kajdljasjdl</p>
             <form className="w-full mx-auto mt-8">   
                <label className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm outline-none text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 " placeholder="Search Mockups, Logos..." required />
                    <button onClick={(e) => {}} type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-500 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">Search</button>
                </div>
            </form>
          </div>
        </div>

        <div className="w-2/3 mx-auto bg-white p-16"> 
          <div className="flex flex-col items-center">
            <h1 className="text-2xl mb-16 font-semibold">Populära lokaler i Halmstad</h1>
            <div className="grid gap-8  grid-cols-4 w-full">
              {offices.map((office: IOffice) => <OfficeCard location={office.location} price={office.price} size={office.size} image={office.image}/>)}
            </div>
            <Link to="/lediga-lokaler" className="mt-16 px-4 py-2 rounded-full border border-gray-700 hover:bg-gray-700 hover:text-white transition-all">Visa alla lediga lokaler</Link>
          </div> 
        </div>

        <div className="bg-white p-16">
          <div className="w-[600px] mx-auto text-center">
            <h1 className="text-2xl font-semibold">Annonsera din lokal idag</h1>
            <p className="mt-1">Kom igång direkt och nå potentiella hyresgäster på bara några minuter. Skapa ett konto idag för att enkelt lägga upp din lokal och göra den synlig för företag som söker kontorsutrymme i Halmstad. Det tar bara ett par steg att bli en del av Halmstad Lokaler!</p>
            <div className="flex justify-center mt-4">
            <NewOfficeButton link="/hyr-ut-lokal" />
            </div>
          </div>
          <div className="w-full flex flex-col items-start mt-16">
            <div className="w-2/3">
              <h1 className="text-2xl font-semibold">Halmstad Lokaler – Hitta och Lista Kontorsutrymmen Lokalt i Halmstad</h1>
              <p className="mt-4">Halmstad Lokaler är den lokala plattformen för att hitta och hyra kontorsutrymmen i hjärtat av Halmstad. Med ett starkt fokus på Halmstad och omgivande områden, är Halmstad Lokaler utformad för att möta de specifika behoven hos företag och fastighetsägare i regionen. Här kan både små och stora företag upptäcka ett brett utbud av kontorslösningar, från moderna coworking-miljöer till privata kontor och fullt utrustade företagslokaler – allt i närheten av stadens pulserande centrum, kustnära områden och bekväma transportmöjligheter.</p>
            </div>
          </div> 
        </div>
      </div>
    </>
  )
};

export default Home;
