// src/components/home.tsx
import React, { FormEvent, useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import BoxesSection from "./boxessection";
import TextSection from "./textsection";
import ListToday from "./listtoday";
import PreviousLookedAt from "./previouslookedat";
import { useNavigate } from "react-router-dom";
import Multiselect from "multiselect-react-dropdown";
import officetypes from "../../../utils/officeTypes";
import { HiOutlineSearch } from "react-icons/hi";

const Home: React.FC = () => {
  const { t } = useTranslation();
  return (
  <div className="w-full min-h-screen bg-gray-50">
      {/* Hero Section */}
      <HomeHero />

      {/* About Section */}
      <TextSection />
      
      {/* Features Section */}
      <div className="bg-gradient-to-br from-primary to-primary-dark text-white">
        <BoxesSection />
      </div>

      {/* Recent Views */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <PreviousLookedAt />
        </div>
      </div>

      {/* Latest Listings */}
      <div className="bg-gray-50">
        <div>
          <ListToday />
        </div>
      </div>
    </div>
  );
};

const HomeHero = () => {
  const { t } = useTranslation();
  const [search, setSearch] = useState<string>("")
  const [types, setTypes] = useState<{name: string, id: number}[]>([])
  const [placeholder, setPlaceholder] = useState<string>(t('home.selectType', 'Välj kontorstyp'))
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
      setPlaceholder(t('home.oneSelected', '1 vald'))
    else if (types.length > 1)
      setPlaceholder(t('home.manySelected', { count: types.length, defaultValue: '{{count}} valda' }))
    else
      setPlaceholder(t('home.selectType', 'Välj kontorstyp'))
  }, [types, t])

  return (
    <div 
      className="relative flex items-center min-h-[300px] sm:min-h-[500px] overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: "linear-gradient(to bottom right, rgba(14, 116, 144, 0.90), rgba(14, 116, 144, 0.80)), url('https://www.halmstad.se/images/18.11d2c7de185c4e35fb5f995/1715169490732/Stadsvy-med-biblioteket-dronarvy.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      {/* Content */}
      <div className="relative w-full max-w-7xl mx-auto px-2 py-8 md:py-16">
        <div className="w-full max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
            {t('home.heroTitle', 'Hitta din perfekta')} <br />{t('home.heroSubtitle', 'arbetsplats i Halmstad')}
          </h1>
          <p className="text-lg md:text-xl text-white mb-12">
            {t('home.heroText', 'Vi hjälper dig att hitta det perfekta kontoret, från enskilda arbetsplatser till hela lokaler')}
          </p>

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
            <div className="space-y-4">
              {/* Search Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <HiOutlineSearch className="w-5 h-5 text-gray-400" />
                </div>
                <input 
                  type="search" 
                  onChange={(event) => {setSearch(event.target.value)}}
                  className="w-full pl-12 pr-4 py-4 text-base text-gray-900 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none" 
                  placeholder={t('home.searchPlaceholder', 'Sök efter kontor, område eller typ...')} 
                />
              </div>

              {/* Filters Row */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Multiselect 
                    className="bg-gray-50 border-gray-200 text-gray-900 text-base rounded-xl search-multiselect" 
                    options={officetypes}
                    selectedValues={types}
                    placeholder={placeholder}
                    onSelect={(_, type) => setTypes(prev => [...prev, type])} 
                    onRemove={(_, type) => setTypes(prev => prev.filter(x => x.id != type.id))} 
                    displayValue="name"
                    showCheckbox={true}
                    style={{
                      chips: {
                        backgroundColor: '#f3f4f6',
                        color: '#111827',
                      },
                      inputField: {
                        padding: '1rem',
                        color: '#111827',
                      },
                      searchBox: {
                        padding: '0 0.5rem',
                        border: 'none',
                        minHeight: '3.5rem',
                        background: '#f9fafb',
                      },
                      optionContainer: {
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        zIndex: 50,
                      },
                      option: {
                        backgroundColor: 'white',
                        color: '#111827',
                      },
                      groupHeading: {
                        color: '#111827',
                      },
                      notFound: {
                        color: '#111827',
                      },
                      placeholder: {
                        color: '#6b7280',
                      },
                    }}
                  />
                </div>
                <button 
                  type="submit" 
                  className="flex items-center justify-center bg-primary hover:bg-primary-dark text-white font-medium rounded-xl px-8 py-4 transition-all"
                >
                  <span className="text-lg">{t('home.searchButton', 'Sök')}</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Home;
