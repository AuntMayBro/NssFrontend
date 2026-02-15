
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import Section from './ui/Section';

const Contact = () => {
    return (
        <Section id="contact" className="bg-nss-navy text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

            <div className="relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                <div>
                    <span className="text-nss-gold font-bold tracking-widest uppercase text-sm">Get in Touch</span>
                    <h2 className="text-3xl md:text-5xl font-bold mt-2 mb-6">Join the Mission</h2>
                    <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                        Have questions or want to volunteer? Reach out to us. We are always looking for passionate individuals to join our cause.
                    </p>

                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-white/10 rounded-lg">
                                <MapPin className="text-nss-gold w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg">Visit Us</h4>
                                <p className="text-gray-400">Institute of Engineering and Technology, DAVV<br />Khandwa Road, Indore, MP</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-white/10 rounded-lg">
                                <Mail className="text-nss-gold w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg">Email Us</h4>
                                <p className="text-gray-400">nss@ietdavv.edu.in</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-white/10 rounded-lg">
                                <Phone className="text-nss-gold w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg">Call Us</h4>
                                <p className="text-gray-400">+91 123 456 7890</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-8 text-nss-navy shadow-2xl">
                    <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
                    <form className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">First Name</label>
                                <input type="text" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-nss-red/20 focus:border-nss-red transition-all" placeholder="John" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Last Name</label>
                                <input type="text" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-nss-red/20 focus:border-nss-red transition-all" placeholder="Doe" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Email Address</label>
                            <input type="email" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-nss-red/20 focus:border-nss-red transition-all" placeholder="john@example.com" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Message</label>
                            <textarea className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-nss-red/20 focus:border-nss-red transition-all h-32 resize-none" placeholder="How can we help?"></textarea>
                        </div>

                        <button type="submit" className="w-full py-3 bg-nss-red text-white font-bold rounded-lg hover:bg-nss-red-dark transition-all flex items-center justify-center gap-2">
                            Send Message <Send size={18} />
                        </button>
                    </form>
                </div>
            </div>
        </Section>
    );
};

export default Contact;
