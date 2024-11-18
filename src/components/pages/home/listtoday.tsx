import NewOfficeButton from "../../buttons/newofficebutton";

export default function ListToday() {
    return (
        <div className="bg-white py-16 lg:py-32">
  <div className="w-full max-w-3xl mx-auto px-6 lg:px-16">
    {/* Section Title */}
    <h1 className="text-3xl font-semibold text-gray-800 text-center">
      Annonsera din lokal idag
    </h1>
    
    {/* Description */}
    <p className="mt-4 text-lg text-gray-600 text-center">
      Kom igång direkt och nå potentiella hyresgäster på bara några minuter. 
      Skapa ett konto idag för att enkelt lägga upp din lokal och göra den synlig för företag som söker kontorsutrymme i Halmstad. 
      Det tar bara ett par steg att bli en del av Halmstad Lokaler!
    </p>
    
    {/* Button Section */}
    <div className="flex justify-center mt-8">
      <NewOfficeButton link="/hyr-ut-lokal" />
    </div>
  </div>
</div>

    )
}