import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CustomerDashboard = () => {
  // --- STATE MANAGEMENT ---
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [user, setUser] = useState({
    name: "Alex Doe",
    email: "alex.doe@example.com",
    avatar: "A",
  });
  const [userCurrency, setUserCurrency] = useState({
    code: "USD",
    symbol: "$",
    rate: 1,
  });

  // --- MOCK DATA ---
  const subscriptions = [
    {
      id: 1,
      software: "TaskMaster Pro",
      plan: "Team Plan",
      status: "Active",
      renewalDate: "August 12, 2025",
      price: 29.99,
      icon: "✅",
    },
    {
      id: 2,
      software: "Analytics Pro",
      plan: "Business Plan",
      status: "Active",
      renewalDate: "August 20, 2025",
      price: 45.0,
      icon: "📊",
    },
    {
      id: 3,
      software: "DesignStudio",
      plan: "Basic",
      status: "Canceled",
      renewalDate: "June 1, 2025",
      price: 22.0,
      icon: "🎨",
    },
  ];
  const billingHistory = [
    {
      id: "CM-INV-0725",
      date: "July 12, 2025",
      description: "TaskMaster Pro - Team Plan",
      amount: 29.99,
    },
    {
      id: "CM-INV-0724",
      date: "July 1, 2025",
      description: "Analytics Pro - Business Plan",
      amount: 45.0,
    },
    {
      id: "CM-INV-0625",
      date: "June 12, 2025",
      description: "TaskMaster Pro - Team Plan",
      amount: 29.99,
    },
  ];
  const marketplaceSoftware = [
    {
      id: "sw1",
      name: "CMS Pro",
      author: "AmbaApps",
      icon: "📝",
      price: 20.0,
      rating: 4.8,
      description:
        "Advanced content management system with drag-and-drop editor and powerful SEO tools.",
      tags: ["Featured", "Content"],
    },
    {
      id: "sw2",
      name: "TaskMaster Pro",
      author: "TechCorp",
      icon: "✅",
      price: 29.99,
      rating: 4.6,
      description:
        "AI-powered task management with team collaboration and comprehensive analytics.",
      tags: ["Productivity", "AI"],
    },
  ];

  // --- HANDLERS AND UTILS ---
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      setIsLoggedIn(false);
    }
  };
  const formatCurrency = (usdPrice) => {
    const convertedPrice = (usdPrice * userCurrency.rate).toFixed(2);
    return `${userCurrency.symbol}${convertedPrice}`;
  };

  useEffect(() => {
    // This is a placeholder for fetching user currency based on location
  }, []);

  // --- STYLES (Based on the Tenant Dashboard Model) ---
  const styles = {
    pageContainer: {
      display: "flex",
      height: "100vh",
      backgroundColor: "#f9fafb",
      fontFamily:
        '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    },
    sidebar: {
      width: "260px",
      backgroundColor: "#1e293b", // Dark theme
      color: "#e5e7eb",
      display: "flex",
      flexDirection: "column",
      height: "100vh",
    },
    sidebarHeader: {
      padding: "1.5rem",
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      borderBottom: "1px solid #334155",
      flexShrink: 0,
    },
    logoText: {
      fontSize: "1.25rem",
      fontWeight: "600",
      color: "#ffffff",
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
      fontSize: "0.9rem",
      color: "#cbd5e1",
      transition: "background-color 0.2s, color 0.2s",
      marginBottom: "0.25rem",
    },
    activeMenuItem: {
      backgroundColor: "#0d6efd", // Using customer blue for active item
      color: "#ffffff",
      fontWeight: "500",
    },
    sidebarFooter: {
      padding: "1rem",
      borderTop: "1px solid #334155",
      flexShrink: 0,
    },
    userProfile: {
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      padding: "0.5rem",
      borderRadius: "8px",
      backgroundColor: "#334155",
    },
    avatar: {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      backgroundColor: "#0d6efd", // Customer blue
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "bold",
      fontSize: "1.2rem",
    },
    logoutButton: {
      marginLeft: "auto",
      background: "transparent",
      border: "none",
      cursor: "pointer",
      fontSize: "1.5rem",
      color: "#9ca3af",
    },
    mainContent: { flex: 1, padding: "2.5rem", overflowY: "auto" },
    pageHeader: { marginBottom: "2rem" },
    pageTitle: { fontSize: "2rem", fontWeight: "bold", color: "#1f2937" },
    pageSubtitle: { color: "#6b7280", marginTop: "0.25rem" },
    card: {
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      padding: "1.5rem",
      border: "1px solid #e5e7eb",
      boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
      marginBottom: "1.5rem",
    },
    cardHeader: {
      fontSize: "1.125rem",
      fontWeight: "600",
      color: "#343a40",
      marginBottom: "1.5rem",
      paddingBottom: "1rem",
      borderBottom: "1px solid #e9ecef",
    },
    statCard: { textAlign: "center", padding: "2rem" },
    statValue: { fontSize: "2.5rem", fontWeight: "bold", color: "#0d6efd" },
    statLabel: { fontSize: "1rem", color: "#6c757d", marginTop: "0.5rem" },
    table: { width: "100%", borderCollapse: "collapse" },
    th: {
      textAlign: "left",
      padding: "0.75rem 1rem",
      borderBottom: "2px solid #e9ecef",
      color: "#6b7280",
      fontSize: "0.75rem",
      textTransform: "uppercase",
    },
    td: {
      textAlign: "left",
      padding: "1rem",
      borderBottom: "1px solid #e9ecef",
      color: "#212529",
      fontSize: "0.875rem",
    },
    statusBadge: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.375rem",
      padding: "0.25rem 0.75rem",
      borderRadius: "20px",
      fontWeight: "500",
      fontSize: "0.75rem",
    },
    statusActive: {
      backgroundColor: "rgba(25, 135, 84, 0.1)",
      color: "#198754",
    },
    statusCanceled: {
      backgroundColor: "rgba(220, 53, 69, 0.1)",
      color: "#dc3545",
    },
    button: {
      backgroundColor: "#0d6efd",
      color: "white",
      border: "none",
      padding: "0.6rem 1.2rem",
      borderRadius: "8px",
      fontWeight: "500",
      cursor: "pointer",
      fontSize: "0.9rem",
    },
    buttonOutline: {
      backgroundColor: "transparent",
      color: "#0d6efd",
      border: "1px solid #0d6efd",
    },
    formInput: {
      width: "100%",
      padding: "0.75rem",
      border: "1px solid #ced4da",
      borderRadius: "8px",
      fontSize: "0.9rem",
      boxSizing: "border-box",
      marginTop: "0.5rem",
    },
    formLabel: { fontWeight: "500", color: "#495057" },
    formGroup: { marginBottom: "1.5rem" },
    tag: {
      fontSize: "0.7rem",
      fontWeight: 600,
      color: "#6c757d",
      backgroundColor: "#e9ecef",
      padding: "0.25rem 0.5rem",
      borderRadius: "4px",
      textTransform: "uppercase",
    },
  };

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "🏠" },
    { id: "subscriptions", label: "My Subscriptions", icon: "🔄" },
    { id: "marketplace", label: "Marketplace", icon: "🛒" },
    { id: "billing", label: "Billing", icon: "💳" },
    { id: "profile", label: "Profile", icon: "👤" },
  ];

  // --- RENDER FUNCTIONS FOR EACH PAGE (Content from original CustomerDashboard) ---
  const renderDashboard = () => (
    <>
      <div style={styles.pageHeader}>
        <h1 style={styles.pageTitle}>Dashboard</h1>
        <p style={styles.pageSubtitle}>
          Welcome back, {user.name}! Here's a summary of your account.
        </p>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1.5rem",
        }}
      >
        <div style={{ ...styles.card, ...styles.statCard }}>
          <div style={styles.statValue}>
            {subscriptions.filter((s) => s.status === "Active").length}
          </div>
          <div style={styles.statLabel}>Active Subscriptions</div>
        </div>
        <div style={{ ...styles.card, ...styles.statCard }}>
          <div style={styles.statValue}>
            {formatCurrency(
              subscriptions
                .filter((s) => s.status === "Active")
                .reduce((acc, s) => acc + s.price, 0),
            )}
          </div>
          <div style={styles.statLabel}>Monthly Cost</div>
        </div>
        <div style={{ ...styles.card, ...styles.statCard }}>
          <div style={styles.statValue}>{billingHistory.length}</div>
          <div style={styles.statLabel}>Total Invoices</div>
        </div>
      </div>
      <div style={{ ...styles.card, marginTop: "2.5rem" }}>
        <h2 style={styles.cardHeader}>Recent Activity</h2>
        <p style={{ color: "#6c757d" }}>
          Your most recent subscription renewal and billing updates.
        </p>
        <div
          style={{
            marginTop: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <p>
            ✅ Your subscription to <strong>TaskMaster Pro</strong> was
            successfully renewed on July 12, 2025.
          </p>
          <p>
            💳 A new invoice{" "}
            <a href="#" onClick={() => setActiveSection("billing")}>
              CM-INV-0725
            </a>{" "}
            has been added to your account.
          </p>
        </div>
      </div>
    </>
  );
  const renderSubscriptions = () => (
    <>
      <div style={styles.pageHeader}>
        <h1 style={styles.pageTitle}>My Subscriptions</h1>
        <p style={styles.pageSubtitle}>
          Manage your active and past software subscriptions.
        </p>
      </div>
      <div style={styles.card}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Software</th>
              <th style={styles.th}>Plan</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Next Billing Date</th>
              <th style={styles.th}>Price</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((sub) => (
              <tr key={sub.id}>
                <td style={styles.td}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <span style={{ fontSize: "1.5rem" }}>{sub.icon}</span>
                    <span style={{ fontWeight: "500" }}>{sub.software}</span>
                  </div>
                </td>
                <td style={styles.td}>{sub.plan}</td>
                <td style={styles.td}>
                  <span
                    style={{
                      ...styles.statusBadge,
                      ...(sub.status === "Active"
                        ? styles.statusActive
                        : styles.statusCanceled),
                    }}
                  >
                    {sub.status}
                  </span>
                </td>
                <td style={styles.td}>
                  {sub.status === "Active" ? sub.renewalDate : "N/A"}
                </td>
                <td style={styles.td}>{formatCurrency(sub.price)}/mo</td>
                <td style={styles.td}>
                  <button style={{ ...styles.button, ...styles.buttonOutline }}>
                    Manage
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
  const SoftwareCard = ({ software }) => (
    <div
      style={{
        ...styles.card,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "transform 0.2s, box-shadow 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.05)";
      }}
    >
      <div>
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
              fontSize: "2.5rem",
              background: "#f8f9fa",
              width: "60px",
              height: "60px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "12px",
            }}
          >
            {software.icon}
          </div>
          <div>
            <h3
              style={{
                margin: 0,
                fontSize: "1.1rem",
                fontWeight: 600,
                color: "#212529",
              }}
            >
              {software.name}
            </h3>
            <p
              style={{
                margin: "0.25rem 0 0 0",
                fontSize: "0.8rem",
                color: "#6c757d",
              }}
            >
              by {software.author}
            </p>
          </div>
        </div>
        <p
          style={{
            fontSize: "0.875rem",
            color: "#495057",
            lineHeight: 1.6,
            minHeight: "65px",
          }}
        >
          {software.description}
        </p>
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            marginBottom: "1rem",
            flexWrap: "wrap",
          }}
        >
          {software.tags.map((tag) => (
            <span key={tag} style={styles.tag}>
              {tag.toUpperCase()}
            </span>
          ))}
        </div>
      </div>
      <div>
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
              style={{ fontSize: "1.5rem", fontWeight: 700, color: "#212529" }}
            >
              {formatCurrency(software.price)}
            </span>
            <span style={{ color: "#6c757d" }}>/mo</span>
          </div>
          <span style={{ color: "#ffc107", fontWeight: "bold" }}>
            ★ {software.rating}
          </span>
        </div>
        <button style={{ ...styles.button, width: "100%" }}>
          View Details
        </button>
      </div>
    </div>
  );
  const renderMarketplace = () => (
    <>
      <div style={styles.pageHeader}>
        <h1 style={styles.pageTitle}>Marketplace</h1>
        <p style={styles.pageSubtitle}>
          Discover new tools to supercharge your workflow.
        </p>
      </div>
      <div style={styles.card}>
        <input
          type="text"
          placeholder="🔍 Search for software..."
          style={{ ...styles.formInput, maxWidth: "400px" }}
        />
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {marketplaceSoftware.map((sw) => (
          <SoftwareCard key={sw.id} software={sw} />
        ))}
      </div>
    </>
  );
  const renderBilling = () => (
    <>
      <div style={styles.pageHeader}>
        <h1 style={styles.pageTitle}>Billing</h1>
        <p style={styles.pageSubtitle}>
          Review your payment history and manage payment methods.
        </p>
      </div>
      <div style={{ ...styles.card }}>
        <h2 style={styles.cardHeader}>Payment Method</h2>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <p>
            💳 Visa ending in <strong>4242</strong>
          </p>
          <button style={{ ...styles.button, ...styles.buttonOutline }}>
            Update
          </button>
        </div>
      </div>
      <div style={styles.card}>
        <h2 style={styles.cardHeader}>Billing History</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Invoice ID</th>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Description</th>
              <th style={styles.th}>Amount</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {billingHistory.map((item) => (
              <tr key={item.id}>
                <td style={styles.td}>{item.id}</td>
                <td style={styles.td}>{item.date}</td>
                <td style={styles.td}>{item.description}</td>
                <td style={styles.td}>{formatCurrency(item.amount)}</td>
                <td style={styles.td}>
                  <a href="#" style={{ color: "#0d6efd", fontWeight: "500" }}>
                    Download
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
  const renderProfile = () => (
    <>
      <div style={styles.pageHeader}>
        <h1 style={styles.pageTitle}>Profile</h1>
        <p style={styles.pageSubtitle}>
          Update your personal information and password.
        </p>
      </div>
      <div style={styles.card}>
        <h2 style={styles.cardHeader}>Personal Information</h2>
        <form>
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Profile Picture</label>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1.5rem",
                marginTop: "0.5rem",
              }}
            >
              <div
                style={{
                  ...styles.avatar,
                  width: "64px",
                  height: "64px",
                  fontSize: "2rem",
                }}
              >
                {user.avatar}
              </div>
              <input
                type="file"
                id="avatarUpload"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) =>
                  alert(`File selected: ${e.target.files[0].name}`)
                }
              />
              <label
                htmlFor="avatarUpload"
                style={{
                  ...styles.button,
                  ...styles.buttonOutline,
                  cursor: "pointer",
                }}
              >
                Upload New
              </label>
            </div>
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="name" style={styles.formLabel}>
              Full Name
            </label>
            <input
              type="text"
              id="name"
              defaultValue={user.name}
              style={styles.formInput}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.formLabel}>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              defaultValue={user.email}
              style={styles.formInput}
              readOnly
            />
          </div>
          <button
            type="submit"
            style={styles.button}
            onClick={(e) => {
              e.preventDefault();
              alert("Profile Updated!");
            }}
          >
            Save Changes
          </button>
        </form>
      </div>
      <div style={styles.card}>
        <h2 style={styles.cardHeader}>Change Password</h2>
        <form>
          <div style={styles.formGroup}>
            <label htmlFor="currentPass" style={styles.formLabel}>
              Current Password
            </label>
            <input type="password" id="currentPass" style={styles.formInput} />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="newPass" style={styles.formLabel}>
              New Password
            </label>
            <input type="password" id="newPass" style={styles.formInput} />
          </div>
          <button
            type="submit"
            style={styles.button}
            onClick={(e) => {
              e.preventDefault();
              alert("Password Changed!");
            }}
          >
            Update Password
          </button>
        </form>
      </div>
    </>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return renderDashboard();
      case "subscriptions":
        return renderSubscriptions();
      case "marketplace":
        return renderMarketplace();
      case "billing":
        return renderBilling();
      case "profile":
        return renderProfile();
      default:
        return renderDashboard();
    }
  };

  if (!isLoggedIn) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          fontFamily: styles.pageContainer.fontFamily,
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h1 style={styles.pageTitle}>You have been logged out.</h1>
          <p style={{ ...styles.pageSubtitle, margin: "1rem 0 2rem 0" }}>
            Click below to log back into your account.
          </p>
          <button style={styles.button} onClick={() => setIsLoggedIn(true)}>
            Log In Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.pageContainer}>
      <aside style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <span style={{ fontSize: "1.5rem" }}>🚀</span>
          <span style={styles.logoText}>Saasibly</span>
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
              onClick={() => setActiveSection(item.id)}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </nav>
        <div style={styles.sidebarFooter}>
          <div style={styles.userProfile}>
            <div style={styles.avatar}>{user.avatar}</div>
            <div>
              <div
                style={{
                  fontWeight: "600",
                  fontSize: "0.9rem",
                  color: "#212529",
                }}
              >
                {user.name}
              </div>
              <div style={{ color: "#6c757d", fontSize: "0.8rem" }}>
                {user.email}
              </div>
            </div>
            <button
              title="Log Out"
              style={styles.logoutButton}
              onClick={handleLogout}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
                />
                <path
                  fillRule="evenodd"
                  d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
                />
              </svg>
            </button>
          </div>
        </div>
      </aside>
      <main style={styles.mainContent}>{renderContent()}</main>
    </div>
  );
};

export default CustomerDashboard;
