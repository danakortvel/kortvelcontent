import { Product } from "@/data/products";
import { ShoppingCart, ArrowRight } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
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
        <span className="font-heading text-2xl font-black text-foreground">
          {product.price}€
        </span>
        <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-primary text-primary text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-colors">
          <ShoppingCart size={15} />
          Do košíka
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
