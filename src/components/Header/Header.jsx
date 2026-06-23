import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/stackly_logo.webp";

/* ============================================================
   Earthbound — Site Header
   ============================================================ */

function ArrowUpRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home",           path: "/" },
    { name: "Our Fields",     path: "/fields" },
    { name: "Harvest",        path: "/harvest" },
    { name: "Practices",      path: "/practices" },
    { name: "Visit the Farm", path: "/visit" },
    { name:"SignUp",          path:"/signup" }
  ];

  const closeMenu = () => setIsMenuOpen(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  /* Lock body scroll while menu is open */
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  /* Close on Escape key */
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") closeMenu(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* ── Main header bar ── */}
      <header className="eh-header">

        {/* Logo — uses your imported stackly_logo.webp */}
        <Link to="/" className="eh-logo-wrapper" aria-label="Home">
          <div className="eh-logo-container">
            <img src={logo} alt="Stackly" className="eh-logo-img" />
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="eh-nav-links" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`eh-nav-link${location.pathname === link.path ? " eh-nav-link--active" : ""}`}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/join" className="eh-nav-cta">
            Join the Co-op <ArrowUpRight />
          </Link>
        </nav>

        {/* Hamburger button — hidden on desktop via CSS */}
        <button
          className="eh-menu-btn"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </header>

      {/* ── Dim overlay — click anywhere to close ── */}
      <div
        className={`eh-mobile-overlay${isMenuOpen ? " eh-mobile-overlay--open" : ""}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* ── Slide-in mobile menu ── */}
      <nav
        id="mobile-nav"
        className={`eh-mobile-menu${isMenuOpen ? " eh-mobile-menu--open" : ""}`}
        aria-label="Mobile navigation"
        aria-hidden={!isMenuOpen}
      >
        <div className="eh-mobile-menu-header">
          <span className="eh-mobile-menu-title">Menu</span>
          <button
            className="eh-mobile-close-btn"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="eh-mobile-menu-links">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`eh-mobile-link${location.pathname === link.path ? " eh-mobile-link--active" : ""}`}
              onClick={closeMenu}   /* auto-close on link tap */
            >
              {link.name}
            </Link>
          ))}
          <Link to="/join" className="eh-mobile-cta" onClick={closeMenu}>
            Join the Co-op <ArrowUpRight />
          </Link>
        </div>
      </nav>
    </>
  );
}