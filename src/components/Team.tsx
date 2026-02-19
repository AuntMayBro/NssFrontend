
import { useState, useEffect } from "react";
import { Linkedin, Mail, Loader2, ChevronDown, ChevronUp } from "lucide-react";
import Section from "./ui/Section";
import { client, urlFor } from "@/lib/sanity";
import { queries } from "@/lib/queries";
import { cn } from "@/lib/utils";

interface TeamMember {
    name: string;
    role: string;
    image: any; // Sanity image
    year: string;
    type: "current" | "previous" | "program_officer";
    linkedin?: string;
    email?: string;
}

const Team = () => {
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const data = await client.fetch(queries.team);
                setTeamMembers(data);
            } catch (error) {
                console.error("Failed to fetch team members:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTeam();
    }, []);

    const MemberCard = ({ member }: { member: TeamMember }) => (
        <div className="bg-white rounded-2xl p-3 md:p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center group h-full flex flex-col items-center">
            <div className="w-20 h-20 md:w-32 md:h-32 mx-auto rounded-full bg-gray-100 mb-3 md:mb-4 overflow-hidden border-2 md:border-4 border-gray-50 group-hover:border-nss-red/20 transition-colors relative">
                {member.image ? (
                    <img
                        src={urlFor(member.image).width(256).height(256).url()}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-200">
                        <span className="text-xl md:text-3xl font-bold text-gray-300">{member.name.charAt(0)}</span>
                    </div>
                )}
            </div>

            <h3 className="text-sm md:text-lg font-bold text-nss-navy mb-0.5 md:mb-1 leading-tight">{member.name}</h3>
            <span className="text-nss-red font-medium text-xs md:text-sm block mb-3 md:mb-4 leading-tight">{member.role}</span>

            <div className="flex justify-center gap-2 md:gap-3 mt-auto">
                {member.linkedin && (
                    <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 md:p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-[#0077b5] hover:text-white transition-colors"
                    >
                        <Linkedin size={14} className="md:w-4 md:h-4" />
                    </a>
                )}
                {member.email && (
                    <a
                        href={`mailto:${member.email}`}
                        className="p-1.5 md:p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-nss-red hover:text-white transition-colors"
                    >
                        <Mail size={14} className="md:w-4 md:h-4" />
                    </a>
                )}
            </div>
        </div>
    );

    return (
        <Section id="team" className="bg-gray-50">
            <div className="text-center mb-10 md:mb-16">
                <span className="text-nss-red font-bold tracking-widest uppercase text-sm">Leadership</span>
                <h2 className="text-3xl md:text-4xl font-bold text-nss-navy mt-2">Core Team</h2>
                <div className="w-20 h-1 bg-nss-red mx-auto mt-4 rounded-full"></div>
                <p className="text-gray-500 mt-4 max-w-2xl mx-auto px-4 text-sm md:text-base">
                    Meet the dedicated team leading our initiatives and driving change.
                </p>
            </div>

            {loading ? (
                <div className="flex justify-center py-12">
                    <Loader2 className="w-8 h-8 text-nss-red animate-spin" />
                </div>
            ) : (
                <div className="space-y-12 md:space-y-16">
                    {/* Current Team Grid */}
                    <div>
                        {teamMembers.length > 0 ? (
                            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-8">
                                {teamMembers.map((member, idx) => (
                                    <MemberCard key={idx} member={member} />
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-gray-500 italic">Current team members to be announced.</p>
                        )}
                    </div>

                    {/* Link to Previous Teams */}
                    <div className="flex justify-center mt-12 pt-8 border-t border-gray-200">
                        <a
                            href="/previous-teams"
                            className="inline-flex items-center gap-2 px-8 py-3 bg-white border border-gray-200 rounded-full text-nss-navy font-semibold hover:bg-nss-navy hover:text-white transition-all shadow-sm group"
                        >
                            View Previous Teams
                            <ChevronDown className="w-4 h-4 group-hover:-rotate-90 transition-transform" />
                        </a>
                    </div>
                </div>
            )}
        </Section>
    );
};

export default Team;
