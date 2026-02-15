
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import nssLogo from '../assets/nss-logo.webp';
import davvLogo from '../assets/davv-logo.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '/#home' },
        { name: 'About', href: '/#about' },
        { name: 'Activities', href: '/activities' }, // Point to the separate page
        { name: 'Gallery', href: '/#gallery' },
        { name: 'Team', href: '/#team' },
        { name: 'Contact', href: '/#contact' },
    ];

    return (
        <nav className={cn(
            "fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full font-sans",
            scrolled ? "bg-white/90 backdrop-blur-md shadow-md py-2" : "bg-transparent py-4"
        )}>
            <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">

                {/* Left Side: Logos */}
                <div className="flex items-center gap-4 md:gap-6">
                    {/* Indian Flag Vector (Simplified CSS Representation or SVG) */}
                    <div className="w-10 h-7 md:w-12 md:h-8 flex flex-col shadow-sm border border-gray-200" title="Indian Flag">
                        <div className="h-1/3 bg-[#FF9933]"></div>
                        <div className="h-1/3 bg-white flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full border border-[#000080] flex items-center justify-center">
                                <div className="w-0.5 h-0.5 bg-[#000080] rounded-full"></div>
                            </div>
                        </div>
                        <div className="h-1/3 bg-[#138808]"></div>
                    </div>

                    <div className="h-8 w-px bg-gray-300 self-center hidden sm:block"></div>

                    {/* NSS Logo */}
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border border-gray-100 shadow-sm flex items-center justify-center bg-white group">
                        <img src={nssLogo} alt="NSS Logo" className="w-full h-full object-contain p-1" />
                    </div>

                    {/* DAVV Logo */}
                    <div className="hidden sm:flex w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border border-gray-100 shadow-sm items-center justify-center bg-white group">
                        <img src={davvLogo} alt="DAVV Logo" className="w-full h-full object-contain p-1" />
                    </div>

                    {/* Text for Mobile/Desktop */}
                    <div className="flex flex-col">
                        <span className={cn(
                            "font-heading font-bold text-sm md:text-lg leading-tight transition-colors duration-300",
                            "text-nss-navy" // Always dark now
                        )}>
                            NSS IET DAVV
                        </span>
                        <span className={cn(
                            "text-[10px] md:text-xs font-medium tracking-wider uppercase transition-colors duration-300 hidden sm:block",
                            "text-nss-navy/80" // Always dark now
                        )}>
                            Not Me But You
                        </span>
                    </div>
                </div>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center gap-6 xl:gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className={cn(
                                "font-medium text-sm tracking-wide transition-all duration-300 hover:-translate-y-0.5 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-nss-red after:transition-all after:duration-300 hover:after:w-full",
                                scrolled ? "text-nss-navy hover:text-nss-red" : "text-nss-navy hover:text-nss-red" // Ensure visibility in light theme
                            )}
                        >
                            {link.name}
                        </a>
                    ))}
                    <a
                        href="/#contact"
                        className={cn(
                            "px-5 py-2 rounded-md font-semibold text-sm transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 border",
                            scrolled
                                ? "bg-nss-red text-white border-nss-red hover:bg-nss-red-dark"
                                : "bg-nss-navy text-white border-nss-navy hover:bg-nss-blue" // Dark button for contrast
                        )}
                    >
                        Join Now
                    </a>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="lg:hidden p-2 focus:outline-none z-50 relative rounded-md transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? (
                        <X className="text-white" size={28} /> // Keep white as it's over the dark overlay
                    ) : (
                        <Menu className={cn(
                            "transition-colors",
                            "text-nss-navy" // Always dark
                        )} size={28} />
                    )}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={cn(
                "fixed inset-0 bg-nss-navy/95 backdrop-blur-xl z-40 lg:hidden transition-all duration-300 flex flex-col justify-center items-center gap-8",
                isOpen ? "opacity-100 pointer-events-auto translate-x-0" : "opacity-0 pointer-events-none translate-x-full"
            )}>
                {navLinks.map((link) => (
                    <a
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="text-xl font-heading font-medium text-white/90 hover:text-white hover:scale-105 transition-all"
                    >
                        {link.name}
                    </a>
                ))}
                <a
                    href="/#contact"
                    onClick={() => setIsOpen(false)}
                    className="px-8 py-3 rounded-full bg-nss-red text-white font-bold text-lg shadow-lg hover:bg-nss-red-dark transition-all mt-4 w-48 text-center"
                >
                    Join Now
                </a>
            </div>
        </nav>
    );
};

export default Navbar;
