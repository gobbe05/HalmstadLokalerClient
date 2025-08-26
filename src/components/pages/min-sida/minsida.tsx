import { useAuth } from "../../../context/Auth/AuthContext";
import Listings from "./listings";
import MyProfile from "./profile";
import Statistics from "./statistics";
import { useTranslation } from "react-i18next";

export default function MinSida() {
    const { t } = useTranslation();
    const {authId} = useAuth()
    if(!authId) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-neutral mb-2">{t('minsida.denied')}</h2>
                    <p className="text-neutral/80">{t('minsida.loginRequired')}</p>
                </div>
            </div>
        )
    }
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-primary to-primary-dark text-white">
                <div className="max-w-7xl mx-auto px-4 py-16 md:py-20">
                    <div className="max-w-3xl">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                            {t('minsida.title')}
                        </h1>
                        <p className="text-lg md:text-xl text-white/90">
                            {t('minsida.subtitle')}
                        </p>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-4 -mt-8 pb-16 relative z-10">
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                            <Listings />
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                            <MyProfile id={authId} />
                        </div>
                        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                            <Statistics />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}