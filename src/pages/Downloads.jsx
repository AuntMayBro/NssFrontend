import { useEffect, useState } from 'react';
import { Download, FileText } from 'lucide-react';
import { client } from '@/lib/sanityClient';
import { queries } from '@/lib/queries';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Downloads = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await client.fetch(queries.siteSettings);
        setSettings(data);
      } catch (error) {
        console.error('Error fetching downloads:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const downloads = settings?.downloads || [];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
                Downloads
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Access important documents, reports, and resources related to NSS activities 
                and initiatives.
              </p>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading downloads...</p>
              </div>
            ) : downloads.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No downloads available at the moment.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {downloads.map((item, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="p-3 rounded-xl bg-primary/10 flex-shrink-0">
                          <FileText className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold mb-2 line-clamp-2">
                            {item.title}
                          </h3>
                          {item.file?.size && (
                            <p className="text-sm text-muted-foreground mb-4">
                              Size: {(item.file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          )}
                          <Button asChild size="sm" className="w-full">
                            <a
                              href={item.file?.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              download
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </a>
                          </Button>
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

export default Downloads;
