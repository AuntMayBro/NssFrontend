
import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/sanity";
import { queries } from "@/lib/queries";
import { ArrowRight, Quote } from "lucide-react";

const ProgramOfficer = () => {
    const { data: officer, isLoading } = useQuery({
        queryKey: ["programOfficer"],
        queryFn: () => client.fetch(queries.programOfficer),
    });

    if (isLoading) {
        return (
            <div className="py-24 flex justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-nss-navy"></div>
            </div>
        );
    }

    if (!officer) return null;

    return (
        <section className="relative py-10 md:py-24 bg-white overflow-hidden">
            <div className="container relative z-10 px-4 md:px-8">
                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 lg:gap-20 max-w-7xl mx-auto">

                    {/* Image Section - Clean & Geometric */}
                    <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                        <div className="relative w-full max-w-[280px] md:max-w-none md:w-auto">
                            {/* Offset Border */}
                            <div className="absolute top-3 left-3 md:top-4 md:left-4 w-full h-full border-2 border-nss-navy/20 rounded-2xl z-0"></div>

                            {/* Main Image */}
                            <div className="relative w-full h-[320px] md:w-[380px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl z-10 bg-gray-100">
                                {officer.image ? (
                                    <img
                                        src={officer.image}
                                        alt={officer.name}
                                        className="w-full h-full object-cover object-top"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400 text-6xl">
                                        {officer.name.charAt(0)}
                                    </div>
                                )}

                                {/* Overlay Gradient for Text Readability */}
                                <div className="absolute inset-0 bg-gradient-to-t from-nss-navy/90 via-transparent to-transparent opacity-80"></div>

                                {/* Floating Info on Image */}
                                <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 text-white">
                                    <span className="inline-block px-2 py-1 md:px-3 bg-nss-red text-white text-[10px] md:text-xs font-bold tracking-widest uppercase rounded mb-2">
                                        Program Officer
                                    </span>
                                    <h3 className="text-xl md:text-3xl font-bold font-heading leading-tight">{officer.name}</h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Section - Minimal & Typography Focused */}
                    <div className="w-full md:w-1/2 md:pl-10 text-center md:text-left text-nss-navy">
                        <h2 className="text-2xl md:text-5xl font-bold font-heading mb-4 md:mb-8 relative inline-block">
                            Leader. Mentor. <br />
                            <span className="text-nss-blue">Visionary.</span>
                            <span className="absolute -bottom-2 left-0 w-16 md:w-20 h-1 md:h-1.5 bg-nss-red rounded-full"></span>
                        </h2>

                        <div className="relative mb-6 md:mb-10 pl-4 md:pl-8">
                            <Quote className="absolute -top-1 md:-top-2 left-0 w-6 h-6 md:w-8 md:h-8 text-nss-blue/20 transform -scale-x-100" />
                            <blockquote className="text-lg md:text-2xl text-gray-700 font-serif italic leading-relaxed relative z-10">
                                "{officer.message || "Empowering the youth to build a stronger nation through selfless service."}"
                            </blockquote>
                        </div>

                        <p className="text-gray-500 text-sm md:text-lg leading-relaxed mb-6 md:mb-10 max-w-lg mx-auto md:mx-0">
                            Dr. Tapesh Sarsodia has been the driving force behind the NSS unit at IET DAVV. His dedication to social service and student development has created a legacy of impact and community welfare.
                        </p>

                        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                            <a
                                href="/mentors"
                                className="inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-nss-navy text-white rounded-lg font-semibold text-sm md:text-base hover:bg-nss-navy-light transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                            >
                                Meet Our Mentors
                                <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProgramOfficer;
