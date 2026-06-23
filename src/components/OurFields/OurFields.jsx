import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import "./OurFields.css";
import apples from "../../assets/apples.webp";
import soil from "../../assets/soil.webp";
import harvest from "../../assets/harvest.webp";
import sunflower from "../../assets/sunflower.webp";
import bg from "../../assets/herobg2.webp";
import wheat from "../../assets/wheat.webp";
import vegetables from "../../assets/vegetables.webp";

// Import your images
const FARM_IMAGES = {
  field1: apples,
  field2: soil,
  field3: harvest,
  field4: sunflower,
  field5: wheat,
  field6: vegetables,
};

function OurFields() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeMapField, setActiveMapField] = useState(null);
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);
  
  const fields = [
    {
      id: 1,
      name: "North Pasture",
      crop: "Heritage Wheat",
      season: "Fall",
      image: FARM_IMAGES.field5,
      description: "Our oldest field, rotated for 12 years with cover crops and compost.",
      stats: { acres: 45, yield: "2.4 tons", soilHealth: "Excellent" },
      rotation: ["Winter Wheat", "Cover Crops", "Spring Barley"],
      soilScore: 92,
    },
    {
      id: 2,
      name: "Sunny Meadows",
      crop: "Heirloom Tomatoes",
      season: "Summer",
      image: FARM_IMAGES.field4,
      description: "South-facing slopes with perfect drainage for the sweetest tomatoes.",
      stats: { acres: 28, yield: "3.1 tons", soilHealth: "Optimal" },
      rotation: ["Tomatoes", "Green Manure", "Legumes"],
      soilScore: 88,
    },
    {
      id: 3,
      name: "Riverbend Farm",
      crop: "Organic Greens",
      season: "Spring-Fall",
      image: FARM_IMAGES.field6,
      description: "Rich alluvial soil with natural irrigation from the creek.",
      stats: { acres: 32, yield: "1.8 tons", soilHealth: "Excellent" },
      rotation: ["Mixed Greens", "Root Veg", "Fallow"],
      soilScore: 95,
    },
    {
      id: 4,
      name: "Hilltop Orchards",
      crop: "Heritage Apples",
      season: "Autumn",
      image: FARM_IMAGES.field1,
      description: "Century-old trees producing the most flavorful apples in the valley.",
      stats: { acres: 18, yield: "4.2 tons", soilHealth: "Good" },
      rotation: ["Apples", "Pruning", "Harvest"],
      soilScore: 85,
    },
  ];

  const mapData = [
    { year: "2024", fields: ["North Pasture", "Sunny Meadows", "Riverbend Farm"] },
    { year: "2025", fields: ["North Pasture", "Sunny Meadows", "Riverbend Farm"] },
    { year: "2026", fields: ["Hilltop Orchards", "North Pasture", "Sunny Meadows"] },
  ];

  const colors = {
    "North Pasture": "#7a8c4a",
    "Sunny Meadows": "#5a7a3a",
    "Riverbend Farm": "#8a9c5a",
    "Hilltop Orchards": "#6a7a3a",
  };

  // Card animation variants - optimized for performance
  const cardVariants = {
    hidden: (index) => ({
      opacity: 0,
      x: index % 3 === 0 ? -60 : index % 3 === 1 ? 60 : 0,
      y: index % 3 === 2 ? 40 : 0,
      scale: 0.92,
    }),
    visible: (index) => ({
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        delay: index * 0.1,
        duration: 0.7,
        ease: [0.23, 1, 0.32, 1],
      },
    }),
    hover: {
      y: -12,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: [0.23, 1, 0.32, 1],
      },
    },
    dimmed: {
      opacity: 0.4,
      scale: 0.95,
      transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] },
    },
  };

  // Map field variants
  const mapFieldVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 15 },
    visible: (index) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: 1 + index * 0.05,
        duration: 0.5,
        ease: [0.23, 1, 0.32, 1],
      },
    }),
    hover: {
      scale: 1.05,
      y: -4,
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 },
    },
  };

  // Handle card click
  const handleCardClick = useCallback((fieldId) => {
    const field = fields.find(f => f.id === fieldId);
    console.log(`Selected field: ${field?.name}`);
  }, []);

  // Handle map field click with smooth scroll
  const handleMapFieldClick = useCallback((fieldName) => {
    setActiveMapField(fieldName === activeMapField ? null : fieldName);
    
    // Find the corresponding card
    const field = fields.find(f => f.name === fieldName);
    if (field) {
      const cardElement = document.querySelector(`[data-field-id="${field.id}"]`);
      if (cardElement) {
        // Smooth scroll with offset
        const headerOffset = 80;
        const elementPosition = cardElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  }, [activeMapField, fields]);

  // Optimized scroll handler for parallax
  useEffect(() => {
    const hero = heroRef.current;
    let ticking = false;
    let scrollTimeout;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (hero) {
            const scrolled = window.pageYOffset;
            const heroHeight = hero.offsetHeight;
            
            if (scrolled < heroHeight) {
              const speed = 0.2;
              const bgElement = hero.querySelector('.page-hero-bg');
              if (bgElement) {
                bgElement.style.transform = `translateY(${scrolled * speed}px) scale(${1 + scrolled * 0.0001})`;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }

      // Clear timeout on scroll
      clearTimeout(scrollTimeout);
      setIsScrolling(true);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  // Intersection Observer for cards
  useEffect(() => {
    const cards = document.querySelectorAll('.field-card');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const card = entry.target;
          const index = Array.from(cards).indexOf(card);
          // Trigger animation with delay
          setTimeout(() => {
            card.classList.add('visible');
          }, index * 100);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    cards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="page-container page-fields" ref={containerRef}>
      {/* Ambient Glow Effects */}
      <div className="ambient-glow ambient-glow-1" />
      <div className="ambient-glow ambient-glow-2" />

      {/* Hero Section */}
      <div className="page-hero" ref={heroRef}>
        <div 
          className="page-hero-bg" 
          style={{ backgroundImage: `url(${bg})`, willChange: 'transform' }}
        />
        <div className="page-hero-overlay" />
        <div className="page-hero-content">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            <motion.span 
              className="page-badge"
              initial={{ opacity: 0, y: -15, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <span className="badge-dot" />
            
            </motion.span>
            
            <motion.h1 
              className="page-title font-heading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              Fields That<br />
              <motion.span 
                className="page-highlight"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                Feed the Future
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="page-subtitle font-body"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              Each field tells a story of careful stewardship, natural cycles,
              and the patient work of building soil health for generations to come.
            </motion.p>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <div className="mouse" />
          <span>Scroll</span>
        </motion.div>
      </div>

      {/* Content Section */}
      <div className="page-content">
        {/* Fields Grid */}
        <div className="fields-grid">
          {fields.map((field, index) => (
            <motion.div
              key={field.id}
              data-field-id={field.id}
              className="field-card"
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true, amount: 0.15, margin: "-30px" }}
              animate={hoveredCard !== null && hoveredCard !== field.id ? "dimmed" : ""}
              onMouseEnter={() => setHoveredCard(field.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => handleCardClick(field.id)}
              style={{
                willChange: 'transform, opacity',
              }}
            >
              {/* Card Image */}
              <div className="field-card-image" style={{ 
                backgroundImage: `url(${field.image})`,
                willChange: 'transform'
              }}>
                <div className="field-card-overlay" />
                <div className="field-card-badge">
                  {field.season}
                </div>
                <div className="zoom-indicator">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                    <path d="M11 8v6" />
                    <path d="M8 11h6" />
                  </svg>
                </div>
              </div>

              {/* Card Content */}
              <div className="field-card-content">
                <h3 className="field-card-name font-heading">{field.name}</h3>
                <p className="field-card-crop font-body">{field.crop}</p>
                <p className="field-card-description font-body">{field.description}</p>
                
                <div className="field-card-stats">
                  {Object.entries(field.stats).map(([key, value]) => (
                    <div key={key} className="field-stat">
                      <span className="field-stat-label">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span className="field-stat-value">{value}</span>
                      {key === 'soilHealth' && (
                        <div className="stat-bar">
                          <motion.div 
                            className="stat-bar-fill"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${field.soilScore || 85}%` }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: 0.3, duration: 1, ease: [0.23, 1, 0.32, 1] }}
                            style={{ 
                              background: `linear-gradient(90deg, #7a8c4a, #d7b978)`,
                            }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Map Section */}
        <motion.div 
          className="field-map-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        >
          <motion.h2 
            className="section-title font-heading"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Field <span className="highlight">Rotation</span> Map
          </motion.h2>
          
          <div className="field-map">
            <div className="field-map-grid">
              {/* Header row */}
              <div className="map-year">Year</div>
              {mapData.map((item) => (
                <div key={item.year} className="map-year">{item.year}</div>
              ))}
              
              {/* Data rows */}
              {fields.slice(0, 3).map((field, rowIndex) => (
                <React.Fragment key={field.id}>
                  <div className="map-year" style={{ fontSize: '0.75rem' }}>
                    {field.name}
                  </div>
                  {mapData.map((item, colIndex) => {
                    const isActive = item.fields[rowIndex] === field.name;
                    return (
                      <motion.div
                        key={`${field.id}-${item.year}`}
                        className="map-field"
                        style={{
                          background: isActive ? colors[field.name] : 'rgba(245,240,225,0.03)',
                          borderColor: isActive ? 'rgba(122,140,74,0.3)' : 'rgba(245,240,225,0.04)',
                          cursor: 'pointer',
                          willChange: 'transform',
                        }}
                        custom={rowIndex * 3 + colIndex}
                        variants={mapFieldVariants}
                        initial="hidden"
                        whileInView="visible"
                        whileHover="hover"
                        whileTap="tap"
                        viewport={{ once: true, margin: "-20px" }}
                        onClick={() => handleMapFieldClick(field.name)}
                      >
                        {isActive && (
                          <span 
                            className="field-indicator" 
                            style={{ 
                              color: 'white',
                              background: 'currentColor',
                              display: 'inline-block',
                            }}
                          />
                        )}
                        {isActive ? field.name : '—'}
                      </motion.div>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>

            {/* Map Legend */}
            <div className="map-legend">
              {Object.entries(colors).map(([name, color]) => (
                <div key={name} className="map-legend-item">
                  <div 
                    className="map-legend-dot" 
                    style={{ background: color }}
                  />
                  <span>{name}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default OurFields;