import { useEffect, useMemo, useState } from "react";
import { calculatorConfigs } from "@/data/calculatorConfig";
import type { Product } from "@/data/products";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type InquiryPayload = {
  id: string;
  productId: string;
  productName: string;
  createdAt: string;
  approximatePrice: number;
  selections: {
    stepId: string;
    title: string;
    value: string;
  }[];
  customer: {
    name: string;
    email: string;
    phone?: string;
    message?: string;
  };
};

const INQUIRIES_STORAGE_KEY = "kortvel_inquiries_v1";

const Admin = () => {
  const [password, setPassword] = useState("");
  const [isAuthed, setIsAuthed] = useState(false);
  const [inquiries, setInquiries] = useState<InquiryPayload[]>([]);
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryPayload | null>(null);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(INQUIRIES_STORAGE_KEY);
      if (stored) {
        setInquiries(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  const totalInquiries = inquiries.length;

  const handleAuth = () => {
    // Simple front-end protection; real auth should be implemented on the server.
    if (password === "kortvel-admin") {
      setIsAuthed(true);
    } else {
      alert("Nesprávne heslo.");
    }
  };

  const sortedInquiries = useMemo(
    () => [...inquiries].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)),
    [inquiries],
  );

  if (!isAuthed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Admin panel</CardTitle>
            <CardDescription>Prihlás sa heslom pre prístup k dopytom a kalkulátoru.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="password"
              placeholder="Heslo"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button className="w-full" onClick={handleAuth} disabled={!password}>
              Prihlásiť sa
            </Button>
            <p className="text-xs text-muted-foreground">
              Poznámka: Toto je len základná ochrana na frontende. Pre reálne nasadenie je vhodné pridať server-side
              autentifikáciu.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container space-y-10">
        <header className="flex flex-col gap-2">
          <span className="section-label">ADMIN</span>
          <h1 className="section-heading mt-3">Kalkulátor & dopyty</h1>
          <p className="text-muted-foreground max-w-2xl mt-2">
            Tu môžeš prechádzať nezáväzné dopyty z kalkulátora, pozerať detail konfigurácií a pripraviť cenové ponuky
            či faktúry. Úprava otázok kalkulátora je momentálne riešená v konfigurácii projektu (súbor{" "}
            <code className="text-xs">src/data/calculatorConfig.ts</code>).
          </p>
        </header>

        <section className="grid lg:grid-cols-[2fr_3fr] gap-8 items-start">
          <Card className="max-h-[70vh] overflow-hidden flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Prijaté dopyty</CardTitle>
              <CardDescription>{totalInquiries} nezáväzných dopytov uložených v prehliadači.</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2 max-h-[52vh] overflow-auto pr-1">
                {sortedInquiries.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    Zatiaľ nemáš žiadne dopyty. Akonáhle niekto odošle kalkuláciu, zobrazí sa tu.
                  </p>
                )}
                {sortedInquiries.map((inq) => (
                  <button
                    key={inq.id}
                    type="button"
                    onClick={() => setSelectedInquiry(inq)}
                    className="w-full text-left rounded-xl border bg-card/80 px-4 py-3 text-sm hover:bg-card transition-colors"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <p className="font-medium">
                          {inq.productName} ·{" "}
                          <span className="text-primary font-semibold">
                            ~{inq.approximatePrice.toFixed(0)}
                            €{/* approximate */}
                          </span>
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(inq.createdAt).toLocaleString("sk-SK")} · {inq.customer.name} · {inq.customer.email}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="max-h-[70vh] overflow-hidden flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Detail & poznámky</CardTitle>
              <CardDescription>
                Vygeneruj orientačnú cenovú ponuku, vytvor faktúru (napr. v tvojom fakturačnom systéme) a skopíruj si
                text e‑mailu.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              {!selectedInquiry ? (
                <p className="text-sm text-muted-foreground">
                  Vyber dopyt zľava, aby si videla jeho detail a konfiguráciu kalkulátora.
                </p>
              ) : (
                <>
                  <div>
                    <p className="text-sm font-medium">
                      Produkt: <span className="font-heading">{selectedInquiry.productName}</span>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Orientačná cena z kalkulátora:{" "}
                      <span className="font-semibold">
                        približne {selectedInquiry.approximatePrice.toFixed(0)}€
                      </span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Finálna cena môže byť upravená podľa detailov produkcie (lokácie, modelov, rekvizít…)
                    </p>
                  </div>

                  <div className="grid gap-2 text-xs max-h-40 overflow-auto rounded-lg border bg-card/80 p-3">
                    {selectedInquiry.selections.map((s) => (
                      <div key={s.stepId} className="flex items-start gap-2">
                        <span className="font-semibold">{s.title}:</span>
                        <span className="text-muted-foreground break-words">{s.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-1 text-sm">
                    <p className="font-medium">Zákazník</p>
                    <p className="text-muted-foreground">
                      {selectedInquiry.customer.name} · {selectedInquiry.customer.email}
                      {selectedInquiry.customer.phone ? ` · ${selectedInquiry.customer.phone}` : ""}
                    </p>
                    {selectedInquiry.customer.message && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Správa: {selectedInquiry.customer.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">
                      Vytvor finálnu cenovú ponuku alebo faktúru vo svojom fakturačnom systéme. Text nižšie môžeš
                      skopírovať do e‑mailu.
                    </p>
                    <Textarea
                      className="text-xs"
                      rows={6}
                      defaultValue={[
                        `Dobrý deň ${selectedInquiry.customer.name},`,
                        "",
                        `ďakujem za váš záujem o službu ${selectedInquiry.productName}. Na základe vyplneného kalkulátora vychádza orientačná cena približne ${selectedInquiry.approximatePrice.toFixed(
                          0,
                        )}€.`,
                        "",
                        "Finálnu cenu upresníme po krátkej konzultácii, kde si potvrdíme lokácie, modelov, techniku a detaily produkcie.",
                        "",
                        "Teším sa na spoluprácu,",
                        "Dana Kortvel",
                      ].join("\n")}
                    />
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </section>

        <section>
          <Card>
            <CardHeader>
              <CardTitle>Nastavenia kalkulátora (prehľad)</CardTitle>
              <CardDescription>
                Základné otázky a ceny pre jednotlivé produkty. Na zmeny odporúčam upraviť súbor{" "}
                <code className="text-xs">src/data/calculatorConfig.ts</code> alebo mi napíš a aktualizujeme ich spolu.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              {calculatorConfigs.map((cfg) => (
                <div key={cfg.productId} className="rounded-lg border bg-card/60 px-4 py-3">
                  <p className="font-medium">
                    Produkt ID: <span className="font-mono text-xs">{cfg.productId}</span> · Základ:{" "}
                    <span className="font-heading">{cfg.baseLabel}</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Počet krokov v kalkulátore: {cfg.steps.length}. Úprava textov a cien je možná priamo v
                    konfigurácii.
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Admin;

