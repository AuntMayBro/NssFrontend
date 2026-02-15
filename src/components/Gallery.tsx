import { useState, useEffect } from 'react';
import Section from './ui/Section';
import { client, urlFor } from '@/lib/sanity';
import { Loader2 } from 'lucide-react';

interface GalleryItem {
    _id: string;
    title: string;
    image: any;
    eventDate: string;
}

const Gallery = () => {
    const [images, setImages] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const query = `*[_type == "gallery"] | order(eventDate desc) {
          _id,
          title,
          image,
          eventDate
        }`;
                const data = await client.fetch(query);
                setImages(data);
            } catch (error) {
                console.error("Failed to fetch gallery:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchGallery();
    }, []);

    return (
        <Section id="gallery" className="bg-white">
            <div className="text-center mb-16">
                <span className="text-nss-gold font-bold tracking-widest uppercase text-sm">Memories</span>
                <h2 className="text-3xl md:text-4xl font-bold text-nss-navy mt-2">Gallery</h2>
                <div className="w-20 h-1 bg-nss-gold mx-auto mt-4 rounded-full"></div>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="w-10 h-10 text-nss-navy animate-spin" />
                </div>
            ) : images.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[200px]">
                    {images.map((item, idx) => (
                        <div
                            key={item._id}
                            className={`rounded-xl overflow-hidden relative group cursor-pointer ${idx === 0 || idx === 3 ? 'md:col-span-2' : ''}`}
                        >
                            <div className="w-full h-full bg-gray-200 transition-transform duration-500 group-hover:scale-110">
                                {item.image && (
                                    <img
                                        src={urlFor(item.image).width(800).height(600).url()}
                                        alt={item.title || "Gallery Image"}
                                        className="w-full h-full object-cover"
                                    />
                                )}
                            </div>

                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                <span className="text-white font-bold text-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    {item.title}
                                </span>
                                <span className="text-gray-300 text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                                    NSS IET DAVV
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-gray-50 rounded-xl border border-gray-100 border-dashed">
                    <p className="text-gray-400">No images found in the gallery.</p>
                </div>
            )}
        </Section>
    );
};

export default Gallery;
