export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  tag?: string;
}

export const categories = [
  { id: "all", label: "Všetko" },
  { id: "video", label: "Video" },
  { id: "foto", label: "Foto" },
  { id: "models", label: "Models" },
  { id: "social", label: "Správa Sietí" },
  { id: "strategy", label: "Stratégia" },
  { id: "packages", label: "Balíky" },
] as const;

export const products: Product[] = [
  // VIDEO
  {
    id: "v1",
    name: "Promo video",
    category: "video",
    price: 80,
    description: "Profesionálne promo video pre tvoju značku alebo produkt.",
    tag: "Populárne",
  },
  {
    id: "v2",
    name: "Reel video",
    category: "video",
    price: 14,
    description: "Krátke dynamické video pre Instagram a TikTok.",
  },
  {
    id: "v3",
    name: "Videoklip",
    category: "video",
    price: 299,
    description: "Hudobný videoklip s kompletnou produkciou.",
  },
  {
    id: "v4",
    name: "UGC video",
    category: "video",
    price: 29,
    description: "Autentické user-generated content video pre tvoje kampane.",
  },
  {
    id: "v5",
    name: "Produktové video",
    category: "video",
    price: 80,
    description: "Detailná video prezentácia tvojho produktu.",
  },
  {
    id: "v6",
    name: "Recenzia video",
    category: "video",
    price: 29,
    description: "Video recenzia produktu alebo služby.",
  },

  // FOTO
  {
    id: "f1",
    name: "Business fotka",
    category: "foto",
    price: 79,
    description: "Profesionálny business portrét pre tvoj profil.",
    tag: "Nové",
  },
  {
    id: "f2",
    name: "Produktové foto",
    category: "foto",
    price: 49,
    description: "Kvalitné produktové fotografie pre e-shop alebo katalóg.",
  },
  {
    id: "f3",
    name: "Fashion foto",
    category: "foto",
    price: 149,
    description: "Fashion fotenie s kompletným styling a postprodukciou.",
  },

  // MODELS
  { id: "m1", name: "Modely", category: "models", price: 399, description: "Profesionálne modely pre tvoje kampane a fotenie." },
  { id: "m2", name: "Herci", category: "models", price: 499, description: "Herci pre reklamné spoty a video content." },
  { id: "m3", name: "Influenceri", category: "models", price: 599, description: "Spolupráca s influencermi pre tvoju značku.", tag: "Premium" },
  { id: "m4", name: "Speváci", category: "models", price: 699, description: "Spolupráca so spevákmi pre jingle alebo videoklip." },

  // SPRÁVA SOCIÁLNYCH SIETÍ
  {
    id: "s1",
    name: "Správa sociálnych sietí základná",
    category: "social",
    price: 199,
    description: "Základná správa 2 sociálnych sietí — od 199€/mes (12 príspevkov mesačne).",
  },
  {
    id: "s2",
    name: "Growth balík sociálne siete",
    category: "social",
    price: 499,
    description: "Správa 3 sietí — od 499€/mes (20 príspevkov, stories a reely mesačne).",
    tag: "Najlepšia hodnota",
  },
  {
    id: "s3",
    name: "Full balík sociálne siete",
    category: "social",
    price: 799,
    description: "Kompletná správa všetkých sietí s denným obsahom — od 799€/mes.",
  },

  // CONTENT STRATÉGIA
  { id: "cs1", name: "Content stratégia", category: "strategy", price: 149, description: "Individuálna content stratégia pre tvoju značku — od 149€." },
  { id: "cs2", name: "Butik", category: "strategy", price: 349, description: "Stratégia pre módne butiky a obchody." },
  { id: "cs3", name: "Kozmetická", category: "strategy", price: 349, description: "Content stratégia pre kozmetické salóny." },
  { id: "cs4", name: "Kaderníctvo", category: "strategy", price: 299, description: "Stratégia pre kadernícke salóny a beauty." },
  { id: "cs5", name: "Reštaurácia", category: "strategy", price: 399, description: "Content stratégia pre reštaurácie a kaviarne." },
  { id: "cs6", name: "Realitný Agent", category: "strategy", price: 449, description: "Stratégia pre realitných agentov a maklérov." },
  { id: "cs7", name: "Finančný Poradca", category: "strategy", price: 399, description: "Content stratégia pre finančných poradcov." },
  { id: "cs8", name: "Realitná Kancelária", category: "strategy", price: 599, description: "Komplexná stratégia pre realitnú kanceláriu." },

  // CONTENT BALÍKY
  {
    id: "cb1",
    name: "Štart balík",
    category: "packages",
    price: 299,
    description: "Foto + video + 1 sociálna sieť — ideálne na štart, od 299€/mes.",
  },
  {
    id: "cb2",
    name: "Growth balík",
    category: "packages",
    price: 499,
    description: "Kompletný content balík s foto, video a správou sietí — od 499€/mes.",
    tag: "Obľúbené",
  },
  {
    id: "cb3",
    name: "Full balík",
    category: "packages",
    price: 799,
    description: "All-in-one riešenie pre značky a firmy — od 799€/mes.",
    tag: "Premium",
  },
];
