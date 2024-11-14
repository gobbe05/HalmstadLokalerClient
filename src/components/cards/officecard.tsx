export default function OfficeCard({location,price, size, image}: {location: string, price: number, size: number, image: string}) {
    return (
        <div className="w-full bg-white text-gray-700 border border-gray-300 shadow-lg rounded-lg overflow-hidden">
            <img className="w-full" src={`http://${import.meta.env.VITE_SERVER_IP}:${import.meta.env.VITE_SERVER_PORT}`+image}/>
            <div className="p-4">
                <h3 className="text-xl font-semibold">{location}</h3>
            <p className="text-sm font-light mt-1">Detta är en liten kort beskrivning om kontoret</p>
                <div className="flex mt-4">
                    <div className="w-1/2">
                        <p className="font-light text-sm">Price</p>
                        <p className="font-semibold">{price} kr/mån</p>
                    </div>
                    <div className="w-1/2">
                        <p className="font-light text-sm">Yta</p>
                        <p className="font-semibold">{size} m2</p>
                    </div>
                </div>
            </div>
            
        </div>
    )
}