import { useQuery } from "@tanstack/react-query"
import { Helmet } from "react-helmet-async"
import { useAuth } from "../../../../context/Auth/AuthContext"
import Loading from "../../../layout/loading"
import FiveHundred from "../../../layout/FiveHundred"
import IOffice from "../../../../interfaces/IOffice"
import { useEffect } from "react"
import { useTranslation } from "react-i18next";
import BackButton from "../../../buttons/backbutton"
import MyPageOfficeCard from "../../../cards/mypageofficecard"

export default function AllaKontor() {
    const { t } = useTranslation();
    const pageTitle = t('allakontor.title') + " | HalmstadLokaler";
    const pageDescription = t('allakontor.subtitle');
    const {authId} = useAuth()
    const {isPending, error, data} = useQuery({
        queryKey: ["all-my-offices"],
        queryFn: () => {
            return fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/api/office/self`, {
                credentials: "include"
            })
            .then(response => response.json())
        } 
    })

    useEffect(() => {console.log(data)}, [])

    if(isPending) return <Loading />
    if(error) return <FiveHundred />
    return (
        <>
            <Helmet>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://halmstadlokaler.se/min-sida/alla-kontor" />
            </Helmet>
            <div className="w-full mx-auto p-16 rounded bg-white">
                <div className="max-w-6xl mx-auto">
                    <BackButton link="/min-sida" />
                    <h1 className="text-4xl font-semibold text-primary mt-2">{t('allakontor.title')}</h1>
                    <p className="text-neutral text-lg">{t('allakontor.subtitle')}</p>
                    <div className="flex flex-col gap-4 mt-8">
                        {data.offices.map((office: IOffice) => <MyPageOfficeCard office={office} />)}
                    </div>
                </div>
            </div>
        </>
    )
}