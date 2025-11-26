import { useEffect, useState } from 'react';
import { client } from '@/lib/sanityClient';
import { queries } from '@/lib/queries';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TeamGrid from '@/components/TeamGrid';

const Team = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const data = await client.fetch(queries.teamMembers);
        setMembers(data);
      } catch (error) {
        console.error('Error fetching team:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
                Our Team
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Meet the dedicated volunteers and coordinators who make our mission possible. 
                Together, we're building a better community.
              </p>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading team members...</p>
              </div>
            ) : (
              <TeamGrid members={members} />
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Team;
