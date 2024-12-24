import { Link } from "react-router-dom";
import IOffice from "../../interfaces/IOffice";

export default function OfficeCardLong({office}: {office: IOffice}) {
    return (
        <Link to={"/lokal/"+office._id} className="w-full flex bg-white text-gray-700 border rounded-md shadow hover:shadow-md overflow-hidden group transition-all">
            <div className="h-full min-w-48 bg-gray-500">
                <img className="h-full" src={office.image}/>
            </div>
            <div className="w-full p-4">
                <div className="text-gray-700"> <h1 className="text-xl font-semibold group-hover:underline underline-offset-2">{office.location}</h1>
                    <p className="text-sm font-light">Name of this place</p>
                    <p className="font-xl font-bold mt-2">{office.size} m2</p>
                    <p className="h-16 mt-4 text-sm text-ellipsis overflow-hidden">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque non nisl sed nulla tempus vehicula. Duis lobortis sagittis fermentum. Quisque faucibus, justo non faucibus malesuada, magna neque dapibus magna, vel mattis arcu est feugiat eros. Aliquam dapibus enim velit, eu pellentesque tortor sollicitudin in. Mauris dignissim metus ligula, at molestie quam dictum non.</p>
                </div>
            </div>
            
        </Link>
    )
}