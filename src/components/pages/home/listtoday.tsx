
import NewOfficeButton from "../../buttons/newofficebutton";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { BsArrowRight } from "react-icons/bs";
import { useTranslation } from "react-i18next";

export default function ListToday() {
  const { t } = useTranslation();
  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="relative py-32 overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-blue-100/20 blur-2xl" />
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content Section */}
            <div className="max-w-xl">
              {/* Icon and Title */}
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-primary/10">
                  <HiOutlineBuildingOffice2 className="w-6 h-6 text-primary" />
                </div>
                <p className="text-sm font-medium text-primary tracking-wide uppercase">
                  {t('listtoday.owner')}
                </p>
              </div>

              {/* Main Title */}
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
                {t('listtoday.title')} <span className="text-primary">{t('listtoday.today')}</span>
              </h1>
              {/* Description */}
              <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                {t('listtoday.description1')}<br />
                {t('listtoday.description2')}
              </p>
              {/* Stats HIDDEN */}
              <div className="hidden grid-cols-2 gap-8 mt-12 p-6 rounded-2xl bg-white/80 backdrop-blur shadow-sm border border-gray-100">
                <div>
                  <p className="text-3xl font-bold text-primary">100+</p>
                  <p className="text-sm text-gray-600 mt-1">{t('listtoday.activeSeekers')}</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">24h</p>
                  <p className="text-sm text-gray-600 mt-1">{t('listtoday.avgResponse')}</p>
                </div>
              </div>
              {/* CTA Button */}
              <div className="mt-8 flex items-center gap-4">
                <NewOfficeButton link="/hyr-ut-lokal" />
                {/* Hidden */}
                <a href="/hur-funkar-det" className="hidden items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors">
                  {t('listtoday.readMore')}
                  <BsArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Image Section */}
            <div className="relative lg:block">
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="/office-preview.jpg" 
                  alt={t('listtoday.imageAlt')} 
                  className="w-full aspect-[4/3] object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}