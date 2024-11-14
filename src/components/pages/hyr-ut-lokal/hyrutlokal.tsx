import { HiBuildingOffice } from "react-icons/hi2"
import OfficeTypeCard from "../../cards/officetypecard"

const HyrUtLokal = () => {
    return (
        <div className="w-full flex flex-col items-center">

            <div className="mt-32 w-[1024px]">
                <h1 className="text-center text-gray-700 text-2xl font-semibold">Vilken typ av lokal vill du hyra ut?</h1>
                <div className="grid grid-cols-2 gap-4 mt-16">
                    <OfficeTypeCard name="Kontor" link="/hyr-ut-lokal/kontor" Icon={HiBuildingOffice} />
                    <OfficeTypeCard name="Kontor" link="/" Icon={HiBuildingOffice} />
                    <OfficeTypeCard name="Kontor" link="/" Icon={HiBuildingOffice} />
                    <OfficeTypeCard name="Kontor" link="/" Icon={HiBuildingOffice} />
                    <OfficeTypeCard name="Kontor" link="/" Icon={HiBuildingOffice} />

                </div>
            </div> 
        </div>
    )
}

export default HyrUtLokal