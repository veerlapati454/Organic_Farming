import React from "react";
import "./Footer.css";
import logo from "../../assets/stackly_logo.webp"

/* ============================================================
   Earthbound — Site Footer
   Matches the liquid-glass design system from EarthboundLanding.

   LOGO: replace LOGO_SRC below with your logo file path (or pass
   a `logoSrc` prop). Same image works for header and footer.
   ============================================================ */

const LOGO_SRC = logo; // <-- put your logo image path/URL here, e.g. "/logo.png"

function ArrowUpRight({ className = "" }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 17L17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

const FOOTER_COLUMNS = [
  {
    heading: "Farm",
    links: ["Our Fields", "Practices", "Harvest Calendar", "Visit the Farm"],
  },
  {
    heading: "Shop",
    links: ["This Week's Box", "Market Stand", "Wholesale", "Co-op Membership"],
  },
  {
    heading: "About",
    links: ["Our Story", "Soil Notes (Blog)", "Careers", "Contact"],
  },
];

export default function Footer({ logoSrc = LOGO_SRC, logoAlt = "Farm logo" }) {
  const year = new Date().getFullYear();

  return (
    <footer className="ef-footer">
      <div className="ef-top liquid-glass">
        <div className="ef-brand">
          {/* Logo placeholder — swap logoSrc for your image */}
          <div className="ef-logo liquid-glass">
            {logoSrc ? (
              <img src={logoSrc} alt={logoAlt} className="ef-logo-img" />
            ) : (
              <span className="ef-logo-placeholder font-heading">e</span>
            )}
          </div>
          <p className="ef-brand-text font-body">
            Grown from soil, not from shortcuts. A small farm, farmed slowly,
            shared with the valley around it.
          </p>
          <a href="#" className="ef-cta font-body">
            Join the Co-op
            <ArrowUpRight />
          </a>
        </div>

        <div className="ef-columns">
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.heading} className="ef-column">
              <div className="ef-column-heading font-body">{col.heading}</div>
              <ul className="ef-column-list">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="ef-column-link font-body">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="ef-column">
            <div className="ef-column-heading font-body">Visit</div>
            <p className="ef-address font-body">
              412 Old Pasture Road
              <br />
              Hollow Creek Valley
            </p>
            <p className="ef-address font-body">
              hello@earthbound.farm
              <br />
              (555) 014-2298
            </p>
          </div>
        </div>
      </div>

      <div className="ef-bottom">
        <span className="ef-copyright font-body">
          © {year} Earthbound Farm. All rights reserved.
        </span>
        <div className="ef-legal">
          <a href="#" className="ef-legal-link font-body">
            Privacy
          </a>
          <a href="#" className="ef-legal-link font-body">
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
}