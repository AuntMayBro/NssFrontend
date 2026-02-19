
import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/sanity";
import { queries } from "@/lib/queries";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FileText, Download, Calendar, Book, File } from "lucide-react";

const ResourcesPage = () => {
    const { data: resources, isLoading } = useQuery({
        queryKey: ["resources"],
        queryFn: () => client.fetch(queries.resources),
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

    // Helper function to group resources by category
    const groupedResources = resources?.reduce((acc: any, resource: any) => {
        const category = resource.category;
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(resource);
        return acc;
    }, {});

    const renderSection = (title: string, items: any[], icon: any) => {
        if (!items || items.length === 0) return null;

        return (
            <div className="mb-12">
                <h3 className="text-2xl font-bold text-nss-navy mb-6 flex items-center gap-3">
                    <span className="p-2 bg-nss-navy/10 rounded-lg text-nss-navy">
                        {icon}
                    </span>
                    {title}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                    {items.map((item: any) => (
                        <a
                            key={item._id}
                            href={item.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group bg-white rounded-xl p-3 md:p-6 shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300 hover:-translate-y-1 block h-full flex flex-col justify-between"
                        >
                            <div className="flex justify-between items-start mb-2 md:mb-4">
                                <div className="p-2 md:p-3 bg-blue-50 rounded-lg text-blue-600 group-hover:bg-nss-navy group-hover:text-white transition-colors duration-300">
                                    <FileText size={20} className="md:w-6 md:h-6" />
                                </div>
                                <Download size={16} className="text-gray-400 group-hover:text-nss-navy transition-colors md:w-5 md:h-5" />
                            </div>
                            <h4 className="font-semibold text-sm md:text-lg text-gray-800 mb-2 group-hover:text-nss-navy transition-colors line-clamp-2">
                                {item.title}
                            </h4>
                            <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 text-xs md:text-sm text-gray-500 mt-auto">
                                {item.academicYear && (
                                    <span className="bg-gray-100 px-1.5 py-0.5 md:px-2 md:py-1 rounded text-[10px] md:text-xs font-medium w-fit">
                                        {item.academicYear}
                                    </span>
                                )}
                                <span>{new Date(item.publishedDate).toLocaleDateString()}</span>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Navbar />

            <main className="flex-grow container mx-auto px-4 md:px-8 py-12 mt-20">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="inline-block py-1 px-3 rounded-full bg-nss-gold/10 text-nss-navy text-sm font-semibold mb-4 tracking-wide">
                        DOCUMENTATION
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-nss-navy mb-6">
                        Resources & Reports
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Access official reports, guidelines, forms, and other important documents from NSS IET DAVV.
                    </p>
                </div>

                <div className="max-w-6xl mx-auto">
                    {/* 5 Year Reports */}
                    {renderSection(
                        "5 Year Reports",
                        groupedResources?.['5-year-report'],
                        <Book size={24} />
                    )}

                    {/* Yearly Reports */}
                    {renderSection(
                        "Yearly Reports",
                        groupedResources?.['yearly-report'],
                        <Calendar size={24} />
                    )}

                    {/* Camp Reports */}
                    {renderSection(
                        "Camp Reports",
                        groupedResources?.['camp-report'],
                        <FileText size={24} />
                    )}

                    {/* General Resources */}
                    {renderSection(
                        "General Resources",
                        groupedResources?.['general'],
                        <File size={24} />
                    )}

                    {(!resources || resources.length === 0) && (
                        <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
                            <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FileText className="text-gray-400" size={32} />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Resources Found</h3>
                            <p className="text-gray-500">Please check back later for updates.</p>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};
export default ResourcesPage;
