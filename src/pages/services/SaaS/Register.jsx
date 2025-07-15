
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
    userType: "customer" // customer or tenant
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleUserTypeChange = (type) => {
    setFormData(prev => ({
      ...prev,
      userType: type
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Registration attempt:", formData);
      setIsLoading(false);
      // Redirect to login page on successful registration
      window.location.href = "/services/saas/login";
    }, 2000);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f8fafc",
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
    }}>
      {/* SaaS Navigation Menu */}
      <nav style={{
        background: "white",
        borderBottom: "1px solid #e5e7eb",
        padding: "1rem 2rem",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Link 
              to="/services/saas"
              style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: "0.5rem", 
                textDecoration: "none" 
              }}
            >
              <div style={{ background: "#3b82f6", color: "white", padding: "6px 12px", borderRadius: "6px", fontWeight: "bold" }}>
                📦 SaaSibly
              </div>
            </Link>
          </div>
          
          <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
            <Link 
              to="/services/saas"
              style={{ 
                textDecoration: "none",
                color: "#6b7280",
                fontWeight: "normal"
              }}
            >
              Home
            </Link>
            <Link 
              to="/services/saas"
              style={{ 
                textDecoration: "none",
                color: "#6b7280",
                fontWeight: "normal"
              }}
            >
              Features
            </Link>
            <Link 
              to="/services/saas"
              style={{ 
                textDecoration: "none",
                color: "#6b7280",
                fontWeight: "normal"
              }}
            >
              Marketplace
            </Link>
            <Link 
              to="/services/saas"
              style={{ 
                textDecoration: "none",
                color: "#6b7280",
                fontWeight: "normal"
              }}
            >
              Pricing
            </Link>
          </div>

          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <Link 
              to="/services/saas/login"
              style={{ 
                textDecoration: "none",
                color: "#3b82f6", 
                fontWeight: "bold"
              }}
            >
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      {/* Registration Form Container */}
      <div style={{
        minHeight: "calc(100vh - 80px)",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem"
      }}>
        <div style={{
          background: "white",
          borderRadius: "12px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
          padding: "3rem",
          width: "100%",
          maxWidth: "500px"
        }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <h1 style={{
              fontSize: "2rem",
              fontWeight: "600",
              color: "#1f2937",
              marginBottom: "0.5rem"
            }}>
              Create your SaaSible Account
            </h1>
            <p style={{
              color: "#6b7280",
              fontSize: "0.875rem",
              lineHeight: "1.5"
            }}>
              Join us as a customer or a software vendor.
            </p>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit}>
            {/* User Type Selection */}
            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{
                display: "block",
                fontSize: "0.875rem",
                fontWeight: "500",
                color: "#374151",
                marginBottom: "0.75rem"
              }}>
                I want to register as a:
              </label>
              <div style={{ display: "flex", gap: "1rem" }}>
                <label style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  cursor: "pointer",
                  fontSize: "0.875rem",
                  color: "#374151"
                }}>
                  <input
                    type="radio"
                    name="userType"
                    value="customer"
                    checked={formData.userType === "customer"}
                    onChange={(e) => handleUserTypeChange(e.target.value)}
                    style={{ accentColor: "#3b82f6" }}
                  />
                  Customer (End-User)
                </label>
                <label style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  cursor: "pointer",
                  fontSize: "0.875rem",
                  color: "#374151"
                }}>
                  <input
                    type="radio"
                    name="userType"
                    value="tenant"
                    checked={formData.userType === "tenant"}
                    onChange={(e) => handleUserTypeChange(e.target.value)}
                    style={{ accentColor: "#3b82f6" }}
                  />
                  Tenant (Software Vendor)
                </label>
              </div>
            </div>

            {/* Full Name */}
            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{
                display: "block",
                fontSize: "0.875rem",
                fontWeight: "500",
                color: "#374151",
                marginBottom: "0.5rem"
              }}>
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                required
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: errors.fullName ? "1px solid #ef4444" : "1px solid #d1d5db",
                  borderRadius: "6px",
                  fontSize: "0.875rem",
                  backgroundColor: "#f9fafb",
                  outline: "none",
                  transition: "border-color 0.2s, background-color 0.2s",
                  boxSizing: "border-box"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#3b82f6";
                  e.target.style.backgroundColor = "white";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = errors.fullName ? "#ef4444" : "#d1d5db";
                  e.target.style.backgroundColor = "#f9fafb";
                }}
              />
              {errors.fullName && (
                <div style={{ fontSize: "0.75rem", color: "#ef4444", marginTop: "0.25rem" }}>
                  {errors.fullName}
                </div>
              )}
            </div>

            {/* Email */}
            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{
                display: "block",
                fontSize: "0.875rem",
                fontWeight: "500",
                color: "#374151",
                marginBottom: "0.5rem"
              }}>
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="admin@saasible.com"
                required
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: errors.email ? "1px solid #ef4444" : "1px solid #d1d5db",
                  borderRadius: "6px",
                  fontSize: "0.875rem",
                  backgroundColor: "#f9fafb",
                  outline: "none",
                  transition: "border-color 0.2s, background-color 0.2s",
                  boxSizing: "border-box"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#3b82f6";
                  e.target.style.backgroundColor = "white";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = errors.email ? "#ef4444" : "#d1d5db";
                  e.target.style.backgroundColor = "#f9fafb";
                }}
              />
              {errors.email && (
                <div style={{ fontSize: "0.75rem", color: "#ef4444", marginTop: "0.25rem" }}>
                  {errors.email}
                </div>
              )}
            </div>

            {/* Mobile Number */}
            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "0.875rem",
                fontWeight: "500",
                color: "#374151",
                marginBottom: "0.5rem"
              }}>
                <input
                  type="checkbox"
                  style={{ accentColor: "#3b82f6" }}
                />
                Mobile Number (Optional)
              </label>
              <input
                type="tel"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleInputChange}
                placeholder="Enter your mobile number"
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "1px solid #d1d5db",
                  borderRadius: "6px",
                  fontSize: "0.875rem",
                  backgroundColor: "#f9fafb",
                  outline: "none",
                  transition: "border-color 0.2s, background-color 0.2s",
                  boxSizing: "border-box"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#3b82f6";
                  e.target.style.backgroundColor = "white";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#d1d5db";
                  e.target.style.backgroundColor = "#f9fafb";
                }}
              />
            </div>

            {/* Password Fields */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
              <div>
                <label style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  color: "#374151",
                  marginBottom: "0.5rem"
                }}>
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  required
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: errors.password ? "1px solid #ef4444" : "1px solid #d1d5db",
                    borderRadius: "6px",
                    fontSize: "0.875rem",
                    backgroundColor: "#f9fafb",
                    outline: "none",
                    transition: "border-color 0.2s, background-color 0.2s",
                    boxSizing: "border-box"
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#3b82f6";
                    e.target.style.backgroundColor = "white";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = errors.password ? "#ef4444" : "#d1d5db";
                    e.target.style.backgroundColor = "#f9fafb";
                  }}
                />
                {errors.password && (
                  <div style={{ fontSize: "0.75rem", color: "#ef4444", marginTop: "0.25rem" }}>
                    {errors.password}
                  </div>
                )}
              </div>

              <div>
                <label style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  color: "#374151",
                  marginBottom: "0.5rem"
                }}>
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  required
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: errors.confirmPassword ? "1px solid #ef4444" : "1px solid #d1d5db",
                    borderRadius: "6px",
                    fontSize: "0.875rem",
                    backgroundColor: "#f9fafb",
                    outline: "none",
                    transition: "border-color 0.2s, background-color 0.2s",
                    boxSizing: "border-box"
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#3b82f6";
                    e.target.style.backgroundColor = "white";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = errors.confirmPassword ? "#ef4444" : "#d1d5db";
                    e.target.style.backgroundColor = "#f9fafb";
                  }}
                />
                {errors.confirmPassword && (
                  <div style={{ fontSize: "0.75rem", color: "#ef4444", marginTop: "0.25rem" }}>
                    {errors.confirmPassword}
                  </div>
                )}
              </div>
            </div>

            {/* Password Requirements */}
            <div style={{
              fontSize: "0.75rem",
              color: "#6b7280",
              marginBottom: "2rem"
            }}>
              Password must be at least 6 characters long.
            </div>

            {/* Create Account Button */}
            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: "100%",
                background: isLoading ? "#9ca3af" : "#1e40af",
                color: "white",
                padding: "0.875rem",
                border: "none",
                borderRadius: "6px",
                fontSize: "0.875rem",
                fontWeight: "500",
                cursor: isLoading ? "not-allowed" : "pointer",
                transition: "background-color 0.2s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                marginBottom: "1.5rem"
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.target.style.backgroundColor = "#1d4ed8";
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  e.target.style.backgroundColor = "#1e40af";
                }
              }}
            >
              {isLoading ? (
                <>
                  <div style={{
                    width: "16px",
                    height: "16px",
                    border: "2px solid transparent",
                    borderTop: "2px solid white",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite"
                  }}></div>
                  Creating Account...
                </>
              ) : (
                <>
                  <span style={{ fontSize: "0.875rem" }}>⭐</span>
                  Create Account
                </>
              )}
            </button>

            {/* Sign In Link */}
            <div style={{
              textAlign: "center",
              fontSize: "0.875rem",
              color: "#6b7280"
            }}>
              Already have an account?{" "}
              <Link 
                to="/services/saas/login"
                style={{
                  color: "#3b82f6",
                  textDecoration: "none",
                  fontWeight: "500"
                }}
                onMouseEnter={(e) => {
                  e.target.style.textDecoration = "underline";
                }}
                onMouseLeave={(e) => {
                  e.target.style.textDecoration = "none";
                }}
              >
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* CSS Animation for loading spinner */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Register;
