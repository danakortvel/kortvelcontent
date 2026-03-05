export type CalculatorOption = {
  id: string;
  label: string;
  description?: string;
  /** Price delta in EUR; can be negative for discounts. Use 0 for "+X€" notes and describe in the label. */
  delta: number;
  /** Optional flag to indicate this option only notes that price will be clarified later. */
  isInformational?: boolean;
  /** Optional percentage discount (0.1 = 10%) applied to the total price when this option is selected. */
  discountPercent?: number;
};

export type CalculatorStepType = "single-choice" | "multi-choice" | "info" | "upload" | "final";

export type CalculatorStep = {
  id: string;
  title: string;
  subtitle?: string;
  type: CalculatorStepType;
  /** For choice steps */
  options?: CalculatorOption[];
  /** Show this step only when predicate over previous selections is true. Implemented manually in component. */
  dependsOn?: {
    stepId: string;
    optionIds: string[];
  };
};

export type ProductCalculatorConfig = {
  productId: string;
  baseLabel: string;
  basePrice: number;
  currency: "EUR";
  steps: CalculatorStep[];
};

export const calculatorConfigs: ProductCalculatorConfig[] = [
  {
    productId: "v2", // Reel video
    baseLabel: "Reel video — od 14€",
    basePrice: 14,
    currency: "EUR",
    steps: [
      {
        id: "length",
        title: "Dĺžka videa",
        type: "single-choice",
        options: [
          { id: "to-30", label: "Do 30 sekúnd", delta: 0 },
          { id: "30-60", label: "30–60 sekúnd", delta: 10 },
          { id: "60-90", label: "60–90 sekúnd", delta: 20 },
        ],
      },
      {
        id: "location",
        title: "Lokácia",
        type: "single-choice",
        options: [
          { id: "exterior", label: "Exteriér / vaša prevádzka", delta: 0 },
          {
            id: "studio",
            label: "Štúdio",
            delta: 60,
          },
          {
            id: "rented",
            label: "Prenajatá lokácia (+X€ — upresníme po konzultácii)",
            delta: 0,
            isInformational: true,
          },
        ],
      },
      {
        id: "dubbing",
        title: "Dabing",
        type: "single-choice",
        options: [
          { id: "none", label: "Nie", delta: 0 },
          { id: "sk", label: "Áno — slovenčina", delta: 30 },
          { id: "other", label: "Áno — iný jazyk", delta: 50 },
        ],
      },
      {
        id: "subtitles",
        title: "Titulky",
        type: "single-choice",
        options: [
          { id: "none", label: "Nie", delta: 0 },
          { id: "yes", label: "Áno", delta: 10 },
        ],
      },
      {
        id: "revisions",
        title: "Počet kôl revízií",
        type: "single-choice",
        options: [
          { id: "1", label: "1 kolo (v cene)", delta: 0 },
          { id: "2", label: "2 kolá", delta: 20 },
          { id: "3", label: "3 kolá", delta: 40 },
          { id: "4plus", label: "4+ kolá", delta: 60 },
        ],
      },
      {
        id: "delivery",
        title: "Dodanie",
        type: "single-choice",
        options: [
          { id: "standard", label: "Štandardné 5–7 dní", delta: 0 },
          { id: "48h", label: "Expresné 48 hodín", delta: 50 },
          { id: "24h", label: "Super expresné 24 hodín", delta: 80 },
        ],
      },
      {
        id: "model",
        title: "Model / tvár",
        subtitle: "Vyplň len ak je pre video relevantný model alebo tvár.",
        type: "single-choice",
        options: [
          { id: "none", label: "Nie", delta: 0 },
          {
            id: "yes-models",
            label: "Áno — vybrať z kategórie Models (cena modela bude prirátaná podľa výberu)",
            delta: 0,
            isInformational: true,
          },
        ],
      },
      {
        id: "moodboard",
        title: "Mood board & inšpirácia",
        subtitle: "Nápad, idea, réžia — zadarmo ✨",
        type: "upload",
      },
      {
        id: "bundle",
        title: "Balík videí",
        type: "single-choice",
        options: [
          { id: "none", label: "Nie", delta: 0, discountPercent: 0 },
          { id: "5", label: "5 videí → zľava 10%", delta: 0, discountPercent: 0.1 },
          { id: "10", label: "10 videí → zľava 20%", delta: 0, discountPercent: 0.2 },
          { id: "20plus", label: "20+ videí → zľava 30%", delta: 0, discountPercent: 0.3 },
        ],
      },
    ],
  },
  {
    productId: "v1", // Promo video
    baseLabel: "Promo video — od 80€",
    basePrice: 80,
    currency: "EUR",
    steps: [
      {
        id: "length",
        title: "Dĺžka videa",
        type: "single-choice",
        options: [
          { id: "to-1", label: "Do 1 minúty", delta: 0 },
          { id: "1-3", label: "1–3 minúty", delta: 50 },
          { id: "3-5", label: "3–5 minút", delta: 100 },
        ],
      },
      {
        id: "story-scope",
        title: "Rozsah príbehu",
        type: "single-choice",
        options: [
          {
            id: "simple",
            label: "Jednoduchý — ilustračné zábery",
            delta: 0,
          },
          {
            id: "standard",
            label: "Štandardný — príbeh, komplexnejšia réžia",
            delta: 50,
          },
          {
            id: "premium",
            label: "Prémiový — komplexný príbeh, viac lokácií, emócie",
            delta: 180,
          },
        ],
      },
      {
        id: "location",
        title: "Lokácia",
        type: "single-choice",
        options: [
          { id: "exterior", label: "Exteriér / vaša prevádzka", delta: 0 },
          { id: "studio", label: "Štúdio", delta: 50 },
          {
            id: "rented",
            label: "Prenajatá lokácia (+X€ — upresníme po konzultácii)",
            delta: 0,
            isInformational: true,
          },
        ],
      },
      {
        id: "dubbing",
        title: "Dabing",
        type: "single-choice",
        options: [
          { id: "none", label: "Nie", delta: 0 },
          { id: "sk", label: "Áno — slovenčina", delta: 40 },
          { id: "other", label: "Áno — iný jazyk", delta: 60 },
        ],
      },
      {
        id: "music",
        title: "Hudba",
        type: "single-choice",
        options: [
          { id: "royalty-free", label: "Royalty free", delta: 0 },
          { id: "licensed", label: "Licencovaná", delta: 30 },
        ],
      },
      {
        id: "revisions",
        title: "Počet kôl revízií",
        type: "single-choice",
        options: [
          { id: "1", label: "1 kolo (v cene)", delta: 0 },
          { id: "2", label: "2 kolá", delta: 30 },
          { id: "3", label: "3 kolá", delta: 60 },
          { id: "4plus", label: "4+ kolá", delta: 90 },
        ],
      },
      {
        id: "delivery",
        title: "Dodanie",
        type: "single-choice",
        options: [
          { id: "standard", label: "Štandardné 7–10 dní", delta: 0 },
          { id: "72h", label: "Expresné 72 hodín", delta: 80 },
          { id: "48h", label: "Super expresné 48 hodín", delta: 120 },
        ],
      },
      {
        id: "model",
        title: "Model / tvár",
        type: "single-choice",
        options: [
          { id: "none", label: "Nie", delta: 0 },
          {
            id: "yes-models",
            label: "Áno — vybrať z kategórie Models (cena modela bude prirátaná podľa výberu)",
            delta: 0,
            isInformational: true,
          },
        ],
      },
      {
        id: "moodboard",
        title: "Mood board & inšpirácia",
        subtitle: "Nápad, idea, réžia — zadarmo ✨",
        type: "upload",
      },
      {
        id: "bundle",
        title: "Balík videí",
        type: "single-choice",
        options: [
          { id: "none", label: "Nie", delta: 0, discountPercent: 0 },
          { id: "5", label: "5 videí → zľava 10%", delta: 0, discountPercent: 0.1 },
          { id: "10", label: "10 videí → zľava 20%", delta: 0, discountPercent: 0.2 },
          { id: "20plus", label: "20+ videí → zľava 30%", delta: 0, discountPercent: 0.3 },
        ],
      },
    ],
  },
  {
    productId: "v4", // UGC video
    baseLabel: "UGC video — od 29€",
    basePrice: 29,
    currency: "EUR",
    steps: [
      {
        id: "length",
        title: "Dĺžka videa",
        type: "single-choice",
        options: [
          { id: "to-30", label: "Do 30 sekúnd", delta: 0 },
          { id: "30-60", label: "30–60 sekúnd", delta: 15 },
        ],
      },
      {
        id: "products",
        title: "Počet produktov",
        type: "single-choice",
        options: [
          { id: "1", label: "1 produkt", delta: 0 },
          { id: "2-3", label: "2–3 produkty", delta: 20 },
        ],
      },
      {
        id: "dubbing",
        title: "Dabing",
        type: "single-choice",
        options: [
          { id: "none", label: "Nie", delta: 0 },
          { id: "yes", label: "Áno", delta: 25 },
        ],
      },
      {
        id: "subtitles",
        title: "Titulky",
        type: "single-choice",
        options: [
          { id: "none", label: "Nie", delta: 0 },
          { id: "yes", label: "Áno", delta: 10 },
        ],
      },
      {
        id: "revisions",
        title: "Počet kôl revízií",
        type: "single-choice",
        options: [
          { id: "1", label: "1 kolo (v cene)", delta: 0 },
          { id: "2", label: "2 kolá", delta: 20 },
          { id: "3plus", label: "3+ kolá", delta: 35 },
        ],
      },
      {
        id: "delivery",
        title: "Dodanie",
        type: "single-choice",
        options: [
          { id: "standard", label: "Štandardné 3–5 dní", delta: 0 },
          { id: "48h", label: "Expresné 48 hodín", delta: 40 },
        ],
      },
      {
        id: "bundle",
        title: "Balík UGC videí",
        type: "single-choice",
        options: [
          { id: "none", label: "Nie", delta: 0, discountPercent: 0 },
          { id: "5", label: "5 UGC videí → zľava 10%", delta: 0, discountPercent: 0.1 },
          { id: "10", label: "10 UGC videí → zľava 20%", delta: 0, discountPercent: 0.2 },
          { id: "20plus", label: "20+ UGC videí → zľava 30%", delta: 0, discountPercent: 0.3 },
        ],
      },
    ],
  },
  {
    productId: "v6", // Recenzia video
    baseLabel: "Recenzia video — od 29€",
    basePrice: 29,
    currency: "EUR",
    steps: [
      {
        id: "length",
        title: "Dĺžka videa",
        type: "single-choice",
        options: [
          { id: "to-30", label: "Do 30 sekúnd", delta: 0 },
          { id: "30-60", label: "30–60 sekúnd", delta: 15 },
          { id: "1-2", label: "1–2 minúty", delta: 30 },
        ],
      },
      {
        id: "style",
        title: "Štýl videa",
        type: "single-choice",
        options: [
          { id: "product-only", label: "Len produkt — zábery používania", delta: 0 },
          { id: "talking-head", label: "Jeden záber — hovoriaca hlava + produkt", delta: 10 },
          { id: "multi-details", label: "Viac záberov — detaily produktu", delta: 20 },
          { id: "combo", label: "Kombinácia — hovoriaca hlava + detaily", delta: 30 },
        ],
      },
      {
        id: "model",
        title: "Model / tvár",
        type: "single-choice",
        dependsOn: {
          stepId: "style",
          optionIds: ["talking-head", "combo"],
        },
        options: [
          { id: "own", label: "Vlastná osoba", delta: 0 },
          {
            id: "models",
            label: "Vybrať z kategórie Models (+cena modela podľa výberu)",
            delta: 0,
            isInformational: true,
          },
        ],
      },
      {
        id: "location",
        title: "Lokácia",
        type: "single-choice",
        options: [
          { id: "exterior", label: "Exteriér", delta: 0 },
          { id: "studio", label: "Štúdio", delta: 60 },
          { id: "your-place", label: "Vaša prevádzka", delta: 0 },
          {
            id: "rented",
            label: "Prenajatá lokácia (+X€ — upresníme po konzultácii)",
            delta: 0,
            isInformational: true,
          },
        ],
      },
      {
        id: "light",
        title: "Technika & svetlo",
        type: "single-choice",
        options: [
          { id: "natural", label: "Prirodzené svetlo", delta: 0 },
          { id: "basic", label: "Základné štúdiové svetlo", delta: 30 },
          { id: "advanced", label: "Pokročilé svetlo", delta: 60 },
        ],
      },
      {
        id: "dubbing",
        title: "Dabing",
        type: "single-choice",
        options: [
          { id: "none", label: "Nie", delta: 0 },
          { id: "sk", label: "Slovenčina", delta: 30 },
          { id: "other", label: "Iný jazyk", delta: 50 },
        ],
      },
      {
        id: "subtitles",
        title: "Titulky",
        type: "single-choice",
        options: [
          { id: "none", label: "Nie", delta: 0 },
          { id: "yes", label: "Áno", delta: 10 },
        ],
      },
      {
        id: "revisions",
        title: "Počet kôl revízií",
        type: "single-choice",
        options: [
          { id: "1", label: "1 kolo (v cene)", delta: 0 },
          { id: "2", label: "2 kolá", delta: 20 },
          { id: "3plus", label: "3+ kolá", delta: 35 },
        ],
      },
      {
        id: "delivery",
        title: "Dodanie",
        type: "single-choice",
        options: [
          { id: "standard", label: "Štandardné 7–14 dní", delta: 0 },
          { id: "48h", label: "Expresné 48 hodín", delta: 40 },
        ],
      },
      {
        id: "travel",
        title: "Doprava",
        type: "single-choice",
        options: [
          { id: "kosice", label: "Košice a okolie", delta: 0 },
          {
            id: "outside",
            label: "Mimo Košíc (+20€/hod + náklady na pohonné hmoty — upresníme po konzultácii)",
            delta: 0,
            isInformational: true,
          },
        ],
      },
      {
        id: "moodboard",
        title: "Mood board & inšpirácia",
        subtitle: "Nápad, réžia — zadarmo ✨",
        type: "upload",
      },
      {
        id: "bundle",
        title: "Balík recenzií",
        type: "single-choice",
        options: [
          { id: "none", label: "Nie", delta: 0, discountPercent: 0 },
          { id: "5", label: "5 recenzií → zľava 10%", delta: 0, discountPercent: 0.1 },
          { id: "10", label: "10 recenzií → zľava 20%", delta: 0, discountPercent: 0.2 },
          { id: "20plus", label: "20+ recenzií → zľava 30%", delta: 0, discountPercent: 0.3 },
        ],
      },
    ],
  },
  {
    productId: "f3", // Fashion foto
    baseLabel: "Fashion foto — od 149€",
    basePrice: 149,
    currency: "EUR",
    steps: [
      {
        id: "outfits",
        title: "Počet outfitov",
        type: "single-choice",
        options: [
          { id: "1", label: "1 outfit", delta: 0 },
          { id: "2-3", label: "2–3 outfity", delta: 40 },
          { id: "4plus", label: "4+ outfity", delta: 80 },
        ],
      },
      {
        id: "outfit-source",
        title: "Outfity — zabezpečenie",
        type: "single-choice",
        options: [
          { id: "own", label: "Vlastné outfity", delta: 0 },
          {
            id: "provided",
            label: "Zabezpečíme outfity (+X€ — upresníme po konzultácii)",
            delta: 0,
            isInformational: true,
          },
        ],
      },
      {
        id: "location",
        title: "Lokácia",
        type: "single-choice",
        options: [
          { id: "exterior", label: "Exteriér", delta: 0 },
          { id: "studio", label: "Štúdio", delta: 60 },
          {
            id: "rented",
            label: "Prenajatá lokácia (+X€ — upresníme po konzultácii)",
            delta: 0,
            isInformational: true,
          },
        ],
      },
      {
        id: "makeup",
        title: "Makeup & vlasy",
        type: "single-choice",
        options: [
          { id: "own", label: "Vlastný makeup", delta: 0 },
          { id: "mua", label: "Profesionálny makeup artist", delta: 60 },
          { id: "mua-hair", label: "Makeup + vlasy", delta: 90 },
        ],
      },
      {
        id: "light",
        title: "Technika & svetlo",
        type: "single-choice",
        options: [
          { id: "natural", label: "Prirodzené svetlo", delta: 0 },
          { id: "basic", label: "Základné štúdiové svetlo", delta: 30 },
          { id: "advanced", label: "Pokročilé svetlo", delta: 60 },
          { id: "fx", label: "Špeciálne efekty — gél filtre, smoke, neon", delta: 80 },
        ],
      },
      {
        id: "final-photos",
        title: "Počet finálnych fotiek",
        type: "single-choice",
        options: [
          { id: "to-10", label: "Do 10 fotiek", delta: 0 },
          { id: "10-20", label: "10–20 fotiek", delta: 30 },
          { id: "20-30", label: "20–30 fotiek", delta: 60 },
        ],
      },
      {
        id: "retouch",
        title: "Retuš",
        type: "single-choice",
        options: [
          { id: "basic", label: "Základná", delta: 0 },
          { id: "advanced", label: "Pokročilá", delta: 30 },
        ],
      },
      {
        id: "revisions",
        title: "Počet kôl revízií",
        type: "single-choice",
        options: [
          { id: "1", label: "1 kolo (v cene)", delta: 0 },
          { id: "2", label: "2 kolá", delta: 20 },
          { id: "3plus", label: "3+ kolá", delta: 40 },
        ],
      },
      {
        id: "delivery",
        title: "Dodanie",
        type: "single-choice",
        options: [
          { id: "standard", label: "Štandardné 7–14 dní", delta: 0 },
          {
            id: "48h",
            label: "Expresné 48 hodín",
            delta: 50,
          },
        ],
      },
      {
        id: "model",
        title: "Model",
        type: "single-choice",
        options: [
          { id: "own", label: "Vlastný model", delta: 0 },
          {
            id: "models",
            label: "Vybrať z kategórie Models (+cena modela podľa výberu)",
            delta: 0,
            isInformational: true,
          },
        ],
      },
      {
        id: "travel",
        title: "Doprava",
        type: "single-choice",
        options: [
          { id: "kosice", label: "Košice a okolie", delta: 0 },
          {
            id: "outside",
            label: "Mimo Košíc (+20€/hod + náklady na pohonné hmoty — upresníme po konzultácii)",
            delta: 0,
            isInformational: true,
          },
        ],
      },
      {
        id: "moodboard",
        title: "Mood board & inšpirácia",
        subtitle: "Nápad, réžia — zadarmo ✨",
        type: "upload",
      },
      {
        id: "bundle",
        title: "Balík fashion fotení",
        type: "single-choice",
        options: [
          { id: "none", label: "Nie", delta: 0, discountPercent: 0 },
          { id: "5", label: "5 fotení → zľava 10%", delta: 0, discountPercent: 0.1 },
          { id: "10", label: "10 fotení → zľava 20%", delta: 0, discountPercent: 0.2 },
        ],
      },
    ],
  },
  {
    productId: "f1", // Business fotka
    baseLabel: "Business fotka — od 79€",
    basePrice: 79,
    currency: "EUR",
    steps: [
      {
        id: "type",
        title: "Typ fotky",
        type: "single-choice",
        options: [
          { id: "classic", label: "Klasická business fotka — tvár / poloportrét", delta: 0 },
          { id: "full", label: "Celé telo — štandardné pozovanie", delta: 20 },
          { id: "full-env", label: "Celé telo — v prostredí, stôl, stolička", delta: 40 },
        ],
      },
      {
        id: "people",
        title: "Počet ľudí",
        type: "single-choice",
        options: [
          { id: "1", label: "1 osoba", delta: 0 },
          {
            id: "2",
            label: "2 osoby (zvýhodnená cena — približne +133€)",
            delta: 133,
          },
          {
            id: "3",
            label: "3 osoby (zvýhodnená cena — približne +189€)",
            delta: 189,
          },
          {
            id: "5plus",
            label: "5+ osôb → približne -20% z ceny",
            delta: 0,
          },
          {
            id: "10plus",
            label: "10+ osôb → približne -25% z ceny",
            delta: 0,
          },
          { id: "group-5", label: "Skupinová fotka do 5 osôb", delta: 50 },
          { id: "group-6-10", label: "Skupinová fotka 6–10 osôb", delta: 80 },
          { id: "group-10plus", label: "Skupinová fotka 10+ osôb", delta: 120 },
        ],
      },
      {
        id: "location",
        title: "Lokácia",
        type: "single-choice",
        options: [
          { id: "exterior", label: "Exteriér", delta: 0 },
          { id: "studio", label: "Štúdio", delta: 60 },
          { id: "your-place", label: "Vaša prevádzka", delta: 0 },
          {
            id: "rented",
            label: "Prenajatá lokácia (+X€ — upresníme po konzultácii)",
            delta: 0,
            isInformational: true,
          },
        ],
      },
      {
        id: "makeup",
        title: "Makeup & vlasy",
        type: "single-choice",
        options: [
          { id: "own", label: "Vlastný makeup", delta: 0 },
          { id: "mua", label: "Profesionálny makeup artist", delta: 60 },
          { id: "mua-hair", label: "Makeup + vlasy", delta: 90 },
        ],
      },
      {
        id: "light",
        title: "Technika & svetlo",
        type: "single-choice",
        options: [
          { id: "natural", label: "Prirodzené svetlo", delta: 0 },
          { id: "basic", label: "Základné štúdiové svetlo", delta: 30 },
          { id: "advanced", label: "Pokročilé svetlo", delta: 60 },
        ],
      },
      {
        id: "photos",
        title: "Počet finálnych fotiek",
        type: "single-choice",
        options: [
          { id: "1-3", label: "1–3 fotky", delta: 0 },
          { id: "4-8", label: "4–8 fotiek", delta: 30 },
          { id: "9-15", label: "9–15 fotiek", delta: 60 },
        ],
      },
      {
        id: "retouch",
        title: "Retuš",
        type: "single-choice",
        options: [
          { id: "basic", label: "Základná", delta: 0 },
          { id: "advanced", label: "Pokročilá", delta: 30 },
        ],
      },
      {
        id: "revisions",
        title: "Počet kôl revízií",
        type: "single-choice",
        options: [
          { id: "1", label: "1 kolo (v cene)", delta: 0 },
          { id: "2", label: "2 kolá", delta: 20 },
          { id: "3plus", label: "3+ kolá", delta: 40 },
        ],
      },
      {
        id: "delivery",
        title: "Dodanie",
        type: "single-choice",
        options: [
          { id: "standard", label: "Štandardné 7–14 dní", delta: 0 },
          { id: "48h", label: "Expresné 48 hodín", delta: 50 },
        ],
      },
      {
        id: "travel",
        title: "Doprava",
        type: "single-choice",
        options: [
          { id: "kosice", label: "Košice a okolie", delta: 0 },
          {
            id: "outside",
            label: "Mimo Košíc (+20€/hod + náklady na pohonné hmoty — upresníme po konzultácii)",
            delta: 0,
            isInformational: true,
          },
        ],
      },
      {
        id: "moodboard",
        title: "Mood board & inšpirácia",
        subtitle: "Nápad, réžia — zadarmo ✨",
        type: "upload",
      },
    ],
  },
  {
    productId: "f2", // Produktové foto
    baseLabel: "Produktové foto — od 49€",
    basePrice: 49,
    currency: "EUR",
    steps: [
      {
        id: "product-type",
        title: "Typ produktu",
        type: "single-choice",
        options: [
          { id: "small", label: "Malý produkt — kozmetika, šperky", delta: 0 },
          { id: "medium", label: "Stredný produkt — oblečenie, jedlo", delta: 20 },
          { id: "large", label: "Veľký produkt — nábytok, technika", delta: 40 },
        ],
      },
      {
        id: "style",
        title: "Štýl fotenia",
        type: "single-choice",
        options: [
          { id: "white", label: "Biele pozadie — katalógové", delta: 0 },
          { id: "lifestyle", label: "Lifestyle — produkt v prostredí", delta: 30 },
          { id: "flatlay", label: "Flat lay", delta: 20 },
          { id: "detail", label: "Detail / macro", delta: 20 },
        ],
      },
      {
        id: "products",
        title: "Počet produktov",
        type: "single-choice",
        options: [
          { id: "1-3", label: "1–3 produkty", delta: 0 },
          { id: "4-8", label: "4–8 produktov", delta: 30 },
          { id: "9-15", label: "9–15 produktov", delta: 60 },
          { id: "16plus", label: "16+ produktov", delta: 100 },
        ],
      },
      {
        id: "shots-per-product",
        title: "Počet fotiek na produkt",
        type: "single-choice",
        options: [
          { id: "1-2", label: "1–2 fotky", delta: 0 },
          { id: "3-5", label: "3–5 fotiek", delta: 20 },
          { id: "6-10", label: "6–10 fotiek", delta: 40 },
        ],
      },
      {
        id: "props",
        title: "Rekvizity",
        type: "single-choice",
        options: [
          { id: "basic", label: "Základné (v cene)", delta: 0 },
          {
            id: "special",
            label: "Špeciálne rekvizity (+X€ — upresníme po konzultácii)",
            delta: 0,
            isInformational: true,
          },
        ],
      },
      {
        id: "location",
        title: "Lokácia",
        type: "single-choice",
        options: [
          { id: "studio", label: "Štúdio", delta: 60 },
          { id: "your-place", label: "Vaša prevádzka", delta: 0 },
          {
            id: "rented",
            label: "Prenajatá lokácia (+X€ — upresníme po konzultácii)",
            delta: 0,
            isInformational: true,
          },
        ],
      },
      {
        id: "light",
        title: "Technika & svetlo",
        type: "single-choice",
        options: [
          { id: "natural", label: "Prirodzené svetlo", delta: 0 },
          { id: "basic", label: "Základné svetlo", delta: 30 },
          { id: "advanced", label: "Pokročilé svetlo", delta: 60 },
        ],
      },
      {
        id: "retouch",
        title: "Retuš",
        type: "single-choice",
        options: [
          { id: "basic", label: "Základná", delta: 0 },
          { id: "advanced", label: "Pokročilá", delta: 40 },
        ],
      },
      {
        id: "revisions",
        title: "Počet kôl revízií",
        type: "single-choice",
        options: [
          { id: "1", label: "1 kolo (v cene)", delta: 0 },
          { id: "2", label: "2 kolá", delta: 20 },
          { id: "3plus", label: "3+ kolá", delta: 40 },
        ],
      },
      {
        id: "delivery",
        title: "Dodanie",
        type: "single-choice",
        options: [
          { id: "standard", label: "Štandardné 7–14 dní", delta: 0 },
          {
            id: "48h",
            label: "Expresné 48 hodín",
            delta: 50,
          },
        ],
      },
      {
        id: "model",
        title: "Model v zábere",
        type: "single-choice",
        options: [
          { id: "none", label: "Nie", delta: 0 },
          {
            id: "models",
            label: "Áno — vybrať z kategórie Models (+cena podľa výberu)",
            delta: 0,
            isInformational: true,
          },
        ],
      },
      {
        id: "travel",
        title: "Doprava",
        type: "single-choice",
        options: [
          { id: "kosice", label: "Košice a okolie", delta: 0 },
          {
            id: "outside",
            label: "Mimo Košíc (+20€/hod + náklady na pohonné hmoty — upresníme po konzultácii)",
            delta: 0,
            isInformational: true,
          },
        ],
      },
      {
        id: "moodboard",
        title: "Mood board & inšpirácia",
        subtitle: "Nápad, réžia — zadarmo ✨",
        type: "upload",
      },
      {
        id: "bundle",
        title: "Balík produktových fotení",
        type: "single-choice",
        options: [
          { id: "none", label: "Nie", delta: 0, discountPercent: 0 },
          { id: "5", label: "5 fotení → zľava 10%", delta: 0, discountPercent: 0.1 },
          { id: "10", label: "10 fotení → zľava 20%", delta: 0, discountPercent: 0.2 },
          { id: "20plus", label: "20+ fotení → zľava 30%", delta: 0, discountPercent: 0.3 },
        ],
      },
    ],
  },
  {
    productId: "v3", // Videoklip
    baseLabel: "Videoklip — od 299€",
    basePrice: 299,
    currency: "EUR",
    steps: [
      {
        id: "length",
        title: "Dĺžka videoklipu",
        type: "single-choice",
        options: [
          { id: "to-3", label: "Do 3 minút", delta: 0 },
          { id: "3-5", label: "3–5 minút", delta: 100 },
          { id: "5plus", label: "5+ minút", delta: 200 },
        ],
      },
      {
        id: "style",
        title: "Štýl",
        type: "single-choice",
        options: [
          { id: "simple", label: "Jednoduchý — 1 lokácia", delta: 0 },
          { id: "standard", label: "Štandardný — 2–3 lokácie", delta: 100 },
          { id: "cinematic", label: "Cinematický — viac lokácií", delta: 250 },
        ],
      },
      {
        id: "locations",
        title: "Počet lokácií",
        type: "single-choice",
        options: [
          { id: "1", label: "1 lokácia", delta: 0 },
          { id: "2-3", label: "2–3 lokácie", delta: 80 },
          { id: "4plus", label: "4+ lokácie", delta: 160 },
        ],
      },
      {
        id: "location-type",
        title: "Typ lokácie",
        type: "single-choice",
        options: [
          { id: "exterior", label: "Exteriér", delta: 0 },
          { id: "studio", label: "Štúdio", delta: 60 },
          {
            id: "rented",
            label: "Prenajatá lokácia (+X€ — upresníme po konzultácii)",
            delta: 0,
            isInformational: true,
          },
        ],
      },
      {
        id: "cast",
        title: "Herci / účinkujúci (Models)",
        type: "single-choice",
        options: [
          { id: "artist-only", label: "Len umelec", delta: 0 },
          {
            id: "1-2",
            label: "+1–2 herci / modely (cena podľa výberu z Models)",
            delta: 0,
            isInformational: true,
          },
          {
            id: "3-5",
            label: "+3–5 hercov / modelov (cena podľa výberu z Models)",
            delta: 0,
            isInformational: true,
          },
        ],
      },
      {
        id: "makeup",
        title: "Makeup & vlasy",
        type: "single-choice",
        options: [
          { id: "own", label: "Vlastný", delta: 0 },
          { id: "mua", label: "Makeup artist", delta: 60 },
          { id: "mua-hair", label: "Makeup + vlasy", delta: 90 },
          {
            id: "extra",
            label: "Každá ďalšia osoba (+60€ — približne)",
            delta: 60,
          },
        ],
      },
      {
        id: "outfits",
        title: "Outfity",
        type: "single-choice",
        options: [
          { id: "own", label: "Vlastné", delta: 0 },
          {
            id: "provided",
            label: "Zabezpečíme (+X€ — upresníme po konzultácii)",
            delta: 0,
            isInformational: true,
          },
        ],
      },
      {
        id: "light",
        title: "Technika & svetlo",
        type: "single-choice",
        options: [
          { id: "natural", label: "Prirodzené svetlo", delta: 0 },
          { id: "basic", label: "Základné štúdiové svetlo", delta: 60 },
          { id: "advanced", label: "Pokročilé svetlo", delta: 100 },
          { id: "fx", label: "Špeciálne efekty", delta: 120 },
        ],
      },
      {
        id: "dubbing",
        title: "Dabing / voiceover",
        type: "single-choice",
        options: [
          { id: "none", label: "Nie", delta: 0 },
          { id: "sk", label: "Slovenčina", delta: 40 },
          { id: "other", label: "Iný jazyk", delta: 60 },
        ],
      },
      {
        id: "post",
        title: "Post-produkcia",
        type: "single-choice",
        options: [
          { id: "basic", label: "Základné color grading (v cene)", delta: 0 },
          { id: "vfx", label: "Pokročilé VFX", delta: 150 },
          { id: "greenscreen", label: "Green screen", delta: 100 },
        ],
      },
      {
        id: "revisions",
        title: "Počet kôl revízií",
        type: "single-choice",
        options: [
          { id: "1", label: "1 kolo (v cene)", delta: 0 },
          { id: "2", label: "2 kolá", delta: 50 },
          { id: "3", label: "3 kolá", delta: 100 },
          { id: "4plus", label: "4+ kolá", delta: 150 },
        ],
      },
      {
        id: "delivery",
        title: "Dodanie",
        type: "single-choice",
        options: [
          { id: "standard", label: "Štandardné 30 dní", delta: 0 },
          { id: "15d", label: "Expresné 15 dní", delta: 150 },
        ],
      },
      {
        id: "travel",
        title: "Doprava",
        type: "single-choice",
        options: [
          { id: "kosice", label: "Košice a okolie", delta: 0 },
          {
            id: "outside",
            label: "Mimo Košíc (+20€/hod + náklady na pohonné hmoty — upresníme po konzultácii)",
            delta: 0,
            isInformational: true,
          },
        ],
      },
      {
        id: "moodboard",
        title: "Mood board & scenár",
        subtitle: "Nápad, idea, réžia — zadarmo ✨",
        type: "upload",
      },
      {
        id: "bundle",
        title: "Balík videoklipov",
        type: "single-choice",
        options: [
          { id: "none", label: "Nie", delta: 0, discountPercent: 0 },
          { id: "2", label: "2 videoklipy → zľava 10%", delta: 0, discountPercent: 0.1 },
          { id: "3plus", label: "3+ videoklipy → zľava 15%", delta: 0, discountPercent: 0.15 },
        ],
      },
    ],
  },
];

