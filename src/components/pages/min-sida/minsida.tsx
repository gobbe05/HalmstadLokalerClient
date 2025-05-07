import Listings from "./listings";
import Statistics from "./statistics";

export default function MinSida() {
    return (
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-3 lg:gap-4 mx-auto w-full lg:w-2/3 lg:my-16 text-gray-700">
            <Listings />
            <div>
                <Statistics />
            </div>
        </div>
    )
}