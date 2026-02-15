
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import Section from './ui/Section';

const Activities = () => {
    const events = [
        {
            id: 1,
            title: "Blood Donation Camp",
            date: "Oct 25, 2025",
            location: "IET DAVV Campus",
            category: "Health",
            description: "Organized a blood donation camp in collaboration with MY Hospital. Over 100 units of blood were collected."
        },
        {
            id: 2,
            title: "Tree Plantation Drive",
            date: "Sep 15, 2025",
            location: "University Garden",
            category: "Environment",
            description: "Planted 500 saplings across the university campus to promote a greener environment."
        },
        {
            id: 3,
            title: "Rural Development Visit",
            date: "Aug 10, 2025",
            location: "Village Harsola",
            category: "Community",
            description: "Volunteers visited adopted village to spread awareness about digital literacy and hygiene."
        }
    ];

    return (
        <Section id="activities" className="bg-gray-50">
            <div className="text-center mb-16">
                <span className="text-nss-blue font-bold tracking-widest uppercase text-sm">What We Do</span>
                <h2 className="text-3xl md:text-4xl font-bold text-nss-navy mt-2">Recent Activities</h2>
                <div className="w-20 h-1 bg-nss-blue mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.map((event) => (
                    <div
                        key={event.id}
                        className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                    >
                        <div className="h-48 bg-gray-200 relative overflow-hidden">
                            <div className="absolute inset-0 bg-nss-navy/20 group-hover:bg-transparent transition-colors duration-300"></div>
                            {/* Image Placeholder */}
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                Event Image {event.id}
                            </div>
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-nss-navy uppercase tracking-wider">
                                {event.category}
                            </div>
                        </div>

                        <div className="p-6 flex flex-col flex-grow">
                            <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                                <div className="flex items-center gap-1">
                                    <Calendar size={14} className="text-nss-red" />
                                    <span>{event.date}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <MapPin size={14} className="text-nss-red" />
                                    <span>{event.location}</span>
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-nss-navy mb-3 group-hover:text-nss-blue transition-colors">
                                {event.title}
                            </h3>

                            <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">
                                {event.description}
                            </p>

                            <a href="#" className="inline-flex items-center gap-2 text-nss-red font-semibold text-sm hover:gap-3 transition-all">
                                Read More <ArrowRight size={16} />
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center mt-12">
                <a href="#" className="inline-block px-8 py-3 bg-nss-navy text-white rounded-full font-semibold hover:bg-nss-navy-light transition-colors shadow-lg">
                    View All Activities
                </a>
            </div>
        </Section>
    );
};

export default Activities;
