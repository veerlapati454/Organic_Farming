import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import herobg from "../../assets/herobg.webp";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user",
  });
  
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
    const { name, value } = e.target;
    let processedValue = value;

    if (name === 'email') {
      processedValue = value.toLowerCase();
    }

    setFormData({
      ...formData,
      [name]: processedValue,
    });
    
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(formData.email)) {
      newErrors.email = "Please use a valid Gmail address";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSocialLogin = (provider) => {
    navigate('/404');
  };

  const handleForgotPassword = () => {
    navigate('/404');
  };

  const handleRegister = () => {
    navigate('/signup');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        if (formData.role === 'admin') {
          navigate('/admin-dashboard');
        } else {
          navigate('/user-dashboard');
        }
      }, 1000);
    }
  };

  return (
    <div className="login-page">
      {/* Background Image */}
      <div className="login-bg">
        <div className="login-bg-image" style={{ backgroundImage: `url(${herobg})` }} />
        <div className="login-bg-overlay" />
      </div>

      {/* Floating Particles */}
      <div className="login-particles">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="login-particle"
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
      <div className="login-container">
        <motion.div
          className="login-wrapper"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Left Section - Branding (Hidden on Mobile) */}
          <div className="login-brand-desktop">
            <motion.div 
              className="login-brand"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="login-brand-content">
                {/* Back to Home Button */}
                <motion.div 
                  className="login-back-home"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                >
                  <Link to="/" className="login-back-home-btn font-body">
                    <span className="login-back-home-icon">←</span>
                    Back to Home
                  </Link>
                </motion.div>

                <motion.div 
                  className="login-logo"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="login-logo-icon">🌾</span>
                  <span className="login-logo-text font-heading">Earthbound</span>
                </motion.div>
                
                <motion.h1 
                  className="login-brand-title font-heading"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  Welcome
                  <br />
                  <span className="login-brand-highlight">Back to</span>
                  <br />
                  the Farm
                </motion.h1>
                
                <motion.p 
                  className="login-brand-desc font-body"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  Sign in to access your farm dashboard, track your harvest,
                  and connect with our regenerative community.
                </motion.p>

                <motion.div 
                  className="login-benefits"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                >
                  <div className="login-benefit">
                    <span className="login-benefit-icon">🌱</span>
                    <span className="login-benefit-text font-body">Fresh, organic produce delivered weekly</span>
                  </div>
                  <div className="login-benefit">
                    <span className="login-benefit-icon">🤝</span>
                    <span className="login-benefit-text font-body">Join a community of conscious eaters</span>
                  </div>
                  <div className="login-benefit">
                    <span className="login-benefit-icon">📚</span>
                    <span className="login-benefit-text font-body">Access to exclusive farming workshops</span>
                  </div>
                  <div className="login-benefit">
                    <span className="login-benefit-icon">💚</span>
                    <span className="login-benefit-text font-body">Support regenerative agriculture</span>
                  </div>
                </motion.div>

                <motion.div 
                  className="login-signup-link"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4, duration: 0.4 }}
                >
                  <span className="font-body">Don't have an account?</span>
                  <Link to="/signup" className="login-signup-btn font-body">
                    Sign Up →
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Right Section - Form (Always Visible) */}
          <motion.div 
            className="login-form-wrapper"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="login-form-container liquid-glass-strong">
              {/* Back to Home - Mobile Only */}
              <div className="login-back-home-mobile">
                <Link to="/" className="login-back-home-btn-mobile font-body">
                  <span className="login-back-home-icon-mobile">←</span>
                  Back to Home
                </Link>
              </div>

              <div className="login-form-header">
                <h2 className="login-form-title font-heading">
                  Sign In
                </h2>
                <p className="login-form-subtitle font-body">
                  Access your regenerative farming account
                </p>
              </div>

              <form className="login-form" onSubmit={handleSubmit}>
                {/* Role Selection */}
                <div className="login-form-group">
                  <label className="login-form-label font-body">
                    Login As
                  </label>
                  <div className="login-role-selector">
                    <button
                      type="button"
                      className={`login-role-btn ${formData.role === 'user' ? 'active' : ''}`}
                      onClick={() => setFormData({ ...formData, role: 'user' })}
                    >
                      <span className="login-role-icon">👤</span>
                      User
                    </button>
                    <button
                      type="button"
                      className={`login-role-btn ${formData.role === 'admin' ? 'active' : ''}`}
                      onClick={() => setFormData({ ...formData, role: 'admin' })}
                    >
                      <span className="login-role-icon">👑</span>
                      Admin
                    </button>
                  </div>
                </div>

                {/* Email */}
                <div className="login-form-group">
                  <label className="login-form-label font-body">
                    Email Address
                  </label>
                  <div className="login-input-wrapper">
                    <span className="login-input-icon">✉️</span>
                    <input
                      type="email"
                      name="email"
                      className={`login-form-input ${errors.email ? 'error' : ''} ${focusedField === 'email' ? 'focused' : ''}`}
                      placeholder="example@gmail.com"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                    />
                    {errors.email && (
                      <motion.span 
                        className="login-error"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {errors.email}
                      </motion.span>
                    )}
                  </div>
                </div>

                {/* Password */}
                <div className="login-form-group">
                  <label className="login-form-label font-body">
                    Password
                  </label>
                  <div className="login-input-wrapper">
                    <span className="login-input-icon">🔒</span>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className={`login-form-input ${errors.password ? 'error' : ''} ${focusedField === 'password' ? 'focused' : ''}`}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('password')}
                      onBlur={() => setFocusedField(null)}
                    />
                    <button
                      type="button"
                      className="login-password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? "👁️" : "👁️‍🗨️"}
                    </button>
                    {errors.password && (
                      <motion.span 
                        className="login-error"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {errors.password}
                      </motion.span>
                    )}
                  </div>
                </div>

                {/* Forgot Password */}
                <div className="login-forgot-password">
                  <button
                    type="button"
                    className="login-forgot-btn font-body"
                    onClick={handleForgotPassword}
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  className="login-submit-btn font-body"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="login-spinner"></span>
                      Signing In...
                    </>
                  ) : (
                    <>
                      Sign In
                      <span className="login-submit-arrow">→</span>
                    </>
                  )}
                </motion.button>

                {/* Register Button */}
                <div className="login-register-wrapper">
                  <motion.button
                    type="button"
                    className="login-register-btn font-body"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleRegister}
                  >
                    <span className="login-register-icon">✨</span>
                    New to Earthbound? Register Here
                    <span className="login-register-arrow">→</span>
                  </motion.button>
                </div>

                {/* Role Info */}
                <div className="login-role-info">
                  <div className="login-role-info-item">
                    <span className="login-role-info-dot user"></span>
                    <span className="login-role-info-text font-body">User: Access your farm dashboard</span>
                  </div>
                  <div className="login-role-info-item">
                    <span className="login-role-info-dot admin"></span>
                    <span className="login-role-info-text font-body">Admin: Manage farm operations</span>
                  </div>
                </div>

                {/* Social Login */}
                <div className="login-social">
                  <div className="login-social-divider">
                    <span className="login-social-divider-text font-body">Or continue with</span>
                  </div>
                  <div className="login-social-buttons">
                    {socialProviders.map((provider) => (
                      <motion.button
                        key={provider.id}
                        type="button"
                        className="login-social-btn"
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
                        <span className="login-social-icon">
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

export default Login;