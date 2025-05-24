import { Link } from "react-router-dom";
import IOffice from "../../interfaces/IOffice";
import { MdOutlineImageNotSupported } from "react-icons/md";

export default function OfficeCard({office}: {office: IOffice}) {
  
  return (
    <Link to={"/lokal/"+office._id} className="w-full bg-white text-gray-700 border shadow-md hover:shadow-md rounded-lg overflow-hidden transition-all transform group border-gray-200 hover:border-gray-400 hover:bg-gray-50">
      
      <div className="h-[128px] text-white bg-gray-700">
        {office.thumbnails[0] ?
        <img 
          className="w-full h-[128px] object-cover" 
          src={import.meta.env.VITE_BUCKET_ADDRESS + office.thumbnails[0]} 
          alt={`Bild på lokal i ${location}`} 
        />
        :
        <div className="h-full w-full flex items-center justify-center text-gray-300">
          <MdOutlineImageNotSupported size={32} />
        </div>
  }
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold underline-offset-2">{office.location}</h3>
        <p className="max-h-4 w-full overflow-hidden overflow-ellipsis text-sm font-light mt-1">
          {office.description}
        </p>

        <div className="flex mt-4">
          <div className="w-1/2">
            <p className="font-light text-sm">Pris</p>
            <p className="font-semibold">{office.price.toLocaleString()} kr/mån</p>
          </div>
          <div className="w-1/2">
            <p className="font-light text-sm">Yta</p>
            <p className="font-semibold">{office.size} m<sup>2</sup></p>
          </div>
        </div>
      </div>
    </Link>
  );
}
