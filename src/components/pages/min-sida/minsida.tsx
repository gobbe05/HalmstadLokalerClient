import { useAuth } from "../../../context/Auth/AuthContext";
import Listings from "./listings";
import MyProfile from "./profile";
import Statistics from "./statistics";

export default function MinSida() {
   const {authId} = useAuth()
   if(!authId) {
        return <div className="text-center text-gray-700 mt-16">Du måste vara inloggad för att se din sida.</div>
   }
    return (
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-3 lg:gap-4 mx-auto w-full lg:w-2/3 lg:my-16 text-gray-700">
            <Listings />
            <div>
                <MyProfile id={authId} />
                <Statistics />
            </div>
        </div>
    )
}