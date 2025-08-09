import MapSection from "./mapSection";

export default function TextSection() {
    return (
        <div className="bg-white text-neutral py-32">
          <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16">
            {/* Text Section */}
            <div className="flex flex-col items-start">
              <h1 className="text-4xl font-bold text-primary">
                Hitta och lista kontorsutrymmen lokalt i Halmstad
              </h1>
              <p className="mt-4 text-lg leading-relaxed">
                Halmstad Lokaler är plattformen för att hitta och hyra kontorsutrymmen i Halmstad med omnejd. Här finns allt från coworking-miljöer till privata kontor och fullt utrustade lokaler – nära centrum, kusten och goda transportförbindelser.
              </p>
            </div>

            {/* Map Section */}
            <div className="flex justify-center items-center">
              <div className="w-full overflow-hidden">
                <MapSection width={400} height={400} />
              </div>
            </div>
          </div>
        </div>



    )
}