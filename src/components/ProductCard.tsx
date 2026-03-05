import { useState } from "react";
import { Product } from "@/data/products";
import { Calculator } from "lucide-react";
import PriceCalculator from "./PriceCalculator";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="card-service group flex flex-col h-full">
      {/* Tag */}
      {product.tag && (
        <span className="self-start text-[10px] font-bold tracking-[0.15em] uppercase bg-primary/10 text-primary px-3 py-1 rounded-full mb-4">
          {product.tag}
        </span>
      )}

      {/* Category dot */}
      <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-accent mb-2">
        {product.category === "video" && "VIDEO"}
        {product.category === "foto" && "FOTO"}
        {product.category === "models" && "MODELS"}
        {product.category === "social" && "SOCIÁLNE SIETE"}
        {product.category === "strategy" && "STRATÉGIA"}
        {product.category === "packages" && "BALÍK"}
      </span>

      <h3 className="font-heading text-xl font-bold mb-2">{product.name}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
        {product.description}
      </p>

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
        <span className="font-heading text-2xl font-black text-foreground">od {product.price}€</span>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-primary text-primary text-sm font-semibold bg-gradient-to-b from-background/60 to-background/95 shadow-[0_10px_25px_-12px_rgba(0,0,0,0.5)] hover:-translate-y-[1px] active:translate-y-[1px] active:shadow-[0_4px_10px_-6px_rgba(0,0,0,0.5)] transition-all"
        >
          <Calculator size={16} />
          Vypočítať cenu
        </button>
      </div>
      <PriceCalculator product={product} open={open} onOpenChange={setOpen} />
    </div>
  );
};

export default ProductCard;
