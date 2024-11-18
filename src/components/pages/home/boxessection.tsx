// BoxesSection Component
export default function BoxesSection() {
    return (
        <div className="flex justify-center items-center w-full">
            <div className="w-full sm:w-2/3 lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-16">
                <Item cta={"Börja söka nu!"} header={"Hitta din perfekta arbetsplats"} text={"Letar du efter kontorsutrymme i Halmstad? Utforska ett brett utbud av annonser – från coworking-platser till privata kontor. Oavsett om du är frilansare, startup eller etablerat företag, har vi något för dig."}/>
                <Item cta={"Lägg upp din annons idag!"} header={"Lägg upp ditt kontorsutrymme"} text={"Har du en ledig yta? Anslut dig till företag och yrkesverksamma i Halmstad som letar efter sin nästa arbetsplats. Det är enkelt, snabbt och når rätt målgrupp."}/>
                <Item cta={"Utforska flexibla alternativ!"} header={"Flexibla alternativ för alla"} text={"Hitta kontor som passar dina behov. Behöver du en plats för en dag, en månad eller långsiktigt? Vår marknadsplats erbjuder flexibla lösningar som passar din verksamhet."}/>
                <Item cta={"Läs mer om oss!"} header={"Varför välja oss?"} text={"Vi är Halmstads dedikerade plattform för uthyrning av kontorsutrymmen. Njut av transparent prissättning, lokala annonser och en gemenskapsdriven metod för att hitta och dela arbetsplatser."}/>
            </div>
        </div>
    )
}

// Item Component
type ItemProps = {
    header: string;
    text: string;
    cta: string;
}

const Item = ({header, text, cta}: ItemProps) => {
    return (
        <div className="bg-white text-gray-800 p-8 rounded-lg shadow-lg">
            <h1 className="font-semibold text-2xl mb-4 text-gray-800">{header}</h1>
            <p className="text-sm mb-4 text-gray-600">{text}</p>
            <button className="text-blue-500 font-medium border-b-2 border-transparent hover:border-blue-500 transition-all">
                {cta}
            </button>
        </div>
    )
}