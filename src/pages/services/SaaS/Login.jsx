
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Login attempt:", formData);
      setIsLoading(false);
      // Redirect to admin dashboard on successful login
      window.location.href = "/services/saas/admin";
    }, 1500);
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
            <Link 
              to="/services/saas"
              style={{ 
                textDecoration: "none",
                color: "#6b7280",
                fontWeight: "normal"
              }}
            >
              FAQs
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
              Login
            </Link>
            <Link 
              to="/services/saas/admin"
              style={{
                background: "#3b82f6",
                color: "white",
                padding: "8px 16px",
                borderRadius: "6px",
                textDecoration: "none",
                fontSize: "0.9rem"
              }}
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Login Form Container */}
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
          maxWidth: "400px",
          textAlign: "center"
        }}>
          {/* Logo/Icon */}
          <div style={{
            marginBottom: "2rem"
          }}>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "60px",
              height: "60px",
              background: "#3b82f6",
              borderRadius: "12px",
              marginBottom: "1.5rem"
            }}>
              <span style={{
                fontSize: "2rem",
                color: "white"
              }}>
                📦
              </span>
            </div>
          </div>

          {/* Header */}
          <div style={{
            background: "#3b82f6",
            color: "white",
            padding: "0.75rem 1.5rem",
            borderRadius: "8px",
            marginBottom: "1rem",
            fontSize: "1.125rem",
            fontWeight: "600"
          }}>
            Login to SaaSibly
          </div>

          <p style={{
            color: "#6b7280",
            fontSize: "0.875rem",
            marginBottom: "2rem",
            lineHeight: "1.5"
          }}>
            Enter your credentials to access your dashboard
          </p>

          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "1.5rem", textAlign: "left" }}>
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
                placeholder="you@example.com"
                required
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

            <div style={{ marginBottom: "2rem", textAlign: "left" }}>
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

            {/* Login Button */}
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
                  Logging in...
                </>
              ) : (
                <>
                  <span style={{ fontSize: "0.875rem" }}>→</span>
                  Login
                </>
              )}
            </button>

            {/* Sign Up Link */}
            <div style={{
              textAlign: "center",
              fontSize: "0.875rem",
              color: "#6b7280"
            }}>
              Don't have an account?{" "}
              <Link 
                to="/services/saas/signup"
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
                Sign Up
              </Link>
            </div>
          </form>

          {/* Additional Options */}
          <div style={{
            marginTop: "2rem",
            paddingTop: "1.5rem",
            borderTop: "1px solid #e5e7eb"
          }}>
            <div style={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              fontSize: "0.75rem",
              color: "#6b7280"
            }}>
              <Link 
                to="/services/saas/forgot-password"
                style={{
                  color: "#6b7280",
                  textDecoration: "none"
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = "#3b82f6";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "#6b7280";
                }}
              >
                Forgot Password?
              </Link>
              <span>•</span>
              <Link 
                to="/services/saas"
                style={{
                  color: "#6b7280",
                  textDecoration: "none"
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = "#3b82f6";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "#6b7280";
                }}
              >
                Back to Home
              </Link>
            </div>
          </div>

          {/* Demo Credentials */}
          <div style={{
            marginTop: "1.5rem",
            padding: "1rem",
            background: "#f8fafc",
            borderRadius: "6px",
            border: "1px solid #e2e8f0"
          }}>
            <div style={{
              fontSize: "0.75rem",
              color: "#64748b",
              marginBottom: "0.5rem",
              fontWeight: "500"
            }}>
              Demo Credentials:
            </div>
            <div style={{
              fontSize: "0.75rem",
              color: "#475569",
              lineHeight: "1.4"
            }}>
              Email: admin@saasibly.com<br/>
              Password: demo123
            </div>
          </div>
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

export default Login;
