import { Video, Camera, Users, Share2, BarChart3, Package, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  { icon: Video, title: "VIDEO", category: "video", slug: "video", description: "Promo videá, reely, videoklipy, UGC a produktové videá pre tvoju značku." },
  { icon: Camera, title: "FOTO", category: "foto", slug: "foto", description: "Business, produktové a fashion fotografie na profesionálnej úrovni." },
  { icon: Users, title: "MODELS", category: "models", slug: "models", description: "Modely, herci, influenceri a speváci pre tvoje kampane." },
  { icon: Share2, title: "SPRÁVA SOCIÁLNYCH SIETÍ", category: "social", slug: "sprava-socialnych-sieti", description: "Kompletná správa tvojich sociálnych sietí a online prítomnosti." },
  { icon: BarChart3, title: "CONTENT STRATÉGIA", category: "strategy", slug: "content-strategia", description: "Stratégie pre zlatníctva, butiky, kozmetiku, reštaurácie a viac." },
  { icon: Package, title: "CONTENT BALÍKY", category: "packages", slug: "baliky", description: "Kombinované balíky prispôsobené tvojim potrebám a rozpočtu." },
];

const Services = () => {
  return (
    <section id="services" className="py-24">
      <div className="container">
        <span className="section-label">PONUKA</span>
        <h2 className="section-heading mt-3 mb-12">ČO Potrebuješ?</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <Link key={s.title} to={`/shop/${s.slug}`} className="card-service group cursor-pointer block">
              <div className="icon-circle mb-6">
                <s.icon size={22} />
              </div>
              <h3 className="font-heading text-xl font-bold mb-3">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                {s.description}
              </p>
              <span
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full border-2 border-primary text-primary font-semibold text-sm uppercase tracking-wide bg-transparent shadow-[0_8px_20px_-12px_rgba(0,0,0,0.4)] group-hover:-translate-y-[1px] group-hover:shadow-[0_14px_30px_-18px_rgba(0,0,0,0.6)] active:translate-y-[1px] active:shadow-[0_4px_12px_-8px_rgba(0,0,0,0.6)] transition-all"
              >
                Zobraziť produkty <ArrowRight size={16} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
