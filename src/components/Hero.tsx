import { Facebook, Instagram, Youtube, Linkedin } from "lucide-react";
import heroDana from "@/assets/hero-dana.png";

const socials = [
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
];

const Hero = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center pt-16">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div className="space-y-8">
            <div>
              <span className="section-label">NAŠIEL SI MA…</span>
              <h1 className="section-heading mt-4">
                Ahoj som Dana Kortvel a tvorím tvoj{" "}
                <em className="italic font-bold">content.</em>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-lg">
                Pomáham značkám a podnikateľom budovať silnú online prítomnosť
                prostredníctvom profesionálneho obsahu, sociálnych sietí a
                kreatívnej stratégie.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="#services"
                className="inline-flex items-center px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                PONUKA
              </a>
              <a
                href="#contact"
                className="inline-flex items-center px-8 py-3 rounded-full border-2 border-primary text-primary font-semibold text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                VIAC O MNE
              </a>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <span className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                Sleduj ma
              </span>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label={s.label}
                >
                  <s.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-80 md:w-96 lg:w-[420px] rounded-3xl overflow-hidden">
                <img
                  src={heroDana}
                  alt="Dana Kortvel — Content Creator"
                  className="w-full h-auto object-cover"
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full border-4 border-primary opacity-20" />
              <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full border-4 border-accent opacity-20" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
