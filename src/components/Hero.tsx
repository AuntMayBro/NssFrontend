
import { ArrowRight, ChevronDown, UserPlus, Search } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import Section from './ui/Section';
import { useState, useEffect } from 'react';
import { client, urlFor } from '@/lib/sanity'; // Import Sanity client

const Hero = () => {
    // Initial static images
    const [images, setImages] = useState<string[]>([
        "/assets/gp.jpeg"
    ]);

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Fetch Gallery Images from Sanity
    useEffect(() => {
        const fetchGalleryImages = async () => {
            try {
                const query = `*[_type == "gallery"] { image }`;
                const data = await client.fetch(query);

                if (data && data.length > 0) {
                    const sanityImages = data
                        .filter((item: any) => item.image) // Ensure image exists
                        .map((item: any) => urlFor(item.image).url()); // Get URL

                    // Append to existing images, avoiding duplicates if needed
                    setImages(prev => [...prev, ...sanityImages]);
                }
            } catch (error) {
                console.error("Failed to fetch gallery images for Hero slideshow:", error);
            }
        };

        fetchGalleryImages();
    }, []);

    // Slideshow Timer
    useEffect(() => {
        if (images.length <= 1) return; // Don't cycle if only 1 image

        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(interval);
    }, [images.length]); // Re-run when images array changes

    return (
        <Section id="home" className="relative min-h-screen flex flex-col pt-24 md:pt-32">

            {/* Top Content Section - Clean White Background */}
            <div className="flex-none w-full bg-white relative z-10 px-4 md:px-8 pb-12 md:pb-16 text-center">
                <div className="max-w-[85rem] mx-auto flex items-center justify-between">

                    {/* Left Image - Girl Sapling */}
                    <div className="hidden lg:block w-1/4 xl:w-1/3 animate-fade-right">
                        <img
                            src="/assets/girl-sapling.png"
                            alt="NSS Volunteer planting sapling"
                            className="w-full h-auto object-contain max-h-[400px]"
                        />
                        {/* Optional decorative element behind image */}
                        <div className="absolute top-1/2 left-10 w-32 h-32 bg-nss-green/10 rounded-full blur-3xl -z-10"></div>
                    </div>

                    {/* Center Content */}
                    <div className="flex-1 max-w-4xl mx-auto px-4">

                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-nss-navy/5 border border-nss-navy/10 mb-6 animate-fade-in mx-auto">
                            <span className="w-2 h-2 rounded-full bg-nss-red animate-pulse"></span>
                            <span className="text-xs font-bold tracking-wider text-nss-navy uppercase">Official Unit &bull; IET DAVV</span>
                        </div>

                        {/* Headline */}
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-heading text-nss-navy mb-6 leading-tight animate-fade-up">
                            NSS <span className="text-nss-red">IET DAVV</span>
                        </h1>

                        <p className="text-lg md:text-xl text-gray-600 mb-10 mx-auto leading-relaxed animate-fade-up font-light" style={{ animationDelay: '0.1s' }}>
                            "Not Me But You"<br />
                            Join the movement of youth leadership, community service, and nation-building.
                        </p>

                        {/* Action Buttons */}
                        <div className="flex flex-col justify-center items-center animate-fade-up mb-12" style={{ animationDelay: '0.2s' }}>

                            <Dialog>
                                <DialogTrigger asChild>
                                    <button
                                        className="group relative px-6 py-2.5 bg-nss-navy text-white rounded-md font-medium shadow-md shadow-nss-navy/20 hover:shadow-lg hover:-translate-y-0.5 transition-all overflow-hidden flex items-center justify-center gap-2 text-sm"
                                    >
                                        <span>Join NSS</span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        <div className="absolute inset-0 bg-white/10 translate-x-[-100%] skew-x-[-15deg] group-hover:animate-shine"></div>
                                    </button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-md">
                                    <DialogHeader>
                                        <DialogTitle>Join National Service Scheme</DialogTitle>
                                        <DialogDescription>
                                            Choose an option to proceed with your volunteer journey.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="flex flex-col gap-4 py-4">
                                        <a
                                            href="/registration"
                                            className="flex items-center justify-between p-4 rounded-lg border hover:bg-slate-50 transition-colors group"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-primary/10 rounded-full text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                                    <UserPlus className="w-5 h-5" />
                                                </div>
                                                <div className="text-left">
                                                    <p className="font-semibold text-foreground">New Registration</p>
                                                    <p className="text-sm text-muted-foreground">Register as a new volunteer</p>
                                                </div>
                                            </div>
                                            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                                        </a>

                                        <a
                                            href="/check-registration"
                                            className="flex items-center justify-between p-4 rounded-lg border hover:bg-slate-50 transition-colors group"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-primary/10 rounded-full text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                                    <Search className="w-5 h-5" />
                                                </div>
                                                <div className="text-left">
                                                    <p className="font-semibold text-foreground">Know Registration Number</p>
                                                    <p className="text-sm text-muted-foreground">Find your existing ID</p>
                                                </div>
                                            </div>
                                            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                                        </a>
                                    </div>
                                </DialogContent>
                            </Dialog>

                        </div>


                    </div>

                    {/* Right Image - NSS Volunteer */}
                    <div className="hidden lg:block w-1/4 xl:w-1/3 animate-fade-left">
                        <img
                            src="/assets/nss-vol.png"
                            alt="NSS Volunteers Group"
                            className="w-full h-auto object-contain max-h-[400px]"
                        />
                        {/* Optional decorative element behind image */}
                        <div className="absolute top-1/2 right-10 w-32 h-32 bg-nss-blue/10 rounded-full blur-3xl -z-10"></div>
                    </div>
                </div>
            </div>

            {/* Bottom Image Section - Slideshow */}
            <div className="flex-grow w-full relative min-h-[60vh] md:min-h-[75vh] bg-gray-100 overflow-hidden">
                <div className="absolute inset-0 bg-gray-100 animate-pulse"></div> {/* Placeholder */}

                {images.map((img, index) => (
                    <div
                        key={`${img}-${index}`}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                            }`}
                    >
                        <img
                            src={img}
                            alt={`NSS Slide ${index + 1}`}
                            className="w-full h-full object-cover object-top"
                        />
                    </div>
                ))}

                {/* Scroll Indicator Overlay on Image */}
                {/* <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer z-10">
                    <a href="/#about" className="text-white drop-shadow-md opacity-80 hover:opacity-100 transition-opacity p-2 bg-black/20 backdrop-blur-sm rounded-full">
                        <ChevronDown className="w-6 h-6" />
                    </a>
                </div> */}
            </div>

        </Section>
    );
};

export default Hero;
