import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";
import herobg from "../../assets/herobg.webp";

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });
  
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const socialProviders = [
    { 
      id: 'google', 
      name: 'Google', 
      icon: '🔵',
      color: '#4285F4',
      bgColor: 'rgba(66, 133, 244, 0.1)'
    },
    { 
      id: 'apple', 
      name: 'Apple', 
      icon: '⚫',
      color: '#000000',
      bgColor: 'rgba(255, 255, 255, 0.05)'
    },
    { 
      id: 'facebook', 
      name: 'Facebook', 
      icon: '🔷',
      color: '#1877F2',
      bgColor: 'rgba(24, 119, 242, 0.1)'
    },
    { 
      id: 'github', 
      name: 'GitHub', 
      icon: '🐙',
      color: '#FFFFFF',
      bgColor: 'rgba(255, 255, 255, 0.05)'
    },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let processedValue = value;

    if (name === 'username') {
      processedValue = value.replace(/[^a-zA-Z]/g, '');
    }

    if (name === 'fullName') {
      processedValue = value.replace(/[^a-zA-Z\s]/g, '');
    }

    if (name === 'email') {
      processedValue = value.toLowerCase();
    }

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : processedValue,
    });
    
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (!/^[a-zA-Z]+$/.test(formData.username)) {
      newErrors.username = "Username can only contain letters";
    } else if (formData.username.length < 2) {
      newErrors.username = "Username must be at least 2 characters";
    }
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.fullName)) {
      newErrors.fullName = "Full name can only contain letters and spaces";
    } else if (formData.fullName.length < 2) {
      newErrors.fullName = "Name must be at least 2 characters";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(formData.email)) {
      newErrors.email = "Please use a valid Gmail address (example@gmail.com)";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "You must agree to the terms and conditions";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSocialLogin = (provider) => {
    navigate('/404');
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      navigate('/404');
    }
  };

  return (
    <div className="signup-page">
      {/* Background Image */}
      <div className="signup-bg">
        <div className="signup-bg-image" style={{ backgroundImage: `url(${herobg})` }} />
        <div className="signup-bg-overlay" />
      </div>

      {/* Floating Particles */}
      <div className="signup-particles">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="signup-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 12}s`,
              animationDuration: `${15 + Math.random() * 25}s`,
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
            }}
          />
        ))}
      </div>

      {/* Main Container */}
      <div className="signup-container">
        <motion.div
          className="signup-wrapper"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Left Section - Branding (Hidden on Mobile) */}
          <div className="signup-brand-desktop">
            <motion.div 
              className="signup-brand"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="signup-brand-content">
                {/* Back to Home Button */}
                <motion.div 
                  className="signup-back-home"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                >
                  <Link to="/" className="signup-back-home-btn font-body">
                    <span className="signup-back-home-icon">←</span>
                    Back to Home
                  </Link>
                </motion.div>

                <motion.div 
                  className="signup-logo"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="signup-logo-icon">🌾</span>
                  <span className="signup-logo-text font-heading">Earthbound</span>
                </motion.div>
                
                <motion.h1 
                  className="signup-brand-title font-heading"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  Join the
                  <br />
                  <span className="signup-brand-highlight">Regenerative</span>
                  <br />
                  Movement
                </motion.h1>
                
                <motion.p 
                  className="signup-brand-desc font-body"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  Become part of a community that's healing the land,
                  one season at a time. Start your journey today.
                </motion.p>

                <motion.div 
                  className="signup-benefits"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                >
                  <div className="signup-benefit">
                    <span className="signup-benefit-icon">🌱</span>
                    <span className="signup-benefit-text font-body">Fresh, organic produce delivered weekly</span>
                  </div>
                  <div className="signup-benefit">
                    <span className="signup-benefit-icon">🤝</span>
                    <span className="signup-benefit-text font-body">Join a community of conscious eaters</span>
                  </div>
                  <div className="signup-benefit">
                    <span className="signup-benefit-icon">📚</span>
                    <span className="signup-benefit-text font-body">Access to exclusive farming workshops</span>
                  </div>
                  <div className="signup-benefit">
                    <span className="signup-benefit-icon">💚</span>
                    <span className="signup-benefit-text font-body">Support regenerative agriculture</span>
                  </div>
                </motion.div>

                <motion.div 
                  className="signup-login-link"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4, duration: 0.4 }}
                >
                  <span className="font-body">Already have an account?</span>
                  <Link to="/login" className="signup-login-btn font-body">
                    Sign In →
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Right Section - Form (Always Visible) */}
          <motion.div 
            className="signup-form-wrapper"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="signup-form-container liquid-glass-strong">
              {/* Back to Home - Mobile Only */}
              <div className="signup-back-home-mobile">
                <Link to="/" className="signup-back-home-btn-mobile font-body">
                  <span className="signup-back-home-icon-mobile">←</span>
                  Back to Home
                </Link>
              </div>

              <div className="signup-form-header">
                <h2 className="signup-form-title font-heading">
                  Create Account
                </h2>
                <p className="signup-form-subtitle font-body">
                  Join our regenerative community today
                </p>
              </div>

              <form className="signup-form" onSubmit={handleSubmit}>
                {/* Username */}
                <div className="signup-form-group">
                  <label className="signup-form-label font-body">
                    Username <span className="signup-required">(letters only)</span>
                  </label>
                  <div className="signup-input-wrapper">
                    <span className="signup-input-icon">@</span>
                    <input
                      type="text"
                      name="username"
                      className={`signup-form-input ${errors.username ? 'error' : ''} ${focusedField === 'username' ? 'focused' : ''}`}
                      placeholder="john"
                      value={formData.username}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('username')}
                      onBlur={() => setFocusedField(null)}
                      maxLength="20"
                    />
                    {errors.username && (
                      <motion.span 
                        className="signup-error"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {errors.username}
                      </motion.span>
                    )}
                  </div>
                </div>

                {/* Full Name */}
                <div className="signup-form-group">
                  <label className="signup-form-label font-body">
                    Full Name <span className="signup-required">(letters only)</span>
                  </label>
                  <div className="signup-input-wrapper">
                    <span className="signup-input-icon">👤</span>
                    <input
                      type="text"
                      name="fullName"
                      className={`signup-form-input ${errors.fullName ? 'error' : ''} ${focusedField === 'fullName' ? 'focused' : ''}`}
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('fullName')}
                      onBlur={() => setFocusedField(null)}
                    />
                    {errors.fullName && (
                      <motion.span 
                        className="signup-error"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {errors.fullName}
                      </motion.span>
                    )}
                  </div>
                </div>

                {/* Email - Gmail only */}
                <div className="signup-form-group">
                  <label className="signup-form-label font-body">
                    Email Address <span className="signup-required">(Gmail only)</span>
                  </label>
                  <div className="signup-input-wrapper">
                    <span className="signup-input-icon">✉️</span>
                    <input
                      type="email"
                      name="email"
                      className={`signup-form-input ${errors.email ? 'error' : ''} ${focusedField === 'email' ? 'focused' : ''}`}
                      placeholder="example@gmail.com"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                    />
                    {errors.email && (
                      <motion.span 
                        className="signup-error"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {errors.email}
                      </motion.span>
                    )}
                  </div>
                </div>

                {/* Password */}
                <div className="signup-form-group">
                  <label className="signup-form-label font-body">
                    Password <span className="signup-required">(min 6 characters)</span>
                  </label>
                  <div className="signup-input-wrapper">
                    <span className="signup-input-icon">🔒</span>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className={`signup-form-input ${errors.password ? 'error' : ''} ${focusedField === 'password' ? 'focused' : ''}`}
                      placeholder="Minimum 6 characters"
                      value={formData.password}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('password')}
                      onBlur={() => setFocusedField(null)}
                    />
                    <button
                      type="button"
                      className="signup-password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? "👁️" : "👁️‍🗨️"}
                    </button>
                    {errors.password && (
                      <motion.span 
                        className="signup-error"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {errors.password}
                      </motion.span>
                    )}
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="signup-form-group">
                  <label className="signup-form-label font-body">
                    Confirm Password
                  </label>
                  <div className="signup-input-wrapper">
                    <span className="signup-input-icon">🔐</span>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      className={`signup-form-input ${errors.confirmPassword ? 'error' : ''} ${focusedField === 'confirmPassword' ? 'focused' : ''}`}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('confirmPassword')}
                      onBlur={() => setFocusedField(null)}
                    />
                    <button
                      type="button"
                      className="signup-password-toggle"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    >
                      {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                    </button>
                    {errors.confirmPassword && (
                      <motion.span 
                        className="signup-error"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {errors.confirmPassword}
                      </motion.span>
                    )}
                  </div>
                </div>

                {/* Terms & Conditions */}
                <div className="signup-form-group signup-terms">
                  <label className="signup-checkbox-label">
                    <input
                      type="checkbox"
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={handleChange}
                      className="signup-checkbox"
                    />
                    <span className="signup-checkbox-custom"></span>
                    <span className="signup-checkbox-text font-body">
                      I agree to the{" "}
                      <Link to="/terms" className="signup-terms-link">
                        Terms of Service
                      </Link>
                      {" "}and{" "}
                      <Link to="/privacy" className="signup-terms-link">
                        Privacy Policy
                      </Link>
                    </span>
                  </label>
                  {errors.agreeTerms && (
                    <motion.span 
                      className="signup-error"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {errors.agreeTerms}
                    </motion.span>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  className="signup-submit-btn font-body"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Create Account
                  <span className="signup-submit-arrow">→</span>
                </motion.button>

                {/* Login Redirect Button */}
                <div className="signup-login-wrapper">
                  <motion.button
                    type="button"
                    className="signup-login-redirect-btn font-body"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleLoginRedirect}
                  >
                    <span className="signup-login-redirect-icon">🔑</span>
                    Already have an account? Sign In
                    <span className="signup-login-redirect-arrow">→</span>
                  </motion.button>
                </div>

                {/* Social Sign Up */}
                <div className="signup-social">
                  <div className="signup-social-divider">
                    <span className="signup-social-divider-text font-body">Or continue with</span>
                  </div>
                  <div className="signup-social-buttons">
                    {socialProviders.map((provider) => (
                      <motion.button
                        key={provider.id}
                        type="button"
                        className="signup-social-btn"
                        style={{
                          backgroundColor: provider.bgColor,
                          borderColor: `rgba(255, 255, 255, 0.08)`,
                        }}
                        whileHover={{ 
                          scale: 1.05,
                          backgroundColor: provider.bgColor,
                          borderColor: provider.color,
                        }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleSocialLogin(provider.id)}
                      >
                        <span className="signup-social-icon">
                          {provider.icon}
                          {provider.name}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default SignUp;