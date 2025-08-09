// BoxesSection Component
export default function BoxesSection() {
    return (
        <div className="flex justify-center items-center w-full">
            <div className="max-w-5xl">
                <div>
                    <h1 className="text-4xl font-bold">Din plats i Halmstads arbetsliv</h1>
                    <h3 className="font-semibold text-xl">Upptäck, hyr eller hyr ut kontorsutrymmen – enkelt, lokalt och flexibelt.</h3>
                </div>
                <div className="grid grid-cols-3 gap-16 mt-32">
                    <Item cta={"Lägg upp din annons idag!"} header={"Annonsera din lokal"} text={"Har du en ledig yta? Anslut dig till företag och yrkesverksamma i Halmstad som letar efter sin nästa arbetsplats. Det är enkelt, snabbt och når rätt målgrupp."}/>
                    <Item cta={"Utforska flexibla alternativ!"} header={"Flexibla alternativ för alla"} text={"Hitta kontor som passar dina behov. Behöver du en plats för en dag, en månad eller långsiktigt? Vår marknadsplats erbjuder flexibla lösningar som passar din verksamhet."}/>
                    <Item cta={"Läs mer om oss!"} header={"Varför välja oss?"} text={"Vi är Halmstads dedikerade plattform för uthyrning av kontorsutrymmen. Njut av transparent prissättning, lokala annonser och en gemenskapsdriven metod för att hitta och dela arbetsplatser."}/>
                </div>                
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
        <div className="text-white">
            <h1 className="font-semibold text-2xl text-white">{header}</h1>
            <p className="mt-2 white">{text}</p>
            <button className="mt-8 text-white bg-accent rounded-full px-5 py-2 hover:text-accent-dark  transition-all">
                {cta}
            </button>
        </div>
    )
}