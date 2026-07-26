import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, MessageCircle, MapPin, Clock, Star, Car, Utensils, Heart, Users, ShoppingBag, Facebook, Instagram, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import heroPizza from "@/assets/hero-pizza.jpg";
import pizzaMargherita from "@/assets/pizza-margherita.jpg";
import pizzaSavoyarde from "@/assets/pizza-savoyarde.jpg";
import pizzaVegetarienne from "@/assets/pizza-vegetarienne.jpg";
import pizzaReine from "@/assets/pizza-reine.jpg";
import pizzaQuatreFromages from "@/assets/pizza-quatre-fromages.jpg";
import pizzaMontagnarde from "@/assets/pizza-montagnarde.jpg";

const PHONE = "+33767100850";
const PHONE_DISPLAY = "07 67 10 08 50";
const WHATSAPP_URL = "https://wa.me/33767100850";
const MAPS_URL = "https://www.google.com/maps/dir/?api=1&destination=99+route+du+Freney+73160+Saint-Sulpice";
const REVIEW_URL = "https://search.google.com/local/writereview?placeid=ChIJ6xyTw64Hi0cRVLTe3sXHtPw";
const ADDRESS = "99 route du Freney, 73160 Saint-Sulpice";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Pizzeria",
  name: "Pizza Route 99",
  image: "https://id-preview--ce9d7f8c-2a83-4e79-a4c5-292e49ae43f3.lovable.app/og-image.jpg",
  telephone: PHONE,
  address: {
    "@type": "PostalAddress",
    streetAddress: "99 route du Freney",
    addressLocality: "Saint-Sulpice",
    postalCode: "73160",
    addressCountry: "FR",
  },
  servesCuisine: "Pizza",
  priceRange: "€€",
  areaServed: ["Saint-Sulpice", "Chambéry"],
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Thursday", opens: "18:00", closes: "22:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "18:00", closes: "22:30" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "18:00", closes: "22:30" },
  ],
  url: "https://id-preview--ce9d7f8c-2a83-4e79-a4c5-292e49ae43f3.lovable.app/",
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pizza Route 99 — Pizzeria artisanale à Saint-Sulpice (Chambéry)" },
      {
        name: "description",
        content:
          "Pizza Route 99, votre pizzeria artisanale à Saint-Sulpice près de Chambéry. Pizzas généreuses à emporter, commande WhatsApp au 07 67 10 08 50.",
      },
      { property: "og:title", content: "Pizza Route 99 — Pizzeria à Saint-Sulpice" },
      {
        property: "og:description",
        content: "Des pizzas généreuses, préparées avec passion à Saint-Sulpice, près de Chambéry.",
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "fr_FR" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Pizza Route 99 — Pizzeria à Saint-Sulpice" },
      {
        name: "twitter:description",
        content: "Pizzas artisanales à emporter à Saint-Sulpice, près de Chambéry.",
      },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(structuredData),
      },
    ],
  }),
  component: Index,
});

type Pizza = { name: string; desc: string; price: string; img: string };

const menu: { category: string; items: Pizza[] }[] = [
  {
    category: "Incontournables",
    items: [
      { name: "Margherita", desc: "Sauce tomate, mozzarella, basilic frais, huile d'olive", price: "10 €", img: pizzaMargherita },
      { name: "Reine", desc: "Sauce tomate, mozzarella, jambon, champignons", price: "12 €", img: pizzaReine },
      { name: "4 Fromages", desc: "Mozzarella, chèvre, bleu, parmesan", price: "13 €", img: pizzaQuatreFromages },
    ],
  },
  {
    category: "Savoyardes",
    items: [
      { name: "Savoyarde", desc: "Crème, mozzarella, reblochon, lardons, pommes de terre", price: "14 €", img: pizzaSavoyarde },
      { name: "Montagnarde", desc: "Crème, mozzarella, raclette, jambon, oignons", price: "14 €", img: pizzaMontagnarde },
    ],
  },
  {
    category: "Végétariennes",
    items: [
      { name: "Végétarienne", desc: "Sauce tomate, mozzarella, courgettes, poivrons, champignons, aubergines", price: "12 €", img: pizzaVegetarienne },
    ],
  },
];

const fullMenuExtras = [
  { name: "Chorizo", desc: "Sauce tomate, mozzarella, chorizo, poivrons", price: "12 €" },
  { name: "Végane", desc: "Sauce tomate, légumes grillés, roquette (sans fromage)", price: "12 €" },
  { name: "Calzone", desc: "Sauce tomate, mozzarella, jambon, œuf, champignons", price: "13 €" },
  { name: "Poulet BBQ", desc: "Sauce BBQ, mozzarella, poulet, oignons, poivrons", price: "13 €" },
  { name: "Fruits de mer", desc: "Sauce tomate, mozzarella, crevettes, moules, calamars", price: "15 €" },
  { name: "Tartiflette", desc: "Crème, reblochon, pommes de terre, lardons, oignons", price: "14 €" },
];

const hours = [
  { day: "Lundi", value: "Fermé", closed: true },
  { day: "Mardi", value: "Fermé", closed: true },
  { day: "Mercredi", value: "Fermé", closed: true },
  { day: "Jeudi", value: "18h — 22h" },
  { day: "Vendredi", value: "18h — 22h30" },
  { day: "Samedi", value: "18h — 22h30" },
  { day: "Dimanche", value: "Fermé", closed: true },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground pb-20 md:pb-0">
      <Header />
      <Hero />
      <ActionsSection />
      <HoursSection />
      <MenuSection />
      <WhySection />
      <ReviewsSection />
      <ContactSection />
      <Footer />
      <MobileBar />
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a href="#top" className="flex items-center gap-2">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground font-display font-bold">
            P
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            Pizza Route <span className="text-gold">99</span>
          </span>
        </a>
        <nav className="hidden gap-6 text-sm font-medium md:flex">
          <a href="#menu" className="hover:text-primary transition-colors">Menu</a>
          <a href="#horaires" className="hover:text-primary transition-colors">Horaires</a>
          <a href="#pourquoi" className="hover:text-primary transition-colors">Pourquoi nous</a>
          <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
        </nav>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-warm hover:opacity-90 transition"
        >
          <MessageCircle className="h-4 w-4" /> Commander
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-hero-gradient text-primary-foreground">
      <div className="absolute inset-0 opacity-30">
        <img
          src={heroPizza}
          alt="Pizza artisanale au feu de bois"
          width={1600}
          height={1200}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/40" />
      <div className="relative mx-auto max-w-6xl px-4 py-20 md:py-32">
        <div className="animate-float-up max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/60 bg-black/20 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-gold">
            <Star className="h-3.5 w-3.5 fill-current" /> Pizzeria artisanale · Saint-Sulpice
          </span>
          <h1 className="mt-5 font-display text-5xl font-extrabold leading-[1.05] md:text-7xl">
            Pizza Route <span className="text-gold">99</span>
          </h1>
          <p className="mt-5 text-lg md:text-2xl text-primary-foreground/90 leading-relaxed">
            Des pizzas généreuses, préparées avec passion à Saint-Sulpice.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3.5 text-base font-bold text-gold-foreground shadow-warm hover:scale-[1.02] active:scale-95 transition"
            >
              <MessageCircle className="h-5 w-5" /> Commander sur WhatsApp
            </a>
            <a
              href={`tel:${PHONE}`}
              className="inline-flex items-center gap-2 rounded-full border-2 border-primary-foreground/90 bg-transparent px-6 py-3.5 text-base font-bold text-primary-foreground hover:bg-primary-foreground hover:text-primary transition"
            >
              <Phone className="h-5 w-5" /> Appeler
            </a>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-2 border-primary-foreground/90 bg-transparent px-6 py-3.5 text-base font-bold text-primary-foreground hover:bg-primary-foreground hover:text-primary transition"
            >
              <MapPin className="h-5 w-5" /> Itinéraire
            </a>
          </div>
          <p className="mt-6 text-sm text-primary-foreground/80">
            📍 {ADDRESS} · à quelques minutes de Chambéry
          </p>
        </div>
      </div>
    </section>
  );
}

function ActionsSection() {
  const items = [
    { icon: MessageCircle, label: "WhatsApp", desc: "Commande rapide", href: WHATSAPP_URL, external: true },
    { icon: Phone, label: "Téléphone", desc: PHONE_DISPLAY, href: `tel:${PHONE}` },
    { icon: MapPin, label: "Itinéraire", desc: "Google Maps", href: MAPS_URL, external: true },
  ];
  return (
    <section className="mx-auto max-w-6xl px-4 -mt-8 md:-mt-12 relative z-10">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {items.map(({ icon: Icon, label, desc, href, external }) => (
          <a
            key={label}
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className="group flex items-center gap-4 rounded-2xl bg-card p-5 shadow-card border border-border hover:border-gold transition-all hover:-translate-y-0.5"
          >
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition">
              <Icon className="h-6 w-6" />
            </span>
            <div className="min-w-0">
              <div className="font-display font-bold">{label}</div>
              <div className="text-sm text-muted-foreground truncate">{desc}</div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function HoursSection() {
  return (
    <section id="horaires" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
      <SectionHeader eyebrow="Horaires" title="Quand nous rendre visite" />
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl bg-card border border-border shadow-card p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary text-primary-foreground">
              <Clock className="h-5 w-5" />
            </span>
            <h3 className="font-display text-2xl font-bold">Ouvertures</h3>
          </div>
          <ul className="divide-y divide-border">
            {hours.map((h) => (
              <li key={h.day} className="flex items-center justify-between py-3">
                <span className="font-medium">{h.day}</span>
                <span className={h.closed ? "text-muted-foreground" : "font-bold text-primary"}>
                  {h.value}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-muted-foreground italic">
            Les horaires peuvent exceptionnellement varier. N'hésitez pas à nous appeler pour confirmer.
          </p>
        </div>
        <div className="rounded-3xl bg-primary text-primary-foreground shadow-warm p-6 md:p-8 flex flex-col justify-center">
          <h3 className="font-display text-3xl font-bold">Envie d'une pizza ce soir&nbsp;?</h3>
          <p className="mt-3 text-primary-foreground/85 text-lg">
            Passez commande en un clin d'œil sur WhatsApp ou par téléphone. Vente à emporter uniquement.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 font-bold text-gold-foreground hover:scale-[1.02] transition"
            >
              <MessageCircle className="h-5 w-5" /> WhatsApp
            </a>
            <a
              href={`tel:${PHONE}`}
              className="inline-flex items-center gap-2 rounded-full bg-primary-foreground text-primary px-5 py-3 font-bold hover:opacity-90 transition"
            >
              <Phone className="h-5 w-5" /> {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function MenuSection() {
  return (
    <section id="menu" className="bg-secondary/40 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader
          eyebrow="Notre carte"
          title="Des pizzas généreuses & artisanales"
          sub="Sélection d'exemples — la carte complète est disponible en boutique et évolue selon les saisons."
        />
        <div className="mt-4 rounded-xl border border-gold/40 bg-gold/10 px-4 py-3 text-sm text-foreground/80">
          ⚠️ Les pizzas ci-dessous sont des <strong>exemples fictifs</strong> à remplacer par la carte réelle du restaurant.
        </div>

        {menu.map((cat) => (
          <div key={cat.category} className="mt-12">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-primary">
              {cat.category}
            </h3>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {cat.items.map((pizza) => (
                <PizzaCard key={pizza.name} pizza={pizza} />
              ))}
            </div>
          </div>
        ))}

        <div className="mt-12 flex justify-center">
          <FullMenuDialog />
        </div>
      </div>
    </section>
  );
}

function PizzaCard({ pizza }: { pizza: Pizza }) {
  return (
    <article className="group overflow-hidden rounded-3xl bg-card border border-border shadow-card hover:shadow-warm transition-all hover:-translate-y-1">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={pizza.img}
          alt={`Pizza ${pizza.name}`}
          loading="lazy"
          width={800}
          height={600}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-3 right-3 rounded-full bg-primary px-3 py-1 text-sm font-bold text-primary-foreground shadow-warm">
          {pizza.price}
        </span>
      </div>
      <div className="p-5">
        <h4 className="font-display text-xl font-bold">{pizza.name}</h4>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{pizza.desc}</p>
      </div>
    </article>
  );
}

function FullMenuDialog() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="rounded-full bg-primary px-8 py-6 text-base font-bold text-primary-foreground shadow-warm hover:opacity-90"
        >
          <Utensils className="mr-2 h-5 w-5" /> Voir la carte complète
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-3xl">Carte complète</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground italic">
          Exemples fictifs à remplacer par la carte réelle.
        </p>
        <div className="mt-4 space-y-6">
          {menu.map((cat) => (
            <div key={cat.category}>
              <h4 className="font-display text-xl font-bold text-primary">{cat.category}</h4>
              <ul className="mt-3 divide-y divide-border">
                {cat.items.map((p) => (
                  <li key={p.name} className="flex justify-between gap-4 py-3">
                    <div className="min-w-0">
                      <div className="font-semibold">{p.name}</div>
                      <div className="text-sm text-muted-foreground">{p.desc}</div>
                    </div>
                    <div className="shrink-0 font-bold text-primary">{p.price}</div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h4 className="font-display text-xl font-bold text-primary">Autres créations</h4>
            <ul className="mt-3 divide-y divide-border">
              {fullMenuExtras.map((p) => (
                <li key={p.name} className="flex justify-between gap-4 py-3">
                  <div className="min-w-0">
                    <div className="font-semibold">{p.name}</div>
                    <div className="text-sm text-muted-foreground">{p.desc}</div>
                  </div>
                  <div className="shrink-0 font-bold text-primary">{p.price}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function WhySection() {
  const items = [
    { icon: Heart, title: "Pâte travaillée avec soin", desc: "Longue maturation pour une pâte légère et digeste." },
    { icon: Utensils, title: "Ingrédients généreux", desc: "Fromages fondants, garnitures abondantes, produits frais." },
    { icon: Users, title: "Accueil familial", desc: "Un sourire, un bonjour, et l'envie de vous faire plaisir." },
    { icon: Car, title: "Parking gratuit", desc: "Stationnement facile juste devant la pizzeria." },
    { icon: ShoppingBag, title: "Vente à emporter", desc: "Commandez, on prépare, vous récupérez. Simple et rapide." },
    { icon: Star, title: "Saveurs authentiques", desc: "Recettes savoyardes, classiques italiennes et créations." },
  ];
  return (
    <section id="pourquoi" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
      <SectionHeader eyebrow="Nos engagements" title="Pourquoi choisir Pizza Route 99" />
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="rounded-2xl bg-card border border-border p-6 shadow-card hover:border-gold hover:-translate-y-0.5 transition-all"
          >
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
              <Icon className="h-6 w-6" />
            </span>
            <h4 className="mt-4 font-display text-xl font-bold">{title}</h4>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ReviewsSection() {
  return (
    <section className="bg-primary text-primary-foreground py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <div className="flex justify-center gap-1 text-gold">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-6 w-6 fill-current" />
          ))}
        </div>
        <h2 className="mt-4 font-display text-3xl md:text-5xl font-bold">
          Vous avez aimé&nbsp;?
        </h2>
        <p className="mt-4 text-lg md:text-xl text-primary-foreground/85">
          Laissez-nous un avis sur Google, c'est le plus beau des merci et cela nous aide énormément à faire découvrir notre pizzeria à Saint-Sulpice et à Chambéry.
        </p>
        <a
          href={REVIEW_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 text-base font-bold text-gold-foreground shadow-warm hover:scale-[1.02] transition"
        >
          <Star className="h-5 w-5 fill-current" /> Laisser un avis Google
        </a>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
      <SectionHeader eyebrow="Contact" title="Passez nous voir ou passez commande" />
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <ContactCard
          icon={Phone}
          title="Téléphone"
          lines={[PHONE_DISPLAY]}
          cta="Appeler"
          href={`tel:${PHONE}`}
        />
        <ContactCard
          icon={MessageCircle}
          title="WhatsApp"
          lines={["Commande rapide", "et confirmation directe"]}
          cta="Ouvrir WhatsApp"
          href={WHATSAPP_URL}
          external
        />
        <ContactCard
          icon={MapPin}
          title="Adresse"
          lines={["99 route du Freney", "73160 Saint-Sulpice"]}
          cta="Voir l'itinéraire"
          href={MAPS_URL}
          external
        />
      </div>
      <div className="mt-8 overflow-hidden rounded-3xl border border-border shadow-card">
        <iframe
          title="Carte Pizza Route 99"
          src="https://www.google.com/maps?q=99+route+du+Freney+73160+Saint-Sulpice&output=embed"
          width="100%"
          height="360"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full border-0"
        />
      </div>
    </section>
  );
}

function ContactCard({
  icon: Icon,
  title,
  lines,
  cta,
  href,
  external,
}: {
  icon: typeof Phone;
  title: string;
  lines: string[];
  cta: string;
  href: string;
  external?: boolean;
}) {
  return (
    <div className="flex flex-col rounded-3xl bg-card border border-border shadow-card p-6">
      <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
        <Icon className="h-6 w-6" />
      </span>
      <h4 className="mt-4 font-display text-xl font-bold">{title}</h4>
      <div className="mt-2 text-muted-foreground">
        {lines.map((l) => (
          <div key={l}>{l}</div>
        ))}
      </div>
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 font-semibold text-primary-foreground hover:opacity-90 transition"
      >
        {cta}
      </a>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="font-display text-2xl font-bold">
              Pizza Route <span className="text-gold">99</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Pizzeria artisanale à Saint-Sulpice, à deux pas de Chambéry.
            </p>
          </div>
          <div>
            <div className="font-display font-bold">Nous trouver</div>
            <p className="mt-3 text-sm text-muted-foreground">
              99 route du Freney<br />73160 Saint-Sulpice<br />{PHONE_DISPLAY}
            </p>
          </div>
          <div>
            <div className="font-display font-bold">Suivez-nous</div>
            <div className="mt-3 flex gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col-reverse gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Pizza Route 99 — Tous droits réservés.
          </p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <a href="#" className="hover:text-primary">Mentions légales</a>
            <a href="#" className="hover:text-primary">Politique de confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function MobileBar() {
  return (
    <nav
      aria-label="Actions rapides"
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t border-border bg-background/95 backdrop-blur shadow-[0_-8px_24px_-12px_rgba(0,0,0,0.15)]"
    >
      <div className="grid grid-cols-3">
        <a href={`tel:${PHONE}`} className="flex flex-col items-center gap-1 py-3 text-xs font-semibold text-foreground hover:text-primary">
          <Phone className="h-5 w-5" /> Appeler
        </a>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 py-3 text-xs font-semibold text-primary-foreground bg-primary"
        >
          <MessageCircle className="h-5 w-5" /> WhatsApp
        </a>
        <a
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 py-3 text-xs font-semibold text-foreground hover:text-primary"
        >
          <MapPin className="h-5 w-5" /> Itinéraire
        </a>
      </div>
    </nav>
  );
}

function SectionHeader({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="max-w-2xl">
      <span className="inline-block text-xs font-bold uppercase tracking-widest text-gold">
        {eyebrow}
      </span>
      <h2 className="mt-2 font-display text-3xl md:text-5xl font-bold text-foreground">
        {title}
      </h2>
      {sub && <p className="mt-3 text-muted-foreground">{sub}</p>}
    </div>
  );
}
