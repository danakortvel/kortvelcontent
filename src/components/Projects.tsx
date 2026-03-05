import { ExternalLink } from "lucide-react";

const projects = [
  {
    name: "zoznamuju.sk",
    description:
      "Platforma, kde sa ľudia stretávajú — či už hľadáš niekoho špeciálneho alebo len chceš zažiť niečo nové. Zoznamovanie, eventy a momenty, na ktoré sa nezabúda.",
    url: "https://zoznamuju.sk",
  },
  {
    name: "Adikt.sk",
    description: "Statement fashion project & concept store — móda ako postoj, nie len oblečenie.",
    url: "https://adikt.sk",
  },
];

const Projects = () => {
  return (
    <section className="py-24">
      <div className="container">
        <span className="section-label">PROJEKTY</span>
        <h2 className="section-heading mt-3 mb-12">Moje Projekty</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((p) => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="card-service group flex items-center justify-between"
            >
              <div>
                <h3 className="font-heading text-2xl font-bold">{p.name}</h3>
                <p className="text-muted-foreground mt-2">{p.description}</p>
              </div>
              <ExternalLink className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" size={24} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
