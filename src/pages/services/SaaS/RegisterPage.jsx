import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("customer"); // 'customer' or 'tenant'
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("admin@saasible.com");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = (event) => {
    event.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    console.log({
      role,
      fullName,
      email,
      mobile,
      password,
    });

    alert(
      `Successfully created a ${role} account for ${email}! Redirecting to login...`,
    );
    navigate("/services/saas/login");
  };

  // --- Styles ---
  const styles = {
    pageWrapper: {
      backgroundColor: "#f0f2f5",
      minHeight: "100vh",
    },
    // [+] UPDATED: Style for the main content area below the nav
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      padding: "4rem 2rem", // Added padding for spacing from the nav
    },
    formWrapper: {
      padding: "2.5rem 3rem",
      background: "white",
      borderRadius: "16px",
      boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
      width: "100%",
      maxWidth: "500px",
    },
    header: {
      textAlign: "center",
      marginBottom: "2rem",
    },
    h2: {
      fontSize: "1.75rem",
      fontWeight: "600",
      color: "#1f2937",
      marginBottom: "0.5rem",
    },
    subtitle: {
      fontSize: "1rem",
      color: "#6b7280",
    },
    formGroup: {
      marginBottom: "1.25rem",
    },
    label: {
      display: "block",
      fontWeight: "500",
      color: "#374151",
      marginBottom: "0.5rem",
      fontSize: "0.875rem",
    },
    input: {
      width: "100%",
      padding: "0.75rem 1rem",
      border: "1px solid #D1D5DB",
      borderRadius: "8px",
      fontSize: "1rem",
      boxSizing: "border-box",
      backgroundColor: "#f9fafb",
      transition: "border-color 0.2s, box-shadow 0.2s",
    },
    passwordGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "1rem",
    },
    radioGroup: {
      display: "flex",
      gap: "1.5rem",
      marginBottom: "2rem",
    },
    radioLabel: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      cursor: "pointer",
      fontSize: "0.875rem",
    },
    radioInput: {
      accentColor: "#0d47a1",
    },
    button: {
      width: "100%",
      padding: "0.85rem",
      border: "none",
      borderRadius: "8px",
      background: "#0d47a1",
      color: "white",
      fontSize: "1rem",
      fontWeight: "600",
      cursor: "pointer",
      transition: "background-color 0.2s",
      marginTop: "1.5rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
    },
    signInLink: {
      marginTop: "2rem",
      textAlign: "center",
      fontSize: "0.875rem",
      color: "#6b7280",
    },
    passwordRequirement: {
      fontSize: "0.75rem",
      color: "#6b7280",
      marginTop: "0.5rem",
    },
    errorText: {
      color: "#ef4444",
      fontSize: "0.875rem",
      textAlign: "center",
      marginTop: "1rem",
      minHeight: "1.25rem",
    },
  };

  return (
    <div style={styles.pageWrapper}>
      {/* SaaS Navigation Menu */}
      <nav
        style={{
          background: "white",
          borderBottom: "1px solid #e5e7eb",
          padding: "1rem 2rem",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Link
              to="/services/saas"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                textDecoration: "none",
              }}
            >
              <div
                style={{
                  background: "#3b82f6",
                  color: "white",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  fontWeight: "bold",
                }}
              >
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
                fontWeight: "normal",
              }}
            >
              Home
            </Link>
            <Link
              to="/services/saas"
              style={{
                textDecoration: "none",
                color: "#6b7280",
                fontWeight: "normal",
              }}
            >
              Features
            </Link>
            <Link
              to="/services/saas"
              style={{
                textDecoration: "none",
                color: "#6b7280",
                fontWeight: "normal",
              }}
            >
              Marketplace
            </Link>
            <Link
              to="/services/saas"
              style={{
                textDecoration: "none",
                color: "#6b7280",
                fontWeight: "normal",
              }}
            >
              Pricing
            </Link>
            <Link
              to="/services/saas"
              style={{
                textDecoration: "none",
                color: "#6b7280",
                fontWeight: "normal",
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
                fontWeight: "bold",
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
                fontSize: "0.9rem",
              }}
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Registration Form Content */}
      <div style={styles.container}>
        <div style={styles.formWrapper}>
          <div style={styles.header}>
            <h2 style={styles.h2}>Create your SaaSible Account</h2>
            <p style={styles.subtitle}>
              Join us as a customer or a software vendor.
            </p>
          </div>

          <form onSubmit={handleRegister}>
            <div style={styles.formGroup}>
              <label style={styles.label}>I want to register as a:</label>
              <div style={styles.radioGroup}>
                <label style={styles.radioLabel}>
                  <input
                    type="radio"
                    name="role"
                    value="customer"
                    checked={role === "customer"}
                    onChange={(e) => setRole(e.target.value)}
                    style={styles.radioInput}
                  />
                  Customer (End-User)
                </label>
                <label style={styles.radioLabel}>
                  <input
                    type="radio"
                    name="role"
                    value="tenant"
                    checked={role === "tenant"}
                    onChange={(e) => setRole(e.target.value)}
                    style={styles.radioInput}
                  />
                  Tenant (Software Vendor)
                </label>
              </div>
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="fullName" style={styles.label}>
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                required
                style={styles.input}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="email" style={styles.label}>
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                style={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="mobile" style={styles.label}>
                Mobile Number (Optional)
              </label>
              <input
                type="tel"
                id="mobile"
                style={styles.input}
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>

            <div style={styles.formGroup}>
              <div style={styles.passwordGrid}>
                <div>
                  <label htmlFor="password" style={styles.label}>
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    required
                    style={styles.input}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="confirmPassword" style={styles.label}>
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    required
                    style={styles.input}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
              <p style={styles.passwordRequirement}>
                Password must be at least 6 characters long.
              </p>
            </div>

            {error && <p style={styles.errorText}>{error}</p>}

            <button type="submit" style={styles.button}>
              <span></span> Create Account
            </button>
          </form>

          <div style={styles.signInLink}>
            Already have an account?{" "}
            <Link
              to="/services/saas/login"
              style={{
                color: "#0d47a1",
                fontWeight: "600",
                textDecoration: "none",
              }}
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
