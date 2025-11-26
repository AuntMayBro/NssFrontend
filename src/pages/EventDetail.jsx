import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, ArrowLeft } from 'lucide-react';
import { client } from '@/lib/sanityClient';
import { queries } from '@/lib/queries';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from '@/components/Image';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(date);
};

const EventDetail = () => {
  const { slug } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await client.fetch(queries.eventBySlug, { slug });
        setEvent(data);
      } catch (error) {
        console.error('Error fetching event:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Loading event...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">Event not found</p>
            <Button asChild>
              <Link to="/events">Back to Events</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <div className="relative h-[400px] md:h-[500px]">
          <Image
            src={event.coverImage}
            alt={event.title}
            className="w-full h-full object-cover"
            eager={true}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container mx-auto">
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 mb-4"
              >
                <Link to="/events">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Events
                </Link>
              </Button>
              <h1 className="font-heading text-3xl md:text-5xl font-bold text-white mb-4">
                {event.title}
              </h1>
              <div className="flex flex-wrap gap-4 text-white/90">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  <time dateTime={event.date}>{formatDateTime(event.date)} IST</time>
                </div>
                {event.venue && (
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>{event.venue}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Description */}
              {event.description && (
                <div className="prose prose-lg max-w-none mb-12">
                  {event.description.map((block, index) => {
                    if (block._type === 'block') {
                      const text = block.children?.map(child => child.text).join('') || '';
                      return (
                        <p key={index} className="mb-4 text-foreground leading-relaxed">
                          {text}
                        </p>
                      );
                    }
                    return null;
                  })}
                </div>
              )}

              {/* Organizers */}
              {event.organizers && event.organizers.length > 0 && (
                <div className="mb-12">
                  <h2 className="font-heading text-2xl font-bold mb-6">Organized By</h2>
                  <div className="flex flex-wrap gap-4">
                    {event.organizers.map((organizer) => (
                      <div
                        key={organizer._id}
                        className="flex items-center space-x-3 bg-muted p-4 rounded-xl"
                      >
                        <Avatar>
                          <AvatarImage src={organizer.avatar} alt={organizer.name} />
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {getInitials(organizer.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{organizer.name}</p>
                          <p className="text-sm text-muted-foreground">{organizer.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Gallery */}
              {event.gallery && event.gallery.length > 0 && (
                <div>
                  <h2 className="font-heading text-2xl font-bold mb-6">Event Gallery</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {event.gallery.map((image, index) => (
                      <div key={index} className="aspect-square overflow-hidden rounded-xl">
                        <img
                          src={image.asset.url}
                          alt={`Event gallery ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default EventDetail;
