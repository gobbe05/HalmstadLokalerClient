import { Link } from "react-router-dom";
import IOffice from "../../interfaces/IOffice";
import { MdOutlineImageNotSupported } from "react-icons/md";

export default function OfficeCard({office}: {office: IOffice}) {
  return (
    <Link 
      to={`/lokal/${office._id}`} 
      className="group flex flex-col w-full bg-white text-gray-700 border border-gray-200 rounded-lg overflow-hidden transition-all hover:border-primary/20 hover:shadow-lg"
    >
      {/* Image Section */}
      <div className="h-32 bg-gray-100">
        {office.thumbnails[0] ? (
          <div className="relative h-full">
            <img 
              className="w-full h-full object-cover" 
              src={import.meta.env.VITE_BUCKET_ADDRESS + office.thumbnails[0]} 
              alt={`Bild på ${office.name}`} 
            />
            {office.thumbnails.length > 1 && (
              <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                +{office.thumbnails.length - 1}
              </div>
            )}
          </div>
        ) : (
          <div className="h-full w-full flex items-center justify-center text-gray-400 bg-gray-50">
            <MdOutlineImageNotSupported size={32} />
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-grow p-4">
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors mb-1">
            {office.name}
          </h3>
          <p className="text-sm text-gray-600 truncate">
            {office.location}
          </p>
        </div>

        <div className="flex mt-auto pt-3 border-t border-gray-100">
          <div className="flex items-center w-1/2">
            <svg className="w-4 h-4 text-gray-500 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-medium">{office.price.toLocaleString()} kr/mån</span>
          </div>
          <div className="flex items-center w-1/2">
            <svg className="w-4 h-4 text-gray-500 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span className="text-sm font-medium">{office.size} m²</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
