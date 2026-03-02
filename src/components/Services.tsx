import { Video, Camera, Users, Share2, BarChart3, Package, ArrowRight } from "lucide-react";

const services = [
  { icon: Video, title: "VIDEO", description: "Promo videá, reely, videoklipy, UGC a produktové videá pre tvoju značku." },
  { icon: Camera, title: "FOTO", description: "Business, produktové a fashion fotografie na profesionálnej úrovni." },
  { icon: Users, title: "MODELS", description: "Modely, herci, influenceri a speváci pre tvoje kampane." },
  { icon: Share2, title: "SPRÁVA SOCIÁLNYCH SIETÍ", description: "Kompletná správa tvojich sociálnych sietí a online prítomnosti." },
  { icon: BarChart3, title: "CONTENT STRATÉGIA", description: "Stratégie pre zlatníctva, butiky, kozmetiku, reštaurácie a viac." },
  { icon: Package, title: "CONTENT BALÍKY", description: "Kombinované balíky prispôsobené tvojim potrebám a rozpočtu." },
];

const Services = () => {
  return (
    <section id="services" className="py-24">
      <div className="container">
        <span className="section-label">PONUKA</span>
        <h2 className="section-heading mt-3 mb-12">ČO Potrebuješ?</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <div key={s.title} className="card-service group cursor-pointer">
              <div className="icon-circle mb-6">
                <s.icon size={22} />
              </div>
              <h3 className="font-heading text-xl font-bold mb-3">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                {s.description}
              </p>
              <span className="inline-flex items-center gap-2 text-primary text-sm font-semibold group-hover:gap-3 transition-all">
                Viac Info <ArrowRight size={16} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
