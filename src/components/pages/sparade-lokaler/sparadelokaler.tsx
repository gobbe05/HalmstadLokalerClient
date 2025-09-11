import { useQuery } from "@tanstack/react-query"
import { Helmet } from "react-helmet-async"
import { useTranslation } from 'react-i18next';
import Loading from "../../layout/loading"
import OfficeCardLong from "../../cards/officecardlong"
import ISavedOffice from "../../../interfaces/ISavedOffice"
import { FaBookmark, FaExclamationTriangle } from "react-icons/fa"

const SparadeLokaler = () => {
    const { t } = useTranslation();
    const pageTitle = t('saved.header', 'Sparade lokaler') + " | HalmstadLokaler";
    const pageDescription = t('saved.headerText', 'Här hittar du alla kontorslokaler som du har sparat för att titta på senare.');
    const {error, isPending, data} = useQuery({
        queryKey: ["saved-offices"],
        queryFn: async () => {
            const response = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/api/saved`, {
                credentials: "include"
            })
            if (!response.ok) {
                throw new Error('Failed to fetch saved offices')
            }
            const data = await response.json()
            return data
        }
    })

    const renderContent = () => {
        if (error) {
            return (
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <div className="p-12 text-center">
                        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center">
                            <FaExclamationTriangle size={28} />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('saved.errorTitle', 'Något gick fel')}</h3>
                        <p className="text-gray-600 max-w-md mx-auto">
                            {t('saved.errorText', 'Det gick inte att hämta dina sparade lokaler. Försök igen senare eller kontakta support om problemet kvarstår.')}
                        </p>
                    </div>
                </div>
            )
        }

        if (isPending) {
            return (
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <div className="p-12 text-center">
                        <Loading />
                    </div>
                </div>
            )
        }

        if (!data.offices.length) {
            return (
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <div className="p-12 text-center">
                        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/5 text-primary flex items-center justify-center">
                            <FaBookmark size={28} />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">{t('saved.noneTitle', 'Inga sparade lokaler än')}</h3>
                        <p className="text-gray-600 max-w-md mx-auto mb-6">
                            {t('saved.noneText', 'När du hittar en lokal du gillar kan du spara den här för att enkelt hitta tillbaka senare.')}
                        </p>
                        <a href="/lediga-lokaler" className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-xl transition-colors">
                            {t('saved.findOffices', 'Hitta lokaler')}
                        </a>
                    </div>
                </div>
            )
        }

        return (
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">{t('saved.title', 'Dina sparade lokaler')}</h2>
                            <p className="text-sm text-gray-500 mt-1">
                                {data.offices.length} {data.offices.length === 1 ? t('saved.office', 'lokal') : t('saved.offices', 'lokaler')} {t('saved.saved', 'sparade')}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="divide-y divide-gray-100">
                    {data.offices.map((savedOffice: ISavedOffice) => (
                        <div key={savedOffice._id} className="p-6">
                            <OfficeCardLong office={savedOffice.office}/>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <>
            <Helmet>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://halmstadlokaler.se/sparade-lokaler" />
            </Helmet>
            <div className="min-h-screen bg-gray-50">
                <div className="w-full bg-gradient-to-br from-primary to-primary-dark text-white">
                    <div className="max-w-7xl mx-auto px-4 py-16 md:py-20">
                        <div className="max-w-3xl">
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                                {t('saved.header', 'Sparade lokaler')}
                            </h1>
                            <p className="text-lg md:text-xl text-white/90">
                                {t('saved.headerText', 'Här hittar du alla kontorslokaler som du har sparat för att titta på senare.')}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-4 -mt-8 pb-16 relative z-10">
                    {renderContent()}
                </div>
            </div>
        </>
    )
}

export default SparadeLokaler