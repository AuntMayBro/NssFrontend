import { useEffect, useState } from 'react';
import { client } from '@/lib/sanityClient';
import { queries } from '@/lib/queries';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from '@/components/Image';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const data = await client.fetch(queries.gallery);
        setImages(data);
      } catch (error) {
        console.error('Error fetching gallery:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
                Gallery
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Moments captured from our events and activities. Each photo tells a story 
                of service, dedication, and community impact.
              </p>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading gallery...</p>
              </div>
            ) : images.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No images available yet.</p>
              </div>
            ) : (
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
                {images.map((item) => (
                  <div
                    key={item._id}
                    className="break-inside-avoid cursor-pointer group"
                    onClick={() => setSelectedImage(item)}
                  >
                    <div className="relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-shadow">
                      <Image
                        src={item.image}
                        alt={item.caption || 'NSS Event'}
                        className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {item.caption && (
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                          <p className="text-white text-sm">{item.caption}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white text-xl font-bold hover:text-accent transition-colors"
              aria-label="Close"
            >
              ✕ Close
            </button>
            <img
              src={selectedImage.image}
              alt={selectedImage.caption || 'NSS Event'}
              className="w-full h-auto rounded-lg"
            />
            {selectedImage.caption && (
              <div className="mt-4 text-white text-center">
                <p className="text-lg">{selectedImage.caption}</p>
                {selectedImage.event && (
                  <p className="text-sm text-white/70 mt-2">
                    Event: {selectedImage.event.title}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Gallery;
