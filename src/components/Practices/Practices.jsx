import React, { useState } from "react";
import { motion } from "framer-motion";
import "./Practices.css";
import soil from "../../assets/soil.webp";
import sunflower from "../../assets/sunflower.webp";
import vegetables from "../../assets/vegetables.webp";
import wheat from "../../assets/wheat.webp";
import bg from "../../assets/herobg3.webp"

const PRACTICE_IMAGES = {
  soil,
  sunflower,
  vegetables,
  wheat,
};

function Practices() {
  const [activePractice, setActivePractice] = useState(0);

  const practices = [
    {
      id: "regenerative",
      title: "Regenerative Agriculture",
      icon: "🌱",
      image: PRACTICE_IMAGES.soil,
      description: "We work with nature, not against it. Our practices rebuild soil health, increase biodiversity, and capture carbon.",
      principles: [
        "No-till farming preserves soil structure",
        "Cover crops protect and enrich the soil",
        "Rotational grazing improves pasture health",
        "Composting returns nutrients to the earth"
      ],
      impact: "Soil organic matter increased by 45% over 5 years",
    },
    {
      id: "biodiversity",
      title: "Biodiversity Conservation",
      icon: "🌺",
      image: PRACTICE_IMAGES.sunflower,
      description: "We create habitats for pollinators and beneficial insects, protecting the delicate web of life on our farm.",
      principles: [
        "Native wildflower borders for pollinators",
        "Hedgerows provide wildlife corridors",
        "No pesticides or synthetic chemicals",
        "Seed saving preserves genetic diversity"
      ],
      impact: "42 species of pollinators recorded on the farm",
    },
    {
      id: "water",
      title: "Water Stewardship",
      icon: "💧",
      image: PRACTICE_IMAGES.vegetables,
      description: "We use water responsibly, harvesting rainwater and using efficient irrigation methods to conserve this precious resource.",
      principles: [
        "Rainwater harvesting systems",
        "Drip irrigation reduces water waste",
        "Swales capture and filter runoff",
        "Natural wetlands filter water naturally"
      ],
      impact: "Water usage reduced by 60% per crop yield",
    },
    {
      id: "community",
      title: "Community Engagement",
      icon: "🤝",
      image: PRACTICE_IMAGES.wheat,
      description: "We believe in building strong local food systems and empowering our community through education and access.",
      principles: [
        "Community-supported agriculture (CSA)",
        "Workshops and farm tours",
        "School education programs",
        "Food access initiatives"
      ],
      impact: "150+ families connected to local food",
    },
  ];

  return (
    <div className="page-container page-practices">
      <div className="page-hero">
        <div className="page-hero-bg" style={{ backgroundImage: `url(${bg})` }}>
          <div className="page-hero-overlay" />
        </div>
        <div className="page-hero-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="page-badge"></span>
            <h1 className="page-title font-heading">
              Farming with<br />
              <span className="page-highlight">Nature's Wisdom</span>
            </h1>
            <p className="page-subtitle font-body">
              Our practices are grounded in centuries of agricultural wisdom and
              modern ecological science. We farm not just for today, but for the
              future we want to see.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="page-content">
        <div className="practices-grid">
          {/* Practice Cards */}
          <div className="practices-cards">
            {practices.map((practice, index) => (
              <motion.div
                key={practice.id}
                className={`practice-card ${activePractice === index ? 'active' : ''}`}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setActivePractice(index)}
                whileHover={{ scale: 1.02 }}
              >
                <div className="practice-card-icon">{practice.icon}</div>
                <div className="practice-card-content">
                  <h3 className="practice-card-title font-heading">{practice.title}</h3>
                  <p className="practice-card-desc font-body">{practice.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Practice Detail */}
          <motion.div
            className="practice-detail"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            key={activePractice}
          >
            <div className="practice-detail-image" style={{ backgroundImage: `url(${practices[activePractice].image})` }}>
              <div className="practice-detail-overlay" />
            </div>
            <div className="practice-detail-content">
              <div className="practice-detail-header">
                <span className="practice-detail-icon">{practices[activePractice].icon}</span>
                <h2 className="practice-detail-title font-heading">{practices[activePractice].title}</h2>
              </div>
              <p className="practice-detail-desc font-body">{practices[activePractice].description}</p>
              
              <div className="practice-principles">
                <h4 className="practice-principles-title font-heading">Key Principles</h4>
                <ul className="practice-principles-list">
                  {practices[activePractice].principles.map((principle, i) => (
                    <motion.li
                      key={i}
                      className="practice-principle"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <span className="practice-principle-icon">✦</span>
                      {principle}
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="practice-impact">
                <span className="practice-impact-label">📊 Impact</span>
                <span className="practice-impact-value">{practices[activePractice].impact}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Practice Stats */}
        <motion.div 
          className="practice-stats"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="practice-stat">
            <div className="practice-stat-number">100%</div>
            <div className="practice-stat-label">Organic Certified</div>
          </div>
          <div className="practice-stat">
            <div className="practice-stat-number">12+</div>
            <div className="practice-stat-label">Years of Regenerative Practice</div>
          </div>
          <div className="practice-stat">
            <div className="practice-stat-number">56</div>
            <div className="practice-stat-label">Beneficial Species Found</div>
          </div>
          <div className="practice-stat">
            <div className="practice-stat-number">0</div>
            <div className="practice-stat-label">Synthetic Inputs Used</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Practices;