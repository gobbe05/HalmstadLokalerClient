
import MapSection from "./mapSection";
import { useTranslation } from "react-i18next";

export default function TextSection() {
    const { t } = useTranslation();
    return (
        <div className="bg-gradient-to-b from-white to-gray-50 py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
              {/* Text Section */}
              <div className="flex flex-col items-center md:items-start lg:w-1/2 text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-neutral mb-6">
                  {t('textsection.title')}
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  {t('textsection.description')}
                </p>
                {/* Feature List */}
                {/*
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    </div>
                    <div>
                      <h3 className="font-medium text-neutral">{t('textsection.feature1Title')}</h3>
                      <p className="text-sm text-gray-600">{t('textsection.feature1Desc')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    </div>
                    <div>
                      <h3 className="font-medium text-neutral">{t('textsection.feature2Title')}</h3>
                      <p className="text-sm text-gray-600">{t('textsection.feature2Desc')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    </div>
                    <div>
                      <h3 className="font-medium text-neutral">{t('textsection.feature3Title')}</h3>
                      <p className="text-sm text-gray-600">{t('textsection.feature3Desc')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    </div>
                    <div>
                      <h3 className="font-medium text-neutral">{t('textsection.feature4Title')}</h3>
                      <p className="text-sm text-gray-600">{t('textsection.feature4Desc')}</p>
                    </div>
                  </div>
                </div> */}
              </div>

              {/* Map Section */}
              <div className="hidden md:block max-w-[100dvw] p-4 lg:w-1/2">
                <div className="rounded-2xl shadow-lg overflow-hidden">
                  <div>
                    <MapSection width={600} height={500} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}