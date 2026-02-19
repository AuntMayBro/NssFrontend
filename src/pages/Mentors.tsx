
import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/sanity";
import { queries } from "@/lib/queries";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Quote } from "lucide-react";

const MentorsPage = () => {
    const { data: mentors, isLoading } = useQuery({
        queryKey: ["mentors"],
        queryFn: () => client.fetch(queries.mentors),
    });

    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <div className="flex-grow flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-nss-navy"></div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Navbar />

            <main className="flex-grow container mx-auto px-4 md:px-8 py-8 md:py-12 mt-16 md:mt-20">
                <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16 animate-fade-in">
                    <span className="inline-block py-1 px-3 rounded-full bg-nss-gold/10 text-nss-navy text-xs md:text-sm font-semibold mb-3 md:mb-4 tracking-wide">
                        LEADERSHIP
                    </span>
                    <h1 className="text-3xl md:text-5xl font-bold text-nss-navy mb-4 md:mb-6 font-heading">
                        Mentors & Guidance
                    </h1>
                    <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                        The visionaries and leaders who guide NSS IET DAVV towards excellence and social impact.
                    </p>
                </div>

                <div className="space-y-8 md:space-y-16 max-w-5xl mx-auto">
                    {mentors?.map((mentor: any, index: number) => (
                        <div
                            key={mentor._id}
                            className={`flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start p-6 md:p-8 rounded-3xl bg-white shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md animate-fade-up`}
                            style={{ animationDelay: `${index * 150}ms` }}
                        >
                            <div className="w-40 h-40 md:w-64 md:h-64 shrink-0 rounded-2xl overflow-hidden shadow-lg border-4 border-white/50 bg-gray-100">
                                {mentor.image ? (
                                    <img
                                        src={mentor.image}
                                        alt={mentor.name}
                                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-nss-navy text-white text-4xl font-bold">
                                        {mentor.name.charAt(0)}
                                    </div>
                                )}
                            </div>

                            <div className="flex-grow text-center md:text-left">
                                <h3 className="text-2xl md:text-3xl font-bold text-nss-navy mb-2">{mentor.name}</h3>
                                <p className="text-nss-red font-medium text-sm md:text-lg uppercase tracking-wide mb-4 md:mb-6">{mentor.role}</p>

                                {mentor.message && (
                                    <div className="relative pl-6 md:pl-0">
                                        <Quote className="hidden md:block absolute -top-4 -left-8 w-10 h-10 text-nss-gold opacity-20" />
                                        <p className="text-gray-600 leading-relaxed italic text-lg opacity-90">
                                            "{mentor.message}"
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}

                    {(!mentors || mentors.length === 0) && (
                        <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
                            <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Quote className="text-gray-400" size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">Coming Soon</h3>
                            <p className="text-gray-500 max-w-md mx-auto">
                                We are currently updating our mentorship section. Please check back shortly to meet our guiding leaders.
                            </p>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default MentorsPage;
