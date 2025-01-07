import { Link } from "react-router-dom";
import IOffice from "../../interfaces/IOffice";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function OfficeCardLong({ office }: { office: IOffice }) {
  const queryClient = useQueryClient();

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

  // Handle like toggle
  const ToggleLike = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    const url = `${import.meta.env.VITE_SERVER_ADDRESS}/api/saved`;
    const options: {credentials: "include", headers: {"Content-Type": string}} = {
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    };

    if (data.saved) {
      await fetch(`${url}/${office._id}`, { method: "DELETE", ...options });
    } else {
      await fetch(url, {
        method: "POST",
        body: JSON.stringify({ office: office._id }),
        ...options,
      });
    }

    queryClient.invalidateQueries({ queryKey: [`like-${office._id}`] });
    queryClient.invalidateQueries({ queryKey: ["saved-offices"] });
  };

  if (error || isPending) return null;

  return (
    <Link
      to={`/lokal/${office._id}`}
      className="h-[200px] relative flex w-full bg-white text-gray-700 border rounded-md shadow overflow-hidden hover:shadow-md group transition-all"
    >
        {/* Thumbnail with consistent size */}
        <div className="h-[200px] w-[200px] min-w-[200px] bg-gray-500 overflow-hidden">
            <img
      src={office.thumbnail}
      alt={`Thumbnail of ${office.name}`}
      className="h-full w-full object-cover transition-transform duration-500 ease-in-out"
    />
        </div>

      {/* Office Details */}
      <div className="flex flex-col justify-between flex-grow p-4">
        {/* Office Information */}
        <div>
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold group-hover:underline underline-offset-2">
              {office.name}
            </h1>
          </div>
          <p className="text-sm font-light text-gray-600">{office.location}</p>
          <p className="font-semibold mt-2">{office.size} m²</p>
          <p className="h-16 text-sm text-gray-500 mt-4 overflow-hidden text-ellipsis">
            {office.description}
          </p>
          {/* Like Button */} 
        </div> 
      </div>
      {data !== "noauth" && (
          <div className="absolute bottom-2 left-2 flex justify-end">
            <button
              onClick={ToggleLike}
              className="bg-white flex items-center justify-center border border-gray-400 p-2 rounded-full hover:bg-gray-100 transition-all"
            >
              {data.saved ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
            </button>
          </div>
        )}  
    </Link>
  );
}
