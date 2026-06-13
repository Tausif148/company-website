import { NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import logo from "src/assets/images/logo.png";

const Header = () => {
  const navClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors duration-200 ${isActive
      ? "text-[#1453E6] border-b-2 border-[#1453E6] pb-1"
      : "text-[#4B5563] hover:text-[#1453E6]"
    }`;

  const mobileNavClass = ({ isActive }: { isActive: boolean }) =>
    `block px-4 py-3 text-sm rounded transition-colors duration-200 ${isActive
      ? "text-[#1453E6] bg-blue-50 font-semibold"
      : "text-[#081D3A] hover:bg-blue-50"
    }`;

  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    function onClickOutside(e: MouseEvent) {
      if (!mobileOpen) return;
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        const el = menuRef.current?.querySelector(
          "a,button",
        ) as HTMLElement | null;
        el?.focus();
      }, 50);
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#ffffff] border-b border-[#E5E7EB] shadow-md">
      <div className="max-w-[1440px] mx-auto lg:px-8 sm:px-6 px-2">
        <div className="h-[80px] flex items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="SK Solution"
              className="h-10 w-auto object-contain"
            />
          </NavLink>

          {/* Desktop nav — visible above 1020px */}
          <nav className="hidden min-[1021px]:flex items-center gap-8">
            <NavLink to="/" end className={navClass}>
              Home
            </NavLink>
            <NavLink to="/about" className={navClass}>
              About Us
            </NavLink>

            <NavLink to="/services" className={navClass}>
              Services{" "}
            </NavLink>

            <NavLink to="/enterprise" className={navClass}>
              Enterprise
            </NavLink>
            <NavLink to="/case-studies" className={navClass}>
              Case Studies
            </NavLink>
            <NavLink
              to="/technical-expertise
"
              className={navClass}
            >
              {" "}
              Technical Expertise
            </NavLink>

            <NavLink to="/products" className={navClass}>
              Products
            </NavLink>
            <NavLink to="/careers" className={navClass}>
              Career
            </NavLink>
          </nav>

          {/* Right side: hamburger + CTA */}
          <div className="flex items-center gap-4">
            <NavLink
              to="/contact"
              className="h-11 px-6 rounded-full bg-[#FF7F00] text-white text-sm font-medium shadow-md hover:bg-[#e67300] transition-all duration-300 flex items-center justify-center"
            >
              Contact Us
            </NavLink>
            <button
              aria-controls="mobile-menu"
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((s) => !s)}
              className="flex min-[1021px]:hidden items-center justify-center h-10 w-10 rounded-md text-[#081D3A] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1453E6]"
            >
              <span className="sr-only">Toggle navigation</span>
              <svg
                className={`h-6 w-6 transition-transform duration-200 ${mobileOpen ? "rotate-90" : ""}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {mobileOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <>
                    <path d="M3 12h18" />
                    <path d="M3 6h18" />
                    <path d="M3 18h18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu + overlay */}
      <div
        aria-hidden={!mobileOpen}
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${mobileOpen
          ? "visible opacity-100"
          : "invisible opacity-0 pointer-events-none"
          }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/40"
          onClick={() => setMobileOpen(false)}
        />

        {/* Side panel */}
        <aside
          id="mobile-menu"
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          className={`absolute right-0 top-0 h-full w-[320px] max-w-full bg-[#ffffff] shadow-xl transform transition-transform duration-300 focus:outline-none ${mobileOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <div className="h-[80px] flex items-center justify-between px-4 border-b border-gray-100">
            <NavLink
              to="/"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3"
            >
              <img
                src={logo}
                alt="SK Solution"
                className="h-10 w-auto object-contain"
              />
            </NavLink>
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="h-10 w-10 rounded-md flex items-center justify-center text-[#081D3A] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1453E6]"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="p-4 overflow-y-auto h-[calc(100%-80px)]">
            <ul className="flex flex-col gap-1">
              <li>
                <NavLink
                  to="/"
                  end
                  onClick={() => setMobileOpen(false)}
                  className={mobileNavClass}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  onClick={() => setMobileOpen(false)}
                  className={mobileNavClass}
                >
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/services"
                  onClick={() => setMobileOpen(false)}
                  className={mobileNavClass}
                >
                  Services
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/enterprise"
                  onClick={() => setMobileOpen(false)}
                  className={mobileNavClass}
                >
                  Enterprise
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/case-studies"
                  onClick={() => setMobileOpen(false)}
                  className={mobileNavClass}
                >
                  Case Studies
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/technical-expertise"
                  onClick={() => setMobileOpen(false)}
                  className={mobileNavClass}
                >
                  Technical Expertise
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/products"
                  onClick={() => setMobileOpen(false)}
                  className={mobileNavClass}
                >
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/careers"
                  onClick={() => setMobileOpen(false)}
                  className={mobileNavClass}
                >
                  Career
                </NavLink>
              </li>
            </ul>
          </nav>
        </aside>
      </div>
    </header>
  );
};

export default Header;
