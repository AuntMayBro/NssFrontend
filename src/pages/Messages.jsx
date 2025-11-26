import { useEffect, useState } from 'react';
import { client } from '@/lib/sanityClient';
import { queries } from '@/lib/queries';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Quote } from 'lucide-react';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await client.fetch(queries.messages);
        setMessages(data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

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
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
                Volunteer Testimonials
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Hear from our volunteers about their experiences and the impact NSS has 
                made on their lives and communities.
              </p>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading testimonials...</p>
              </div>
            ) : messages.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No testimonials available yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {messages.map((message) => (
                  <Card key={message._id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <Quote className="h-8 w-8 text-primary/20 mb-4" />
                      <p className="text-muted-foreground mb-6 italic leading-relaxed">
                        "{message.text}"
                      </p>
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage 
                            src={message.photo?.asset?.url} 
                            alt={message.name} 
                          />
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {getInitials(message.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{message.name}</p>
                          <p className="text-sm text-muted-foreground">{message.year}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Messages;
