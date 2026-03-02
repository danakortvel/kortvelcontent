const clientLogos = [
  "Studio XY", "FreshBrand", "GlowUp", "UrbanWear",
  "TechNova", "BioNature", "LuxHome", "VelvetStyle",
];

const Clients = () => {
  return (
    <section className="py-24">
      <div className="container">
        <span className="section-label">SPOKOJNÍ</span>
        <h2 className="section-heading mt-3 mb-12">KLIENTI</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {clientLogos.map((name) => (
            <div key={name} className="card-client h-24 cursor-pointer">
              <span className="font-heading text-lg font-bold text-foreground/60 group-hover:text-foreground transition-colors">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;
