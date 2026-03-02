import { useState } from "react";

const portfolioItems = [
  { id: 1, type: "photo", color: "hsl(340 85% 50% / 0.15)" },
  { id: 2, type: "video", color: "hsl(270 50% 55% / 0.15)" },
  { id: 3, type: "photo", color: "hsl(36 29% 80%)" },
  { id: 4, type: "photo", color: "hsl(340 85% 50% / 0.1)" },
  { id: 5, type: "video", color: "hsl(270 50% 55% / 0.1)" },
  { id: 6, type: "photo", color: "hsl(36 29% 85%)" },
  { id: 7, type: "photo", color: "hsl(340 85% 50% / 0.12)" },
  { id: 8, type: "video", color: "hsl(270 50% 55% / 0.12)" },
];

const Portfolio = () => {
  const [clicks, setClicks] = useState<Record<number, number>>({});

  const handleClick = (id: number) => {
    setClicks((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const sorted = [...portfolioItems].sort(
    (a, b) => (clicks[b.id] || 0) - (clicks[a.id] || 0)
  );

  return (
    <section id="portfolio" className="py-24 overflow-hidden">
      <div className="container mb-12">
        <span className="section-label">PORTFÓLIO</span>
        <h2 className="section-heading mt-3">Moja Práca</h2>
      </div>

      {/* Scrolling carousel */}
      <div className="relative">
        <div className="flex gap-6 animate-scroll-left hover:[animation-play-state:paused]">
          {[...sorted, ...sorted].map((item, i) => (
            <div
              key={`${item.id}-${i}`}
              onClick={() => handleClick(item.id)}
              className="flex-shrink-0 w-64 h-80 rounded-2xl cursor-pointer transition-transform hover:scale-105"
              style={{ backgroundColor: item.color }}
            >
              <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm font-medium">
                {item.type === "video" ? "▶ Video" : "📷 Foto"} #{item.id}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
