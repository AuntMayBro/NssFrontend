
import { useState } from 'react';
import { Calendar, MapPin, X, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { urlFor } from '@/lib/sanity'; // Assuming sanity setup is done

interface ActivityProps {
    activity: any // Using any for flexibility until type is strictly defined
}

const ActivityCard = ({ activity }: ActivityProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Simplified image handling to prevent crashes
    const getImageUrl = (source: any) => {
        try {
            return source ? urlFor(source).width(800).url() : '';
        } catch (e) {
            return '';
        }
    };

    const toggleModal = () => setIsModalOpen(!isModalOpen);

    return (
        <>
            <div
                className="group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full cursor-pointer relative"
                onClick={toggleModal}
            >
                <div className="h-48 bg-gray-100 relative overflow-hidden">
                    <div className="absolute inset-0 bg-nss-navy/10 group-hover:bg-transparent transition-colors duration-300 z-10"></div>
                    {activity.mainImage ? (
                        <img
                            src={getImageUrl(activity.mainImage)}
                            alt={activity.title || 'Activity'}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-200">
                            <span className="text-sm">No Image</span>
                        </div>
                    )}
                    {activity.category && (
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-nss-navy uppercase tracking-wider shadow-sm z-20">
                            {activity.category}
                        </div>
                    )}
                </div>

                <div className="p-5 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                        <div className="flex items-center gap-1">
                            <Calendar size={14} className="text-nss-red" />
                            <span>{activity.date ? new Date(activity.date).toLocaleDateString() : 'Date TBD'}</span>
                        </div>
                    </div>

                    <h3 className="text-lg font-bold text-nss-navy mb-2 group-hover:text-nss-blue transition-colors line-clamp-2">
                        {activity.title}
                    </h3>

                    <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow line-clamp-3">
                        {activity.description}
                    </p>

                    <div className="pt-4 border-t border-gray-100 flex justify-between items-center mt-auto">
                        <span className="text-xs font-medium text-nss-red group-hover:underline transition-all">Read Full Details</span>
                        <div className="w-8 h-8 rounded-full bg-nss-blue/10 flex items-center justify-center text-nss-blue group-hover:bg-nss-blue group-hover:text-white transition-all">
                            <ArrowRight size={14} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-fade-in">
                    <div className="absolute inset-0 bg-nss-navy/60 backdrop-blur-sm" onClick={toggleModal}></div>

                    <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto relative z-10 shadow-2xl animate-fade-up">
                        <button
                            onClick={toggleModal}
                            className="absolute top-4 right-4 p-2 bg-white/50 backdrop-blur-md rounded-full hover:bg-white text-nss-navy transition-all z-20 shadow-sm"
                        >
                            <X size={20} />
                        </button>

                        <div className="h-56 sm:h-72 w-full relative">
                            {activity.mainImage ? (
                                <img
                                    src={getImageUrl(activity.mainImage)}
                                    alt={activity.title}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                    <span className="text-gray-400">No Image</span>
                                </div>
                            )}
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 pt-20">
                                <h2 className="text-2xl font-bold text-white mb-1 shadow-sm">{activity.title}</h2>
                                <div className="flex flex-wrap gap-4 text-white/90 text-sm font-medium">
                                    <span className="flex items-center gap-1.5"><Calendar size={14} className="text-nss-gold" /> {new Date(activity.date).toLocaleDateString()}</span>
                                    {activity.location && <span className="flex items-center gap-1.5"><MapPin size={14} className="text-nss-gold" /> {activity.location}</span>}
                                </div>
                            </div>
                        </div>

                        <div className="p-6 md:p-8 space-y-6">
                            {activity.impactStats && (
                                <div className="bg-nss-gold/10 border border-nss-gold/20 p-4 rounded-xl flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-nss-gold animate-pulse"></div>
                                    <span className="font-semibold text-nss-navy text-sm md:text-base">Impact: {activity.impactStats}</span>
                                </div>
                            )}

                            <div className="prose prose-sm md:prose-base max-w-none text-gray-700 leading-relaxed">
                                <p>{activity.description}</p>

                                {/* Placeholder for Full Description Content */}
                                <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-100 text-sm text-gray-500 italic">
                                    Full activity details, report, and additional gallery images would follow here.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ActivityCard;
