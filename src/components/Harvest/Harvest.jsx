import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Harvest.css";
import tomatoes from "../../assets/tomatoes.webp";
import vegetables from "../../assets/vegetables.webp";
import wheat from "../../assets/wheat.webp";
import mushrooms from "../../assets/mushrooms.webp";
import berries from "../../assets/berries.webp";
import sunflower from "../../assets/sunflower.webp";
import bg from "../../assets/bg5.webp";

const HARVEST_IMAGES = {
  tomatoes,
  vegetables,
  wheat,
  mushrooms,
  berries,
  sunflower,
};

function Harvest() {
  const [selectedSeason, setSelectedSeason] = useState("all");
  const [selectedItem, setSelectedItem] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const gridRef = useRef(null);
  const isFirstRender = useRef(true);
  const pageRef = useRef(null);

  // Aggressively scroll to top — fires multiple times to beat animation shifts
  useEffect(() => {
  window.scrollTo(0, 0);
  const id = setTimeout(() => window.scrollTo(0, 0), 100);
  return () => clearTimeout(id);
}, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const harvestItems = [
    {
      id: 1,
      name: "Heirloom Tomatoes",
      season: "summer",
      image: HARVEST_IMAGES.tomatoes,
      description: "Rich, flavorful, and bursting with color. Grown from 50-year-old seeds.",
      harvest: "July - September",
      nutrition: "Rich in Vitamin C, Potassium, and Lycopene",
      uses: "Fresh salads, sauces, canning",
    },
    {
      id: 2,
      name: "Organic Greens",
      season: "spring",
      image: HARVEST_IMAGES.vegetables,
      description: "Fresh, crisp, and nutrient-dense. Picked at peak ripeness.",
      harvest: "April - November",
      nutrition: "High in Iron, Calcium, and Vitamins A & K",
      uses: "Salads, smoothies, cooking greens",
    },
    {
      id: 3,
      name: "Heritage Wheat",
      season: "fall",
      image: HARVEST_IMAGES.wheat,
      description: "Ancient grains with modern nutrition. Stone-milled to preserve flavor.",
      harvest: "September - October",
      nutrition: "High in Protein, Fiber, and B Vitamins",
      uses: "Artisan bread, pasta, cereals",
    },
    {
      id: 4,
      name: "Wild Mushrooms",
      season: "autumn",
      image: HARVEST_IMAGES.mushrooms,
      description: "Foraged with care, full of umami. Grown in our forested areas.",
      harvest: "September - November",
      nutrition: "Rich in Vitamin D, Selenium, and Antioxidants",
      uses: "Gourmet dishes, soups, drying",
    },
    {
      id: 5,
      name: "Sunflowers",
      season: "summer",
      image: HARVEST_IMAGES.sunflower,
      description: "Bright, cheerful, and full of seeds. Attract pollinators to the farm.",
      harvest: "July - August",
      nutrition: "High in Vitamin E, Selenium, and Healthy Fats",
      uses: "Snacking, bird feed, oil pressing",
    },
    {
      id: 6,
      name: "Mixed Berries",
      season: "summer",
      image: HARVEST_IMAGES.berries,
      description: "Sweet, juicy, and bursting with flavor. Hand-picked at perfect ripeness.",
      harvest: "June - August",
      nutrition: "Rich in Antioxidants, Vitamin C, and Fiber",
      uses: "Fresh eating, jams, baking",
    },
  ];

  const seasons = [
    { label: "All Seasons", value: "all" },
    { label: "🌱 Spring", value: "spring" },
    { label: "☀️ Summer", value: "summer" },
    { label: "🍂 Fall", value: "fall" },
    { label: "❄️ Autumn", value: "autumn" },
  ];

  const filteredItems =
    selectedSeason === "all"
      ? harvestItems
      : harvestItems.filter((item) => item.season === selectedSeason);

  // Smooth scroll to grid when filter changes — skip on first render.
  // NOTE: `isMobile` is intentionally NOT a dependency here. It used to be,
  // which caused this effect to re-fire right after mount (when the resize
  // listener flips isMobile from false -> true on a phone), triggering an
  // unwanted scrollIntoView that skipped the hero section on page load.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (gridRef.current && isMobile) {
      setTimeout(() => {
        gridRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSeason]);

  return (
    <div className="page-container page-harvest" ref={pageRef}>
      <div className="page-hero">
        <div
          className="page-hero-bg"
          style={{ backgroundImage: `url(${bg})` }}
        >
          <div className="page-hero-overlay" />
          <div className="hero-orb orb-1" />
          <div className="hero-orb orb-2" />
          <div className="hero-orb orb-3" />
        </div>
        <div className="page-hero-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="page-title font-heading">
              From Field to<br />
              <span className="page-highlight">Your Table</span>
            </h1>
            <p className="page-subtitle font-body">
              Every harvest tells a story of patience, care, and the rhythm of
              nature. Here's what's coming fresh from our fields.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="page-content">
        {/* Season Filter */}
        <motion.div
          className="harvest-filters"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {seasons.map((season) => (
            <button
              key={season.value}
              className={`harvest-filter-btn ${
                selectedSeason === season.value ? "active" : ""
              }`}
              onClick={() => setSelectedSeason(season.value)}
            >
              {season.label}
            </button>
          ))}
        </motion.div>

        {/* Harvest Grid */}
        <div className="harvest-grid-wrapper" ref={gridRef}>
          <div className="harvest-grid">
            <AnimatePresence mode="wait">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="harvest-card"
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -30 }}
                  transition={{ 
                    delay: index * 0.05, 
                    duration: 0.5,
                    type: "spring",
                    stiffness: 100,
                    damping: 15
                  }}
                  whileHover={!isMobile ? {
                    y: -16,
                    scale: 1.03,
                    rotateX: 2,
                    rotateY: 4,
                    transition: { duration: 0.3 },
                  } : {}}
                  whileTap={isMobile ? {
                    scale: 0.95,
                    transition: { duration: 0.1 }
                  } : {}}
                  onClick={() => setSelectedItem(item)}
                >
                  <div
                    className="harvest-card-image"
                    style={{ backgroundImage: `url(${item.image})` }}
                  >
                    <div className="harvest-card-overlay" />
                    <div className="harvest-card-season">{item.season}</div>
                    <div className="card-shimmer" />
                  </div>
                  <div className="harvest-card-content">
                    <h3 className="harvest-card-name font-heading">{item.name}</h3>
                    <p className="harvest-card-desc font-body">{item.description}</p>
                    <div className="harvest-card-harvest">
                      <span>📅 {item.harvest}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Modal */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              className="harvest-modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
            >
              <motion.div
                className="harvest-modal"
                initial={{ scale: 0.8, y: 60, rotateX: -10 }}
                animate={{ scale: 1, y: 0, rotateX: 0 }}
                exit={{ scale: 0.8, y: 60, rotateX: 10 }}
                transition={{ type: "spring", damping: 25 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="harvest-modal-close"
                  onClick={() => setSelectedItem(null)}
                >
                  ×
                </button>
                <div
                  className="harvest-modal-image"
                  style={{ backgroundImage: `url(${selectedItem.image})` }}
                />
                <div className="harvest-modal-content">
                  <h2 className="harvest-modal-title font-heading">
                    {selectedItem.name}
                  </h2>
                  <p className="harvest-modal-desc font-body">
                    {selectedItem.description}
                  </p>
                  <div className="harvest-modal-details">
                    <div className="harvest-modal-detail">
                      <span className="detail-label">Harvest Season</span>
                      <span className="detail-value">{selectedItem.harvest}</span>
                    </div>
                    <div className="harvest-modal-detail">
                      <span className="detail-label">Nutrition</span>
                      <span className="detail-value">{selectedItem.nutrition}</span>
                    </div>
                    <div className="harvest-modal-detail">
                      <span className="detail-label">Uses</span>
                      <span className="detail-value">{selectedItem.uses}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Harvest Stats */}
        <motion.div
          className="harvest-stats"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="harvest-stat-card">
            <div className="harvest-stat-number">12,450</div>
            <div className="harvest-stat-label">Pounds Harvested</div>
            <div className="stat-progress" style={{ width: "85%" }} />
          </div>
          <div className="harvest-stat-card">
            <div className="harvest-stat-number">156</div>
            <div className="harvest-stat-label">Growing Days</div>
            <div className="stat-progress" style={{ width: "92%" }} />
          </div>
          <div className="harvest-stat-card">
            <div className="harvest-stat-number">98%</div>
            <div className="harvest-stat-label">Freshness Rate</div>
            <div className="stat-progress" style={{ width: "98%" }} />
          </div>
          <div className="harvest-stat-card">
            <div className="harvest-stat-number">24hrs</div>
            <div className="harvest-stat-label">Farm to Table</div>
            <div className="stat-progress" style={{ width: "70%" }} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Harvest;