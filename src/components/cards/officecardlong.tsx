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
      className="rounded-md group w-full bg-white text-gray-700 sm:border overflow-hidden transition-all border-gray-200 hover:border-primary/20 hover:shadow-lg flex flex-col sm:flex-row h-auto sm:h-[128px]"
    >
      {/* Thumbnail - responsive, LikeButton overlay */}
      <div className="relative w-full h-[160px] sm:h-[128px] sm:w-[128px] min-w-0 sm:min-w-[128px] bg-gray-700 overflow-hidden">
        {/* Like Button overlayed on image */}
        {type != "seller" && (
          <div className="absolute bottom-1 left-1 z-10">
            <LikeButton id={office._id} />
          </div>
        )}
        {
          office.thumbnails[0] ?
          <img
            src={import.meta.env.VITE_BUCKET_ADDRESS + office.thumbnails[0]}
            alt={`Thumbnail of ${office.name}`}
            className="h-full w-full object-cover"
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
            <h1 className="text-xl text-gray-900 group-hover:text-primary transition-colors">
              {office.name}
            </h1>
          </div>
          <p className="font-light text-gray-600 text-nowrap">{office.location}</p>
          <div className="flex items-center gap-4">
            <p className="font-semibold mt-2">{office.size} m²</p>
            <p className="font-semibold mt-2">{office.price} kr/mån</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
