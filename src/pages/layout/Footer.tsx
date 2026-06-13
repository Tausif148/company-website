import { NavLink } from "react-router-dom";

const Footer = () => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-xs sm:text-sm transition-colors duration-200 ${isActive ? "text-[#FF7F00] font-semibold" : "text-white/70 hover:text-white"}`;

  return (
    <footer className="bg-[#081D3A] text-white">
      <div className="max-w-[1440px] sm:mt-0 mx-auto px-4 sm:px-5 md:px-6 lg:px-8 pt-12 sm:pt-14 lg:pt-16 pb-5">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10">
          {/* Company Info — full width on mobile, spans 2 on lg */}
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-3 mb-4 sm:mb-5">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold">
                  SK Solution
                </h3>
                <p className="text-xs sm:text-sm text-white/60">
                  Industry 4.0 Solutions
                </p>
              </div>
            </div>

            <p className="text-white/70 text-sm sm:text-base leading-7 mb-5 sm:mb-6 max-w-md">
              Delivering ERP, IoT, Embedded Systems, Industrial Automation,
              Cloud Solutions, and Custom Software Development for enterprises
              worldwide.
            </p>

            <div className="space-y-2 text-white/70 text-xs sm:text-sm">
              <p>📍 Nagpur, Maharashtra, India</p>
              <p>📧 info@sksolution.com</p>
              <p>📞 +91 XXXXX XXXXX</p>
            </div>
          </div>

          {/* Solutions */}
          <div className="col-span-1">
            <h4 className="font-semibold text-sm sm:text-base lg:text-lg mb-4 sm:mb-5">
              Services
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {[
                ["/services/artificial-intelligence", "Artificial Intelligence"],
                ["/services/software-development", "Software Development"],
                ["/services/internet-of-things", "Internet of Things (IoT)"],
                ["/services/industrial-automation", "Industrial Automation"],
              ].map(([to, label]) => (
                <li key={to}>
                  <NavLink to={to} className={linkClass}>
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div className="col-span-1">
            <h4 className="font-semibold text-sm sm:text-base lg:text-lg mb-4 sm:mb-5">
              Products
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {[
                ["/products/face-rec-3", "Face Rec 3.0"],
                ["/products/bioscan-nexus", "BioScan Nexus"],
                ["/products/vigilant-ai-cam", "Vigilant-AI Cam"],
              ].map(([to, label]) => (
                <li key={to}>
                  <NavLink to={to} className={linkClass}>
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <h4 className="font-semibold text-sm sm:text-base lg:text-lg mb-4 sm:mb-5">
              Quick Links
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {[
                ["/about", "About Us"],
                ["/careers", "Careers"],
                ["/case-studies", "Case Studies"],
                ["/contact", "Contact Us"],
                ["/privacy-policy", "Privacy Policy"],
              ].map(([to, label]) => (
                <li key={to}>
                  <NavLink to={to} className={linkClass}>
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 sm:mt-12 pt-5 sm:pt-6 border-t border-white/10 flex flex-col lg:flex-row justify-between items-center gap-3 sm:gap-4">
          <p className="text-xs sm:text-sm text-white/50 text-center">
            © {new Date().getFullYear()} SK Solution Pvt. Ltd. All
            Rights Reserved.
          </p>
          <p className="text-xs sm:text-sm text-white/50 text-center">
            ERP • IoT • Embedded Systems • Cloud • Industrial Automation
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
