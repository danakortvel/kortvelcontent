import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "", service: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: send to Supabase
    console.log(form);
  };

  return (
    <section id="contact" className="py-24">
      <div className="container">
        <span className="section-label">NAPÍŠ MI</span>
        <h2 className="section-heading mt-3 mb-12">KONTAKT</h2>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Info */}
          <div className="space-y-8">
            <p className="text-muted-foreground text-lg leading-relaxed">
              Máš záujem o spoluprácu? Neváhaj ma kontaktovať. Rada ti pomôžem
              s tvojím projektom.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="icon-circle">
                  <Mail size={18} />
                </div>
                <span className="text-sm">dana@kortvelcontent.sk</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="icon-circle">
                  <Phone size={18} />
                </div>
                <span className="text-sm">+421 900 000 000</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="icon-circle">
                  <MapPin size={18} />
                </div>
                <span className="text-sm">Bratislava, Slovensko</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-xs font-semibold tracking-wider uppercase text-muted-foreground block mb-2">
                Meno
              </label>
              <input
                type="text"
                required
                maxLength={100}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="Tvoje meno"
              />
            </div>
            <div>
              <label className="text-xs font-semibold tracking-wider uppercase text-muted-foreground block mb-2">
                Email
              </label>
              <input
                type="email"
                required
                maxLength={255}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="tvoj@email.sk"
              />
            </div>
            <div>
              <label className="text-xs font-semibold tracking-wider uppercase text-muted-foreground block mb-2">
                Služba
              </label>
              <select
                value={form.service}
                onChange={(e) => setForm({ ...form, service: e.target.value })}
                className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <option value="">Vyber službu...</option>
                <option value="video">Video Content</option>
                <option value="foto">Foto Content</option>
                <option value="models">Models</option>
                <option value="social">Správa Sociálnych Sietí</option>
                <option value="strategy">Content Stratégia</option>
                <option value="packages">Content Balíky</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold tracking-wider uppercase text-muted-foreground block mb-2">
                Správa
              </label>
              <textarea
                required
                maxLength={1000}
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                placeholder="Napíš mi o tvojom projekte..."
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              <Send size={16} />
              Odoslať
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
