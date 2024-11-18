import MapSection from "./mapSection";

export default function TextSection() {
    return (
        <div className="bg-slate-600 text-white py-20">
          <div className="container mx-auto flex flex-col lg:flex-row items-center gap-12 p-8">
            {/* Text Section */}
            <div className="lg:w-1/2 flex flex-col items-start">
              <h1 className="text-3xl font-bold text-white">
                Hitta och Lista Kontorsutrymmen Lokalt i Halmstad
              </h1>
              <p className="mt-6 text-slate-200 text-lg leading-relaxed">
                Halmstad Lokaler är den lokala plattformen för att hitta och hyra kontorsutrymmen i hjärtat av Halmstad. 
                Med ett starkt fokus på Halmstad och omgivande områden, är Halmstad Lokaler utformad för att möta de specifika 
                behoven hos företag och fastighetsägare i regionen. Här kan både små och stora företag upptäcka ett brett 
                utbud av kontorslösningar, från moderna coworking-miljöer till privata kontor och fullt utrustade företagslokaler 
                – allt i närheten av stadens pulserande centrum, kustnära områden och bekväma transportmöjligheter.
              </p>
            </div>

            {/* Map Section */}
            <div className="lg:w-1/2 flex justify-center items-center">
              <div className="w-full h-80 sm:h-96 lg:h-[400px] lg:w-[400px] rounded-lg overflow-hidden shadow-md">
                <MapSection width={400} height={400} />
              </div>
            </div>
          </div>
        </div>



    )
}