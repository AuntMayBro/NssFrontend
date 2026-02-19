
import { Target, Users, Globe, BookOpen } from 'lucide-react';
import Section from './ui/Section';

const About = () => {
    const cards = [
        {
            icon: <Users className="w-10 h-10 text-nss-red" />,
            title: "Community Service",
            description: "Engaging in activities that uplift the community and foster social responsibility."
        },
        {
            icon: <Target className="w-10 h-10 text-nss-blue" />,
            title: "Personality Development",
            description: "Building character, leadership, and discipline through selfless service and teamwork."
        },
        {
            icon: <Globe className="w-10 h-10 text-nss-gold" />,
            title: "Nation Building",
            description: "Contributing to the development of the nation by empowering youth and addressing social issues."
        },
        {
            icon: <BookOpen className="w-10 h-10 text-nss-navy" />,
            title: "Education & Awareness",
            description: "Spreading awareness about health, hygiene, education, and social rights."
        }
    ];

    return (
        <Section id="about" className="bg-white">
            <div className="text-center mb-16">
                <span className="text-nss-red font-bold tracking-widest uppercase text-sm">Who We Are</span>
                <h2 className="text-3xl md:text-4xl font-bold text-nss-navy mt-2">About NSS IET DAVV</h2>
                <div className="w-20 h-1 bg-nss-red mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
                <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-nss-navy-light">The Motto</h3>
                    <p className="text-gray-600 text-lg leading-relaxed border-l-4 border-nss-gold pl-4 italic">
                        "Not Me But You"
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                        Reflecting the essence of democratic living and upholds the need for self-less service. NSS helps the students develop appreciation to other person's point of view and also show consideration to other living beings.
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                        The National Service Scheme (NSS) is a Central Sector Scheme of Government of India, Ministry of Youth Affairs & Sports. It provides an opportunity to the student youth of 11th & 12th Class of schools at +2 Board level and student youth of Technical Institution, Graduate & Post Graduate level universities and Colleges of India to take part in various government led community service activities & programmes.
                    </p>
                </div>
                <div className="glass-card p-2 rounded-2xl bg-gray-50 border border-gray-100 shadow-xl rotate-2 hover:rotate-0 transition-transform duration-500">
                    <div className="aspect-video rounded-xl overflow-hidden relative group">
                        <img
                            src="/assets/gp.jpeg"
                            alt="NSS Group Photo"
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-tr from-nss-navy/20 to-transparent"></div>
                    </div>
                </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className="p-4 md:p-6 rounded-xl border border-gray-100 bg-white hover:shadow-lg hover:-translate-y-2 transition-all duration-300 group"
                    >
                        <div className="mb-3 md:mb-4 bg-gray-50 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                            <div className="scale-75 md:scale-100 transform">
                                {card.icon}
                            </div>
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-nss-navy mb-2 md:mb-3 group-hover:text-nss-red transition-colors">{card.title}</h3>
                        <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                            {card.description}
                        </p>
                    </div>
                ))}
            </div>
        </Section>
    );
};

export default About;
