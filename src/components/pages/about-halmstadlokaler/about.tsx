import { useTranslation } from 'react-i18next';
import { FaBuilding, FaHandshake, FaLaptop } from 'react-icons/fa';

export default function AboutHalmstadLokaler() {
	const { t } = useTranslation();
	return (
		<div className="min-h-screen bg-gray-50">
			<div className="max-w-4xl mx-auto px-4 py-16">
				<h1 className="text-4xl font-bold text-primary text-center mb-6">
					{t('about.title', 'Om HalmstadLokaler')}
				</h1>
				<p className="text-lg text-gray-700 text-center mb-12">
					{t('about.intro', 'Vi är en digital mötesplats för företag, fastighetsägare och entreprenörer i Halmstad. Vår vision är att göra det enkelt och tryggt att hitta, hyra och hyra ut lokaler i hela kommunen.')}
				</p>

				<div className="grid md:grid-cols-3 gap-8 mb-16">
					<div className="flex flex-col items-center text-center bg-white rounded-xl shadow p-6">
						<FaBuilding className="text-primary text-3xl mb-4" />
						<h2 className="text-xl font-semibold mb-2">{t('about.missionTitle', 'Vår Mission')}</h2>
						<p className="text-gray-600">{t('about.mission', 'Vi förenklar lokalmarknaden och skapar möjligheter för företag.')}</p>
					</div>
					<div className="flex flex-col items-center text-center bg-white rounded-xl shadow p-6">
						<FaHandshake className="text-primary text-3xl mb-4" />
						<h2 className="text-xl font-semibold mb-2">{t('about.valuesTitle', 'Våra Värderingar')}</h2>
						<p className="text-gray-600">{t('about.values', 'Transparens, trygghet och enkelhet i allt vi gör.')}</p>
					</div>
								<div className="flex flex-col items-center text-center bg-white rounded-xl shadow p-6">
									<FaLaptop className="text-primary text-3xl mb-4" />
									<h2 className="text-xl font-semibold mb-2">{t('about.platformTitle', 'Vår Plattform')}</h2>
									<p className="text-gray-600">{t('about.platform', 'En modern plattform som gör det enkelt att hitta och hyra lokaler i Halmstad.')}</p>
								</div>
				</div>

				<div className="bg-white rounded-xl shadow p-8 text-center">
					<h2 className="text-2xl font-bold text-primary mb-4">{t('about.contactTitle', 'Vill du veta mer?')}</h2>
					<p className="text-gray-700 mb-6">{t('about.contactText', 'Tveka inte att kontakta oss om du har frågor, vill samarbeta eller bara är nyfiken på vad vi gör!')}</p>
					<a href="mailto:info@halmstadlokaler.se" className="inline-block bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg px-8 py-4 transition-all">
						{t('about.contactButton', 'Kontakta oss')}
					</a>
				</div>
			</div>
		</div>
	);
}
