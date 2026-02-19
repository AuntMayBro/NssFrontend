import React from "react";
import { Mail, Linkedin, Twitter } from "lucide-react";
import LetterGlitch from "@/components/ui/letterGlitch";
import cloudinaryImage from "@/lib/cloudinary";

interface Developer {
  id: string;
  avatar: string;
  name: string;
  role: string;
  email?: string;
  social?: { platform: string; url: string }[];
}

function Developers() {
  const developers: Developer[] = [
    {
      id: "1",
      name: "Aditya Baghri",
      role: "Full Stack Developer",
      email: "aditya@example.com",
      avatar: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
      social: [
        { platform: "linkedin", url: "https://linkedin.com" },
        { platform: "twitter", url: "https://twitter.com" },
      ],
    },
    {
      id: "2",
      name: "Kanha Agrawal",
      role: "Backend Developer",
      email: "kanhaagrawal272@gmail.com",
      avatar: "https://res.cloudinary.com/demo/image/upload/people.jpg",
      social: [
        { platform: "linkedin", url: "https://linkedin.com" },
        { platform: "twitter", url: "https://twitter.com" },
      ],
    },
    {
      id: "3",
      name: "Awadh Shukla",
      role: "Frontend Developer",
      email: "rahul@example.com",
      avatar: "https://res.cloudinary.com/demo/image/upload/coffee.jpg",
      social: [
        { platform: "linkedin", url: "https://linkedin.com" },
        { platform: "twitter", url: "https://twitter.com" },
      ],
    },
    {
      id: "4",
      name: "Khushi Barkur",
      role: "UI/UX Designer",
      email: "ananya@example.com",
      avatar: "https://res.cloudinary.com/demo/image/upload/woman.jpg",
      social: [
        { platform: "linkedin", url: "https://linkedin.com" },
        { platform: "twitter", url: "https://twitter.com" },
      ],
    },
    {
      id: "5",
      name: "Aditya Sahu",
      role: "Data Engineer",
      email: "sakshi@example.com",
      avatar: "sample.jpg",
      social: [
        { platform: "linkedin", url: "https://linkedin.com" },
        { platform: "twitter", url: "https://twitter.com" },
      ],
    },
  ];

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "linkedin":
        return <Linkedin className="w-5 h-5 text-white" />;
      case "twitter":
        return <Twitter className="w-5 h-5 text-white" />;
      case "email":
        return <Mail className="w-5 h-5 text-white" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-nss-navy via-nss-navy to-black">
      {/* Developer Team Section with LetterGlitch background */}
      <div className="relative overflow-hidden">
        {/* LetterGlitch as background (absolute) */}
        <div className="pointer-events-none absolute inset-0 z-0 w-screen h-screen">
          <LetterGlitch
            fullscreen={true}
            glitchColors={["#22c55e", "#16a34a"]}
            glitchSpeed={80}
            centerVignette={false}
            outerVignette={false}
            smooth={true}
          />
        </div>

        {/* uniform fixed dark overlay to improve contrast across the viewport */}
        <div className="fixed inset-0 z-10 bg-black/60 pointer-events-none" />

        <div className="relative z-20 container mx-auto max-w-7xl px-4 py-20">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight">
              Developers <span className="text-nss-gold">Team</span>
            </h1>
            <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto mt-4">
              Meet the talented developers building the digital experiences for
              NSS.
            </p>
          </div>

          {/* Developer Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {developers.map((dev) => (
              <article
                key={dev.id}
                className="relative bg-gradient-to-br from-white/6 to-white/3 backdrop-blur-lg border border-white/8 rounded-2xl p-8 flex flex-col items-center text-center hover:-translate-y-3 hover:shadow-2xl transition-transform duration-300 shadow-lg hover:ring-1 hover:ring-nss-gold/30"
                aria-labelledby={`dev-${dev.id}`}
              >
                <div className="absolute -top-6 w-24 h-24 rounded-full overflow-hidden flex items-center justify-center bg-gradient-to-tr from-nss-blue to-nss-gold border-4 border-white/10 shadow-2xl">
                  {dev.avatar ? (
                    <img
                      src={cloudinaryImage(dev.avatar, 192, 192)}
                      alt={dev.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-2xl md:text-3xl font-extrabold text-white select-none">
                      {dev.name.charAt(0)}
                    </span>
                  )}
                </div>

                <div className="mt-12 mb-4">
                  <h3
                    id={`dev-${dev.id}`}
                    className="text-lg md:text-xl font-semibold text-white"
                  >
                    {dev.name}
                  </h3>
                  <p className="text-nss-gold text-xs md:text-sm uppercase tracking-wider mt-1">
                    {dev.role}
                  </p>
                </div>

                <p className="text-sm text-gray-300 mb-4 md:mb-6 hidden md:block">
                  NSS IET DAVV
                </p>

                <div className="flex items-center gap-3 mt-auto">
                  {dev.email && (
                    <a
                      href={`mailto:${dev.email}`}
                      className="p-2.5 w-10 h-10 rounded-md bg-white/6 hover:bg-nss-blue transition-colors flex items-center justify-center"
                    >
                      <Mail className="w-5 h-5 text-white" />
                    </a>
                  )}
                  {dev.social?.map((social, idx) => (
                    <a
                      key={idx}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 w-10 h-10 rounded-md bg-white/6 hover:bg-nss-blue transition-colors flex items-center justify-center text-white"
                    >
                      {getSocialIcon(social.platform)}
                    </a>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Developers;
