import IOffice from "../../interfaces/IOffice";
import ContactButton from "../buttons/contactbutton";

export default function OfficeCardLong({office}: {office: IOffice}) {
    return (
        <div className="w-full flex bg-white text-gray-700 border rounded-md shadow overflow-hidden">
            <div>
                <img className="h-full" src={`http://${import.meta.env.VITE_SERVER_IP}:${import.meta.env.VITE_SERVER_PORT}`+office.image}/>
            </div>
            <div className="w-full p-4">
                <div className="text-gray-700"> <h1 className="text-xl font-semibold">{office.location}</h1>
                    <p className="text-sm font-light">Name of this place</p>
                    <p className="font-xl font-bold mt-2">{office.size} m2</p>
                    <p className="h-16 mt-4 text-sm text-ellipsis overflow-hidden">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque non nisl sed nulla tempus vehicula. Duis lobortis sagittis fermentum. Quisque faucibus, justo non faucibus malesuada, magna neque dapibus magna, vel mattis arcu est feugiat eros. Aliquam dapibus enim velit, eu pellentesque tortor sollicitudin in. Mauris dignissim metus ligula, at molestie quam dictum non.</p>
                </div>
                <div className="flex items-center mt-4">
                    <p>aUser</p>
                    <div className="ms-auto">
                        <ContactButton link="/" />
                    </div>
                </div>
            </div>
            
        </div>
    )
}