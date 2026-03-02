import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Martina K.",
    role: "Majiteľka butiku",
    category: "FOTO",
    service: "Produktové Fotografie",
    source: "Google Reviews",
    date: "2025",
    stars: 5,
    text: "Dana je úžasná profesionálka. Fotky, ktoré vytvorila pre náš butik, zvýšili predaje o 40%. Odporúčam každému!",
  },
  {
    name: "Peter S.",
    role: "CEO, TechNova",
    category: "VIDEO",
    service: "Promo Video",
    source: "LinkedIn",
    date: "2024",
    stars: 5,
    text: "Spolupráca s Danou bola bezproblémová. Video, ktoré vytvorila, perfektne zachytilo ducha našej značky. Kvalita na svetovej úrovni.",
  },
  {
    name: "Lucia M.",
    role: "Influencerka",
    category: "STRATÉGIA",
    service: "Content Stratégia",
    source: "Instagram",
    date: "2025",
    stars: 5,
    text: "Vďaka Daninej stratégii som zdvojnásobila sledovateľov za 3 mesiace. Jej prístup je profesionálny a kreatívny zároveň.",
  },
];

const Reviews = () => {
  return (
    <section id="reviews" className="py-24">
      <div className="container">
        <div className="mb-12">
          <span className="section-label">SPOKOJNÉ</span>
          <h2 className="section-heading mt-3">RECENZIE</h2>
        </div>

        <div className="relative">
          <Quote className="text-foreground/10 absolute -top-4 left-0" size={80} strokeWidth={1} />

          <div className="grid gap-8">
            {reviews.map((r, i) => (
              <div key={i} className="grid md:grid-cols-[280px_1fr] gap-8">
                {/* Client card */}
                <div className="card-review flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-muted mb-4" />
                  <span className="section-label text-[10px] mb-2">{r.category}</span>
                  <h4 className="font-heading text-lg font-bold">{r.name}</h4>
                  <p className="text-muted-foreground text-sm">{r.role}</p>
                </div>

                {/* Review card */}
                <div className="card-review">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-heading text-xl font-bold">{r.service}</h4>
                      <p className="text-muted-foreground text-xs mt-1">
                        {r.source} · {r.date}
                      </p>
                    </div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: r.stars }).map((_, j) => (
                        <Star key={j} size={16} className="fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <div className="h-px bg-border mb-4" />
                  <p className="text-muted-foreground leading-relaxed">{r.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
