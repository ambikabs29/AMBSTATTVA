
import React, { useState, useEffect } from "react";

const AdminDashboard = () => {
  // ❗ Change this to false to simulate access denied
  const [isAdmin, setIsAdmin] = useState(true); // Will later be dynamic based on Firebase Auth
  const [activeSection, setActiveSection] = useState("dashboard");
  const [expandedMenus, setExpandedMenus] = useState({});
  const [user, setUser] = useState({
    name: "Admin User",
    email: "admin@saasible.com",
    avatar: "AU"
  });

  // Logout function
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      setIsAdmin(false);
      // TODO: Clear Firebase auth session
      // firebase.auth().signOut();
    }
  };

  // Toggle submenu function
  const toggleSubmenu = (menuId) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuId]: !prev[menuId]
    }));
  };

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
                <div style={{ height: "200px", position: "relative", padding: "1rem" }}>
                  <svg width="100%" height="100%" viewBox="0 0 400 160">
                    {/* Grid lines */}
                    <defs>
                      <pattern id="grid" width="40" height="32" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 32" fill="none" stroke="#e5e7eb" strokeWidth="1"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                    
                    {/* Revenue line */}
                    <path
                      d="M 20 120 L 60 100 L 100 80 L 140 60 L 180 45 L 220 35 L 260 30 L 300 25 L 340 20 L 380 15"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    
                    {/* Data points */}
                    {[
                      { x: 20, y: 120, value: "$500" },
                      { x: 60, y: 100, value: "$800" },
                      { x: 100, y: 80, value: "$1.2k" },
                      { x: 140, y: 60, value: "$1.8k" },
                      { x: 180, y: 45, value: "$2.5k" },
                      { x: 220, y: 35, value: "$3.2k" },
                      { x: 260, y: 30, value: "$4.1k" },
                      { x: 300, y: 25, value: "$5.2k" },
                      { x: 340, y: 20, value: "$6.8k" },
                      { x: 380, y: 15, value: "$8.5k" }
                    ].map((point, i) => (
                      <g key={i}>
                        <circle cx={point.x} cy={point.y} r="4" fill="#10b981" />
                        <text x={point.x} y={point.y - 10} textAnchor="middle" fontSize="10" fill="#6b7280">
                          {point.value}
                        </text>
                      </g>
                    ))}
                    
                    {/* Months */}
                    <g>
                      {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"].map((month, i) => (
                        <text key={i} x={20 + i * 40} y={150} textAnchor="middle" fontSize="10" fill="#6b7280">
                          {month}
                        </text>
                      ))}
                    </g>
                  </svg>
                </div>
              </div>

              {/* Subscription Trends */}
              <div style={{ background: "white", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", border: "1px solid #e5e7eb" }}>
                <h3 style={{ fontSize: "1.125rem", fontWeight: "600", color: "#1f2937", marginBottom: "0.5rem" }}>Subscription Trends</h3>
                <p style={{ color: "#6b7280", fontSize: "0.875rem", marginBottom: "1.5rem" }}>New vs. Churned Subscriptions</p>
                <div style={{ height: "200px", position: "relative", padding: "1rem" }}>
                  <svg width="100%" height="100%" viewBox="0 0 400 160">
                    {/* Grid lines */}
                    <defs>
                      <pattern id="barGrid" width="50" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 50 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="1"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#barGrid)" />
                    
                    {/* Bars */}
                    {[
                      { month: "Jan", new: 5, churned: 1 },
                      { month: "Feb", new: 8, churned: 2 },
                      { month: "Mar", new: 12, churned: 3 },
                      { month: "Apr", new: 15, churned: 2 },
                      { month: "May", new: 18, churned: 4 },
                      { month: "Jun", new: 22, churned: 3 }
                    ].map((data, i) => (
                      <g key={i}>
                        {/* New subscriptions bar */}
                        <rect
                          x={40 + i * 55}
                          y={120 - data.new * 4}
                          width="20"
                          height={data.new * 4}
                          fill="#10b981"
                          rx="2"
                        />
                        {/* Churned subscriptions bar */}
                        <rect
                          x={65 + i * 55}
                          y={120 - data.churned * 4}
                          width="20"
                          height={data.churned * 4}
                          fill="#ef4444"
                          rx="2"
                        />
                        {/* Month label */}
                        <text x={52 + i * 55} y={140} textAnchor="middle" fontSize="10" fill="#6b7280">
                          {data.month}
                        </text>
                        {/* Values */}
                        <text x={50 + i * 55} y={110 - data.new * 4} textAnchor="middle" fontSize="8" fill="#10b981">
                          +{data.new}
                        </text>
                        <text x={75 + i * 55} y={110 - data.churned * 4} textAnchor="middle" fontSize="8" fill="#ef4444">
                          -{data.churned}
                        </text>
                      </g>
                    ))}
                    
                    {/* Legend */}
                    <g transform="translate(20, 15)">
                      <rect x="0" y="0" width="12" height="12" fill="#10b981" rx="2" />
                      <text x="18" y="10" fontSize="10" fill="#6b7280">New</text>
                      <rect x="60" y="0" width="12" height="12" fill="#ef4444" rx="2" />
                      <text x="78" y="10" fontSize="10" fill="#6b7280">Churned</text>
                    </g>
                  </svg>
                </div>
              </div>
            </div>

            {/* Pie Chart */}
            <div style={{ background: "white", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", border: "1px solid #e5e7eb" }}>
              <h3 style={{ fontSize: "1.125rem", fontWeight: "600", color: "#1f2937", marginBottom: "0.5rem" }}>Active Subscriptions by Plan</h3>
              <p style={{ color: "#6b7280", fontSize: "0.875rem", marginBottom: "1.5rem" }}>Distribution of active subscriptions across different plans.</p>
              <div style={{ height: "300px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
                  <svg width="200" height="200" viewBox="0 0 200 200">
                    {/* Pie segments */}
                    <g transform="translate(100, 100)">
                      {/* Basic Plan - 45% */}
                      <path
                        d="M 0 -80 A 80 80 0 0 1 56.57 -56.57 L 0 0 Z"
                        fill="#3b82f6"
                        stroke="white"
                        strokeWidth="2"
                      />
                      {/* Pro Plan - 35% */}
                      <path
                        d="M 56.57 -56.57 A 80 80 0 0 1 25.71 75.43 L 0 0 Z"
                        fill="#10b981"
                        stroke="white"
                        strokeWidth="2"
                      />
                      {/* Enterprise Plan - 20% */}
                      <path
                        d="M 25.71 75.43 A 80 80 0 0 1 0 -80 L 0 0 Z"
                        fill="#f59e0b"
                        stroke="white"
                        strokeWidth="2"
                      />
                      
                      {/* Labels */}
                      <text x="30" y="-40" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">45%</text>
                      <text x="40" y="20" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">35%</text>
                      <text x="-15" y="40" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">20%</text>
                    </g>
                  </svg>
                </div>
                
                {/* Legend */}
                <div style={{ flex: 1, paddingLeft: "2rem" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <div style={{ width: "16px", height: "16px", backgroundColor: "#3b82f6", borderRadius: "3px" }}></div>
                      <div>
                        <div style={{ fontSize: "0.875rem", fontWeight: "500", color: "#1f2937" }}>Basic Plan</div>
                        <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>45% (18 users)</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <div style={{ width: "16px", height: "16px", backgroundColor: "#10b981", borderRadius: "3px" }}></div>
                      <div>
                        <div style={{ fontSize: "0.875rem", fontWeight: "500", color: "#1f2937" }}>Pro Plan</div>
                        <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>35% (14 users)</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <div style={{ width: "16px", height: "16px", backgroundColor: "#f59e0b", borderRadius: "3px" }}></div>
                      <div>
                        <div style={{ fontSize: "0.875rem", fontWeight: "500", color: "#1f2937" }}>Enterprise Plan</div>
                        <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>20% (8 users)</div>
                      </div>
                    </div>
                  </div>
                </div>
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

      case "app-listings":
        return (
          <div>
            <h3>📱 App Listings</h3>
            <p>View and manage all app listings in the marketplace.</p>
          </div>
        );

      case "add-new-app":
        return (
          <div>
            <h3>➕ Add New App</h3>
            <p>Add new applications to the marketplace.</p>
          </div>
        );

      case "manage-categories":
        return (
          <div>
            <h3>📂 Manage Categories</h3>
            <p>Organize and manage app categories.</p>
          </div>
        );

      case "app-requests":
        return (
          <div>
            <h3>📋 App Requests</h3>
            <p>Review and process app submission requests.</p>
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
    { 
      id: "marketplace-mgmt", 
      label: "Marketplace Mgmt", 
      icon: "🛒", 
      hasSubmenu: true,
      submenu: [
        { id: "app-listings", label: "App Listings", icon: "📱" },
        { id: "add-new-app", label: "Add New App", icon: "➕" },
        { id: "manage-categories", label: "Manage Categories", icon: "📂" },
        { id: "app-requests", label: "App Requests", icon: "📋" }
      ]
    },
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
        overflowY: "auto",
        display: "flex",
        flexDirection: "column"
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
        <nav style={{ padding: "1rem", flex: 1 }}>
          {menuItems.map((item) => (
            <div key={item.id}>
              <div
                onClick={() => {
                  if (item.hasSubmenu) {
                    toggleSubmenu(item.id);
                  } else {
                    setActiveSection(item.id);
                  }
                }}
                style={activeSection === item.id ? activeMenuStyle : menuStyle}
              >
                <span>{item.icon}</span>
                <span style={{ flex: 1 }}>{item.label}</span>
                {item.hasSubmenu && (
                  <span style={{ 
                    fontSize: "0.75rem", 
                    transition: "transform 0.2s",
                    transform: expandedMenus[item.id] ? "rotate(180deg)" : "rotate(0deg)"
                  }}>
                    ▼
                  </span>
                )}
              </div>
              
              {/* Submenu */}
              {item.hasSubmenu && item.submenu && expandedMenus[item.id] && (
                <div style={{ marginLeft: "1rem", marginTop: "0.25rem" }}>
                  {item.submenu.map((subItem) => (
                    <div
                      key={subItem.id}
                      onClick={() => setActiveSection(subItem.id)}
                      style={{
                        ...menuStyle,
                        padding: "0.5rem 1rem",
                        fontSize: "0.8rem",
                        color: activeSection === subItem.id ? "#10b981" : "#9ca3af",
                        background: activeSection === subItem.id ? "rgba(16, 185, 129, 0.1)" : "transparent"
                      }}
                    >
                      <span>{subItem.icon}</span>
                      <span style={{ flex: 1 }}>{subItem.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div style={{ marginTop: "auto", padding: "1rem" }}>
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
              {user.avatar}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: "500" }}>{user.name}</div>
              <div style={{ color: "#94a3b8", fontSize: "0.75rem" }}>{user.email}</div>
            </div>
            <button
              onClick={handleLogout}
              style={{
                background: "#ef4444",
                color: "white",
                border: "none",
                padding: "0.5rem 0.75rem",
                borderRadius: "4px",
                fontSize: "0.75rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.25rem"
              }}
              title="Logout"
            >
              🚪 Logout
            </button>
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
