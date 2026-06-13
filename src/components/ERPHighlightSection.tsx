import React, { useState } from "react";
import {
  Wallet,
  Users,
  Package,
  ShoppingCart,
  UserPlus,
  Factory,
  Truck,
  ClipboardCheck,
  BarChart3,
  BadgeCheck,
  LineChart,
} from "lucide-react";

interface Module {
  title: string;
  icon: React.ElementType;
  headline: string;
  description: string;
  highlights: string[];
}

const modules: Module[] = [
  {
    title: "Finance & Accounts",
    icon: Wallet,
    headline: "Full-cycle financial control in one place",
    description:
      "Manage your entire financial operation — from general ledger to tax compliance — with real-time visibility into cash flow, P&L, and balance sheets.",
    highlights: [
      "General Ledger & Chart of Accounts",
      "Accounts Payable & Receivable",
      "Multi-currency & Multi-entity support",
      "Automated tax calculations & filings",
    ],
  },
  {
    title: "HR & Payroll",
    icon: Users,
    headline: "People operations, simplified end to end",
    description:
      "Handle the full employee lifecycle — from onboarding to offboarding — with automated payroll runs, leave tracking, and compliance built in.",
    highlights: [
      "Employee records & org structure",
      "Automated payroll & tax deductions",
      "Leave & attendance management",
      "Compliance & statutory reporting",
    ],
  },
  {
    title: "Inventory Control",
    icon: Package,
    headline: "Know exactly what you have, where, and when",
    description:
      "Track stock levels across multiple warehouses in real time, automate reorder triggers, and eliminate shrinkage with full audit trails.",
    highlights: [
      "Real-time stock level tracking",
      "Multi-warehouse management",
      "Automated reorder & replenishment",
      "Batch, serial & expiry tracking",
    ],
  },
  {
    title: "Procurement",
    icon: ShoppingCart,
    headline: "Smarter purchasing from requisition to payment",
    description:
      "Streamline the entire purchase cycle with structured approval workflows, vendor comparisons, and three-way matching to prevent overpayment.",
    highlights: [
      "Purchase requisition & approvals",
      "Vendor evaluation & comparison",
      "Three-way PO/GRN/invoice matching",
      "Spend analytics & budget controls",
    ],
  },
  {
    title: "CRM & Sales",
    icon: UserPlus,
    headline: "Pipeline to payment, fully connected",
    description:
      "Manage leads, opportunities, and customer relationships in a single system that syncs directly with finance and inventory for seamless order fulfilment.",
    highlights: [
      "Lead & opportunity tracking",
      "Quotation & sales order management",
      "Customer 360° view",
      "Sales performance dashboards",
    ],
  },
  {
    title: "Manufacturing Module",
    icon: Factory,
    headline: "Plan, produce, and deliver on schedule",
    description:
      "From bill of materials to production orders, gain complete control over your shop floor with real-time work-in-progress tracking and capacity planning.",
    highlights: [
      "Bill of Materials (BOM) management",
      "Production order & routing",
      "Work-in-progress tracking",
      "Capacity & resource planning",
    ],
  },
  {
    title: "Supply Chain",
    icon: Truck,
    headline: "End-to-end supply chain visibility",
    description:
      "Connect suppliers, logistics, and customers in one network so you can anticipate disruptions, optimise lead times, and reduce carrying costs.",
    highlights: [
      "Demand forecasting & planning",
      "Supplier collaboration portal",
      "Logistics & shipment tracking",
      "Lead time & cost optimisation",
    ],
  },
  {
    title: "Project Management",
    icon: ClipboardCheck,
    headline: "Deliver projects on time and within budget",
    description:
      "Plan tasks, allocate resources, and track project profitability in real time — with tight integration to billing, procurement, and HR.",
    highlights: [
      "Task & milestone tracking",
      "Resource & utilisation management",
      "Project budgeting & cost control",
      "Timesheet & billing integration",
    ],
  },
  {
    title: "BI & Reporting",
    icon: BarChart3,
    headline: "Decisions backed by live data, not last month's export",
    description:
      "Build interactive dashboards and scheduled reports across every module, with drill-down capability so you always know the story behind the numbers.",
    highlights: [
      "Cross-module live dashboards",
      "Scheduled & ad-hoc reports",
      "Role-based data access",
      "Export to Excel, PDF & API",
    ],
  },
  {
    title: "Quality Management",
    icon: BadgeCheck,
    headline: "Embed quality at every stage of the process",
    description:
      "Define inspection checkpoints, track non-conformances, and manage corrective actions so quality issues are caught before they reach your customers.",
    highlights: [
      "Inspection plans & checklists",
      "Non-conformance tracking (NCR)",
      "CAPA workflow management",
      "Audit trail & certifications",
    ],
  },
  {
    title: "Advanced Analytics",
    icon: LineChart,
    headline: "Predictive insights across your entire business",
    description:
      "Go beyond standard reporting with AI-driven forecasts, trend analysis, and what-if scenario modelling — all built on your live operational data.",
    highlights: [
      "AI-powered demand & revenue forecasting",
      "Trend & anomaly detection",
      "What-if scenario modelling",
      "Custom KPI builder",
    ],
  },
];

const ERPHighlightSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = modules[activeIndex];
  const ActiveIcon = active.icon;

  return (
    <section className="bg-[#ffffff] py-12 sm:py-16 lg:py-20 xl:py-22 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-5 md:px-6 lg:px-8">
        <div className="overflow-hidden lg:rounded-[1rem] bg-[#EEF3FB] border border-slate-200 shadow-[0_25px_80px_rgba(0,0,0,0.08)]">
          <div className="flex flex-col lg:flex-row">
            {/* Left — module list */}
            <div className="lg:w-[40%] lg:border-r border-b lg:border-b-0 border-slate-200 p-6 md:p-8 lg:p-10">
              <h3 className="mb-6 border-b border-slate-200 pb-4 text-lg font-bold text-slate-900">
                Core Integration Modules
              </h3>

              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide lg:grid lg:grid-cols-2">
                {modules.map((module, index) => {
                  const Icon = module.icon;
                  const isActive = index === activeIndex;

                  return (
                    <button
                      key={index}
                      onClick={() => setActiveIndex(index)}
                      className={`
          shrink-0 min-w-[180px]
          flex items-center gap-3
          rounded-xl px-4 py-3 text-left
          transition-all duration-200
          ${isActive
                          ? "bg-[#1453E6] text-white"
                          : "bg-white border border-slate-200"
                        }
        `}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="text-sm font-medium">
                        {module.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right — detail panel */}
            <div className="lg:w-[60%] p-8 md:p-10 lg:p-12 flex flex-col justify-center">
              <div
                key={activeIndex}
                className="animate-fade-in"
                style={{ animation: "fadeSlideIn 0.22s ease both" }}
              >
                {/* Icon + title */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1453E6]/10 shrink-0">
                    <ActiveIcon className="h-6 w-6 text-[#1453E6]" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#1453E6] mb-0.5">
                      Module
                    </p>
                    <h4 className="text-xl font-bold text-slate-900 leading-tight">
                      {active.title}
                    </h4>
                  </div>
                </div>

                {/* Headline */}
                <p className="text-base font-semibold text-slate-800 mb-3">
                  {active.headline}
                </p>

                {/* Description */}
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {active.description}
                </p>

                {/* Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {active.highlights.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 rounded-lg bg-white/70 border border-slate-100 px-3.5 py-2.5"
                    >
                      <span className="mt-0.5 h-2 w-2 rounded-full bg-[#1453E6] shrink-0" />
                      <span className="text-xs font-medium text-slate-700">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Keyframe for panel transition */}
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default ERPHighlightSection;
