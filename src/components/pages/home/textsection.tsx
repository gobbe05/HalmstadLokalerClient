import MapSection from "./mapSection";

export default function TextSection() {
    return (
        <div className="bg-gradient-to-b from-white to-gray-50 py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
              {/* Text Section */}
              <div className="flex flex-col items-start lg:w-1/2">
                <h2 className="text-3xl md:text-4xl font-bold text-neutral mb-6">
                  Hitta och lista kontorsutrymmen lokalt i Halmstad
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  Halmstad Lokaler är plattformen för att hitta och hyra kontorsutrymmen i Halmstad med omnejd. Här finns allt från coworking-miljöer till privata kontor och fullt utrustade lokaler – nära centrum, kusten och goda transportförbindelser.
                </p>
                
                {/* Feature List */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    </div>
                    <div>
                      <h3 className="font-medium text-neutral">Centralt läge</h3>
                      <p className="text-sm text-gray-600">Nära allt du behöver</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    </div>
                    <div>
                      <h3 className="font-medium text-neutral">Flexibla avtal</h3>
                      <p className="text-sm text-gray-600">Anpassat efter dina behov</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    </div>
                    <div>
                      <h3 className="font-medium text-neutral">Bra kommunikationer</h3>
                      <p className="text-sm text-gray-600">Enkelt att ta sig hit</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    </div>
                    <div>
                      <h3 className="font-medium text-neutral">Moderna lokaler</h3>
                      <p className="text-sm text-gray-600">Fullt utrustade</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Section */}
              <div className="lg:w-1/2">
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