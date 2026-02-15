
import { useState, useEffect } from "react";
import { Linkedin, Mail, Loader2, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/ui/Section";
import { client, urlFor } from "@/lib/sanity";
import { Link } from "react-router-dom";

interface TeamMember {
    name: string;
    role: string;
    image: any;
    year: string;
    type: "current" | "previous" | "program_officer";
    linkedin?: string;
    email?: string;
}

const PreviousTeams = () => {
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const query = `*[_type == "team" && type == "previous"] | order(year desc, name asc) {
          name,
          role,
          image,
          year,
          type,
          linkedin,
          email
        }`;
                const data = await client.fetch(query);
                setTeamMembers(data);
            } catch (error) {
                console.error("Failed to fetch previous team members:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTeam();
    }, []);

    // Group previous team by year
    const previousTeamByYear = teamMembers.reduce((acc, member) => {
        if (!acc[member.year]) {
            acc[member.year] = [];
        }
        acc[member.year].push(member);
        return acc;
    }, {} as Record<string, TeamMember[]>);

    const sortedYears = Object.keys(previousTeamByYear).sort((a, b) => b.localeCompare(a));

    const MemberCard = ({ member }: { member: TeamMember }) => (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center group h-full flex flex-col items-center">
            <div className="w-32 h-32 mx-auto rounded-full bg-gray-100 mb-4 overflow-hidden border-4 border-gray-50 group-hover:border-nss-red/20 transition-colors relative">
                {member.image ? (
                    <img
                        src={urlFor(member.image).width(256).height(256).url()}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-200">
                        <span className="text-3xl font-bold text-gray-300">{member.name.charAt(0)}</span>
                    </div>
                )}
            </div>

            <h3 className="text-lg font-bold text-nss-navy mb-1">{member.name}</h3>
            <span className="text-nss-red font-medium text-sm block mb-4">{member.role}</span>

            <div className="flex justify-center gap-3 mt-auto opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                {member.linkedin && (
                    <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-[#0077b5] hover:text-white transition-colors"
                    >
                        <Linkedin size={16} />
                    </a>
                )}
                {member.email && (
                    <a
                        href={`mailto:${member.email}`}
                        className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-nss-red hover:text-white transition-colors"
                    >
                        <Mail size={16} />
                    </a>
                )}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-foreground">
            <Navbar />

            <div className="bg-nss-navy pt-32 pb-16 text-white text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-white/5 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
                <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4 relative z-10">Previous Teams</h1>
                <p className="text-gray-300 max-w-2xl mx-auto px-4 relative z-10">
                    Honoring the legacy of our past volunteers and leaders.
                </p>
            </div>

            <Section className="py-12">
                <div className="mb-8">
                    <Link to="/#team" className="inline-flex items-center gap-2 text-nss-navy font-semibold hover:text-nss-red transition-colors">
                        <ArrowLeft size={20} />
                        Back to Current Team
                    </Link>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-10 h-10 text-nss-red animate-spin" />
                    </div>
                ) : sortedYears.length > 0 ? (
                    <div className="space-y-16">
                        {sortedYears.map((year) => (
                            <div key={year} className="relative">
                                <div className="flex items-center gap-4 mb-8">
                                    <h2 className="text-3xl font-bold text-nss-navy/80 font-heading">Session {year}</h2>
                                    <div className="h-px bg-gray-200 flex-grow"></div>
                                </div>
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                    {previousTeamByYear[year].map((member, idx) => (
                                        <MemberCard key={`${year}-${idx}`} member={member} />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-xl border border-gray-100 border-dashed">
                        <p className="text-gray-400 text-lg">No previous team records found.</p>
                    </div>
                )}
            </Section>

            <Footer />
        </div>
    );
};

export default PreviousTeams;
