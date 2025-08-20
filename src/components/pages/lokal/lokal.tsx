import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../layout/loading";
import ContactButton from "../../buttons/contactbutton";
import { useAuth } from "../../../context/Auth/AuthContext";
import IOffice from "../../../interfaces/IOffice";
import OfficeCard from "../../cards/officecard";
import { useEffect, useState } from "react";
import { HiArrowLeft } from "react-icons/hi2";
import ImagesContainer from "./imagescontainer";
import ProfileCard from "../profile/profile";
import LikeButton from "../../buttons/likebutton";
import OfficeCardLong from "../../cards/officecardlong";

export default function Lokal() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [imageLoading, setImageLoading] = useState<boolean>(true);
    const [imageError, setImageError] = useState<boolean>(false);

    const { isAuthenticated, type } = useAuth();

    const { isPending, data, error } = useQuery({
        queryKey: ["office", id],
        queryFn: () => {
            return fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/api/office/${id}`).then((response) =>
                response.json()
            );
        },
    });

    const addToPreviousLookedAt = () => {
        const historyKey = "visitedOffices";
        const storedHistory = localStorage.getItem(historyKey);
        let visitedOffices: { _id: string }[] = storedHistory ? JSON.parse(storedHistory) : [];

        // Remove the current office if it already exists
        visitedOffices = visitedOffices.filter((item) => item._id !== id);

        // Add the current office to the front
        visitedOffices.unshift({ _id: id! });

        // Keep only the latest 4
        visitedOffices = visitedOffices.slice(0, 4);

        localStorage.setItem(historyKey, JSON.stringify(visitedOffices));
    };

    useEffect(() => {
        setImageLoading(true);
        setImageError(false);
        addToPreviousLookedAt();
    }, [data?.office]);

    if (isPending || !id) return <Loading />;
    if (error) return <div>There was an error: {error.message}</div>;
    if (!data?.office) return <div>Office details not found.</div>;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-4 pt-6">
                {/* Back button */}
                <button
                    onClick={() => navigate(-1)}
                    className="mb-8 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                    <HiArrowLeft size={20} />
                    <span>Tillbaka till sök</span>
                </button>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Images Card */}
                        <div className="space-y-6">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                <ImagesContainer
                                    images={data.office.images}
                                    imageLoading={imageLoading}
                                    imageError={imageError}
                                />
                            </div>
                            
                            {/* Quick Info */}
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                                    <div className="text-sm font-medium text-gray-500 mb-1">Lokal</div>
                                    <div className="text-xl font-semibold text-gray-900 mb-1">{data.office.name}</div>
                                    <div className="text-gray-600">{data.office.location}</div>
                                </div>
                                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                                    <div className="text-sm font-medium text-gray-500 mb-1">Storlek</div>
                                    <div className="text-xl font-semibold text-gray-900">{data.office.size} m²</div>
                                </div>
                                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                                    <div className="text-sm font-medium text-gray-500 mb-1">Månadshyra</div>
                                    <div className="text-xl font-semibold text-gray-900">{data.office.price.toLocaleString()} kr</div>
                                </div>
                            </div>
                        </div>

                        {/* Details Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 divide-y divide-gray-100">
                            {/* Description Section */}
                            <div className="p-6 md:p-8">
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">Om lokalen</h2>
                                {data.office.description ? (
                                    <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{data.office.description}</p>
                                ) : (
                                    <p className="text-gray-500 italic">Ingen beskrivning tillgänglig</p>
                                )}
                            </div>

                            {/* Features Section */}
                            {data.office.tags.length > 0 && (
                                <div className="p-6 md:p-8">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Egenskaper</h3>
                                    <div className="flex gap-2 flex-wrap">
                                        {data.office.tags.map((tag: string) => (
                                            <span
                                                key={tag}
                                                className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Like Button Section */}
                            {isAuthenticated && type === "buyer" && (
                                <div className="p-6 md:p-8">
                                    <LikeButton id={data.office._id} longButton={true} />
                                </div>
                            )}
                        </div>{/* Contact Card */}
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                                <h2 className="text-xl font-semibold text-gray-900 mb-6">Kontakta säljare</h2>
                                <ProfileCard showOffices={false} id={data.office.owner} />
                            </div>
                    </div>

                    {/* Right Column - Sticky */}
                    <div className="lg:relative">
                        <div className="lg:sticky lg:top-4 space-y-6">
                            {/* Other Offices Card */}
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <OtherOffices seller={data.office.owner} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Spacing */}
            <div className="h-16"></div>
        </div>
    );
}

const OtherOffices = ({ seller }: { seller: string }) => {
    const { error, isPending, data } = useQuery({
        queryKey: ["other-offices"],
        queryFn: async () => {
            const response = await fetch(
                `${import.meta.env.VITE_SERVER_ADDRESS}/api/office/user/${seller}?limit=4`
            );
            const data = await response.json();
            return data;
        },
    });

    if (isPending) return <Loading />;
    if (error) return <div>There was an error: {error.message}</div>;

    return (
        <div>
            <h2 className="text-xl font-semibold text-neutral mb-4">Andra lokaler från säljaren</h2>
            <div className="grid gap-4">
                {data.offices.length > 0 ? (
                    data.offices.map((office: IOffice) => (
                        <OfficeCard key={office._id} office={office} />
                    ))
                ) : (
                    <div className="text-center text-gray-500">
                        Inga andra lokaler hittades från samma säljare.
                    </div>
                )}
            </div>
        </div>
    );
};