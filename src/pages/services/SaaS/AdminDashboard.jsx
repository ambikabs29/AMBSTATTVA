
import React, { useState, useEffect } from "react";

const AdminDashboard = () => {
  // ❗ Change this to false to simulate access denied
  const [isAdmin, setIsAdmin] = useState(true); // Will later be dynamic based on Firebase Auth
  const [activeSection, setActiveSection] = useState("dashboard");

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
      case "dashboard":
        return (
          <div>
            <div style={{ marginBottom: "2rem" }}>
              <h2 style={{ fontSize: "2rem", fontWeight: "600", color: "#1f2937", marginBottom: "0.5rem" }}>Dashboard</h2>
              <p style={{ color: "#6b7280" }}>Overview of your SaaS platform.</p>
            </div>

            {/* Stats Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
              <div style={{ background: "white", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", border: "1px solid #e5e7eb" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                  <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>Active Tenants</span>
                  <span style={{ fontSize: "1.25rem" }}>👥</span>
                </div>
                <div style={{ fontSize: "2rem", fontWeight: "600", color: "#1f2937" }}>1</div>
                <div style={{ color: "#6b7280", fontSize: "0.75rem" }}>out of 1 total tenants</div>
              </div>

              <div style={{ background: "white", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", border: "1px solid #e5e7eb" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                  <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>Active Customers</span>
                  <span style={{ fontSize: "1.25rem" }}>👤</span>
                </div>
                <div style={{ fontSize: "2rem", fontWeight: "600", color: "#1f2937" }}>0</div>
                <div style={{ color: "#6b7280", fontSize: "0.75rem" }}>out of 0 total customers</div>
              </div>

              <div style={{ background: "white", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", border: "1px solid #e5e7eb" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                  <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>Active Subscriptions</span>
                  <span style={{ fontSize: "1.25rem" }}>⚡</span>
                </div>
                <div style={{ fontSize: "2rem", fontWeight: "600", color: "#1f2937" }}>1</div>
              </div>

              <div style={{ background: "white", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", border: "1px solid #e5e7eb" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                  <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>Monthly Revenue (MRR)</span>
                  <span style={{ fontSize: "1.25rem" }}>💰</span>
                </div>
                <div style={{ fontSize: "2rem", fontWeight: "600", color: "#1f2937" }}>$10.00</div>
              </div>
            </div>

            {/* Charts Row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "2rem" }}>
              {/* Revenue Chart */}
              <div style={{ background: "white", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", border: "1px solid #e5e7eb" }}>
                <h3 style={{ fontSize: "1.125rem", fontWeight: "600", color: "#1f2937", marginBottom: "0.5rem" }}>Revenue Over Time</h3>
                <p style={{ color: "#6b7280", fontSize: "0.875rem", marginBottom: "1.5rem" }}>Monthly recurring revenue growth.</p>
                <div style={{ height: "200px", background: "#f8fafc", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", color: "#6b7280" }}>
                  📈 Revenue Chart Placeholder
                </div>
              </div>

              {/* Subscription Trends */}
              <div style={{ background: "white", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", border: "1px solid #e5e7eb" }}>
                <h3 style={{ fontSize: "1.125rem", fontWeight: "600", color: "#1f2937", marginBottom: "0.5rem" }}>Subscription Trends</h3>
                <p style={{ color: "#6b7280", fontSize: "0.875rem", marginBottom: "1.5rem" }}>New vs. Churned Subscriptions</p>
                <div style={{ height: "200px", background: "#f8fafc", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", color: "#6b7280" }}>
                  📊 Bar Chart Placeholder
                </div>
              </div>
            </div>

            {/* Pie Chart */}
            <div style={{ background: "white", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", border: "1px solid #e5e7eb" }}>
              <h3 style={{ fontSize: "1.125rem", fontWeight: "600", color: "#1f2937", marginBottom: "0.5rem" }}>Active Subscriptions by Plan</h3>
              <p style={{ color: "#6b7280", fontSize: "0.875rem", marginBottom: "1.5rem" }}>Distribution of active subscriptions across different plans.</p>
              <div style={{ height: "300px", background: "#f8fafc", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", color: "#6b7280" }}>
                🥧 Pie Chart Placeholder
              </div>
            </div>
          </div>
        );

      case "platform-software":
        return (
          <div>
            <h3>🖥️ Platform Software</h3>
            <p>Manage software available on the platform.</p>
          </div>
        );

      case "platform-plans":
        return (
          <div>
            <h3>📋 Platform Plans</h3>
            <p>Configure subscription plans and pricing.</p>
          </div>
        );

      case "user-subscriptions":
        return (
          <div>
            <h3>👤 User Subscriptions</h3>
            <p>View and manage user subscriptions.</p>
          </div>
        );

      case "tenants":
        return (
          <div>
            <h3>🏢 Tenants</h3>
            <p>Manage tenant accounts and permissions.</p>
          </div>
        );

      case "customers":
        return (
          <div>
            <h3>👥 Customers</h3>
            <p>View and manage customer accounts.</p>
          </div>
        );

      case "analytics":
        return (
          <div>
            <h3>📊 Analytics</h3>
            <p>View detailed analytics and reports.</p>
          </div>
        );

      case "marketplace-mgmt":
        return (
          <div>
            <h3>🛒 Marketplace Mgmt</h3>
            <p>Manage marketplace settings and featured content.</p>
          </div>
        );

      case "my-activity":
        return (
          <div>
            <h3>📱 My Activity (as Customer)</h3>
            <p>View your own activity as a customer.</p>
          </div>
        );

      case "marketplace":
        return (
          <div>
            <h3>🏪 Marketplace</h3>
            <p>Browse and manage marketplace offerings.</p>
          </div>
        );

      case "settings":
        return (
          <div>
            <h3>⚙️ Settings</h3>
            <p>Configure platform settings and preferences.</p>
          </div>
        );

      case "support":
        return (
          <div>
            <h3>🎧 Support</h3>
            <p>Access support resources and contact options.</p>
          </div>
        );

      default:
        return <p>Select a section from the menu.</p>;
    }
  };

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊", active: true },
    { id: "platform-software", label: "Platform Software", icon: "🖥️" },
    { id: "platform-plans", label: "Platform Plans", icon: "📋" },
    { id: "user-subscriptions", label: "User Subscriptions", icon: "👤" },
    { id: "tenants", label: "Tenants", icon: "🏢" },
    { id: "customers", label: "Customers", icon: "👥" },
    { id: "analytics", label: "Analytics", icon: "📊" },
    { id: "marketplace-mgmt", label: "Marketplace Mgmt", icon: "🛒", hasSubmenu: true },
    { id: "my-activity", label: "My Activity (as Customer)", icon: "📱", hasSubmenu: true },
    { id: "marketplace", label: "Marketplace", icon: "🏪" },
    { id: "settings", label: "Settings", icon: "⚙️" },
    { id: "support", label: "Support", icon: "🎧" }
  ];

  const menuStyle = {
    cursor: "pointer",
    padding: "0.75rem 1rem",
    margin: "0.125rem 0",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    fontSize: "0.875rem",
    color: "#e5e7eb",
    transition: "all 0.2s"
  };

  const activeMenuStyle = {
    ...menuStyle,
    background: "#10b981",
    color: "white"
  };

  return (
    <div style={{ display: "flex", height: "100vh", background: "#f9fafb" }}>
      {/* Sidebar */}
      <aside style={{
        width: "280px",
        background: "#1e293b",
        color: "#e5e7eb",
        height: "100vh",
        overflowY: "auto"
      }}>
        {/* Header */}
        <div style={{ padding: "1.5rem 1rem", borderBottom: "1px solid #334155" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div style={{ 
              background: "#3b82f6", 
              color: "white", 
              padding: "8px", 
              borderRadius: "8px", 
              fontWeight: "bold",
              fontSize: "1.125rem"
            }}>
              🏢
            </div>
            <span style={{ fontWeight: "600", fontSize: "1.125rem" }}>SaaSible Admin</span>
          </div>
        </div>

        {/* Menu Items */}
        <nav style={{ padding: "1rem" }}>
          {menuItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              style={activeSection === item.id ? activeMenuStyle : menuStyle}
            >
              <span>{item.icon}</span>
              <span style={{ flex: 1 }}>{item.label}</span>
              {item.hasSubmenu && <span style={{ fontSize: "0.75rem" }}>▼</span>}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div style={{ position: "absolute", bottom: "1rem", left: "1rem", right: "1rem" }}>
          <div style={{ 
            background: "#334155", 
            padding: "0.75rem", 
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            fontSize: "0.875rem"
          }}>
            <div style={{ 
              width: "32px", 
              height: "32px", 
              borderRadius: "50%", 
              background: "#10b981",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              fontSize: "0.875rem"
            }}>
              N
            </div>
            <div>
              <div style={{ fontWeight: "500" }}>admin@saasible.com</div>
              <div style={{ color: "#94a3b8", fontSize: "0.75rem" }}>admin@saasible.com</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "2rem", overflow: "auto" }}>
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminDashboard;
