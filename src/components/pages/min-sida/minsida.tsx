import Listings from "./listings";
import Statistics from "./statistics";

export default function MinSida() {
    return (
        <div className="grid grid-cols-3 gap-4 mx-auto w-2/3 my-16 text-gray-700">
            <Listings />
            <div>
                <Statistics />
            </div>
        </div>
    )
}