import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Star,
  Car,
  Utensils,
  Heart,
  Users,
  ShoppingBag,
  Facebook,
  Instagram,
  Beef,
  Leaf,
  Fish,
  IceCream,
  Sparkles,
  Flame,
  Camera,
  CakeSlice,
  Bus,
  PartyPopper,
  Fish as SushiIcon,
} from "lucide-react";
import heroPizza from "@/assets/hero-pizza.jpg";

const PHONE = "+33767100850";
const PHONE_DISPLAY = "07 67 10 08 50";
const WHATSAPP_URL = "https://wa.me/33767100850";
const MAPS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=99+route+du+Freney+73160+Saint-Sulpice";
const REVIEW_URL =
  "https://search.google.com/local/writereview?placeid=ChIJ6xyTw64Hi0cRVLTe3sXHtPw";
const ADDRESS = "99 route du Freney, 73160 Saint-Sulpice";
const INSTAGRAM_URL = "https://www.instagram.com/pizzaroute99/";

// Photos réelles : déposer les fichiers dans le dossier /public avec exactement ces noms.
// Tant qu'une photo manque, un emplacement élégant s'affiche à la place.
const PHOTOS = {
  busNuit: "/bus-nuit.jpg",
  bus: "/bus-coucher-soleil.jpg",
  busRose: "/bus-ciel-rose.jpg",
  patronne: "/patronne.jpg",
  privatisation: "/privatisation-bus.jpg",
  terrasse: "/terrasse-fete.jpg",
  arche: "/arche-accueil.jpg",
  specialites: "/specialites-saint-sulpice.jpg",
  pizzas: "/pizzas.jpg",
};
// Vidéo de pizza (facultative) : déposer /public/pizza-hero.mp4 pour l'afficher en haut de page.
const HERO_VIDEO = "/pizza-hero.mp4";

const desserts = [
  { name: "Tiramisu", desc: "Au choix" },
  { name: "Moelleux au chocolat", desc: "" },
  { name: "Dessert du jour", desc: "" },
];

const specialites = [
  {
    name: "Chataigneaurum",
    tag: "Spécialité de Saint-Sulpice",
    ingredients: "Châtaignes, rhum, vanille, sucre",
    alcool: true,
  },
  { name: "Confiture de châtaignes", tag: "", ingredients: "Châtaignes, sucre" },
  { name: "Châtaignes & chocolat noir", tag: "", ingredients: "Châtaignes, sucre, chocolat noir" },
  { name: "Châtaignes au rhum ambré", tag: "", ingredients: "Châtaignes, sucre, rhum ambré" },
  { name: "Châtaignes & vanille", tag: "", ingredients: "Châtaignes, vanille, sucre" },
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Pizzeria",
  name: "Pizza Route 99",
  image:
    "https://id-preview--ce9d7f8c-2a83-4e79-a4c5-292e49ae43f3.lovable.app/og-image.jpg",
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
  // Fermeture selon l'affluence — pas d'heure de fermeture fixe.
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Thursday", opens: "18:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "18:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "18:00" },
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
          "Pizza Route 99, votre pizzeria artisanale à Saint-Sulpice près de Chambéry. Pizzas généreuses sur place ou à emporter, commande WhatsApp au 07 67 10 08 50.",
      },
      { property: "og:title", content: "Pizza Route 99 — Pizzeria à Saint-Sulpice" },
      {
        property: "og:description",
        content:
          "Des pizzas généreuses, préparées avec passion à Saint-Sulpice, près de Chambéry.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/og-image.jpg" },
      { name: "twitter:image", content: "/og-image.jpg" },
      { property: "og:locale", content: "fr_FR" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Pizza Route 99 — Pizzeria à Saint-Sulpice" },
      {
        name: "twitter:description",
        content: "Pizzas artisanales sur place ou à emporter à Saint-Sulpice, près de Chambéry.",
      },
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "preload", as: "image", href: "/bus-nuit.jpg" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(structuredData),
      },
    ],
  }),
  component: Index,
});

type MenuItem = { name: string; desc: string };
type MenuCategory = {
  id: string;
  title: string;
  price: string;
  icon: typeof Beef;
  wide?: boolean;
  items: MenuItem[];
};

const menu: MenuCategory[] = [
  {
    id: "viande",
    title: "Viande",
    price: "12 €",
    icon: Beef,
    wide: true,
    items: [
      { name: "Jambon", desc: "Tomate, jambon, emmental / mozza" },
      { name: "Reine", desc: "Tomate, jambon, emmental / mozza, champignons frais, olives" },
      { name: "Bleue", desc: "Crème, jambon, roquefort, emmental / mozza, olives" },
      { name: "Blanche", desc: "Crème, jambon, champignons frais, emmental / mozza, olives" },
      { name: "Pépéroni", desc: "Tomate, pépéroni, emmental / mozza, œuf, olives" },
      { name: "Bolo", desc: "Tomate, bœuf haché, huile au basilic, emmental / mozza, olives" },
      { name: "Savoie", desc: "Tomate, diots, reblochon, emmental / mozza, olives" },
      { name: "Poulet", desc: "Tomate, poulet, poivrons, emmental / mozza, olives" },
      { name: "Flamme", desc: "Crème, oignons, lardons, emmental / mozza" },
      { name: "Curry", desc: "Crème, poulet au curry, emmental / mozza" },
      { name: "Tartiflette", desc: "Crème, oignons, lardons, reblochon, emmental / mozza" },
    ],
  },
  {
    id: "vegetarienne",
    title: "Végétarienne",
    price: "12 €",
    icon: Leaf,
    items: [
      { name: "Margarita", desc: "Tomate, emmental / mozza, olives" },
      { name: "Chèvre", desc: "Tomate, chèvre, emmental / mozza, olives" },
      {
        name: "5 Fromages",
        desc: "Tomate, mozzarella, chèvre, reblochon, roquefort, emmental, olives",
      },
      { name: "Lune de miel", desc: "Tomate, chèvre, miel, crème, emmental / mozza" },
      { name: "Raviole", desc: "Crème, ravioles, chèvre, emmental / mozza, olives" },
      {
        name: "Véggie",
        desc: "Tomate, oignons, aubergines, champignons frais, emmental / mozza, olives",
      },
    ],
  },
  {
    id: "poisson",
    title: "Poisson",
    price: "12 €",
    icon: Fish,
    items: [
      { name: "Saumon", desc: "Crème, saumon fumé, emmental / mozza" },
      { name: "Thon", desc: "Tomate, thon, emmental / mozza, crème" },
      { name: "Tonton", desc: "Crème, thon, emmental / mozza" },
      { name: "Anchois", desc: "Tomate, anchois, emmental / mozza" },
    ],
  },
  {
    id: "coup-de-coeur",
    title: "Coup de cœur",
    price: "12 €",
    icon: Heart,
    items: [
      {
        name: "Sucrée-salée",
        desc: "Tomate, magret fumé, chèvre, miel, crème, emmental / mozza",
      },
      { name: "Magret", desc: "Tomate, lardons, emmental / mozza, magret fumé" },
      { name: "Escargot", desc: "Tomate, escargots, champignons frais, emmental / mozza" },
    ],
  },
  {
    id: "nouveaute",
    title: "Nouveauté",
    price: "12 €",
    icon: Sparkles,
    items: [
      { name: "Moite / Moite", desc: "Mix 2 parfums" },
      { name: "Merguez", desc: "Tomate, merguez, poivrons, oignons, emmental / mozza" },
      {
        name: "Wasabi",
        desc: "Base wasabi, légumes du moment, emmental / mozza, feuilles de nori et sésame",
      },
    ],
  },
];

const hours = [
  { day: "Lundi", value: "Fermé", closed: true },
  { day: "Mardi", value: "Fermé", closed: true },
  { day: "Mercredi", value: "Fermé", closed: true },
  { day: "Jeudi", value: "à partir de 18h" },
  { day: "Vendredi", value: "à partir de 18h" },
  { day: "Samedi", value: "à partir de 18h" },
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
      <PizzBusSection />
      <PrivatisationSection />
      <AlsoSection />
      <PatronneSection />
      <GallerySection />
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
          <img src="/logo.png" alt="Logo Pizza Route 99" width={300} height={320} className="h-11 w-auto" />
          <span className="font-display text-lg font-bold tracking-tight">
            Pizza Route <span className="text-gold">99</span>
          </span>
        </a>
        <nav className="hidden gap-6 text-sm font-medium md:flex">
          <a href="#menu" className="hover:text-primary transition-colors">Menu</a>
          <a href="#pizzbus" className="hover:text-primary transition-colors">Pizz'Bus</a>
          <a href="#privatiser" className="hover:text-primary transition-colors">Privatiser</a>
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
    <section id="top" className="relative overflow-hidden bg-black text-primary-foreground">
      <HeroMedia />
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      <div className="relative mx-auto flex min-h-[82vh] max-w-6xl items-center px-4 pt-16 pb-28 md:min-h-[88vh] md:pb-36">
        <div className="animate-float-up max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/60 bg-black/30 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-gold backdrop-blur">
            <Flame className="h-3.5 w-3.5" /> Pizzas au feu de bois · Saison 9
          </span>
          <h1 className="mt-5 font-display text-5xl font-extrabold leading-[1.02] md:text-7xl">
            Pizza Route <span className="text-gold">99</span>
          </h1>
          <p className="mt-3 font-display text-xl italic text-primary-foreground/90 md:text-2xl">
            La pizza qui tourne au bois
          </p>
          <p className="mt-5 text-lg md:text-xl text-primary-foreground/85 leading-relaxed">
            Pizzas cuites au feu de bois, à déguster au chaud dans le Pizz'Bus, en terrasse ou chez
            vous. Toutes à 12&nbsp;€, à Saint-Sulpice.
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
              className="inline-flex items-center gap-2 rounded-full border-2 border-primary-foreground/90 bg-black/20 px-6 py-3.5 text-base font-bold text-primary-foreground backdrop-blur hover:bg-primary-foreground hover:text-primary transition"
            >
              <Phone className="h-5 w-5" /> Appeler
            </a>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-2 border-primary-foreground/90 bg-black/20 px-6 py-3.5 text-base font-bold text-primary-foreground backdrop-blur hover:bg-primary-foreground hover:text-primary transition"
            >
              <MapPin className="h-5 w-5" /> Itinéraire
            </a>
          </div>
          <p className="mt-6 text-sm text-primary-foreground/80">
            📍 {ADDRESS} · Jeudi, vendredi, samedi dès 18h
          </p>
        </div>
      </div>
    </section>
  );
}

function HeroMedia() {
  // Vidéo si /pizza-hero.mp4 existe, sinon la photo du Pizz'Bus de nuit avec un lent zoom.
  const [video, setVideo] = useState(true);
  return (
    <div className="absolute inset-0 overflow-hidden">
      <img
        src={PHOTOS.busNuit}
        alt="Le Pizz'Bus illuminé, la nuit, à Saint-Sulpice"
        className="h-full w-full object-cover object-[60%_60%] ken-burns"
      />
      {video && (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={HERO_VIDEO}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
          onError={() => setVideo(false)}
        />
      )}
    </div>
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
            Ouvert à partir de 18h, fermeture selon l'affluence.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Saison 9 · de début mars à fin octobre. Sushis sur réservation, la veille uniquement.
          </p>
        </div>
        <div className="rounded-3xl bg-primary text-primary-foreground shadow-warm p-6 md:p-8 flex flex-col justify-center">
          <h3 className="font-display text-3xl font-bold">Envie d'une pizza ce soir&nbsp;?</h3>
          <p className="mt-3 text-primary-foreground/85 text-lg">
            Passez commande en un clin d'œil sur WhatsApp ou par téléphone. Sur place ou à emporter.
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
        <SectionHeader eyebrow="Notre carte" title="Découvrez notre carte" />

        <Reveal className="mt-10">
          <div className="relative h-56 overflow-hidden rounded-3xl shadow-warm md:h-80">
            <Photo
              src={PHOTOS.pizzas}
              fallback={heroPizza}
              alt="Pizzas Route 99 cuites au feu de bois"
              label="Nos pizzas"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 flex flex-wrap items-end justify-between gap-3 p-6 md:p-8 text-white">
              <div>
                <div className="font-display text-3xl font-bold md:text-5xl">Toutes nos pizzas à 12&nbsp;€</div>
                <div className="mt-1 text-white/85">Cuites au feu de bois · taille unique 29&nbsp;cm</div>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-6 grid gap-6 md:grid-cols-2 md:auto-rows-min">
          {menu.map((cat) => (
            <Reveal key={cat.id} className={cat.wide ? "md:col-span-2" : ""}>
              <MenuCategoryCard category={cat} />
            </Reveal>
          ))}
          <Reveal className="md:col-span-2">
            <DessertsCard />
          </Reveal>
        </div>

        <div className="mt-10 rounded-2xl bg-card border border-border shadow-card p-6 md:p-7">
          <h3 className="font-display text-lg font-bold text-primary">Bon à savoir</h3>
          <ul className="mt-3 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
            <li>• Origan sur toutes les pizzas, sauf Jambon, Lune de miel et Sucrée-salée</li>
            <li>• 1 € de supplément par ingrédient supplémentaire</li>
            <li>• Taille unique : 29 cm</li>
            <li>• Dans le Pizz'Bus, en terrasse ou à emporter</li>
            <li>• Parking gratuit</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function MenuCategoryCard({ category }: { category: MenuCategory }) {
  const Icon = category.icon;
  return (
    <article
      className={
        "h-full rounded-3xl bg-card border border-border shadow-card p-6 md:p-7"
      }
    >
      <header className="flex items-center justify-between gap-4 border-b border-border pb-4">
        <div className="flex items-center gap-3 min-w-0">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
            <Icon className="h-5 w-5" strokeWidth={1.75} />
          </span>
          <h3 className="font-display text-xl md:text-2xl font-bold text-foreground truncate">
            {category.title}
          </h3>
        </div>
        <span className="shrink-0 rounded-full bg-primary px-3 py-1 text-sm font-bold text-primary-foreground">
          {category.price}
        </span>
      </header>

      <ul
        className={
          "mt-5 " +
          (category.wide
            ? "grid gap-x-8 gap-y-4 sm:grid-cols-2"
            : "flex flex-col gap-4")
        }
      >
        {category.items.map((item) => (
          <li key={item.name} className="leading-snug">
            <div className="font-display text-base font-bold text-primary">
              {item.name}
            </div>
            {item.desc && (
              <div className="mt-0.5 text-sm text-muted-foreground">
                {item.desc}
              </div>
            )}
          </li>
        ))}
      </ul>
    </article>
  );
}

function WhySection() {
  const items = [
    { icon: Heart, title: "Pâte travaillée avec soin", desc: "Longue maturation pour une pâte légère et digeste." },
    { icon: Utensils, title: "Ingrédients généreux", desc: "Fromages fondants, garnitures abondantes, produits frais." },
    { icon: Users, title: "Accueil familial", desc: "Un sourire, un bonjour, et l'envie de vous faire plaisir." },
    { icon: Car, title: "Parking gratuit", desc: "Stationnement facile juste devant la pizzeria." },
    { icon: ShoppingBag, title: "Sur place ou à emporter", desc: "Installez-vous dans le bus ou en terrasse, ou emportez votre pizza chez vous." },
    { icon: Star, title: "Saveurs authentiques", desc: "Recettes savoyardes, créations maison et produits frais de saison." },
  ];
  return (
    <section id="pourquoi" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
      <SectionHeader eyebrow="Nos engagements" title="Pourquoi choisir Pizza Route 99" />
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(({ icon: Icon, title, desc }) => (
          <Reveal
            key={title}
            className="rounded-2xl bg-card border border-border p-6 shadow-card hover:border-gold hover:-translate-y-0.5 transition-all"
          >
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
              <Icon className="h-6 w-6" />
            </span>
            <h4 className="mt-4 font-display text-xl font-bold">{title}</h4>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{desc}</p>
          </Reveal>
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
            <img src="/logo.png" alt="Pizza Route 99 — la pizza qui tourne au bois" width={300} height={320} loading="lazy" className="h-28 w-auto" />
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
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram @pizzaroute99"
                className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col-reverse gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Pizza Route 99 — Tous droits réservés. · Site réalisé par REVENIX
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

/* ------------------------------------------------------------------ */
/*  Desserts maison                                                    */
/* ------------------------------------------------------------------ */

function DessertsCard() {
  return (
    <article className="relative overflow-hidden rounded-3xl border border-gold/50 bg-gradient-to-br from-card to-secondary p-6 shadow-card md:p-7">
      <header className="flex items-center justify-between gap-4 border-b border-border pb-4">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gold text-gold-foreground">
            <CakeSlice className="h-5 w-5" strokeWidth={1.75} />
          </span>
          <div className="min-w-0">
            <span className="text-[11px] font-bold uppercase tracking-widest text-gold">Nouveau</span>
            <h3 className="font-display text-xl font-bold text-foreground md:text-2xl">Desserts maison</h3>
          </div>
        </div>
        <span className="shrink-0 rounded-full bg-gold px-3 py-1 text-sm font-bold text-gold-foreground">
          4 €
        </span>
      </header>
      <ul className="mt-5 grid gap-x-8 gap-y-4 sm:grid-cols-3">
        {desserts.map((d) => (
          <li key={d.name} className="leading-snug">
            <div className="font-display text-base font-bold text-primary">{d.name}</div>
            {d.desc && <div className="mt-0.5 text-sm text-muted-foreground">{d.desc}</div>}
          </li>
        ))}
      </ul>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/*  Le Pizz'Bus                                                        */
/* ------------------------------------------------------------------ */

function PizzBusSection() {
  return (
    <section id="pizzbus" className="relative overflow-hidden bg-hero-gradient text-primary-foreground">
      <div aria-hidden className="absolute inset-0 hero-glow opacity-70" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
        <Reveal>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-warm ring-1 ring-white/10">
            <Photo
              src={PHOTOS.bus}
              alt="Le Pizz'Bus de Pizza Route 99 au coucher du soleil"
              label="Le Pizz'Bus au coucher du soleil"
              className="h-full w-full object-cover"
              dark
            />
          </div>
        </Reveal>
        <Reveal delay={120}>
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold">
            <Bus className="h-4 w-4" /> Le Pizz'Bus
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold leading-tight md:text-5xl">
            Mangez au chaud dans le Pizz'Bus
          </h2>
          <p className="mt-5 text-lg text-primary-foreground/85 md:text-xl">
            Installez-vous dans le bus ou en terrasse, ou emportez votre pizza chez vous.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 font-bold text-gold-foreground shadow-warm transition hover:scale-[1.02]"
            >
              <MapPin className="h-5 w-5" /> Venir au Pizz'Bus
            </a>
          </div>
        </Reveal>
      </div>
      <BusRoad />
    </section>
  );
}

function BusRoad() {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setP(0.5);
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const prog = (vh - r.top) / (vh + r.height);
      setP(Math.min(1, Math.max(0, prog)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const wheel = { transform: `rotate(${p * 1440}deg)`, transformBox: "fill-box", transformOrigin: "center" } as const;

  return (
    <div ref={ref} aria-hidden className="relative h-28 md:h-32">
      <div className="absolute inset-x-0 bottom-0 h-12 bg-black/40">
        <div className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 road-dashes" />
      </div>
      <div
        className="absolute bottom-6 w-40 md:w-52"
        style={{ left: `${p * 100}%`, transform: `translateX(-${p * 100}%)` }}
      >
        <svg viewBox="0 0 200 104" className="w-full drop-shadow-[0_10px_18px_rgba(0,0,0,0.45)]">
          <ellipse cx="190" cy="62" rx="20" ry="9" fill="#ffd27a" opacity="0.3" />
          <rect x="8" y="10" width="182" height="68" rx="12" fill="#f4f2ee" />
          <rect x="8" y="10" width="182" height="40" rx="12" fill="#15171a" />
          <rect x="8" y="40" width="182" height="10" fill="#15171a" />
          {[18, 48, 98, 128].map((x) => (
            <rect key={x} x={x} y="16" width="26" height="28" rx="3" fill="#ffd99a" opacity="0.85" />
          ))}
          <rect x="76" y="16" width="18" height="56" rx="2" fill="#2a2d31" />
          <rect x="160" y="16" width="26" height="56" rx="3" fill="#2a2d31" />
          <rect x="163" y="19" width="20" height="24" rx="2" fill="#ffd99a" opacity="0.6" />
          <text x="40" y="66" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="9" fill="#15171a">
            PIZZ'BUS
          </text>
          <circle cx="186" cy="66" r="3.5" fill="#ffe08a" />
          <rect x="4" y="66" width="6" height="6" rx="2" fill="#c0392b" />
          {[48, 152].map((cx) => (
            <g key={cx}>
              <circle cx={cx} cy="80" r="15" fill="#1a1412" />
              <g style={wheel}>
                <circle cx={cx} cy="80" r="8" fill="#9a8f86" />
                <line x1={cx - 8} y1="80" x2={cx + 8} y2="80" stroke="#1a1412" strokeWidth="2" />
                <line x1={cx} y1="72" x2={cx} y2="88" stroke="#1a1412" strokeWidth="2" />
              </g>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Sushis & confitures                                                */
/* ------------------------------------------------------------------ */

function AlsoSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
      <SectionHeader eyebrow="Aussi chez nous" title="Sushis & spécialités de Saint-Sulpice" />
      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <article className="flex h-full flex-col justify-between rounded-3xl bg-primary p-7 text-primary-foreground shadow-warm md:p-8">
            <div>
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-white/10">
                <SushiIcon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-display text-3xl font-bold">Sushis</h3>
              <p className="mt-3 text-lg text-primary-foreground/85">
                Sur réservation, la veille uniquement.
              </p>
            </div>
            <a
              href={`tel:${PHONE}`}
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-gold px-5 py-3 font-bold text-gold-foreground transition hover:scale-[1.02]"
            >
              <Phone className="h-5 w-5" /> Réserver vos sushis
            </a>
          </article>
        </Reveal>
        <Reveal delay={120}>
          <article className="h-full rounded-3xl border border-border bg-card p-7 shadow-card md:p-8">
            <span className="text-xs font-bold uppercase tracking-widest text-gold">Fait maison</span>
            <h3 className="mt-2 font-display text-3xl font-bold">Spécialités artisanales</h3>
            <p className="mt-2 text-muted-foreground">
              Confitures de châtaignes de Saint-Sulpice, à emporter.
            </p>
            <ul className="mt-6 divide-y divide-border">
              {specialites.map((sp) => (
                <li key={sp.name} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3">
                  <div>
                    <div className="font-display text-lg font-bold text-primary">{sp.name}</div>
                    {sp.tag && <div className="text-xs font-semibold uppercase tracking-wider text-gold">{sp.tag}</div>}
                  </div>
                  <div className="text-sm text-muted-foreground">{sp.ingredients}</div>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-xs text-muted-foreground">
              Le Chataigneaurum contient de l'alcool. L'abus d'alcool est dangereux pour la santé, à
              consommer avec modération.
            </p>
          </article>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Privatisation                                                      */
/* ------------------------------------------------------------------ */

function PrivatisationSection() {
  return (
    <section id="privatiser" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
      <div className="grid items-center gap-10 md:grid-cols-[1fr_1.15fr]">
        <Reveal>
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold">
            <PartyPopper className="h-4 w-4" /> Privatisation
          </span>
          <h2 className="mt-2 font-display text-4xl font-bold leading-tight md:text-5xl">
            Votre soirée privée au Pizz'Bus
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Pizza Route 99 vous accueille les jours d'ouverture ou en mode privatisé&nbsp;:
            anniversaires, fêtes de famille, soirées entre amis ou entre collègues. Le bus, la
            terrasse, les pizzas au feu de bois&nbsp;: on s'occupe de tout.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground shadow-warm transition hover:opacity-90"
            >
              <MessageCircle className="h-5 w-5" /> Demander une date
            </a>
            <a
              href={`tel:${PHONE}`}
              className="inline-flex items-center gap-2 rounded-full border-2 border-primary px-6 py-3 font-bold text-primary transition hover:bg-primary hover:text-primary-foreground"
            >
              <Phone className="h-5 w-5" /> {PHONE_DISPLAY}
            </a>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="grid grid-cols-5 grid-rows-2 gap-3">
            <div className="col-span-3 row-span-2 overflow-hidden rounded-3xl shadow-warm">
              <img src={PHOTOS.privatisation} alt="Un groupe attablé dans le Pizz'Bus lors d'une soirée privatisée" loading="lazy" className="h-full w-full object-cover" />
            </div>
            <div className="col-span-2 overflow-hidden rounded-2xl shadow-card">
              <img src={PHOTOS.arche} alt="Arche de ballons à l'entrée de Pizza Route 99" loading="lazy" className="aspect-[4/3] h-full w-full object-cover" />
            </div>
            <div className="col-span-2 overflow-hidden rounded-2xl shadow-card">
              <img src={PHOTOS.terrasse} alt="Fête en terrasse devant le Pizz'Bus" loading="lazy" className="aspect-[4/3] h-full w-full object-cover" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Galerie                                                            */
/* ------------------------------------------------------------------ */

function GallerySection() {
  const photos = [
    { src: PHOTOS.busRose, alt: "Le Pizz'Bus sous un ciel rose, face aux montagnes", cls: "md:col-span-2 md:row-span-2" },
    { src: PHOTOS.busNuit, alt: "Le Pizz'Bus illuminé sous la lune", cls: "" },
    { src: PHOTOS.terrasse, alt: "La terrasse un jour de fête", cls: "" },
    { src: PHOTOS.bus, alt: "Coucher de soleil sur les montagnes depuis Pizza Route 99", cls: "md:col-span-2" },
  ];
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
      <SectionHeader eyebrow="L'ambiance" title="Un coin de Savoie, face aux montagnes" />
      <div className="mt-10 grid auto-rows-[180px] grid-cols-2 gap-3 md:auto-rows-[220px] md:grid-cols-4">
        {photos.map((ph, i) => (
          <Reveal key={ph.src} delay={i * 80} className={"group overflow-hidden rounded-2xl shadow-card " + ph.cls}>
            <img src={ph.src} alt={ph.alt} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  La patronne                                                        */
/* ------------------------------------------------------------------ */

function PatronneSection() {
  return (
    <section className="bg-secondary/40 py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[2rem] shadow-warm">
            <Photo
              src={PHOTOS.patronne}
              alt="La patronne de Pizza Route 99"
              label="La patronne"
              className="h-full w-full object-cover"
            />
          </div>
        </Reveal>
        <Reveal delay={120}>
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-gold">La patronne</span>
          <h2 className="mt-2 font-display text-3xl font-bold md:text-5xl">
            Une pizzeria familiale, tenue avec cœur
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Derrière le four à bois, une patronne passionnée qui fait vivre Pizza Route 99 depuis neuf
            saisons. Passez la saluer&nbsp;: elle saura vous conseiller la pizza qu'il vous faut.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Utilitaires : photo avec repli, apparition au scroll              */
/* ------------------------------------------------------------------ */

function Photo({
  src,
  alt,
  label,
  className,
  fallback,
  dark,
}: {
  src: string;
  alt: string;
  label: string;
  className?: string;
  fallback?: string;
  dark?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  if (failed && fallback) {
    return <img src={fallback} alt={alt} loading="lazy" className={className} />;
  }
  if (failed) {
    return (
      <div
        className={
          "grid h-full w-full place-items-center p-6 text-center " +
          (dark ? "bg-black/30 text-primary-foreground/70" : "bg-gradient-to-br from-secondary to-muted text-muted-foreground")
        }
      >
        <div className="flex flex-col items-center gap-2">
          <Camera className="h-8 w-8 opacity-60" strokeWidth={1.5} />
          <span className="font-display text-lg">{label}</span>
          <span className="text-xs uppercase tracking-widest opacity-70">Photo à venir</span>
        </div>
      </div>
    );
  }
  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // "static" au rendu serveur : le contenu reste visible même sans JavaScript.
  const [state, setState] = useState<"static" | "hidden" | "shown">("static");

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;
    setState("hidden");
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setState("shown");
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={(state === "static" ? "" : state === "hidden" ? "reveal " : "reveal reveal-in ") + className}
      style={state === "shown" ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
