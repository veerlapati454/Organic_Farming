import React from "react";
import { useNavigate } from "react-router-dom";
import "./Footer.css";
import logo from "../../assets/stackly.webp"

/* ============================================================
   Earthbound — Site Footer
   Matches the liquid-glass design system from EarthboundLanding.
   ============================================================ */

const LOGO_SRC = logo;

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

const QUICK_LINKS = [
  { label: "Home", path: "/" },
  { label: "Our Fields", path: "/fields" },
  { label: "Harvest", path: "/harvest" },
  { label: "Practices", path: "/practices" },
  { label: "Visit the Farm", path: "/visit" },
  { label: "Join the Co-op", path: "/join" },
];

export default function Footer({ logoSrc = LOGO_SRC, logoAlt = "Stackly" }) {
  const navigate = useNavigate();
  const year = new Date().getFullYear();

  

  return (
    <footer className="ef-footer">
      <div className="ef-top liquid-glass">
        <div className="ef-brand">
          {/* Logo - navigates to "/" */}
          <div 
            className="ef-logo liquid-glass" 
            onClick={() => handleNavigate('/')}
            style={{ cursor: 'pointer' }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleNavigate('/')}
            onClick={()=>navigate("/")}
          >
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
          <button 
            className="ef-cta font-body"
            onClick={() => navigate('/404')}
          >
            Join the Co-op
            <ArrowUpRight />
          </button>
        </div>

        {/* Quick Links */}
        <div className="ef-columns">
          <div className="ef-column">
            <div className="ef-column-heading font-body">Quick Links</div>
            <ul className="ef-column-list">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <button 
                    className="ef-column-link font-body"
                    onClick={() => navigate(link.path)}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="ef-column">
            <div className="ef-column-heading font-body">Visit</div>
            <p className="ef-address font-body">
              Nagole
              <br />
              Hyderabad,India
            </p>
            <p className="ef-address font-body">
              Stackly@organic.com
              <br />
              (+91) 7891528801
            </p>
          </div>
        </div>
      </div>

      <div className="ef-bottom">
        <span className="ef-copyright font-body">
          © {year} Earthbound Farm. All rights reserved.
        </span>
        <div className="ef-legal">
          <button 
            className="ef-legal-link font-body"
            onClick={() => handleNavigate('/privacy')}
          >
            Privacy
          </button>
          <button 
            className="ef-legal-link font-body"
            onClick={() => handleNavigate('/terms')}
          >
            Terms
          </button>
        </div>
      </div>
    </footer>
  );
}