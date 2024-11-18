import IOffice from "../../interfaces/IOffice";

export default function OfficeCard({office}: {office: IOffice}) {
  const serverUrl = `http://${import.meta.env.VITE_SERVER_IP}:${import.meta.env.VITE_SERVER_PORT}`;
  
  return (
    <div className="w-full bg-white text-gray-700 border shadow-md rounded-lg overflow-hidden transition-transform transform">
      <img 
        className="w-full h-[150px] object-cover" 
        src={`${serverUrl}${office.image}`} 
        alt={`Bild på lokal i ${location}`} 
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold">{office.location}</h3>
        <p className="text-sm font-light mt-1">
          Detta är en liten kort beskrivning om kontoret
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
    </div>
  );
}
