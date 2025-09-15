// BoxesSection Component
import { HiOutlineBuildingOffice2, HiOutlineClock, HiOutlineSparkles } from "react-icons/hi2";
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";

export default function BoxesSection() {
    const { t } = useTranslation();
    return (
        <div className="w-full py-24 md:py-32">
            <div className="max-w-7xl mx-auto px-4">
                {/*
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('boxes.title', 'Din plats i Halmstads arbetsliv')}</h2>
                    <p className="text-lg md:text-xl text-white/80">
                        {t('boxes.subtitle', 'Upptäck, hyr eller hyr ut kontorsutrymmen – enkelt, lokalt och flexibelt.')}
                    </p>
                </div>
                */}
                <div className="grid md:grid-cols-3 gap-8 md:gap-12">
                    <Item 
                        icon={<HiOutlineBuildingOffice2 size={32} />}
                        cta={t('boxes.cta1', 'Lägg upp din annons idag!')}
                        header={t('boxes.header1', 'Annonsera din lokal')}
                        text={t('boxes.text1', 'Har du en ledig yta? Anslut dig till företag och yrkesverksamma i Halmstad som letar efter sin nästa arbetsplats. Det är enkelt, snabbt och når rätt målgrupp.')}
                        link={"/hyr-ut-lokal"}
                    />
                    <Item 
                        icon={<HiOutlineClock size={32} />}
                        cta={t('boxes.cta2', 'Utforska flexibla alternativ!')}
                        header={t('boxes.header2', 'Flexibla alternativ för alla')}
                        text={t('boxes.text2', 'Hitta kontor som passar dina behov. Behöver du en plats för en dag, en månad eller långsiktigt? Vår marknadsplats erbjuder flexibla lösningar som passar din verksamhet.')}
                        link={"/lediga-lokaler"}
                    />
                    <Item 
                        icon={<HiOutlineSparkles size={32} />}
                        cta={t('boxes.cta3', 'Läs mer om oss!')}
                        header={t('boxes.header3', 'Varför välja oss?')}
                        text={t('boxes.text3', 'Vi är Halmstads dedikerade plattform för uthyrning av kontorsutrymmen. Njut av transparent prissättning, lokala annonser och en gemenskapsdriven metod för att hitta och dela arbetsplatser.')}
                        link={"/om-oss"}
                    />
                </div>                
            </div>
        </div>
    )
}

// Item Component
type ItemProps = {
    icon: React.ReactNode;
    header: string;
    text: string;
    cta: string;
    link: string;
}

const Item = ({icon, header, text, cta, link}: ItemProps) => {
    return (
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 hover:bg-white/10 transition-all group">
            <div className="text-accent mb-6">{icon}</div>
            <h3 className="text-xl md:text-2xl font-semibold text-white mb-4">{header}</h3>
            <p className="text-white/80 mb-8 leading-relaxed">{text}</p>
            <Link to={link} className="inline-flex items-center gap-2 text-white bg-white/10 hover:bg-white/20 rounded-xl px-6 py-3 transition-all">
                <span>{cta}</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
        </div>
    )
}