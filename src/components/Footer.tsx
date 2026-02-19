
import { Facebook, Instagram, Linkedin, Twitter, Youtube, MapPin, Mail, Phone } from 'lucide-react';

const Footer = () => {
    return (
        <footer id="contact" className="bg-nss-navy-light text-white pt-10 md:pt-16 pb-8 border-t border-white/5 font-sans">
            <div className="container mx-auto px-4 md:px-8">
                <div className="grid md:grid-cols-12 gap-8 mb-8 md:mb-12">
                    <div className="md:col-span-8">
                        <h4 className="font-bold text-2xl md:text-3xl mb-6 md:mb-8 text-white tracking-tight">Contact Us</h4>

                        <div className="grid md:grid-cols-2 gap-8 mb-8">
                            <div className="space-y-6">
                                <a href="https://www.google.com/maps/search/?api=1&query=22.680611,75.881667" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group cursor-pointer">
                                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-nss-gold group-hover:bg-nss-gold group-hover:text-nss-navy transition-all duration-300 shrink-0">
                                        <MapPin size={22} />
                                    </div>
                                    <div>
                                        <h5 className="font-semibold text-lg mb-1 group-hover:text-nss-gold transition-colors">Visit Us</h5>
                                        <p className="text-gray-400 leading-relaxed text-sm group-hover:text-white transition-colors">
                                            NSS Office, 1st Floor, E-Block<br />
                                            IET DAVV, Indore, Madhya Pradesh, IN
                                        </p>
                                    </div>
                                </a>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4 group">
                                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-nss-gold group-hover:bg-nss-gold group-hover:text-nss-navy transition-all duration-300 shrink-0">
                                        <Mail size={22} />
                                    </div>
                                    <div>
                                        <h5 className="font-semibold text-lg mb-1 group-hover:text-nss-gold transition-colors">Email Us</h5>
                                        <a href="mailto:tsarsodia@ietdavv.edu.in" className="text-gray-400 hover:text-white transition-colors text-sm block">tsarsodia@ietdavv.edu.in</a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 group">
                                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-nss-gold group-hover:bg-nss-gold group-hover:text-nss-navy transition-all duration-300 shrink-0">
                                        <Phone size={22} />
                                    </div>
                                    <div>
                                        <h5 className="font-semibold text-lg mb-1 group-hover:text-nss-gold transition-colors">Call Us</h5>
                                        <a href="tel:07312361116" className="text-gray-400 hover:text-white transition-colors text-sm block">+91 7312361116</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8 border-t border-white/5">
                            <h5 className="font-semibold text-sm text-gray-500 mb-6 uppercase tracking-wider">Connect With Us</h5>
                            <div className="flex gap-4">
                                <a href="https://www.instagram.com/nss.ietdavv/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white hover:bg-gradient-to-br hover:from-orange-500 hover:via-pink-500 hover:to-purple-600 hover:scale-110 transition-all duration-300 group">
                                    <Instagram size={22} className="group-hover:stroke-2" />
                                </a>
                                <a href="https://www.facebook.com/people/NSS-IET-DAVV-Indore/61577540614127/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white hover:bg-blue-600 hover:scale-110 transition-all duration-300 group">
                                    <Facebook size={22} className="group-hover:stroke-2" />
                                </a>
                                <a href="https://x.com/nssunitietdavv" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white hover:bg-sky-500 hover:scale-110 transition-all duration-300 group">
                                    <Twitter size={22} className="group-hover:stroke-2" />
                                </a>
                                <a href="https://www.youtube.com/@nationalserviceschemedavv81" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white hover:bg-red-600 hover:scale-110 transition-all duration-300 group">
                                    <Youtube size={22} className="group-hover:stroke-2" />
                                </a>
                                <a href="https://www.linkedin.com/in/nss-iet-davv/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white hover:bg-blue-700 hover:scale-110 transition-all duration-300 group">
                                    <Linkedin size={22} className="group-hover:stroke-2" />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-4">
                        <h4 className="font-bold text-lg mb-6 text-nss-gold relative inline-block after:content-[''] after:absolute after:left-0 after:-bottom-2 after:w-8 after:h-0.5 after:bg-nss-gold">Quick Links</h4>
                        <ul className="grid grid-cols-2 gap-x-4 gap-y-3">
                            <li><a href="/#home" className="text-gray-400 hover:text-white transition-colors hover:pl-2">Home</a></li>
                            <li><a href="/registration" className="text-gray-400 hover:text-white transition-colors hover:pl-2">Register</a></li>
                            <li><a href="/activities" className="text-gray-400 hover:text-white transition-colors hover:pl-2">Activities</a></li>
                            <li><a href="/mentors" className="text-gray-400 hover:text-white transition-colors hover:pl-2">Mentors</a></li>
                            <li><a href="/resources" className="text-gray-400 hover:text-white transition-colors hover:pl-2">Resources</a></li>
                            <li><a href="/#team" className="text-gray-400 hover:text-white transition-colors hover:pl-2">Developers</a></li>
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
