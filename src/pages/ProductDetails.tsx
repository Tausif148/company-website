import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  getProductBySlug,
  getRelatedProducts,
  Product,
} from "src/data/productData";
import {
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
  CheckCircle2,
  Zap,
  Shield,
  Globe,
  Cpu,
  BarChart3,
  PhoneCall,
  Mail,
  Calendar,
} from "lucide-react";

// ─── Reveal hook ──────────────────────────────────────────────────────────────
function useReveal(slug?: string) {
  useEffect(() => {
    // Strip reveal-visible so elements animate fresh on every product change
    document
      .querySelectorAll<HTMLElement>(".reveal")
      .forEach((el) => el.classList.remove("reveal-visible"));

    // Defer one tick so the DOM settles before we start observing
    const timer = setTimeout(() => {
      const els = document.querySelectorAll<HTMLElement>(".reveal");
      const observer = new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            if (e.isIntersecting) {
              (e.target as HTMLElement).classList.add("reveal-visible");
              observer.unobserve(e.target);
            }
          }),
        { threshold: 0.1 }
      );
      els.forEach((el) => observer.observe(el));
      // cleanup runs when slug changes or component unmounts
      return () => observer.disconnect();
    }, 50);

    return () => clearTimeout(timer);
  }, [slug]);
}

// ─── Stat pill ────────────────────────────────────────────────────────────────
const Stat: React.FC<{ value: string; label: string }> = ({ value, label }) => (
  <div className="flex flex-col items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-5 py-3 min-w-[90px]">
    <span className="text-2xl font-bold text-white leading-none">{value}</span>
    <span className="text-xs text-slate-300 mt-1 text-center">{label}</span>
  </div>
);

// ─── Badge ────────────────────────────────────────────────────────────────────
const Badge: React.FC<{ children: React.ReactNode; accent?: boolean }> = ({
  children,
  accent,
}) => (
  <span
    className={`inline-block text-xs font-semibold rounded-full px-3 py-1 ${accent
        ? "bg-[#FF7F00]/10 text-[#FF7F00] border border-[#FF7F00]/20"
        : "bg-[#EEF3FB] text-[#2563EB] border border-blue-100"
      }`}
  >
    {children}
  </span>
);

// ─── Gallery with lightbox ────────────────────────────────────────────────────
const Gallery: React.FC<{ images: string[]; title: string }> = ({
  images,
  title,
}) => {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const prev = () => setActive((a) => (a - 1 + images.length) % images.length);
  const next = () => setActive((a) => (a + 1) % images.length);

  useEffect(() => {
    if (!lightbox) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <div className="reveal">
        {/* Main */}
        <div
          className="relative bg-[#081D3A] rounded-[24px] overflow-hidden mb-3 cursor-zoom-in group"
          onClick={() => setLightbox(true)}
        >
          <img
            key={active}
            src={images[active]}
            alt={`${title} — view ${active + 1}`}
            className="w-full h-[300px] sm:h-[380px] lg:h-[440px] object-cover transition-all duration-500"
          />
          {/* Zoom hint */}
          <div className="absolute inset-0 bg-[#081D3A]/0 group-hover:bg-[#081D3A]/20 transition-all duration-300 flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/30">
              Click to expand
            </span>
          </div>
          {/* Nav arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/40 text-white rounded-full p-2 transition-all"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/40 text-white rounded-full p-2 transition-all"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
          {/* Dot indicator */}
          {images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setActive(i); }}
                  className={`rounded-full transition-all duration-200 ${i === active ? "w-5 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/50"
                    }`}
                />
              ))}
            </div>
          )}
        </div>
        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-2.5">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`flex-1 rounded-xl overflow-hidden border-2 transition-all duration-200 ${i === active
                    ? "border-[#FF7F00] shadow-[0_0_0_3px_rgba(255,127,0,0.2)]"
                    : "border-transparent opacity-50 hover:opacity-80"
                  }`}
              >
                <img src={img} alt="" className="w-full h-[60px] sm:h-[72px] object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightbox(false)}
        >
          <button
            className="absolute top-5 right-5 text-white/70 hover:text-white bg-white/10 rounded-full p-2 transition"
            onClick={() => setLightbox(false)}
          >
            <X className="h-6 w-6" />
          </button>
          {images.length > 1 && (
            <>
              <button
                className="absolute left-5 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-white/10 rounded-full p-3 transition"
                onClick={(e) => { e.stopPropagation(); prev(); }}
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                className="absolute right-5 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-white/10 rounded-full p-3 transition"
                onClick={(e) => { e.stopPropagation(); next(); }}
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}
          <img
            src={images[active]}
            alt={`${title} — ${active + 1}`}
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};

// ─── Feature card ─────────────────────────────────────────────────────────────
const FeatureCard: React.FC<{
  icon: string;
  title: string;
  body: string;
  delay?: number;
}> = ({ icon, title, body, delay = 0 }) => (
  <div
    className="reveal group relative bg-white rounded-[20px] p-6 border border-slate-100
      shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_rgba(8,29,58,0.1)]
      hover:-translate-y-1 transition-all duration-300 overflow-hidden"
    style={{ transitionDelay: `${delay}s` }}
  >
    {/* Accent corner */}
    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#FF7F00]/8 to-transparent rounded-bl-[40px]" />
    <span className="text-3xl mb-4 block">{icon}</span>
    <h3 className="font-bold text-[#081D3A] mb-2 text-base">{title}</h3>
    <p className="text-slate-500 text-sm leading-relaxed">{body}</p>
  </div>
);

// ─── Spec table ───────────────────────────────────────────────────────────────
const SpecTable: React.FC<{ specs: { label: string; value: string }[] }> = ({
  specs,
}) => (
  <div className="bg-white rounded-[20px] border border-slate-100 shadow-[0_4px_16px_rgba(0,0,0,0.04)] overflow-hidden">
    {specs.map((spec, i) => (
      <div
        key={spec.label}
        className={`flex items-center justify-between px-6 py-3.5 ${i < specs.length - 1 ? "border-b border-slate-50" : ""
          } ${i % 2 === 1 ? "bg-[#F7F8FC]/70" : ""}`}
      >
        <span className="text-slate-500 text-sm">{spec.label}</span>
        <span className="text-[#081D3A] font-semibold text-sm text-right">{spec.value}</span>
      </div>
    ))}
  </div>
);

// ─── Industry card ────────────────────────────────────────────────────────────
const industryMeta: Record<string, { icon: React.ElementType; color: string }> = {
  "Banking & Finance": { icon: BarChart3, color: "#2563EB" },
  "Critical Infrastructure": { icon: Shield, color: "#DC2626" },
  Healthcare: { icon: CheckCircle2, color: "#16A34A" },
  "Smart Buildings": { icon: Cpu, color: "#7C3AED" },
  "Government & Defence": { icon: Globe, color: "#0891B2" },
};

const IndustryCard: React.FC<{ name: string }> = ({ name }) => {
  const meta = industryMeta[name] ?? { icon: Globe, color: "#6B7280" };
  const Icon = meta.icon;
  return (
    <div className="flex items-center gap-3 bg-white rounded-2xl border border-slate-100 px-4 py-3.5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-200">
      <div
        className="flex h-9 w-9 items-center justify-center rounded-xl shrink-0"
        style={{ backgroundColor: `${meta.color}15` }}
      >
        <Icon className="h-4 w-4" style={{ color: meta.color }} />
      </div>
      <span className="text-sm font-semibold text-[#081D3A]">{name}</span>
    </div>
  );
};

// ─── FAQ accordion ────────────────────────────────────────────────────────────
const FAQ: React.FC<{ q: string; a: string }> = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        className="w-full flex items-center justify-between py-4 text-left gap-4 group"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="text-sm font-semibold text-[#081D3A] group-hover:text-[#FF7F00] transition-colors">
          {q}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-slate-400 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""
            }`}
        />
      </button>
      {open && (
        <p className="text-sm text-slate-500 leading-relaxed pb-4">{a}</p>
      )}
    </div>
  );
};

// ─── Related card ─────────────────────────────────────────────────────────────
const RelatedCard: React.FC<{ product: Product }> = ({ product }) => (
  <Link
    to={`/products/${product.slug}`}
    className="group flex flex-col bg-white rounded-[20px] border border-slate-100
      shadow-[0_4px_16px_rgba(0,0,0,0.05)] hover:shadow-[0_16px_40px_rgba(8,29,58,0.1)]
      hover:-translate-y-1 transition-all duration-300 overflow-hidden"
  >
    <div className="bg-[#081D3A] overflow-hidden">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-[160px] object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
      />
    </div>
    <div className="p-5 flex flex-col flex-1">
      <p className="text-xs text-slate-400 font-medium mb-1">{product.subtitle}</p>
      <h3 className="font-bold text-[#081D3A] text-base mb-2 flex-1">{product.title}</h3>
      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#FF7F00] group-hover:gap-2.5 transition-all duration-200">
        View Details <ArrowRight className="h-4 w-4" />
      </span>
    </div>
  </Link>
);

// ─── Section wrapper ──────────────────────────────────────────────────────────
const Section: React.FC<{
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  id?: string;
  dark?: boolean;
}> = ({ title, subtitle, children, id, dark }) => (
  <section
    id={id}
    className={`py-7 lg:py-10 ${dark ? "bg-[#081D3A]" : ""}`}
  >
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="reveal mb-10 lg:mb-12">
        <h2
          className={`text-2xl sm:text-3xl lg:text-[32px] font-bold leading-tight ${dark ? "text-white" : "text-[#081D3A]"
            }`}
        >
          {title}
        </h2>
        {subtitle && (
          <p className={`mt-2 text-base ${dark ? "text-slate-400" : "text-slate-500"}`}>
            {subtitle}
          </p>
        )}
      </div>
      {children}
    </div>
  </section>
);

// ─── Static FAQ data (can be moved to productData later) ─────────────────────
const FAQS = [
  {
    q: "What deployment environments are supported?",
    a: "The product supports on-premise, private cloud, and hybrid deployments. It ships with Docker images and Helm charts for Kubernetes environments.",
  },
  {
    q: "Is professional services support available?",
    a: "Yes. SK Solution offers implementation, integration, and training packages. Your account team will scope the engagement during the demo.",
  },
  {
    q: "What are the hardware requirements?",
    a: "Requirements vary by module and expected throughput. Detailed sizing guides are provided in the technical documentation, available post-NDA.",
  },
  {
    q: "How is data security handled?",
    a: "All data is encrypted at rest (AES-256) and in transit (TLS 1.3). The product supports RBAC, audit logging, and integrates with your existing IAM provider.",
  },
  {
    q: "What does the licensing model look like?",
    a: "Licensing is available as perpetual (on-premise) or annual subscription (cloud/hybrid). Volume pricing is available for enterprise deployments.",
  },
];

// ─── Enquiry CTA ──────────────────────────────────────────────────────────────
const EnquiryCTA: React.FC<{ productTitle: string }> = ({ productTitle }) => {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", msg: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="reveal bg-gradient-to-br from-[#081D3A] via-[#0f2d5a] to-[#081D3A] rounded-[28px] p-8 sm:p-10 lg:p-12 border border-white/10">
      {sent ? (
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/15 mb-4">
            <CheckCircle2 className="h-8 w-8 text-green-400" />
          </div>
          <p className="text-xl font-bold text-white mb-2">Enquiry received</p>
          <p className="text-slate-400 text-sm">
            Our team will reach out within one business day.
          </p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 items-start">
          {/* Left copy */}
          <div>
            <Badge accent>Get in touch</Badge>
            <h3 className="mt-4 text-2xl sm:text-3xl font-bold text-white leading-tight">
              Ready to see {productTitle} in action?
            </h3>
            <p className="mt-3 text-slate-400 text-sm leading-relaxed">
              Talk to a specialist who knows your industry. We'll walk you through a live demo and help you evaluate fit.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              {[
                { icon: PhoneCall, label: "Live product demo" },
                { icon: Calendar, label: "Flexible scheduling" },
                { icon: Mail, label: "Response within 1 business day" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FF7F00]/15 shrink-0">
                    <Icon className="h-4 w-4 text-[#FF7F00]" />
                  </div>
                  <span className="text-sm text-slate-300">{label}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="grid sm:grid-cols-2 gap-4">
            {[
              { id: "pd-name", label: "Full Name", type: "text", placeholder: "Jane Smith", key: "name" as const },
              { id: "pd-email", label: "Work Email", type: "email", placeholder: "jane@company.com", key: "email" as const },
            ].map((f) => (
              <div key={f.id} className="flex flex-col gap-1.5">
                <label htmlFor={f.id} className="text-xs text-slate-400 font-medium">
                  {f.label}
                </label>
                <input
                  id={f.id}
                  type={f.type}
                  required
                  placeholder={f.placeholder}
                  value={form[f.key]}
                  onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))}
                  className="bg-white/8 border border-white/15 rounded-xl px-4 py-2.5
                    text-white placeholder-slate-500 text-sm focus:outline-none
                    focus:border-[#FF7F00]/60 focus:bg-white/12 transition"
                />
              </div>
            ))}
            <div className="sm:col-span-2 flex flex-col gap-1.5">
              <label htmlFor="pd-msg" className="text-xs text-slate-400 font-medium">
                Message
              </label>
              <textarea
                id="pd-msg"
                rows={4}
                placeholder="Describe your deployment environment and requirements…"
                value={form.msg}
                onChange={(e) => setForm((p) => ({ ...p, msg: e.target.value }))}
                className="bg-white/8 border border-white/15 rounded-xl px-4 py-2.5
                  text-white placeholder-slate-500 text-sm focus:outline-none
                  focus:border-[#FF7F00]/60 focus:bg-white/12 transition resize-none"
              />
            </div>
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="w-full sm:w-auto bg-[#FF7F00] hover:bg-[#e67300] active:bg-[#cc6600]
                  text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200
                  shadow-[0_4px_16px_rgba(255,127,0,0.35)] hover:shadow-[0_6px_24px_rgba(255,127,0,0.5)]"
              >
                Send Enquiry
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

// ─── Main page ────────────────────────────────────────────────────────────────
const ProductDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  useReveal(slug);

  const product = slug ? getProductBySlug(slug) : undefined;
  const related = slug ? getRelatedProducts(slug) : [];

  useEffect(() => {
    if (!product) navigate("/", { replace: true });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  }, [product, navigate]);

  if (!product) return null;

  return (
    <>
      <style>{`
        .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.55s ease, transform 0.55s ease; }
        .reveal-visible { opacity: 1; transform: none; }
        @media (prefers-reduced-motion: reduce) { .reveal { opacity: 1 !important; transform: none !important; } }
        .hero-gradient { background: linear-gradient(135deg, #081D3A 0%, #0d2a56 60%, #0a1f3d 100%); }
        .orange-underline { position: relative; display: inline-block; }
        .orange-underline::after { content: ''; position: absolute; bottom: -4px; left: 0; width: 100%; height: 3px; background: #FF7F00; border-radius: 2px; }
      `}</style>

      <main className="bg-[#F7F8FC] min-h-screen">

        {/* ══════════════════════════════════════════════
            HERO — dark full-bleed, gallery left, info right
        ══════════════════════════════════════════════ */}
        <div className="hero-gradient">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 lg:pt-16 lg:pb-20">
            {/* Breadcrumb */}
            <nav className="mb-8 flex items-center gap-2 text-xs text-slate-400">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link to="/products" className="hover:text-white transition-colors">Products</Link>
              <span>/</span>
              <span className="text-slate-300">{product.title}</span>
            </nav>

            <div className="grid lg:grid-cols-[1fr_480px] xl:grid-cols-[1fr_520px] gap-10 xl:gap-16 items-start">
              {/* Gallery */}
              <Gallery images={product.gallery} title={product.title} />

              {/* Info panel */}
              <div className="flex flex-col gap-5 reveal">
                {/* Eyebrow */}
                <Badge accent>{product.subtitle}</Badge>

                {/* Title */}
                <div>
                  <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-white leading-tight tracking-tight">
                    {product.title}
                  </h1>
                  <p className="mt-2 text-[#FF7F00] font-semibold text-base sm:text-lg">
                    {product.tagline}
                  </p>
                </div>

                {/* Description */}
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {product.description}
                </p>

                {/* Stats row */}
                <div className="flex flex-wrap gap-3 py-1">
                  <Stat value="99.97%" label="Accuracy" />
                  <Stat value="0.02s" label="Response" />
                  <Stat value="IP67" label="Rated" />
                </div>

                {/* Industries */}
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2.5">
                    Industries Served
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.industries.map((ind) => (
                      <Badge key={ind}>{ind}</Badge>
                    ))}
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-3 pt-1">
                  <a
                    href="#enquire"
                    className="bg-[#FF7F00] hover:bg-[#e67300] text-white font-semibold
                      px-7 py-3 rounded-xl transition-all duration-200
                      shadow-[0_4px_16px_rgba(255,127,0,0.4)] hover:shadow-[0_6px_24px_rgba(255,127,0,0.5)]
                      inline-flex items-center gap-2"
                  >
                    Request a Demo <ArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href="#specs"
                    className="bg-white/10 hover:bg-white/20 text-white font-semibold
                      px-7 py-3 rounded-xl border border-white/20 transition-all duration-200
                      inline-flex items-center gap-2"
                  >
                    <Zap className="h-4 w-4" /> View Specs
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            FEATURES & BENEFITS
        ══════════════════════════════════════════════ */}
        <Section
          title="Features & Benefits"
          subtitle="Everything you need to deploy with confidence."
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {product.features.map((f, i) => (
              <FeatureCard
                key={f.title}
                icon={f.icon}
                title={f.title}
                body={f.body}
                delay={i * 0.06}
              />
            ))}
          </div>
        </Section>

        {/* ══════════════════════════════════════════════
            TECHNICAL SPECIFICATIONS
        ══════════════════════════════════════════════ */}
        <div id="specs" className="scroll-mt-8 bg-white py-7 lg:py-10">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="reveal mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#081D3A]">
                Technical Specifications
              </h2>
              <p className="mt-2 text-slate-500 text-base">
                Built to operate at the edge, where reliability isn't optional.
              </p>
            </div>
            <div className="grid lg:grid-cols-[1fr_1fr] gap-8 items-start">
              <div className="reveal">
                <SpecTable specs={product.specs} />
              </div>
              {/* Value props alongside specs */}
              <div className="reveal flex flex-col gap-4" style={{ transitionDelay: "0.1s" }}>
                {[
                  {
                    icon: Shield,
                    color: "#2563EB",
                    title: "Enterprise-grade security",
                    body: "AES-256 at rest, TLS 1.3 in transit. All biometric data stays on-device — nothing leaves your perimeter.",
                  },
                  {
                    icon: Cpu,
                    color: "#7C3AED",
                    title: "On-device neural processing",
                    body: "Dedicated NPU handles up to 50 simultaneous face recognitions per frame without a network round-trip.",
                  },
                  {
                    icon: Globe,
                    color: "#0891B2",
                    title: "Seamless integration",
                    body: "REST + gRPC APIs, a native SDK, and pre-built connectors for the most common access-control platforms.",
                  },
                ].map(({ icon: Icon, color, title, body }) => (
                  <div
                    key={title}
                    className="flex gap-4 bg-[#F7F8FC] rounded-2xl border border-slate-100 p-5"
                  >
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-xl shrink-0"
                      style={{ backgroundColor: `${color}12` }}
                    >
                      <Icon className="h-5 w-5" style={{ color }} />
                    </div>
                    <div>
                      <p className="font-bold text-[#081D3A] text-sm mb-1">{title}</p>
                      <p className="text-slate-500 text-sm leading-relaxed">{body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            INDUSTRIES SERVED
        ══════════════════════════════════════════════ */}
        <Section
          title="Industries Served"
          subtitle="Deployed across regulated and high-security environments worldwide."
        >
          <div className="reveal grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {product.industries.map((ind) => (
              <IndustryCard key={ind} name={ind} />
            ))}
          </div>
        </Section>

        {/* ══════════════════════════════════════════════
            FAQ
        ══════════════════════════════════════════════ */}
        <div className="bg-white py-7 lg:py-10">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 items-start">
              <div className="reveal">
                <Badge accent>FAQ</Badge>
                <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-[#081D3A] leading-tight">
                  Common questions about {product.title}
                </h2>
                <p className="mt-3 text-slate-500 text-sm leading-relaxed">
                  Can't find what you're looking for? Reach out and a specialist will respond within one business day.
                </p>
                <a
                  href="#enquire"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#FF7F00] hover:gap-3 transition-all duration-200"
                >
                  Ask a question <ArrowRight className="h-4 w-4" />
                </a>
              </div>
              <div className="reveal bg-[#F7F8FC] rounded-[20px] border border-slate-100 px-6 py-2" style={{ transitionDelay: "0.1s" }}>
                {FAQS.map((faq) => (
                  <FAQ key={faq.q} q={faq.q} a={faq.a} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            RELATED PRODUCTS
        ══════════════════════════════════════════════ */}
        {related.length > 0 && (
          <Section
            title="Related Products"
            subtitle="Other solutions from the SK Solution portfolio."
          >
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {related.map((rp) => (
                <RelatedCard key={rp.id} product={rp} />
              ))}
            </div>
          </Section>
        )}

        {/* ══════════════════════════════════════════════
            ENQUIRY CTA
        ══════════════════════════════════════════════ */}
        <div id="enquire" className="bg-white scroll-mt-4 py-7 lg:py-10">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <EnquiryCTA productTitle={product.title} />
          </div>
        </div>

      </main>
    </>
  );
};

export default ProductDetails;