import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./EarthboundLanding.css";
import herobg from "../../assets/herobg.webp"
import herobg1 from "../../assets/herobg1.webp"
import herobg2 from "../../assets/herobg2.webp"
import herobg3 from "../../assets/herobg3.webp"
import tomatoes from "../../assets/tomatoes.webp"
import wheat from "../../assets/wheat.webp"
import vegetables from "../../assets/vegetables.webp"
import mushrooms from "../../assets/mushrooms.webp"
import soil from "../../assets/soil.webp"
import harvest from "../../assets/harvest.webp"
import sunflower from "../../assets/sunflower.webp"
import farmer from "../../assets/farmer.webp"
import tractor from "../../assets/tractor.webp"
import greenhouse from "../../assets/greenhouse.webp"
import produce from "../../assets/produce.webp"

/* ============================================================
   Earthbound — Organic Farming Landing Page
   ENHANCED VERSION with all buttons navigating to 404
   ============================================================ */

/* ----------------------------------------------------------------
   Hero rotates through these 4 images, 5s each, looping forever.
---------------------------------------------------------------- */
const HERO_SLIDES = [
  { src: herobg, tone: "bright" },
  { src: herobg1, tone: "dark" },
  { src: herobg2, tone: "bright" },
  { src: herobg3, tone: "dark" },
];

const HERO_SLIDE_MS = 5000;

// ===== ICONS =====
function ArrowUpRight({ className = "" }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

function Play({ className = "" }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="6 4 20 12 6 20 6 4" />
    </svg>
  );
}

function IconClock({ className = "" }) {
  return (
    <svg className={className} width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconGlobe({ className = "" }) {
  return (
    <svg className={className} width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.7 3.8 6 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-6-3.8-9s1.3-6.3 3.8-9Z" />
    </svg>
  );
}

function IconLeaf({ className = "" }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17 1.05.3 1.74.3C13 20 21 16 21 3c-5 0-10 1-13.5 4.5C5 9.5 4 12 4 14c0 .5 0 1 .12 1.5C9 8 17 8 17 8z" />
    </svg>
  );
}

function IconBasket({ className = "" }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M5.5 11 3 21h18l-2.5-10H5.5Zm1.7-2L9 4.5l1.7 1L9 9h7l-1.7-3.5 1.7-1 1.8 4.5H17v2H7V9h.2Zm4.3 5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
    </svg>
  );
}

function IconSun({ className = "" }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 1v3M12 20v3M3.5 3.5l2.1 2.1M18.4 18.4l2.1 2.1M1 12h3M20 12h3M3.5 20.5l2.1-2.1M18.4 5.6l2.1-2.1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IconSeedling({ className = "" }) {
  return (
    <svg className={className} width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 22v-8a4 4 0 0 0-4-4H6a4 4 0 0 1 0-8h2a6 6 0 0 1 6 6v2" strokeLinecap="round" />
    </svg>
  );
}

function IconTractor({ className = "" }) {
  return (
    <svg className={className} width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 18a2 2 0 1 0 4 0 2 2 0 0 0-4 0z" />
      <path d="M16 18a2 2 0 1 0 4 0 2 2 0 0 0-4 0z" />
      <path d="M8 6h6l4 4v6H4v-4l4-6z" strokeLinecap="round" />
      <path d="M14 10l-2-4" strokeLinecap="round" />
    </svg>
  );
}

function IconFlower({ className = "" }) {
  return (
    <svg className={className} width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 5a3 3 0 1 1 3 3m-3-3a3 3 0 1 0-3 3m3-3v1M9 8a3 3 0 1 0 3 3M9 8h1m5 0a3 3 0 1 1-3 3m3-3h-1m-2 3v1" strokeLinecap="round" />
      <path d="M12 13a3 3 0 1 1-3 3m3-3a3 3 0 1 0 3 3m-3-3v1" strokeLinecap="round" />
    </svg>
  );
}

function IconWater({ className = "" }) {
  return (
    <svg className={className} width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2C8 6 4 10 4 14a8 8 0 1 0 16 0c0-4-4-8-8-12z" strokeLinecap="round" />
    </svg>
  );
}

function IconHeart({ className = "" }) {
  return (
    <svg className={className} width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" strokeLinecap="round" />
    </svg>
  );
}

function IconStar({ className = "" }) {
  return (
    <svg className={className} width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ===== HERO SLIDESHOW BACKGROUND =====
function HeroSlideshow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % HERO_SLIDES.length);
    }, HERO_SLIDE_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="eb-hero-bg">
      <AnimatePresence mode="sync">
        <motion.div
          key={index}
          className={`eb-hero-slide eb-hero-slide--${HERO_SLIDES[index].tone}`}
          style={{ backgroundImage: `url(${HERO_SLIDES[index].src})` }}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 1.2, ease: "easeInOut" }, scale: { duration: HERO_SLIDE_MS / 1000, ease: "linear" } }}
        />
      </AnimatePresence>

      <div className="eb-hero-scrim-radial" />
      <div className="eb-hero-scrim-bottom" />
      <div className="eb-hero-grain" />

      <div className="eb-hero-dots" role="tablist" aria-label="Hero background slides">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Show background ${i + 1}`}
            className={`eb-hero-dot ${i === index ? "eb-hero-dot--active" : ""}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}

// ===== FLOATING PARTICLES =====
function FloatingParticles() {
  return (
    <div className="eb-particles">
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="eb-particle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 15}s`,
            animationDuration: `${20 + Math.random() * 30}s`,
            width: `${2 + Math.random() * 6}px`,
            height: `${2 + Math.random() * 6}px`,
            opacity: 0.1 + Math.random() * 0.3,
          }}
        />
      ))}
    </div>
  );
}

// ===== GROWING PLANT ANIMATION =====
function GrowingPlant() {
  return (
    <div className="eb-growing-plant">
      <div className="eb-plant-stem"></div>
      <div className="eb-plant-leaf eb-plant-leaf--1"></div>
      <div className="eb-plant-leaf eb-plant-leaf--2"></div>
      <div className="eb-plant-leaf eb-plant-leaf--3"></div>
      <div className="eb-plant-leaf eb-plant-leaf--4"></div>
      <div className="eb-plant-flower"></div>
    </div>
  );
}

// ===== BLUR TEXT =====
function BlurText({ text, className, delayStart = 0 }) {
  const words = text.split(" ");
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setVisible(true);
        });
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <p ref={ref} className={`eb-blurtext-wrap ${className || ""}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="eb-blurtext-word"
          initial={{ filter: "blur(10px)", opacity: 0, y: 30 }}
          animate={
            visible
              ? {
                  filter: ["blur(10px)", "blur(5px)", "blur(0px)"],
                  opacity: [0, 0.5, 1],
                  y: [30, -5, 0],
                }
              : {}
          }
          transition={{
            duration: 0.6,
            times: [0, 0.5, 1],
            ease: "easeOut",
            delay: delayStart + (i * 60) / 1000,
          }}
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
}

// ===== FADE UP =====
function FadeUp({ children, delay = 0, className }) {
  return (
    <motion.div
      className={className}
      initial={{ filter: "blur(10px)", opacity: 0, y: 30 }}
      animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

// ===== SCROLL REVEAL =====
function ScrollReveal({ children, className, delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setVisible(true);
        });
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={visible ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

// ===== MAGNETIC CARD =====
function MagneticCard({ className, children, ...rest }) {
  const ref = useRef(null);

  function handleMouseMove(e) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const mx = ((e.clientX - rect.left) / rect.width) * 100;
    const my = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--mx", `${mx}%`);
    el.style.setProperty("--my", `${my}%`);
  }

  return (
    <div ref={ref} className={className} onMouseMove={handleMouseMove} {...rest}>
      {children}
    </div>
  );
}

// ===== ORGANIC DIVIDER =====
function OrganicDivider({ flip = false }) {
  return (
    <div className={`eb-divider ${flip ? "eb-divider--flip" : ""}`} aria-hidden="true">
      <svg viewBox="0 0 1200 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,30 C150,55 300,5 450,28 C600,50 750,8 900,32 C1020,50 1110,15 1200,30 L1200,60 L0,60 Z" />
      </svg>
    </div>
  );
}

// ===== HERO SECTION =====
function Hero() {
  const navigate = useNavigate();
  
  return (
    <section className="eb-section eb-hero">
      <HeroSlideshow />
      <FloatingParticles />
      <GrowingPlant />

      <div className="eb-content eb-hero-content">
        <div className="eb-hero-body">
          <FadeUp delay={0.3}>
            <div className="eb-badge liquid-glass">
              <span className="eb-badge-chip">New</span>
              <span className="eb-badge-text font-body">
                First Regenerative Harvest Co-op Opens This Fall
              </span>
            </div>
          </FadeUp>

          <BlurText
            text="Grown From Soil, Not From Shortcuts"
            delayStart={0.4}
            className="eb-headline font-heading"
          />

          <FadeUp delay={0.7} className="eb-subheading font-body">
            We farm the way the land asked us to — no synthetic inputs, no rushed
            seasons. Just patient soil, honest crops, and produce that tastes like
            it remembers where it came from.
          </FadeUp>

          <FadeUp delay={1.0} className="eb-cta-row">
            <motion.button
              className="eb-cta-primary liquid-glass-strong font-body"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/404')}
            >
              Shop the Harvest
              <ArrowUpRight />
            </motion.button>
            <motion.button
              className="eb-cta-secondary font-body"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/404')}
            >
              <Play />
              Walk the Fields
            </motion.button>
          </FadeUp>

          <FadeUp delay={1.2} className="eb-stats-row">
            {[
              { icon: <IconClock />, number: "12 Yrs", label: "Chemical-Free" },
              { icon: <IconGlobe />, number: "340+", label: "Families Fed" },
              { icon: <IconSeedling />, number: "100%", label: "Regenerative" },
              { icon: <IconHeart />, number: "98%", label: "Customer Satisfaction" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="eb-stat-card liquid-glass"
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={() => navigate('/404')}
              >
                {stat.icon}
                <div className="eb-stat-number font-heading">{stat.number}</div>
                <div className="eb-stat-label font-body">{stat.label}</div>
              </motion.div>
            ))}
          </FadeUp>
        </div>

        <FadeUp delay={1.3} className="eb-partners">
          <div className="eb-partners-chip liquid-glass font-body">
            Trusted by local mills, markets, and chefs
          </div>
          <div className="eb-partners-row">
            {["Millhouse", "Bramblewick", "Furrow & Co.", "Greenstalk", "Old Pasture"].map(
              (name) => (
                <motion.span
                  key={name}
                  className="eb-partner-name font-heading"
                  whileHover={{ scale: 1.1, color: "var(--color-wheat)" }}
                  onClick={() => navigate('/404')}
                >
                  {name}
                </motion.span>
              )
            )}
          </div>
        </FadeUp>
      </div>

      <OrganicDivider />
    </section>
  );
}

// ===== FEATURES SECTION =====
function Features() {
  const navigate = useNavigate();
  
  const features = [
    {
      icon: <IconLeaf />,
      title: "100% Organic",
      description: "Certified organic practices since day one. No pesticides, no GMOs, just pure nature.",
    },
    {
      icon: <IconWater />,
      title: "Rain-Fed Fields",
      description: "Our fields drink only from the sky. No irrigation, no water waste.",
    },
    {
      icon: <IconFlower />,
      title: "Pollinator Paradise",
      description: "Wildflower borders and hedgerows create a haven for bees and butterflies.",
    },
    {
      icon: <IconTractor />,
      title: "No-Till Farming",
      description: "We never turn the soil. This preserves life below ground and captures carbon.",
    },
  ];

  return (
    <section className="eb-section eb-features">
      <div className="eb-features-bg">
        <div className="eb-features-image" style={{ backgroundImage: `url(${wheat})` }} />
        <div className="eb-features-overlay" />
      </div>

      <div className="eb-content eb-features-content">
        <ScrollReveal className="eb-features-header">
          <div className="eb-features-kicker font-body">// Why We're Different</div>
          <h2 className="eb-features-heading font-heading">
            Farming with<br />
            <span className="eb-features-highlight">Nature, Not Against It</span>
          </h2>
        </ScrollReveal>

        <div className="eb-features-grid">
          {features.map((feature, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <MagneticCard className="eb-feature-card" onClick={() => navigate('/404')}>
                <motion.div
                  className="eb-feature-icon liquid-glass"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="eb-feature-title font-heading">{feature.title}</h3>
                <p className="eb-feature-description font-body">{feature.description}</p>
              </MagneticCard>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <OrganicDivider flip />
    </section>
  );
}

// ===== SEASONAL PRODUCE SECTION =====
function SeasonalProduce() {
  const navigate = useNavigate();
  
  const produce = [
    { name: "Heirloom Tomatoes", season: "Summer", image: tomatoes, description: "Rich, flavorful, and bursting with color" },
    { name: "Organic Greens", season: "Spring-Fall", image: vegetables, description: "Fresh, crisp, and nutrient-dense" },
    { name: "Heritage Wheat", season: "Fall", image: wheat, description: "Ancient grains with modern nutrition" },
    { name: "Wild Mushrooms", season: "Autumn", image: mushrooms, description: "Foraged with care, full of umami" },
  ];

  return (
    <section className="eb-section eb-produce">
      <div className="eb-produce-bg">
        <div className="eb-produce-image" style={{ backgroundImage: `url(${greenhouse})` }} />
        <div className="eb-produce-overlay" />
      </div>

      <div className="eb-content eb-produce-content">
        <ScrollReveal className="eb-produce-header">
          <div className="eb-produce-kicker font-body">// Seasonal Harvest</div>
          <h2 className="eb-produce-heading font-heading">
            What's Growing<br />
            <span className="eb-produce-highlight">Right Now</span>
          </h2>
        </ScrollReveal>

        <div className="eb-produce-grid">
          {produce.map((item, index) => (
            <ScrollReveal key={index} className="eb-produce-card" delay={index * 0.15}>
              <motion.div
                className="eb-produce-image-card"
                style={{ backgroundImage: `url(${item.image})` }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
                onClick={() => navigate('/404')}
              >
                <div className="eb-produce-card-overlay" />
                <div className="eb-produce-card-content">
                  <h3 className="eb-produce-name font-heading">{item.name}</h3>
                  <span className="eb-produce-season font-body">{item.season}</span>
                  <p className="eb-produce-description font-body">{item.description}</p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <OrganicDivider />
    </section>
  );
}

// ===== CAPABILITIES SECTION =====
const CARDS = [
  {
    Icon: IconSeedling,
    title: "Soil & Seed",
    body: "Every field rests in rotation and rebuilds itself with cover crops and compost — so the soil keeps giving, year after year.",
    tags: ["No-Till Fields", "Heirloom Seed", "Compost-Fed", "Pollinator Rows"],
    image: soil,
  },
  {
    Icon: IconBasket,
    title: "Harvest & Hands",
    body: "Picked at peak ripeness by hand, sorted the same day, and on a truck to market before the dew has dried.",
    tags: ["Hand-Picked", "Same-Day Sort", "Local Routes", "Zero Cold Storage"],
    image: harvest,
  },
  {
    Icon: IconSun,
    title: "Open-Sky Practice",
    body: "No greenhouses, no synthetic light. Crops grow under real sun and real seasons, the way they always have.",
    tags: ["Sun-Grown", "Rain-Fed", "Seasonal Only", "Open Pasture"],
    image: sunflower,
  },
];

function CapabilityCard({ Icon, title, body, tags, image, index }) {
  const navigate = useNavigate();
  
  return (
    <ScrollReveal className="eb-card liquid-glass" delay={index * 0.1} onClick={() => navigate('/404')}>
      <motion.div
        className="eb-card-image"
        style={{ backgroundImage: `url(${image})` }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.4 }}
      >
        <div className="eb-card-image-overlay" />
      </motion.div>
      <motion.div
        className="eb-card-top"
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="eb-card-icon liquid-glass">
          <Icon className="font-body" style={{ color: "var(--color-linen)" }} />
        </div>
        <div className="eb-card-tags">
          {tags.map((t) => (
            <span key={t} className="eb-tag liquid-glass font-body">
              {t}
            </span>
          ))}
        </div>
      </motion.div>

      <div className="eb-card-bottom">
        <h3 className="eb-card-title font-heading">{title}</h3>
        <p className="eb-card-body font-body">{body}</p>
      </div>
    </ScrollReveal>
  );
}

function Capabilities() {
  return (
    <section className="eb-section eb-capabilities">
      <div className="eb-capabilities-bg">
        <div className="eb-capabilities-image" style={{ backgroundImage: `url(${farmer})` }} />
        <div className="eb-capabilities-overlay" />
      </div>

      <div className="eb-content eb-cap-content">
        <ScrollReveal className="eb-cap-header">
          <div className="eb-cap-kicker font-body">// Our Practices</div>
          <h2 className="eb-cap-heading font-heading">
            Farming
            <br />
            <span className="eb-cap-highlight">unhurried</span>
          </h2>
        </ScrollReveal>

        <div className="eb-card-grid eb-card-grid--roots">
          <svg className="eb-roots-svg" viewBox="0 0 1000 60" preserveAspectRatio="none" aria-hidden="true">
            <path className="eb-roots-path" d="M167,0 C167,30 500,30 500,0" />
            <path className="eb-roots-path" d="M500,0 C500,30 833,30 833,0" />
          </svg>
          {CARDS.map((c, index) => (
            <CapabilityCard key={c.title} {...c} index={index} />
          ))}
        </div>
      </div>

      <OrganicDivider flip />
    </section>
  );
}

// ===== TESTIMONIALS SECTION =====
function Testimonials() {
  const navigate = useNavigate();
  
  const testimonials = [
    {
      quote: "The best produce I've ever tasted. You can literally taste the soil health in every bite.",
      name: "Chef Maria Rodriguez",
      role: "Owner, Farm-to-Table Restaurant",
      rating: 5,
    },
    {
      quote: "Joining this co-op changed how our family eats. We actually look forward to vegetable season now.",
      name: "The Johnson Family",
      role: "Co-op Members Since 2019",
      rating: 5,
    },
    {
      quote: "These farmers are redefining what it means to grow food with integrity. Truly inspirational.",
      name: "Dr. Sarah Chen",
      role: "Agricultural Scientist",
      rating: 5,
    },
  ];

  return (
    <section className="eb-section eb-testimonials">
      <div className="eb-testimonials-bg">
        <div className="eb-testimonials-image" style={{ backgroundImage: `url(${farmer})` }} />
        <div className="eb-testimonials-overlay" />
      </div>

      <div className="eb-content eb-testimonials-content">
        <ScrollReveal className="eb-testimonials-header">
          <div className="eb-testimonials-kicker font-body">// What People Say</div>
          <h2 className="eb-testimonials-heading font-heading">
            Voices from<br />
            <span className="eb-testimonials-highlight">Our Community</span>
          </h2>
        </ScrollReveal>

        <div className="eb-testimonials-grid">
          {testimonials.map((item, index) => (
            <ScrollReveal key={index} className="eb-testimonial-card liquid-glass" delay={index * 0.15} onClick={() => navigate('/404')}>
              <motion.div
                className="eb-testimonial-quote"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.3, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
              >
                "
              </motion.div>
              <div className="eb-testimonial-stars">
                {[...Array(item.rating)].map((_, i) => (
                  <IconStar key={i} className="eb-testimonial-star" />
                ))}
              </div>
              <p className="eb-testimonial-text font-body">{item.quote}</p>
              <div className="eb-testimonial-author">
                <div className="eb-testimonial-name font-heading">{item.name}</div>
                <div className="eb-testimonial-role font-body">{item.role}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <OrganicDivider />
    </section>
  );
}

// ===== BLOG / JOURNAL SECTION =====
function JournalSection() {
  const navigate = useNavigate();
  
  const articles = [
    {
      title: "The Soil Microbiome: Life Underground",
      excerpt: "Discover the fascinating world beneath our feet and why healthy soil means healthy food.",
      image: soil,
      date: "June 2026",
      readTime: "4 min read",
    },
    {
      title: "Seasonal Eating: Why It Matters",
      excerpt: "Learn how eating with the seasons benefits your health and the planet.",
      image: produce,
      date: "May 2026",
      readTime: "3 min read",
    },
    {
      title: "Building Community Through Food",
      excerpt: "How local food systems are strengthening neighborhoods and growing resilience.",
      image: tractor,
      date: "April 2026",
      readTime: "5 min read",
    },
  ];

  return (
    <section className="eb-section eb-journal">
      <div className="eb-journal-bg">
        <div className="eb-journal-image" style={{ backgroundImage: `url(${produce})` }} />
        <div className="eb-journal-overlay" />
      </div>

      <div className="eb-content eb-journal-content">
        <ScrollReveal className="eb-journal-header">
          <div className="eb-journal-kicker font-body">// Journal</div>
          <h2 className="eb-journal-heading font-heading">
            Stories from<br />
            <span className="eb-journal-highlight">The Field</span>
          </h2>
        </ScrollReveal>

        <div className="eb-journal-grid">
          {articles.map((article, index) => (
            <ScrollReveal key={index} className="eb-journal-card" delay={index * 0.15} onClick={() => navigate('/404')}>
              <motion.div
                className="eb-journal-image-card"
                style={{ backgroundImage: `url(${article.image})` }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
              >
                <div className="eb-journal-card-overlay" />
              </motion.div>
              <div className="eb-journal-card-content">
                <div className="eb-journal-meta">
                  <span className="eb-journal-date font-body">{article.date}</span>
                  <span className="eb-journal-readtime font-body">• {article.readTime}</span>
                </div>
                <h3 className="eb-journal-title font-heading">{article.title}</h3>
                <p className="eb-journal-excerpt font-body">{article.excerpt}</p>
                <motion.button 
                  className="eb-journal-readmore font-body"
                  whileHover={{ x: 5 }}
                  onClick={() => navigate('/404')}
                >
                  Read More <ArrowUpRight />
                </motion.button>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <OrganicDivider flip />
    </section>
  );
}

// ===== CTA SECTION =====
function CTASection() {
  const navigate = useNavigate();
  
  return (
    <section className="eb-section eb-cta-section">
      <div className="eb-cta-bg">
        <div className="eb-cta-image" style={{ backgroundImage: `url(${tractor})` }} />
        <div className="eb-cta-overlay" />
      </div>

      <div className="eb-content eb-cta-content">
        <ScrollReveal className="eb-cta-box liquid-glass-strong">
          <h2 className="eb-cta-title font-heading">
            Join the <span className="eb-cta-highlight">Regenerative</span> Movement
          </h2>
          <p className="eb-cta-description font-body">
            Become part of a community that's healing the land, one season at a time.
          </p>
          <div className="eb-cta-buttons">
            <motion.button
              className="eb-cta-primary-btn liquid-glass-strong font-body"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/404')}
            >
              Join the Co-op
              <ArrowUpRight />
            </motion.button>
            <motion.button
              className="eb-cta-secondary-btn font-body"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/404')}
            >
              Learn More
            </motion.button>
          </div>
          <div className="eb-cta-benefits">
            <div className="eb-cta-benefit" onClick={() => navigate('/404')}>
              <IconLeaf />
              <span>Organic Certification</span>
            </div>
            <div className="eb-cta-benefit" onClick={() => navigate('/404')}>
              <IconHeart />
              <span>Community Support</span>
            </div>
            <div className="eb-cta-benefit" onClick={() => navigate('/404')}>
              <IconStar />
              <span>Farm-to-Table Access</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ===== MAIN EXPORT =====
export default function EarthboundLanding() {
  return (
    <div className="earthbound-root">
      <Hero />
      <Features />
      <SeasonalProduce />
      <Capabilities />
      <Testimonials />
      <JournalSection />
      <CTASection />
    </div>
  );
}