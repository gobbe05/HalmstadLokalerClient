import { Link } from "react-router-dom";
import IOffice from "../../interfaces/IOffice";
import { useQuery} from "@tanstack/react-query";
import LikeButton from "../buttons/likebutton";

export default function OfficeCardLong({ office }: { office: IOffice }) {
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
      className="h-[200px] relative flex w-full bg-white text-gray-700 border rounded-md shadow-sm hover:shadow overflow-hidden transition-all"
    >
        {/* Thumbnail with consistent size */}
        <div className="h-[200px] w-[200px] min-w-[200px] bg-gray-500 overflow-hidden">
            <img
              src={office.thumbnails[0]}
              alt={`Thumbnail of ${office.name}`}
              className="h-full w-full object-cover transition-transform duration-500 ease-in-out"
            />
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
          <p className="font-light text-gray-600">{office.location}</p>
          <p className="font-semibold mt-2">{office.size} m²</p>
          <p className="h-16 text-sm text-gray-500 mt-4 overflow-hidden text-ellipsis">
            {office.description}
          </p>
          {/* Like Button */} 
          <LikeButton id={office._id}/>
        </div> 
      </div>
    </Link>
  );
}
