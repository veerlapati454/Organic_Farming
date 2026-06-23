import React, { useState } from "react";
import { motion } from "framer-motion";
import herobg1 from "../../assets/herobg1.webp";
import herobg2 from "../../assets/herobg2.webp";
import herobg3 from "../../assets/herobg3.webp";
import greenhouse from "../../assets/greenhouse.webp";
import farmer from "../../assets/farmer.webp";
import "./VisitFarm.css"

const VISIT_IMAGES = {
  hero: herobg1,
  farm: herobg2,
  greenhouse,
  farmer,
  fields: herobg3,
};

function VisitFarm() {
  const [activeTab, setActiveTab] = useState("visit");

  const visitInfo = {
    visit: {
      title: "Plan Your Visit",
      description: "We welcome visitors to experience the farm and connect with where their food comes from.",
      details: [
        { label: "Hours", value: "Tuesday - Sunday, 9am - 5pm" },
        { label: "Location", value: "123 Valley Road, Farmtown" },
        { label: "Admission", value: "Free (donations welcome)" },
        { label: "Parking", value: "On-site parking available" },
      ],
    },
    tour: {
      title: "Farm Tours",
      description: "Join our expert guides for an immersive journey through the farm and learn about our sustainable practices.",
      details: [
        { label: "Duration", value: "60-90 minutes" },
        { label: "Availability", value: "Daily at 10am and 2pm" },
        { label: "Group Size", value: "Up to 15 people" },
        { label: "Price", value: "$10 per person (children under 12 free)" },
      ],
    },
    workshop: {
      title: "Workshops",
      description: "Hands-on learning experiences for all ages. From seed starting to composting, there's something for everyone.",
      details: [
        { label: "Schedule", value: "Every Saturday" },
        { label: "Topics", value: "Seed Saving, Composting, Permaculture" },
        { label: "Duration", value: "2 hours" },
        { label: "Price", value: "$25 per person" },
      ],
    },
  };

  const features = [
    { icon: "🌿", title: "Guided Walking Tours", desc: "Explore the fields with our expert guides" },
    { icon: "🧺", title: "Pick-Your-Own Harvest", desc: "Experience the joy of harvesting your own produce" },
    { icon: "🧑‍🌾", title: "Meet the Farmers", desc: "Chat with our team and learn their stories" },
    { icon: "🦋", title: "Wildlife Watching", desc: "Observe birds, butterflies, and beneficial insects" },
    { icon: "🧪", title: "Soil Health Lab", desc: "See the science behind regenerative agriculture" },
    { icon: "🍽️", title: "Farm-to-Table Cafe", desc: "Enjoy fresh meals made from our produce" },
  ];

  return (
    <div className="page-container page-visit">
      <div className="page-hero">
        <div className="page-hero-bg" style={{ backgroundImage: `url(${VISIT_IMAGES.hero})` }}>
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
              Come See<br />
              <span className="page-highlight">Where It Grows</span>
            </h1>
            <p className="page-subtitle font-body">
              Experience the beauty of a working farm, meet the people behind the
              food, and connect with the land in a meaningful way.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="page-content">
        {/* Visit Tabs */}
        <motion.div 
          className="visit-tabs"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <button 
            className={`visit-tab ${activeTab === 'visit' ? 'active' : ''}`}
            onClick={() => setActiveTab('visit')}
          >
            <span>📍</span> Visit
          </button>
          <button 
            className={`visit-tab ${activeTab === 'tour' ? 'active' : ''}`}
            onClick={() => setActiveTab('tour')}
          >
            <span>🚶</span> Tours
          </button>
          <button 
            className={`visit-tab ${activeTab === 'workshop' ? 'active' : ''}`}
            onClick={() => setActiveTab('workshop')}
          >
            <span>🧪</span> Workshops
          </button>
        </motion.div>

        <motion.div 
          className="visit-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          key={activeTab}
        >
          <div className="visit-info">
            <h2 className="visit-title font-heading">{visitInfo[activeTab].title}</h2>
            <p className="visit-description font-body">{visitInfo[activeTab].description}</p>
            <div className="visit-details">
              {visitInfo[activeTab].details.map((detail, i) => (
                <motion.div 
                  className="visit-detail"
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <span className="visit-detail-label">{detail.label}</span>
                  <span className="visit-detail-value">{detail.value}</span>
                </motion.div>
              ))}
            </div>
            <button className="visit-cta">Book Now</button>
          </div>
          <div className="visit-image">
            <div className="visit-image-container" style={{ backgroundImage: `url(${VISIT_IMAGES.greenhouse})` }}>
              <div className="visit-image-overlay" />
            </div>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div 
          className="visit-features"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="section-title font-heading">What to <span className="highlight">Experience</span></h2>
          <div className="visit-features-grid">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="visit-feature"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5 }}
              >
                <div className="visit-feature-icon">{feature.icon}</div>
                <h3 className="visit-feature-title font-heading">{feature.title}</h3>
                <p className="visit-feature-desc font-body">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Map */}
        <motion.div 
          className="visit-map"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="visit-map-container">
            <div className="visit-map-placeholder">
              <div className="visit-map-content">
                <span className="visit-map-marker">📍</span>
                <h3 className="visit-map-title font-heading">Find Us</h3>
                <p className="visit-map-address font-body">123 Valley Road, Farmtown</p>
                <button className="visit-map-btn">Get Directions</button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default VisitFarm;