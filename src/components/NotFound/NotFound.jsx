import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./NotFound.css";

function NotFound() {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
  }));

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="notfound-page" ref={containerRef}>
      {/* Background Particles */}
      <div className="notfound-particles">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="notfound-particle"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Glow Effects */}
      <div className="notfound-glow notfound-glow-1" />
      <div className="notfound-glow notfound-glow-2" />

      {/* Main Content */}
      <div className="notfound-container">
        {/* 3D Number */}
        <motion.div
          className="notfound-3d-wrapper"
          animate={{
            rotateX: mousePosition.y * 8,
            rotateY: mousePosition.x * 8,
          }}
          transition={{
            type: "spring",
            stiffness: 150,
            damping: 20,
            mass: 0.5,
          }}
        >
          <div className="notfound-3d-number">
            <span className="notfound-digit notfound-digit-4">4</span>
            <span className="notfound-digit notfound-digit-0">0</span>
            <span className="notfound-digit notfound-digit-4">4</span>
          </div>
        </motion.div>

        {/* Floating Elements */}
        <div className="notfound-floating-elements">
          <motion.div
            className="notfound-float-element notfound-float-1"
            animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            🌱
          </motion.div>
          <motion.div
            className="notfound-float-element notfound-float-2"
            animate={{ y: [0, 20, 0], rotate: [0, -10, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            🌾
          </motion.div>
          <motion.div
            className="notfound-float-element notfound-float-3"
            animate={{ y: [0, -15, 0], rotate: [0, 15, -5, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
            🌻
          </motion.div>
          <motion.div
            className="notfound-float-element notfound-float-4"
            animate={{ y: [0, 18, 0], rotate: [0, -15, 5, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          >
            🍃
          </motion.div>
        </div>

        {/* Text Content */}
        <motion.div
          className="notfound-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h1 className="notfound-title font-heading">Page Not Found</h1>
          <p className="notfound-description font-body">
            Oops! The page you're looking for seems to have wandered off the farm.
            <br />
            Let's get you back on track.
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          className="notfound-buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {/*
            Go Back: no whileHover/whileTap on this button.
            whileTap causes Framer Motion to delay releasing the pointer
            event until its scale animation completes — by that time the
            dashboard has already mounted and the stray click lands on
            the hamburger button, flashing the sidebar open then closed.
            A plain button with a CSS :active style is safe instead.
          */}
          <button
            className="notfound-btn notfound-btn-back"
            onClick={handleGoBack}
          >
            <span className="notfound-btn-icon">←</span>
            Go Back
          </button>

          <motion.button
            className="notfound-btn notfound-btn-home"
            onClick={() => navigate('/')}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="notfound-btn-icon">🏠</span>
            Back to Home
          </motion.button>
        </motion.div>

        {/* Decorative Text */}
        <motion.div
          className="notfound-decorative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.03 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          <span>404</span>
          <span>Lost</span>
          <span>Found</span>
        </motion.div>
      </div>
    </div>
  );
}

export default NotFound;