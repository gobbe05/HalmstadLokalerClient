import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import OfficeCardLong from '../../cards/officecardlong';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import ContactButton from '../../buttons/contactbutton';
import { useAuth } from '../../../context/Auth/AuthContext';
import { IoBusinessOutline, IoCallOutline, IoMailOutline } from 'react-icons/io5';
import ContactInfoModal, { ContactType } from '../../reusable/contactinfomodal';

const ProfileCard = ({showOffices, id}: {showOffices: boolean, id: string}) => {
    const [limit, setLimit] = useState<number | null>(3);
    const [contactModal, setContactModal] = useState<ContactType>(null);
    const boxRef = useRef<HTMLDivElement>(null);
    const {isAuthenticated, type} = useAuth();
    const queryClient = useQueryClient();
        const { t } = useTranslation();

    const {isPending, error, data: officesData} = useQuery({
        queryKey: ['profile-offices-'+id],
        queryFn: () => {
            return fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/api/office/user/${id}/${limit ? `?limit=${limit}` : ""}`, {
                credentials: "include"
            }).then(response => response.json())
        }
    })

    const {isPending: isPending2, error: error2, data: profileData} = useQuery({
        queryKey: ['profile-'+id],
        queryFn: () => {
            return fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/auth/user/${id}`, {
                credentials: "include"
            }).then(response => response.json())
        }
    })

    useEffect(() => {
        queryClient.invalidateQueries({queryKey: ['profile-offices-'+id]})
    }, [limit])

    if (isPending2) {
        return (
            <div className="animate-pulse space-y-4">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gray-200"></div>
                    <div className="flex-1">
                        <div className="h-5 bg-gray-200 rounded w-40"></div>
                        <div className="h-4 bg-gray-200 rounded w-24 mt-2"></div>
                    </div>
                </div>
            </div>
        )
    }

    if (error2) {
        return <div className="text-red-500">{t('profile.error', 'Det gick inte att ladda profilen')}</div>
    }

    const user = profileData?.user
    if (!user) return null

    return (
        <div className="space-y-6">
            {/* Profile Info */}
            <div className="flex items-start gap-4">
                {/* Avatar */}
                <img 
                    src={`https://api.dicebear.com/5.x/initials/svg?seed=${user.username}`} 
                    alt={`${user.firstName} ${user.lastName}`} 
                    className="w-16 h-16 rounded-full border border-gray-100 bg-primary/5" 
                />
                
                {/* User Details */}
                <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                                <h2 className="text-lg font-semibold text-gray-900">
                                    {user.firstName} {user.lastName}
                                </h2>
                            <div className="text-sm space-y-1">
                                <p className="text-gray-500">@{user.username}</p>
                                {user.companyName && (
                                    <p className="text-gray-600">
                                        {user.companyName}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Contact Actions */}
                        <div className="flex items-center gap-3">
                            {isAuthenticated ? (
                                <>
                                    {user.email && (
                                        <button 
                                            onClick={() => setContactModal('email')}
                                            className="p-2 text-gray-600 hover:text-primary hover:bg-primary/5 rounded-full transition-colors"
                            title={t('profile.showEmail', 'Visa e-postadress')}
                                        >
                                            <IoMailOutline className="w-5 h-5" />
                                        </button>
                                    )}
                                    {user.phoneNumber && (
                                        <button 
                                            onClick={() => setContactModal('phone')}
                                            className="p-2 text-gray-600 hover:text-primary hover:bg-primary/5 rounded-full transition-colors"
                            title={t('profile.showPhone', 'Visa telefonnummer')}
                                        >
                                            <IoCallOutline className="w-5 h-5" />
                                        </button>
                                    )}
                                    {type === "buyer" && (
                                        <ContactButton broker={id} />
                                    )}
                                </>
                            ) : (
                                <button
                                    onClick={() => window.location.href = '/login'}
                                    className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-white font-medium transition-all"
                                >
                        <span>{t('profile.sendMessage', 'Skicka meddelande')}</span>
                                    <IoMailOutline className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact Info Modal */}
            <ContactInfoModal 
                type={contactModal}
                userId={id}
                onClose={() => setContactModal(null)}
            />

            {/* Offices Section */}
            {showOffices && officesData?.offices?.length > 0 && (
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium text-gray-900">
                                {t('profile.activeListings', 'Aktiva annonser')} 
                                <span className="ml-2 text-sm text-gray-500">
                                    ({officesData.offices.length})
                                </span>
                        </h3>
                        {officesData.offices.length > 3 && (
                            <button 
                                onClick={() => setLimit(prev => prev == null ? 3 : null)}
                                className="text-sm text-primary hover:text-primary/80 transition-colors"
                                >
                                    {limit == null ? t('profile.showLess', 'Visa mindre') : t('profile.showAll', 'Visa alla')}
                            </button>
                        )}
                    </div>
                    
                    <div className="space-y-3 overflow-auto max-h-[500px] pr-2">
                        {officesData.offices.slice(0, limit ?? undefined).map((office: any) => (
                            <OfficeCardLong office={office} key={office._id}/>
                        ))}
                    </div>
                </div>
            )}
        </div>
    
    
  );
};

export default ProfileCard;
