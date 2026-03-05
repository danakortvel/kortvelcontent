import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const categoryRouteConfig: Record<
  string,
  {
    id: string;
    label: string;
    description: string;
  }
> = {
  video: {
    id: "video",
    label: "Video",
    description: "Promo videá, reely, videoklipy, UGC a produktové videá na mieru tvojej značke.",
  },
  foto: {
    id: "foto",
    label: "Foto",
    description: "Business, produktové a fashion fotografie na profesionálnej úrovni.",
  },
  models: {
    id: "models",
    label: "Models",
    description: "Modely, herci, influenceri a speváci pre tvoje kampane, videá a fotenia.",
  },
  "sprava-socialnych-sieti": {
    id: "social",
    label: "Správa sociálnych sietí",
    description: "Kompletná správa sociálnych sietí — obsah, komunikácia a rast komunity.",
  },
  "content-strategia": {
    id: "strategy",
    label: "Content stratégia",
    description: "Stratégie obsahu pre rôzne typy biznisov — od butikov po realitné kancelárie.",
  },
  baliky: {
    id: "packages",
    label: "Content balíky",
    description: "Kombinované balíky foto, video a sociálnych sietí podľa tvojich cieľov.",
  },
};

const Shop = () => {
  const { slug } = useParams<{ slug: string }>();
  const config = slug ? categoryRouteConfig[slug] : undefined;

  const filtered = config ? products.filter((p) => p.category === config.id) : [];

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container">
        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Späť na hlavnú stránku
        </Link>

        {/* Header */}
        {config ? (
          <div className="mb-10">
            <span className="section-label">PONUKA</span>
            <h1 className="section-heading mt-3">{config.label}</h1>
            <p className="text-muted-foreground text-lg mt-4 max-w-2xl">{config.description}</p>
            <p className="text-sm text-muted-foreground mt-4">
              {filtered.length} {filtered.length === 1 ? "produkt" : filtered.length < 5 ? "produkty" : "produktov"}
            </p>
          </div>
        ) : (
          <div className="mb-10">
            <span className="section-label">PONUKA</span>
            <h1 className="section-heading mt-3">Kategória neexistuje</h1>
            <p className="text-muted-foreground text-lg mt-4 max-w-2xl">
              Vybraná kategória nebola nájdená. Vyber si prosím jednu z dostupných kategórií na hlavnej stránke.
            </p>
          </div>
        )}

        {/* Products grid */}
        {config && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
