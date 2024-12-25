import { Link } from "react-router-dom";
import IOffice from "../../interfaces/IOffice";

export default function OfficeCardLong({office}: {office: IOffice}) {
    return (
        <Link to={"/lokal/"+office._id} className="w-full flex bg-white text-gray-700 border rounded-md shadow hover:shadow-md overflow-hidden group transition-all">
            <div className="h-full min-w-48 bg-gray-500">
                <img className="h-full" src={office.image}/>
            </div>
            <div className="w-full p-4">
                <div className="text-gray-700"> <h1 className="text-xl font-semibold group-hover:underline underline-offset-2">{office.name}</h1>
                    <p className="text-sm font-light">{office.location}</p>
                    <p className="font-xl font-bold mt-2">{office.size} m2</p>
                    <p className="h-16 mt-4 text-sm text-ellipsis overflow-hidden">{office.description}</p>
                </div>
            </div>
            
        </Link>
    )
}