import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./JoinCoop.css";
import herobg from "../../assets/bg4.webp";
import farmer from "../../assets/farmer.webp";
import harvest from "../../assets/harvest.webp";
import vegetables from "../../assets/vegetables.webp";

const JOIN_IMAGES = {
  hero: herobg,
  farmer,
  harvest,
  vegetables,
};

function JoinCoop() {
  const navigate = useNavigate();
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: '',
    message: '',
    hearAbout: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;

    // Name: only allow alphabets and spaces
    if (name === 'name') {
      processedValue = value.replace(/[^a-zA-Z\s]/g, '');
      // Clear error when user types
      if (errors.name) {
        setErrors({ ...errors, name: '' });
      }
    }

    // Email: only allow Gmail format
    if (name === 'email') {
      processedValue = value.toLowerCase();
      // Clear error when user types
      if (errors.email) {
        setErrors({ ...errors, email: '' });
      }
    }

    // Phone: only allow numbers and +, -, spaces
    if (name === 'phone') {
      // Allow only numbers, +, -, and spaces for phone
      processedValue = value.replace(/[^0-9+\-\s]/g, '');
      if (errors.phone) {
        setErrors({ ...errors, phone: '' });
      }
    }

    setFormData({
      ...formData,
      [name]: processedValue
    });
  };

  const validateStep1 = () => {
    let isValid = true;
    const newErrors = { name: '', email: '', phone: '' };

    // Validate Name - alphabets only
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
      isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      newErrors.name = 'Name can only contain letters and spaces';
      isValid = false;
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
      isValid = false;
    }

    // Validate Email - Gmail only
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(formData.email)) {
      newErrors.email = 'Please use a valid Gmail address (example@gmail.com)';
      isValid = false;
    }

    // Validate Phone - optional but must be valid if provided
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } 
    if (formData.phone.trim()) {
      const phoneDigits = formData.phone.replace(/[^0-9]/g, '');
      if (phoneDigits.length < 10) {
        newErrors.phone = 'Please enter a valid phone number (minimum 10 digits)';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const nextStep = () => {
    if (formStep === 1) {
      // Validate step 1 before proceeding
      if (validateStep1()) {
        if (formStep < 3) setFormStep(formStep + 1);
      }
    } else {
      if (formStep < 3) setFormStep(formStep + 1);
    }
  };

  const prevStep = () => {
    if (formStep > 1) setFormStep(formStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Navigate to 404 instead of showing alert
    navigate('/404');
  };

  const benefits = [
    {
      icon: "🌱",
      title: "Fresh, Organic Produce",
      desc: "Weekly shares of the freshest, most flavorful produce grown with care."
    },
    {
      icon: "🤝",
      title: "Community Connection",
      desc: "Join a network of like-minded individuals who care about good food."
    },
    {
      icon: "📚",
      title: "Educational Workshops",
      desc: "Learn about sustainable farming, cooking, and food preservation."
    },
    {
      icon: "💚",
      title: "Support Local Agriculture",
      desc: "Your membership directly supports regenerative farming practices."
    }
  ];

  const membershipTiers = [
    {
      name: "Seed",
      price: "$25",
      period: "/month",
      features: [
        "Weekly newsletter",
        "Discount on farm store items",
        "Invitation to community events",
      ]
    },
    {
      name: "Sprout",
      price: "$50",
      period: "/month",
      features: [
        "All Seed benefits",
        "Monthly veggie box",
        "Access to workshops",
        "Farm tour invite",
      ],
      popular: true
    },
    {
      name: "Root",
      price: "$100",
      period: "/month",
      features: [
        "All Sprout benefits",
        "Weekly veggie box",
        "Free workshops",
        "Pick-your-own access",
        "VIP event invitations",
        "Special harvest boxes",
      ]
    }
  ];

  return (
    <div className="page-container page-join">
      <div className="page-hero">
        <div className="page-hero-bg" style={{ backgroundImage: `url(${JOIN_IMAGES.hero})` }}>
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
              Become Part of<br />
              <span className="page-highlight">Something Bigger</span>
            </h1>
            <p className="page-subtitle font-body">
              Join our cooperative and help build a more sustainable food system.
              Together, we can create a future where good food is accessible to all.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="page-content">
        {/* Benefits */}
        <motion.div 
          className="join-benefits"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="section-title font-heading">Why <span className="highlight">Join</span> the Co-op</h2>
          <div className="join-benefits-grid">
            {benefits.map((benefit, index) => (
              <motion.div 
                key={index}
                className="join-benefit"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                onClick={() => navigate('/404')}
              >
                <div className="join-benefit-icon">{benefit.icon}</div>
                <h3 className="join-benefit-title font-heading">{benefit.title}</h3>
                <p className="join-benefit-desc font-body">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Membership Tiers */}
        <motion.div 
          className="join-tiers"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="section-title font-heading">Choose Your <span className="highlight">Membership</span></h2>
          <div className="join-tiers-grid">
            {membershipTiers.map((tier, index) => (
              <motion.div 
                key={index}
                className={`join-tier ${tier.popular ? 'popular' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -10 }}
              >
                {tier.popular && <div className="join-tier-badge">Most Popular</div>}
                <h3 className="join-tier-name font-heading">{tier.name}</h3>
                <div className="join-tier-price">
                  <span className="join-tier-amount">{tier.price}</span>
                  <span className="join-tier-period">{tier.period}</span>
                </div>
                <ul className="join-tier-features">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="join-tier-feature">
                      <span className="join-tier-check">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className={`join-tier-btn ${tier.popular ? 'primary' : ''}`} onClick={() => navigate('/404')}>
                  Choose {tier.name}
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Join Form */}
        <motion.div 
          className="join-form-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="join-form-container">
            <h2 className="section-title font-heading">Ready to <span className="highlight">Join</span> Us?</h2>
            <p className="join-form-subtitle font-body">
              Fill out the form below and we'll be in touch with more information
              about becoming a member of our cooperative.
            </p>

            <form onSubmit={handleSubmit} className="join-form">
              {/* Step 1: Personal Info */}
              {formStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  className="join-form-step"
                >
                  <div className="join-form-group">
                    <label className="join-form-label">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      className={`join-form-input ${errors.name ? 'error' : ''}`}
                      placeholder="John Doe (letters only)"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                    {errors.name && (
                      <span className="join-form-error">{errors.name}</span>
                    )}
                  </div>
                  <div className="join-form-group">
                    <label className="join-form-label">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      className={`join-form-input ${errors.email ? 'error' : ''}`}
                      placeholder="example@gmail.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                    {errors.email && (
                      <span className="join-form-error">{errors.email}</span>
                    )}
                  </div>
                  <div className="join-form-group">
                    <label className="join-form-label">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      className={`join-form-input ${errors.phone ? 'error' : ''}`}
                      placeholder="+91 9876543210"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                    {errors.phone && (
                      <span className="join-form-error">{errors.phone}</span>
                    )}
                  </div>
                  <button 
                    type="button" 
                    className="join-form-next" 
                    onClick={nextStep}
                  >
                    Next Step →
                  </button>
                </motion.div>
              )}

              {/* Step 2: Interest */}
              {formStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  className="join-form-step"
                >
                  <div className="join-form-group">
                    <label className="join-form-label">What interests you most?</label>
                    <select
                      name="interest"
                      className="join-form-input"
                      value={formData.interest}
                      onChange={handleInputChange}
                    >
                      <option value="">Select an option</option>
                      <option value="produce">Fresh produce</option>
                      <option value="community">Community connection</option>
                      <option value="education">Learning opportunities</option>
                      <option value="support">Supporting local agriculture</option>
                    </select>
                  </div>
                  <div className="join-form-group">
                    <label className="join-form-label">How did you hear about us?</label>
                    <input
                      type="text"
                      name="hearAbout"
                      className="join-form-input"
                      placeholder="Friend, social media, event..."
                      value={formData.hearAbout}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="join-form-group">
                    <label className="join-form-label">Message (optional)</label>
                    <textarea
                      name="message"
                      className="join-form-textarea"
                      placeholder="Tell us a bit about yourself..."
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="4"
                    />
                  </div>
                  <div className="join-form-buttons">
                    <button type="button" className="join-form-prev" onClick={prevStep}>
                      ← Back
                    </button>
                    <button type="button" className="join-form-next" onClick={nextStep}>
                      Review →
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Review & Submit */}
              {formStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  className="join-form-step"
                >
                  <div className="join-form-review">
                    <h4 className="join-form-review-title">Review Your Information</h4>
                    <div className="join-form-review-item">
                      <span className="review-label">Name:</span>
                      <span className="review-value">{formData.name || 'Not provided'}</span>
                    </div>
                    <div className="join-form-review-item">
                      <span className="review-label">Email:</span>
                      <span className="review-value">{formData.email || 'Not provided'}</span>
                    </div>
                    <div className="join-form-review-item">
                      <span className="review-label">Phone:</span>
                      <span className="review-value">{formData.phone || 'Not provided'}</span>
                    </div>
                    <div className="join-form-review-item">
                      <span className="review-label">Interest:</span>
                      <span className="review-value">{formData.interest || 'Not selected'}</span>
                    </div>
                  </div>
                  <div className="join-form-buttons">
                    <button type="button" className="join-form-prev" onClick={prevStep}>
                      ← Back
                    </button>
                    <button type="submit" className="join-form-submit">
                      Join the Co-op
                    </button>
                  </div>
                </motion.div>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default JoinCoop;