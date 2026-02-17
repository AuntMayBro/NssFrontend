
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
// import Activities from "@/components/Activities"; // Replaced with dynamic fetch
import Section from '@/components/ui/Section';
import Team from "@/components/Team";

import Footer from "@/components/Footer";
import ActivityCard from "@/components/ActivityCard";
import { client } from "@/lib/sanity";
import { ArrowRight, Loader2 } from "lucide-react";

const Index = () => {
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentActivities = async () => {
      try {
        const query = `*[_type == "activity"] | order(date desc)[0...3] {
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
        console.error("Failed to fetch recent activities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentActivities();

    fetchRecentActivities();
  }, []);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground overflow-x-hidden selection:bg-nss-red/20 selection:text-nss-red">
      <Navbar />
      <Hero />
      <About />

      {/* Dynamic Activities Section */}
      <Section id="activities" className="bg-gray-50">
        <div className="text-center mb-16">
          <span className="text-nss-blue font-bold tracking-widest uppercase text-sm">What We Do</span>
          <h2 className="text-3xl md:text-4xl font-bold text-nss-navy mt-2">Recent Activities</h2>
          <div className="w-20 h-1 bg-nss-blue mx-auto mt-4 rounded-full"></div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 text-nss-blue animate-spin" />
          </div>
        ) : activities.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activities.map(activity => (
              <ActivityCard key={activity._id} activity={activity} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-white rounded-xl border border-gray-100 shadow-sm">
            <p className="text-gray-500">No activities populated yet via CMS.</p>
            <p className="text-sm text-gray-400 mt-2">Please add content in Sanity Studio.</p>
          </div>
        )}

        <div className="text-center mt-12">
          <a href="/activities" className="inline-flex items-center gap-2 px-8 py-3 bg-nss-navy text-white rounded-full font-semibold hover:bg-nss-navy-light transition-colors shadow-lg group">
            View All Activities
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </Section>


      <Team />

      <Footer />
    </div>
  );
};

export default Index;
