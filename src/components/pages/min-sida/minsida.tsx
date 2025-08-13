import { useAuth } from "../../../context/Auth/AuthContext";
import Listings from "./listings";
import MyProfile from "./profile";
import Statistics from "./statistics";

export default function MinSida() {
   const {authId} = useAuth()
   if(!authId) {
        return <div className="text-center text-neutral mt-16">Du måste vara inloggad för att se din sida.</div>
   }
    return (
        <div className="bg-gray-50 w-full">
            <div className="max-w-6xl mx-auto px-8 py-8">
                <div className="mb-4 bg-white border border-gray-200 p-8 rounded-md">
                    <h1 className="text-4xl font-bold text-primary">Min sida</h1>
                    <p className="text-neutral text-lg">Hantera dina annonser, meddelanden och statistik.</p>
                </div>
                <div className="flex flex-col-reverse lg:grid lg:grid-cols-3 lg:gap-4 mx-auto text-neutral">
                    <Listings />
                    <div>
                        <MyProfile id={authId} />
                        <Statistics />
                    </div>
                </div>
            </div>
        </div>
    )
}