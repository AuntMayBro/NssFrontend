
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-nss-navy-light text-white pt-16 pb-8 border-t border-white/5 font-sans">
            <div className="container mx-auto px-4 md:px-8">
                <div className="grid md:grid-cols-4 gap-8 mb-12">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                                <span className="text-nss-navy font-bold">NSS</span>
                            </div>
                            <span className="font-heading font-bold text-xl tracking-tight">NSS IET DAVV</span>
                        </div>
                        <p className="text-gray-400 max-w-sm leading-relaxed mb-6 font-light">
                            National Service Scheme, Institute of Engineering and Technology, Devi Ahilya Vishwavidyalaya.
                            <br />
                            <span className="italic text-gray-300">"Not Me But You"</span>
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-nss-blue hover:text-white transition-all hover:-translate-y-1">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-pink-600 hover:text-white transition-all hover:-translate-y-1">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-400 hover:text-white transition-all hover:-translate-y-1">
                                <Twitter size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-700 hover:text-white transition-all hover:-translate-y-1">
                                <Linkedin size={20} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-6 text-nss-gold relative inline-block after:content-[''] after:absolute after:left-0 after:-bottom-2 after:w-8 after:h-0.5 after:bg-nss-gold">Quick Links</h4>
                        <ul className="space-y-3">
                            <li><a href="/#home" className="text-gray-400 hover:text-white transition-colors hover:pl-2">Home</a></li>
                            <li><a href="/#about" className="text-gray-400 hover:text-white transition-colors hover:pl-2">About Us</a></li>
                            <li><a href="/activities" className="text-gray-400 hover:text-white transition-colors hover:pl-2">Activities</a></li>
                            <li><a href="/#gallery" className="text-gray-400 hover:text-white transition-colors hover:pl-2">Gallery</a></li>
                            <li><a href="/#contact" className="text-gray-400 hover:text-white transition-colors hover:pl-2">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-6 text-nss-gold relative inline-block after:content-[''] after:absolute after:left-0 after:-bottom-2 after:w-8 after:h-0.5 after:bg-nss-gold">Resources</h4>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors hover:pl-2">Student Registration</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors hover:pl-2">NSS Manual</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors hover:pl-2">Annual Reports</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors hover:pl-2">Volunteer Login</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 text-center md:flex md:justify-between md:items-center text-gray-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} NSS IET DAVV. All rights reserved.</p>
                    <p className="flex items-center justify-center gap-1 mt-2 md:mt-0">Designed with <span className="text-red-500">❤️</span> by NSS Web Team</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
