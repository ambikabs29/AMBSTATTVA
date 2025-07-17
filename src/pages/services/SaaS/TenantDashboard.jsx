import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const TenantDashboard = () => {
  const [isTenant, setIsTenant] = useState(true);
  const [activeSection, setActiveSection] = useState("dashboard"); // Default to dashboard
  const [isActivityExpanded, setActivityExpanded] = useState(false);
  const [userCurrency, setUserCurrency] = useState({
    code: "USD",
    symbol: "$",
    rate: 1,
  });

  const [user, setUser] = useState({
    name: "Tenant",
    displayName: "saasibly",
    email: "tenant@saasible.com",
    avatar: "T", // Using a more descriptive initial
  });

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      setIsTenant(false);
    }
  };

  // Currency utility functions
  const convertPrice = (usdPrice) => {
    const convertedPrice = usdPrice * userCurrency.rate;
    // For currencies that don't use decimals
    if (["JPY", "KRW", "VND", "IDR"].includes(userCurrency.code)) {
      return Math.round(convertedPrice);
    }
    return convertedPrice.toFixed(2);
  };

  const formatCurrency = (usdPrice) => {
    return `${userCurrency.symbol}${convertPrice(usdPrice)}`;
  };

  // Effects
  useEffect(() => {
    const detectUserCurrency = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        const locationData = await response.json();
        const currencyMap = {
          US: { code: "USD", symbol: "$", rate: 1 },
          GB: { code: "GBP", symbol: "£", rate: 0.79 },
          CA: { code: "CAD", symbol: "C$", rate: 1.35 },
          AU: { code: "AUD", symbol: "A$", rate: 1.45 },
          DE: { code: "EUR", symbol: "€", rate: 0.92 },
          IN: { code: "INR", symbol: "₹", rate: 83.5 },
          JP: { code: "JPY", symbol: "¥", rate: 157 },
        };
        const currency = currencyMap[locationData.country_code] || {
          code: "USD",
          symbol: "$",
          rate: 1,
        };
        setUserCurrency(currency);
      } catch (error) {
        console.log("Could not detect location, using USD as default");
        setUserCurrency({ code: "USD", symbol: "$", rate: 1 });
      }
    };
    detectUserCurrency();
  }, []);

  useEffect(() => {
    setIsTenant(true); 
  }, []);

  if (!isTenant) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Access Denied</h2>
        <p>You do not have permission to access the Tenant Portal.</p>
        <Link to="/login">Go to Login</Link>
      </div>
    );
  }

  // --- Styles Definition ---
  const styles = {
    pageContainer: {
      display: "flex",
      height: "100vh",
      backgroundColor: "#ffffff",
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    },
    sidebar: {
      width: "260px",
      backgroundColor: "#1e293b",
      color: "#e5e7eb",
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      position: "fixed",
    },
    sidebarHeader: {
      padding: "1.5rem",
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      borderBottom: "1px solid #334155",
      flexShrink: 0,
    },
    portalTitle: {
      fontSize: "1.25rem",
      fontWeight: "600",
    },
    nav: {
      flex: 1,
      padding: "1rem",
      overflowY: "auto",
    },
    menuItem: {
      display: "flex",
      alignItems: "center",
      gap: "0.85rem",
      padding: "0.75rem 1rem",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "0.875rem",
      color: "#cbd5e1",
      transition: "background-color 0.2s, color 0.2s",
      marginBottom: '0.25rem',
    },
    activeMenuItem: {
      backgroundColor: "#06b6d4",
      color: "#ffffff",
      fontWeight: "500",
    },
    subMenuContainer: {
      marginLeft: "1.5rem",
      paddingLeft: "1.25rem",
      borderLeft: "1px solid #4b5563",
      marginTop: "0.5rem",
      marginBottom: "0.5rem",
    },
    subMenuItem: {
      padding: "0.5rem",
      fontSize: "0.875rem",
      cursor: "pointer",
      color: "#9ca3af",
      borderRadius: "6px",
      display: 'block',
    },
    sidebarFooter: {
      padding: "1rem",
      borderTop: "1px solid #334155",
      flexShrink: 0,
    },
    helpSection: {
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      padding: "0.5rem 1rem",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "0.875rem",
      color: "#cbd5e1",
    },
    userProfile: {
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      padding: "0.5rem",
      backgroundColor: "#334155",
      borderRadius: "8px",
      marginTop: "1rem",
    },
    avatar: {
      width: "32px",
      height: "32px",
      borderRadius: "50%",
      backgroundColor: "#4f46e5",
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "bold",
      flexShrink: 0,
    },
    logoutButton: {
      marginLeft: "auto",
      cursor: "pointer",
      padding: "0.5rem",
      border: "none",
      background: "transparent",
      color: "#9ca3af",
      fontSize: "1.5rem",
    },
    mainContent: {
      flex: 1,
      padding: "2.5rem",
      overflowY: "auto",
      backgroundColor: "#f9fafb",
      marginLeft: '260px',
    },
    pageHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "2rem",
    },
    pageTitle: {
      fontSize: "1.875rem",
      fontWeight: "bold",
      color: "#1f2937",
    },
    pageSubtitle: {
      color: "#6b7280",
      marginTop: "0.25rem",
    },
    addButton: {
      backgroundColor: "#1f293b",
      color: "white",
      border: "none",
      padding: "0.75rem 1.25rem",
      borderRadius: "8px",
      fontWeight: "500",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      fontSize: "0.875rem",
    },
    tableContainer: {
      backgroundColor: "white",
      borderRadius: "12px",
      padding: "0.5rem 1.5rem 1.5rem 1.5rem",
      border: "1px solid #e5e7eb",
      boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
    },
    tableGrid: {
      display: "grid",
      alignItems: "center",
      gap: "1rem",
    },
    tableHeader: {
      color: "#6b7280",
      fontSize: "0.75rem",
      fontWeight: "500",
      padding: "1rem 0",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
    },
    tableRow: {
      borderTop: "1px solid #e5e7eb",
    },
    tableCell: {
      padding: "1.5rem 0",
      fontSize: "0.875rem",
      color: "#1f2937",
    },
    statusBadge: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.375rem",
      padding: "0.25rem 0.75rem",
      borderRadius: "9999px",
      fontWeight: "500",
      fontSize: "0.75rem",
    },
    statusApproved: {
      backgroundColor: "#dcfce7",
      color: "#166534",
    },
    statusActive: {
      backgroundColor: "#dcfce7",
      color: "#166534",
    },
    statusCanceled: {
      backgroundColor: "#fee2e2",
      color: "#991b1b",
    },
    cardsContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))",
      gap: "2rem",
    },
    card: {
      backgroundColor: "white",
      borderRadius: "12px",
      padding: "1.5rem",
      border: "1px solid #e5e7eb",
      boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
    },
    cardHeader: {
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      fontSize: "1rem",
      fontWeight: "600",
      color: "#1f2937",
      marginBottom: "0.5rem",
    },
    subscriptionPlan: {
      fontSize: "1.75rem",
      fontWeight: "600",
      color: "#111827",
      margin: "1.5rem 0 0.5rem 0",
    },
    renewalDate: {
      fontSize: "0.875rem",
      color: "#6b7280",
      marginBottom: "1.5rem",
    },
    manageButton: {
      backgroundColor: "#f3f4f6",
      color: "#374151",
      border: "1px solid #d1d5db",
      padding: "0.5rem 1rem",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "0.875rem",
      fontWeight: "500",
    },
    notificationsSubtitle: {
      color: "#6b7280",
      fontSize: "0.875rem",
      marginBottom: "1.5rem",
    },
    notificationItem: {
      display: "flex",
      gap: "1rem",
      padding: "1rem",
      borderRadius: "8px",
      marginBottom: "1rem",
    },
    billingReminder: {
      border: "1px solid #fecaca",
      backgroundColor: "#fef2f2",
    },
    featureUpdate: {
      border: "1px solid #e5e7eb",
      backgroundColor: "#f9fafb",
    },
    notificationIcon: {
      fontSize: "1.25rem",
      marginTop: "0.125rem",
    },
    notificationTitle: {
      fontWeight: "600",
      marginBottom: "0.25rem",
    },
    notificationText: {
      fontSize: "0.875rem",
      margin: 0,
      lineHeight: "1.5",
    },
    emptyStateContainer: {
      backgroundColor: "white",
      borderRadius: "12px",
      border: "1px solid #e5e7eb",
      textAlign: "center",
      padding: "3rem 2rem",
      marginTop: "0.5rem",
    },
    emptyStateText: {
      color: "#6b7280",
      fontSize: "0.875rem",
      lineHeight: "1.5",
      margin: 0,
    },
    formGroup: {
        marginBottom: '1.5rem',
    },
    formLabel: {
        display: 'block',
        fontWeight: '500',
        color: '#374151',
        marginBottom: '0.5rem',
        fontSize: '0.875rem'
    },
    formInput: {
        width: '100%',
        padding: '0.75rem',
        border: '1px solid #d1d5db',
        borderRadius: '8px',
        fontSize: '0.875rem'
    },
    formCheckbox: {
        marginRight: '0.5rem'
    },
  };

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "🎛️" },
    { id: "manage-software", label: "Manage My Software", icon: "📦" },
    { id: "offering-plans", label: "Manage Offering Plans", icon: "≡" },
    { id: "marketplace", label: "Marketplace", icon: "🛒" },
    { id: "subscriber-list", label: "Subscriber List", icon: "👥" },
    { id: "platform-plan", label: "My Platform Plan", icon: "🧾" },
    { id: "billing-history", label: "Billing History", icon: "💵" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ];

  const activitySubMenu = [
    { id: "my-subscriptions", label: "My Subscriptions" },
    { id: "my-billing", label: "My Billing" },
    { id: "my-profile", label: "My Profile" },
  ];

  const renderDashboardPage = () => (
    <>
      <h1 style={styles.pageTitle}>Tenant Dashboard</h1>
      <p style={styles.pageSubtitle}>Welcome, {user.displayName}!</p>
      <div style={styles.cardsContainer}>
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <span style={{ color: "#4f46e5", fontSize: "1.25rem" }}>❒</span>{" "}
            Current Subscription
          </div>
          <h2 style={styles.subscriptionPlan}>Premium Plan</h2>
          <p style={styles.renewalDate}>Renews on: June 9th, 2025</p>
          <button style={styles.manageButton}>Manage Subscription</button>
        </div>
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <span style={{ color: "#4f46e5", fontSize: "1.25rem" }}>🔔</span>{" "}
            Notifications
          </div>
          <p style={styles.notificationsSubtitle}>
            Important updates and reminders.
          </p>
          <div>
            <div
              style={{ ...styles.notificationItem, ...styles.billingReminder }}
            >
              <span style={{ ...styles.notificationIcon, color: "#ef4444" }}>
                ⚠️
              </span>
              <div>
                <div style={{ ...styles.notificationTitle, color: "#b91c1c" }}>
                  Billing Reminder
                </div>
                <p style={{ ...styles.notificationText, color: "#7f1d1d" }}>
                  Your subscription renews in 7 days. Ensure your payment method
                  is up to date. - Jul 16, 2025, 11:29 AM
                </p>
              </div>
            </div>
            <div
              style={{ ...styles.notificationItem, ...styles.featureUpdate }}
            >
              <span style={{ ...styles.notificationIcon, color: "#3b82f6" }}>
                ℹ️
              </span>
              <div>
                <div style={{ ...styles.notificationTitle, color: "#1f2937" }}>
                  New Feature: AI Insights
                </div>
                <p style={{ ...styles.notificationText, color: "#4b5563" }}>
                  Explore the new AI-powered insights module in Project Alpha. -
                  Jul 14, 2025, 11:29 AM
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const renderManageSoftwarePage = () => {
    const softwareData = [
      {
        img: "https://img.icons8.com/fluency-systems-filled/48/workstation.png",
        title: "cm",
        status: "Approved",
        version: "...",
        actions: "...",
      },
    ];
    return (
      <>
        <div style={styles.pageHeader}>
          <div>
            <h1 style={styles.pageTitle}>Tenant Portal - My Software</h1>
            <p style={styles.pageSubtitle}>
              Manage your software submissions for the saasibly marketplace.
            </p>
          </div>
          <button style={styles.addButton}>
            <span style={{ fontSize: "1.25rem" }}>+</span> Add My Software
          </button>
        </div>
        <div style={styles.tableContainer}>
          <div style={{ ...styles.tableGrid, borderTop: "none", gridTemplateColumns: '0.5fr 2fr 1fr 1fr 1fr' }}>
            <div style={styles.tableHeader}>Image</div>
            <div style={styles.tableHeader}>Title</div>
            <div style={styles.tableHeader}>Status</div>
            <div style={styles.tableHeader}>Version</div>
            <div style={styles.tableHeader}>Actions</div>
          </div>
          {softwareData.map((item, index) => (
            <div
              key={index}
              style={{ ...styles.tableGrid, ...styles.tableRow, gridTemplateColumns: '0.5fr 2fr 1fr 1fr 1fr' }}
            >
              <div style={styles.tableCell}>
                <img
                  src={item.img}
                  alt={item.title}
                  style={{ width: "24px", height: "24px" }}
                />
              </div>
              <div style={styles.tableCell}>{item.title}</div>
              <div style={styles.tableCell}>
                <span style={{...styles.statusBadge, ...styles.statusApproved}}>✓ Approved</span>
              </div>
              <div style={styles.tableCell}>{item.version}</div>
              <div
                style={{
                  ...styles.tableCell,
                  fontWeight: "bold",
                  letterSpacing: "0.1em",
                  cursor: "pointer",
                }}
              >
                {item.actions}
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };

  const renderOfferingPlansPage = () => (
    <>
      <div style={styles.pageHeader}>
        <div>
          <h1 style={styles.pageTitle}>My Offering Plans</h1>
          <p style={styles.pageSubtitle}>
            Manage the offering plans for your software on the SaaSible
            marketplace.
          </p>
        </div>
        <button style={styles.addButton}>
          <span style={{ fontSize: "1.25rem" }}>+</span> Create New Offering
          Plan
        </button>
      </div>
      <div style={styles.emptyStateContainer}>
        <p style={styles.emptyStateText}>
          No offering plans found for your software. Click "Create New Offering
          Plan" to get started.
          <br />
          Ensure you have added software to the marketplace first via "Manage My
          Software".
        </p>
      </div>
    </>
  );

  const renderMarketplacePage = () => {
    return (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2rem",
          }}
        >
          <div>
            <h2
              style={{
                fontSize: "2rem",
                fontWeight: "600",
                color: "#1f2937",
                marginBottom: "0.5rem",
              }}
            >
              Software Marketplace
            </h2>
            <p style={{ color: "#6b7280" }}>
              Discover and subscribe to powerful software applications for your
              business.
            </p>
          </div>
          <div style={{ display: "flex", gap: "1rem" }}>
            <button
              style={{
                background: "#8b5cf6",
                color: "white",
                border: "none",
                padding: "0.75rem 1.5rem",
                borderRadius: "8px",
                fontSize: "0.875rem",
                fontWeight: "500",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
              onClick={() => alert("Request new software feature")}
            >
              <span>💡</span>
              Request Software
            </button>
            <button
              style={{
                background: "#3b82f6",
                color: "white",
                border: "none",
                padding: "0.75rem 1.5rem",
                borderRadius: "8px",
                fontSize: "0.875rem",
                fontWeight: "500",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
              onClick={() => setActiveSection("my-subscriptions")}
            >
              <span>👤</span>
              My Subscriptions
            </button>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div
          style={{
            background: "white",
            padding: "1.5rem",
            borderRadius: "12px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            border: "1px solid #e5e7eb",
            marginBottom: "2rem",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "1rem",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <div style={{ position: "relative", flex: "1", minWidth: "300px" }}>
              <input
                type="text"
                placeholder="Search software by name, category, or features..."
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem 0.75rem 2.5rem",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                  fontSize: "0.875rem",
                  background: "white",
                  outline: "none",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: "0.75rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#9ca3af",
                  fontSize: "1rem",
                }}
              >
                🔍
              </div>
            </div>

            <select
              style={{
                padding: "0.75rem 1rem",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                fontSize: "0.875rem",
                background: "white",
                color: "#6b7280",
                minWidth: "140px",
              }}
            >
              <option>All Categories</option>
              <option>Featured</option>
              <option>Productivity</option>
              <option>Communication</option>
              <option>Analytics</option>
              <option>E-commerce</option>
              <option>Marketing</option>
              <option>Design Tools</option>
            </select>

            <select
              style={{
                padding: "0.75rem 1rem",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                fontSize: "0.875rem",
                background: "white",
                color: "#6b7280",
                minWidth: "120px",
              }}
            >
              <option>All Pricing</option>
              <option>Free</option>
              <option>Freemium</option>
              <option>Paid</option>
              <option>Enterprise</option>
            </select>

            <select
              style={{
                padding: "0.75rem 1rem",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                fontSize: "0.875rem",
                background: "white",
                color: "#6b7280",
                minWidth: "120px",
              }}
            >
              <option>Sort by Popularity</option>
              <option>Recently Added</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Best Rated</option>
            </select>
          </div>
        </div>

        {/* Featured Software Banner */}
        <div
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            borderRadius: "12px",
            padding: "2rem",
            marginBottom: "2rem",
            color: "white",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{ position: "relative", zIndex: 2 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "1rem",
              }}
            >
              <span style={{ fontSize: "1.5rem" }}>⭐</span>
              <span
                style={{
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  background: "rgba(255,255,255,0.2)",
                  padding: "0.25rem 0.75rem",
                  borderRadius: "20px",
                }}
              >
                FEATURED
              </span>
            </div>
            <h3
              style={{
                fontSize: "1.75rem",
                fontWeight: "600",
                marginBottom: "0.5rem",
              }}
            >
              CMS Pro - Content Management System
            </h3>
            <p
              style={{
                fontSize: "1rem",
                opacity: "0.9",
                marginBottom: "1.5rem",
                maxWidth: "500px",
              }}
            >
              Complete content management solution with advanced features,
              multi-user support, and powerful publishing tools.
            </p>
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <button
                style={{
                  background: "white",
                  color: "#667eea",
                  border: "none",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "8px",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
                onClick={() => alert("Start 14-day free trial for CMS Pro")}
              >
                Start Free Trial
              </button>
              <span style={{ fontSize: "1.25rem", fontWeight: "600" }}>
                {formatCurrency(20.0)}/month after trial
              </span>
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              right: "-20px",
              top: "-20px",
              width: "200px",
              height: "200px",
              background: "rgba(255,255,255,0.1)",
              borderRadius: "50%",
            }}
          ></div>
        </div>

        {/* Software Categories */}
        <div style={{ marginBottom: "2rem" }}>
          <h3
            style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              color: "#1f2937",
              marginBottom: "1rem",
            }}
          >
            Browse by Category
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1rem",
            }}
          >
            {[
              { name: "Productivity", icon: "⚡", count: 8, color: "#3b82f6" },
              { name: "Communication", icon: "💬", count: 6, color: "#10b981" },
              { name: "Analytics", icon: "📊", count: 5, color: "#8b5cf6" },
              { name: "E-commerce", icon: "🛒", count: 7, color: "#f59e0b" },
              { name: "Marketing", icon: "📢", count: 9, color: "#ef4444" },
              { name: "Design Tools", icon: "🎨", count: 4, color: "#06b6d4" },
            ].map((category, index) => (
              <div
                key={index}
                style={{
                  background: "white",
                  border: `2px solid ${category.color}`,
                  borderRadius: "8px",
                  padding: "1rem",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  textAlign: "center",
                }}
                onClick={() => alert(`Browse ${category.name} category`)}
                onMouseEnter={(e) => {
                  e.target.style.background = category.color;
                  e.target.style.color = "white";
                  e.target.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "white";
                  e.target.style.color = "#1f2937";
                  e.target.style.transform = "translateY(0px)";
                }}
              >
                <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
                  {category.icon}
                </div>
                <div
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    marginBottom: "0.25rem",
                  }}
                >
                  {category.name}
                </div>
                <div style={{ fontSize: "0.75rem", opacity: "0.7" }}>
                  {category.count} apps
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Software Grid */}
        <div style={{ marginBottom: "2rem" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1.5rem",
            }}
          >
            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: "600",
                color: "#1f2937",
              }}
            >
              Available Software
            </h3>
            <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>
              Showing 8 of 24 applications
            </span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {/* CMS Software Card */}
            <div
              style={{
                background: "white",
                borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                border: "1px solid #e5e7eb",
                overflow: "hidden",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0px)";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
              }}
            >
              <div style={{ padding: "1.5rem" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    marginBottom: "1rem",
                  }}
                >
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      background: "#f3f4f6",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "2rem",
                      border: "1px solid #e5e7eb",
                    }}
                  >
                    📝
                  </div>
                  <div>
                    <h4
                      style={{
                        fontSize: "1.125rem",
                        fontWeight: "600",
                        color: "#1f2937",
                        marginBottom: "0.25rem",
                      }}
                    >
                      CMS Pro
                    </h4>
                    <p style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                      by AmbaApps
                    </p>
                  </div>
                </div>

                <p
                  style={{
                    color: "#6b7280",
                    fontSize: "0.875rem",
                    marginBottom: "1rem",
                    lineHeight: "1.5",
                  }}
                >
                  Advanced content management system with drag-and-drop editor,
                  multi-user collaboration, and powerful SEO tools.
                </p>

                <div
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                    marginBottom: "1rem",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      background: "#fef3c7",
                      color: "#92400e",
                      padding: "0.25rem 0.5rem",
                      borderRadius: "4px",
                      fontSize: "0.75rem",
                    }}
                  >
                    Featured
                  </span>
                  <span
                    style={{
                      background: "#e0e7ff",
                      color: "#3730a3",
                      padding: "0.25rem 0.5rem",
                      borderRadius: "4px",
                      fontSize: "0.75rem",
                    }}
                  >
                    Content Management
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "1rem",
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: "600",
                        color: "#1f2937",
                      }}
                    >
                      {formatCurrency(20.0)}
                    </span>
                    <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>
                      /month
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.25rem",
                    }}
                  >
                    <span style={{ color: "#fbbf24" }}>★★★★★</span>
                    <span style={{ color: "#6b7280", fontSize: "0.75rem" }}>
                      (4.8)
                    </span>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "0.75rem" }}>
                  <button
                    style={{
                      flex: 1,
                      background: "#3b82f6",
                      color: "white",
                      border: "none",
                      padding: "0.75rem",
                      borderRadius: "6px",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      cursor: "pointer",
                    }}
                    onClick={() => alert("Subscribe to CMS Pro")}
                  >
                    Start Free Trial
                  </button>
                  <button
                    style={{
                      background: "transparent",
                      color: "#6b7280",
                      border: "1px solid #d1d5db",
                      padding: "0.75rem",
                      borderRadius: "6px",
                      fontSize: "0.875rem",
                      cursor: "pointer",
                    }}
                    onClick={() => alert("View CMS Pro details")}
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>

            {/* TaskMaster Pro */}
            <div
              style={{
                background: "white",
                borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                border: "1px solid #e5e7eb",
                overflow: "hidden",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0px)";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
              }}
            >
              <div style={{ padding: "1.5rem" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    marginBottom: "1rem",
                  }}
                >
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      background: "#f3f4f6",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "2rem",
                      border: "1px solid #e5e7eb",
                    }}
                  >
                    ✅
                  </div>
                  <div>
                    <h4
                      style={{
                        fontSize: "1.125rem",
                        fontWeight: "600",
                        color: "#1f2937",
                        marginBottom: "0.25rem",
                      }}
                    >
                      TaskMaster Pro
                    </h4>
                    <p style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                      by TechCorp
                    </p>
                  </div>
                </div>

                <p
                  style={{
                    color: "#6b7280",
                    fontSize: "0.875rem",
                    marginBottom: "1rem",
                    lineHeight: "1.5",
                  }}
                >
                  Advanced task management with AI-powered scheduling, team
                  collaboration, and comprehensive analytics.
                </p>

                <div
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                    marginBottom: "1rem",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      background: "#dcfce7",
                      color: "#166534",
                      padding: "0.25rem 0.5rem",
                      borderRadius: "4px",
                      fontSize: "0.75rem",
                    }}
                  >
                    Productivity
                  </span>
                  <span
                    style={{
                      background: "#fef3c7",
                      color: "#92400e",
                      padding: "0.25rem 0.5rem",
                      borderRadius: "4px",
                      fontSize: "0.75rem",
                    }}
                  >
                    AI-Powered
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "1rem",
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: "600",
                        color: "#1f2937",
                      }}
                    >
                      {formatCurrency(29.99)}
                    </span>
                    <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>
                      /month
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.25rem",
                    }}
                  >
                    <span style={{ color: "#fbbf24" }}>★★★★☆</span>
                    <span style={{ color: "#6b7280", fontSize: "0.75rem" }}>
                      (4.6)
                    </span>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "0.75rem" }}>
                  <button
                    style={{
                      flex: 1,
                      background: "#10b981",
                      color: "white",
                      border: "none",
                      padding: "0.75rem",
                      borderRadius: "6px",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      cursor: "pointer",
                    }}
                    onClick={() => alert("Subscribe to TaskMaster Pro")}
                  >
                    Subscribe Now
                  </button>
                  <button
                    style={{
                      background: "transparent",
                      color: "#6b7280",
                      border: "1px solid #d1d5db",
                      padding: "0.75rem",
                      borderRadius: "6px",
                      fontSize: "0.875rem",
                      cursor: "pointer",
                    }}
                    onClick={() => alert("View TaskMaster Pro details")}
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>

            {/* ... other software cards from the file can be added here following the same pattern */}

          </div>
        </div>

        {/* Load More Button */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <button
            style={{
              background: "white",
              color: "#3b82f6",
              border: "2px solid #3b82f6",
              padding: "0.75rem 2rem",
              borderRadius: "8px",
              fontSize: "0.875rem",
              fontWeight: "500",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onClick={() => alert("Load more software applications")}
            onMouseEnter={(e) => {
              e.target.style.background = "#3b82f6";
              e.target.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "white";
              e.target.style.color = "#3b82f6";
            }}
          >
            Load More Software
          </button>
        </div>
      </>
    );
  };

  const renderSubscriberListPage = () => {
    const subscribers = [
        { name: 'Alice Johnson', email: 'alice@example.com', plan: 'CMS Pro - Premium', date: '2025-06-15', status: 'Active' },
        { name: 'Bob Williams', email: 'bob@example.com', plan: 'CMS Pro - Basic', date: '2025-05-20', status: 'Active' },
        { name: 'Charlie Brown', email: 'charlie@example.com', plan: 'CMS Pro - Premium', date: '2025-03-10', status: 'Canceled' },
    ];
    return (
        <>
            <div style={styles.pageHeader}>
                <div>
                    <h1 style={styles.pageTitle}>Subscriber List</h1>
                    <p style={styles.pageSubtitle}>View and manage your software subscribers.</p>
                </div>
            </div>
            <div style={styles.tableContainer}>
                <div style={{...styles.tableGrid, gridTemplateColumns: '2fr 2fr 1fr 1.5fr 1fr'}}>
                    <div style={styles.tableHeader}>Subscriber</div>
                    <div style={styles.tableHeader}>Plan Subscribed</div>
                    <div style={styles.tableHeader}>Status</div>
                    <div style={styles.tableHeader}>Subscription Date</div>
                    <div style={styles.tableHeader}>Actions</div>
                </div>
                {subscribers.map((sub, index) => (
                    <div key={index} style={{...styles.tableGrid, ...styles.tableRow, gridTemplateColumns: '2fr 2fr 1fr 1.5fr 1fr'}}>
                        <div style={styles.tableCell}>
                            <div style={{fontWeight: '500'}}>{sub.name}</div>
                            <div style={{color: '#6b7280', fontSize: '0.75rem'}}>{sub.email}</div>
                        </div>
                        <div style={styles.tableCell}>{sub.plan}</div>
                        <div style={styles.tableCell}>
                            <span style={{...styles.statusBadge, ...(sub.status === 'Active' ? styles.statusActive : styles.statusCanceled)}}>
                                {sub.status}
                            </span>
                        </div>
                        <div style={styles.tableCell}>{sub.date}</div>
                        <div style={{...styles.tableCell, cursor: 'pointer', color: '#3b82f6', fontWeight: '500'}}>View Details</div>
                    </div>
                ))}
            </div>
        </>
    );
  };

  const renderPlatformPlanPage = () => (
    <>
        <div style={styles.pageHeader}>
            <div>
                <h1 style={styles.pageTitle}>My Platform Plan</h1>
                <p style={styles.pageSubtitle}>Manage your Saasibly tenant subscription.</p>
            </div>
        </div>
        <div style={styles.cardsContainer}>
            <div style={styles.card}>
                <h2 style={{...styles.cardHeader, paddingBottom: '1rem', borderBottom: '1px solid #e5e7eb'}}>Current Plan</h2>
                <div style={styles.subscriptionPlan}>Pro Tenant Plan</div>
                <div style={{fontSize: '1.25rem', fontWeight: '500', color: '#1f2937', marginBottom: '0.5rem'}}>{formatCurrency(49)} / month</div>
                <p style={styles.renewalDate}>Your plan renews on August 1, 2025.</p>

                <h3 style={{fontWeight: 600, fontSize: '1rem', marginBottom: '1rem'}}>Plan Features:</h3>
                <ul style={{listStyle: 'none', padding: 0, margin: 0, color: '#4b5563'}}>
                    <li style={{marginBottom: '0.75rem'}}>✓ Up to 10 software listings</li>
                    <li style={{marginBottom: '0.75rem'}}>✓ 5% transaction fee on sales</li>
                    <li style={{marginBottom: '0.75rem'}}>✓ Advanced analytics for your listings</li>
                    <li style={{marginBottom: '0.75rem'}}>✓ Priority email support</li>
                </ul>

                <div style={{marginTop: '2rem'}}>
                    <button style={styles.manageButton} onClick={() => alert('Logic to change plan')}>Change Plan</button>
                    <button style={{...styles.manageButton, color: '#b91c1c', marginLeft: '1rem'}} onClick={() => alert('Logic to cancel plan')}>Cancel Subscription</button>
                </div>
            </div>
             <div style={styles.card}>
                <h2 style={{...styles.cardHeader, paddingBottom: '1rem', borderBottom: '1px solid #e5e7eb'}}>Available Plans</h2>
                <div style={{marginTop: '1.5rem'}}>
                    <h3 style={{fontWeight: 600, color: '#1f2937'}}>Basic Tenant Plan</h3>
                    <p style={{color: '#6b7280', margin: '0.5rem 0'}}>Free - Up to 1 software listing, 10% transaction fee.</p>
                     <button style={{...styles.manageButton, background: '#dcfce7', borderColor: '#166534', color: '#166534'}} onClick={() => alert('Downgrade to Basic')}>Switch to Basic</button>
                </div>
                 <div style={{marginTop: '1.5rem'}}>
                    <h3 style={{fontWeight: 600, color: '#1f2937'}}>Enterprise Tenant Plan</h3>
                    <p style={{color: '#6b7280', margin: '0.5rem 0'}}>{formatCurrency(199)}/month - Unlimited listings, 2% transaction fee, dedicated support.</p>
                     <button style={{...styles.manageButton, background: '#e0e7ff', borderColor: '#4338ca', color: '#4338ca'}} onClick={() => alert('Upgrade to Enterprise')}>Upgrade to Enterprise</button>
                </div>
            </div>
        </div>
    </>
  );

  const renderBillingHistoryPage = () => {
    const invoices = [
        { id: 'INV-2025-003', date: 'July 1, 2025', amount: 49.00, status: 'Paid' },
        { id: 'INV-2025-002', date: 'June 1, 2025', amount: 49.00, status: 'Paid' },
        { id: 'INV-2025-001', date: 'May 1, 2025', amount: 49.00, status: 'Paid' },
    ];
    return (
        <>
            <div style={styles.pageHeader}>
                <div>
                    <h1 style={styles.pageTitle}>Billing History</h1>
                    <p style={styles.pageSubtitle}>Review and download your invoices for the Saasibly platform.</p>
                </div>
            </div>
            <div style={styles.tableContainer}>
                <div style={{...styles.tableGrid, gridTemplateColumns: '1.5fr 1.5fr 1fr 1fr 1fr'}}>
                    <div style={styles.tableHeader}>Invoice ID</div>
                    <div style={styles.tableHeader}>Date</div>
                    <div style={styles.tableHeader}>Amount</div>
                    <div style={styles.tableHeader}>Status</div>
                    <div style={styles.tableHeader}>Action</div>
                </div>
                {invoices.map((invoice) => (
                    <div key={invoice.id} style={{...styles.tableGrid, ...styles.tableRow, gridTemplateColumns: '1.5fr 1.5fr 1fr 1fr 1fr'}}>
                        <div style={styles.tableCell}>{invoice.id}</div>
                        <div style={styles.tableCell}>{invoice.date}</div>
                        <div style={styles.tableCell}>{formatCurrency(invoice.amount)}</div>
                        <div style={styles.tableCell}><span style={{...styles.statusBadge, ...styles.statusActive}}>{invoice.status}</span></div>
                        <div style={styles.tableCell}><button style={styles.manageButton} onClick={() => alert(`Downloading ${invoice.id}`)}>Download</button></div>
                    </div>
                ))}
            </div>
        </>
    );
  };

  const renderSettingsPage = () => (
    <>
      <div style={styles.pageHeader}>
        <div>
          <h1 style={styles.pageTitle}>Settings</h1>
          <p style={styles.pageSubtitle}>Manage your account, profile, and notification preferences.</p>
        </div>
      </div>
      <div style={styles.card}>
        <h2 style={styles.cardHeader}>Account Information</h2>
        <div style={styles.formGroup}>
            <label style={styles.formLabel}>Avatar</label>
            <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                <div style={{...styles.avatar, width: '64px', height: '64px', fontSize: '2rem'}}>{user.avatar}</div>
                <input type="file" id="avatar-upload" style={{display: 'none'}} />
                <label htmlFor="avatar-upload" style={{...styles.manageButton, cursor: 'pointer'}}>
                    Upload New Avatar
                </label>
            </div>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.formLabel} htmlFor="displayName">Display Name</label>
          <input style={styles.formInput} type="text" id="displayName" defaultValue={user.displayName} />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.formLabel} htmlFor="email">Email Address</label>
          <input style={styles.formInput} type="email" id="email" defaultValue={user.email} />
        </div>
        <button style={styles.addButton} onClick={() => alert("Account information saved!")}>Save Changes</button>
      </div>

      <div style={{...styles.card, marginTop: '2rem'}}>
        <h2 style={styles.cardHeader}>Change Password</h2>
        <div style={styles.formGroup}>
          <label style={styles.formLabel} htmlFor="currentPassword">Current Password</label>
          <input style={styles.formInput} type="password" id="currentPassword" />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.formLabel} htmlFor="newPassword">New Password</label>
          <input style={styles.formInput} type="password" id="newPassword" />
        </div>
        <button style={styles.addButton} onClick={() => alert("Password updated!")}>Update Password</button>
      </div>

      <div style={{...styles.card, marginTop: '2rem'}}>
        <h2 style={styles.cardHeader}>Notification Settings</h2>
        <div style={styles.formGroup}>
            <label style={{color: '#4b5563', display: 'flex', alignItems: 'center'}}>
                <input style={styles.formCheckbox} type="checkbox" defaultChecked />
                Email me when I get a new subscriber.
            </label>
        </div>
         <div style={styles.formGroup}>
            <label style={{color: '#4b5563', display: 'flex', alignItems: 'center'}}>
                <input style={styles.formCheckbox} type="checkbox" defaultChecked />
                Send me a monthly revenue summary.
            </label>
        </div>
         <div style={styles.formGroup}>
            <label style={{color: '#4b5563', display: 'flex', alignItems: 'center'}}>
                <input style={styles.formCheckbox} type="checkbox" />
                Notify me about new marketplace features for tenants.
            </label>
        </div>
        <button style={styles.addButton} onClick={() => alert("Notification settings saved!")}>Save Notifications</button>
      </div>
    </>
  );

  const renderMySubscriptionsPage = () => (
     <>
      <div style={styles.pageHeader}>
        <div>
          <h1 style={styles.pageTitle}>My Software Subscriptions</h1>
          <p style={styles.pageSubtitle}>Software you are subscribed to on the Saasibly marketplace.</p>
        </div>
      </div>
      <div style={styles.cardsContainer}>
        <div style={styles.card}>
          <div style={styles.cardHeader}>TaskMaster Pro</div>
          <h2 style={styles.subscriptionPlan}>Team Plan</h2>
          <p style={styles.renewalDate}>Renews on: August 12, 2025</p>
          <button style={styles.manageButton} onClick={() => alert('Manage TaskMaster Pro')}>Manage Subscription</button>
        </div>
         <div style={styles.card}>
          <div style={styles.cardHeader}>Analytics Pro</div>
          <h2 style={styles.subscriptionPlan}>Business Plan</h2>
          <p style={styles.renewalDate}>Renews on: August 20, 2025</p>
          <button style={styles.manageButton} onClick={() => alert('Manage Analytics Pro')}>Manage Subscription</button>
        </div>
      </div>
    </>
  );

  const renderMyBillingPage = () => (
     <>
      <div style={styles.pageHeader}>
        <div>
          <h1 style={styles.pageTitle}>My Billing</h1>
          <p style={styles.pageSubtitle}>Your billing history for marketplace subscriptions.</p>
        </div>
        <button style={styles.manageButton}>Update Payment Method</button>
      </div>
       <div style={styles.tableContainer}>
        <div style={{...styles.tableGrid, gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1fr'}}>
            <div style={styles.tableHeader}>Description</div>
            <div style={styles.tableHeader}>Date</div>
            <div style={styles.tableHeader}>Amount</div>
            <div style={styles.tableHeader}>Status</div>
            <div style={styles.tableHeader}>Action</div>
        </div>
        <div style={{...styles.tableGrid, ...styles.tableRow, gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1fr'}}>
            <div style={styles.tableCell}>TaskMaster Pro - Team Plan</div>
            <div style={styles.tableCell}>July 12, 2025</div>
            <div style={styles.tableCell}>{formatCurrency(29.99)}</div>
            <div style={styles.tableCell}><span style={{...styles.statusBadge, ...styles.statusActive}}>Paid</span></div>
            <div style={styles.tableCell}><button style={styles.manageButton}>Invoice</button></div>
        </div>
        <div style={{...styles.tableGrid, ...styles.tableRow, gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1fr'}}>
            <div style={styles.tableCell}>Analytics Pro - Business Plan</div>
            <div style={styles.tableCell}>July 20, 2025</div>
            <div style={styles.tableCell}>{formatCurrency(45.00)}</div>
            <div style={styles.tableCell}><span style={{...styles.statusBadge, ...styles.statusActive}}>Paid</span></div>
            <div style={styles.tableCell}><button style={styles.manageButton}>Invoice</button></div>
        </div>
      </div>
    </>
  );

  const renderMyProfilePage = () => (
    <>
      <div style={styles.pageHeader}>
        <div>
          <h1 style={styles.pageTitle}>My Profile</h1>
          <p style={styles.pageSubtitle}>This is your profile as a customer on the marketplace.</p>
        </div>
      </div>
      <div style={styles.card}>
        <div style={{display: 'flex', alignItems: 'center', gap: '1.5rem'}}>
            <div style={{...styles.avatar, width: '80px', height: '80px', fontSize: '2.5rem'}}>{user.avatar}</div>
            <div>
                <h2 style={{margin: 0, fontSize: '1.5rem', fontWeight: '600'}}>{user.name}</h2>
                <p style={{margin: '0.25rem 0 0 0', color: '#6b7280'}}>{user.email}</p>
                <p style={{margin: '1rem 0 0 0', color: '#6b7280'}}>Member since: Jan 1, 2024</p>
            </div>
        </div>
         <div style={{marginTop: '2rem', borderTop: '1px solid #e5e7eb', paddingTop: '1.5rem'}}>
            <button style={styles.addButton} onClick={() => setActiveSection('settings')}>Edit Profile Settings</button>
        </div>
      </div>
    </>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard": return renderDashboardPage();
      case "manage-software": return renderManageSoftwarePage();
      case "offering-plans": return renderOfferingPlansPage();
      case "marketplace": return renderMarketplacePage();
      case "subscriber-list": return renderSubscriberListPage();
      case "platform-plan": return renderPlatformPlanPage();
      case "billing-history": return renderBillingHistoryPage();
      case "settings": return renderSettingsPage();
      // Sub-menu items
      case "my-subscriptions": return renderMySubscriptionsPage();
      case "my-billing": return renderMyBillingPage();
      case "my-profile": return renderMyProfilePage();
      default:
        const currentItem = menuItems.find((item) => item.id === activeSection);
        return (
          <div>
            <h1 style={styles.pageTitle}>
              {currentItem ? currentItem.label : "Page"}
            </h1>
            <p>
              Content for {currentItem ? currentItem.label : "this page"} goes
              here...
            </p>
          </div>
        );
    }
  };

  return (
    <div style={styles.pageContainer}>
      <aside style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <span style={{ fontSize: "1.5rem" }}>🗄️</span>
          <span style={styles.portalTitle}>Tenant Portal</span>
        </div>
        <nav style={styles.nav}>
          {menuItems.map((item) => (
            <div
              key={item.id}
              style={
                activeSection === item.id
                  ? { ...styles.menuItem, ...styles.activeMenuItem }
                  : styles.menuItem
              }
              onClick={() => {
                setActiveSection(item.id);
                setActivityExpanded(false);
              }}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
          <div>
            <div
              style={styles.menuItem}
              onClick={() => setActivityExpanded(!isActivityExpanded)}
            >
              <span>👤</span>
              <span>My Activity (as Customer)</span>
              <span
                style={{
                  marginLeft: "auto",
                  transition: "transform 0.2s",
                  transform: isActivityExpanded
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
                }}
              >
                ▼
              </span>
            </div>
            {isActivityExpanded && (
              <div style={styles.subMenuContainer}>
                {activitySubMenu.map((sub) => (
                  <div
                    key={sub.id}
                    style={{
                      ...styles.subMenuItem,
                       ...(activeSection === sub.id && {color: '#ffffff', fontWeight: '500'})
                    }}
                    onClick={() => setActiveSection(sub.id)}
                  >
                    {sub.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </nav>
        <div style={styles.sidebarFooter}>
          <div style={styles.helpSection}>
            <span>❓</span> Help & Support
          </div>
          <div style={styles.userProfile}>
            <div style={styles.avatar}>{user.avatar}</div>
            <div>
              <div style={{ fontWeight: "500", fontSize: "0.875rem" }}>
                {user.name}
              </div>
              <div style={{ color: "#9ca3af", fontSize: "0.75rem" }}>
                {user.email}
              </div>
            </div>
            <button
              style={styles.logoutButton}
              onClick={handleLogout}
              title="Logout"
            >
              →
            </button>
          </div>
        </div>
      </aside>
      <main style={styles.mainContent}>{renderContent()}</main>
    </div>
  );
};

export default TenantDashboard;