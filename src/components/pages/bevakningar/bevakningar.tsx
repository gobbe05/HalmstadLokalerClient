import IOffice from "../../../interfaces/IOffice"
import { Link } from "react-router-dom"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import OfficeCardLong from "../../cards/officecardlong"
import SavedSearch from "./savedsearch"
import { useEffect, useState } from "react"
import { FaSearch, FaTrashAlt } from "react-icons/fa"
import Loading from "../../layout/loading"
import { useAuth } from "../../../context/Auth/AuthContext"
import { useSavedSearch } from "../../../context/savedSearchContext"

/**
 * This component works by first fetching the saved searches from the server. If there are no saved searches, a message is displayed to the user.
 * The saved searches are then displayed in a list, and the user can click on a saved search to view the results of that search.
 * The results are fetched from the server and displayed in a list of OfficeCardLong components.
 * @returns Component for displaying saved searches and the results of the active saved search.
 */
export default function Bevakningar() {
    const { activeSavedSearch, setActiveSavedSearch } = useSavedSearch();
    const queryClient = useQueryClient();
    const { isAuthenticated } = useAuth();

    const RemoveSearch = async () => {
        const response = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/api/savedsearch/toggle`, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({ search: activeSavedSearch }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            queryClient.invalidateQueries({ queryKey: ["savedsearches"] });

            // Refetch saved searches and select a new one if available
            const updatedSearches = await queryClient.fetchQuery({
                queryKey: ["savedsearches"],
                queryFn: async () => {
                    const res = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/api/savedsearch?limit=2`, {
                        credentials: "include",
                    });
                    if (res.status === 204) return { savedSearches: [] };
                    return await res.json();
                },
            });
            setActiveSavedSearch(
                updatedSearches.savedSearches.length > 0 ? updatedSearches.savedSearches[0].searchString : undefined
            );
            queryClient.invalidateQueries({ queryKey: ["offices-savedsearch"] });
        }
    };

    const { isPending, error, data } = useQuery({
        queryKey: ["savedsearches"],
        queryFn: async () => {
            const response = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/api/savedsearch?limit=2`, {
                credentials: "include",
            });
            if (response.status == 204) return { savedSearches: [] };
            const data = await response.json();
            if (data.savedSearches.length > 0 && !activeSavedSearch) {
                setActiveSavedSearch(data.savedSearches[0].searchString);
            }
            return data;
        },
    });

    useEffect(() => {
        if (activeSavedSearch) {
            queryClient.invalidateQueries({ queryKey: ["offices-savedsearch"] });
        }
    }, [activeSavedSearch]);

    if (!activeSavedSearch || !isAuthenticated)
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="w-full bg-gradient-to-br from-primary to-primary-dark text-white">
                    <div className="max-w-7xl mx-auto px-4 py-16 md:py-20">
                        <div className="max-w-3xl">
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                                Bevakningar
                            </h1>
                            <p className="text-lg md:text-xl text-white/90">
                                Spara sökningar och få notifieringar när nya kontor dyker upp.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-4 -mt-8 relative z-10">
                    <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
                        <div className="max-w-lg mx-auto">
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">Inga bevakningar än</h3>
                            <p className="text-gray-600 mb-6">När du sparar en sökning kommer den att visas här. Du får notifieringar när nya kontor som matchar din sökning läggs upp.</p>
                            <Link to="/lediga-lokaler" className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-xl transition-colors">
                                Hitta kontor att bevaka
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    if (isPending || error) return <Loading />;
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="w-full bg-gradient-to-br from-primary to-primary-dark text-white">
                <div className="max-w-7xl mx-auto px-4 py-16 md:py-20">
                    <div className="max-w-3xl">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                            Bevakningar
                        </h1>
                        <p className="text-lg md:text-xl text-white/90">
                            Se dina sparade bevakningar och få notifieringar om nya kontor.
                        </p>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 -mt-8 pb-16 relative z-10">
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Selection for saved searches */}
                    <SavedSearches
                        savedSearches={data.savedSearches}
                        activeSavedSearch={activeSavedSearch}
                        setActiveSavedSearch={setActiveSavedSearch}
                    />
                    <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-gray-100">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <h2 className="text-xl font-semibold text-gray-900">
                                    Matchande kontor för "{activeSavedSearch}"
                                </h2>
                                <div className="flex gap-3">
                                    <Link
                                        className="inline-flex items-center gap-2 px-4 py-2 text-primary hover:text-primary-dark hover:bg-primary/5 rounded-xl transition-colors"
                                        to={`/lediga-lokaler?search=${activeSavedSearch}`}
                                    >
                                        <FaSearch size={16} />
                                        <span>Visa alla</span>
                                    </Link>
                                    <button
                                        onClick={RemoveSearch}
                                        className="inline-flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                                        title="Ta bort bevakning"
                                    >
                                        <FaTrashAlt size={16} />
                                        <span>Ta bort</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="p-6">
                            <Offices activeSavedSearch={activeSavedSearch} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/**
 * @returns Component for selection of saved search to show
 */
const SavedSearches = ({
    savedSearches,
    activeSavedSearch,
    setActiveSavedSearch,
}: {
    savedSearches: Array<{ _id: string; searchString: string }>;
    activeSavedSearch: string | undefined;
    setActiveSavedSearch: React.Dispatch<React.SetStateAction<string | undefined>>;
}) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">Dina bevakningar</h2>
            </div>
            <div className="divide-y divide-gray-100">
                {savedSearches.map((search: { _id: string; searchString: string }) => (
                    <SavedSearch
                        setActiveSavedSearch={setActiveSavedSearch}
                        active={activeSavedSearch == search.searchString}
                        search={search}
                        key={search._id}
                    />
                ))}
            </div>
        </div>
    );
};

const Offices = ({ activeSavedSearch }: { activeSavedSearch: string }) => {
    const { error, isPending, data } = useQuery({
        queryKey: ["offices-savedsearch"],
        queryFn: async () => {
            const response = await fetch(
                `${import.meta.env.VITE_SERVER_ADDRESS}/api/office?search=${activeSavedSearch}&limit=6`,
                { credentials: "include" }
            );
            const data = await response.json();
            return data.offices || [];
        },
    });

    if (isPending) {
        return (
            <div className="p-6">
                <p className="text-gray-500">Laddar matchande kontor...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6">
                <div className="bg-red-50 text-red-600 p-4 rounded-xl">
                    Ett fel uppstod när annonserna skulle hämtas.
                </div>
            </div>
        );
    }

    if (!data.length) {
        return (
            <div className="p-6">
                <div className="bg-gray-50 p-4 rounded-xl text-center">
                    <p className="text-gray-600">Inga kontor matchar din sökning just nu.</p>
                    <p className="text-sm text-gray-500 mt-1">Du kommer få en notifiering när nya kontor dyker upp.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-4">
            {data.map((office: IOffice) => (
                <OfficeCardLong office={office} key={office._id} />
            ))}
        </div>
    );
};