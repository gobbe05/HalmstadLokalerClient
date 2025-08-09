import NewOfficeButton from "../../buttons/newofficebutton";

export default function ListToday() {
    return (
      <div className="bg-white py-64">
        <div className="w-full max-w-5xl mx-auto">
          {/* Section Title */}
          <h1 className="text-4xl font-bold text-primary text-start">
            Annonsera din lokal idag
          </h1>
          
          {/* Description */}
          <p className="mt-2 text-lg text-neutral">
            Kom igång direkt och nå potentiella hyresgäster på bara några minuter. 
            Skapa ett konto idag för att enkelt lägga upp din lokal och göra den synlig för företag som söker kontorsutrymme i Halmstad. 
            Det tar bara ett par steg att bli en del av Halmstad Lokaler!
          </p>
          
          {/* Button Section */}
          <div className="flex mt-8">
            <NewOfficeButton link="/hyr-ut-lokal" />
          </div>
        </div>
      </div>
    )
}