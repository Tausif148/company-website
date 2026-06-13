import { type ReactNode } from "react";
import { Link } from "react-router-dom";
import ProductSlider from "src/components/ProductSlider";

// ─── Primitives ───────────────────────────────────────────────────────────────
function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em]"
      style={{
        color: "#FF7F00",
        borderColor: "rgba(255,127,0,0.3)",
        backgroundColor: "rgba(255,127,0,0.08)",
      }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full animate-pulse"
        style={{ backgroundColor: "#FF7F00" }}
      />
      {children}
    </span>
  );
}

// ─── Dashboard Mockup ─────────────────────────────────────────────────────────
function DashboardMockup() {
  const bars = [62, 45, 78, 55, 88, 70, 92, 65, 84, 75];

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden"
      style={{
        background: "#0d1f3c",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow:
          "0 0 0 1px rgba(0,0,0,0.3), 0 40px 80px rgba(0,0,0,0.4), 0 0 60px rgba(255,127,0,0.06)",
      }}
    >
      {/* Window chrome */}
      <div
        className="flex items-center gap-2 px-4 py-3 border-b"
        style={{ background: "#0a1628", borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div className="flex gap-1.5">
          {["#ff5f57", "#ffbd2e", "#28c840"].map((c) => (
            <span key={c} className="w-3 h-3 rounded-full" style={{ backgroundColor: c }} />
          ))}
        </div>
        <div
          className="flex-1 mx-4 rounded-md px-3 py-1 text-[11px] text-center font-mono"
          style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.3)" }}
        >
          app.SK Solution.tech/dashboard
        </div>
      </div>

      {/* App layout */}
      <div className="flex" style={{ minHeight: "360px" }}>
        {/* Sidebar */}
        <div
          className="w-14 flex-shrink-0 flex flex-col items-center py-4 gap-4 border-r"
          style={{ background: "#0a1628", borderColor: "rgba(255,255,255,0.05)" }}
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center mb-2"
            style={{ background: "#FF7F00" }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8L8 3L13 8L8 13Z" stroke="#fff" strokeWidth="1.5" fill="none" />
              <circle cx="8" cy="8" r="2" fill="#fff" />
            </svg>
          </div>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: i === 0 ? "rgba(255,127,0,0.15)" : "transparent" }}
            >
              <svg
                width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke={i === 0 ? "#FF7F00" : "rgba(255,255,255,0.3)"}
                strokeWidth="1.5" strokeLinecap="round"
              >
                {i === 0 && <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>}
                {i === 1 && <><path d="M3 12h18M3 6h18M3 18h18" /></>}
                {i === 2 && <><path d="M9 3H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z" /><path d="M9 15H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2z" /></>}
              </svg>
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="flex-1 p-5 flex flex-col gap-4 overflow-hidden">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] font-bold mb-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
                OPERATIONS DASHBOARD
              </div>
              <div className="text-sm font-bold text-white">Factory Floor — Line 3</div>
            </div>
            <div
              className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold"
              style={{ background: "rgba(40,200,64,0.12)", color: "#28c840", border: "1px solid rgba(40,200,64,0.2)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#28c840] animate-pulse" />
              Live
            </div>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "OEE Score", value: "87.4%", delta: "+4.2%" },
              { label: "Downtime", value: "2.1 hrs", delta: "−67%" },
              { label: "Machines", value: "412/420", delta: "98%" },
            ].map((k) => (
              <div
                key={k.label}
                className="rounded-xl p-3"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="text-[10px] font-semibold mb-1.5 uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.35)" }}>
                  {k.label}
                </div>
                <div className="text-base font-black text-white leading-none mb-1">{k.value}</div>
                <div className="text-[10px] font-bold" style={{ color: "#28c840" }}>{k.delta}</div>
              </div>
            ))}
          </div>

          {/* Bar chart */}
          <div
            className="flex-1 rounded-xl p-3"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
          >
            <div className="text-[10px] font-semibold mb-3 uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.3)" }}>
              Throughput — Last 10 shifts
            </div>
            <div className="flex items-end gap-1.5 h-20">
              {bars.map((h, i) => (
                <div key={i} className="flex-1">
                  <div
                    className="w-full rounded-sm"
                    style={{
                      height: `${(h / 100) * 72}px`,
                      background:
                        i === bars.length - 1
                          ? "#FF7F00"
                          : i >= bars.length - 3
                            ? "rgba(255,127,0,0.4)"
                            : "rgba(255,255,255,0.12)",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right alerts panel */}
        <div
          className="w-44 flex-shrink-0 border-l p-4 flex flex-col gap-3"
          style={{ background: "#0a1628", borderColor: "rgba(255,255,255,0.05)" }}
        >
          <div className="text-[10px] font-black uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>
            Alerts
          </div>
          {[
            { label: "Machine 17 — Temp ↑", level: "warn" },
            { label: "Line 2 speed normal", level: "ok" },
            { label: "Maintenance due: M43", level: "warn" },
            { label: "Shift change 06:00", level: "info" },
          ].map((a) => (
            <div
              key={a.label}
              className="rounded-lg px-3 py-2 text-[10px] font-medium leading-snug"
              style={{
                background:
                  a.level === "warn" ? "rgba(255,127,0,0.1)" :
                    a.level === "ok" ? "rgba(40,200,64,0.08)" :
                      "rgba(255,255,255,0.04)",
                color:
                  a.level === "warn" ? "#FF7F00" :
                    a.level === "ok" ? "#28c840" :
                      "rgba(255,255,255,0.45)",
                border: `1px solid ${a.level === "warn" ? "rgba(255,127,0,0.2)" :
                  a.level === "ok" ? "rgba(40,200,64,0.15)" :
                    "rgba(255,255,255,0.06)"
                  }`,
              }}
            >
              {a.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function ProductHero() {
  return (
    <section
      className="relative overflow-hidden pt-28 pb-0"
      style={{ backgroundColor: "#081D3A" }}
    >
      {/* Grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* Center top glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 w-[900px] h-[500px] opacity-[0.13]"
        style={{
          background: "radial-gradient(ellipse at center top, #FF7F00, transparent 60%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
        {/* Centered headline */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 flex justify-center">
            <Eyebrow>Product Suite</Eyebrow>
          </div>

          <h1 className="mb-5 text-5xl font-black leading-[1.06] tracking-tight text-white sm:text-6xl lg:text-[4.25rem]">
            Software your team
            <br />
            <span className="relative inline-block" style={{ color: "#FF7F00" }}>
              actually ships with.
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 400 8" fill="none" aria-hidden>
                <path d="M2 6 Q100 2 200 6 Q300 10 398 4" stroke="#FF7F00" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.6" />
              </svg>
            </span>
          </h1>

          <p
            className="mx-auto mb-8 max-w-xl text-base sm:text-lg leading-relaxed"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            IoT platforms, industrial ERPs, BI dashboards, and mobile apps —
            each product engineered for operational realities, not a boardroom deck.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            <a href="#products"
              className="rounded-xl px-7 py-3.5 text-sm font-bold text-white transition-all duration-200 hover:opacity-90 hover:shadow-[0_8px_30px_rgba(255,127,0,0.4)] active:scale-95 cursor-pointer"
              style={{ background: "#FF7F00" }}
            >
              Explore Products
            </a>
            <Link
              to="/contact"
              className="flex items-center gap-2 rounded-xl border px-7 py-3.5 text-sm font-bold transition-all duration-200 hover:bg-white/10 active:scale-95"
              style={{ borderColor: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.7)" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
              Watch Demo
            </Link>
          </div>

          {/* Stats strip */}
          <div
            className="grid grid-cols-4 divide-x rounded-2xl overflow-hidden mb-14 max-w-lg mx-auto"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {[
              { value: "15+", label: "Products" },
              { value: "300+", label: "Deployments" },
              { value: "12", label: "Industries" },
              { value: "99.9%", label: "Uptime" },
            ].map((s, i) => (
              <div
                key={s.label}
                className="text-center py-4 px-2"
                style={{ borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.06)" : "none" }}
              >
                <div
                  className="text-lg font-black"
                  style={{ color: i % 2 === 0 ? "#FF7F00" : "#fff" }}
                >
                  {s.value}
                </div>
                <div
                  className="text-[9px] font-bold uppercase tracking-wider mt-0.5"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dashboard mockup */}
        <div className="relative mx-auto max-w-5xl">
          <div
            aria-hidden
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-2/3 h-16 opacity-40"
            style={{
              background: "radial-gradient(ellipse, #FF7F00, transparent 70%)",
              filter: "blur(20px)",
            }}
          />
          <DashboardMockup />
        </div>
      </div>

      {/* Fade into page bg */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-28"
        style={{ background: "linear-gradient(to bottom, transparent, #EEF3FB)" }}
      />
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
const Product = () => {
  return (
    <main className="min-h-screen font-sans antialiased" style={{ backgroundColor: "#EEF3FB" }}>
      <ProductHero />
      <div className="" id="products">
        <ProductSlider />
      </div>
    </main>
  );
};

export default Product;