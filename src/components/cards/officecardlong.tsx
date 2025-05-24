import { Link } from "react-router-dom";
import IOffice from "../../interfaces/IOffice";
import { useQuery} from "@tanstack/react-query";
import LikeButton from "../buttons/likebutton";
import { useAuth } from "../../context/Auth/AuthContext";
import { MdOutlineImageNotSupported } from "react-icons/md";

export default function OfficeCardLong({ office }: { office: IOffice }) {
  const {isAuthenticated, type} = useAuth()
  // Fetch like status
  const { error, isPending, data } = useQuery({
    queryKey: [`like-${office._id}`],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_ADDRESS}/api/saved/status/${office._id}`,
        { credentials: "include" }
      );
      if (response.status === 401) return "noauth";
      return await response.json();
    },
  });

  if (error || isPending) return null;
  return (
    <Link
      to={`/lokal/${office._id}`}
      className="h-[128px] relative flex w-full bg-white text-gray-700 sm:border sm:rounded-md sm:shadow-sm hover:shadow overflow-hidden transition-all border-gray-200 hover:border-gray-400 hover:bg-gray-50"
    >
        {/* Thumbnail with consistent size */}
        <div className="h-[128px] w-[64px] md:w-[128px] min-w-[64px] md:min-w-[128px] bg-gray-700 overflow-hidden">
          {
            office.thumbnails[0] ?
            <img
              src={import.meta.env.VITE_BUCKET_ADDRESS + office.thumbnails[0]}
              alt={`Thumbnail of ${office.name}`}
              className="h-full w-full object-cover transition-transform duration-500 ease-in-out"
            />
            :
            <div className="h-full w-full flex items-center justify-center text-gray-300">
              <MdOutlineImageNotSupported size={32} />
            </div>
          } 
        </div>

      {/* Office Details */}
      <div className="flex flex-col justify-between flex-grow p-4">
        {/* Office Information */}
        <div>
          <div className="flex items-center gap-4">
            <h1 className="text-xl underline-offset-2">
              {office.name}
            </h1>
          </div>
          <p className="font-light text-gray-600 text-nowrap">{office.location}</p>
          <div className="flex items-center gap-4">
            <p className="font-semibold mt-2">{office.size} m²</p>
            <p className="font-semibold mt-2">{office.price} kr/mån</p>
          </div>          
          {/* Like Button */} 
         {type != "seller" && <LikeButton id={office._id}/>} 
        </div> 
      </div>
    </Link>
  );
}
