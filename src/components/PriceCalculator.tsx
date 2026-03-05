import { useMemo, useState } from "react";
import type { Product } from "@/data/products";
import { calculatorConfigs, ProductCalculatorConfig, CalculatorStep } from "@/data/calculatorConfig";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import emailjs from "emailjs-com";

type Selections = Record<string, string>;

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

const loadConfigForProduct = (productId: string): ProductCalculatorConfig | undefined =>
  calculatorConfigs.find((c) => c.productId === productId);

const shouldShowStep = (step: CalculatorStep, selections: Selections) => {
  if (!step.dependsOn) return true;
  const selected = selections[step.dependsOn.stepId];
  if (!selected) return false;
  return step.dependsOn.optionIds.includes(selected);
};

const computePrice = (
  config: ProductCalculatorConfig,
  steps: CalculatorStep[],
  selections: Selections,
): { originalPrice: number; finalPrice: number; discountPercent: number } => {
  let original = config.basePrice;
  let bundleDiscount = 0;

  for (const step of steps) {
    if (!shouldShowStep(step, selections)) continue;
    if (!step.options || step.options.length === 0) continue;
    const selectedId = selections[step.id];
    const option = step.options.find((o) => o.id === selectedId);
    if (!option) continue;
    original += option.delta;
    if (typeof option.discountPercent === "number") {
      // Ak by náhodou bolo viac bundle možností, zober najvyššiu zľavu.
      bundleDiscount = Math.max(bundleDiscount, option.discountPercent);
    }
  }

  const final = bundleDiscount > 0 ? Math.round(original * (1 - bundleDiscount)) : original;

  return {
    originalPrice: original,
    finalPrice: final,
    discountPercent: bundleDiscount,
  };
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("sk-SK", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);

interface PriceCalculatorProps {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PriceCalculator = ({ product, open, onOpenChange }: PriceCalculatorProps) => {
  const config = useMemo(() => loadConfigForProduct(product.id), [product.id]);
  const [stepIndex, setStepIndex] = useState(0);
  const [selections, setSelections] = useState<Selections>({});
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerMessage, setCustomerMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  const visibleSteps = useMemo(
    () => (config ? config.steps.filter((s) => shouldShowStep(s, selections)) : []),
    [config, selections],
  );

  const currentStep = visibleSteps[stepIndex];

  const priceInfo = config ? computePrice(config, visibleSteps, selections) : null;
  const approximatePrice = priceInfo ? priceInfo.finalPrice : product.price;

  const resetState = () => {
    setStepIndex(0);
    setSelections({});
    setCustomerName("");
    setCustomerEmail("");
    setCustomerPhone("");
    setCustomerMessage("");
    setIsSubmitted(false);
  };

  const handleClose = (nextOpen: boolean) => {
    if (!nextOpen) {
      resetState();
    }
    onOpenChange(nextOpen);
  };

  const handleNext = () => {
    // Posuň sa na ďalší krok, vrátane prechodu na finálny súhrn.
    if (stepIndex < visibleSteps.length) {
      setStepIndex(stepIndex + 1);
    }
  };

  const handleBack = () => {
    if (stepIndex > 0) {
      setStepIndex(stepIndex - 1);
    }
  };

  const handleSubmit = async () => {
    if (!config) return;
    const selectionsArr =
      visibleSteps.map((step) => {
        const selectedId = selections[step.id];
        const option = step.options?.find((o) => o.id === selectedId);
        let optionLabel = option?.label || selections[step.id] || "—";

        if (step.id === "travel" && selectedId === "outside") {
          const location = selections["travel-location"];
          if (location) {
            optionLabel = `${optionLabel} — miesto: ${location} (Cena za dopravu bude upresnená po konzultácii (+20€/hod + PHM))`;
          } else {
            optionLabel = `${optionLabel} (Cena za dopravu bude upresnená po konzultácii (+20€/hod + PHM))`;
          }
        }

        return {
          stepId: step.id,
          title: step.title,
          value: optionLabel,
        };
      }) ?? [];

    const payload: InquiryPayload = {
      id: `inq_${Date.now()}`,
      productId: product.id,
      productName: product.name,
      createdAt: new Date().toISOString(),
      approximatePrice,
      selections: selectionsArr,
      customer: {
        name: customerName,
        email: customerEmail,
        phone: customerPhone || undefined,
        message: customerMessage || undefined,
      },
    };

    try {
      const existingRaw = window.localStorage.getItem(INQUIRIES_STORAGE_KEY);
      const existing: InquiryPayload[] = existingRaw ? JSON.parse(existingRaw) : [];
      existing.push(payload);
      window.localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(existing));
    } catch {
      // ignore storage errors
    }

    const subject = `Nezáväzná objednávka – ${product.name}`;
    const originalLine =
      priceInfo && priceInfo.discountPercent > 0
        ? `Pôvodná orientačná cena: ${formatCurrency(priceInfo.originalPrice)} (pred zľavou balíka)`
        : undefined;
    const discountLine =
      priceInfo && priceInfo.discountPercent > 0
        ? `Zľava balíka: ${Math.round(priceInfo.discountPercent * 100)}%`
        : undefined;
    const bodyLines = [
      `Produkt: ${product.name}`,
      originalLine,
      discountLine,
      `Orientačná cena po zľave (ak je): približne ${formatCurrency(approximatePrice)}`,
      "",
      "Vyplnené kroky:",
      ...selectionsArr.map((s) => `- ${s.title}: ${s.value}`),
      "",
      "Zákazník:",
      `Meno: ${customerName}`,
      `Email: ${customerEmail}`,
      customerPhone ? `Telefón: ${customerPhone}` : "",
      customerMessage ? `Správa: ${customerMessage}` : "",
      "",
      "Poznámka: Mood board / prílohy sú priložené v kalkulátore (nie sú súčasťou e-mailu).",
    ].filter(Boolean);
    const body = bodyLines.join("\n");

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;

    if (!serviceId || !templateId || !publicKey) {
      console.error("EmailJS env variables are missing.");
      setSendError(
        "Nepodarilo sa odoslať e‑mail (chýba konfigurácia). Skús neskôr alebo ma kontaktuj priamo na info@kortvelcontent.com.",
      );
      return;
    }

    setIsSending(true);
    setSendError(null);

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          subject,
          message: body,
          product_name: product.name,
          customer_name: customerName,
          customer_email: customerEmail,
          customer_phone: customerPhone,
        },
        publicKey,
      );
      setIsSubmitted(true);
    } catch (err) {
      console.error("EmailJS send error", err);
      setSendError(
        "Pri odosielaní objednávky nastala chyba. Skús to prosím znova alebo ma kontaktuj priamo na info@kortvelcontent.com.",
      );
    } finally {
      setIsSending(false);
    }
  };

  const isFinalStep = !currentStep;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Vypočítať cenu – {product.name}</DialogTitle>
          <DialogDescription>
            Vyplň krátky konfigurátor a zobrazíme ti orientačnú cenu. Finálna cena bude vždy upresnená po osobnej
            konzultácii.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 flex-1 overflow-y-auto pr-1">
          {!config ? (
            <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Pre tento produkt zatiaľ nemáme detailný kalkulátor. Pošli mi prosím nezáväznú správu a pripravím ti
              individuálnu ponuku.
            </p>
            <div className="grid gap-3">
              <Input
                placeholder="Meno a priezvisko"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
              <Input placeholder="Email" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} />
              <Input
                placeholder="Telefón (nepovinné)"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
              />
              <Textarea
                placeholder="Napíš, čo potrebuješ…"
                value={customerMessage}
                onChange={(e) => setCustomerMessage(e.target.value)}
                rows={4}
              />
            </div>
            <Button
              className="w-full"
              onClick={async () => {
                const approx = product.price;
                const bodyLines = [
                  `Produkt: ${product.name}`,
                  `Orientačná cena od: ${formatCurrency(approx)}`,
                  "",
                  "Správa od zákazníka:",
                  customerMessage,
                  "",
                  "Kontakt:",
                  `Meno: ${customerName}`,
                  `Email: ${customerEmail}`,
                  customerPhone ? `Telefón: ${customerPhone}` : "",
                ].filter(Boolean);
                const body = bodyLines.join("\n");

                const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined;
                const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined;
                const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;

                if (!serviceId || !templateId || !publicKey) {
                  console.error("EmailJS env variables are missing.");
                  setSendError(
                    "Nepodarilo sa odoslať e‑mail (chýba konfigurácia). Skús neskôr alebo ma kontaktuj priamo na info@kortvelcontent.com.",
                  );
                  return;
                }

                setIsSending(true);
                setSendError(null);
                try {
                  await emailjs.send(
                    serviceId,
                    templateId,
                    {
                      subject: `Nezáväzná objednávka – ${product.name}`,
                      message: body,
                      product_name: product.name,
                      customer_name: customerName,
                      customer_email: customerEmail,
                      customer_phone: customerPhone,
                    },
                    publicKey,
                  );
                  setIsSubmitted(true);
                } catch (err) {
                  console.error("EmailJS send error", err);
                  setSendError(
                    "Pri odosielaní objednávky nastala chyba. Skús to prosím znova alebo ma kontaktuj priamo na info@kortvelcontent.com.",
                  );
                } finally {
                  setIsSending(false);
                }
              }}
              disabled={!customerName || !customerEmail || isSending}
            >
              {isSending ? "Odosielam..." : "Odoslať nezáväznú objednávku"}
            </Button>
          </div>
          ) : (
            <div className="space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">
                Základ: <span className="font-heading font-bold">{config.baseLabel}</span>
              </p>
              <p className="text-sm text-muted-foreground">
                Krok {Math.min(stepIndex + 1, visibleSteps.length + 1)} z {visibleSteps.length + 1}
              </p>
            </div>

            {!isFinalStep && currentStep && (
              <div className="space-y-4">
                <div>
                  <h3 className="font-heading text-lg font-semibold">{currentStep.title}</h3>
                  {currentStep.subtitle && (
                    <p className="text-sm text-muted-foreground mt-1">{currentStep.subtitle}</p>
                  )}
                </div>

                {currentStep.type === "single-choice" && currentStep.options && (
                  <div className="space-y-4">
                    <div className="grid gap-3">
                      {currentStep.options.map((opt) => {
                        const selected = selections[currentStep.id] === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() =>
                              setSelections((prev) => ({
                                ...prev,
                                [currentStep.id]: opt.id,
                              }))
                            }
                            className={cn(
                              "w-full text-left rounded-xl border px-4 py-3 text-sm transition-all",
                              "bg-card/80 hover:bg-card shadow-sm",
                              selected && "border-primary shadow-md bg-card",
                            )}
                          >
                            <div className="flex items-center justify-between gap-3">
                              <span>{opt.label}</span>
                              {!opt.isInformational && (
                                <span className="text-xs font-semibold text-muted-foreground">
                                  {opt.delta === 0 ? "+0€" : opt.delta > 0 ? `+${opt.delta}€` : `${opt.delta}€`}
                                </span>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {currentStep.id === "travel" && selections[currentStep.id] === "outside" && (
                      <div className="space-y-2">
                        <p className="text-xs text-muted-foreground">
                          Mimo Košíc — cestovné sa počíta individuálne podľa lokality. Prosím, zadaj miesto natáčania.
                        </p>
                        <Input
                          placeholder="Zadajte miesto natáčania"
                          value={selections["travel-location"] || ""}
                          onChange={(e) =>
                            setSelections((prev) => ({
                              ...prev,
                              "travel-location": e.target.value,
                            }))
                          }
                        />
                        <p className="text-[11px] text-muted-foreground">
                          Cena za dopravu bude upresnená po konzultácii (+20€/hod + PHM).
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {currentStep.type === "upload" && (
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Nahraj mood board, referenčné fotky alebo video a doplň krátky popis. Súbory sa z bezpečnostných
                      dôvodov neodosielajú automaticky emailom, ale budem ich mať v kalkulátore pri spracovaní tvojej
                      objednávky.
                    </p>
                    <Input
                      type="file"
                      multiple
                      onChange={(e) => {
                        const files = Array.from(e.target.files ?? []).map((f) => f.name).join(", ");
                        setSelections((prev) => ({
                          ...prev,
                          [currentStep.id]: files || "Bez príloh",
                        }));
                      }}
                    />
                    <Textarea
                      placeholder="Stručne opíš náladu, farby, referencie…"
                      rows={3}
                      onChange={(e) =>
                        setSelections((prev) => ({
                          ...prev,
                          [`${currentStep.id}-note`]: e.target.value,
                        }))
                      }
                    />
                    <p className="text-xs text-muted-foreground">Nápad, idea, réžia — zadarmo ✨</p>
                  </div>
                )}
              </div>
            )}

            {isFinalStep && (
              <div className="space-y-4">
                <div>
                  <h3 className="font-heading text-lg font-semibold">Orientačná cena</h3>
                  {priceInfo && priceInfo.discountPercent > 0 ? (
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">
                        Pôvodne:{" "}
                        <span className="line-through">
                          {formatCurrency(priceInfo.originalPrice)}
                        </span>
                      </p>
                      <p className="text-3xl font-heading font-black">
                        {formatCurrency(priceInfo.finalPrice)}
                      </p>
                      <p className="text-xs text-emerald-600">
                        Zahrnutá zľava balíka {Math.round(priceInfo.discountPercent * 100)}%.
                      </p>
                    </div>
                  ) : (
                    <p className="text-3xl font-heading font-black">{formatCurrency(approximatePrice)}</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    Toto je orientačná cena. Finálna cena bude upresnená po konzultácii.
                  </p>
                </div>

                <div className="space-y-2 max-h-40 overflow-auto rounded-lg border bg-card/80 p-3 text-xs">
                  {visibleSteps.map((s) => {
                    const selectedId = selections[s.id];
                    let label =
                      s.options?.find((o) => o.id === selectedId)?.label ||
                      selections[s.id] ||
                      selections[`${s.id}-note`] ||
                      "—";

                    if (s.id === "travel" && selectedId === "outside") {
                      const location = selections["travel-location"];
                      if (location) {
                        label = `${label} — miesto: ${location}`;
                      }
                    }

                    return (
                      <div key={s.id} className="flex items-start gap-2">
                        <span className="font-semibold">{s.title}:</span>
                        <span className="text-muted-foreground">{label}</span>
                      </div>
                    );
                  })}
                  {visibleSteps.some((s) => s.id === "travel" && selections["travel"] === "outside") && (
                    <p className="text-[11px] text-muted-foreground mt-1">
                      Cena za dopravu bude upresnená po konzultácii (+20€/hod + PHM).
                    </p>
                  )}
                </div>

                <div className="grid gap-3 pt-2">
                  <Input
                    placeholder="Meno a priezvisko"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                  />
                  <Input
                    placeholder="Email"
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                  />
                  <Input
                    placeholder="Telefón (nepovinné)"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                  />
                  <Textarea
                    placeholder="Správa / poznámky (nepovinné)"
                    rows={3}
                    value={customerMessage}
                    onChange={(e) => setCustomerMessage(e.target.value)}
                  />
                  <Input
                    type="file"
                    multiple
                    onChange={(e) => {
                      const files = Array.from(e.target.files ?? []).map((f) => f.name).join(", ");
                      setSelections((prev) => ({
                        ...prev,
                        "final-attachments": files || "Bez príloh",
                      }));
                    }}
                  />
                  <p className="text-xs text-muted-foreground">
                    Súbory z tejto sekcie sa z technických dôvodov nepripájajú automaticky k e-mailu, ale môžeš ich
                    poslať následne v odpovedi na cenovú ponuku.
                  </p>
                </div>

                {isSubmitted && (
                  <p className="text-xs text-emerald-600">
                    Ďakujeme! Vaša objednávka bola odoslaná. Ozveme sa vám čoskoro.
                  </p>
                )}
                {sendError && <p className="text-xs text-destructive">{sendError}</p>}
              </div>
            )}

            <div className="flex items-center justify-between pt-2 pb-1 sticky bottom-0 bg-background">
              <Button variant="outline" onClick={handleBack} disabled={stepIndex === 0}>
                Späť
              </Button>

              {!isFinalStep ? (
                <Button
                  onClick={handleNext}
                  disabled={
                    !!currentStep &&
                    (currentStep.type === "single-choice" &&
                      !!currentStep.options &&
                      !selections[currentStep.id])
                  }
                >
                  Pokračovať
                </Button>
              ) : (
                <Button onClick={handleSubmit} disabled={!customerName || !customerEmail || isSending}>
                  {isSending ? "Odosielam..." : "Odoslať nezáväznú objednávku"}
                </Button>
              )}
            </div>
          </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PriceCalculator;

