import { ExternalLink } from "lucide-react";

const projects = [
  {
    name: "Zoznamu",
    description: "Komplexný online portál s profesionálnym obsahom a stratégiou.",
    url: "https://zoznamu.sk",
  },
  {
    name: "Adikt.sk",
    description: "Kreatívna značka s dynamickým vizuálnym obsahom.",
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
