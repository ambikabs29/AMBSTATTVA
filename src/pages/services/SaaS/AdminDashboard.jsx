import React, { useState, useEffect } from "react";

const AdminDashboard = () => {
  // ❗ Change this to false to simulate access denied
  const [isAdmin, setIsAdmin] = useState(true); // Will later be dynamic based on Firebase Auth
  const [activeSection, setActiveSection] = useState("overview");

  // Optional: simulate fetching admin flag from Firebase
  useEffect(() => {
    // TODO: Replace with Firebase admin check
    const fetchAdminStatus = async () => {
      // Example logic:
      // const user = firebase.auth().currentUser;
      // const isAdmin = await checkUserRole(user.uid); // Custom function
      setIsAdmin(true);
    };
    fetchAdminStatus();
  }, []);

  // 🔒 If user is not admin, show access denied
  if (!isAdmin) {
    return (
      <div style={{ padding: "2rem", color: "red" }}>
        <h2>Access Denied</h2>
        <p>You do not have permission to access the Admin Dashboard.</p>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return (
          <p>
            Welcome to the SaaS Admin Panel. Select a section to begin managing
            your marketplace.
          </p>
        );
      case "customers":
        return (
          <p>
            👤 Customer Management: View, edit, delete customers and their
            subscriptions.
          </p>
        );
      case "tenants":
        return (
          <p>
            🏢 Tenant Management: Manage tenant uploads, billing plans, and
            access rights.
          </p>
        );
      case "subscriptions":
        return (
          <p>
            📦 Subscription Overview: View active, expired, and cancelled
            subscriptions.
          </p>
        );
      case "approvals":
        return (
          <p>
            ✅ Software Approval Queue: Review and approve tenant software
            before publishing.
          </p>
        );
      case "my softwares":
        return (
          <p>
            📁 My Softwares: View and manage software uploaded by you
            (admin/tenant).
          </p>
        );
      case "billing":
        return (
          <p>
            💳 Billing: View and manage admin's own software purchases from marketplace.
          </p>
        );
      case "payment":
        return (
          <p>
            💰 Payment: Track incoming payments from tenants and subscribed customers.
          </p>
        );
      case "marketplace":
        return (
          <p>
            🛒 Marketplace Settings: Edit categories, promotions, and public
            listing order.
          </p>
        );
      default:
        return <p>Select a section from the menu.</p>;
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: "250px",
          background: "#222",
          color: "#fff",
          padding: "1rem",
          height: "100vh",
          boxShadow: "2px 0 5px rgba(0,0,0,0.2)",
        }}
      >
        <h3 style={{ color: "#FFD700" }}>SaaS Admin</h3>
        <ul style={{ listStyle: "none", padding: 0, marginTop: "2rem" }}>
          <li onClick={() => setActiveSection("overview")} style={menuStyle}>
            📊 Overview
          </li>
          <li onClick={() => setActiveSection("customers")} style={menuStyle}>
            👤 Customers
          </li>
          <li onClick={() => setActiveSection("tenants")} style={menuStyle}>
            🏢 Tenants
          </li>
          <li
            onClick={() => setActiveSection("subscriptions")}
            style={menuStyle}
          >
            📦 Subscriptions
          </li>
          <li onClick={() => setActiveSection("approvals")} style={menuStyle}>
            📂 All Softwares
          </li>
          <li
            onClick={() => setActiveSection("my softwares")}
            style={menuStyle}
          >
            📁 My Softwares
          </li>
          <li onClick={() => setActiveSection("billing")} style={menuStyle}>
            💳 Billing
          </li>
          <li onClick={() => setActiveSection("payment")} style={menuStyle}>
            💰 Payment
          </li>
          <li onClick={() => setActiveSection("marketplace")} style={menuStyle}>
            🛒 Marketplace
          </li>
        </ul>
      </aside>

      {/* Main Area */}
      <main style={{ flex: 1, padding: "2rem" }}>
        <h2>{activeSection.toUpperCase()}</h2>
        <div>{renderContent()}</div>
      </main>
    </div>
  );
};

const menuStyle = {
  cursor: "pointer",
  padding: "0.5rem 0",
  borderBottom: "1px solid #444",
};

export default AdminDashboard;
