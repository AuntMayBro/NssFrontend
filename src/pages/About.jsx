import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Target, Users, Heart, Award } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Target,
      title: 'Our Vision',
      description: 'To develop students into responsible citizens through community service and social development activities.',
    },
    {
      icon: Users,
      title: 'Community First',
      description: 'We believe in putting community needs first and working together to create lasting positive impact.',
    },
    {
      icon: Heart,
      title: 'Service with Heart',
      description: 'Our work is driven by genuine care and commitment to improving lives and building better communities.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for excellence in every initiative, ensuring quality impact and sustainable change.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-primary/10 via-background to-accent/10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">
                About NSS IET DAVV
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                The National Service Scheme (NSS) at IET DAVV has been a cornerstone of 
                student development and community service since its inception. We are committed 
                to fostering social responsibility and leadership through meaningful action.
              </p>
            </div>
          </div>
        </section>

        {/* History Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6 text-center">
                Our History
              </h2>
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  The National Service Scheme (NSS) was launched in 1969 with the primary objective 
                  of developing the personality and character of students through voluntary community 
                  service. At IET DAVV, NSS has been an integral part of student life, providing 
                  opportunities for personal growth and social development.
                </p>
                <p>
                  Over the years, our unit has organized numerous camps, awareness programs, and 
                  community development initiatives. From tree plantation drives to blood donation 
                  camps, from literacy programs to disaster relief efforts, our volunteers have 
                  consistently demonstrated their commitment to serving society.
                </p>
                <p>
                  Today, NSS IET DAVV stands as one of the most active and impactful student 
                  organizations on campus, with a proud legacy of creating positive change in 
                  our community.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Grid */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-12 text-center">
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div
                    key={index}
                    className="bg-card p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="p-3 rounded-xl bg-primary/10 w-fit mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-heading text-xl font-semibold mb-2">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Motto Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              "NOT ME, BUT YOU"
            </h2>
            <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
              Our motto reflects the spirit of selfless service that drives every NSS volunteer. 
              It's about putting others first and working together for the greater good of society.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
