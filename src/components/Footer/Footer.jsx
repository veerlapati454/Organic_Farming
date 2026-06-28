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

// Social Media Icons
function InstagramIcon({ className = "" }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function TwitterIcon({ className = "" }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
    </svg>
  );
}

function FacebookIcon({ className = "" }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function YouTubeIcon({ className = "" }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
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

const SOCIAL_LINKS = [
  { icon: InstagramIcon, label: "Instagram", path: "/404" },
  { icon: TwitterIcon, label: "Twitter", path: "/404" },
  { icon: FacebookIcon, label: "Facebook", path: "/404" },
  { icon: YouTubeIcon, label: "YouTube", path: "/404" },
];

export default function Footer({ logoSrc = LOGO_SRC, logoAlt = "Stackly" }) {
  const navigate = useNavigate();
  const year = new Date().getFullYear();

  const handleNavigate = (path) => {
    navigate(path);
  };

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

        {/* Quick Links & Social */}
        <div className="ef-columns">
          <div className="ef-column">
            <div className="ef-column-heading font-body">Quick Links</div>
            <ul className="ef-column-list">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <button 
                    className="ef-column-link font-body"
                    onClick={() => handleNavigate(link.path)}
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
              Hyderabad, India
            </p>
            <p className="ef-address font-body">
              Stackly@organic.com
              <br />
              (+91) 7891528801
            </p>
            
            {/* Social Media Icons */}
            <div className="ef-social">
              <div className="ef-column-heading font-body">Follow Us</div>
              <div className="ef-social-icons">
                {SOCIAL_LINKS.map((social) => (
                  <button
                    key={social.label}
                    className="ef-social-icon"
                    onClick={() => handleNavigate(social.path)}
                    aria-label={social.label}
                    title={social.label}
                  >
                    <social.icon />
                  </button>
                ))}
              </div>
            </div>
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