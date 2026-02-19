
import { useState, useEffect } from 'react';
import { Loader2, Calendar } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ActivityCard from '@/components/ActivityCard';
import Section from '@/components/ui/Section';
import { client } from '@/lib/sanity';
import { cn } from '@/lib/utils'; // Keep import if used, or remove if unused

const ActivitiesPage = () => {
    const [activities, setActivities] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const query = `*[_type == "activity"] | order(date desc) {
          _id,
          title,
          description,
          date,
          location,
          category,
          mainImage,
          impactStats
        }`;
                const data = await client.fetch(query);
                setActivities(data);
            } catch (error) {
                console.error("Failed to fetch activities:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchActivities();
    }, []);

    // Group activities by year
    const activitiesByYear = activities.reduce((acc, activity) => {
        const year = new Date(activity.date).getFullYear().toString();
        if (!acc[year]) {
            acc[year] = [];
        }
        acc[year].push(activity);
        return acc;
    }, {} as Record<string, any[]>);

    const sortedYears = Object.keys(activitiesByYear).sort((a, b) => b.localeCompare(a));

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-foreground overflow-x-hidden selection:bg-nss-red/20 selection:text-nss-red">
            <Navbar />

            {/* Header Section */}
            {/* Header Section */}
            <div className="bg-gradient-to-b from-nss-blue/10 to-white pt-32 pb-12 md:pt-40 md:pb-20 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-slate-200 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10 bg-[length:20px_20px]"></div>

                <h1 className="text-4xl md:text-6xl font-bold font-heading mb-4 relative z-10 text-nss-navy tracking-tight">
                    Our <span className="text-nss-red">Activities</span>
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto px-4 relative z-10 text-lg md:text-xl font-medium">
                    A timeline of our impact and service initiatives.
                </p>

                {/* Decorative Elements */}
                <div className="absolute top-1/4 left-10 w-20 h-20 bg-nss-blue/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute top-1/3 right-10 w-32 h-32 bg-nss-red/10 rounded-full blur-3xl animate-pulse delay-700"></div>
            </div>

            <Section className="py-12">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="w-10 h-10 text-nss-blue animate-spin mb-4" />
                        <p className="text-gray-500 font-medium">Loading activities...</p>
                    </div>
                ) : sortedYears.length > 0 ? (
                    <div className="space-y-16">
                        {sortedYears.map((year) => (
                            <div key={year} className="relative">
                                {/* Year Header */}
                                <div className="flex items-center gap-4 mb-8">
                                    <h2 className="text-3xl font-bold text-nss-navy/80 font-heading">{year}</h2>
                                    <div className="h-px bg-gray-200 flex-grow"></div>
                                </div>

                                {/* Activities Grid for the Year */}
                                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
                                    {activitiesByYear[year].map((activity: any) => (
                                        <ActivityCard key={activity._id} activity={activity} />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-xl border border-gray-100 border-dashed">
                        <p className="text-gray-400 text-lg">No activities found.</p>
                    </div>
                )}
            </Section>

            <Footer />
        </div>
    );
};

export default ActivitiesPage;
