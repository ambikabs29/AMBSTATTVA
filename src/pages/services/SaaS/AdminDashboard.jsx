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
          <div>
            <h3>📊 Overview</h3>
            <p>Welcome to the SaaS Admin Panel. Use the side menu to manage your marketplace.</p>
          </div>
        );

      case "customers":
        return (
          <div>
            <h3>👤 Customers</h3>
            <table>
              <thead>
                <tr><th>Name</th><th>Email</th><th>Status</th><th>Actions</th></tr>
              </thead>
              <tbody>
                <tr><td>Ambika</td><td>ambs@example.com</td><td>Active</td><td><button>Edit</button></td></tr>
                <tr><td>Binu</td><td>binu@example.com</td><td>Expired</td><td><button>Renew</button></td></tr>
              </tbody>
            </table>
          </div>
        );

      case "tenants":
        return (
          <div>
            <h3>🏢 Tenants</h3>
            <table>
              <thead>
                <tr><th>Name</th><th>Plan</th><th>Softwares</th><th>Actions</th></tr>
              </thead>
              <tbody>
                <tr><td>SoftTech</td><td>Pro</td><td>3</td><td><button>View</button></td></tr>
                <tr><td>CloudServe</td><td>Basic</td><td>1</td><td><button>Upgrade</button></td></tr>
              </tbody>
            </table>
          </div>
        );

      case "subscriptions":
        return (
          <div>
            <h3>📦 Subscriptions</h3>
            <ul>
              <li>Customer A - Active until Aug 2025</li>
              <li>Tenant B - Trial expires in 3 days</li>
              <li>Customer C - Cancelled</li>
            </ul>
          </div>
        );

      case "approvals":
        return (
          <div>
            <h3>📂 All Softwares</h3>
            <table>
              <thead>
                <tr><th>Software Name</th><th>Tenant</th><th>Status</th><th>Actions</th></tr>
              </thead>
              <tbody>
                <tr><td>ClinicPro</td><td>SoftTech</td><td>Pending</td><td><button>Approve</button></td></tr>
                <tr><td>InventoryGo</td><td>DataHub</td><td>Live</td><td><button>Archive</button></td></tr>
              </tbody>
            </table>
          </div>
        );

      case "my softwares":
        return (
          <div>
            <h3>📁 My Softwares</h3>
            <p>You have uploaded 2 software items.</p>
            <ul>
              <li>ClinicPlus <button>Edit</button> <button>Delete</button></li>
              <li>StockEase <button>Edit</button> <button>Delete</button></li>
            </ul>
            <button>Add New Software</button>
          </div>
        );

      case "marketplace":
        return (
          <div>
            <h3>🛒 Marketplace Settings</h3>
            <p>Organize categories and featured software.</p>
            <ul>
              <li>Featured: ClinicPro <button>Remove</button></li>
              <li>Category: Business Tools <button>Edit</button></li>
            </ul>
          </div>
        );

      case "billing":
        return (
          <div>
            <h3>💳 Admin Billing</h3>
            <p>These are softwares purchased by admin from the marketplace:</p>
            <ul>
              <li>HRDesk – ₹499/month <button>Cancel</button></li>
              <li>EduManager – ₹799/year <button>Renew</button></li>
            </ul>
          </div>
        );

      case "payment":
        return (
          <div>
            <h3>💰 Payments Received</h3>
            <table>
              <thead>
                <tr><th>From</th><th>Amount</th><th>Purpose</th><th>Date</th></tr>
              </thead>
              <tbody>
                <tr><td>Tenant: DataSoft</td><td>₹1499</td><td>Monthly Plan</td><td>01 July 2025</td></tr>
                <tr><td>Customer: Latha</td><td>₹299</td><td>Single Software</td><td>02 July 2025</td></tr>
              </tbody>
            </table>
          </div>
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
