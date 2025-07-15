import React, { useState, useEffect } from "react";

const AdminDashboard = () => {
  // State variables
  const [isAdmin, setIsAdmin] = useState(true);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [activeSettingsTab, setActiveSettingsTab] = useState("General");
  const [expandedMenus, setExpandedMenus] = useState({});
  const [userCurrency, setUserCurrency] = useState({
    code: "USD",
    symbol: "$",
    rate: 1,
  });
  const [user, setUser] = useState({
    name: "Admin User",
    email: "admin@saasible.com",
    avatar: "AU",
  });

  // Handler functions
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      setIsAdmin(false);
    }
  };

  const toggleSubmenu = (menuId) => {
    setExpandedMenus((prev) => ({ ...prev, [menuId]: !prev[menuId] }));
  };

  // Currency utility functions
  const convertPrice = (usdPrice) => {
    const convertedPrice = usdPrice * userCurrency.rate;
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
          DE: { code: "EUR", symbol: "€", rate: 0.85 },
          IN: { code: "INR", symbol: "₹", rate: 83 },
          // Add more currencies as needed
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
    setIsAdmin(true); // Simulate fetching admin status
  }, []);

  // Access Denied Guard Clause
  if (!isAdmin) {
    return (
      <div style={{ padding: "2rem", color: "red" }}>
        <h2>Access Denied</h2>
        <p>You do not have permission to access the Admin Dashboard.</p>
      </div>
    );
  }

  // --- SETTINGS PAGE STYLES AND RENDER FUNCTIONS ---

  // [+] FIXED: Removed TypeScript type annotation
  const settingsStyles = {
    pageContainer: {
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      color: "#111827",
    },
    mainHeading: {
      fontSize: "2rem",
      fontWeight: "600",
      marginBottom: "0.5rem",
      color: "#1f2937",
    },
    subheading: {
      fontSize: "1rem",
      color: "#6B7280",
      marginTop: "0.5rem",
      marginBottom: "2rem",
    },
    tabsContainer: {
      display: "flex",
      borderBottom: "1px solid #E5E7EB",
      marginBottom: "2rem",
    },
    tab: {
      padding: "0.75rem 1rem",
      fontSize: "0.875rem",
      cursor: "pointer",
      backgroundColor: "transparent",
      border: "none",
      borderBottom: "2px solid transparent",
      color: "#6B7280",
      marginBottom: "-1px",
    },
    activeTab: {
      color: "#3B82F6",
      borderBottom: "2px solid #3B82F6",
      fontWeight: 500,
    },
    tabContentContainer: {
      background: "white",
      borderRadius: "12px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      border: "1px solid #e5e7eb",
      overflow: "hidden",
    },
    contentHeader: {
      background: "#f9fafb",
      padding: "1.5rem",
      borderBottom: "1px solid #e5e7eb",
    },
    contentBody: {
      padding: "1.5rem",
    },
    contentHeading: {
      fontSize: "1.125rem",
      fontWeight: "600",
      color: "#1f2937",
      marginBottom: "0.5rem",
    },
    contentSubheading: {
      fontSize: "0.875rem",
      color: "#6B7280",
      marginTop: 0,
    },
    formGroup: {
      marginBottom: "1.5rem",
    },
    label: {
      display: "block",
      fontWeight: 600,
      marginBottom: "0.5rem",
      color: "#374151",
      fontSize: "0.875rem",
    },
    input: {
      width: "100%",
      padding: "0.75rem",
      border: "1px solid #D1D5DB",
      borderRadius: "0.375rem",
      fontSize: "0.875rem",
      boxSizing: "border-box",
    },
    textarea: {
      minHeight: "80px",
      resize: "vertical",
    },
    button: {
      background: "#3b82f6",
      color: "white",
      border: "none",
      padding: "0.75rem 1.5rem",
      borderRadius: "8px",
      fontSize: "0.875rem",
      fontWeight: "500",
      cursor: "pointer",
      transition: "background-color 0.2s",
    },
    footerActions: {
      marginTop: "1.5rem",
      paddingTop: "1.5rem",
      borderTop: "1px solid #e5e7eb",
      display: "flex",
      justifyContent: "flex-end",
    },
  };

  const renderSettingsTabContent = () => {
    switch (activeSettingsTab) {
      case "General":
        return (
          <div style={settingsStyles.tabContentContainer}>
            <div style={settingsStyles.contentHeader}>
              <h3 style={settingsStyles.contentHeading}>
                Platform Information
              </h3>
              <p style={settingsStyles.contentSubheading}>
                Basic information about your SaaS platform.
              </p>
            </div>
            <div style={settingsStyles.contentBody}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1.5rem",
                }}
              >
                <div style={settingsStyles.formGroup}>
                  <label style={settingsStyles.label} htmlFor="platformName">
                    Platform Name
                  </label>
                  <input
                    style={settingsStyles.input}
                    type="text"
                    id="platformName"
                    defaultValue="SaaSible Platform"
                  />
                </div>
                <div style={settingsStyles.formGroup}>
                  <label style={settingsStyles.label} htmlFor="platformUrl">
                    Platform URL
                  </label>
                  <input
                    style={settingsStyles.input}
                    type="url"
                    id="platformUrl"
                    defaultValue="https://saasible.platform.com"
                  />
                </div>
              </div>
              <div style={settingsStyles.formGroup}>
                <label
                  style={settingsStyles.label}
                  htmlFor="platformDescription"
                >
                  Platform Description
                </label>
                <textarea
                  style={{
                    ...settingsStyles.input,
                    ...settingsStyles.textarea,
                  }}
                  id="platformDescription"
                  rows={4}
                  defaultValue="A comprehensive SaaS platform for building and launching your own software service."
                ></textarea>
              </div>
              <div style={settingsStyles.footerActions}>
                <button
                  style={settingsStyles.button}
                  onClick={() => alert("Platform information saved!")}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        );
      case "Security":
        return (
          <div style={settingsStyles.tabContentContainer}>
            <div style={settingsStyles.contentHeader}>
              <h3 style={settingsStyles.contentHeading}>Security Settings</h3>
              <p style={settingsStyles.contentSubheading}>
                Manage your account security, authentication, and API access controls.
              </p>
            </div>
            <div style={settingsStyles.contentBody}>
              {/* Password & Authentication Section */}
              <div style={{ marginBottom: "2.5rem" }}>
                <h4 style={{ fontSize: "1rem", fontWeight: "600", color: "#1f2937", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span>🔒</span>
                  Password & Authentication
                </h4>
                
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" }}>
                  <div style={settingsStyles.formGroup}>
                    <label style={settingsStyles.label} htmlFor="currentPassword">Current Password</label>
                    <input
                      style={settingsStyles.input}
                      type="password"
                      id="currentPassword"
                      placeholder="Enter current password"
                    />
                  </div>
                  <div style={settingsStyles.formGroup}>
                    <label style={settingsStyles.label} htmlFor="newPassword">New Password</label>
                    <input
                      style={settingsStyles.input}
                      type="password"
                      id="newPassword"
                      placeholder="Enter new password"
                    />
                  </div>
                </div>

                <div style={settingsStyles.formGroup}>
                  <label style={settingsStyles.label} htmlFor="confirmPassword">Confirm New Password</label>
                  <input
                    style={settingsStyles.input}
                    type="password"
                    id="confirmPassword"
                    placeholder="Confirm new password"
                  />
                </div>

                <div style={{ marginBottom: "1.5rem" }}>
                  <h5 style={{ fontSize: "0.875rem", fontWeight: "600", color: "#374151", marginBottom: "0.5rem" }}>Password Requirements:</h5>
                  <ul style={{ fontSize: "0.75rem", color: "#6b7280", paddingLeft: "1rem", lineHeight: "1.5" }}>
                    <li>At least 8 characters long</li>
                    <li>Contains uppercase and lowercase letters</li>
                    <li>Contains at least one number</li>
                    <li>Contains at least one special character</li>
                  </ul>
                </div>

                <button
                  style={settingsStyles.button}
                  onClick={() => alert("Password updated successfully!")}
                >
                  Update Password
                </button>
              </div>

              {/* Two-Factor Authentication Section */}
              <div style={{ marginBottom: "2.5rem", paddingTop: "2rem", borderTop: "1px solid #e5e7eb" }}>
                <h4 style={{ fontSize: "1rem", fontWeight: "600", color: "#1f2937", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span>📱</span>
                  Two-Factor Authentication (2FA)
                </h4>
                
                <div style={{ background: "#f9fafb", padding: "1rem", borderRadius: "8px", marginBottom: "1.5rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: "0.875rem", fontWeight: "500", color: "#1f2937" }}>2FA Status</div>
                      <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>Add an extra layer of security to your account</div>
                    </div>
                    <div>
                      <span style={{
                        padding: "0.25rem 0.75rem",
                        background: "#fee2e2",
                        color: "#991b1b",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        fontWeight: "500"
                      }}>
                        Disabled
                      </span>
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  <button
                    style={{
                      ...settingsStyles.button,
                      background: "#10b981"
                    }}
                    onClick={() => alert("Setting up 2FA with authenticator app...")}
                  >
                    Enable 2FA
                  </button>
                  <button
                    style={{
                      ...settingsStyles.button,
                      background: "transparent",
                      color: "#6b7280",
                      border: "1px solid #d1d5db"
                    }}
                    onClick={() => alert("Backup codes will be generated...")}
                  >
                    Generate Backup Codes
                  </button>
                </div>
              </div>

              {/* API Keys & Access Tokens Section */}
              <div style={{ marginBottom: "2.5rem", paddingTop: "2rem", borderTop: "1px solid #e5e7eb" }}>
                <h4 style={{ fontSize: "1rem", fontWeight: "600", color: "#1f2937", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span>🔑</span>
                  API Keys & Access Tokens
                </h4>
                
                <p style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "1.5rem" }}>
                  Manage API keys for platform integrations and third-party access.
                </p>

                <div style={{
                  background: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  overflow: "hidden",
                  marginBottom: "1.5rem"
                }}>
                  {/* API Keys Table Header */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "200px 150px 120px 100px 100px",
                    gap: "1rem",
                    padding: "0.75rem 1rem",
                    background: "#f9fafb",
                    borderBottom: "1px solid #e5e7eb",
                    fontSize: "0.75rem",
                    fontWeight: "600",
                    color: "#374151"
                  }}>
                    <div>Key Name</div>
                    <div>Permissions</div>
                    <div>Created</div>
                    <div>Status</div>
                    <div>Actions</div>
                  </div>

                  {/* Sample API Key Row */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "200px 150px 120px 100px 100px",
                    gap: "1rem",
                    padding: "0.75rem 1rem",
                    borderBottom: "1px solid #f3f4f6",
                    alignItems: "center",
                    fontSize: "0.875rem"
                  }}>
                    <div>
                      <div style={{ fontWeight: "500", color: "#1f2937" }}>Platform Integration</div>
                      <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>pk_test_****7890</div>
                    </div>
                    <div>
                      <span style={{
                        padding: "0.25rem 0.5rem",
                        background: "#dbeafe",
                        color: "#1e40af",
                        borderRadius: "12px",
                        fontSize: "0.75rem"
                      }}>
                        Read/Write
                      </span>
                    </div>
                    <div style={{ color: "#6b7280" }}>Jan 15, 2025</div>
                    <div>
                      <span style={{
                        padding: "0.25rem 0.5rem",
                        background: "#dcfce7",
                        color: "#166534",
                        borderRadius: "12px",
                        fontSize: "0.75rem"
                      }}>
                        Active
                      </span>
                    </div>
                    <div>
                      <button style={{
                        background: "transparent",
                        border: "none",
                        color: "#ef4444",
                        cursor: "pointer",
                        fontSize: "0.75rem",
                        padding: "0.25rem"
                      }}
                      onClick={() => alert("Revoke API key?")}
                      >
                        Revoke
                      </button>
                    </div>
                  </div>

                  {/* Empty state for more keys */}
                  <div style={{
                    padding: "2rem",
                    textAlign: "center",
                    color: "#6b7280",
                    fontSize: "0.875rem"
                  }}>
                    <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🔑</div>
                    <p>No additional API keys configured</p>
                  </div>
                </div>

                <button
                  style={settingsStyles.button}
                  onClick={() => alert("Create new API key dialog would open")}
                >
                  Generate New API Key
                </button>
              </div>

              {/* Session Management Section */}
              <div style={{ marginBottom: "2.5rem", paddingTop: "2rem", borderTop: "1px solid #e5e7eb" }}>
                <h4 style={{ fontSize: "1rem", fontWeight: "600", color: "#1f2937", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span>🖥️</span>
                  Active Sessions
                </h4>
                
                <p style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "1.5rem" }}>
                  Monitor and manage your active login sessions across different devices.
                </p>

                <div style={{
                  background: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  overflow: "hidden",
                  marginBottom: "1.5rem"
                }}>
                  {/* Current Session */}
                  <div style={{
                    padding: "1rem",
                    borderBottom: "1px solid #f3f4f6",
                    background: "#f0fdf4"
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                          <span style={{ fontSize: "1rem" }}>💻</span>
                          <span style={{ fontSize: "0.875rem", fontWeight: "500", color: "#1f2937" }}>Current Session</span>
                          <span style={{
                            padding: "0.125rem 0.5rem",
                            background: "#dcfce7",
                            color: "#166534",
                            borderRadius: "12px",
                            fontSize: "0.75rem"
                          }}>
                            Active
                          </span>
                        </div>
                        <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                          Chrome on Windows • IP: 192.168.1.100 • Last activity: Now
                        </div>
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                        This device
                      </div>
                    </div>
                  </div>

                  {/* Other Sessions */}
                  <div style={{ padding: "1rem", borderBottom: "1px solid #f3f4f6" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                          <span style={{ fontSize: "1rem" }}>📱</span>
                          <span style={{ fontSize: "0.875rem", fontWeight: "500", color: "#1f2937" }}>Mobile Session</span>
                        </div>
                        <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                          Safari on iPhone • IP: 192.168.1.105 • Last activity: 2 hours ago
                        </div>
                      </div>
                      <button style={{
                        background: "#ef4444",
                        color: "white",
                        border: "none",
                        padding: "0.25rem 0.75rem",
                        borderRadius: "4px",
                        fontSize: "0.75rem",
                        cursor: "pointer"
                      }}
                      onClick={() => alert("Terminate session?")}
                      >
                        Terminate
                      </button>
                    </div>
                  </div>

                  <div style={{ padding: "1rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                          <span style={{ fontSize: "1rem" }}>🖥️</span>
                          <span style={{ fontSize: "0.875rem", fontWeight: "500", color: "#1f2937" }}>Office Computer</span>
                        </div>
                        <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                          Firefox on Mac • IP: 10.0.1.50 • Last activity: 1 day ago
                        </div>
                      </div>
                      <button style={{
                        background: "#ef4444",
                        color: "white",
                        border: "none",
                        padding: "0.25rem 0.75rem",
                        borderRadius: "4px",
                        fontSize: "0.75rem",
                        cursor: "pointer"
                      }}
                      onClick={() => alert("Terminate session?")}
                      >
                        Terminate
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  style={{
                    ...settingsStyles.button,
                    background: "#ef4444"
                  }}
                  onClick={() => alert("Terminate all other sessions?")}
                >
                  Terminate All Other Sessions
                </button>
              </div>

              {/* Login & Access Logs Section */}
              <div style={{ marginBottom: "2.5rem", paddingTop: "2rem", borderTop: "1px solid #e5e7eb" }}>
                <h4 style={{ fontSize: "1rem", fontWeight: "600", color: "#1f2937", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span>📋</span>
                  Security Logs
                </h4>
                
                <p style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "1.5rem" }}>
                  Review recent login attempts and security events for your account.
                </p>

                <div style={{
                  background: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  overflow: "hidden",
                  marginBottom: "1.5rem"
                }}>
                  {/* Log Entry 1 - Successful Login */}
                  <div style={{ padding: "0.75rem 1rem", borderBottom: "1px solid #f3f4f6" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <span style={{
                          padding: "0.25rem",
                          background: "#dcfce7",
                          color: "#166534",
                          borderRadius: "50%",
                          fontSize: "0.75rem",
                          width: "24px",
                          height: "24px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}>
                          ✓
                        </span>
                        <div>
                          <div style={{ fontSize: "0.875rem", fontWeight: "500", color: "#1f2937" }}>Successful Login</div>
                          <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>Chrome on Windows • IP: 192.168.1.100</div>
                        </div>
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>2 minutes ago</div>
                    </div>
                  </div>

                  {/* Log Entry 2 - Failed Login Attempt */}
                  <div style={{ padding: "0.75rem 1rem", borderBottom: "1px solid #f3f4f6" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <span style={{
                          padding: "0.25rem",
                          background: "#fee2e2",
                          color: "#991b1b",
                          borderRadius: "50%",
                          fontSize: "0.75rem",
                          width: "24px",
                          height: "24px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}>
                          ✗
                        </span>
                        <div>
                          <div style={{ fontSize: "0.875rem", fontWeight: "500", color: "#1f2937" }}>Failed Login Attempt</div>
                          <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>Unknown device • IP: 203.0.113.45</div>
                        </div>
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>3 hours ago</div>
                    </div>
                  </div>

                  {/* Log Entry 3 - Password Change */}
                  <div style={{ padding: "0.75rem 1rem", borderBottom: "1px solid #f3f4f6" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <span style={{
                          padding: "0.25rem",
                          background: "#dbeafe",
                          color: "#1e40af",
                          borderRadius: "50%",
                          fontSize: "0.75rem",
                          width: "24px",
                          height: "24px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}>
                          🔒
                        </span>
                        <div>
                          <div style={{ fontSize: "0.875rem", fontWeight: "500", color: "#1f2937" }}>Password Changed</div>
                          <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>Chrome on Windows • IP: 192.168.1.100</div>
                        </div>
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>2 days ago</div>
                    </div>
                  </div>

                  {/* Log Entry 4 - API Key Created */}
                  <div style={{ padding: "0.75rem 1rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <span style={{
                          padding: "0.25rem",
                          background: "#f3e8ff",
                          color: "#7c3aed",
                          borderRadius: "50%",
                          fontSize: "0.75rem",
                          width: "24px",
                          height: "24px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}>
                          🔑
                        </span>
                        <div>
                          <div style={{ fontSize: "0.875rem", fontWeight: "500", color: "#1f2937" }}>API Key Created</div>
                          <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>Platform Integration key generated</div>
                        </div>
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>5 days ago</div>
                    </div>
                  </div>
                </div>

                <button
                  style={{
                    ...settingsStyles.button,
                    background: "transparent",
                    color: "#6b7280",
                    border: "1px solid #d1d5db"
                  }}
                  onClick={() => alert("Download security logs...")}
                >
                  Download Full Security Log
                </button>
              </div>

              {/* Security Preferences Section */}
              <div style={{ marginBottom: "2rem", paddingTop: "2rem", borderTop: "1px solid #e5e7eb" }}>
                <h4 style={{ fontSize: "1rem", fontWeight: "600", color: "#1f2937", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span>⚙️</span>
                  Security Preferences
                </h4>

                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {/* Email Notifications */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem", background: "#f9fafb", borderRadius: "8px" }}>
                    <div>
                      <div style={{ fontSize: "0.875rem", fontWeight: "500", color: "#1f2937" }}>Security Email Notifications</div>
                      <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>Get notified about login attempts and security changes</div>
                    </div>
                    <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                      <input type="checkbox" defaultChecked style={{ marginRight: "0.5rem" }} />
                      <span style={{ fontSize: "0.875rem", color: "#374151" }}>Enabled</span>
                    </label>
                  </div>

                  {/* Auto Logout */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem", background: "#f9fafb", borderRadius: "8px" }}>
                    <div>
                      <div style={{ fontSize: "0.875rem", fontWeight: "500", color: "#1f2937" }}>Auto Logout</div>
                      <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>Automatically log out after period of inactivity</div>
                    </div>
                    <select style={{
                      padding: "0.5rem",
                      border: "1px solid #d1d5db",
                      borderRadius: "4px",
                      fontSize: "0.875rem",
                      background: "white"
                    }}>
                      <option>Never</option>
                      <option>15 minutes</option>
                      <option selected>30 minutes</option>
                      <option>1 hour</option>
                      <option>4 hours</option>
                    </select>
                  </div>

                  {/* IP Restrictions */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem", background: "#f9fafb", borderRadius: "8px" }}>
                    <div>
                      <div style={{ fontSize: "0.875rem", fontWeight: "500", color: "#1f2937" }}>IP Address Restrictions</div>
                      <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>Restrict access to specific IP addresses or ranges</div>
                    </div>
                    <button
                      style={{
                        background: "#3b82f6",
                        color: "white",
                        border: "none",
                        padding: "0.5rem 1rem",
                        borderRadius: "4px",
                        fontSize: "0.75rem",
                        cursor: "pointer"
                      }}
                      onClick={() => alert("Configure IP restrictions...")}
                    >
                      Configure
                    </button>
                  </div>
                </div>
              </div>

              <div style={settingsStyles.footerActions}>
                <button
                  style={settingsStyles.button}
                  onClick={() => alert("Security settings saved!")}
                >
                  Save Security Settings
                </button>
              </div>
            </div>
          </div>
        );
      case "Notifications":
        return (
          <div style={settingsStyles.tabContentContainer}>
            <div style={settingsStyles.contentHeader}>
              <h3 style={settingsStyles.contentHeading}>
                Notification Preferences
              </h3>
              <p style={settingsStyles.contentSubheading}>
                Choose what you receive notifications about and how you want to be notified.
              </p>
            </div>
            <div style={settingsStyles.contentBody}>
              {/* Email Notifications Section */}
              <div style={{ marginBottom: "2.5rem" }}>
                <h4 style={{ fontSize: "1rem", fontWeight: "600", color: "#1f2937", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span>📧</span>
                  Email Notifications
                </h4>
                
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem", background: "#f9fafb", borderRadius: "8px", border: "1px solid #e5e7eb" }}>
                    <div>
                      <div style={{ fontSize: "0.875rem", fontWeight: "500", color: "#1f2937" }}>New User Registrations</div>
                      <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>Get notified when new users sign up</div>
                    </div>
                    <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                      <input type="checkbox" defaultChecked style={{ marginRight: "0.5rem" }} />
                      <span style={{ fontSize: "0.875rem", color: "#374151" }}>Enabled</span>
                    </label>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem", background: "#f9fafb", borderRadius: "8px", border: "1px solid #e5e7eb" }}>
                    <div>
                      <div style={{ fontSize: "0.875rem", fontWeight: "500", color: "#1f2937" }}>Payment Confirmations</div>
                      <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>Get notified about successful payments</div>
                    </div>
                    <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                      <input type="checkbox" defaultChecked style={{ marginRight: "0.5rem" }} />
                      <span style={{ fontSize: "0.875rem", color: "#374151" }}>Enabled</span>
                    </label>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem", background: "#f9fafb", borderRadius: "8px", border: "1px solid #e5e7eb" }}>
                    <div>
                      <div style={{ fontSize: "0.875rem", fontWeight: "500", color: "#1f2937" }}>Failed Payment Attempts</div>
                      <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>Get notified about failed payments</div>
                    </div>
                    <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                      <input type="checkbox" defaultChecked style={{ marginRight: "0.5rem" }} />
                      <span style={{ fontSize: "0.875rem", color: "#374151" }}>Enabled</span>
                    </label>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem", background: "#f9fafb", borderRadius: "8px", border: "1px solid #e5e7eb" }}>
                    <div>
                      <div style={{ fontSize: "0.875rem", fontWeight: "500", color: "#1f2937" }}>New App Submissions</div>
                      <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>Get notified when apps are submitted for review</div>
                    </div>
                    <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                      <input type="checkbox" style={{ marginRight: "0.5rem" }} />
                      <span style={{ fontSize: "0.875rem", color: "#374151" }}>Enabled</span>
                    </label>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem", background: "#f9fafb", borderRadius: "8px", border: "1px solid #e5e7eb" }}>
                    <div>
                      <div style={{ fontSize: "0.875rem", fontWeight: "500", color: "#1f2937" }}>System Updates</div>
                      <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>Get notified about platform updates and maintenance</div>
                    </div>
                    <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                      <input type="checkbox" defaultChecked style={{ marginRight: "0.5rem" }} />
                      <span style={{ fontSize: "0.875rem", color: "#374151" }}>Enabled</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Push Notifications Section */}
              <div style={{ marginBottom: "2.5rem", paddingTop: "2rem", borderTop: "1px solid #e5e7eb" }}>
                <h4 style={{ fontSize: "1rem", fontWeight: "600", color: "#1f2937", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span>🔔</span>
                  Push Notifications
                </h4>
                
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem", background: "#f9fafb", borderRadius: "8px", border: "1px solid #e5e7eb" }}>
                    <div>
                      <div style={{ fontSize: "0.875rem", fontWeight: "500", color: "#1f2937" }}>Browser Push Notifications</div>
                      <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>Receive notifications directly in your browser</div>
                    </div>
                    <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                      <input type="checkbox" style={{ marginRight: "0.5rem" }} />
                      <span style={{ fontSize: "0.875rem", color: "#374151" }}>Enabled</span>
                    </label>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem", background: "#f9fafb", borderRadius: "8px", border: "1px solid #e5e7eb" }}>
                    <div>
                      <div style={{ fontSize: "0.875rem", fontWeight: "500", color: "#1f2937" }}>Mobile App Notifications</div>
                      <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>Get notifications on your mobile device</div>
                    </div>
                    <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                      <input type="checkbox" style={{ marginRight: "0.5rem" }} />
                      <span style={{ fontSize: "0.875rem", color: "#374151" }}>Enabled</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Notification Frequency Section */}
              <div style={{ marginBottom: "2.5rem", paddingTop: "2rem", borderTop: "1px solid #e5e7eb" }}>
                <h4 style={{ fontSize: "1rem", fontWeight: "600", color: "#1f2937", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span>⏰</span>
                  Notification Frequency
                </h4>
                
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                  <div style={settingsStyles.formGroup}>
                    <label style={settingsStyles.label}>Email Digest Frequency</label>
                    <select style={settingsStyles.input}>
                      <option>Real-time</option>
                      <option>Daily</option>
                      <option selected>Weekly</option>
                      <option>Monthly</option>
                      <option>Never</option>
                    </select>
                  </div>

                  <div style={settingsStyles.formGroup}>
                    <label style={settingsStyles.label}>Report Frequency</label>
                    <select style={settingsStyles.input}>
                      <option>Daily</option>
                      <option selected>Weekly</option>
                      <option>Monthly</option>
                      <option>Quarterly</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Notification Channels Section */}
              <div style={{ marginBottom: "2rem", paddingTop: "2rem", borderTop: "1px solid #e5e7eb" }}>
                <h4 style={{ fontSize: "1rem", fontWeight: "600", color: "#1f2937", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span>📱</span>
                  Notification Channels
                </h4>
                
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div style={settingsStyles.formGroup}>
                    <label style={settingsStyles.label}>Slack Webhook URL</label>
                    <input
                      style={settingsStyles.input}
                      type="url"
                      placeholder="https://hooks.slack.com/services/..."
                    />
                    <div style={{ fontSize: "0.75rem", color: "#6b7280", marginTop: "0.5rem" }}>
                      Send notifications to your Slack workspace
                    </div>
                  </div>

                  <div style={settingsStyles.formGroup}>
                    <label style={settingsStyles.label}>Discord Webhook URL</label>
                    <input
                      style={settingsStyles.input}
                      type="url"
                      placeholder="https://discord.com/api/webhooks/..."
                    />
                    <div style={{ fontSize: "0.75rem", color: "#6b7280", marginTop: "0.5rem" }}>
                      Send notifications to your Discord server
                    </div>
                  </div>
                </div>
              </div>

              <div style={settingsStyles.footerActions}>
                <button
                  style={settingsStyles.button}
                  onClick={() => alert("Notification settings saved!")}
                >
                  Save Notification Settings
                </button>
              </div>
            </div>
          </div>
        );
      case "Billing":
        return (
          <div style={settingsStyles.tabContentContainer}>
            <div style={settingsStyles.contentHeader}>
              <h3 style={settingsStyles.contentHeading}>Billing Details</h3>
              <p style={settingsStyles.contentSubheading}>
                Manage platform-wide billing information and payment methods.
              </p>
            </div>
            <div style={settingsStyles.contentBody}>
              {/* Current Plan Section */}
              <div style={{ marginBottom: "2.5rem" }}>
                <h4 style={{ fontSize: "1rem", fontWeight: "600", color: "#1f2937", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span>📋</span>
                  Current Plan
                </h4>
                
                <div style={{ background: "#f9fafb", padding: "1.5rem", borderRadius: "8px", border: "1px solid #e5e7eb" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                    <div>
                      <div style={{ fontSize: "1.125rem", fontWeight: "600", color: "#1f2937" }}>Professional Plan</div>
                      <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>For growing businesses</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "1.5rem", fontWeight: "600", color: "#1f2937" }}>{formatCurrency(99)}/month</div>
                      <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>Billed monthly</div>
                    </div>
                  </div>
                  
                  <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                    <button
                      style={{
                        ...settingsStyles.button,
                        background: "#10b981"
                      }}
                      onClick={() => alert("Upgrade plan clicked!")}
                    >
                      Upgrade Plan
                    </button>
                    <button
                      style={{
                        ...settingsStyles.button,
                        background: "transparent",
                        color: "#6b7280",
                        border: "1px solid #d1d5db"
                      }}
                      onClick={() => alert("View all plans clicked!")}
                    >
                      View All Plans
                    </button>
                  </div>
                </div>
              </div>

              {/* Payment Methods Section */}
              <div style={{ marginBottom: "2.5rem", paddingTop: "2rem", borderTop: "1px solid #e5e7eb" }}>
                <h4 style={{ fontSize: "1rem", fontWeight: "600", color: "#1f2937", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span>💳</span>
                  Payment Methods
                </h4>
                
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem", background: "#f9fafb", borderRadius: "8px", border: "1px solid #e5e7eb" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <div style={{ fontSize: "1.5rem" }}>💳</div>
                      <div>
                        <div style={{ fontSize: "0.875rem", fontWeight: "500", color: "#1f2937" }}>•••• •••• •••• 4242</div>
                        <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>Visa ending in 4242 • Expires 12/25</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <span style={{
                        padding: "0.25rem 0.5rem",
                        background: "#dcfce7",
                        color: "#166534",
                        borderRadius: "12px",
                        fontSize: "0.75rem"
                      }}>
                        Primary
                      </span>
                      <button style={{
                        background: "transparent",
                        border: "1px solid #d1d5db",
                        color: "#6b7280",
                        padding: "0.25rem 0.5rem",
                        borderRadius: "4px",
                        fontSize: "0.75rem",
                        cursor: "pointer"
                      }}>
                        Edit
                      </button>
                    </div>
                  </div>

                  <button
                    style={{
                      background: "transparent",
                      border: "2px dashed #d1d5db",
                      color: "#6b7280",
                      padding: "1rem",
                      borderRadius: "8px",
                      fontSize: "0.875rem",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem"
                    }}
                    onClick={() => alert("Add payment method clicked!")}
                  >
                    <span>➕</span>
                    Add Payment Method
                  </button>
                </div>
              </div>

              {/* Billing Information Section */}
              <div style={{ marginBottom: "2.5rem", paddingTop: "2rem", borderTop: "1px solid #e5e7eb" }}>
                <h4 style={{ fontSize: "1rem", fontWeight: "600", color: "#1f2937", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span>🏢</span>
                  Billing Information
                </h4>
                
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                  <div style={settingsStyles.formGroup}>
                    <label style={settingsStyles.label}>Company Name</label>
                    <input
                      style={settingsStyles.input}
                      type="text"
                      defaultValue="SaaSible Inc."
                    />
                  </div>

                  <div style={settingsStyles.formGroup}>
                    <label style={settingsStyles.label}>Tax ID / VAT Number</label>
                    <input
                      style={settingsStyles.input}
                      type="text"
                      placeholder="Enter tax ID"
                    />
                  </div>

                  <div style={settingsStyles.formGroup}>
                    <label style={settingsStyles.label}>Billing Email</label>
                    <input
                      style={settingsStyles.input}
                      type="email"
                      defaultValue="billing@saasible.com"
                    />
                  </div>

                  <div style={settingsStyles.formGroup}>
                    <label style={settingsStyles.label}>Country</label>
                    <select style={settingsStyles.input}>
                      <option>United States</option>
                      <option>Canada</option>
                      <option>United Kingdom</option>
                      <option>Germany</option>
                      <option>France</option>
                      <option>Australia</option>
                    </select>
                  </div>
                </div>

                <div style={settingsStyles.formGroup}>
                  <label style={settingsStyles.label}>Billing Address</label>
                  <textarea
                    style={{
                      ...settingsStyles.input,
                      ...settingsStyles.textarea,
                      minHeight: "80px"
                    }}
                    placeholder="Enter your billing address"
                  />
                </div>
              </div>

              {/* Invoices Section */}
              <div style={{ marginBottom: "2rem", paddingTop: "2rem", borderTop: "1px solid #e5e7eb" }}>
                <h4 style={{ fontSize: "1rem", fontWeight: "600", color: "#1f2937", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span>🧾</span>
                  Recent Invoices
                </h4>
                
                <div style={{ border: "1px solid #e5e7eb", borderRadius: "8px", overflow: "hidden" }}>
                  <div style={{ background: "#f9fafb", padding: "0.75rem 1rem", borderBottom: "1px solid #e5e7eb", display: "grid", gridTemplateColumns: "150px 1fr 120px 100px", gap: "1rem", fontSize: "0.875rem", fontWeight: "600", color: "#374151" }}>
                    <div>Invoice #</div>
                    <div>Date</div>
                    <div>Amount</div>
                    <div>Status</div>
                  </div>
                  
                  <div style={{ padding: "0.75rem 1rem", borderBottom: "1px solid #f3f4f6", display: "grid", gridTemplateColumns: "150px 1fr 120px 100px", gap: "1rem", fontSize: "0.875rem", alignItems: "center" }}>
                    <div style={{ color: "#3b82f6", fontWeight: "500" }}>INV-2025-001</div>
                    <div style={{ color: "#6b7280" }}>January 15, 2025</div>
                    <div style={{ color: "#1f2937" }}>{formatCurrency(99.00)}</div>
                    <div>
                      <span style={{ padding: "0.25rem 0.5rem", background: "#dcfce7", color: "#166534", borderRadius: "12px", fontSize: "0.75rem" }}>
                        Paid
                      </span>
                    </div>
                  </div>
                  
                  <div style={{ padding: "0.75rem 1rem", borderBottom: "1px solid #f3f4f6", display: "grid", gridTemplateColumns: "150px 1fr 120px 100px", gap: "1rem", fontSize: "0.875rem", alignItems: "center" }}>
                    <div style={{ color: "#3b82f6", fontWeight: "500" }}>INV-2024-012</div>
                    <div style={{ color: "#6b7280" }}>December 15, 2024</div>
                    <div style={{ color: "#1f2937" }}>{formatCurrency(99.00)}</div>
                    <div>
                      <span style={{ padding: "0.25rem 0.5rem", background: "#dcfce7", color: "#166534", borderRadius: "12px", fontSize: "0.75rem" }}>
                        Paid
                      </span>
                    </div>
                  </div>
                  
                  <div style={{ padding: "0.75rem 1rem", display: "grid", gridTemplateColumns: "150px 1fr 120px 100px", gap: "1rem", fontSize: "0.875rem", alignItems: "center" }}>
                    <div style={{ color: "#3b82f6", fontWeight: "500" }}>INV-2024-011</div>
                    <div style={{ color: "#6b7280" }}>November 15, 2024</div>
                    <div style={{ color: "#1f2937" }}>{formatCurrency(99.00)}</div>
                    <div>
                      <span style={{ padding: "0.25rem 0.5rem", background: "#dcfce7", color: "#166534", borderRadius: "12px", fontSize: "0.75rem" }}>
                        Paid
                      </span>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: "1rem", textAlign: "center" }}>
                  <button
                    style={{
                      background: "transparent",
                      border: "1px solid #d1d5db",
                      color: "#6b7280",
                      padding: "0.5rem 1rem",
                      borderRadius: "6px",
                      fontSize: "0.875rem",
                      cursor: "pointer"
                    }}
                    onClick={() => alert("View all invoices clicked!")}
                  >
                    View All Invoices
                  </button>
                </div>
              </div>

              <div style={settingsStyles.footerActions}>
                <button
                  style={settingsStyles.button}
                  onClick={() => alert("Billing settings saved!")}
                >
                  Save Billing Settings
                </button>
              </div>
            </div>
          </div>
        );
      case "Integrations":
        return (
          <div style={settingsStyles.tabContentContainer}>
            <div style={settingsStyles.contentHeader}>
              <h3 style={settingsStyles.contentHeading}>Integrations</h3>
              <p style={settingsStyles.contentSubheading}>
                Connect with third-party services to enhance your platform functionality.
              </p>
            </div>
            <div style={settingsStyles.contentBody}>
              {/* Popular Integrations Section */}
              <div style={{ marginBottom: "2.5rem" }}>
                <h4 style={{ fontSize: "1rem", fontWeight: "600", color: "#1f2937", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span>⭐</span>
                  Popular Integrations
                </h4>
                
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
                  <div style={{ border: "1px solid #e5e7eb", borderRadius: "8px", padding: "1.5rem", background: "#f9fafb" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                      <div style={{ fontSize: "2rem" }}>📧</div>
                      <div>
                        <div style={{ fontSize: "1rem", fontWeight: "600", color: "#1f2937" }}>SendGrid</div>
                        <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>Email delivery service</div>
                      </div>
                    </div>
                    <p style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "1rem" }}>
                      Send transactional emails, newsletters, and notifications to your users.
                    </p>
                    <button
                      style={{
                        ...settingsStyles.button,
                        background: "#10b981",
                        width: "100%"
                      }}
                      onClick={() => alert("Connect SendGrid clicked!")}
                    >
                      Connect
                    </button>
                  </div>

                  <div style={{ border: "1px solid #e5e7eb", borderRadius: "8px", padding: "1.5rem", background: "#f9fafb" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                      <div style={{ fontSize: "2rem" }}>💳</div>
                      <div>
                        <div style={{ fontSize: "1rem", fontWeight: "600", color: "#1f2937" }}>Stripe</div>
                        <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>Payment processing</div>
                      </div>
                    </div>
                    <p style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "1rem" }}>
                      Accept credit card payments and manage subscriptions for your platform.
                    </p>
                    <button
                      style={{
                        ...settingsStyles.button,
                        background: "#dcfce7",
                        color: "#166534",
                        width: "100%"
                      }}
                      onClick={() => alert("Stripe already connected!")}
                    >
                      ✓ Connected
                    </button>
                  </div>

                  <div style={{ border: "1px solid #e5e7eb", borderRadius: "8px", padding: "1.5rem", background: "#f9fafb" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                      <div style={{ fontSize: "2rem" }}>💬</div>
                      <div>
                        <div style={{ fontSize: "1rem", fontWeight: "600", color: "#1f2937" }}>Slack</div>
                        <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>Team communication</div>
                      </div>
                    </div>
                    <p style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "1rem" }}>
                      Send notifications and updates directly to your Slack workspace.
                    </p>
                    <button
                      style={{
                        ...settingsStyles.button,
                        background: "#10b981",
                        width: "100%"
                      }}
                      onClick={() => alert("Connect Slack clicked!")}
                    >
                      Connect
                    </button>
                  </div>

                  <div style={{ border: "1px solid #e5e7eb", borderRadius: "8px", padding: "1.5rem", background: "#f9fafb" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                      <div style={{ fontSize: "2rem" }}>📊</div>
                      <div>
                        <div style={{ fontSize: "1rem", fontWeight: "600", color: "#1f2937" }}>Google Analytics</div>
                        <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>Web analytics</div>
                      </div>
                    </div>
                    <p style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "1rem" }}>
                      Track user behavior and get insights about your platform usage.
                    </p>
                    <button
                      style={{
                        ...settingsStyles.button,
                        background: "#10b981",
                        width: "100%"
                      }}
                      onClick={() => alert("Connect Google Analytics clicked!")}
                    >
                      Connect
                    </button>
                  </div>
                </div>
              </div>

              {/* Connected Integrations Section */}
              <div style={{ marginBottom: "2.5rem", paddingTop: "2rem", borderTop: "1px solid #e5e7eb" }}>
                <h4 style={{ fontSize: "1rem", fontWeight: "600", color: "#1f2937", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span>🔗</span>
                  Connected Integrations
                </h4>
                
                <div style={{ border: "1px solid #e5e7eb", borderRadius: "8px", overflow: "hidden" }}>
                  <div style={{ background: "#f9fafb", padding: "0.75rem 1rem", borderBottom: "1px solid #e5e7eb", display: "grid", gridTemplateColumns: "50px 1fr 150px 120px 100px", gap: "1rem", fontSize: "0.875rem", fontWeight: "600", color: "#374151" }}>
                    <div>Icon</div>
                    <div>Service</div>
                    <div>Connected</div>
                    <div>Status</div>
                    <div>Actions</div>
                  </div>
                  
                  <div style={{ padding: "0.75rem 1rem", borderBottom: "1px solid #f3f4f6", display: "grid", gridTemplateColumns: "50px 1fr 150px 120px 100px", gap: "1rem", fontSize: "0.875rem", alignItems: "center" }}>
                    <div style={{ fontSize: "1.5rem" }}>💳</div>
                    <div>
                      <div style={{ fontWeight: "500", color: "#1f2937" }}>Stripe</div>
                      <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>Payment processing</div>
                    </div>
                    <div style={{ color: "#6b7280" }}>Jan 15, 2025</div>
                    <div>
                      <span style={{ padding: "0.25rem 0.5rem", background: "#dcfce7", color: "#166534", borderRadius: "12px", fontSize: "0.75rem" }}>
                        Active
                      </span>
                    </div>
                    <div>
                      <button style={{
                        background: "#ef4444",
                        color: "white",
                        border: "none",
                        padding: "0.25rem 0.5rem",
                        borderRadius: "4px",
                        fontSize: "0.75rem",
                        cursor: "pointer"
                      }}>
                        Disconnect
                      </button>
                    </div>
                  </div>
                  
                  <div style={{ padding: "2rem", textAlign: "center", color: "#6b7280", fontSize: "0.875rem" }}>
                    <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🔌</div>
                    <p>No other integrations connected</p>
                  </div>
                </div>
              </div>

              {/* API Configuration Section */}
              <div style={{ marginBottom: "2rem", paddingTop: "2rem", borderTop: "1px solid #e5e7eb" }}>
                <h4 style={{ fontSize: "1rem", fontWeight: "600", color: "#1f2937", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span>🔧</span>
                  API Configuration
                </h4>
                
                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  <div style={settingsStyles.formGroup}>
                    <label style={settingsStyles.label}>Platform API Endpoint</label>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <input
                        style={{ ...settingsStyles.input, flex: 1 }}
                        type="text"
                        value="https://api.saasible.com/v1"
                        readOnly
                      />
                      <button
                        style={{
                          ...settingsStyles.button,
                          background: "#6b7280",
                          padding: "0.75rem 1rem"
                        }}
                        onClick={() => alert("API endpoint copied to clipboard!")}
                      >
                        Copy
                      </button>
                    </div>
                  </div>

                  <div style={settingsStyles.formGroup}>
                    <label style={settingsStyles.label}>Webhook URL</label>
                    <input
                      style={settingsStyles.input}
                      type="url"
                      placeholder="https://your-domain.com/webhook"
                    />
                    <div style={{ fontSize: "0.75rem", color: "#6b7280", marginTop: "0.5rem" }}>
                      URL where platform events will be sent
                    </div>
                  </div>

                  <div style={settingsStyles.formGroup}>
                    <label style={settingsStyles.label}>Webhook Secret</label>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <input
                        style={{ ...settingsStyles.input, flex: 1 }}
                        type="password"
                        placeholder="Enter webhook secret"
                      />
                      <button
                        style={{
                          ...settingsStyles.button,
                          background: "#10b981",
                          padding: "0.75rem 1rem"
                        }}
                        onClick={() => alert("New webhook secret generated!")}
                      >
                        Generate
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div style={settingsStyles.footerActions}>
                <button
                  style={settingsStyles.button}
                  onClick={() => alert("Integration settings saved!")}
                >
                  Save Integration Settings
                </button>
              </div>
            </div>
          </div>
        );
      case "Appearance":
        return (
          <div style={settingsStyles.tabContentContainer}>
            <div style={settingsStyles.contentHeader}>
              <h3 style={settingsStyles.contentHeading}>Appearance</h3>
              <p style={settingsStyles.contentSubheading}>
                Customize the look and feel of your admin dashboard and platform.
              </p>
            </div>
            <div style={settingsStyles.contentBody}>
              {/* Theme Settings Section */}
              <div style={{ marginBottom: "2.5rem" }}>
                <h4 style={{ fontSize: "1rem", fontWeight: "600", color: "#1f2937", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span>🎨</span>
                  Theme Settings
                </h4>
                
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
                  <div style={{ border: "2px solid #3b82f6", borderRadius: "8px", padding: "1rem", background: "#f8faff", cursor: "pointer" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                      <div style={{ width: "20px", height: "20px", background: "#3b82f6", borderRadius: "50%" }}></div>
                      <span style={{ fontSize: "0.875rem", fontWeight: "600", color: "#1f2937" }}>Default Blue</span>
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>Professional blue theme</div>
                  </div>

                  <div style={{ border: "1px solid #e5e7eb", borderRadius: "8px", padding: "1rem", background: "#f9fafb", cursor: "pointer" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                      <div style={{ width: "20px", height: "20px", background: "#10b981", borderRadius: "50%" }}></div>
                      <span style={{ fontSize: "0.875rem", fontWeight: "600", color: "#1f2937" }}>Green</span>
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>Fresh green theme</div>
                  </div>

                  <div style={{ border: "1px solid #e5e7eb", borderRadius: "8px", padding: "1rem", background: "#f9fafb", cursor: "pointer" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                      <div style={{ width: "20px", height: "20px", background: "#8b5cf6", borderRadius: "50%" }}></div>
                      <span style={{ fontSize: "0.875rem", fontWeight: "600", color: "#1f2937" }}>Purple</span>
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>Creative purple theme</div>
                  </div>

                  <div style={{ border: "1px solid #e5e7eb", borderRadius: "8px", padding: "1rem", background: "#f9fafb", cursor: "pointer" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                      <div style={{ width: "20px", height: "20px", background: "#1f2937", borderRadius: "50%" }}></div>
                      <span style={{ fontSize: "0.875rem", fontWeight: "600", color: "#1f2937" }}>Dark Mode</span>
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>Dark theme for night use</div>
                  </div>
                </div>
              </div>

              {/* Branding Section */}
              <div style={{ marginBottom: "2.5rem", paddingTop: "2rem", borderTop: "1px solid #e5e7eb" }}>
                <h4 style={{ fontSize: "1rem", fontWeight: "600", color: "#1f2937", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span>🏢</span>
                  Platform Branding
                </h4>
                
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                  <div style={settingsStyles.formGroup}>
                    <label style={settingsStyles.label}>Platform Logo</label>
                    <div style={{
                      border: "2px dashed #d1d5db",
                      borderRadius: "8px",
                      padding: "2rem",
                      textAlign: "center",
                      background: "#fafafa",
                      cursor: "pointer"
                    }}>
                      <div style={{ fontSize: "2rem", marginBottom: "0.5rem", color: "#9ca3af" }}>🖼️</div>
                      <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>Upload logo (PNG, SVG)</div>
                      <div style={{ fontSize: "0.75rem", color: "#9ca3af" }}>Max size: 2MB</div>
                    </div>
                  </div>

                  <div style={settingsStyles.formGroup}>
                    <label style={settingsStyles.label}>Favicon</label>
                    <div style={{
                      border: "2px dashed #d1d5db",
                      borderRadius: "8px",
                      padding: "2rem",
                      textAlign: "center",
                      background: "#fafafa",
                      cursor: "pointer"
                    }}>
                      <div style={{ fontSize: "2rem", marginBottom: "0.5rem", color: "#9ca3af" }}>⭐</div>
                      <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>Upload favicon (ICO)</div>
                      <div style={{ fontSize: "0.75rem", color: "#9ca3af" }}>32x32 pixels</div>
                    </div>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginTop: "1.5rem" }}>
                  <div style={settingsStyles.formGroup}>
                    <label style={settingsStyles.label}>Platform Name</label>
                    <input
                      style={settingsStyles.input}
                      type="text"
                      defaultValue="SaaSible Platform"
                    />
                  </div>

                  <div style={settingsStyles.formGroup}>
                    <label style={settingsStyles.label}>Tagline</label>
                    <input
                      style={settingsStyles.input}
                      type="text"
                      placeholder="Your platform tagline"
                    />
                  </div>
                </div>
              </div>

              {/* Navigation Settings Section */}
              <div style={{ marginBottom: "2.5rem", paddingTop: "2rem", borderTop: "1px solid #e5e7eb" }}>
                <h4 style={{ fontSize: "1rem", fontWeight: "600", color: "#1f2937", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span>🧭</span>
                  Navigation Settings
                </h4>
                
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem", background: "#f9fafb", borderRadius: "8px", border: "1px solid #e5e7eb" }}>
                    <div>
                      <div style={{ fontSize: "0.875rem", fontWeight: "500", color: "#1f2937" }}>Sidebar Collapse</div>
                      <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>Allow users to collapse the sidebar</div>
                    </div>
                    <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                      <input type="checkbox" defaultChecked style={{ marginRight: "0.5rem" }} />
                      <span style={{ fontSize: "0.875rem", color: "#374151" }}>Enabled</span>
                    </label>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem", background: "#f9fafb", borderRadius: "8px", border: "1px solid #e5e7eb" }}>
                    <div>
                      <div style={{ fontSize: "0.875rem", fontWeight: "500", color: "#1f2937" }}>Breadcrumb Navigation</div>
                      <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>Show breadcrumb navigation on pages</div>
                    </div>
                    <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                      <input type="checkbox" defaultChecked style={{ marginRight: "0.5rem" }} />
                      <span style={{ fontSize: "0.875rem", color: "#374151" }}>Enabled</span>
                    </label>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem", background: "#f9fafb", borderRadius: "8px", border: "1px solid #e5e7eb" }}>
                    <div>
                      <div style={{ fontSize: "0.875rem", fontWeight: "500", color: "#1f2937" }}>Quick Search</div>
                      <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>Enable quick search in navigation</div>
                    </div>
                    <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                      <input type="checkbox" style={{ marginRight: "0.5rem" }} />
                      <span style={{ fontSize: "0.875rem", color: "#374151" }}>Enabled</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Custom CSS Section */}
              <div style={{ marginBottom: "2rem", paddingTop: "2rem", borderTop: "1px solid #e5e7eb" }}>
                <h4 style={{ fontSize: "1rem", fontWeight: "600", color: "#1f2937", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span>💻</span>
                  Custom CSS
                </h4>
                
                <div style={settingsStyles.formGroup}>
                  <label style={settingsStyles.label}>Additional CSS</label>
                  <textarea
                    style={{
                      ...settingsStyles.input,
                      minHeight: "120px",
                      fontFamily: "monospace",
                      fontSize: "0.875rem"
                    }}
                    placeholder="/* Add your custom CSS here */&#10;.custom-header {&#10;  background: #f0f9ff;&#10;}"
                  />
                  <div style={{ fontSize: "0.75rem", color: "#6b7280", marginTop: "0.5rem" }}>
                    Custom CSS will be applied to your admin dashboard
                  </div>
                </div>
              </div>

              <div style={settingsStyles.footerActions}>
                <button
                  style={settingsStyles.button}
                  onClick={() => alert("Appearance settings saved!")}
                >
                  Save Appearance Settings
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderSettingsPage = () => {
    const settingTabs = [
      "General",
      "Security",
      "Notifications",
      "Billing",
      "Integrations",
      "Appearance",
    ];

    return (
      <div style={settingsStyles.pageContainer}>
        <h2 style={settingsStyles.mainHeading}>Settings</h2>
        <p style={settingsStyles.subheading}>
          Configure your platform settings and preferences.
        </p>
        <div style={settingsStyles.tabsContainer}>
          {settingTabs.map((tab) => (
            <button
              key={tab}
              style={
                activeSettingsTab === tab
                  ? { ...settingsStyles.tab, ...settingsStyles.activeTab }
                  : settingsStyles.tab
              }
              onClick={() => setActiveSettingsTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        {renderSettingsTabContent()}
      </div>
    );
  };

  // --- MAIN CONTENT RENDER ---

  const renderContent = () => {
    switch (activeSection) {
      // NOTE: I am omitting the other `case` blocks (dashboard, etc.)
      // for brevity. Paste your existing case blocks here.

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
                  <div style={{ fontSize: "2rem", fontWeight: "600", color: "#1f2937" }}>{formatCurrency(10)}</div>
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
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                <div>
                  <h2 style={{ fontSize: "2rem", fontWeight: "600", color: "#1f2937", marginBottom: "0.5rem" }}>Platform Software Management</h2>
                  <p style={{ color: "#6b7280" }}>Manage your platform's core software offerings.</p>
                </div>
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
                    boxShadow: "0 2px 4px rgba(59, 130, 246, 0.3)"
                  }}
                  onClick={() => alert("Add New Platform Software clicked!")}
                >
                  <span>➕</span>
                  Add New Platform Software
                </button>
              </div>

              {/* Search Bar */}
              <div style={{ marginBottom: "2rem" }}>
                <div style={{ position: "relative", maxWidth: "500px" }}>
                  <input
                    type="text"
                    placeholder="Search software by title or description..."
                    style={{
                      width: "100%",
                      padding: "0.75rem 1rem 0.75rem 2.5rem",
                      border: "1px solid #d1d5db",
                      borderRadius: "8px",
                      fontSize: "0.875rem",
                      background: "white",
                      outline: "none"
                    }}
                  />
                  <div style={{
                    position: "absolute",
                    left: "0.75rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#9ca3af",
                    fontSize: "1rem"
                  }}>
                    🔍
                  </div>
                </div>
              </div>

              {/* Software Table */}
              <div style={{
                background: "white",
                borderRadius: "12px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                border: "1px solid #e5e7eb",
                overflow: "hidden"
              }}>
                {/* Table Header */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "80px 1fr 120px 120px 140px 100px",
                  gap: "1rem",
                  padding: "1rem 1.5rem",
                  background: "#f9fafb",
                  borderBottom: "1px solid #e5e7eb",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  color: "#6b7280"
                }}>
                  <div>Image</div>
                  <div>Title</div>
                  <div>Status</div>
                  <div>Version</div>
                  <div>Created At</div>
                  <div>Actions</div>
                </div>

                {/* Table Rows */}
                <div>
                  {/* Row 1 - CM Software */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "80px 1fr 120px 120px 140px 100px",
                    gap: "1rem",
                    padding: "1rem 1.5rem",
                    borderBottom: "1px solid #f3f4f6",
                    alignItems: "center"
                  }}>
                    <div style={{
                      width: "60px",
                      height: "60px",
                      background: "#f3f4f6",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.5rem"
                    }}>
                      💻
                    </div>
                    <div>
                      <div style={{ fontWeight: "500", color: "#1f2937", marginBottom: "0.25rem" }}>cm</div>
                      <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>Customer Management System</div>
                    </div>
                    <div>
                      <span style={{
                        padding: "0.25rem 0.75rem",
                        background: "#fef3c7",
                        color: "#92400e",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        fontWeight: "500"
                      }}>
                        N/A
                      </span>
                    </div>
                    <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>May 28, 2025</div>
                    <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>May 28, 2025</div>
                    <div>
                      <button style={{
                        background: "transparent",
                        border: "none",
                        color: "#6b7280",
                        cursor: "pointer",
                        fontSize: "1.25rem",
                        padding: "0.25rem"
                      }}>
                        ⋯
                      </button>
                    </div>
                  </div>

                  {/* Row 2 - CMS Software */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "80px 1fr 120px 120px 140px 100px",
                    gap: "1rem",
                    padding: "1rem 1.5rem",
                    alignItems: "center"
                  }}>
                    <div style={{
                      width: "60px",
                      height: "60px",
                      background: "#f3f4f6",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.5rem"
                    }}>
                      📝
                    </div>
                    <div>
                      <div style={{ fontWeight: "500", color: "#1f2937", marginBottom: "0.25rem" }}>cms</div>
                      <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>Content Management System</div>
                    </div>
                    <div>
                      <span style={{
                        padding: "0.25rem 0.75rem",
                        background: "#fef3c7",
                        color: "#92400e",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        fontWeight: "500"
                      }}>
                        N/A
                      </span>
                    </div>
                    <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>May 24, 2025</div>
                    <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>May 24, 2025</div>
                    <div>
                      <button style={{
                        background: "transparent",
                        border: "none",
                        color: "#6b7280",
                        cursor: "pointer",
                        fontSize: "1.25rem",
                        padding: "0.25rem"
                      }}>
                        ⋯
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Empty State Message */}
              <div style={{
                textAlign: "center",
                padding: "3rem 2rem",
                color: "#6b7280"
              }}>
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📦</div>
                <p style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>Platform software management ready</p>
                <p style={{ fontSize: "0.875rem" }}>Use the search above to filter software or add new platform software.</p>
              </div>
            </div>
          );

        case "platform-plans":
          return (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                <div>
                  <h2 style={{ fontSize: "2rem", fontWeight: "600", color: "#1f2937", marginBottom: "0.5rem" }}>Subscription Plans Management</h2>
                  <p style={{ color: "#6b7280" }}>Manage platform vendor plans and individual software offering plans.</p>
                </div>
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
                    boxShadow: "0 2px 4px rgba(59, 130, 246, 0.3)"
                  }}
                  onClick={() => alert("Create New Plan clicked!")}
                >
                  <span>➕</span>
                  Create New Plan
                </button>
              </div>

              {/* Plan Type Tabs */}
              <div style={{ 
                display: "flex", 
                gap: "1rem", 
                marginBottom: "2rem",
                borderBottom: "1px solid #e5e7eb"
              }}>
                <button style={{
                  padding: "0.75rem 1.5rem",
                  border: "none",
                  background: "transparent",
                  color: "#3b82f6",
                  borderBottom: "2px solid #3b82f6",
                  fontWeight: "500",
                  cursor: "pointer"
                }}>
                  Vendor Plans
                </button>
                <button style={{
                  padding: "0.75rem 1.5rem",
                  border: "none",
                  background: "transparent",
                  color: "#6b7280",
                  borderBottom: "2px solid transparent",
                  fontWeight: "500",
                  cursor: "pointer"
                }}>
                  Software Offerings
                </button>
              </div>

              {/* Plans Grid */}
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", 
                gap: "1.5rem",
                marginBottom: "2rem"
              }}>
                {/* Premium Plan */}
                <div style={{
                  background: "white",
                  borderRadius: "12px",
                  padding: "1.5rem",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  border: "1px solid #e5e7eb",
                  position: "relative"
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                    <div>
                      <h3 style={{ fontSize: "1.25rem", fontWeight: "600", color: "#1f2937", marginBottom: "0.5rem" }}>premium</h3>
                      <span style={{
                        background: "#dbeafe",
                        color: "#1e40af",
                        padding: "0.25rem 0.75rem",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        fontWeight: "500"
                      }}>
                        📊 Vendor Plan
                      </span>
                    </div>
                    <button style={{
                      background: "transparent",
                      border: "none",
                      color: "#6b7280",
                      cursor: "pointer",
                      fontSize: "1.25rem",
                      padding: "0.25rem"
                    }}>
                      ⋯
                    </button>
                  </div>

                  <div style={{ marginBottom: "1rem" }}>
                    <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#1f2937" }}>
                      {formatCurrency(10.00)}
                      <span style={{ fontSize: "0.875rem", color: "#6b7280", fontWeight: "normal" }}>/monthly</span>
                    </div>
                  </div>

                  <div style={{ marginBottom: "1rem" }}>
                    <div style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "0.5rem" }}>14-day free trial</div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                      <span style={{ color: "#10b981", fontSize: "1rem" }}>✓</span>
                      <span style={{ fontSize: "0.875rem", color: "#4b5563" }}>Full</span>
                    </div>
                  </div>

                  <div style={{
                    background: "#3b82f6",
                    color: "white",
                    padding: "0.5rem 1rem",
                    borderRadius: "6px",
                    fontSize: "0.75rem",
                    fontWeight: "500",
                    display: "inline-block"
                  }}>
                    📋 Basic
                  </div>
                </div>

                {/* Pro Plan */}
                <div style={{
                  background: "white",
                  borderRadius: "12px",
                  padding: "1.5rem",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  border: "1px solid #e5e7eb",
                  position: "relative"
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                    <div>
                      <h3 style={{ fontSize: "1.25rem", fontWeight: "600", color: "#1f2937", marginBottom: "0.5rem" }}>pro</h3>
                      <span style={{
                        background: "#f3e8ff",
                        color: "#7c3aed",
                        padding: "0.25rem 0.75rem",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        fontWeight: "500"
                      }}>
                        💻 Software Offering
                      </span>
                    </div>
                    <button style={{
                      background: "transparent",
                      border: "none",
                      color: "#6b7280",
                      cursor: "pointer",
                      fontSize: "1.25rem",
                      padding: "0.25rem"
                    }}>
                      ⋯
                    </button>
                  </div>

                  <div style={{ marginBottom: "1rem" }}>
                    <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#1f2937" }}>
                      {formatCurrency(20.00)}
                      <span style={{ fontSize: "0.875rem", color: "#6b7280", fontWeight: "normal" }}>/monthly</span>
                    </div>
                  </div>

                  <div style={{ marginBottom: "1rem" }}>
                    <div style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "0.5rem" }}>30-day free trial</div>
                    <div style={{ fontSize: "0.875rem", color: "#7c3aed", marginBottom: "0.5rem" }}>For Software: cms</div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                      <span style={{ color: "#10b981", fontSize: "1rem" }}>✓</span>
                      <span style={{ fontSize: "0.875rem", color: "#4b5563" }}>Full</span>
                    </div>
                  </div>

                  <div style={{
                    background: "#7c3aed",
                    color: "white",
                    padding: "0.5rem 1rem",
                    borderRadius: "6px",
                    fontSize: "0.75rem",
                    fontWeight: "500",
                    display: "inline-block"
                  }}>
                    ⭐ Pro
                  </div>
                </div>

                {/* Add New Plan Card */}
                <div style={{
                  background: "#f9fafb",
                  borderRadius: "12px",
                  padding: "1.5rem",
                  border: "2px dashed #d1d5db",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "280px",
                  cursor: "pointer",
                  transition: "all 0.2s"
                }}
                onClick={() => alert("Create new plan clicked!")}
                onMouseEnter={(e) => {
                  e.target.style.background = "#f3f4f6";
                  e.target.style.borderColor = "#9ca3af";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "#f9fafb";
                  e.target.style.borderColor = "#d1d5db";
                }}>
                  <div style={{ fontSize: "3rem", marginBottom: "1rem", color: "#9ca3af" }}>➕</div>
                  <h3 style={{ fontSize: "1.125rem", fontWeight: "600", color: "#4b5563", marginBottom: "0.5rem" }}>Create New Plan</h3>
                  <p style={{ fontSize: "0.875rem", color: "#6b7280", textAlign: "center" }}>Add a new vendor plan or software offering plan</p>
                </div>
              </div>

              {/* Plans Statistics */}
              <div style={{
                background: "white",
                borderRadius: "12px",
                padding: "1.5rem",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                border: "1px solid #e5e7eb"
              }}>
                <h3 style={{ fontSize: "1.125rem", fontWeight: "600", color: "#1f2937", marginBottom: "1rem" }}>Plans Overview</h3>

                <div style={{ 
                  display: "grid", 
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
                  gap: "1.5rem" 
                }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#3b82f6", marginBottom: "0.5rem" }}>2</div>
                    <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>Total Plans</div>
                  </div>

                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#10b981", marginBottom: "0.5rem" }}>1</div>
                    <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>Vendor Plans</div>
                  </div>

                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#7c3aed", marginBottom: "0.5rem" }}>1</div>
                    <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>Software Offerings</div>
                  </div>

                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#f59e0b", marginBottom: "0.5rem" }}>2</div>
                    <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>Active Subscriptions</div>
                  </div>
                </div>
              </div>
            </div>
          );

        case "user-subscriptions":
          return (
            <div>
              <div style={{ marginBottom: "2rem" }}>
                <h2 style={{ fontSize: "2rem", fontWeight: "600", color: "#1f2937", marginBottom: "0.5rem" }}>All User Subscriptions</h2>
                <p style={{ color: "#6b7280" }}>View and manage all customer subscriptions on the platform.</p>
              </div>

              {/* Search and Filter Bar */}
              <div style={{ marginBottom: "2rem", display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
                <div style={{ position: "relative", flex: "1", minWidth: "300px" }}>
                  <input
                    type="text"
                    placeholder="Search by customer, software, or tenant..."
                    style={{
                      width: "100%",
                      padding: "0.75rem 1rem 0.75rem 2.5rem",
                      border: "1px solid #d1d5db",
                      borderRadius: "8px",
                      fontSize: "0.875rem",
                      background: "white",
                      outline: "none"
                    }}
                  />
                  <div style={{
                    position: "absolute",
                    left: "0.75rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#9ca3af",
                    fontSize: "1rem"
                  }}>
                    🔍
                  </div>
                </div>

                <select style={{
                  padding: "0.75rem 1rem",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                  fontSize: "0.875rem",
                  background: "white",
                  color: "#6b7280",
                  minWidth: "120px"
                }}>
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Trial</option>
                  <option>Expired</option>
                  <option>Cancelled</option>
                </select>

                <select style={{
                  padding: "0.75rem 1rem",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                  fontSize: "0.875rem",
                  background: "white",
                  color: "#6b7280",
                  minWidth: "120px"
                }}>
                  <option>All Plans</option>
                  <option>Basic</option>
                  <option>Pro</option>
                  <option>Enterprise</option>
                </select>
              </div>

              {/* Subscriptions Table */}
              <div style={{
                background: "white",
                borderRadius: "12px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                border: "1px solid #e5e7eb",
                overflow: "hidden"
              }}>
                {/* Table Header */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "200px 120px 150px 140px 100px 120px 80px",
                  gap: "1rem",
                  padding: "1rem 1.5rem",
                  background: "#f9fafb",
                  borderBottom: "1px solid #e5e7eb",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  color: "#374151"
                }}>
                  <div>Customer</div>
                  <div>Software</div>
                  <div>Tenant</div>
                  <div>Plan</div>
                  <div>Status</div>
                  <div>Expiry</div>
                  <div>Actions</div>
                </div>

                {/* Table Rows */}
                <div>
                  {/* Sample Row 1 */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "200px 120px 150px 140px 100px 120px 80px",
                    gap: "1rem",
                    padding: "1rem 1.5rem",
                    borderBottom: "1px solid #f3f4f6",
                    alignItems: "center"
                  }}>
                    <div>
                      <div style={{ fontWeight: "500", color: "#1f2937", fontSize: "0.875rem" }}>N/A</div>
                      <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>admin@saasible.com</div>
                    </div>
                    <div style={{ fontSize: "0.875rem", color: "#1f2937" }}>cms</div>
                    <div style={{ fontSize: "0.875rem", color: "#1f2937" }}>SaaSible Platform</div>
                    <div style={{ fontSize: "0.875rem", color: "#1f2937" }}>pro ({formatCurrency(20.00)})</div>
                    <div>
                      <span style={{
                        padding: "0.25rem 0.75rem",
                        background: "#dbeafe",
                        color: "#1e40af",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        fontWeight: "500",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.25rem",
                        width: "fit-content"
                      }}>
                        🔵 Trial
                      </span>
                    </div>
                    <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>Jun 23, 2025</div>
                    <div>
                      <button style={{
                        background: "transparent",
                        border: "none",
                        color: "#6b7280",
                        cursor: "pointer",
                        fontSize: "1.25rem",
                        padding: "0.25rem"
                      }}
                      onClick={() => alert("Actions menu clicked!")}
                      >
                        ⋯
                      </button>
                    </div>
                  </div>

                  {/* Sample Row 2 */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "200px 120px 150px 140px 100px 120px 80px",
                    gap: "1rem",
                    padding: "1rem 1.5rem",
                    borderBottom: "1px solid #f3f4f6",
                    alignItems: "center"
                  }}>
                    <div>
                      <div style={{ fontWeight: "500", color: "#1f2937", fontSize: "0.875rem" }}>John Doe</div>
                      <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>john@example.com</div>
                    </div>
                    <div style={{ fontSize: "0.875rem", color: "#1f2937" }}>cms</div>
                    <div style={{ fontSize: "0.875rem", color: "#1f2937" }}>SaaSible Platform</div>
                    <div style={{ fontSize: "0.875rem", color: "#1f2937" }}>premium ({formatCurrency(10.00)})</div>
                    <div>
                      <span style={{
                        padding: "0.25rem 0.75rem",
                        background: "#dcfce7",
                        color: "#166534",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        fontWeight: "500",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.25rem",
                        width: "fit-content"
                      }}>
                        🟢 Active
                      </span>
                    </div>
                    <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>Jul 15, 2025</div>
                    <div>
                      <button style={{
                        background: "transparent",
                        border: "none",
                        color: "#6b7280",
                        cursor: "pointer",
                        fontSize: "1.25rem",
                        padding: "0.25rem"
                      }}
                      onClick={() => alert("Actions menu clicked!")}
                      >
                        ⋯
                      </button>
                    </div>
                  </div>

                  {/* Sample Row 3 */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "200px 120px 150px 140px 100px 120px 80px",
                    gap: "1rem",
                    padding: "1rem 1.5rem",
                    borderBottom: "1px solid #f3f4f6",
                    alignItems: "center"
                  }}>
                    <div>
                      <div style={{ fontWeight: "500", color: "#1f2937", fontSize: "0.875rem" }}>Jane Smith</div>
                      <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>jane@company.com</div>
                    </div>
                    <div style={{ fontSize: "0.875rem", color: "#1f2937" }}>cm</div>
                    <div style={{ fontSize: "0.875rem", color: "#1f2937" }}>Enterprise Corp</div>
                    <div style={{ fontSize: "0.875rem", color: "#1f2937" }}>enterprise ({formatCurrency(50.00)})</div>
                    <div>
                      <span style={{
                        padding: "0.25rem 0.75rem",
                        background: "#fee2e2",
                        color: "#991b1b",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        fontWeight: "500",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.25rem",
                        width: "fit-content"
                      }}>
                        🔴 Expired
                      </span>
                    </div>
                    <div style={{ fontSize: "0.875rem", color: "#ef4444" }}>May 30, 2025</div>
                    <div>
                      <button style={{
                        background: "transparent",
                        border: "none",
                        color: "#6b7280",
                        cursor: "pointer",
                        fontSize: "1.25rem",
                        padding: "0.25rem"
                      }}
                      onClick={() => alert("Actions menu clicked!")}
                      >
                        ⋯
                      </button>
                    </div>
                  </div>

                  {/* Sample Row 4 */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "200px 120px 150px 140px 100px 120px 80px",
                    gap: "1rem",
                    padding: "1rem 1.5rem",
                    alignItems: "center"
                  }}>
                    <div>
                      <div style={{ fontWeight: "500", color: "#1f2937", fontSize: "0.875rem" }}>Mike Johnson</div>
                      <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>mike@startup.io</div>
                    </div>
                    <div style={{ fontSize: "0.875rem", color: "#1f2937" }}>cms</div>
                    <div style={{ fontSize: "0.875rem", color: "#1f2937" }}>Startup Inc</div>
                    <div style={{ fontSize: "0.875rem", color: "#1f2937" }}>pro ({formatCurrency(20.00)})</div>
                    <div>
                      <span style={{
                        padding: "0.25rem 0.75rem",
                        background: "#fef3c7",
                        color: "#92400e",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        fontWeight: "500",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.25rem",
                        width: "fit-content"
                      }}>
                        🟡 Cancelled
                      </span>
                    </div>
                    <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>Aug 10, 2025</div>
                    <div>
                      <button style={{
                        background: "transparent",
                        border: "none",
                        color: "#6b7280",
                        cursor: "pointer",
                        fontSize: "1.25rem",
                        padding: "0.25rem"
                      }}
                      onClick={() => alert("Actions menu clicked!")}
                      >
                        ⋯
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary Statistics */}
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
                gap: "1.5rem", 
                marginTop: "2rem" 
              }}>
                <div style={{ background: "white", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", border: "1px solid #e5e7eb" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>Total Subscriptions</span>
                    <span style={{ fontSize: "1.25rem" }}>📊</span>
                  </div>
                  <div style={{ fontSize: "2rem", fontWeight: "600", color: "#1f2937" }}>4</div>
                </div>

                <div style={{ background: "white", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", border: "1px solid #e5e7eb" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>Active Subscriptions</span>
                    <span style={{ fontSize: "1.25rem" }}>🟢</span>
                  </div>
                  <div style={{ fontSize: "2rem", fontWeight: "600", color: "#10b981" }}>2</div>
                </div>

                <div style={{ background: "white", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", border: "1px solid #e5e7eb" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>Trial Subscriptions</span>
                    <span style={{ fontSize: "1.25rem" }}>🔵</span>
                  </div>
                  <div style={{ fontSize: "2rem", fontWeight: "600", color: "#3b82f6" }}>1</div>
                </div>

                <div style={{ background: "white", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", border: "1px solid #e5e7eb" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>Monthly Revenue</span>
                    <span style={{ fontSize: "1.25rem" }}>💰</span>
                  </div>
                  <div style={{ fontSize: "2rem", fontWeight: "600", color: "#1f2937" }}>{formatCurrency(30)}</div>
                </div>
              </div>
            </div>
          );

        case "tenants":
          return (
            <div>
              <div style={{ marginBottom: "2rem" }}>
                <h2 style={{ fontSize: "2rem", fontWeight: "600", color: "#1f2937", marginBottom: "0.5rem" }}>Tenant Management</h2>
                <p style={{ color: "#6b7280" }}>View and manage your customer tenants.</p>
              </div>

              {/* Search and Filter Bar */}
              <div style={{ marginBottom: "2rem", display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
                <div style={{ position: "relative", flex: "1", minWidth: "300px" }}>
                  <input
                    type="text"
                    placeholder="Search tenants..."
                    style={{
                      width: "100%",
                      padding: "0.75rem 1rem 0.75rem 2.5rem",
                      border: "1px solid #d1d5db",
                      borderRadius: "8px",
                      fontSize: "0.875rem",
                      background: "white",
                      outline: "none"
                    }}
                  />
                  <div style={{
                    position: "absolute",
                    left: "0.75rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#9ca3af",
                    fontSize: "1rem"
                  }}>
                    🔍
                  </div>
                </div>

                <select style={{
                  padding: "0.75rem 1rem",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                  fontSize: "0.875rem",
                  background: "white",
                  color: "#6b7280",
                  minWidth: "130px"
                }}>
                  <option>All Statuses</option>
                  <option>Active</option>
                  <option>Trial</option>
                  <option>Suspended</option>
                  <option>Cancelled</option>
                </select>

                <select style={{
                  padding: "0.75rem 1rem",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                  fontSize: "0.875rem",
                  background: "white",
                  color: "#6b7280",
                  minWidth: "120px"
                }}>
                  <option>All Plans</option>
                  <option>Premium</option>
                  <option>Pro</option>
                  <option>Basic</option>
                  <option>Enterprise</option>
                </select>
              </div>

              {/* Tenants Table */}
              <div style={{
                background: "white",
                borderRadius: "12px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                border: "1px solid #e5e7eb",
                overflow: "hidden"
              }}>
                {/* Table Header */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "250px 120px 140px 120px 120px 100px",
                  gap: "1rem",
                  padding: "1rem 1.5rem",
                  background: "#f9fafb",
                  borderBottom: "1px solid #e5e7eb",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  color: "#374151"
                }}>
                  <div>Tenant</div>
                  <div>Status</div>
                  <div>Plan</div>
                  <div>Joined</div>
                  <div>Sub. Ends</div>
                  <div>Actions</div>
                </div>

                {/* Table Rows */}
                <div>
                  {/* SaaSify Tenant Row */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "250px 120px 140px 120px 120px 100px",
                    gap: "1rem",
                    padding: "1rem 1.5rem",
                    borderBottom: "1px solid #f3f4f6",
                    alignItems: "center"
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <div style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "0.875rem"
                      }}>
                        S
                      </div>
                      <div>
                        <div style={{ fontWeight: "500", color: "#1f2937", fontSize: "0.875rem" }}>SaaSify</div>
                        <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>tenant@saasible.com</div>
                      </div>
                    </div>
                    <div>
                      <span style={{
                        padding: "0.25rem 0.75rem",
                        background: "#dcfce7",
                        color: "#166534",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        fontWeight: "500",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.25rem",
                        width: "fit-content"
                      }}>
                        🟢 Active
                      </span>
                    </div>
                    <div style={{ fontSize: "0.875rem", color: "#1f2937" }}>premium</div>
                    <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>May 26, 2025</div>
                    <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>about 1 month ago</div>
                    <div>
                      <button style={{
                        background: "transparent",
                        border: "none",
                        color: "#6b7280",
                        cursor: "pointer",
                        fontSize: "1.25rem",
                        padding: "0.25rem"
                      }}
                      onClick={() => alert("Tenant actions menu clicked!")}
                      >
                        ⋯
                      </button>
                    </div>
                  </div>

                  {/* Additional Sample Tenants */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "250px 120px 140px 120px 120px 100px",
                    gap: "1rem",
                    padding: "1rem 1.5rem",
                    borderBottom: "1px solid #f3f4f6",
                    alignItems: "center"
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <div style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "0.875rem"
                      }}>
                        T
                      </div>
                      <div>
                        <div style={{ fontWeight: "500", color: "#1f2937", fontSize: "0.875rem" }}>TechStart Solutions</div>
                        <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>admin@techstart.com</div>
                      </div>
                    </div>
                    <div>
                      <span style={{
                        padding: "0.25rem 0.75rem",
                        background: "#dbeafe",
                        color: "#1e40af",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        fontWeight: "500",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.25rem",
                        width: "fit-content"
                      }}>
                        🔵 Trial
                      </span>
                    </div>
                    <div style={{ fontSize: "0.875rem", color: "#1f2937" }}>pro</div>
                    <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>Jun 15, 2025</div>
                    <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>Jun 29, 2025</div>
                    <div>
                      <button style={{
                        background: "transparent",
                        border: "none",
                        color: "#6b7280",
                        cursor: "pointer",
                        fontSize: "1.25rem",
                        padding: "0.25rem"
                      }}
                      onClick={() => alert("Tenant actions menu clicked!")}
                      >
                        ⋯
                      </button>
                    </div>
                  </div>

                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "250px 120px 140px 120px 120px 100px",
                    gap: "1rem",
                    padding: "1rem 1.5rem",
                    borderBottom: "1px solid #f3f4f6",
                    alignItems: "center"
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <div style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "0.875rem"
                      }}>
                        I
                      </div>
                      <div>
                        <div style={{ fontWeight: "500", color: "#1f2937", fontSize: "0.875rem" }}>InnovateCorp</div>
                        <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>contact@innovate.co</div>
                      </div>
                    </div>
                    <div>
                      <span style={{
                        padding: "0.25rem 0.75rem",
                        background: "#dcfce7",
                        color: "#166534",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        fontWeight: "500",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.25rem",
                        width: "fit-content"
                      }}>
                        🟢 Active
                      </span>
                    </div>
                    <div style={{ fontSize: "0.875rem", color: "#1f2937" }}>enterprise</div>
                    <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>Mar 10, 2025</div>
                    <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>Mar 10, 2026</div>
                    <div>
                      <button style={{
                        background: "transparent",
                        border: "none",
                        color: "#6b7280",
                        cursor: "pointer",
                        fontSize: "1.25rem",
                        padding: "0.25rem"
                      }}
                      onClick={() => alert("Tenant actions menu clicked!")}
                      >
                        ⋯
                      </button>
                    </div>
                  </div>

                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "250px 120px 140px 120px 120px 100px",
                    gap: "1rem",
                    padding: "1rem 1.5rem",
                    alignItems: "center"
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <div style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#1f2937",
                        fontWeight: "bold",
                        fontSize: "0.875rem"
                      }}>
                        D
                      </div>
                      <div>
                        <div style={{ fontWeight: "500", color: "#1f2937", fontSize: "0.875rem" }}>Digital Dreams LLC</div>
                        <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>hello@digitaldreams.io</div>
                      </div>
                    </div>
                    <div>
                      <span style={{
                        padding: "0.25rem 0.75rem",
                        background: "#fef3c7",
                        color: "#92400e",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        fontWeight: "500",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.25rem",
                        width: "fit-content"
                      }}>
                        🟡 Suspended
                      </span>
                    </div>
                    <div style={{ fontSize: "0.875rem", color: "#1f2937" }}>basic</div>
                    <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>Jan 20, 2025</div>
                    <div style={{ fontSize: "0.875rem", color: "#ef4444" }}>Jun 20, 2025</div>
                    <div>
                      <button style={{
                        background: "transparent",
                        border: "none",
                        color: "#6b7280",
                        cursor: "pointer",
                        fontSize: "1.25rem",
                        padding: "0.25rem"
                      }}
                      onClick={() => alert("Tenant actions menu clicked!")}
                      >
                        ⋯
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary Statistics */}
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
                gap: "1.5rem", 
                marginTop: "2rem" 
              }}>
                <div style={{ background: "white", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", border: "1px solid #e5e7eb" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>Total Tenants</span>
                    <span style={{ fontSize: "1.25rem" }}>🏢</span>
                  </div>
                  <div style={{ fontSize: "2rem", fontWeight: "600", color: "#1f2937" }}>4</div>
                  <div style={{ color: "#6b7280", fontSize: "0.75rem" }}>+1 this month</div>
                </div>

                <div style={{ background: "white", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", border: "1px solid #e5e7eb" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>Active Tenants</span>
                    <span style={{ fontSize: "1.25rem" }}>🟢</span>
                  </div>
                  <div style={{ fontSize: "2rem", fontWeight: "600", color: "#10b981" }}>2</div>
                  <div style={{ color: "#10b981", fontSize: "0.75rem" }}>75% active rate</div>
                </div>

                <div style={{ background: "white", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", border: "1px solid #e5e7eb" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>Trial Tenants</span>
                    <span style={{ fontSize: "1.25rem" }}>🔵</span>
                  </div>
                  <div style={{ fontSize: "2rem", fontWeight: "600", color: "#3b82f6" }}>1</div>
                  <div style={{ color: "#6b7280", fontSize: "0.75rem" }}>14 days remaining</div>
                </div>

                <div style={{ background: "white", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", border: "1px solid #e5e7eb" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>Monthly Revenue</span>
                    <span style={{ fontSize: "1.25rem" }}>💰</span>
                  </div>
                  <div style={{ fontSize: "2rem", fontWeight: "600", color: "#1f2937" }}>{formatCurrency(85)}</div>
                  <div style={{ color: "#10b981", fontSize: "0.75rem" }}>+12% vs last month</div>
                </div>
              </div>

              {/* Quick Actions */}
              <div style={{
                background: "white",
                borderRadius: "12px",
                padding: "1.5rem",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                border: "1px solid #e5e7eb",
                marginTop: "2rem"
              }}>
                <h3 style={{ fontSize: "1.125rem", fontWeight: "600", color: "#1f2937", marginBottom: "1rem" }}>Quick Actions</h3>

                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  <button style={{
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
                    gap: "0.5rem"
                  }}
                  onClick={() => alert("Invite tenant clicked!")}
                  >
                    <span>📧</span>
                    Invite Tenant
                  </button>

                  <button style={{
                    background: "#10b981",
                    color: "white",
                    border: "none",
                    padding: "0.75rem 1.5rem",
                    borderRadius: "8px",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem"
                  }}
                  onClick={() => alert("Export tenant data clicked!")}
                  >
                    <span>📊</span>
                    Export Data
                  </button>

                  <button style={{
                    background: "#f59e0b",
                    color: "white",
                    border: "none",
                    padding: "0.75rem 1.5rem",
                    borderRadius: "8px",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem"
                  }}
                  onClick={() => alert("Send notifications clicked!")}
                  >
                    <span>🔔</span>
                    Send Notifications
                  </button>
                </div>
              </div>
            </div>
          );

        case "customers":
          return (
            <div>
              <div style={{ marginBottom: "2rem" }}>
                <h2 style={{ fontSize: "2rem", fontWeight: "600", color: "#1f2937", marginBottom: "0.5rem" }}>Customer Management</h2>
                <p style={{ color: "#6b7280" }}>View and manage your customers.</p>
              </div>

              {/* Search and Filter Bar */}
              <div style={{ marginBottom: "2rem", display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
                <div style={{ position: "relative", flex: "1", minWidth: "300px" }}>
                  <input
                    type="text"
                    placeholder="Search customers..."
                    style={{
                      width: "100%",
                      padding: "0.75rem 1rem 0.75rem 2.5rem",
                      border: "1px solid #d1d5db",
                      borderRadius: "8px",
                      fontSize: "0.875rem",
                      background: "white",
                      outline: "none"
                    }}
                  />
                  <div style={{
                    position: "absolute",
                    left: "0.75rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#9ca3af",
                    fontSize: "1rem"
                  }}>
                    🔍
                  </div>
                </div>

                <select style={{
                  padding: "0.75rem 1rem",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                  fontSize: "0.875rem",
                  background: "white",
                  color: "#6b7280",
                  minWidth: "130px"
                }}>
                  <option>All Statuses</option>
                  <option>Active</option>
                  <option>Trial</option>
                  <option>Inactive</option>
                  <option>Suspended</option>
                </select>

                <select style={{
                  padding: "0.75rem 1rem",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                  fontSize: "0.875rem",
                  background: "white",
                  color: "#6b7280",
                  minWidth: "120px"
                }}>
                  <option>All Plans</option>
                  <option>Basic</option>
                  <option>Pro</option>
                  <option>Premium</option>
                  <option>Enterprise</option>
                </select>

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
                    gap: "0.5rem"
                  }}
                  onClick={() => alert("Add customer clicked!")}
                >
                  <span>➕</span>
                  Add Customer
                </button>
              </div>

              {/* Customers Table */}
              <div style={{
                background: "white",
                borderRadius: "12px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                border: "1px solid #e5e7eb",
                overflow: "hidden"
              }}>
                {/* Table Header */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "250px 200px 120px 140px 120px 120px 100px",
                  gap: "1rem",
                  padding: "1rem 1.5rem",
                  background: "#f9fafb",
                  borderBottom: "1px solid #e5e7eb",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  color: "#374151"
                }}>
                  <div>Customer</div>
                  <div>Tenant</div>
                  <div>Status</div>
                  <div>Plan</div>
                  <div>Joined</div>
                  <div>Last Active</div>
                  <div>Actions</div>
                </div>

                {/* Table Rows */}
                <div>
                  {/* Customer 1 - Admin User */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "250px 200px 120px 140px 120px 120px 100px",
                    gap: "1rem",
                    padding: "1rem 1.5rem",
                    borderBottom: "1px solid #f3f4f6",
                    alignItems: "center"
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <div style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "0.875rem"
                      }}>
                        AU
                      </div>
                      <div>
                        <div style={{ fontWeight: "500", color: "#1f2937", fontSize: "0.875rem" }}>Admin User</div>
                        <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>admin@saasible.com</div>
                      </div>
                    </div>
                    <div style={{ fontSize: "0.875rem", color: "#1f2937" }}>SaaSible Platform</div>
                    <div>
                      <span style={{
                        padding: "0.25rem 0.75rem",
                        background: "#dcfce7",
                        color: "#166534",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        fontWeight: "500"
                      }}>
                        Active
                      </span>
                    </div>
                    <div style={{ fontSize: "0.875rem", color: "#1f2937" }}>Premium</div>
                    <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>May 15, 2025</div>
                    <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>2 hours ago</div>
                    <div>
                      <button style={{
                        background: "transparent",
                        border: "none",
                        color: "#6b7280",
                        cursor: "pointer",
                        fontSize: "1.25rem",
                        padding: "0.25rem"
                      }}
                      onClick={() => alert("Customer actions menu")}
                      >
                        ⋯
                      </button>
                    </div>
                  </div>

                  {/* Customer 2 - Trial User */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "250px 200px 120px 140px 120px 120px 100px",
                    gap: "1rem",
                    padding: "1rem 1.5rem",
                    borderBottom: "1px solid #f3f4f6",
                    alignItems: "center"
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <div style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "0.875rem"
                      }}>
                        JS
                      </div>
                      <div>
                        <div style={{ fontWeight: "500", color: "#1f2937", fontSize: "0.875rem" }}>John Smith</div>
                        <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>john.smith@techcorp.com</div>
                      </div>
                    </div>
                    <div style={{ fontSize: "0.875rem", color: "#1f2937" }}>TechCorp Solutions</div>
                    <div>
                      <span style={{
                        padding: "0.25rem 0.75rem",
                        background: "#dbeafe",
                        color: "#1e40af",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        fontWeight: "500"
                      }}>
                        Trial
                      </span>
                    </div>
                    <div style={{ fontSize: "0.875rem", color: "#1f2937" }}>Pro</div>
                    <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>Jun 18, 2025</div>
                    <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>1 day ago</div>
                    <div>
                      <button style={{
                        background: "transparent",
                        border: "none",
                        color: "#6b7280",
                        cursor: "pointer",
                        fontSize: "1.25rem",
                        padding: "0.25rem"
                      }}
                      onClick={() => alert("Customer actions menu")}
                      >
                        ⋯
                      </button>
                    </div>
                  </div>

                  {/* Customer 3 - Enterprise User */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "250px 200px 120px 140px 120px 120px 100px",
                    gap: "1rem",
                    padding: "1rem 1.5rem",
                    borderBottom: "1px solid #f3f4f6",
                    alignItems: "center"
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <div style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "0.875rem"
                      }}>
                        SD
                      </div>
                      <div>
                        <div style={{ fontWeight: "500", color: "#1f2937", fontSize: "0.875rem" }}>Sarah Davis</div>
                        <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>sarah.davis@innovate.co</div>
                      </div>
                    </div>
                    <div style={{ fontSize: "0.875rem", color: "#1f2937" }}>InnovateCorp</div>
                    <div>
                      <span style={{
                        padding: "0.25rem 0.75rem",
                        background: "#dcfce7",
                        color: "#166534",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        fontWeight: "500"
                      }}>
                        Active
                      </span>
                    </div>
                    <div style={{ fontSize: "0.875rem", color: "#1f2937" }}>Enterprise</div>
                    <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>Feb 28, 2025</div>
                    <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>3 hours ago</div>
                    <div>
                      <button style={{
                        background: "transparent",
                        border: "none",
                        color: "#6b7280",
                        cursor: "pointer",
                        fontSize: "1.25rem",
                        padding: "0.25rem"
                      }}
                      onClick={() => alert("Customer actions menu")}
                      >
                        ⋯
                      </button>
                    </div>
                  </div>

                  {/* Customer 4 - Inactive User */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "250px 200px 120px 140px 120px 120px 100px",
                    gap: "1rem",
                    padding: "1rem 1.5rem",
                    borderBottom: "1px solid #f3f4f6",
                    alignItems: "center"
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <div style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#1f2937",
                        fontWeight: "bold",
                        fontSize: "0.875rem"
                      }}>
                        MW
                      </div>
                      <div>
                        <div style={{ fontWeight: "500", color: "#1f2937", fontSize: "0.875rem" }}>Mike Wilson</div>
                        <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>mike.w@startup.io</div>
                      </div>
                    </div>
                    <div style={{ fontSize: "0.875rem", color: "#1f2937" }}>Digital Dreams LLC</div>
                    <div>
                      <span style={{
                        padding: "0.25rem 0.75rem",
                        background: "#fee2e2",
                        color: "#991b1b",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        fontWeight: "500"
                      }}>
                        Inactive
                      </span>
                    </div>
                    <div style={{ fontSize: "0.875rem", color: "#1f2937" }}>Basic</div>
                    <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>Dec 12, 2024</div>
                    <div style={{ fontSize: "0.875rem", color: "#ef4444" }}>30+ days ago</div>
                    <div>
                      <button style={{
                        background: "transparent",
                        border: "none",
                        color: "#6b7280",
                        cursor: "pointer",
                        fontSize: "1.25rem",
                        padding: "0.25rem"
                      }}
                      onClick={() => alert("Customer actions menu")}
                      >
                        ⋯
                      </button>
                    </div>
                  </div>

                  {/* Customer 5 - Pro User */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "250px 200px 120px 140px 120px 120px 100px",
                    gap: "1rem",
                    padding: "1rem 1.5rem",
                    alignItems: "center"
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <div style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "0.875rem"
                      }}>
                        EJ
                      </div>
                      <div>
                        <div style={{ fontWeight: "500", color: "#1f2937", fontSize: "0.875rem" }}>Emma Johnson</div>
                        <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>emma.j@creativehub.net</div>
                      </div>
                    </div>
                    <div style={{ fontSize: "0.875rem", color: "#1f2937" }}>CreativeHub Studio</div>
                    <div>
                      <span style={{
                        padding: "0.25rem 0.75rem",
                        background: "#dcfce7",
                        color: "#166534",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        fontWeight: "500"
                      }}>
                        Active
                      </span>
                    </div>
                    <div style={{ fontSize: "0.875rem", color: "#1f2937" }}>Pro</div>
                    <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>Apr 5, 2025</div>
                    <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>5 hours ago</div>
                    <div>
                      <button style={{
                        background: "transparent",
                        border: "none",
                        color: "#6b7280",
                        cursor: "pointer",
                        fontSize: "1.25rem",
                        padding: "0.25rem"
                      }}
                      onClick={() => alert("Customer actions menu")}
                      >
                        ⋯
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary Statistics */}
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
                gap: "1.5rem", 
                marginTop: "2rem" 
              }}>
                <div style={{ background: "white", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", border: "1px solid #e5e7eb" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>Total Customers</span>
                    <span style={{ fontSize: "1.25rem" }}>👥</span>
                  </div>
                  <div style={{ fontSize: "2rem", fontWeight: "600", color: "#1f2937" }}>5</div>
                  <div style={{ color: "#6b7280", fontSize: "0.75rem" }}>+2 this month</div>
                </div>

                <div style={{ background: "white", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", border: "1px solid #e5e7eb" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>Active Customers</span>
                    <span style={{ fontSize: "1.25rem" }}>🟢</span>
                  </div>
                  <div style={{ fontSize: "2rem", fontWeight: "600", color: "#10b981" }}>3</div>
                  <div style={{ color: "#10b981", fontSize: "0.75rem" }}>60% active rate</div>
                </div>

                <div style={{ background: "white", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", border: "1px solid #e5e7eb" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>Trial Customers</span>
                    <span style={{ fontSize: "1.25rem" }}>🔵</span>
                  </div>
                  <div style={{ fontSize: "2rem", fontWeight: "600", color: "#3b82f6" }}>1</div>
                  <div style={{ color: "#6b7280", fontSize: "0.75rem" }}>Converting soon</div>
                </div>

                <div style={{ background: "white", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", border: "1px solid #e5e7eb" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>Avg Revenue/Customer</span>
                    <span style={{ fontSize: "1.25rem" }}>💰</span>
                  </div>
                  <div style={{ fontSize: "2rem", fontWeight: "600", color: "#1f2937" }}>{formatCurrency(25)}</div>
                  <div style={{ color: "#10b981", fontSize: "0.75rem" }}>+8% vs last month</div>
                </div>
              </div>

              {/* Recent Activity */}
              <div style={{
                background: "white",
                borderRadius: "12px",
                padding: "1.5rem",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                border: "1px solid #e5e7eb",
                marginTop: "2rem"
              }}>
                <h3 style={{ fontSize: "1.125rem", fontWeight: "600", color: "#1f2937", marginBottom: "1rem" }}>Recent Customer Activity</h3>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "0.75rem", background: "#f9fafb", borderRadius: "8px" }}>
                    <div style={{ color: "#10b981", fontSize: "1.25rem" }}>✓</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "0.875rem", color: "#1f2937", fontWeight: "500" }}>Emma Johnson upgraded to Pro plan</div>
                      <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>2 hours ago</div>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "0.75rem", background: "#f9fafb", borderRadius: "8px" }}>
                    <div style={{ color: "#3b82f6", fontSize: "1.25rem" }}>👤</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "0.875rem", color: "#1f2937", fontWeight: "500" }}>John Smith started trial period</div>
                      <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>1 day ago</div>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "0.75rem", background: "#f9fafb", borderRadius: "8px" }}>
                    <div style={{ color: "#ef4444", fontSize: "1.25rem" }}>⚠️</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "0.875rem", color: "#1f2937", fontWeight: "500" }}>Mike Wilson subscription expired</div>
                      <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>3 days ago</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div style={{
                background: "white",
                borderRadius: "12px",
                padding: "1.5rem",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                border: "1px solid #e5e7eb",
                marginTop: "2rem"
              }}>
                <h3 style={{ fontSize: "1.125rem", fontWeight: "600", color: "#1f2937", marginBottom: "1rem" }}>Quick Actions</h3>

                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  <button style={{
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
                    gap: "0.5rem"
                  }}
                  onClick={() => alert("Send email campaign clicked!")}
                  >
                    <span>📧</span>
                    Send Email Campaign
                  </button>

                  <button style={{
                    background: "#10b981",
                    color: "white",
                    border: "none",
                    padding: "0.75rem 1.5rem",
                    borderRadius: "8px",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem"
                  }}
                  onClick={() => alert("Export customer data clicked!")}
                  >
                    <span>📊</span>
                    Export Customer Data
                  </button>

                  <button style={{
                    background: "#f59e0b",
                    color: "white",
                    border: "none",
                    padding: "0.75rem 1.5rem",
                    borderRadius: "8px",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem"
                  }}
                  onClick={() => alert("Generate customer report clicked!")}
                  >
                    <span>📈</span>
                    Generate Report
                  </button>
                </div>
              </div>
            </div>
          );

        case "analytics":
          return (
            <div>
              <div style={{ marginBottom: "2rem" }}>
                <h2 style={{ fontSize: "2rem", fontWeight: "600", color: "#1f2937", marginBottom: "0.5rem" }}>Analytics</h2>
                <p style={{ color: "#6b7280" }}>Track user behavior and key business metrics.</p>
              </div>

              {/* Key Metrics Cards */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
                <div style={{ background: "white", padding: "1.5rem", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", border: "1px solid #e5e7eb" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                    <div>
                      <h3 style={{ fontSize: "0.875rem", color: "#6b7280", fontWeight: "500", marginBottom: "0.5rem" }}>Total Revenue (Last 6M)</h3>
                      <div style={{ fontSize: "2rem", fontWeight: "600", color: "#1f2937" }}>{formatCurrency(11500)}</div>
                      <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>Based on available data</div>
                    </div>
                    <div style={{ fontSize: "2rem", color: "#3b82f6" }}>💰</div>
                  </div>
                </div>

                <div style={{ background: "white", padding: "1.5rem", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", border: "1px solid #e5e7eb" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                    <div>
                      <h3 style={{ fontSize: "0.875rem", color: "#6b7280", fontWeight: "500", marginBottom: "0.5rem" }}>Active Subscriptions</h3>
                      <div style={{ fontSize: "2rem", fontWeight: "600", color: "#1f2937" }}>1</div>
                      <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>Current active subscriptions</div>
                    </div>
                    <div style={{ fontSize: "2rem", color: "#10b981" }}>👥</div>
                  </div>
                </div>

                <div style={{ background: "white", padding: "1.5rem", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", border: "1px solid #e5e7eb" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                    <div>
                      <h3 style={{ fontSize: "0.875rem", color: "#6b7280", fontWeight: "500", marginBottom: "0.5rem" }}>Conversion Rate (Trial to Paid)</h3>
                      <div style={{ fontSize: "2rem", fontWeight: "600", color: "#1f2937" }}>35.6%</div>
                      <div style={{ fontSize: "0.875rem", color: "#10b981" }}>+2.1% from last month (mock data)</div>
                    </div>
                    <div style={{ fontSize: "2rem", color: "#f59e0b" }}>📈</div>
                  </div>
                </div>
              </div>

              {/* Charts Row */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "2rem" }}>
                {/* Monthly Activity Overview */}
                <div style={{ background: "white", padding: "1.5rem", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", border: "1px solid #e5e7eb" }}>
                  <h3 style={{ fontSize: "1.125rem", fontWeight: "600", color: "#1f2937", marginBottom: "0.5rem" }}>Monthly Activity Overview</h3>
                  <p style={{ color: "#6b7280", fontSize: "0.875rem", marginBottom: "1.5rem" }}>Revenue, active users, and new signups over time.</p>
                  <div style={{ height: "300px", position: "relative", padding: "1rem" }}>
                    <svg width="100%" height="100%" viewBox="0 0 450 260">
                      {/* Grid lines */}
                      <defs>
                        <pattern id="analyticsGrid" width="45" height="26" patternUnits="userSpaceOnUse">
                          <path d="M 45 0 L 0 0 0 26" fill="none" stroke="#f3f4f6" strokeWidth="1"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#analyticsGrid)" />

                      {/* Y-axis labels */}
                      <g>
                        {["$3k", "$2.5k", "$2k", "$1.5k", "$1k", "50%", "0"].map((label, i) => (
                          <text key={i} x="15" y={30 + i * 35} fontSize="10" fill="#6b7280" textAnchor="start">
                            {label}
                          </text>
                        ))}
                      </g>

                      {/* Revenue Area Chart */}
                      <path
                        d="M 45 200 L 90 180 L 135 160 L 180 140 L 225 120 L 270 110 L 315 100 L 360 90 L 405 80 L 405 220 L 45 220 Z"
                        fill="rgba(59, 130, 246, 0.1)"
                        stroke="#3b82f6"
                        strokeWidth="2"
                      />

                      {/* Active Users Line */}
                      <path
                        d="M 45 180 L 90 170 L 135 150 L 180 140 L 225 130 L 270 125 L 315 120 L 360 115 L 405 110"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />

                      {/* Data points */}
                      {[
                        { x: 45, y: 200, revenue: true }, { x: 90, y: 180, revenue: true }, 
                        { x: 135, y: 160, revenue: true }, { x: 180, y: 140, revenue: true },
                        { x: 225, y: 120, revenue: true }, { x: 270, y: 110, revenue: true },
                        { x: 315, y: 100, revenue: true }, { x: 360, y: 90, revenue: true },
                        { x: 405, y: 80, revenue: true }
                      ].map((point, i) => (
                        <circle key={i} cx={point.x} cy={point.y} r="4" fill="#3b82f6" />
                      ))}

                      {[
                        { x: 45, y: 180 }, { x: 90, y: 170 }, 
                        { x: 135, y: 150 }, { x: 180, y: 140 },
                        { x: 225, y: 130 }, { x: 270, y: 125 },
                        { x: 315, y: 120 }, { x: 360, y: 115 },
                        { x: 405, y: 110 }
                      ].map((point, i) => (
                        <circle key={i} cx={point.x} cy={point.y} r="3" fill="#10b981" />
                      ))}

                      {/* X-axis months */}
                      <g>
                        {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((month, i) => (
                          <text key={i} x={45 + i * 72} y={245} textAnchor="middle" fontSize="10" fill="#6b7280">
                            {month}
                          </text>
                        ))}
                      </g>

                      {/* Legend */}
                      <g transform="translate(50, 15)">
                        <circle cx="8" cy="8" r="4" fill="#3b82f6" />
                        <text x="18" y="12" fontSize="10" fill="#6b7280">Active Users</text>
                        <circle cx="108" cy="8" r="4" fill="#10b981" />
                        <text x="118" y="12" fontSize="10" fill="#6b7280">Revenue</text>
                      </g>
                    </svg>
                  </div>
                </div>

                {/* Subscription Plan Distribution */}
                <div style={{ background: "white", padding: "1.5rem", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", border: "1px solid #e5e7eb" }}>
                  <h3 style={{ fontSize: "1.125rem", fontWeight: "600", color: "#1f2937", marginBottom: "0.5rem" }}>Subscription Plan Distribution</h3>
                  <p style={{ color: "#6b7280", fontSize: "0.875rem", marginBottom: "1.5rem" }}>Current breakdown of active subscriptions by plan.</p>
                  <div style={{ height: "300px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ position: "relative" }}>
                      <svg width="200" height="200" viewBox="0 0 200 200">
                        {/* Donut Chart */}
                        <g transform="translate(100, 100)">
                          {/* Full circle representing 100% */}
                          <circle
                            cx="0"
                            cy="0"
                            r="80"
                            fill="none"
                            stroke="#4f46e5"
                            strokeWidth="20"
                            strokeDasharray="502.65"
                            strokeDashoffset="0"
                            transform="rotate(-90)"
                          />

                          {/* Center text */}
                          <text x="0" y="-5" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#1f2937">
                            100%
                          </text>
                          <text x="0" y="15" textAnchor="middle" fontSize="12" fill="#6b7280">
                            Active
                          </text>
                        </g>
                      </svg>

                      {/* Legend */}
                      <div style={{ position: "absolute", top: "220px", left: "50%", transform: "translateX(-50%)", textAlign: "center" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", justifyContent: "center" }}>
                          <div style={{ width: "12px", height: "12px", backgroundColor: "#4f46e5", borderRadius: "50%" }}></div>
                          <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>Pro Plan (100%)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Purchasing Decision Factors */}
              <div style={{ background: "white", padding: "1.5rem", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", border: "1px solid #e5e7eb", marginBottom: "2rem" }}>
                <h3 style={{ fontSize: "1.125rem", fontWeight: "600", color: "#1f2937", marginBottom: "0.5rem" }}>Purchasing Decision Factors</h3>
                <p style={{ color: "#6b7280", fontSize: "0.875rem", marginBottom: "1.5rem" }}>Insights into what influences customer purchasing decisions (mock data).</p>

                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                        <th style={{ textAlign: "left", padding: "0.75rem", fontSize: "0.875rem", fontWeight: "600", color: "#374151" }}>Factor/Feature</th>
                        <th style={{ textAlign: "left", padding: "0.75rem", fontSize: "0.875rem", fontWeight: "600", color: "#374151" }}>Influence Score (0-1)</th>
                        <th style={{ textAlign: "left", padding: "0.75rem", fontSize: "0.875rem", fontWeight: "600", color: "#374151" }}>Most Associated Plan</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: "1px solid #f3f4f6" }}>
                        <td style={{ padding: "0.75rem", fontSize: "0.875rem", color: "#1f2937" }}>Advanced Reporting Suite</td>
                        <td style={{ padding: "0.75rem", fontSize: "0.875rem", color: "#1f2937" }}>0.85</td>
                        <td style={{ padding: "0.75rem" }}>
                          <span style={{ padding: "0.25rem 0.75rem", background: "#f59e0b", color: "white", borderRadius: "15px", fontSize: "0.75rem", fontWeight: "500" }}>
                            Enterprise
                          </span>
                        </td>
                      </tr>
                      <tr style={{ borderBottom: "1px solid #f3f4f6" }}>
                        <td style={{ padding: "0.75rem", fontSize: "0.875rem", color: "#1f2937" }}>AI-Powered Suggestions</td>
                        <td style={{ padding: "0.75rem", fontSize: "0.875rem", color: "#1f2937" }}>0.78</td>
                        <td style={{ padding: "0.75rem" }}>
                          <span style={{ padding: "0.25rem 0.75rem", background: "#10b981", color: "white", borderRadius: "15px", fontSize: "0.75rem", fontWeight: "500" }}>
                            Pro
                          </span>
                        </td>
                      </tr>
                      <tr style={{ borderBottom: "1px solid #f3f4f6" }}>
                        <td style={{ padding: "0.75rem", fontSize: "0.875rem", color: "#1f2937" }}>Basic Task Management</td>
                        <td style={{ padding: "0.75rem", fontSize: "0.875rem", color: "#1f2937" }}>0.65</td>
                        <td style={{ padding: "0.75rem" }}>
                          <span style={{ padding: "0.25rem 0.75rem", background: "#3b82f6", color: "white", borderRadius: "15px", fontSize: "0.75rem", fontWeight: "500" }}>
                            Basic
                          </span>
                        </td>
                      </tr>
                      <tr style={{ borderBottom: "1px solid #f3f4f6" }}>
                        <td style={{ padding: "0.75rem", fontSize: "0.875rem", color: "#1f2937" }}>Dedicated Account Manager</td>
                        <td style={{ padding: "0.75rem", fontSize: "0.875rem", color: "#1f2937" }}>0.92</td>
                        <td style={{ padding: "0.75rem" }}>
                          <span style={{ padding: "0.25rem 0.75rem", background: "#f59e0b", color: "white", borderRadius: "15px", fontSize: "0.75rem", fontWeight: "500" }}>
                            Enterprise
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: "0.75rem", fontSize: "0.875rem", color: "#1f2937" }}>API Access</td>
                        <td style={{ padding: "0.75rem", fontSize: "0.875rem", color: "#1f2937" }}>0.70</td>
                        <td style={{ padding: "0.75rem" }}>
                          <span style={{ padding: "0.25rem 0.75rem", background: "#10b981", color: "white", borderRadius: "15px", fontSize: "0.75rem", fontWeight: "500" }}>
                            Pro
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Additional Analytics Cards */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
                <div style={{ background: "white", padding: "1.5rem", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", border: "1px solid #e5e7eb" }}>
                  <h3 style={{ fontSize: "1rem", fontWeight: "600", color: "#1f2937", marginBottom: "1rem" }}>User Engagement</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>Daily Active Users</span>
                      <span style={{ fontSize: "1rem", fontWeight: "600", color: "#1f2937" }}>24</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>Session Duration</span>
                      <span style={{ fontSize: "1rem", fontWeight: "600", color: "#1f2937" }}>18m 42s</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>Bounce Rate</span>
                      <span style={{ fontSize: "1rem", fontWeight: "600", color: "#1f2937" }}>23.5%</span>
                    </div>
                  </div>
                </div>

                <div style={{ background: "white", padding: "1.5rem", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", border: "1px solid #e5e7eb" }}>
                  <h3 style={{ fontSize: "1rem", fontWeight: "600", color: "#1f2937", marginBottom: "1rem" }}>Growth Metrics</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>Customer Growth Rate</span>
                      <span style={{ fontSize: "1rem", fontWeight: "600", color: "#10b981" }}>+15.2%</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>Churn Rate</span>
                      <span style={{ fontSize: "1rem", fontWeight: "600", color: "#ef4444" }}>2.1%</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>LTV:CAC Ratio</span>
                      <span style={{ fontSize: "1rem", fontWeight: "600", color: "#1f2937" }}>3.8:1</span>
                    </div>
                  </div>
                </div>

                <div style={{ background: "white", padding: "1.5rem", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", border: "1px solid #e5e7eb" }}>
                  <h3 style={{ fontSize: "1rem", fontWeight: "600", color: "#1f2937", marginBottom: "1rem" }}>Performance Indicators</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>ARPU (Avg Revenue Per User)</span>
                      <span style={{ fontSize: "1rem", fontWeight: "600", color: "#1f2937" }}>{formatCurrency(127)}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>Customer Satisfaction</span>
                      <span style={{ fontSize: "1rem", fontWeight: "600", color: "#10b981" }}>4.7/5.0</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>Support Ticket Resolution</span>
                      <span style={{ fontSize: "1rem", fontWeight: "600", color: "#1f2937" }}>2.3hrs</span>
                    </div>
                  </div>
                </div>
              </div>
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
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                <div>
                  <h2 style={{ fontSize: "2rem", fontWeight: "600", color: "#1f2937", marginBottom: "0.5rem" }}>Marketplace App Listings</h2>
                  <p style={{ color: "#6b7280" }}>View, manage, and configure applications available in the marketplace.</p>
                </div>
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
                    boxShadow: "0 2px 4px rgba(59, 130, 246, 0.3)"
                  }}
                  onClick={() => alert("Add New App clicked!")}
                >
                  <span>➕</span>
                  Add New App
                </button>
              </div>

              {/* Filters and Search */}
              <div style={{ 
                background: "white", 
                padding: "1.5rem", 
                borderRadius: "12px", 
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)", 
                border: "1px solid #e5e7eb",
                marginBottom: "2rem"
              }}>
                <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
                  <div style={{ position: "relative", flex: "1", minWidth: "300px" }}>
                    <input
                      type="text"
                      placeholder="Search apps by name, developer, or category..."
                      style={{
                        width: "100%",
                        padding: "0.75rem 1rem 0.75rem 2.5rem",
                        border: "1px solid #d1d5db",
                        borderRadius: "8px",
                        fontSize: "0.875rem",
                        background: "white",
                        outline: "none"
                      }}
                    />
                    <div style={{
                      position: "absolute",
                      left: "0.75rem",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#9ca3af",
                      fontSize: "1rem"
                    }}>
                      🔍
                    </div>
                  </div>

                  <select style={{
                    padding: "0.75rem 1rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "0.875rem",
                    background: "white",
                    color: "#6b7280",
                    minWidth: "140px"
                  }}>
                    <option>All Categories</option>
                    <option>Featured</option>
                    <option>Productivity</option>
                    <option>Communication</option>
                    <option>Analytics</option>
                    <option>E-commerce</option>
                    <option>Marketing</option>
                  </select>

                  <select style={{
                    padding: "0.75rem 1rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "0.875rem",
                    background: "white",
                    color: "#6b7280",
                    minWidth: "120px"
                  }}>
                    <option>All Status</option>
                    <option>Active</option>
                    <option>Pending</option>
                    <option>Inactive</option>
                    <option>Rejected</option>
                  </select>

                  <select style={{
                    padding: "0.75rem 1rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "0.875rem",
                    background: "white",
                    color: "#6b7280",
                    minWidth: "130px"
                  }}>
                    <option>All Developers</option>
                    <option>AmbaApps</option>
                    <option>TechCorp</option>
                    <option>DevSolutions</option>
                    <option>InnovateLab</option>
                  </select>
                </div>
              </div>

              {/* Apps Table */}
              <div style={{
                background: "white",
                borderRadius: "12px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                border: "1px solid #e5e7eb",
                overflow: "hidden"
              }}>
                {/* Table Header */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "80px 200px 120px 150px 120px 100px 120px",
                  gap: "1rem",
                  padding: "1rem 1.5rem",
                  background: "#f9fafb",
                  borderBottom: "1px solid #e5e7eb",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  color: "#374151"
                }}>
                  <div>Icon</div>
                  <div>Name</div>
                  <div>Category</div>
                  <div>Developer</div>
                  <div>Pricing</div>
                  <div>Status</div>
                  <div>Actions</div>
                </div>

                {/* Table Rows */}
                <div>
                  {/* CMS App */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "80px 200px 120px 150px 120px 100px 120px",
                    gap: "1rem",
                    padding: "1rem 1.5rem",
                    borderBottom: "1px solid #f3f4f6",
                    alignItems: "center"
                  }}>
                    <div style={{
                      width: "50px",
                      height: "50px",
                      background: "#f3f4f6",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.5rem",
                      border: "1px solid #e5e7eb"
                    }}>
                      📝
                    </div>
                    <div>
                      <div style={{ fontWeight: "500", color: "#1f2937", marginBottom: "0.25rem" }}>cms</div>
                      <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>Content Management System</div>
                    </div>
                    <div>
                      <span style={{
                        padding: "0.25rem 0.75rem",
                        background: "#fef3c7",
                        color: "#92400e",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        fontWeight: "500"
                      }}>
                        Featured
                      </span>
                    </div>
                    <div style={{ fontSize: "0.875rem", color: "#1f2937" }}>AmbaApps</div>
                    <div style={{ fontSize: "0.875rem", color: "#1f2937" }}>{formatCurrency(20.00)} (Subscription)</div>
                    <div>
                      <span style={{
                        padding: "0.25rem 0.75rem",
                        background: "#dcfce7",
                        color: "#166534",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        fontWeight: "500"
                      }}>
                        Active
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button style={{
                        background: "#3b82f6",
                        color: "white",
                        border: "none",
                        padding: "0.25rem 0.5rem",
                        borderRadius: "4px",
                        fontSize: "0.75rem",
                        cursor: "pointer"
                      }}
                      onClick={() => alert("Edit app clicked!")}
                      >
                        Edit
                      </button>
                      <button style={{
                        background: "transparent",
                        border: "none",
                        color: "#6b7280",
                        cursor: "pointer",
                        fontSize: "1.25rem",
                        padding: "0.25rem"
                      }}
                      onClick={() => alert("More actions clicked!")}
                      >
                        ⋯
                      </button>
                    </div>
                  </div>

                  {/* Task Manager App */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "80px 200px 120px 150px 120px 100px 120px",
                    gap: "1rem",
                    padding: "1rem 1.5rem",
                    borderBottom: "1px solid #f3f4f6",
                    alignItems: "center"
                  }}>
                    <div style={{
                      width: "50px",
                      height: "50px",
                      background: "#f3f4f6",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.5rem",
                      border: "1px solid #e5e7eb"
                    }}>
                      ✅
                    </div>
                    <div>
                      <div style={{ fontWeight: "500", color: "#1f2937", marginBottom: "0.25rem" }}>TaskMaster Pro</div>
                      <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>Advanced Task Management</div>
                    </div>
                    <div>
                      <span style={{
                        padding: "0.25rem 0.75rem",
                        background: "#dbeafe",
                        color: "#1e40af",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        fontWeight: "500"
                      }}>
                        Productivity
                      </span>
                    </div>
                    <div style={{ fontSize: "0.875rem", color: "#1f2937" }}>TechCorp</div>
                    <div style={{ fontSize: "0.875rem", color: "#1f2937" }}>{formatCurrency(15.00)} (Monthly)</div>
                    <div>
                      <span style={{
                        padding: "0.25rem 0.75rem",
                        background: "#dcfce7",
                        color: "#166534",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        fontWeight: "500"
                      }}>
                        Active
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button style={{
                        background: "#3b82f6",
                        color: "white",
                        border: "none",
                        padding: "0.25rem 0.5rem",
                        borderRadius: "4px",
                        fontSize: "0.75rem",
                        cursor: "pointer"
                      }}
                      onClick={() => alert("Edit app clicked!")}
                      >
                        Edit
                      </button>
                      <button style={{
                        background: "transparent",
                        border: "none",
                        color: "#6b7280",
                        cursor: "pointer",
                        fontSize: "1.25rem",
                        padding: "0.25rem"
                      }}
                      onClick={() => alert("More actions clicked!")}
                      >
                        ⋯
                      </button>
                    </div>
                  </div>

                  {/* Analytics Dashboard App */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "80px 200px 120px 150px 120px 100px 120px",
                    gap: "1rem",
                    padding: "1rem 1.5rem",
                    borderBottom: "1px solid #f3f4f6",
                    alignItems: "center"
                  }}>
                    <div style={{
                      width: "50px",
                      height: "50px",
                      background: "#f3f4f6",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.5rem",
                      border: "1px solid #e5e7eb"
                    }}>
                      📊
                    </div>
                    <div>
                      <div style={{ fontWeight: "500", color: "#1f2937", marginBottom: "0.25rem" }}>Analytics Pro</div>
                      <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>Business Intelligence Dashboard</div>
                    </div>
                    <div>
                      <span style={{
                        padding: "0.25rem 0.75rem",
                        background: "#f3e8ff",
                        color: "#7c3aed",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        fontWeight: "500"
                      }}>
                        Analytics
                      </span>
                    </div>
                    <div style={{ fontSize: "0.875rem", color: "#1f2937" }}>DevSolutions</div>
                    <div style={{ fontSize: "0.875rem", color: "#1f2937" }}>{formatCurrency(45.00)} (Monthly)</div>
                    <div>
                      <span style={{
                        padding: "0.25rem 0.75rem",
                        background: "#fef3c7",
                        color: "#92400e",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        fontWeight: "500"
                      }}>
                        Pending
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button style={{
                        background: "#3b82f6",
                        color: "white",
                        border: "none",
                        padding: "0.25rem 0.5rem",
                        borderRadius: "4px",
                        fontSize: "0.75rem",
                        cursor: "pointer"
                      }}
                      onClick={() => alert("Edit app clicked!")}
                      >
                        Edit
                      </button>
                      <button style={{
                        background: "transparent",
                        border: "none",
                        color: "#6b7280",
                        cursor: "pointer",
                        fontSize: "1.25rem",
                        padding: "0.25rem"
                      }}
                      onClick={() => alert("More actions clicked!")}
                      >
                        ⋯
                      </button>
                    </div>
                  </div>

                  {/* Email Marketing App */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "80px 200px 120px 150px 120px 100px 120px",
                    gap: "1rem",
                    padding: "1rem 1.5rem",
                    borderBottom: "1px solid #f3f4f6",
                    alignItems: "center"
                  }}>
                    <div style={{
                      width: "50px",
                      height: "50px",
                      background: "#f3f4f6",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.5rem",
                      border: "1px solid #e5e7eb"
                    }}>
                      📧
                    </div>
                    <div>
                      <div style={{ fontWeight: "500", color: "#1f2937", marginBottom: "0.25rem" }}>MailFlow</div>
                      <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>Email Marketing Platform</div>
                    </div>
                    <div>
                      <span style={{
                        padding: "0.25rem 0.75rem",
                        background: "#ecfdf5",
                        color: "#059669",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        fontWeight: "500"
                      }}>
                        Marketing
                      </span>
                    </div>
                    <div style={{ fontSize: "0.875rem", color: "#1f2937" }}>InnovateLab</div>
                    <div style={{ fontSize: "0.875rem", color: "#1f2937" }}>{formatCurrency(25.00)} (Monthly)</div>
                    <div>
                      <span style={{
                        padding: "0.25rem 0.75rem",
                        background: "#fee2e2",
                        color: "#991b1b",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        fontWeight: "500"
                      }}>
                        Inactive
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button style={{
                        background: "#3b82f6",
                        color: "white",
                        border: "none",
                        padding: "0.25rem 0.5rem",
                        borderRadius: "4px",
                        fontSize: "0.75rem",
                        cursor: "pointer"
                      }}
                      onClick={() => alert("Edit app clicked!")}
                      >
                        Edit
                      </button>
                      <button style={{
                        background: "transparent",
                        border: "none",
                        color: "#6b7280",
                        cursor: "pointer",
                        fontSize: "1.25rem",
                        padding: "0.25rem"
                      }}
                      onClick={() => alert("More actions clicked!")}
                      >
                        ⋯
                      </button>
                    </div>
                  </div>

                  {/* E-commerce Platform App */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "80px 200px 120px 150px 120px 100px 120px",
                    gap: "1rem",
                    padding: "1rem 1.5rem",
                    alignItems: "center"
                  }}>
                    <div style={{
                      width: "50px",
                      height: "50px",
                      background: "#f3f4f6",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.5rem",
                      border: "1px solid #e5e7eb"
                    }}>
                      🛒
                    </div>
                    <div>
                      <div style={{ fontWeight: "500", color: "#1f2937", marginBottom: "0.25rem" }}>ShopBuilder</div>
                      <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>E-commerce Store Builder</div>
                    </div>
                    <div>
                      <span style={{
                        padding: "0.25rem 0.75rem",
                        background: "#fef2f2",
                        color: "#dc2626",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        fontWeight: "500"
                      }}>
                        E-commerce
                      </span>
                    </div>
                    <div style={{ fontSize: "0.875rem", color: "#1f2937" }}>TechCorp</div>
                    <div style={{ fontSize: "0.875rem", color: "#1f2937" }}>{formatCurrency(35.00)} (Monthly)</div>
                    <div>
                      <span style={{
                        padding: "0.25rem 0.75rem",
                        background: "#dcfce7",
                        color: "#166534",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        fontWeight: "500"
                      }}>
                        Active
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button style={{
                        background: "#3b82f6",
                        color: "white",
                        border: "none",
                        padding: "0.25rem 0.5rem",
                        borderRadius: "4px",
                        fontSize: "0.75rem",
                        cursor: "pointer"
                      }}
                      onClick={() => alert("Edit app clicked!")}
                      >
                        Edit
                      </button>
                      <button style={{
                        background: "transparent",
                        border: "none",
                        color: "#6b7280",
                        cursor: "pointer",
                        fontSize: "1.25rem",
                        padding: "0.25rem"
                      }}
                      onClick={() => alert("More actions clicked!")}
                      >
                        ⋯
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary Statistics */}
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
                gap: "1.5rem", 
                marginTop: "2rem" 
              }}>
                <div style={{ background: "white", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", border: "1px solid #e5e7eb" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>Total Apps</span>
                    <span style={{ fontSize: "1.25rem" }}>📱</span>
                  </div>
                  <div style={{ fontSize: "2rem", fontWeight: "600", color: "#1f2937" }}>5</div>
                  <div style={{ color: "#6b7280", fontSize: "0.75rem" }}>+2 this month</div>
                </div>

                <div style={{ background: "white", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", border: "1px solid #e5e7eb" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>Active Apps</span>
                    <span style={{ fontSize: "1.25rem" }}>🟢</span>
                  </div>
                  <div style={{ fontSize: "2rem", fontWeight: "600", color: "#10b981" }}>3</div>
                  <div style={{ color: "#10b981", fontSize: "0.75rem" }}>60% active rate</div>
                </div>

                <div style={{ background: "white", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", border: "1px solid #e5e7eb" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>Pending Review</span>
                    <span style={{ fontSize: "1.25rem" }}>🟡</span>
                  </div>
                  <div style={{ fontSize: "2rem", fontWeight: "600", color: "#f59e0b" }}>1</div>
                  <div style={{ color: "#6b7280", fontSize: "0.75rem" }}>Needs attention</div>
                </div>

                <div style={{ background: "white", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", border: "1px solid #e5e7eb" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>Avg. App Revenue</span>
                    <span style={{ fontSize: "1.25rem" }}>💰</span>
                  </div>
                  <div style={{ fontSize: "2rem", fontWeight: "600", color: "#1f2937" }}>{formatCurrency(28)}</div>
                  <div style={{ color: "#10b981", fontSize: "0.75rem" }}>+15% vs last month</div>
                </div>
              </div>

              {/* Quick Actions */}
              <div style={{
                background: "white",
                borderRadius: "12px",
                padding: "1.5rem",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                border: "1px solid #e5e7eb",
                marginTop: "2rem"
              }}>
                <h3 style={{ fontSize: "1.125rem", fontWeight: "600", color: "#1f2937", marginBottom: "1rem" }}>Quick Actions</h3>

                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  <button style={{
                    background: "#10b981",
                    color: "white",
                    border: "none",
                    padding: "0.75rem 1.5rem",
                    borderRadius: "8px",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem"
                  }}
                  onClick={() => alert("Approve pending apps clicked!")}
                  >
                    <span>✅</span>
                    Approve Pending Apps
                  </button>

                  <button style={{
                    background: "#f59e0b",
                    color: "white",
                    border: "none",
                    padding: "0.75rem 1.5rem",
                    borderRadius: "8px",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem"
                  }}
                  onClick={() => alert("Export app data clicked!")}
                  >
                    <span>📊</span>
                    Export App Data
                  </button>

                  <button style={{
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
                    gap: "0.5rem"
                  }}
                  onClick={() => alert("Feature apps clicked!")}
                  >
                    <span>⭐</span>
                    Feature Apps
                  </button>

                  <button style={{
                    background: "#ef4444",
                    color: "white",
                    border: "none",
                    padding: "0.75rem 1.5rem",
                    borderRadius: "8px",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem"
                  }}
                  onClick={() => alert("Send notifications clicked!")}
                  >
                    <span>🔔</span>
                    Send Notifications
                  </button>
                </div>
              </div>
            </div>
          );

        case "add-new-app":
          return (
            <div>
              <div style={{ marginBottom: "2rem" }}>
                <h2 style={{ fontSize: "2rem", fontWeight: "600", color: "#1f2937", marginBottom: "0.5rem" }}>Add New Marketplace App</h2>
                <p style={{ color: "#6b7280" }}>Submit a new application to be listed on the SaaSible marketplace.</p>
              </div>

              <div style={{
                background: "white",
                borderRadius: "12px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                border: "1px solid #e5e7eb",
                overflow: "hidden"
              }}>
                <form style={{ padding: "2rem" }}>
                  {/* App Data Source */}
                  <div style={{ marginBottom: "2rem" }}>
                    <label style={{ 
                      display: "block", 
                      fontSize: "0.875rem", 
                      fontWeight: "600", 
                      color: "#374151", 
                      marginBottom: "1rem" 
                    }}>
                      App Data Source
                    </label>
                    <div style={{ display: "flex", gap: "2rem" }}>
                      <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
                        <input 
                          type="radio" 
                          name="dataSource" 
                          value="existing"
                          style={{ marginRight: "0.5rem" }}
                        />
                        <span style={{ color: "#374151" }}>Link Existing Platform Software</span>
                      </label>
                      <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
                        <input 
                          type="radio" 
                          name="dataSource" 
                          value="manual"
                          defaultChecked
                          style={{ marginRight: "0.5rem" }}
                        />
                        <span style={{ color: "#374151" }}>Enter Details Manually / External App</span>
                      </label>
                    </div>
                  </div>

                  {/* Marketplace App Name */}
                  <div style={{ marginBottom: "2rem" }}>
                    <label style={{ 
                      display: "block", 
                      fontSize: "0.875rem", 
                      fontWeight: "600", 
                      color: "#374151", 
                      marginBottom: "0.5rem" 
                    }}>
                      Marketplace App Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter app name..."
                      style={{
                        width: "100%",
                        padding: "0.75rem 1rem",
                        border: "1px solid #d1d5db",
                        borderRadius: "8px",
                        fontSize: "0.875rem",
                        background: "#f9fafb",
                        outline: "none",
                        transition: "border-color 0.2s"
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#3b82f6";
                        e.target.style.background = "white";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#d1d5db";
                        e.target.style.background = "#f9fafb";
                      }}
                    />
                  </div>

                  {/* Description */}
                  <div style={{ marginBottom: "2rem" }}>
                    <label style={{ 
                      display: "block", 
                      fontSize: "0.875rem", 
                      fontWeight: "600", 
                      color: "#374151", 
                      marginBottom: "0.5rem" 
                    }}>
                      Description
                    </label>
                    <textarea
                      rows="4"
                      placeholder="Describe your app..."
                      style={{
                        width: "100%",
                        padding: "0.75rem 1rem",
                        border: "1px solid #d1d5db",
                        borderRadius: "8px",
                        fontSize: "0.875rem",
                        background: "#f9fafb",
                        outline: "none",
                        resize: "vertical",
                        minHeight: "100px",
                        transition: "border-color 0.2s"
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#3b82f6";
                        e.target.style.background = "white";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#d1d5db";
                        e.target.style.background = "#f9fafb";
                      }}
                    />
                  </div>

                  {/* Developer Name */}
                  <div style={{ marginBottom: "2rem" }}>
                    <label style={{ 
                      display: "block", 
                      fontSize: "0.875rem", 
                      fontWeight: "600", 
                      color: "#374151", 
                      marginBottom: "0.5rem" 
                    }}>
                      Developer Name (Your Company/Brand)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., SaaSible Platform"
                      style={{
                        width: "100%",
                        padding: "0.75rem 1rem",
                        border: "1px solid #d1d5db",
                        borderRadius: "8px",
                        fontSize: "0.875rem",
                        background: "#f9fafb",
                        outline: "none",
                        transition: "border-color 0.2s"
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#3b82f6";
                        e.target.style.background = "white";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#d1d5db";
                        e.target.style.background = "#f9fafb";
                      }}
                    />
                  </div>

                  {/* Category and Pricing Type Row */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginBottom: "2rem" }}>
                    {/* Category */}
                    <div>
                      <label style={{ 
                        display: "block", 
                        fontSize: "0.875rem", 
                        fontWeight: "600", 
                        color: "#374151", 
                        marginBottom: "0.5rem" 
                      }}>
                        Category
                      </label>
                      <select
                        style={{
                          width: "100%",
                          padding: "0.75rem 1rem",
                          border: "1px solid #d1d5db",
                          borderRadius: "8px",
                          fontSize: "0.875rem",
                          background: "#f9fafb",
                          outline: "none",
                          cursor: "pointer",
                          transition: "border-color 0.2s"
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = "#3b82f6";
                          e.target.style.background = "white";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "#d1d5db";
                          e.target.style.background = "#f9fafb";
                        }}
                      >
                        <option>Select category</option>
                        <option>Featured</option>
                        <option>Productivity</option>
                        <option>Communication</option>
                        <option>Analytics</option>
                        <option>E-commerce</option>
                        <option>Marketing</option>
                        <option>Design Tool</option>
                        <option>Developer Tools</option>
                        <option>Customer Support</option>
                        <option>Finance</option>
                        <option>HR & Recruiting</option>
                        <option>Project Management</option>
                      </select>
                    </div>

                    {/* Marketplace Pricing Type */}
                    <div>
                      <label style={{ 
                        display: "block", 
                        fontSize: "0.875rem", 
                        fontWeight: "600", 
                        color: "#374151", 
                        marginBottom: "0.5rem" 
                      }}>
                        Marketplace Pricing Type
                      </label>
                      <select
                        style={{
                          width: "100%",
                          padding: "0.75rem 1rem",
                          border: "1px solid #d1d5db",
                          borderRadius: "8px",
                          fontSize: "0.875rem",
                          background: "#f9fafb",
                          outline: "none",
                          cursor: "pointer",
                          transition: "border-color 0.2s"
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = "#3b82f6";
                          e.target.style.background = "white";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "#d1d5db";
                          e.target.style.background = "#f9fafb";
                        }}
                      >
                        <option>Free</option>
                        <option>Freemium</option>
                        <option>One-time Purchase</option>
                        <option>Monthly Subscription</option>
                        <option>Annual Subscription</option>
                        <option>Usage-based</option>
                        <option>Tiered Pricing</option>
                      </select>
                    </div>
                  </div>

                  {/* Pricing Note */}
                  <div style={{ 
                    background: "#f3f4f6", 
                    padding: "1rem", 
                    borderRadius: "8px", 
                    marginBottom: "2rem",
                    fontSize: "0.875rem",
                    color: "#6b7280"
                  }}>
                    <strong>Note:</strong> Detailed customer subscription plans for this app are created and managed separately in the main "Subscription Plans" section.
                  </div>

                  {/* App Image/Logo */}
                  <div style={{ marginBottom: "2rem" }}>
                    <label style={{ 
                      display: "block", 
                      fontSize: "0.875rem", 
                      fontWeight: "600", 
                      color: "#374151", 
                      marginBottom: "0.5rem" 
                    }}>
                      App Image/Logo for Marketplace
                    </label>
                    <div style={{
                      border: "2px dashed #d1d5db",
                      borderRadius: "8px",
                      padding: "2rem",
                      textAlign: "center",
                      background: "#fafafa",
                      cursor: "pointer",
                      transition: "all 0.2s"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.borderColor = "#3b82f6";
                      e.target.style.background = "#f8faff";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.borderColor = "#d1d5db";
                      e.target.style.background = "#fafafa";
                    }}
                    onClick={() => alert("File upload functionality would be implemented here")}
                    >
                      <div style={{ fontSize: "2rem", marginBottom: "0.5rem", color: "#9ca3af" }}>📁</div>
                      <div style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "0.25rem" }}>
                        <strong>Choose File</strong> No file chosen
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "#9ca3af" }}>
                        If linking existing software, its image will be used by default unless you upload a new one here.
                      </div>
                    </div>
                  </div>

                  {/* Launch URL */}
                  <div style={{ marginBottom: "2rem" }}>
                    <label style={{ 
                      display: "block", 
                      fontSize: "0.875rem", 
                      fontWeight: "600", 
                      color: "#374151", 
                      marginBottom: "0.5rem" 
                    }}>
                      Launch URL (Link to App)
                    </label>
                    <input
                      type="url"
                      placeholder="https://yourapp.com"
                      style={{
                        width: "100%",
                        padding: "0.75rem 1rem",
                        border: "1px solid #d1d5db",
                        borderRadius: "8px",
                        fontSize: "0.875rem",
                        background: "#f9fafb",
                        outline: "none",
                        transition: "border-color 0.2s"
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#3b82f6";
                        e.target.style.background = "white";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#d1d5db";
                        e.target.style.background = "#f9fafb";
                      }}
                    />
                  </div>

                  {/* Tags */}
                  <div style={{ marginBottom: "2rem" }}>
                    <label style={{ 
                      display: "block", 
                      fontSize: "0.875rem", 
                      fontWeight: "600", 
                      color: "#374151", 
                      marginBottom: "0.5rem" 
                    }}>
                      Tags (comma-separated, e.g., Productivity, AI)
                    </label>
                    <input
                      type="text"
                      placeholder="Productivity, AI, Design Tool"
                      style={{
                        width: "100%",
                        padding: "0.75rem 1rem",
                        border: "1px solid #d1d5db",
                        borderRadius: "8px",
                        fontSize: "0.875rem",
                        background: "#f9fafb",
                        outline: "none",
                        transition: "border-color 0.2s"
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#3b82f6";
                        e.target.style.background = "white";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#d1d5db";
                        e.target.style.background = "#f9fafb";
                      }}
                    />
                  </div>

                  {/* Key Features */}
                  <div style={{ marginBottom: "2rem" }}>
                    <label style={{ 
                      display: "block", 
                      fontSize: "0.875rem", 
                      fontWeight: "600", 
                      color: "#374151", 
                      marginBottom: "0.5rem" 
                    }}>
                      Key Features (one per line)
                    </label>
                    <textarea
                      rows="5"
                      placeholder="Feature 1&#10;Feature 2&#10;AI-powered insights"
                      style={{
                        width: "100%",
                        padding: "0.75rem 1rem",
                        border: "1px solid #d1d5db",
                        borderRadius: "8px",
                        fontSize: "0.875rem",
                        background: "#f9fafb",
                        outline: "none",
                        resize: "vertical",
                        minHeight: "120px",
                        transition: "border-color 0.2s"
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#3b82f6";
                        e.target.style.background = "white";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#d1d5db";
                        e.target.style.background = "#f9fafb";
                      }}
                    />
                  </div>

                  {/* Marketplace Status */}
                  <div style={{ marginBottom: "3rem" }}>
                    <label style={{ 
                      display: "block", 
                      fontSize: "0.875rem", 
                      fontWeight: "600", 
                      color: "#374151", 
                      marginBottom: "0.5rem" 
                    }}>
                      Marketplace Status
                    </label>
                    <select
                      style={{
                        width: "100%",
                        padding: "0.75rem 1rem",
                        border: "1px solid #d1d5db",
                        borderRadius: "8px",
                        fontSize: "0.875rem",
                        background: "#f9fafb",
                        outline: "none",
                        cursor: "pointer",
                        transition: "border-color 0.2s"
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#3b82f6";
                        e.target.style.background = "white";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#d1d5db";
                        e.target.style.background = "#f9fafb";
                      }}
                    >
                      <option>Pending Review</option>
                      <option>Active</option>
                      <option>Inactive</option>
                      <option>Rejected</option>
                      <option>Draft</option>
                    </select>
                  </div>

                  {/* Action Buttons */}
                  <div style={{ 
                    display: "flex", 
                    gap: "1rem", 
                    justifyContent: "flex-end",
                    paddingTop: "2rem",
                    borderTop: "1px solid #e5e7eb"
                  }}>
                    <button
                      type="button"
                      style={{
                        background: "transparent",
                        color: "#6b7280",
                        border: "1px solid #d1d5db",
                        padding: "0.75rem 1.5rem",
                        borderRadius: "8px",
                        fontSize: "0.875rem",
                        fontWeight: "500",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        transition: "all 0.2s"
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = "#f3f4f6";
                        e.target.style.borderColor = "#9ca3af";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = "transparent";
                        e.target.style.borderColor = "#d1d5db";
                      }}
                      onClick={() => {
                        setActiveSection("app-listings");
                      }}
                    >
                      <span>←</span>
                      Cancel
                    </button>

                    <button
                      type="submit"
                      style={{
                        background: "#3b82f6",
                        color: "white",
                        border: "none",
                        padding: "0.75rem 2rem",
                        borderRadius: "8px",
                        fontSize: "0.875rem",
                        fontWeight: "500",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        boxShadow: "0 2px 4px rgba(59, 130, 246, 0.3)",
                        transition: "all 0.2s"
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = "#2563eb";
                        e.target.style.transform = "translateY(-1px)";
                        e.target.style.boxShadow = "0 4px 8px rgba(59, 130, 246, 0.4)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = "#3b82f6";
                        e.target.style.transform = "translateY(0px)";
                        e.target.style.boxShadow = "0 2px 4px rgba(59, 130, 246, 0.3)";
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        alert("App submitted successfully! It will be reviewed before appearing in the marketplace.");
                        setActiveSection("app-listings");
                      }}
                    >
                      <span>📤</span>
                      Add App to Marketplace
                    </button>
                  </div>
                </form>
              </div>

              {/* Help Section */}
              <div style={{
                background: "#f8fafc",
                borderRadius: "12px",
                padding: "1.5rem",
                marginTop: "2rem",
                border: "1px solid #e2e8f0"
              }}>
                <h3 style={{ fontSize: "1.125rem", fontWeight: "600", color: "#1f2937", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span>💡</span>
                  Tips for App Submission
                </h3>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
                  <div>
                    <h4 style={{ fontSize: "0.875rem", fontWeight: "600", color: "#374151", marginBottom: "0.5rem" }}>App Description</h4>
                    <p style={{ fontSize: "0.875rem", color: "#6b7280", lineHeight: "1.5" }}>
                      Write a clear, compelling description that highlights your app's main benefits and target users. Keep it concise but informative.
                    </p>
                  </div>

                  <div>
                    <h4 style={{ fontSize: "0.875rem", fontWeight: "600", color: "#374151", marginBottom: "0.5rem" }}>Categories & Tags</h4>
                    <p style={{ fontSize: "0.875rem", color: "#6b7280", lineHeight: "1.5" }}>
                      Choose the most relevant category and add specific tags to help users discover your app. Use popular, searchable keywords.
                    </p>
                  </div>

                  <div>
                    <h4 style={{ fontSize: "0.875rem", fontWeight: "600", color: "#374151", marginBottom: "0.5rem" }}>App Logo</h4>
                    <p style={{ fontSize: "0.875rem", color: "#6b7280", lineHeight: "1.5" }}>
                      Upload a high-quality logo (recommended: 256x256px, PNG format) that represents your brand clearly in the marketplace.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );

        case "manage-categories":
          return (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                <div>
                  <h2 style={{ fontSize: "2rem", fontWeight: "600", color: "#1f2937", marginBottom: "0.5rem" }}>Manage Marketplace Categories</h2>
                  <p style={{ color: "#6b7280" }}>Add, edit, or remove categories for marketplace applications.</p>
                </div>
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
                    boxShadow: "0 2px 4px rgba(59, 130, 246, 0.3)"
                  }}
                  onClick={() => alert("Add New Category clicked!")}
                >
                  <span>➕</span>
                  Add New Category
                </button>
              </div>

              {/* Search and Filter */}
              <div style={{ 
                background: "white", 
                padding: "1.5rem", 
                borderRadius: "12px", 
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)", 
                border: "1px solid #e5e7eb",
                marginBottom: "2rem"
              }}>
                <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
                  <div style={{ position: "relative", flex: "1", minWidth: "300px" }}>
                    <input
                      type="text"
                      placeholder="Search categories by name or description..."
                      style={{
                        width: "100%",
                        padding: "0.75rem 1rem 0.75rem 2.5rem",
                        border: "1px solid #d1d5db",
                        borderRadius: "8px",
                        fontSize: "0.875rem",
                        background: "white",
                        outline: "none"
                      }}
                    />
                    <div style={{
                      position: "absolute",
                      left: "0.75rem",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#9ca3af",
                      fontSize: "1rem"
                    }}>
                      🔍
                    </div>
                  </div>

                  <select style={{
                    padding: "0.75rem 1rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "0.875rem",
                    background: "white",
                    color: "#6b7280",
                    minWidth: "140px"
                  }}>
                    <option>All Categories</option>
                    <option>Core Categories</option>
                    <option>Custom Categories</option>
                    <option>Active Categories</option>
                    <option>Inactive Categories</option>
                  </select>

                  <button style={{
                    background: "#10b981",
                    color: "white",
                    border: "none",
                    padding: "0.75rem 1.5rem",
                    borderRadius: "8px",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem"
                  }}
                  onClick={() => alert("Bulk operations clicked!")}
                  >
                    <span>📦</span>
                    Bulk Operations
                  </button>
                </div>
              </div>

              {/* Categories Table */}
              <div style={{
                background: "white",
                borderRadius: "12px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                border: "1px solid #e5e7eb",
                overflow: "hidden"
              }}>
                {/* Table Header */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "200px 1fr 120px 120px 120px 100px",
                  gap: "1rem",
                  padding: "1rem 1.5rem",
                  background: "#f9fafb",
                  borderBottom: "1px solid #e5e7eb",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  color: "#374151"
                }}>
                  <div>Name</div>
                  <div>Description</div>
                  <div>App Count</div>
                  <div>Created At</div>
                  <div>Status</div>
                  <div>Actions</div>
                </div>

                {/* Table Rows */}
                <div>
                  {/* Featured Category */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "200px 1fr 120px 120px 120px 100px",
                    gap: "1rem",
                    padding: "1rem 1.5rem",
                    borderBottom: "1px solid #f3f4f6",
                    alignItems: "center"
                  }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <span style={{ fontSize: "1.25rem" }}>⭐</span>
                        <div>
                          <div style={{ fontWeight: "500", color: "#1f2937", fontSize: "0.875rem" }}>Featured</div>
                          <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>Core Category</div>
                        </div>
                      </div>
                    </div>
                    <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>Highlighted applications recommended by administrators</div>
                    <div style={{ fontSize: "0.875rem", color: "#1f2937", textAlign: "center" }}>3</div>
                    <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>May 24, 2025</div>
                    <div>
                      <span style={{
                        padding: "0.25rem 0.75rem",
                        background: "#dcfce7",
                        color: "#166534",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        fontWeight: "500"
                      }}>
                        Active
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: "0.25rem" }}>
                      <button style={{
                        background: "#3b82f6",
                        color: "white",
                        border: "none",
                        padding: "0.25rem 0.5rem",
                        borderRadius: "4px",
                        fontSize: "0.75rem",
                        cursor: "pointer"
                      }}
                      onClick={() => alert("Edit Featured category clicked!")}
                      title="Edit Category"
                      >
                        ✏️
                      </button>
                      <button style={{
                        background: "transparent",
                        border: "none",
                        color: "#6b7280",
                        cursor: "pointer",
                        fontSize: "1rem",
                        padding: "0.25rem"
                      }}
                      onClick={() => alert("More actions for Featured category!")}
                      >
                        ⋯
                      </button>
                    </div>
                  </div>

                  {/* Productivity Category */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "200px 1fr 120px 120px 120px 100px",
                    gap: "1rem",
                    padding: "1rem 1.5rem",
                    borderBottom: "1px solid #f3f4f6",
                    alignItems: "center"
                  }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <span style={{ fontSize: "1.25rem" }}>⚡</span>
                        <div>
                          <div style={{ fontWeight: "500", color: "#1f2937", fontSize: "0.875rem" }}>Productivity</div>
                          <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>Core Category</div>
                        </div>
                      </div>
                    </div>
                    <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>Tools and applications that enhance workflow efficiency</div>
                    <div style={{ fontSize: "0.875rem", color: "#1f2937", textAlign: "center" }}>7</div>
                    <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>May 20, 2025</div>
                    <div>
                      <span style={{
                        padding: "0.25rem 0.75rem",
                        background: "#dcfce7",
                        color: "#166534",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        fontWeight: "500"
                      }}>
                        Active
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: "0.25rem" }}>
                      <button style={{
                        background: "#3b82f6",
                        color: "white",
                        border: "none",
                        padding: "0.25rem 0.5rem",
                        borderRadius: "4px",
                        fontSize: "0.75rem",
                        cursor: "pointer"
                      }}
                      onClick={() => alert("Edit Productivity category clicked!")}
                      title="Edit Category"
                      >
                        ✏️
                      </button>
                      <button style={{
                        background: "transparent",
                        border: "none",
                        color: "#6b7280",
                        cursor: "pointer",
                        fontSize: "1rem",
                        padding: "0.25rem"
                      }}
                      onClick={() => alert("More actions for Productivity category!")}
                      >
                        ⋯
                      </button>
                    </div>
                  </div>

                  {/* Communication Category */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "200px 1fr 120px 120px 120px 100px",
                    gap: "1rem",
                    padding: "1rem 1.5rem",
                    borderBottom: "1px solid #f3f4f6",
                    alignItems: "center"
                  }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <span style={{ fontSize: "1.25rem" }}>💬</span>
                        <div>
                          <div style={{ fontWeight: "500", color: "#1f2937", fontSize: "0.875rem" }}>Communication</div>
                          <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>Core Category</div>
                        </div>
                      </div>
                    </div>
                    <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>Chat, video conferencing, and team collaboration tools</div>
                    <div style={{ fontSize: "0.875rem", color: "#1f2937", textAlign: "center" }}>5</div>
                    <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>May 18, 2025</div>
                    <div>
                      <span style={{
                        padding: "0.25rem 0.75rem",
                        background: "#dcfce7",
                        color: "#166534",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        fontWeight: "500"
                      }}>
                        Active
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: "0.25rem" }}>
                      <button style={{
                        background: "#3b82f6",
                        color: "white",
                        border: "none",
                        padding: "0.25rem 0.5rem",
                        borderRadius: "4px",
                        fontSize: "0.75rem",
                        cursor: "pointer"
                      }}
                      onClick={() => alert("Edit Communication category clicked!")}
                      title="Edit Category"
                      >
                        ✏️
                      </button>
                      <button style={{
                        background: "transparent",
                        border: "none",
                        color: "#6b7280",
                        cursor: "pointer",
                        fontSize: "1rem",
                        padding: "0.25rem"
                      }}
                      onClick={() => alert("More actions for Communication category!")}
                      >
                        ⋯
                      </button>
                    </div>
                  </div>

                  {/* Analytics Category */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "200px 1fr 120px 120px 120px 100px",
                    gap: "1rem",
                    padding: "1rem 1.5rem",
                    borderBottom: "1px solid #f3f4f6",
                    alignItems: "center"
                  }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <span style={{ fontSize: "1.25rem" }}>📊</span>
                        <div>
                          <div style={{ fontWeight: "500", color: "#1f2937", fontSize: "0.875rem" }}>Analytics</div>
                          <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>Core Category</div>
                        </div>
                      </div>
                    </div>
                    <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>Business intelligence, reporting, and data analysis tools</div>
                    <div style={{ fontSize: "0.875rem", color: "#1f2937", textAlign: "center" }}>4</div>
                    <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>May 15, 2025</div>
                    <div>
                      <span style={{
                        padding: "0.25rem 0.75rem",
                        background: "#dcfce7",
                        color: "#166534",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        fontWeight: "500"
                      }}>
                        Active
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: "0.25rem" }}>
                      <button style={{
                        background: "#3b82f6",
                        color: "white",
                        border: "none",
                        padding: "0.25rem 0.5rem",
                        borderRadius: "4px",
                        fontSize: "0.75rem",
                        cursor: "pointer"
                      }}
                      onClick={() => alert("Edit Analytics category clicked!")}
                      title="Edit Category"
                      >
                        ✏️
                      </button>
                      <button style={{
                        background: "transparent",
                        border: "none",
                        color: "#6b7280",
                        cursor: "pointer",
                        fontSize: "1rem",
                        padding: "0.25rem"
                      }}
                      onClick={() => alert("More actions for Analytics category!")}
                      >
                        ⋯
                      </button>
                    </div>
                  </div>

                  {/* E-commerce Category */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "200px 1fr 120px 120px 120px 100px",
                    gap: "1rem",
                    padding: "1rem 1.5rem",
                    borderBottom: "1px solid #f3f4f6",
                    alignItems: "center"
                  }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <span style={{ fontSize: "1.25rem" }}>🛒</span>
                        <div>
                          <div style={{ fontWeight: "500", color: "#1f2937", fontSize: "0.875rem" }}>E-commerce</div>
                          <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>Core Category</div>
                        </div>
                      </div>
                    </div>
                    <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>Online store builders, payment processing, and sales tools</div>
                    <div style={{ fontSize: "0.875rem", color: "#1f2937", textAlign: "center" }}>6</div>
                    <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>May 12, 2025</div>
                    <div>
                      <span style={{
                        padding: "0.25rem 0.75rem",
                        background: "#dcfce7",
                        color: "#166534",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        fontWeight: "500"
                      }}>
                        Active
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: "0.25rem" }}>
                      <button style={{
                        background: "#3b82f6",
                        color: "white",
                        border: "none",
                        padding: "0.25rem 0.5rem",
                        borderRadius: "4px",
                        fontSize: "0.75rem",
                        cursor: "pointer"
                      }}
                      onClick={() => alert("Edit E-commerce category clicked!")}
                      title="Edit Category"
                      >
                        ✏️
                      </button>
                      <button style={{
                        background: "transparent",
                        border: "none",
                        color: "#6b7280",
                        cursor: "pointer",
                        fontSize: "1rem",
                        padding: "0.25rem"
                      }}
                      onClick={() => alert("More actions for E-commerce category!")}
                      >
                        ⋯
                      </button>
                    </div>
                  </div>

                  {/* Marketing Category */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "200px 1fr 120px 120px 120px 100px",
                    gap: "1rem",
                    padding: "1rem 1.5rem",
                    borderBottom: "1px solid #f3f4f6",
                    alignItems: "center"
                  }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <span style={{ fontSize: "1.25rem" }}>📢</span>
                        <div>
                          <div style={{ fontWeight: "500", color: "#1f2937", fontSize: "0.875rem" }}>Marketing</div>
                          <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>Core Category</div>
                        </div>
                      </div>
                    </div>
                    <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>Email marketing, social media management, and advertising tools</div>
                    <div style={{ fontSize: "0.875rem", color: "#1f2937", textAlign: "center" }}>8</div>
                    <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>May 10, 2025</div>
                    <div>
                      <span style={{
                        padding: "0.25rem 0.75rem",
                        background: "#dcfce7",
                        color: "#166534",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        fontWeight: "500"
                      }}>
                        Active
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: "0.25rem" }}>
                      <button style={{
                        background: "#3b82f6",
                        color: "white",
                        border: "none",
                        padding: "0.25rem 0.5rem",
                        borderRadius: "4px",
                        fontSize: "0.75rem",
                        cursor: "pointer"
                      }}
                      onClick={() => alert("Edit Marketing category clicked!")}
                      title="Edit Category"
                      >
                        ✏️
                      </button>
                      <button style={{
                        background: "transparent",
                        border: "none",
                        color: "#6b7280",
                        cursor: "pointer",
                        fontSize: "1rem",
                        padding: "0.25rem"
                      }}
                      onClick={() => alert("More actions for Marketing category!")}
                      >
                        ⋯
                      </button>
                    </div>
                  </div>

                  {/* Design Tools Category */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "200px 1fr 120px 120px 120px 100px",
                    gap: "1rem",
                    padding: "1rem 1.5rem",
                    borderBottom: "1px solid #f3f4f6",
                    alignItems: "center"
                  }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <span style={{ fontSize: "1.25rem" }}>🎨</span>
                        <div>
                          <div style={{ fontWeight: "500", color: "#1f2937", fontSize: "0.875rem" }}>Design Tools</div>
                          <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>Custom Category</div>
                        </div>
                      </div>
                    </div>
                    <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>Graphic design, UI/UX design, and creative applications</div>
                    <div style={{ fontSize: "0.875rem", color: "#1f2937", textAlign: "center" }}>2</div>
                    <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>Jun 5, 2025</div>
                    <div>
                      <span style={{
                        padding: "0.25rem 0.75rem",
                        background: "#dcfce7",
                        color: "#166534",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        fontWeight: "500"
                      }}>
                        Active
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: "0.25rem" }}>
                      <button style={{
                        background: "#3b82f6",
                        color: "white",
                        border: "none",
                        padding: "0.25rem 0.5rem",
                        borderRadius: "4px",
                        fontSize: "0.75rem",
                        cursor: "pointer"
                      }}
                      onClick={() => alert("Edit Design Tools category clicked!")}
                      title="Edit Category"
                      >
                        ✏️
                      </button>
                      <button style={{
                        background: "transparent",
                        border: "none",
                        color: "#6b7280",
                        cursor: "pointer",
                        fontSize: "1rem",
                        padding: "0.25rem"
                      }}
                      onClick={() => alert("More actions for Design Tools category!")}
                      >
                        ⋯
                      </button>
                    </div>
                  </div>

                  {/* Developer Tools Category - Inactive */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "200px 1fr 120px 120px 120px 100px",
                    gap: "1rem",
                    padding: "1rem 1.5rem",
                    alignItems: "center",
                    opacity: "0.7"
                  }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <span style={{ fontSize: "1.25rem" }}>⚙️</span>
                        <div>
                          <div style={{ fontWeight: "500", color: "#1f2937", fontSize: "0.875rem" }}>Developer Tools</div>
                          <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>Custom Category</div>
                        </div>
                      </div>
                    </div>
                    <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>APIs, code editors, and development utilities</div>
                    <div style={{ fontSize: "0.875rem", color: "#1f2937", textAlign: "center" }}>0</div>
                    <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>Jun 8, 2025</div>
                    <div>
                      <span style={{
                        padding: "0.25rem 0.75rem",
                        background: "#fef3c7",
                        color: "#92400e",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        fontWeight: "500"
                      }}>
                        Inactive
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: "0.25rem" }}>
                      <button style={{
                        background: "#3b82f6",
                        color: "white",
                        border: "none",
                        padding: "0.25rem 0.5rem",
                        borderRadius: "4px",
                        fontSize: "0.75rem",
                        cursor: "pointer"
                      }}
                      onClick={() => alert("Edit Developer Tools category clicked!")}
                      title="Edit Category"
                      >
                        ✏️
                      </button>
                      <button style={{
                        background: "transparent",
                        border: "none",
                        color: "#6b7280",
                        cursor: "pointer",
                        fontSize: "1rem",
                        padding: "0.25rem"
                      }}
                      onClick={() => alert("More actions for Developer Tools category!")}
                      >
                        ⋯
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary Statistics */}
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
                gap: "1.5rem", 
                marginTop: "2rem" 
              }}>
                <div style={{ background: "white", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", border: "1px solid #e5e7eb" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>Total Categories</span>
                    <span style={{ fontSize: "1.25rem" }}>📂</span>
                  </div>
                  <div style={{ fontSize: "2rem", fontWeight: "600", color: "#1f2937" }}>8</div>
                  <div style={{ color: "#6b7280", fontSize: "0.75rem" }}>2 custom categories</div>
                </div>

                <div style={{ background: "white", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", border: "1px solid #e5e7eb" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>Active Categories</span>
                    <span style={{ fontSize: "1.25rem" }}>🟢</span>
                  </div>
                  <div style={{ fontSize: "2rem", fontWeight: "600", color: "#10b981" }}>7</div>
                  <div style={{ color: "#10b981", fontSize: "0.75rem" }}>87.5% active rate</div>
                </div>

                <div style={{ background: "white", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", border: "1px solid #e5e7eb" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>Apps per Category</span>
                    <span style={{ fontSize: "1.25rem" }}>📱</span>
                  </div>
                  <div style={{ fontSize: "2rem", fontWeight: "600", color: "#1f2937" }}>4.4</div>
                  <div style={{ color: "#6b7280", fontSize: "0.75rem" }}>Average apps per category</div>
                </div>

                <div style={{ background: "white", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", border: "1px solid #e5e7eb" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>Most Popular</span>
                    <span style={{ fontSize: "1.25rem" }}>🏆</span>
                  </div>
                  <div style={{ fontSize: "1.25rem", fontWeight: "600", color: "#1f2937" }}>Marketing</div>
                  <div style={{ color: "#6b7280", fontSize: "0.75rem" }}>8 apps in category</div>
                </div>
              </div>

              {/* Quick Actions */}
              <div style={{
                background: "white",
                borderRadius: "12px",
                padding: "1.5rem",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                border: "1px solid #e5e7eb",
                marginTop: "2rem"
              }}>
                <h3 style={{ fontSize: "1.125rem", fontWeight: "600", color: "#1f2937", marginBottom: "1rem" }}>Quick Actions</h3>

                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  <button style={{
                    background: "#10b981",
                    color: "white",
                    border: "none",
                    padding: "0.75rem 1.5rem",
                    borderRadius: "8px",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem"
                  }}
                  onClick={() => alert("Create category template clicked!")}
                  >
                    <span>📝</span>
                    Create Category Template
                  </button>

                  <button style={{
                    background: "#f59e0b",
                    color: "white",
                    border: "none",
                    padding: "0.75rem 1.5rem",
                    borderRadius: "8px",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem"
                  }}
                  onClick={() => alert("Export categories clicked!")}
                  >
                    <span>📊</span>
                    Export Categories
                  </button>

                  <button style={{
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
                    gap: "0.5rem"
                  }}
                  onClick={() => alert("Reorganize categories clicked!")}
                  >
                    <span>🔄</span>
                    Reorganize Categories
                  </button>

                  <button style={{
                    background: "#ef4444",
                    color: "white",
                    border: "none",
                    padding: "0.75rem 1.5rem",
                    borderRadius: "8px",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem"
                  }}
                  onClick={() => alert("Merge categories clicked!")}
                  >
                    <span>🔗</span>
                    Merge Categories
                  </button>
                </div>
              </div>

              {/* Help Section */}
              <div style={{
                background: "#f8fafc",
                borderRadius: "12px",
                padding: "1.5rem",
                marginTop: "2rem",
                border: "1px solid #e2e8f0"
              }}>
                <h3 style={{ fontSize: "1.125rem", fontWeight: "600", color: "#1f2937", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span>💡</span>
                  Category Management Tips
                </h3>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
                  <div>
                    <h4 style={{ fontSize: "0.875rem", fontWeight: "600", color: "#374151", marginBottom: "0.5rem" }}>Naming Conventions</h4>
                    <p style={{ fontSize: "0.875rem", color: "#6b7280", lineHeight: "1.5" }}>
                      Keep category names concise and descriptive. Use standard industry terms that users would search for.
                    </p>
                  </div>

                  <div>
                    <h4 style={{ fontSize: "0.875rem", fontWeight: "600", color: "#374151", marginBottom: "0.5rem" }}>Organization Strategy</h4>
                    <p style={{ fontSize: "0.875rem", color: "#6b7280", lineHeight: "1.5" }}>
                      Group similar applications together and avoid creating too many categories that might confuse users.
                    </p>
                  </div>

                  <div>
                    <h4 style={{ fontSize: "0.875rem", fontWeight: "600", color: "#374151", marginBottom: "0.5rem" }}>Performance Impact</h4>
                    <p style={{ fontSize: "0.875rem", color: "#6b7280", lineHeight: "1.5" }}>
                      Empty or rarely used categories can be deactivated rather than deleted to preserve historical data.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );

        case "app-requests":
          return (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                <div>
                  <h2 style={{ fontSize: "2rem", fontWeight: "600", color: "#1f2937", marginBottom: "0.5rem" }}>App Submission Requests</h2>
                  <p style={{ color: "#6b7280" }}>Review and approve or reject app submissions from developers.</p>
                </div>
                <div style={{ display: "flex", gap: "1rem" }}>
                  <button
                    style={{
                      background: "#10b981",
                      color: "white",
                      border: "none",
                      padding: "0.75rem 1.5rem",
                      borderRadius: "8px",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem"
                    }}
                    onClick={() => alert("Bulk approve clicked!")}
                  >
                    <span>✅</span>
                    Bulk Approve
                  </button>
                  <button
                    style={{
                      background: "#ef4444",
                      color: "white",
                      border: "none",
                      padding: "0.75rem 1.5rem",
                      borderRadius: "8px",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem"
                    }}
                    onClick={() => alert("Bulk reject clicked!")}
                  >
                    <span>❌</span>
                    Bulk Reject
                  </button>
                </div>
              </div>

              {/* Filter and Search */}
              <div style={{ 
                background: "white", 
                padding: "1.5rem", 
                borderRadius: "12px", 
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)", 
                border: "1px solid #e5e7eb",
                marginBottom: "2rem"
              }}>
                <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
                  <div style={{ position: "relative", flex: "1", minWidth: "300px" }}>
                    <input
                      type="text"
                      placeholder="Search requests by app name, developer, or category..."
                      style={{
                        width: "100%",
                        padding: "0.75rem 1rem 0.75rem 2.5rem",
                        border: "1px solid #d1d5db",
                        borderRadius: "8px",
                        fontSize: "0.875rem",
                        background: "white",
                        outline: "none"
                      }}
                    />
                    <div style={{
                      position: "absolute",
                      left: "0.75rem",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#9ca3af",
                      fontSize: "1rem"
                    }}>
                      🔍
                    </div>
                  </div>

                  <select style={{
                    padding: "0.75rem 1rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "0.875rem",
                    background: "white",
                    color: "#6b7280",
                    minWidth: "140px"
                  }}>
                    <option>All Statuses</option>
                    <option>Pending Review</option>
                    <option>Under Review</option>
                    <option>Approved</option>
                    <option>Rejected</option>
                    <option>Needs Changes</option>
                  </select>

                  <select style={{
                    padding: "0.75rem 1rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "0.875rem",
                    background: "white",
                    color: "#6b7280",
                    minWidth: "140px"
                  }}>
                    <option>All Categories</option>
                    <option>Productivity</option>
                    <option>Communication</option>
                    <option>Analytics</option>
                    <option>E-commerce</option>
                    <option>Marketing</option>
                    <option>Design Tools</option>
                  </select>

                  <select style={{
                    padding: "0.75rem 1rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "0.875rem",
                    background: "white",
                    color: "#6b7280",
                    minWidth: "120px"
                  }}>
                    <option>Sort by Date</option>
                    <option>Newest First</option>
                    <option>Oldest First</option>
                    <option>Priority</option>
                  </select>
                </div>
              </div>

              {/* Statistics Cards */}
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
                gap: "1.5rem", 
                marginBottom: "2rem" 
              }}>
                <div style={{ background: "white", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", border: "1px solid #e5e7eb" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>Pending Requests</span>
                    <span style={{ fontSize: "1.25rem" }}>⏳</span>
                  </div>
                  <div style={{ fontSize: "2rem", fontWeight: "600", color: "#f59e0b" }}>7</div>
                  <div style={{ color: "#6b7280", fontSize: "0.75rem" }}>Awaiting review</div>
                </div>

                <div style={{ background: "white", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", border: "1px solid #e5e7eb" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>Approved Today</span>
                    <span style={{ fontSize: "1.25rem" }}>✅</span>
                  </div>
                  <div style={{ fontSize: "2rem", fontWeight: "600", color: "#10b981" }}>3</div>
                  <div style={{ color: "#10b981", fontSize: "0.75rem" }}>+2 from yesterday</div>
                </div>

                <div style={{ background: "white", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", border: "1px solid #e5e7eb" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>Under Review</span>
                    <span style={{ fontSize: "1.25rem" }}>👀</span>
                  </div>
                  <div style={{ fontSize: "2rem", fontWeight: "600", color: "#3b82f6" }}>2</div>
                  <div style={{ color: "#6b7280", fontSize: "0.75rem" }}>In progress</div>
                </div>

                <div style={{ background: "white", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", border: "1px solid #e5e7eb" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>Avg Response Time</span>
                    <span style={{ fontSize: "1.25rem" }}>⏱️</span>
                  </div>
                  <div style={{ fontSize: "2rem", fontWeight: "600", color: "#1f2937" }}>2.4</div>
                  <div style={{ color: "#6b7280", fontSize: "0.75rem" }}>days</div>
                </div>
              </div>

              {/* App Requests Table */}
              <div style={{
                background: "white",
                borderRadius: "12px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                border: "1px solid #e5e7eb",
                overflow: "hidden"
              }}>
                {/* Table Header */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "60px 200px 150px 120px 120px 120px 150px",
                  gap: "1rem",
                  padding: "1rem 1.5rem",
                  background: "#f9fafb",
                  borderBottom: "1px solid #e5e7eb",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  color: "#374151"
                }}>
                  <div>
                    <input type="checkbox" style={{ cursor: "pointer" }} />
                  </div>
                  <div>App Details</div>
                  <div>Developer</div>
                  <div>Category</div>
                  <div>Submitted</div>
                  <div>Status</div>
                  <div>Actions</div>
                </div>

                {/* Table Rows */}
                <div>
                  {/* Request 1 - Pending */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "60px 200px 150px 120px 120px 120px 150px",
                    gap: "1rem",
                    padding: "1rem 1.5rem",
                    borderBottom: "1px solid #f3f4f6",
                    alignItems: "center"
                  }}>
                    <div>
                      <input type="checkbox" style={{ cursor: "pointer" }} />
                    </div>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <div style={{
                          width: "40px",
                          height: "40px",
                          background: "#f3f4f6",
                          borderRadius: "8px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "1.25rem",
                          border: "1px solid #e5e7eb"
                        }}>
                          📊
                        </div>
                        <div>
                          <div style={{ fontWeight: "500", color: "#1f2937", fontSize: "0.875rem" }}>DataViz Pro</div>
                          <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>Advanced Data Visualization</div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: "0.875rem", color: "#1f2937", fontWeight: "500" }}>ChartWorks Inc.</div>
                      <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>charts@chartworks.com</div>
                    </div>
                    <div>
                      <span style={{
                        padding: "0.25rem 0.75rem",
                        background: "#f3e8ff",
                        color: "#7c3aed",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        fontWeight: "500"
                      }}>
                        Analytics
                      </span>
                    </div>
                    <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>2 hours ago</div>
                    <div>
                      <span style={{
                        padding: "0.25rem 0.75rem",
                        background: "#fef3c7",
                        color: "#92400e",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        fontWeight: "500"
                      }}>
                        Pending Review
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button style={{
                        background: "#3b82f6",
                        color: "white",
                        border: "none",
                        padding: "0.25rem 0.5rem",
                        borderRadius: "4px",
                        fontSize: "0.75rem",
                        cursor: "pointer"
                      }}
                      onClick={() => alert("Review DataViz Pro request")}
                      title="Review Request"
                      >
                        👁️
                      </button>
                      <button style={{
                        background: "#10b981",
                        color: "white",
                        border: "none",
                        padding: "0.25rem 0.5rem",
                        borderRadius: "4px",
                        fontSize: "0.75rem",
                        cursor: "pointer"
                      }}
                      onClick={() => alert("Approve DataViz Pro")}
                      title="Approve"
                      >
                        ✅
                      </button>
                      <button style={{
                        background: "#ef4444",
                        color: "white",
                        border: "none",
                        padding: "0.25rem 0.5rem",
                        borderRadius: "4px",
                        fontSize: "0.75rem",
                        cursor: "pointer"
                      }}
                      onClick={() => alert("Reject DataViz Pro")}
                      title="Reject"
                      >
                        ❌
                      </button>
                    </div>
                  </div>

                  {/* Request 2 - Under Review */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "60px 200px 150px 120px 120px 120px 150px",
                    gap: "1rem",
                    padding: "1rem 1.5rem",
                    borderBottom: "1px solid #f3f4f6",
                    alignItems: "center"
                  }}>
                    <div>
                      <input type="checkbox" style={{ cursor: "pointer" }} />
                    </div>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <div style={{
                          width: "40px",
                          height: "40px",
                          background: "#f3f4f6",
                          borderRadius: "8px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "1.25rem",
                          border: "1px solid #e5e7eb"
                        }}>
                          💬
                        </div>
                        <div>
                          <div style={{ fontWeight: "500", color: "#1f2937", fontSize: "0.875rem" }}>TeamChat Plus</div>
                          <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>Team Communication Platform</div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: "0.875rem", color: "#1f2937", fontWeight: "500" }}>ConnectSoft</div>
                      <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>hello@connectsoft.io</div>
                    </div>
                    <div>
                      <span style={{
                        padding: "0.25rem 0.75rem",
                        background: "#dbeafe",
                        color: "#1e40af",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        fontWeight: "500"
                      }}>
                        Communication
                      </span>
                    </div>
                    <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>1 day ago</div>
                    <div>
                      <span style={{
                        padding: "0.25rem 0.75rem",
                        background: "#dbeafe",
                        color: "#1e40af",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        fontWeight: "500"
                      }}>
                        Under Review
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button style={{
                        background: "#3b82f6",
                        color: "white",
                        border: "none",
                        padding: "0.25rem 0.5rem",
                        borderRadius: "4px",
                        fontSize: "0.75rem",
                        cursor: "pointer"
                      }}
                      onClick={() => alert("Continue reviewing TeamChat Plus")}
                      title="Continue Review"
                      >
                        👁️
                      </button>
                      <button style={{
                        background: "#10b981",
                        color: "white",
                        border: "none",
                        padding: "0.25rem 0.5rem",
                        borderRadius: "4px",
                        fontSize: "0.75rem",
                        cursor: "pointer"
                      }}
                      onClick={() => alert("Approve TeamChat Plus")}
                      title="Approve"
                      >
                        ✅
                      </button>
                      <button style={{
                        background: "#f59e0b",
                        color: "white",
                        border: "none",
                        padding: "0.25rem 0.5rem",
                        borderRadius: "4px",
                        fontSize: "0.75rem",
                        cursor: "pointer"
                      }}
                      onClick={() => alert("Request changes for TeamChat Plus")}
                      title="Request Changes"
                      >
                        📝
                      </button>
                    </div>
                  </div>

                  {/* Request 3 - Needs Changes */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "60px 200px 150px 120px 120px 120px 150px",
                    gap: "1rem",
                    padding: "1rem 1.5rem",
                    borderBottom: "1px solid #f3f4f6",
                    alignItems: "center"
                  }}>
                    <div>
                      <input type="checkbox" style={{ cursor: "pointer" }} />
                    </div>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <div style={{
                          width: "40px",
                          height: "40px",
                          background: "#f3f4f6",
                          borderRadius: "8px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "1.25rem",
                          border: "1px solid #e5e7eb"
                        }}>
                          🛒
                        </div>
                        <div>
                          <div style={{ fontWeight: "500", color: "#1f2937", fontSize: "0.875rem" }}>QuickStore Builder</div>
                          <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>E-commerce Store Creator</div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: "0.875rem", color: "#1f2937", fontWeight: "500" }}>ShopTech Ltd</div>
                      <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>dev@shoptech.com</div>
                    </div>
                    <div>
                      <span style={{
                        padding: "0.25rem 0.75rem",
                        background: "#fef2f2",
                        color: "#dc2626",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        fontWeight: "500"
                      }}>
                        E-commerce
                      </span>
                    </div>
                    <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>3 days ago</div>
                    <div>
                      <span style={{
                        padding: "0.25rem 0.75rem",
                        background: "#fef3c7",
                        color: "#92400e",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        fontWeight: "500"
                      }}>
                        Needs Changes
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button style={{
                        background: "#3b82f6",
                        color: "white",
                        border: "none",
                        padding: "0.25rem 0.5rem",
                        borderRadius: "4px",
                        fontSize: "0.75rem",
                        cursor: "pointer"
                      }}
                      onClick={() => alert("View feedback for QuickStore Builder")}
                      title="View Feedback"
                      >
                        💬
                      </button>
                      <button style={{
                        background: "#8b5cf6",
                        color: "white",
                        border: "none",
                        padding: "0.25rem 0.5rem",
                        borderRadius: "4px",
                        fontSize: "0.75rem",
                        cursor: "pointer"
                      }}
                      onClick={() => alert("Send reminder to developer")}
                      title="Send Reminder"
                      >
                        🔔
                      </button>
                    </div>
                  </div>

                  {/* Request 4 - Recently Approved */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "60px 200px 150px 120px 120px 120px 150px",
                    gap: "1rem",
                    padding: "1rem 1.5rem",
                    borderBottom: "1px solid #f3f4f6",
                    alignItems: "center",
                    background: "#f0fdf4"
                  }}>
                    <div>
                      <input type="checkbox" style={{ cursor: "pointer" }} />
                    </div>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <div style={{
                          width: "40px",
                          height: "40px",
                          background: "#f3f4f6",
                          borderRadius: "8px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "1.25rem",
                          border: "1px solid #e5e7eb"
                        }}>
                          📧
                        </div>
                        <div>
                          <div style={{ fontWeight: "500", color: "#1f2937", fontSize: "0.875rem" }}>MailCraft Pro</div>
                          <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>Email Marketing Suite</div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: "0.875rem", color: "#1f2937", fontWeight: "500" }}>EmailWorks</div>
                      <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>team@emailworks.net</div>
                    </div>
                    <div>
                      <span style={{
                        padding: "0.25rem 0.75rem",
                        background: "#ecfdf5",
                        color: "#059669",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        fontWeight: "500"
                      }}>
                        Marketing
                      </span>
                    </div>
                    <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>5 days ago</div>
                    <div>
                      <span style={{
                        padding: "0.25rem 0.75rem",
                        background: "#dcfce7",
                        color: "#166534",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        fontWeight: "500"
                      }}>
                        Approved
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button style={{
                        background: "#6b7280",
                        color: "white",
                        border: "none",
                        padding: "0.25rem 0.5rem",
                        borderRadius: "4px",
                        fontSize: "0.75rem",
                        cursor: "pointer"
                      }}
                      onClick={() => alert("View MailCraft Pro in marketplace")}
                      title="View in Marketplace"
                      >
                        👁️
                      </button>
                      <button style={{
                        background: "#8b5cf6",
                        color: "white",
                        border: "none",
                        padding: "0.25rem 0.5rem",
                        borderRadius: "4px",
                        fontSize: "0.75rem",
                        cursor: "pointer"
                      }}
                      onClick={() => alert("Contact developer")}
                      title="Contact Developer"
                      >
                        📞
                      </button>
                    </div>
                  </div>

                  {/* Request 5 - Rejected */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "60px 200px 150px 120px 120px 120px 150px",
                    gap: "1rem",
                    padding: "1rem 1.5rem",
                    alignItems: "center",
                    opacity: "0.6"
                  }}>
                    <div>
                      <input type="checkbox" style={{ cursor: "pointer" }} />
                    </div>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <div style={{
                          width: "40px",
                          height: "40px",
                          background: "#f3f4f6",
                          borderRadius: "8px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "1.25rem",
                          border: "1px solid #e5e7eb"
                        }}>
                          🎮
                        </div>
                        <div>
                          <div style={{ fontWeight: "500", color: "#1f2937", fontSize: "0.875rem" }}>GameTime Manager</div>
                          <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>Gaming Time Tracker</div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: "0.875rem", color: "#1f2937", fontWeight: "500" }}>PlayDev Studios</div>
                      <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>contact@playdev.co</div>
                    </div>
                    <div>
                      <span style={{
                        padding: "0.25rem 0.75rem",
                        background: "#e5e7eb",
                        color: "#6b7280",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        fontWeight: "500"
                      }}>
                        Entertainment
                      </span>
                    </div>
                    <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>1 week ago</div>
                    <div>
                      <span style={{
                        padding: "0.25rem 0.75rem",
                        background: "#fee2e2",
                        color: "#991b1b",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        fontWeight: "500"
                      }}>
                        Rejected
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button style={{
                        background: "#6b7280",
                        color: "white",
                        border: "none",
                        padding: "0.25rem 0.5rem",
                        borderRadius: "4px",
                        fontSize: "0.75rem",
                        cursor: "pointer"
                      }}
                      onClick={() => alert("View rejection reason")}
                      title="View Rejection Reason"
                      >
                        📄
                      </button>
                      <button style={{
                        background: "#f59e0b",
                        color: "white",
                        border: "none",
                        padding: "0.25rem 0.5rem",
                        borderRadius: "4px",
                        fontSize: "0.75rem",
                        cursor: "pointer"
                      }}
                      onClick={() => alert("Archive request")}
                      title="Archive"
                      >
                        📦
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions Section */}
              <div style={{
                background: "white",
                borderRadius: "12px",
                padding: "1.5rem",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                border: "1px solid #e5e7eb",
                marginTop: "2rem"
              }}>
                <h3 style={{ fontSize: "1.125rem", fontWeight: "600", color: "#1f2937", marginBottom: "1rem" }}>Quick Actions</h3>

                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  <button style={{
                    background: "#10b981",
                    color: "white",
                    border: "none",
                    padding: "0.75rem 1.5rem",
                    borderRadius: "8px",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem"
                  }}
                  onClick={() => alert("Set approval criteria clicked!")}
                  >
                    <span>📋</span>
                    Set Approval Criteria
                  </button>

                  <button style={{
                    background: "#f59e0b",
                    color: "white",
                    border: "none",
                    padding: "0.75rem 1.5rem",
                    borderRadius: "8px",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem"
                  }}
                  onClick={() => alert("Export requests data clicked!")}
                  >
                    <span>📊</span>
                    Export Requests Data
                  </button>

                  <button style={{
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
                    gap: "0.5rem"
                  }}
                  onClick={() => alert("Send batch notifications clicked!")}
                  >
                    <span>🔔</span>
                    Send Batch Notifications
                  </button>

                  <button style={{
                    background: "#ef4444",
                    color: "white",
                    border: "none",
                    padding: "0.75rem 1.5rem",
                    borderRadius: "8px",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem"
                  }}
                  onClick={() => alert("Archive old requests clicked!")}
                  >
                    <span>📦</span>
                    Archive Old Requests
                  </button>
                </div>
              </div>

              {/* Review Guidelines */}
              <div style={{
                background: "#f8fafc",
                borderRadius: "12px",
                padding: "1.5rem",
                marginTop: "2rem",
                border: "1px solid #e2e8f0"
              }}>
                <h3 style={{ fontSize: "1.125rem", fontWeight: "600", color: "#1f2937", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span>📖</span>
                  App Review Guidelines
                </h3>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
                  <div>
                    <h4 style={{ fontSize: "0.875rem", fontWeight: "600", color: "#374151", marginBottom: "0.5rem" }}>Quality Standards</h4>
                    <ul style={{ fontSize: "0.875rem", color: "#6b7280", lineHeight: "1.5", paddingLeft: "1rem" }}>
                      <li>App must be functional and bug-free</li>
                      <li>Clear description and proper categorization</li>
                      <li>Professional presentation and branding</li>
                    </ul>
                  </div>

                  <div>
                    <h4 style={{ fontSize: "0.875rem", fontWeight: "600", color: "#374151", marginBottom: "0.5rem" }}>Content Policy</h4>
                    <ul style={{ fontSize: "0.875rem", color: "#6b7280", lineHeight: "1.5", paddingLeft: "1rem" }}>
                      <li>No inappropriate or harmful content</li>
                      <li>Respect intellectual property rights</li>
                      <li>Comply with platform terms of service</li>
                    </ul>
                  </div>

                  <div>
                    <h4 style={{ fontSize: "0.875rem", fontWeight: "600", color: "#374151", marginBottom: "0.5rem" }}>Security Requirements</h4>
                    <ul style={{ fontSize: "0.875rem", color: "#6b7280", lineHeight: "1.5", paddingLeft: "1rem" }}>
                      <li>Secure data handling practices</li>
                      <li>Valid SSL certificates for external links</li>
                      <li>No malicious code or vulnerabilities</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          );

        case "my-activity":
          return (
            <div>
              <h3>📱 My Activity (as Customer)</h3>
              <p>View your own activity as a customer.</p>
            </div>
          );

        case "my-software-subscriptions":
          return (
            <div>
              <div style={{ marginBottom: "2rem" }}>
                <h2 style={{ fontSize: "2rem", fontWeight: "600", color: "#1f2937", marginBottom: "0.5rem" }}>My Software Subscriptions</h2>
                <p style={{ color: "#6b7280" }}>Manage software you've subscribed to as a customer.</p>
              </div>

              {/* Search and Filter Bar */}
              <div style={{ marginBottom: "2rem", display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
                <div style={{ position: "relative", flex: "1", minWidth: "300px" }}>
                  <input
                    type="text"
                    placeholder="Search subscriptions..."
                    style={{
                      width: "100%",
                      padding: "0.75rem 1rem 0.75rem 2.5rem",
                      border: "1px solid #d1d5db",
                      borderRadius: "8px",
                      fontSize: "0.875rem",
                      background: "white",
                      outline: "none"
                    }}
                  />
                  <div style={{
                    position: "absolute",
                    left: "0.75rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#9ca3af",
                    fontSize: "1rem"
                  }}>
                    🔍
                  </div>
                </div>

                <select style={{
                  padding: "0.75rem 1rem",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                  fontSize: "0.875rem",
                  background: "white",
                  color: "#6b7280",
                  minWidth: "130px"
                }}>
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Trial</option>
                  <option>Expired</option>
                  <option>Cancelled</option>
                </select>

                <select style={{
                  padding: "0.75rem 1rem",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                  fontSize: "0.875rem",
                  background: "white",
                  color: "#6b7280",
                  minWidth: "120px"
                }}>
                  <option>All Plans</option>
                  <option>Basic</option>
                  <option>Pro</option>
                  <option>Premium</option>
                  <option>Enterprise</option>
                </select>
              </div>

              {/* Subscriptions Table */}
              <div style={{
                background: "white",
                borderRadius: "12px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                border: "1px solid #e5e7eb",
                overflow: "hidden"
              }}>
                {/* Table Header */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "200px 150px 120px 120px 100px 120px",
                  gap: "1rem",
                  padding: "1rem 1.5rem",
                  background: "#f9fafb",
                  borderBottom: "1px solid #e5e7eb",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  color: "#374151"
                }}>
                  <div>Software</div>
                  <div>Plan</div>
                  <div>Expiry Date</div>
                  <div>Status</div>
                  <div>Auto-Renew</div>
                  <div>Actions</div>
                </div>

                {/* Table Rows */}
                <div>
                  {/* CMS Subscription */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "200px 150px 120px 120px 100px 120px",
                    gap: "1rem",
                    padding: "1rem 1.5rem",
                    borderBottom: "1px solid #f3f4f6",
                    alignItems: "center"
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <div style={{
                        width: "40px",
                        height: "40px",
                        background: "#f3f4f6",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.25rem",
                        border: "1px solid #e5e7eb"
                      }}>
                        📝
                      </div>
                      <div>
                        <div style={{ fontWeight: "500", color: "#1f2937", fontSize: "0.875rem" }}>cms</div>
                        <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>Provider: platform_owner</div>
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: "0.875rem", color: "#1f2937", fontWeight: "500" }}>pro</div>
                      <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>{formatCurrency(20.00)}/monthly</div>
                    </div>
                    <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>Jun 23, 2025</div>
                    <div>
                      <span style={{
                        padding: "0.25rem 0.75rem",
                        background: "#dbeafe",
                        color: "#1e40af",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        fontWeight: "500",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.25rem",
                        width: "fit-content"
                      }}>
                        🔵 Trial
                      </span>
                    </div>
                    <div>
                      <span style={{
                        padding: "0.25rem 0.75rem",
                        background: "#dcfce7",
                        color: "#166534",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        fontWeight: "500"
                      }}>
                        On
                      </span>
                    </div>
                    <div>
                      <button style={{
                        background: "#3b82f6",
                        color: "white",
                        border: "none",
                        padding: "0.25rem 0.75rem",
                        borderRadius: "4px",
                        fontSize: "0.75rem",
                        cursor: "pointer",
                        marginRight: "0.5rem"
                      }}
                      onClick={() => alert("Access cms software")}
                      >
                        Access
                      </button>
                    </div>
                  </div>

                  {/* Sample Premium Subscription */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "200px 150px 120px 120px 100px 120px",
                    gap: "1rem",
                    padding: "1rem 1.5rem",
                    borderBottom: "1px solid #f3f4f6",
                    alignItems: "center"
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <div style={{
                        width: "40px",
                        height: "40px",
                        background: "#f3f4f6",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.25rem",
                        border: "1px solid #e5e7eb"
                      }}>
                        💻
                      </div>
                      <div>
                        <div style={{ fontWeight: "500", color: "#1f2937", fontSize: "0.875rem" }}>TaskMaster Pro</div>
                        <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>Provider: TechCorp</div>
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: "0.875rem", color: "#1f2937", fontWeight: "500" }}>premium</div>
                      <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>{formatCurrency(29.99)}/monthly</div>
                    </div>
                    <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>Aug 15, 2025</div>
                    <div>
                      <span style={{
                        padding: "0.25rem 0.75rem",
                        background: "#dcfce7",
                        color: "#166534",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        fontWeight: "500",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.25rem",
                        width: "fit-content"
                      }}>
                        🟢 Active
                      </span>
                    </div>
                    <div>
                      <span style={{
                        padding: "0.25rem 0.75rem",
                        background: "#dcfce7",
                        color: "#166534",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        fontWeight: "500"
                      }}>
                        On
                      </span>
                    </div>
                    <div>
                      <button style={{
                        background: "#3b82f6",
                        color: "white",
                        border: "none",
                        padding: "0.25rem 0.75rem",
                        borderRadius: "4px",
                        fontSize: "0.75rem",
                        cursor: "pointer",
                        marginRight: "0.5rem"
                      }}
                      onClick={() => alert("Access TaskMaster Pro")}
                      >
                        Access
                      </button>
                    </div>
                  </div>

                  {/* Sample Expired Subscription */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "200px 150px 120px 120px 100px 120px",
                    gap: "1rem",
                    padding: "1rem 1.5rem",
                    alignItems: "center",
                    opacity: "0.7"
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <div style={{
                        width: "40px",
                        height: "40px",
                        background: "#f3f4f6",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.25rem",
                        border: "1px solid #e5e7eb"
                      }}>
                        📊
                      </div>
                      <div>
                        <div style={{ fontWeight: "500", color: "#1f2937", fontSize: "0.875rem" }}>Analytics Pro</div>
                        <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>Provider: DataCorp</div>
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: "0.875rem", color: "#1f2937", fontWeight: "500" }}>basic</div>
                      <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>{formatCurrency(15.00)}/monthly</div>
                    </div>
                    <div style={{ fontSize: "0.875rem", color: "#ef4444" }}>May 20, 2025</div>
                    <div>
                      <span style={{
                        padding: "0.25rem 0.75rem",
                        background: "#fee2e2",
                        color: "#991b1b",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        fontWeight: "500",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.25rem",
                        width: "fit-content"
                      }}>
                        🔴 Expired
                      </span>
                    </div>
                    <div>
                      <span style={{
                        padding: "0.25rem 0.75rem",
                        background: "#fee2e2",
                        color: "#991b1b",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        fontWeight: "500"
                      }}>
                        Off
                      </span>
                    </div>
                    <div>
                      <button style={{
                        background: "#10b981",
                        color: "white",
                        border: "none",
                        padding: "0.25rem 0.75rem",
                        borderRadius: "4px",
                        fontSize: "0.75rem",
                        cursor: "pointer",
                        marginRight: "0.5rem"
                      }}
                      onClick={() => alert("Renew Analytics Pro subscription")}
                      >
                        Renew
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary Statistics */}
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
                gap: "1.5rem", 
                marginTop: "2rem" 
              }}>
                <div style={{ background: "white", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", border: "1px solid #e5e7eb" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>Total Subscriptions</span>
                    <span style={{ fontSize: "1.25rem" }}>📦</span>
                  </div>
                  <div style={{ fontSize: "2rem", fontWeight: "600", color: "#1f2937" }}>3</div>
                  <div style={{ color: "#6b7280", fontSize: "0.75rem" }}>2 active, 1 expired</div>
                </div>

                <div style={{ background: "white", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", border: "1px solid #e5e7eb" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>Monthly Spending</span>
                    <span style={{ fontSize: "1.25rem" }}>💰</span>
                  </div>
                  <div style={{ fontSize: "2rem", fontWeight: "600", color: "#1f2937" }}>{formatCurrency(49.99)}</div>
                  <div style={{ color: "#6b7280", fontSize: "0.75rem" }}>Active subscriptions only</div>
                </div>

                <div style={{ background: "white", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", border: "1px solid #e5e7eb" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>Next Renewal</span>
                    <span style={{ fontSize: "1.25rem" }}>📅</span>
                  </div>
                  <div style={{ fontSize: "1.5rem", fontWeight: "600", color: "#1f2937" }}>Jun 23</div>
                  <div style={{ color: "#6b7280", fontSize: "0.75rem" }}>CMS pro subscription</div>
                </div>

                <div style={{ background: "white", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", border: "1px solid #e5e7eb" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>Trial Subscriptions</span>
                    <span style={{ fontSize: "1.25rem" }}>🔵</span>
                  </div>
                  <div style={{ fontSize: "2rem", fontWeight: "600", color: "#3b82f6" }}>1</div>
                  <div style={{ color: "#6b7280", fontSize: "0.75rem" }}>CMS trial expires soon</div>
                </div>
              </div>

              {/* Quick Actions */}
              <div style={{
                background: "white",
                borderRadius: "12px",
                padding: "1.5rem",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                border: "1px solid #e5e7eb",
                marginTop: "2rem"
              }}>
                <h3 style={{ fontSize: "1.125rem", fontWeight: "600", color: "#1f2937", marginBottom: "1rem" }}>Quick Actions</h3>

                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  <button style={{
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
                    gap: "0.5rem"
                  }}
                  onClick={() => setActiveSection("marketplace")}
                  >
                    <span>🛒</span>
                    Browse Marketplace
                  </button>

                  <button style={{
                    background: "#10b981",
                    color: "white",
                    border: "none",
                    padding: "0.75rem 1.5rem",
                    borderRadius: "8px",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem"
                  }}
                  onClick={() => alert("Manage auto-renewal settings")}
                  >
                    <span>🔄</span>
                    Manage Auto-Renewal
                  </button>

                  <button style={{
                    background: "#f59e0b",
                    color: "white",
                    border: "none",
                    padding: "0.75rem 1.5rem",
                    borderRadius: "8px",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem"
                  }}
                  onClick={() => setActiveSection("my-billing-history")}
                  >
                    <span>🧾</span>
                    View Billing History
                  </button>

                  <button style={{
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
                    gap: "0.5rem"
                  }}
                  onClick={() => alert("Export subscription data")}
                  >
                    <span>📊</span>
                    Export Data
                  </button>
                </div>
              </div>

              {/* Subscription Management Tips */}
              <div style={{
                background: "#f8fafc",
                borderRadius: "12px",
                padding: "1.5rem",
                marginTop: "2rem",
                border: "1px solid #e2e8f0"
              }}>
                <h3 style={{ fontSize: "1.125rem", fontWeight: "600", color: "#1f2937", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span>💡</span>
                  Subscription Management Tips
                </h3>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
                  <div>
                    <h4 style={{ fontSize: "0.875rem", fontWeight: "600", color: "#374151", marginBottom: "0.5rem" }}>Auto-Renewal</h4>
                    <p style={{ fontSize: "0.875rem", color: "#6b7280", lineHeight: "1.5" }}>
                      Keep auto-renewal enabled for critical software to avoid service interruptions.
                    </p>
                  </div>

                  <div>
                    <h4 style={{ fontSize: "0.875rem", fontWeight: "600", color: "#374151", marginBottom: "0.5rem" }}>Trial Management</h4>
                    <p style={{ fontSize: "0.875rem", color: "#6b7280", lineHeight: "1.5" }}>
                      Convert trial subscriptions before they expire to maintain access to your data and settings.
                    </p>
                  </div>

                  <div>
                    <h4 style={{ fontSize: "0.875rem", fontWeight: "600", color: "#374151", marginBottom: "0.5rem" }}>Cost Optimization</h4>
                    <p style={{ fontSize: "0.875rem", color: "#6b7280", lineHeight: "1.5" }}>
                      Review your subscriptions regularly and cancel unused services to optimize costs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );

        case "my-billing-history":
          return (
            <div>
              <div style={{ marginBottom: "2rem" }}>
                <h2 style={{ fontSize: "2rem", fontWeight: "600", color: "#1f2937", marginBottom: "0.5rem" }}>My Billing History (as Customer)</h2>
                <p style={{ color: "#6b7280" }}>Review your payments, invoices, and plan changes for software you've subscribed to.</p>
              </div>

              {/* Payment Receipts Section */}
              <div style={{
                background: "white",
                borderRadius: "12px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                border: "1px solid #e5e7eb",
                marginBottom: "2rem",
                overflow: "hidden"
              }}>
                <div style={{
                  background: "#f9fafb",
                  padding: "1.5rem",
                  borderBottom: "1px solid #e5e7eb"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                    <span style={{ fontSize: "1.25rem" }}>🧾</span>
                    <h3 style={{ fontSize: "1.25rem", fontWeight: "600", color: "#1f2937" }}>Payment Receipts</h3>
                  </div>
                  <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>History of all your payments and their statuses.</p>
                </div>

                <div style={{ padding: "2rem", textAlign: "center" }}>
                  <div style={{ fontSize: "4rem", color: "#9ca3af", marginBottom: "1rem" }}>💰</div>
                  <h4 style={{ fontSize: "1.5rem", color: "#6b7280", marginBottom: "0.5rem" }}>No Transactions Yet</h4>
                  <p style={{ color: "#9ca3af", fontSize: "0.875rem", marginBottom: "2rem" }}>
                    Your payment history will appear here once you make a subscription.
                  </p>

                  {/* Sample Transaction for Demo */}
                  <div style={{ 
                    background: "#f8fafc", 
                    borderRadius: "8px", 
                    padding: "1rem",
                    border: "1px dashed #d1d5db",
                    marginTop: "2rem"
                  }}>
                    <p style={{ color: "#6b7280", fontSize: "0.875rem", fontStyle: "italic" }}>
                      Example: When you subscribe to software, transactions like "Payment for CMS Pro Plan - {formatCurrency(20.00)}" will appear here with receipt downloads.
                    </p>
                  </div>
                </div>
              </div>

              {/* Sample Billing History Table (when transactions exist) */}
              <div style={{
                background: "white",
                borderRadius: "12px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                border: "1px solid #e5e7eb",
                marginBottom: "2rem",
                overflow: "hidden"
              }}>
                <div style={{
                  background: "#f9fafb",
                  padding: "1.5rem",
                  borderBottom: "1px solid #e5e7eb"
                }}>
                  <h3 style={{ fontSize: "1.125rem", fontWeight: "600", color: "#1f2937", marginBottom: "0.5rem" }}>Recent Transactions</h3>
                  <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>Your latest billing activity and payment history.</p>
                </div>

                {/* Table Header */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "200px 150px 120px 120px 100px 120px",
                  gap: "1rem",
                  padding: "1rem 1.5rem",
                  background: "#f9fafb",
                  borderBottom: "1px solid #e5e7eb",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  color: "#374151"
                }}>
                  <div>Description</div>
                  <div>Software</div>
                  <div>Amount</div>
                  <div>Date</div>
                  <div>Status</div>
                  <div>Receipt</div>
                </div>

                {/* Sample Transaction Rows */}
                <div>
                  {/* Sample Transaction 1 - Trial Conversion */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "200px 150px 120px 120px 100px 120px",
                    gap: "1rem",
                    padding: "1rem 1.5rem",
                    borderBottom: "1px solid #f3f4f6",
                    alignItems: "center",
                    background: "#f0fdf4"
                  }}>
                    <div>
                      <div style={{ fontWeight: "500", color: "#1f2937", fontSize: "0.875rem" }}>Trial to Pro Upgrade</div>
                      <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>Monthly subscription</div>
                    </div>
                    <div style={{ fontSize: "0.875rem", color: "#1f2937" }}>cms</div>
                    <div style={{ fontSize: "0.875rem", color: "#1f2937", fontWeight: "600" }}>{formatCurrency(20.00)}</div>
                    <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>Jun 23, 2025</div>
                    <div>
                      <span style={{
                        padding: "0.25rem 0.75rem",
                        background: "#dcfce7",
                        color: "#166534",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        fontWeight: "500"
                      }}>
                        Completed
                      </span>
                    </div>
                    <div>
                      <button style={{
                        background: "#3b82f6",
                        color: "white",
                        border: "none",
                        padding: "0.25rem 0.75rem",
                        borderRadius: "4px",
                        fontSize: "0.75rem",
                        cursor: "pointer"
                      }}
                      onClick={() => alert("Download receipt for CMS Pro subscription")}
                      >
                        Download
                      </button>
                    </div>
                  </div>

                  {/* Sample Transaction 2 - TaskMaster Pro */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "200px 150px 120px 120px 100px 120px",
                    gap: "1rem",
                    padding: "1rem 1.5rem",
                    borderBottom: "1px solid #f3f4f6",
                    alignItems: "center"
                  }}>
                    <div>
                      <div style={{ fontWeight: "500", color: "#1f2937", fontSize: "0.875rem" }}>Premium Plan Payment</div>
                      <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>Monthly subscription</div>
                    </div>
                    <div style={{ fontSize: "0.875rem", color: "#1f2937" }}>TaskMaster Pro</div>
                    <div style={{ fontSize: "0.875rem", color: "#1f2937", fontWeight: "600" }}>{formatCurrency(29.99)}</div>
                    <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>May 15, 2025</div>
                    <div>
                      <span style={{
                        padding: "0.25rem 0.75rem",
                        background: "#dcfce7",
                        color: "#166534",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        fontWeight: "500"
                      }}>
                        Completed
                      </span>
                    </div>
                    <div>
                      <button style={{
                        background: "#3b82f6",
                        color: "white",
                        border: "none",
                        padding: "0.25rem 0.75rem",
                        borderRadius: "4px",
                        fontSize: "0.75rem",
                        cursor: "pointer"
                      }}
                      onClick={() => alert("Download receipt for TaskMaster Pro")}
                      >
                        Download
                      </button>
                    </div>
                  </div>

                  {/* Sample Transaction 3 - Failed Payment */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "200px 150px 120px 120px 100px 120px",
                    gap: "1rem",
                    padding: "1rem 1.5rem",
                    borderBottom: "1px solid #f3f4f6",
                    alignItems: "center",
                    opacity: "0.7"
                  }}>
                    <div>
                      <div style={{ fontWeight: "500", color: "#1f2937", fontSize: "0.875rem" }}>Analytics Pro Renewal</div>
                      <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>Monthly subscription</div>
                    </div>
                    <div style={{ fontSize: "0.875rem", color: "#1f2937" }}>Analytics Pro</div>
                    <div style={{ fontSize: "0.875rem", color: "#1f2937", fontWeight: "600" }}>{formatCurrency(15.00)}</div>
                    <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>May 20, 2025</div>
                    <div>
                      <span style={{
                        padding: "0.25rem 0.75rem",
                        background: "#fee2e2",
                        color: "#991b1b",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        fontWeight: "500"
                      }}>
                        Failed
                      </span>
                    </div>
                    <div>
                      <button style={{
                        background: "#6b7280",
                        color: "white",
                        border: "none",
                        padding: "0.25rem 0.75rem",
                        borderRadius: "4px",
                        fontSize: "0.75rem",
                        cursor: "not-allowed",
                        opacity: "0.5"
                      }}
                      disabled
                      >
                        Unavailable
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Manage Payment Methods Section */}
              <div style={{
                background: "white",
                borderRadius: "12px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                border: "1px solid #e5e7eb",
                marginBottom: "2rem",
                overflow: "hidden"
              }}>
                <div style={{
                  background: "#f9fafb",
                  padding: "1.5rem",
                  borderBottom: "1px solid #e5e7eb"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                    <span style={{ fontSize: "1.25rem" }}>💳</span>
                    <h3 style={{ fontSize: "1.25rem", fontWeight: "600", color: "#1f2937" }}>Manage Payment Methods</h3>
                  </div>
                  <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>Update your saved payment details (via Razorpay).</p>
                </div>

                <div style={{ padding: "2rem" }}>
                  <p style={{ color: "#6b7280", marginBottom: "1.5rem" }}>
                    To update your payment methods, please visit your Razorpay customer portal.
                  </p>

                  <button style={{
                    background: "#4f46e5",
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
                    boxShadow: "0 2px 4px rgba(79, 70, 229, 0.3)"
                  }}
                  onClick={() => alert("Redirect to Razorpay Portal")}
                  >
                    <span>🔗</span>
                    Go to Razorpay Portal
                  </button>

                  {/* Payment Method Info */}
                  <div style={{
                    background: "#f8fafc",
                    borderRadius: "8px",
                    padding: "1.5rem",
                    marginTop: "2rem",
                    border: "1px solid #e2e8f0"
                  }}>
                    <h4 style={{ fontSize: "1rem", fontWeight: "600", color: "#1f2937", marginBottom: "1rem" }}>Current Payment Methods</h4>

                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                      {/* Sample Payment Method */}
                      <div style={{
                        background: "white",
                        padding: "1rem",
                        borderRadius: "8px",
                        border: "1px solid #e5e7eb",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between"
                      }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                          <div style={{ fontSize: "1.5rem" }}>💳</div>
                          <div>
                            <div style={{ fontSize: "0.875rem", fontWeight: "500", color: "#1f2937" }}>•••• •••• •••• 1234</div>
                            <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>Expires 12/26 • Default</div>
                          </div>
                        </div>
                        <span style={{
                          padding: "0.25rem 0.75rem",
                          background: "#dcfce7",
                          color: "#166534",
                          borderRadius: "20px",
                          fontSize: "0.75rem",
                          fontWeight: "500"
                        }}>
                          Active
                        </span>
                      </div>

                      {/* Add Payment Method Placeholder */}
                      <div style={{
                        background: "#f9fafb",
                        padding: "1rem",
                        borderRadius: "8px",
                        border: "2px dashed #d1d5db",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        transition: "all 0.2s"
                      }}
                      onClick={() => alert("Add new payment method via Razorpay")}
                      onMouseEnter={(e) => {
                        e.target.style.background = "#f3f4f6";
                        e.target.style.borderColor = "#9ca3af";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = "#f9fafb";
                        e.target.style.borderColor = "#d1d5db";
                      }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#6b7280" }}>
                          <span style={{ fontSize: "1.25rem" }}>➕</span>
                          <span style={{ fontSize: "0.875rem", fontWeight: "500" }}>Add New Payment Method</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Billing Summary */}
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
                gap: "1.5rem", 
                marginBottom: "2rem" 
              }}>
                <div style={{ background: "white", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", border: "1px solid #e5e7eb" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>Total Spent</span>
                    <span style={{ fontSize: "1.25rem" }}>💰</span>
                  </div>
                  <div style={{ fontSize: "2rem", fontWeight: "600", color: "#1f2937" }}>{formatCurrency(49.99)}</div>
                  <div style={{ color: "#6b7280", fontSize: "0.75rem" }}>All time</div>
                </div>

                <div style={{ background: "white", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", border: "1px solid #e5e7eb" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>This Month</span>
                    <span style={{ fontSize: "1.25rem" }}>📅</span>
                  </div>
                  <div style={{ fontSize: "2rem", fontWeight: "600", color: "#1f2937" }}>{formatCurrency(20.00)}</div>
                  <div style={{ color: "#6b7280", fontSize: "0.75rem" }}>June 2025</div>
                </div>

                <div style={{ background: "white", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", border: "1px solid #e5e7eb" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>Active Subscriptions</span>
                    <span style={{ fontSize: "1.25rem" }}>🔄</span>
                  </div>
                  <div style={{ fontSize: "2rem", fontWeight: "600", color: "#10b981" }}>2</div>
                  <div style={{ color: "#10b981", fontSize: "0.75rem" }}>Auto-renewing</div>
                </div>

                <div style={{ background: "white", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", border: "1px solid #e5e7eb" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>Next Payment</span>
                    <span style={{ fontSize: "1.25rem" }}>⏰</span>
                  </div>
                  <div style={{ fontSize: "1.5rem", fontWeight: "600", color: "#1f2937" }}>Jul 15</div>
                  <div style={{ color: "#6b7280", fontSize: "0.75rem" }}>TaskMaster Pro</div>
                </div>
              </div>

              {/* Quick Actions */}
              <div style={{
                background: "white",
                borderRadius: "12px",
                padding: "1.5rem",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                border: "1px solid #e5e7eb",
                marginBottom: "2rem"
              }}>
                <h3 style={{ fontSize: "1.125rem", fontWeight: "600", color: "#1f2937", marginBottom: "1rem" }}>Quick Actions</h3>

                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  <button style={{
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
                    gap: "0.5rem"
                  }}
                  onClick={() => setActiveSection("my-software-subscriptions")}
                  >
                    <span>📋</span>
                    View Subscriptions
                  </button>

                  <button style={{
                    background: "#10b981",
                    color: "white",
                    border: "none",
                    padding: "0.75rem 1.5rem",
                    borderRadius: "8px",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem"
                  }}
                  onClick={() => alert("Export billing data")}
                  >
                    <span>📊</span>
                    Export Data
                  </button>

                  <button style={{
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
                    gap: "0.5rem"
                  }}
                  onClick={() => alert("Update billing preferences")}
                  >
                    <span>⚙️</span>
                    Billing Settings
                  </button>

                  <button style={{
                    background: "#f59e0b",
                    color: "white",
                    border: "none",
                    padding: "0.75rem 1.5rem",
                    borderRadius: "8px",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem"
                  }}
                  onClick={() => alert("Contact billing support")}
                  >
                    <span>🎧</span>
                    Billing Support
                  </button>
                </div>
              </div>

              {/* Billing Information */}
              <div style={{
                background: "#f8fafc",
                borderRadius: "12px",
                padding: "1.5rem",
                border: "1px solid #e2e8f0"
              }}>
                <h3 style={{ fontSize: "1.125rem", fontWeight: "600", color: "#1f2937", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span>ℹ️</span>
                  Billing Information
                </h3>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
                  <div>
                    <h4 style={{ fontSize: "0.875rem", fontWeight: "600", color: "#374151", marginBottom: "0.5rem" }}>Payment Processing</h4>
                    <p style={{ fontSize: "0.875rem", color: "#6b7280", lineHeight: "1.5" }}>
                      All payments are securely processed through Razorpay. Your payment information is encrypted and never stored on our servers.
                    </p>
                  </div>

                  <div>
                    <h4 style={{ fontSize: "0.875rem", fontWeight: "600", color: "#374151", marginBottom: "0.5rem" }}>Billing Cycle</h4>
                    <p style={{ fontSize: "0.875rem", color: "#6b7280", lineHeight: "1.5" }}>
                      Subscriptions are billed according to the plan you've chosen. You'll receive email notifications before each billing cycle.
                    </p>
                  </div>

                  <div>
                    <h4 style={{ fontSize: "0.875rem", fontWeight: "600", color: "#374151", marginBottom: "0.5rem" }}>Receipt Downloads</h4>
                    <p style={{ fontSize: "0.875rem", color: "#6b7280", lineHeight: "1.5" }}>
                      Download receipts for your records at any time. All successful payments include downloadable receipts for tax purposes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );

        case "admin-settings":
          return (
            <div>
              <div style={{ marginBottom: "2rem" }}>
                <h2 style={{ fontSize: "2rem", fontWeight: "600", color: "#1f2937", marginBottom: "0.5rem" }}>Security Settings</h2>
                <p style={{ color: "#6b7280" }}>Configure security policies and access controls for your platform.</p>
              </div>

              {/* Authentication & Access Control */}
              <div style={{
                background: "white",
                borderRadius: "12px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                border: "1px solid #e5e7eb",
                marginBottom: "2rem",
                overflow: "hidden"
              }}>
                <div style={{
                  background: "#f9fafb",
                  padding: "1.5rem",
                  borderBottom: "1px solid #e5e7eb"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                    <span style={{ fontSize: "1.25rem" }}>🔐</span>
                    <h3 style={{ fontSize: "1.25rem", fontWeight: "600", color: "#1f2937" }}>Authentication & Access Control</h3>
                  </div>
                  <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>Manage authentication methods and access policies.</p>
                </div>
                <div style={{ padding: "1.5rem" }}>
                  {/* Two-Factor Authentication */}
                  <div style={{ marginBottom: "2rem" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                      <div>
                        <div style={{ fontSize: "0.875rem", fontWeight: "600", color: "#1f2937", marginBottom: "0.25rem" }}>Two-Factor Authentication (2FA)</div>
                        <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>Require 2FA for admin and vendor accounts</div>
                      </div>
                      <label style={{ 
                        position: "relative", 
                        display: "inline-block", 
                        width: "52px", 
                        height: "28px",
                        cursor: "pointer"
                      }}>
                        <input type="checkbox" defaultChecked style={{ opacity: 0, width: 0, height: 0 }} />
                        <span style={{ 
                          position: "absolute", 
                          top: 0, 
                          left: 0, 
                          right: 0, 
                          bottom: 0, 
                          background: "#10b981", 
                          borderRadius: "28px", 
                          transition: "0.3s",
                          boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
                        }}>
                          <span style={{
                            position: "absolute",
                            content: "",
                            height: "22px",
                            width: "22px",
                            right: "3px",
                            top: "3px",
                            background: "white",
                            borderRadius: "50%",
                            transition: "0.3s",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
                          }}></span>
                        </span>
                      </label>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginTop: "1rem" }}>
                      <div>
                        <label style={{ fontSize: "0.875rem", fontWeight: "500", color: "#374151", marginBottom: "0.5rem", display: "block" }}>2FA Method</label>
                        <select style={{ width: "100%", padding: "0.75rem", border: "1px solid #d1d5db", borderRadius: "6px", background: "white" }}>
                          <option>Time-based (TOTP)</option>
                          <option>SMS Code</option>
                          <option>Email Code</option>
                          <option>Hardware Token</option>
                        </select>
                      </div>
                      <div>
                        <label style={{ fontSize: "0.875rem", fontWeight: "500", color: "#374151", marginBottom: "0.5rem", display: "block" }}>Backup Codes</label>
                        <button style={{
                          width: "100%",
                          padding: "0.75rem",
                          border: "1px solid #d1d5db",
                          borderRadius: "6px",
                          background: "#f9fafb",
                          color: "#374151",
                          cursor: "pointer",
                          fontSize: "0.875rem"
                        }} onClick={() => alert("Generate backup codes")}>
                          Generate Backup Codes
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Session Management */}
                  <div style={{ marginBottom: "2rem", paddingTop: "1.5rem", borderTop: "1px solid #e5e7eb" }}>
                    <h4 style={{ fontSize: "1rem", fontWeight: "600", color: "#1f2937", marginBottom: "1rem" }}>Session Management</h4>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1rem" }}>
                      <div>
                        <label style={{ fontSize: "0.875rem", fontWeight: "500", color: "#374151", marginBottom: "0.5rem", display: "block" }}>Session Timeout</label>
                        <select style={{ width: "100%", padding: "0.75rem", border: "1px solid #d1d5db", borderRadius: "6px", background: "white" }}>
                          <option>15 minutes</option>
                          <option>30 minutes</option>
                          <option>1 hour</option>
                          <option>2 hours</option>
                          <option>4 hours</option>
                          <option>8 hours</option>
                        </select>
                      </div>
                      <div>
                        <label style={{ fontSize: "0.875rem", fontWeight: "500", color: "#374151", marginBottom: "0.5rem", display: "block" }}>Max Concurrent Sessions</label>
                        <select style={{ width: "100%", padding: "0.75rem", border: "1px solid #d1d5db", borderRadius: "6px", background: "white" }}>
                          <option>1 session</option>
                          <option>3 sessions</option>
                          <option>5 sessions</option>
                          <option>10 sessions</option>
                          <option>Unlimited</option>
                        </select>
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                      <div>
                        <div style={{ fontSize: "0.875rem", fontWeight: "500", color: "#1f2937" }}>Force Logout on Password Change</div>
                        <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>Automatically logout all sessions when password is changed</div>
                      </div>
                      <label style={{ 
                        position: "relative", 
                        display: "inline-block", 
                        width: "52px", 
                        height: "28px",
                        cursor: "pointer"
                      }}>
                        <input type="checkbox" defaultChecked style={{ opacity: 0, width: 0, height: 0 }} />
                        <span style={{ 
                          position: "absolute", 
                          top: 0, 
                          left: 0, 
                          right: 0, 
                          bottom: 0, 
                          background: "#10b981", 
                          borderRadius: "28px", 
                          transition: "0.3s",
                          boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
                        }}>
                          <span style={{
                            position: "absolute",
                            content: "",
                            height: "22px",
                            width: "22px",
                            right: "3px",
                            top: "3px",
                            background: "white",
                            borderRadius: "50%",
                            transition: "0.3s",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
                          }}></span>
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Password Policies */}
                  <div style={{ marginBottom: "1.5rem", paddingTop: "1.5rem", borderTop: "1px solid #e5e7eb" }}>
                    <h4 style={{ fontSize: "1rem", fontWeight: "600", color: "#1f2937", marginBottom: "1rem" }}>Password Policies</h4>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1rem" }}>
                      <div>
                        <label style={{ fontSize: "0.875rem", fontWeight: "500", color: "#374151", marginBottom: "0.5rem", display: "block" }}>Minimum Password Length</label>
                        <input type="number" defaultValue="8" min="6" max="32" style={{ width: "100%", padding: "0.75rem", border: "1px solid #d1d5db", borderRadius: "6px" }} />
                      </div>
                      <div>
                        <label style={{ fontSize: "0.875rem", fontWeight: "500", color: "#374151", marginBottom: "0.5rem", display: "block" }}>Password Expiry (days)</label>
                        <input type="number" defaultValue="90" min="30" max="365" style={{ width: "100%", padding: "0.75rem", border: "1px solid #d1d5db", borderRadius: "6px" }} />
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <input type="checkbox" defaultChecked style={{ width: "16px", height: "16px" }} />
                        <span style={{ fontSize: "0.875rem", color: "#374151" }}>Require uppercase letters</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <input type="checkbox" defaultChecked style={{ width: "16px", height: "16px" }} />
                        <span style={{ fontSize: "0.875rem", color: "#374151" }}>Require lowercase letters</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <input type="checkbox" defaultChecked style={{ width: "16px", height: "16px" }} />
                        <span style={{ fontSize: "0.875rem", color: "#374151" }}>Require numbers</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <input type="checkbox" defaultChecked style={{ width: "16px", height: "16px" }} />
                        <span style={{ fontSize: "0.875rem", color: "#374151" }}>Require special characters</span>
                      </div>
                    </div>
                  </div>

                  <button style={{ 
                    background: "#3b82f6", 
                    color: "white", 
                    border: "none", 
                    padding: "0.75rem 1.5rem", 
                    borderRadius: "6px", 
                    cursor: "pointer",
                    fontSize: "0.875rem",
                    fontWeight: "500"
                  }} onClick={() => alert("Authentication settings saved!")}>
                    Save Authentication Settings
                  </button>
                </div>
              </div>

              {/* Security Monitoring */}
              <div style={{
                background: "white",
                borderRadius: "12px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                border: "1px solid #e5e7eb",
                marginBottom: "2rem",
                overflow: "hidden"
              }}>
                <div style={{
                  background: "#f9fafb",
                  padding: "1.5rem",
                  borderBottom: "1px solid #e5e7eb"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                    <span style={{ fontSize: "1.25rem" }}>🛡️</span>
                    <h3 style={{ fontSize: "1.25rem", fontWeight: "600", color: "#1f2937" }}>Security Monitoring</h3>
                  </div>
                  <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>Configure security monitoring and threat detection.</p>
                </div>
                <div style={{ padding: "1.5rem" }}>
                  {/* Login Monitoring */}
                  <div style={{ marginBottom: "2rem" }}>
                    <h4 style={{ fontSize: "1rem", fontWeight: "600", color: "#1f2937", marginBottom: "1rem" }}>Login Monitoring</h4>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                      <div>
                        <div style={{ fontSize: "0.875rem", fontWeight: "500", color: "#1f2937" }}>Track Failed Login Attempts</div>
                        <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>Monitor and log failed authentication attempts</div>
                      </div>
                      <label style={{ 
                        position: "relative", 
                        display: "inline-block", 
                        width: "52px", 
                        height: "28px",
                        cursor: "pointer"
                      }}>
                        <input type="checkbox" defaultChecked style={{ opacity: 0, width: 0, height: 0 }} />
                        <span style={{ 
                          position: "absolute", 
                          top: 0, 
                          left: 0, 
                          right: 0, 
                          bottom: 0, 
                          background: "#10b981", 
                          borderRadius: "28px", 
                          transition: "0.3s",
                          boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
                        }}>
                          <span style={{
                            position: "absolute",
                            content: "",
                            height: "22px",
                            width: "22px",
                            right: "3px",
                            top: "3px",
                            background: "white",
                            borderRadius: "50%",
                            transition: "0.3s",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
                          }}></span>
                        </span>
                      </label>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1rem" }}>
                      <div>
                        <label style={{ fontSize: "0.875rem", fontWeight: "500", color: "#374151", marginBottom: "0.5rem", display: "block" }}>Max Failed Attempts</label>
                        <input type="number" defaultValue="5" min="3" max="20" style={{ width: "100%", padding: "0.75rem", border: "1px solid #d1d5db", borderRadius: "6px" }} />
                      </div>
                      <div>
                        <label style={{ fontSize: "0.875rem", fontWeight: "500", color: "#374151", marginBottom: "0.5rem", display: "block" }}>Lockout Duration (minutes)</label>
                        <input type="number" defaultValue="30" min="5" max="1440" style={{ width: "100%", padding: "0.75rem", border: "1px solid #d1d5db", borderRadius: "6px" }} />
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                      <div>
                        <div style={{ fontSize: "0.875rem", fontWeight: "500", color: "#1f2937" }}>Email Alerts for Suspicious Activity</div>
                        <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>Send email notifications for potential security threats</div>
                      </div>
                      <label style={{ 
                        position: "relative", 
                        display: "inline-block", 
                        width: "52px", 
                        height: "28px",
                        cursor: "pointer"
                      }}>
                        <input type="checkbox" defaultChecked style={{ opacity: 0, width: 0, height: 0 }} />
                        <span style={{ 
                          position: "absolute", 
                          top: 0, 
                          left: 0, 
                          right: 0, 
                          bottom: 0, 
                          background: "#10b981", 
                          borderRadius: "28px", 
                          transition: "0.3s",
                          boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
                        }}>
                          <span style={{
                            position: "absolute",
                            content: "",
                            height: "22px",
                            width: "22px",
                            right: "3px",
                            top: "3px",
                            background: "white",
                            borderRadius: "50%",
                            transition: "0.3s",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
                          }}></span>
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* IP & Geo Restrictions */}
                  <div style={{ marginBottom: "2rem", paddingTop: "1.5rem", borderTop: "1px solid #e5e7eb" }}>
                    <h4 style={{ fontSize: "1rem", fontWeight: "600", color: "#1f2937", marginBottom: "1rem" }}>IP & Geographic Restrictions</h4>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                      <div>
                        <div style={{ fontSize: "0.875rem", fontWeight: "500", color: "#1f2937" }}>IP Whitelist</div>
                        <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>Only allow access from specific IP addresses</div>
                      </div>
                      <label style={{ 
                        position: "relative", 
                        display: "inline-block", 
                        width: "52px", 
                        height: "28px",
                        cursor: "pointer"
                      }}>
                        <input type="checkbox" style={{ opacity: 0, width: 0, height: 0 }} />
                        <span style={{ 
                          position: "absolute", 
                          top: 0, 
                          left: 0, 
                          right: 0, 
                          bottom: 0, 
                          background: "#d1d5db", 
                          borderRadius: "28px", 
                          transition: "0.3s",
                          boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
                        }}>
                          <span style={{
                            position: "absolute",
                            content: "",
                            height: "22px",
                            width: "22px",
                            left: "3px",
                            top: "3px",
                            background: "white",
                            borderRadius: "50%",
                            transition: "0.3s",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
                          }}></span>
                        </span>
                      </label>
                    </div>

                    <div style={{ marginBottom: "1rem" }}>
                      <label style={{ fontSize: "0.875rem", fontWeight: "500", color: "#374151", marginBottom: "0.5rem", display: "block" }}>Allowed IP Addresses</label>
                      <textarea 
                        placeholder="Enter IP addresses or ranges, one per line&#10;Example:&#10;192.168.1.1&#10;10.0.0.0/24"
                        style={{ 
                          width: "100%", 
                          padding: "0.75rem", 
                          border: "1px solid #d1d5db", 
                          borderRadius: "6px",
                          minHeight: "100px",
                          fontFamily: "monospace",
                          fontSize: "0.875rem"
                        }}
                      />
                    </div>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                      <div>
                        <div style={{ fontSize: "0.875rem", fontWeight: "500", color: "#1f2937" }}>Geographic Restrictions</div>
                        <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>Block access from specific countries</div>
                      </div>
                      <label style={{ 
                        position: "relative", 
                        display: "inline-block", 
                        width: "52px", 
                        height: "28px",
                        cursor: "pointer"
                      }}>
                        <input type="checkbox" style={{ opacity: 0, width: 0, height: 0 }} />
                        <span style={{ 
                          position: "absolute", 
                          top: 0, 
                          left: 0, 
                          right: 0, 
                          bottom: 0, 
                          background: "#d1d5db", 
                          borderRadius: "28px", 
                          transition: "0.3s",
                          boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
                        }}>
                          <span style={{
                            position: "absolute",
                            content: "",
                            height: "22px",
                            width: "22px",
                            left: "3px",
                            top: "3px",
                            background: "white",
                            borderRadius: "50%",
                            transition: "0.3s",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
                          }}></span>
                        </span>
                      </label>
                    </div>
                  </div>

                  <button style={{ 
                    background: "#3b82f6", 
                    color: "white", 
                    border: "none", 
                    padding: "0.75rem 1.5rem", 
                    borderRadius: "6px", 
                    cursor: "pointer",
                    fontSize: "0.875rem",
                    fontWeight: "500"
                  }} onClick={() => alert("Security monitoring settings saved!")}>
                    Save Monitoring Settings
                  </button>
                </div>
              </div>

              {/* Data Protection & Privacy */}
              <div style={{
                background: "white",
                borderRadius: "12px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                border: "1px solid #e5e7eb",
                marginBottom: "2rem",
                overflow: "hidden"
              }}>
                <div style={{
                  background: "#f9fafb",
                  padding: "1.5rem",
                  borderBottom: "1px solid #e5e7eb"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                    <span style={{ fontSize: "1.25rem" }}>🔒</span>
                    <h3 style={{ fontSize: "1.25rem", fontWeight: "600", color: "#1f2937" }}>Data Protection & Privacy</h3>
                  </div>
                  <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>Configure data protection and privacy settings.</p>
                </div>
                <div style={{ padding: "1.5rem" }}>
                  {/* Data Encryption */}
                  <div style={{ marginBottom: "2rem" }}>
                    <h4 style={{ fontSize: "1rem", fontWeight: "600", color: "#1f2937", marginBottom: "1rem" }}>Data Encryption</h4>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                      <div>
                        <div style={{ fontSize: "0.875rem", fontWeight: "500", color: "#1f2937" }}>Encrypt Data at Rest</div>
                        <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>Encrypt stored data using AES-256</div>
                      </div>
                      <label style={{ 
                        position: "relative", 
                        display: "inline-block", 
                        width: "52px", 
                        height: "28px",
                        cursor: "pointer"
                      }}>
                        <input type="checkbox" defaultChecked style={{ opacity: 0, width: 0, height: 0 }} />
                        <span style={{ 
                          position: "absolute", 
                          top: 0, 
                          left: 0, 
                          right: 0, 
                          bottom: 0, 
                          background: "#10b981", 
                          borderRadius: "28px", 
                          transition: "0.3s",
                          boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
                        }}>
                          <span style={{
                            position: "absolute",
                            content: "",
                            height: "22px",
                            width: "22px",
                            right: "3px",
                            top: "3px",
                            background: "white",
                            borderRadius: "50%",
                            transition: "0.3s",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
                          }}></span>
                        </span>
                      </label>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                      <div>
                        <div style={{ fontSize: "0.875rem", fontWeight: "500", color: "#1f2937" }}>Encrypt Data in Transit</div>
                        <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>Force HTTPS/TLS for all connections</div>
                      </div>
                      <label style={{ 
                        position: "relative", 
                        display: "inline-block", 
                        width: "52px", 
                        height: "28px",
                        cursor: "pointer"
                      }}>
                        <input type="checkbox" defaultChecked style={{ opacity: 0, width: 0, height: 0 }} />
                        <span style={{ 
                          position: "absolute", 
                          top: 0, 
                          left: 0, 
                          right: 0, 
                          bottom: 0, 
                          background: "#10b981", 
                          borderRadius: "28px", 
                          transition: "0.3s",
                          boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
                        }}>
                          <span style={{
                            position: "absolute",
                            content: "",
                            height: "22px",
                            width: "22px",
                            right: "3px",
                            top: "3px",
                            background: "white",
                            borderRadius: "50%",
                            transition: "0.3s",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
                          }}></span>
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Data Retention */}
                  <div style={{ marginBottom: "2rem", paddingTop: "1.5rem", borderTop: "1px solid #e5e7eb" }}>
                    <h4 style={{ fontSize: "1rem", fontWeight: "600", color: "#1f2937", marginBottom: "1rem" }}>Data Retention</h4>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1rem" }}>
                      <div>
                        <label style={{ fontSize: "0.875rem", fontWeight: "500", color: "#374151", marginBottom: "0.5rem", display: "block" }}>User Data Retention (months)</label>
                        <input type="number" defaultValue="24" min="1" max="120" style={{ width: "100%", padding: "0.75rem", border: "1px solid #d1d5db", borderRadius: "6px" }} />
                      </div>
                      <div>
                        <label style={{ fontSize: "0.875rem", fontWeight: "500", color: "#374151", marginBottom: "0.5rem", display: "block" }}>Audit Log Retention (months)</label>
                        <input type="number" defaultValue="36" min="1" max="120" style={{ width: "100%", padding: "0.75rem", border: "1px solid #d1d5db", borderRadius: "6px" }} />
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                      <div>
                        <div style={{ fontSize: "0.875rem", fontWeight: "500", color: "#1f2937" }}>Auto-Delete Inactive Accounts</div>
                        <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>Automatically delete accounts inactive for specified period</div>
                      </div>
                      <label style={{ 
                        position: "relative", 
                        display: "inline-block", 
                        width: "52px", 
                        height: "28px",
                        cursor: "pointer"
                      }}>
                        <input type="checkbox" style={{ opacity: 0, width: 0, height: 0 }} />
                        <span style={{ 
                          position: "absolute", 
                          top: 0, 
                          left: 0, 
                          right: 0, 
                          bottom: 0, 
                          background: "#d1d5db", 
                          borderRadius: "28px", 
                          transition: "0.3s",
                          boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
                        }}>
                          <span style={{
                            position: "absolute",
                            content: "",
                            height: "22px",
                            width: "22px",
                            left: "3px",
                            top: "3px",
                            background: "white",
                            borderRadius: "50%",
                            transition: "0.3s",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
                          }}></span>
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Privacy Settings */}
                  <div style={{ marginBottom: "1.5rem", paddingTop: "1.5rem", borderTop: "1px solid #e5e7eb" }}>
                    <h4 style={{ fontSize: "1rem", fontWeight: "600", color: "#1f2937", marginBottom: "1rem" }}>Privacy Settings</h4>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                      <div>
                        <div style={{ fontSize: "0.875rem", fontWeight: "500", color: "#1f2937" }}>Cookie Consent Banner</div>
                        <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>Show cookie consent banner for GDPR compliance</div>
                      </div>
                      <label style={{ 
                        position: "relative", 
                        display: "inline-block", 
                        width: "52px", 
                        height: "28px",
                        cursor: "pointer"
                      }}>
                        <input type="checkbox" defaultChecked style={{ opacity: 0, width: 0, height: 0 }} />
                        <span style={{ 
                          position: "absolute", 
                          top: 0, 
                          left: 0, 
                          right: 0, 
                          bottom: 0, 
                          background: "#10b981", 
                          borderRadius: "28px", 
                          transition: "0.3s",
                          boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
                        }}>
                          <span style={{
                            position: "absolute",
                            content: "",
                            height: "22px",
                            width: "22px",
                            right: "3px",
                            top: "3px",
                            background: "white",
                            borderRadius: "50%",
                            transition: "0.3s",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
                          }}></span>
                        </span>
                      </label>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                      <div>
                        <div style={{ fontSize: "0.875rem", fontWeight: "500", color: "#1f2937" }}>Data Export Requests</div>
                        <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>Allow users to request their data export</div>
                      </div>
                      <label style={{ 
                        position: "relative", 
                        display: "inline-block", 
                        width: "52px", 
                        height: "28px",
                        cursor: "pointer"
                      }}>
                        <input type="checkbox" defaultChecked style={{ opacity: 0, width: 0, height: 0 }} />
                        <span style={{ 
                          position: "absolute", 
                          top: 0, 
                          left: 0, 
                          right: 0, 
                          bottom: 0, 
                          background: "#10b981", 
                          borderRadius: "28px", 
                          transition: "0.3s",
                          boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
                        }}>
                          <span style={{
                            position: "absolute",
                            content: "",
                            height: "22px",
                            width: "22px",
                            right: "3px",
                            top: "3px",
                            background: "white",
                            borderRadius: "50%",
                            transition: "0.3s",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
                          }}></span>
                        </span>
                      </label>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                      <div>
                        <div style={{ fontSize: "0.875rem", fontWeight: "500", color: "#1f2937" }}>Account Deletion Requests</div>
                        <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>Allow users to request account deletion</div>
                      </div>
                      <label style={{ 
                        position: "relative", 
                        display: "inline-block", 
                        width: "52px", 
                        height: "28px",
                        cursor: "pointer"
                      }}>
                        <input type="checkbox" defaultChecked style={{ opacity: 0, width: 0, height: 0 }} />
                        <span style={{ 
                          position: "absolute", 
                          top: 0, 
                          left: 0, 
                          right: 0, 
                          bottom: 0, 
                          background: "#10b981", 
                          borderRadius: "28px", 
                          transition: "0.3s",
                          boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
                        }}>
                          <span style={{
                            position: "absolute",
                            content: "",
                            height: "22px",
                            width: "22px",
                            right: "3px",
                            top: "3px",
                            background: "white",
                            borderRadius: "50%",
                            transition: "0.3s",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
                          }}></span>
                        </span>
                      </label>
                    </div>
                  </div>

                  <button style={{ 
                    background: "#3b82f6", 
                    color: "white", 
                    border: "none", 
                    padding: "0.75rem 1.5rem", 
                    borderRadius: "6px", 
                    cursor: "pointer",
                    fontSize: "0.875rem",
                    fontWeight: "500"
                  }} onClick={() => alert("Data protection settings saved!")}>
                    Save Data Protection Settings
                  </button>
                </div>
              </div>

              {/* Security Status & Alerts */}
              <div style={{
                background: "white",
                borderRadius: "12px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                border: "1px solid #e5e7eb",
                overflow: "hidden"
              }}>
                <div style={{
                  background: "#f9fafb",
                  padding: "1.5rem",
                  borderBottom: "1px solid #e5e7eb"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                    <span style={{ fontSize: "1.25rem" }}>📊</span>
                    <h3 style={{ fontSize: "1.25rem", fontWeight: "600", color: "#1f2937" }}>Security Status</h3>
                  </div>
                  <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>Current security status and recent alerts.</p>
                </div>
                <div style={{ padding: "1.5rem" }}>
                  {/* Security Score */}
                  <div style={{ marginBottom: "2rem" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                      <h4 style={{ fontSize: "1rem", fontWeight: "600", color: "#1f2937" }}>Security Score</h4>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <span style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#10b981" }}>85/100</span>
                        <span style={{
                          padding: "0.25rem 0.75rem",
                          background: "#dcfce7",
                          color: "#166534",
                          borderRadius: "20px",
                          fontSize: "0.75rem",
                          fontWeight: "500"
                        }}>
                          Good
                        </span>
                      </div>
                    </div>

                    <div style={{
                      width: "100%",
                      height: "8px",
                      background: "#e5e7eb",
                      borderRadius: "4px",
                      overflow: "hidden",
                      marginBottom: "1rem"
                    }}>
                      <div style={{
                        width: "85%",
                        height: "100%",
                        background: "linear-gradient(90deg, #10b981 0%, #059669 100%)",
                        borderRadius: "4px"
                      }}></div>
                    </div>

                    <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                      Your security configuration is good. Consider enabling IP restrictions and geographic blocking to improve your score.
                    </div>
                  </div>

                  {/* Recent Security Events */}
                  <div style={{ marginBottom: "2rem", paddingTop: "1.5rem", borderTop: "1px solid #e5e7eb" }}>
                    <h4 style={{ fontSize: "1rem", fontWeight: "600", color: "#1f2937", marginBottom: "1rem" }}>Recent Security Events</h4>

                    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "0.75rem", background: "#f0fdf4", borderRadius: "8px", border: "1px solid #bbf7d0" }}>
                        <div style={{ color: "#16a34a", fontSize: "1.25rem" }}>✅</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: "0.875rem", color: "#15803d", fontWeight: "500" }}>Security settings updated</div>
                          <div style={{ fontSize: "0.75rem", color: "#166534" }}>2 hours ago</div>
                        </div>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "0.75rem", background: "#fefbf0", borderRadius: "8px", border: "1px solid #fde68a" }}>
                        <div style={{ color: "#d97706", fontSize: "1.25rem" }}>⚠️</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: "0.875rem", color: "#92400e", fontWeight: "500" }}>Failed login attempt detected</div>
                          <div style={{ fontSize: "0.75rem", color: "#a16207" }}>IP: 192.168.1.100 • 6 hours ago</div>
                        </div>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "0.75rem", background: "#f0fdf4", borderRadius: "8px", border: "1px solid #bbf7d0" }}>
                        <div style={{ color: "#16a34a", fontSize: "1.25rem" }}>🔐</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: "0.875rem", color: "#15803d", fontWeight: "500" }}>2FA enabled for admin account</div>
                          <div style={{ fontSize: "0.75rem", color: "#166534" }}>1 day ago</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div style={{ paddingTop: "1.5rem", borderTop: "1px solid #e5e7eb" }}>
                    <h4 style={{ fontSize: "1rem", fontWeight: "600", color: "#1f2937", marginBottom: "1rem" }}>Quick Actions</h4>

                    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                      <button style={{
                        background: "#3b82f6",
                        color: "white",
                        border: "none",
                        padding: "0.75rem 1rem",
                        borderRadius: "6px",
                        fontSize: "0.875rem",
                        fontWeight: "500",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem"
                      }} onClick={() => alert("Generate security report")}>
                        <span>📋</span>
                        Generate Report
                      </button>

                      <button style={{
                        background: "#10b981",
                        color: "white",
                        border: "none",
                        padding: "0.75rem 1rem",
                        borderRadius: "6px",
                        fontSize: "0.875rem",
                        fontWeight: "500",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem"
                      }} onClick={() => alert("Run security scan")}>
                        <span>🔍</span>
                        Security Scan
                      </button>

                      <button style={{
                        background: "#f59e0b",
                        color: "white",
                        border: "none",
                        padding: "0.75rem 1rem",
                        borderRadius: "6px",
                        fontSize: "0.875rem",
                        fontWeight: "500",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem"
                      }} onClick={() => alert("View audit logs")}>
                        <span>📜</span>
                        Audit Logs
                      </button>

                      <button style={{
                        background: "#ef4444",
                        color: "white",
                        border: "none",
                        padding: "0.75rem 1rem",
                        borderRadius: "6px",
                        fontSize: "0.875rem",
                        fontWeight: "500",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem"
                      }} onClick={() => alert("Force logout all users")}>
                        <span>🚪</span>
                        Force Logout All
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );

        case "my-customer-profile":
          return (
            <div>
              <div style={{ marginBottom: "2rem" }}>
                <h2 style={{ fontSize: "2rem", fontWeight: "600", color: "#1f2937", marginBottom: "0.5rem" }}>My Customer Profile</h2>
                <p style={{ color: "#6b7280" }}>Manage your account information and preferences.</p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
                {/* Profile Information Section */}
                <div style={{
                  background: "white",
                  borderRadius: "12px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  border: "1px solid #e5e7eb",
                  overflow: "hidden"
                }}>
                  {/* Profile Header */}
                  <div style={{
                    background: "#f9fafb",
                    padding: "1.5rem",
                    borderBottom: "1px solid #e5e7eb",
                    textAlign: "center"
                  }}>
                    <div style={{
                      width: "120px",
                      height: "120px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #4ade80 0%, #3b82f6 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 1rem auto",
                      color: "white",
                      fontSize: "2.5rem",
                      fontWeight: "bold",
                      border: "4px solid white",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
                    }}>
                      AU
                    </div>
                    <h3 style={{ fontSize: "1.5rem", fontWeight: "600", color: "#1f2937", marginBottom: "0.5rem" }}>
                      admin@saasible.com
                    </h3>
                    <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>admin@saasible.com</p>

                    <div style={{ marginTop: "1rem" }}>
                      <label style={{
                        background: "#3b82f6",
                        color: "white",
                        padding: "0.5rem 1rem",
                        borderRadius: "6px",
                        fontSize: "0.875rem",
                        fontWeight: "500",
                        cursor: "pointer",
                        display: "inline-block",
                        transition: "background 0.2s"
                      }}
                      onMouseEnter={(e) => e.target.style.background = "#2563eb"}
                      onMouseLeave={(e) => e.target.style.background = "#3b82f6"}
                      >
                        Change Avatar
                        <input type="file" accept="image/*" style={{ display: "none" }} />
                      </label>
                      <p style={{ fontSize: "0.75rem", color: "#9ca3af", marginTop: "0.5rem" }}>
                        No file chosen
                      </p>
                    </div>
                  </div>
                </div>

                {/* Edit Profile Section */}
                <div style={{
                  background: "white",
                  borderRadius: "12px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  border: "1px solid #e5e7eb",
                  overflow: "hidden"
                }}>
                  <div style={{
                    background: "#f9fafb",
                    padding: "1.5rem",
                    borderBottom: "1px solid #e5e7eb"
                  }}>
                    <h3 style={{ fontSize: "1.25rem", fontWeight: "600", color: "#1f2937", marginBottom: "0.5rem" }}>
                      Edit Profile
                    </h3>
                    <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>Update your personal information.</p>
                  </div>

                  <div style={{ padding: "1.5rem" }}>
                    <form>
                      {/* Full Name Field */}
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
                          <span>👤</span>
                          Full Name
                        </label>
                        <input
                          type="text"
                          placeholder="Enter your full name"
                          style={{
                            width: "100%",
                            padding: "0.75rem 1rem",
                            border: "1px solid #d1d5db",
                            borderRadius: "8px",
                            fontSize: "0.875rem",
                            background: "#f9fafb",
                            outline: "none",
                            transition: "all 0.2s"
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = "#3b82f6";
                            e.target.style.background = "white";
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = "#d1d5db";
                            e.target.style.background = "#f9fafb";
                          }}
                        />
                      </div>

                      {/* Email Field */}
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
                          <span>📧</span>
                          Email Address
                        </label>
                        <input
                          type="email"
                          value="admin@saasible.com"
                          disabled
                          style={{
                            width: "100%",
                            padding: "0.75rem 1rem",
                            border: "1px solid #d1d5db",
                            borderRadius: "8px",
                            fontSize: "0.875rem",
                            background: "#f3f4f6",
                            color: "#6b7280",
                            cursor: "not-allowed"
                          }}
                        />
                        <p style={{ fontSize: "0.75rem", color: "#6b7280", marginTop: "0.25rem" }}>
                          Email address cannot be changed here.
                        </p>
                      </div>

                      {/* Save Button */}
                      <button
                        type="submit"
                        style={{
                          background: "#3b82f6",
                          color: "white",
                          border: "none",
                          padding: "0.75rem 1.5rem",
                          borderRadius: "8px",
                          fontSize: "0.875rem",
                          fontWeight: "500",
                          cursor: "pointer",
                          width: "100%",
                          transition: "background 0.2s"
                        }}
                        onMouseEnter={(e) => e.target.style.background = "#2563eb"}
                        onMouseLeave={(e) => e.target.style.background = "#3b82f6"}
                        onClick={(e) => {
                          e.preventDefault();
                          alert("Profile changes saved successfully!");
                        }}
                      >
                        Save Changes
                      </button>
                    </form>
                  </div>
                </div>
              </div>

              {/* Security Section */}
              <div style={{
                background: "white",
                borderRadius: "12px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                border: "1px solid #e5e7eb",
                marginTop: "2rem",
                overflow: "hidden"
              }}>
                <div style={{
                  background: "#f9fafb",
                  padding: "1.5rem",
                  borderBottom: "1px solid #e5e7eb"
                }}>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: "600", color: "#1f2937", marginBottom: "0.5rem" }}>
                    Security
                  </h3>
                  <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>Manage your account security settings.</p>
                </div>

                <div style={{ padding: "1.5rem" }}>
                  <div style={{ marginBottom: "2rem" }}>
                    <h4 style={{ fontSize: "1rem", fontWeight: "600", color: "#1f2937", marginBottom: "0.5rem" }}>
                      Change Password
                    </h4>
                    <p style={{ color: "#6b7280", fontSize: "0.875rem", marginBottom: "1rem" }}>
                      For security, we'll send a password reset link to your email.
                    </p>
                    <button
                      style={{
                        background: "#6b7280",
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
                        transition: "background 0.2s"
                      }}
                      onMouseEnter={(e) => e.target.style.background = "#4b5563"}
                      onMouseLeave={(e) => e.target.style.background = "#6b7280"}
                      onClick={() => alert("Password reset email sent to admin@saasible.com")}
                    >
                      <span>🔗</span>
                      Send Password Reset Email
                    </button>
                  </div>

                  {/* Account Information */}
                  <div style={{
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    padding: "1.5rem"
                  }}>
                    <h4 style={{ fontSize: "1rem", fontWeight: "600", color: "#1f2937", marginBottom: "1rem" }}>
                      Account Information
                    </h4>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                      <div>
                        <div style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "0.25rem" }}>Member Since</div>
                        <div style={{ fontSize: "0.875rem", fontWeight: "500", color: "#1f2937" }}>May 15, 2025</div>
                      </div>
                      <div>
                        <div style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "0.25rem" }}>Account Type</div>
                        <div style={{ fontSize: "0.875rem", fontWeight: "500", color: "#1f2937" }}>Premium Customer</div>
                      </div>
                      <div>
                        <div style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "0.25rem" }}>Last Login</div>
                        <div style={{ fontSize: "0.875rem", fontWeight: "500", color: "#1f2937" }}>2 hours ago</div>
                      </div>
                      <div>
                        <div style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "0.25rem" }}>Active Subscriptions</div>
                        <div style={{ fontSize: "0.875rem", fontWeight: "500", color: "#10b981" }}>2</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Actions */}
              <div style={{
                background: "white",
                borderRadius: "12px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                border: "1px solid #e5e7eb",
                marginTop: "2rem",
                overflow: "hidden"
              }}>
                <div style={{
                  background: "#f9fafb",
                  padding: "1.5rem",
                  borderBottom: "1px solid #e5e7eb"
                }}>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: "600", color: "#1f2937", marginBottom: "0.5rem" }}>
                    Account Actions
                  </h3>
                  <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>Additional account management options.</p>
                </div>

                <div style={{ padding: "1.5rem" }}>
                  <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                    <button
                      style={{
                        background: "#10b981",
                        color: "white",
                        border: "none",
                        padding: "0.75rem 1.5rem",
                        borderRadius: "8px",
                        fontSize: "0.875rem",
                        fontWeight: "500",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem"
                      }}
                      onClick={() => alert("Export data functionality would be implemented here")}
                    >
                      <span>📊</span>
                      Export My Data
                    </button>

                    <button
                      style={{
                        background: "#f59e0b",
                        color: "white",
                        border: "none",
                        padding: "0.75rem 1.5rem",
                        borderRadius: "8px",
                        fontSize: "0.875rem",
                        fontWeight: "500",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem"
                      }}
                      onClick={() => setActiveSection("my-billing-history")}
                    >
                      <span>🧾</span>
                      View Billing History
                    </button>

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
                        gap: "0.5rem"
                      }}
                      onClick={() => alert("Privacy settings would be managed here")}
                    >
                      <span>🔒</span>
                      Privacy Settings
                    </button>

                    <button
                      style={{
                        background: "#ef4444",
                        color: "white",
                        border: "none",
                        padding: "0.75rem 1.5rem",
                        borderRadius: "8px",
                        fontSize: "0.875rem",
                        fontWeight: "500",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem"
                      }}
                      onClick={() => {
                        if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
                          alert("Account deletion process would be initiated here");
                        }
                      }}
                    >
                      <span>🗑️</span>
                      Delete Account
                    </button>
                  </div>

                  {/* Account Deletion Warning */}
                  <div style={{
                    background: "#fef2f2",
                    border: "1px solid #fecaca",
                    borderRadius: "8px",
                    padding: "1rem",
                    marginTop: "1.5rem"
                  }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                      <span style={{ fontSize: "1.25rem", color: "#ef4444" }}>⚠️</span>
                      <div>
                        <h4 style={{ fontSize: "0.875rem", fontWeight: "600", color: "#991b1b", marginBottom: "0.5rem" }}>
                          Account Deletion Warning
                        </h4>
                        <p style={{ fontSize: "0.875rem", color: "#7f1d1d", lineHeight: "1.5" }}>
                          Deleting your account will permanently remove all your data, subscriptions, and access to purchased software. 
                          This action cannot be undone. Please ensure you have backed up any important data before proceeding.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );

        case "marketplace":
          return (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                <div>
                  <h2 style={{ fontSize: "2rem", fontWeight: "600", color: "#1f2937", marginBottom: "0.5rem" }}>Software Marketplace</h2>
                  <p style={{ color: "#6b7280" }}>Discover and subscribe to powerful software applications for your business.</p>
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
                      gap: "0.5rem"
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
                      gap: "0.5rem"
                    }}
                    onClick={() => setActiveSection("my-software-subscriptions")}
                  >
                    <span>👤</span>
                    My Subscriptions
                  </button>
                </div>
              </div>

              {/* Search and Filter Bar */}
              <div style={{ 
                background: "white", 
                padding: "1.5rem", 
                borderRadius: "12px", 
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)", 
                border: "1px solid #e5e7eb",
                marginBottom: "2rem"
              }}>
                <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
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
                        outline: "none"
                      }}
                    />
                    <div style={{
                      position: "absolute",
                      left: "0.75rem",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#9ca3af",
                      fontSize: "1rem"
                    }}>
                      🔍
                    </div>
                  </div>

                  <select style={{
                    padding: "0.75rem 1rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "0.875rem",
                    background: "white",
                    color: "#6b7280",
                    minWidth: "140px"
                  }}>
                    <option>All Categories</option>
                    <option>Featured</option>
                    <option>Productivity</option>
                    <option>Communication</option>
                    <option>Analytics</option>
                    <option>E-commerce</option>
                    <option>Marketing</option>
                    <option>Design Tools</option>
                  </select>

                  <select style={{
                    padding: "0.75rem 1rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "0.875rem",
                    background: "white",
                    color: "#6b7280",
                    minWidth: "120px"
                  }}>
                    <option>All Pricing</option>
                    <option>Free</option>
                    <option>Freemium</option>
                    <option>Paid</option>
                    <option>Enterprise</option>
                  </select>

                  <select style={{
                    padding: "0.75rem 1rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "0.875rem",
                    background: "white",
                    color: "#6b7280",
                    minWidth: "120px"
                  }}>
                    <option>Sort by Popularity</option>
                    <option>Recently Added</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Best Rated</option>
                  </select>
                </div>
              </div>

              {/* Featured Software Banner */}
              <div style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                borderRadius: "12px",
                padding: "2rem",
                marginBottom: "2rem",
                color: "white",
                position: "relative",
                overflow: "hidden"
              }}>
                <div style={{ position: "relative", zIndex: 2 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
                    <span style={{ fontSize: "1.5rem" }}>⭐</span>
                    <span style={{ fontSize: "0.875rem", fontWeight: "600", background: "rgba(255,255,255,0.2)", padding: "0.25rem 0.75rem", borderRadius: "20px" }}>
                      FEATURED
                    </span>
                  </div>
                  <h3 style={{ fontSize: "1.75rem", fontWeight: "600", marginBottom: "0.5rem" }}>
                    CMS Pro - Content Management System
                  </h3>
                  <p style={{ fontSize: "1rem", opacity: "0.9", marginBottom: "1.5rem", maxWidth: "500px" }}>
                    Complete content management solution with advanced features, multi-user support, and powerful publishing tools.
                  </p>
                  <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                    <button style={{
                      background: "white",
                      color: "#667eea",
                      border: "none",
                      padding: "0.75rem 1.5rem",
                      borderRadius: "8px",
                      fontSize: "0.875rem",
                      fontWeight: "600",
                      cursor: "pointer"
                    }}
                    onClick={() => alert("Start 14-day free trial for CMS Pro")}
                    >
                      Start Free Trial
                    </button>
                    <span style={{ fontSize: "1.25rem", fontWeight: "600" }}>
                      {formatCurrency(20.00)}/month after trial
                    </span>
                  </div>
                </div>
                <div style={{
                  position: "absolute",
                  right: "-20px",
                  top: "-20px",
                  width: "200px",
                  height: "200px",
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: "50%"
                }}></div>
              </div>

              {/* Software Categories */}
              <div style={{ marginBottom: "2rem" }}>
                <h3 style={{ fontSize: "1.25rem", fontWeight: "600", color: "#1f2937", marginBottom: "1rem" }}>Browse by Category</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
                  {[
                    { name: "Productivity", icon: "⚡", count: 8, color: "#3b82f6" },
                    { name: "Communication", icon: "💬", count: 6, color: "#10b981" },
                    { name: "Analytics", icon: "📊", count: 5, color: "#8b5cf6" },
                    { name: "E-commerce", icon: "🛒", count: 7, color: "#f59e0b" },
                    { name: "Marketing", icon: "📢", count: 9, color: "#ef4444" },
                    { name: "Design Tools", icon: "🎨", count: 4, color: "#06b6d4" }
                  ].map((category, index) => (
                    <div key={index} style={{
                      background: "white",
                      border: `2px solid ${category.color}`,
                      borderRadius: "8px",
                      padding: "1rem",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      textAlign: "center"
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
                      <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{category.icon}</div>
                      <div style={{ fontSize: "0.875rem", fontWeight: "600", marginBottom: "0.25rem" }}>{category.name}</div>
                      <div style={{ fontSize: "0.75rem", opacity: "0.7" }}>{category.count} apps</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Software Grid */}
              <div style={{ marginBottom: "2rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: "600", color: "#1f2937" }}>Available Software</h3>
                  <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>Showing 8 of 24 applications</span>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
                  {/* CMS Software Card */}
                  <div style={{
                    background: "white",
                    borderRadius: "12px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    border: "1px solid #e5e7eb",
                    overflow: "hidden",
                    transition: "transform 0.2s, box-shadow 0.2s"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "translateY(-4px)";
                    e.target.style.boxShadow = "0 8px 24px rgba(0,0,0,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "translateY(0px)";
                    e.target.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
                  }}
                  >
                    <div style={{ padding: "1.5rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                        <div style={{
                          width: "60px",
                          height: "60px",
                          background: "#f3f4f6",
                          borderRadius: "12px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "2rem",
                          border: "1px solid #e5e7eb"
                        }}>
                          📝
                        </div>
                        <div>
                          <h4 style={{ fontSize: "1.125rem", fontWeight: "600", color: "#1f2937", marginBottom: "0.25rem" }}>
                            CMS Pro
                          </h4>
                          <p style={{ fontSize: "0.75rem", color: "#6b7280" }}>by AmbaApps</p>
                        </div>
                      </div>

                      <p style={{ color: "#6b7280", fontSize: "0.875rem", marginBottom: "1rem", lineHeight: "1.5" }}>
                        Advanced content management system with drag-and-drop editor, multi-user collaboration, and powerful SEO tools.
                      </p>

                      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem", flexWrap: "wrap" }}>
                        <span style={{ background: "#fef3c7", color: "#92400e", padding: "0.25rem 0.5rem", borderRadius: "4px", fontSize: "0.75rem" }}>Featured</span>
                        <span style={{ background: "#e0e7ff", color: "#3730a3", padding: "0.25rem 0.5rem", borderRadius: "4px", fontSize: "0.75rem" }}>Content Management</span>
                      </div>

                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                        <div>
                          <span style={{ fontSize: "1.5rem", fontWeight: "600", color: "#1f2937" }}>{formatCurrency(20.00)}</span>
                          <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>/month</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                          <span style={{ color: "#fbbf24" }}>★★★★★</span>
                          <span style={{ color: "#6b7280", fontSize: "0.75rem" }}>(4.8)</span>
                        </div>
                      </div>

                      <div style={{ display: "flex", gap: "0.75rem" }}>
                        <button style={{
                          flex: 1,
                          background: "#3b82f6",
                          color: "white",
                          border: "none",
                          padding: "0.75rem",
                          borderRadius: "6px",
                          fontSize: "0.875rem",
                          fontWeight: "500",
                          cursor: "pointer"
                        }}
                        onClick={() => alert("Subscribe to CMS Pro")}
                        >
                          Start Free Trial
                        </button>
                        <button style={{
                          background: "transparent",
                          color: "#6b7280",
                          border: "1px solid #d1d5db",
                          padding: "0.75rem",
                          borderRadius: "6px",
                          fontSize: "0.875rem",
                          cursor: "pointer"
                        }}
                        onClick={() => alert("View CMS Pro details")}
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* TaskMaster Pro */}
                  <div style={{
                    background: "white",
                    borderRadius: "12px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    border: "1px solid #e5e7eb",
                    overflow: "hidden",
                    transition: "transform 0.2s, box-shadow 0.2s"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "translateY(-4px)";
                    e.target.style.boxShadow = "0 8px 24px rgba(0,0,0,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "translateY(0px)";
                    e.target.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
                  }}
                  >
                    <div style={{ padding: "1.5rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                        <div style={{
                          width: "60px",
                          height: "60px",
                          background: "#f3f4f6",
                          borderRadius: "12px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "2rem",
                          border: "1px solid #e5e7eb"
                        }}>
                          ✅
                        </div>
                        <div>
                          <h4 style={{ fontSize: "1.125rem", fontWeight: "600", color: "#1f2937", marginBottom: "0.25rem" }}>
                            TaskMaster Pro
                          </h4>
                          <p style={{ fontSize: "0.75rem", color: "#6b7280" }}>by TechCorp</p>
                        </div>
                      </div>

                      <p style={{ color: "#6b7280", fontSize: "0.875rem", marginBottom: "1rem", lineHeight: "1.5" }}>
                        Advanced task management with AI-powered scheduling, team collaboration, and comprehensive analytics.
                      </p>

                      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem", flexWrap: "wrap" }}>
                        <span style={{ background: "#dcfce7", color: "#166534", padding: "0.25rem 0.5rem", borderRadius: "4px", fontSize: "0.75rem" }}>Productivity</span>
                        <span style={{ background: "#fef3c7", color: "#92400e", padding: "0.25rem 0.5rem", borderRadius: "4px", fontSize: "0.75rem" }}>AI-Powered</span>
                      </div>

                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                        <div>
                          <span style={{ fontSize: "1.5rem", fontWeight: "600", color: "#1f2937" }}>{formatCurrency(29.99)}</span>
                          <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>/month</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                          <span style={{ color: "#fbbf24" }}>★★★★☆</span>
                          <span style={{ color: "#6b7280", fontSize: "0.75rem" }}>(4.6)</span>
                        </div>
                      </div>

                      <div style={{ display: "flex", gap: "0.75rem" }}>
                        <button style={{
                          flex: 1,
                          background: "#10b981",
                          color: "white",
                          border: "none",
                          padding: "0.75rem",
                          borderRadius: "6px",
                          fontSize: "0.875rem",
                          fontWeight: "500",
                          cursor: "pointer"
                        }}
                        onClick={() => alert("Subscribe to TaskMaster Pro")}
                        >
                          Subscribe Now
                        </button>
                        <button style={{
                          background: "transparent",
                          color: "#6b7280",
                          border: "1px solid #d1d5db",
                          padding: "0.75rem",
                          borderRadius: "6px",
                          fontSize: "0.875rem",
                          cursor: "pointer"
                        }}
                        onClick={() => alert("View TaskMaster Pro details")}
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Analytics Pro */}
                  <div style={{
                    background: "white",
                    borderRadius: "12px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    border: "1px solid #e5e7eb",
                    overflow: "hidden",
                    transition: "transform 0.2s, box-shadow 0.2s"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "translateY(-4px)";
                    e.target.style.boxShadow = "0 8px 24px rgba(0,0,0,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "translateY(0px)";
                    e.target.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
                  }}
                  >
                    <div style={{ padding: "1.5rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                        <div style={{
                          width: "60px",
                          height: "60px",
                          background: "#f3f4f6",
                          borderRadius: "12px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "2rem",
                          border: "1px solid #e5e7eb"
                        }}>
                          📊
                        </div>
                        <div>
                          <h4 style={{ fontSize: "1.125rem", fontWeight: "600", color: "#1f2937", marginBottom: "0.25rem" }}>
                            Analytics Pro
                          </h4>
                          <p style={{ fontSize: "0.75rem", color: "#6b7280" }}>by DataCorp</p>
                        </div>
                      </div>

                      <p style={{ color: "#6b7280", fontSize: "0.875rem", marginBottom: "1rem", lineHeight: "1.5" }}>
                        Business intelligence platform with real-time dashboards, custom reports, and predictive analytics.
                      </p>

                      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem", flexWrap: "wrap" }}>
                        <span style={{ background: "#f3e8ff", color: "#7c3aed", padding: "0.25rem 0.5rem", borderRadius: "4px", fontSize: "0.75rem" }}>Analytics</span>
                        <span style={{ background: "#ecfdf5", color: "#059669", padding: "0.25rem 0.5rem", borderRadius: "4px", fontSize: "0.75rem" }}>Real-time</span>
                      </div>

                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                        <div>
                          <span style={{ fontSize: "1.5rem", fontWeight: "600", color: "#1f2937" }}>{formatCurrency(45.00)}</span>
                          <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>/month</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                          <span style={{ color: "#fbbf24" }}>★★★★★</span>
                          <span style={{ color: "#6b7280", fontSize: "0.75rem" }}>(4.9)</span>
                        </div>
                      </div>

                      <div style={{ display: "flex", gap: "0.75rem" }}>
                        <button style={{
                          flex: 1,
                          background: "#8b5cf6",
                          color: "white",
                          border: "none",
                          padding: "0.75rem",
                          borderRadius: "6px",
                          fontSize: "0.875rem",
                          fontWeight: "500",
                          cursor: "pointer"
                        }}
                        onClick={() => alert("Subscribe to Analytics Pro")}
                        >
                          Start Trial
                        </button>
                        <button style={{
                          background: "transparent",
                          color: "#6b7280",
                          border: "1px solid #d1d5db",
                          padding: "0.75rem",
                          borderRadius: "6px",
                          fontSize: "0.875rem",
                          cursor: "pointer"
                        }}
                        onClick={() => alert("View Analytics Pro details")}
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* MailCraft Pro */}
                  <div style={{
                    background: "white",
                    borderRadius: "12px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    border: "1px solid #e5e7eb",
                    overflow: "hidden",
                    transition: "transform 0.2s, box-shadow 0.2s"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "translateY(-4px)";
                    e.target.style.boxShadow = "0 8px 24px rgba(0,0,0,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "translateY(0px)";
                    e.target.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
                  }}
                  >
                    <div style={{ padding: "1.5rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                        <div style={{
                          width: "60px",
                          height: "60px",
                          background: "#f3f4f6",
                          borderRadius: "12px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "2rem",
                          border: "1px solid #e5e7eb"
                        }}>
                          📧
                        </div>
                        <div>
                          <h4 style={{ fontSize: "1.125rem", fontWeight: "600", color: "#1f2937", marginBottom: "0.25rem" }}>
                            MailCraft Pro
                          </h4>
                          <p style={{ fontSize: "0.75rem", color: "#6b7280" }}>by EmailWorks</p>
                        </div>
                      </div>

                      <p style={{ color: "#6b7280", fontSize: "0.875rem", marginBottom: "1rem", lineHeight: "1.5" }}>
                        Professional email marketing platform with automation, A/B testing, and detailed campaign analytics.
                      </p>

                      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem", flexWrap: "wrap" }}>
                        <span style={{ background: "#ecfdf5", color: "#059669", padding: "0.25rem 0.5rem", borderRadius: "4px", fontSize: "0.75rem" }}>Marketing</span>
                        <span style={{ background: "#fef3c7", color: "#92400e", padding: "0.25rem 0.5rem", borderRadius: "4px", fontSize: "0.75rem" }}>Automation</span>
                      </div>

                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                        <div>
                          <span style={{ fontSize: "1.5rem", fontWeight: "600", color: "#1f2937" }}>{formatCurrency(25.00)}</span>
                          <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>/month</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                          <span style={{ color: "#fbbf24" }}>★★★★☆</span>
                          <span style={{ color: "#6b7280", fontSize: "0.75rem" }}>(4.7)</span>
                        </div>
                      </div>

                      <div style={{ display: "flex", gap: "0.75rem" }}>
                        <button style={{
                          flex: 1,
                          background: "#f59e0b",
                          color: "white",
                          border: "none",
                          padding: "0.75rem",
                          borderRadius: "6px",
                          fontSize: "0.875rem",
                          fontWeight: "500",
                          cursor: "pointer"
                        }}
                        onClick={() => alert("Subscribe to MailCraft Pro")}
                        >
                          Subscribe
                        </button>
                        <button style={{
                          background: "transparent",
                          color: "#6b7280",
                          border: "1px solid #d1d5db",
                          padding: "0.75rem",
                          borderRadius: "6px",
                          fontSize: "0.875rem",
                          cursor: "pointer"
                        }}
                        onClick={() => alert("View MailCraft Pro details")}
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* ShopBuilder */}
                  <div style={{
                    background: "white",
                    borderRadius: "12px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    border: "1px solid #e5e7eb",
                    overflow: "hidden",
                    transition: "transform 0.2s, box-shadow 0.2s"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "translateY(-4px)";
                    e.target.style.boxShadow = "0 8px 24px rgba(0,0,0,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "translateY(0px)";
                    e.target.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
                  }}
                  >
                    <div style={{ padding: "1.5rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                        <div style={{
                          width: "60px",
                          height: "60px",
                          background: "#f3f4f6",
                          borderRadius: "12px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "2rem",
                          border: "1px solid #e5e7eb"
                        }}>
                          🛒
                        </div>
                        <div>
                          <h4 style={{ fontSize: "1.125rem", fontWeight: "600", color: "#1f2937", marginBottom: "0.25rem" }}>
                            ShopBuilder
                          </h4>
                          <p style={{ fontSize: "0.75rem", color: "#6b7280" }}>by TechCorp</p>
                        </div>
                      </div>

                      <p style={{ color: "#6b7280", fontSize: "0.875rem", marginBottom: "1rem", lineHeight: "1.5" }}>
                        Complete e-commerce store builder with payment processing, inventory management, and marketing tools.
                      </p>

                      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem", flexWrap: "wrap" }}>
                        <span style={{ background: "#fef2f2", color: "#dc2626", padding: "0.25rem 0.5rem", borderRadius: "4px", fontSize: "0.75rem" }}>E-commerce</span>
                        <span style={{ background: "#ecfdf5", color: "#059669", padding: "0.25rem 0.5rem", borderRadius: "4px", fontSize: "0.75rem" }}>Payments</span>
                      </div>

                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                        <div>
                          <span style={{ fontSize: "1.5rem", fontWeight: "600", color: "#1f2937" }}>{formatCurrency(35.00)}</span>
                          <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>/month</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                          <span style={{ color: "#fbbf24" }}>★★★★☆</span>
                          <span style={{ color: "#6b7280", fontSize: "0.75rem" }}>(4.5)</span>
                        </div>
                      </div>

                      <div style={{ display: "flex", gap: "0.75rem" }}>
                        <button style={{
                          flex: 1,
                          background: "#ef4444",
                          color: "white",
                          border: "none",
                          padding: "0.75rem",
                          borderRadius: "6px",
                          fontSize: "0.875rem",
                          fontWeight: "500",
                          cursor: "pointer"
                        }}
                        onClick={() => alert("Subscribe to ShopBuilder")}
                        >
                          Start Building
                        </button>
                        <button style={{
                          background: "transparent",
                          color: "#6b7280",
                          border: "1px solid #d1d5db",
                          padding: "0.75rem",
                          borderRadius: "6px",
                          fontSize: "0.875rem",
                          cursor: "pointer"
                        }}
                        onClick={() => alert("View ShopBuilder details")}
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* TeamChat Plus */}
                  <div style={{
                    background: "white",
                    borderRadius: "12px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    border: "1px solid #e5e7eb",
                    overflow: "hidden",
                    transition: "transform 0.2s, box-shadow 0.2s"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "translateY(-4px)";
                    e.target.style.boxShadow = "0 8px 24px rgba(0,0,0,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "translateY(0px)";
                    e.target.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
                  }}
                  >
                    <div style={{ padding: "1.5rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                        <div style={{
                          width: "60px",
                          height: "60px",
                          background: "#f3f4f6",
                          borderRadius: "12px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "2rem",
                          border: "1px solid #e5e7eb"
                        }}>
                          💬
                        </div>
                        <div>
                          <h4 style={{ fontSize: "1.125rem", fontWeight: "600", color: "#1f2937", marginBottom: "0.25rem" }}>
                            TeamChat Plus
                          </h4>
                          <p style={{ fontSize: "0.75rem", color: "#6b7280" }}>by ConnectSoft</p>
                        </div>
                      </div>

                      <p style={{ color: "#6b7280", fontSize: "0.875rem", marginBottom: "1rem", lineHeight: "1.5" }}>
                        Secure team communication platform with video calls, file sharing, and project integration capabilities.
                      </p>

                      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem", flexWrap: "wrap" }}>
                        <span style={{ background: "#dbeafe", color: "#1e40af", padding: "0.25rem 0.5rem", borderRadius: "4px", fontSize: "0.75rem" }}>Communication</span>
                        <span style={{ background: "#e0e7ff", color: "#3730a3", padding: "0.25rem 0.5rem", borderRadius: "4px", fontSize: "0.75rem" }}>Video Calls</span>
                      </div>

                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                        <div>
                          <span style={{ fontSize: "1.5rem", fontWeight: "600", color: "#1f2937" }}>{formatCurrency(18.00)}</span>
                          <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>/month</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                          <span style={{ color: "#fbbf24" }}>★★★★★</span>
                          <span style={{ color: "#6b7280", fontSize: "0.75rem" }}>(4.8)</span>
                        </div>
                      </div>

                      <div style={{ display: "flex", gap: "0.75rem" }}>
                        <button style={{
                          flex: 1,
                          background: "#06b6d4",
                          color: "white",
                          border: "none",
                          padding: "0.75rem",
                          borderRadius: "6px",
                          fontSize: "0.875rem",
                          fontWeight: "500",
                          cursor: "pointer"
                        }}
                        onClick={() => alert("Subscribe to TeamChat Plus")}
                        >
                          Try Free
                        </button>
                        <button style={{
                          background: "transparent",
                          color: "#6b7280",
                          border: "1px solid #d1d5db",
                          padding: "0.75rem",
                          borderRadius: "6px",
                          fontSize: "0.875rem",
                          cursor: "pointer"
                        }}
                        onClick={() => alert("View TeamChat Plus details")}
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* DesignStudio */}
                  <div style={{
                    background: "white",
                    borderRadius: "12px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    border: "1px solid #e5e7eb",
                    overflow: "hidden",
                    transition: "transform 0.2s, box-shadow 0.2s"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "translateY(-4px)";
                    e.target.style.boxShadow = "0 8px 24px rgba(0,0,0,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "translateY(0px)";
                    e.target.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
                  }}
                  >
                    <div style={{ padding: "1.5rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                        <div style={{
                          width: "60px",
                          height: "60px",
                          background: "#f3f4f6",
                          borderRadius: "12px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "2rem",
                          border: "1px solid #e5e7eb"
                        }}>
                          🎨
                        </div>
                        <div>
                          <h4 style={{ fontSize: "1.125rem", fontWeight: "600", color: "#1f2937", marginBottom: "0.25rem" }}>
                            DesignStudio
                          </h4>
                          <p style={{ fontSize: "0.75rem", color: "#6b7280" }}>by CreativeWorks</p>
                        </div>
                      </div>

                      <p style={{ color: "#6b7280", fontSize: "0.875rem", marginBottom: "1rem", lineHeight: "1.5" }}>
                        Professional design tool for creating graphics, logos, and marketing materials with AI-powered features.
                      </p>

                      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem", flexWrap: "wrap" }}>
                        <span style={{ background: "#fef2f2", color: "#dc2626", padding: "0.25rem 0.5rem", borderRadius: "4px", fontSize: "0.75rem" }}>Design</span>
                        <span style={{ background: "#fef3c7", color: "#92400e", padding: "0.25rem 0.5rem", borderRadius: "4px", fontSize: "0.75rem" }}>AI-Powered</span>
                      </div>

                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                        <div>
                          <span style={{ fontSize: "1.5rem", fontWeight: "600", color: "#1f2937" }}>{formatCurrency(22.00)}</span>
                          <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>/month</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                          <span style={{ color: "#fbbf24" }}>★★★★☆</span>
                          <span style={{ color: "#6b7280", fontSize: "0.75rem" }}>(4.4)</span>
                        </div>
                      </div>

                      <div style={{ display: "flex", gap: "0.75rem" }}>
                        <button style={{
                          flex: 1,
                          background: "#ec4899",
                          color: "white",
                          border: "none",
                          padding: "0.75rem",
                          borderRadius: "6px",
                          fontSize: "0.875rem",
                          fontWeight: "500",
                          cursor: "pointer"
                        }}
                        onClick={() => alert("Subscribe to DesignStudio")}
                        >
                          Start Creating
                        </button>
                        <button style={{
                          background: "transparent",
                          color: "#6b7280",
                          border: "1px solid #d1d5db",
                          padding: "0.75rem",
                          borderRadius: "6px",
                          fontSize: "0.875rem",
                          cursor: "pointer"
                        }}
                        onClick={() => alert("View DesignStudio details")}
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Load More Button */}
              <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                <button style={{
                  background: "white",
                  color: "#3b82f6",
                  border: "2px solid #3b82f6",
                  padding: "0.75rem 2rem",
                  borderRadius: "8px",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  cursor: "pointer",
                  transition: "all 0.2s"
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

              {/* Marketplace Information */}
              <div style={{
                background: "#f8fafc",
                borderRadius: "12px",
                padding: "1.5rem",
                border: "1px solid #e2e8f0"
              }}>
                <h3 style={{ fontSize: "1.125rem", fontWeight: "600", color: "#1f2937", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span>ℹ️</span>
                  About the Marketplace
                </h3>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
                  <div>
                    <h4 style={{ fontSize: "0.875rem", fontWeight: "600", color: "#374151", marginBottom: "0.5rem" }}>Subscription Management</h4>
                    <p style={{ fontSize: "0.875rem", color: "#6b7280", lineHeight: "1.5" }}>
                      All software subscriptions are managed through your account. Cancel anytime, with no long-term commitments required.
                    </p>
                  </div>

                  <div>
                    <h4 style={{ fontSize: "0.875rem", fontWeight: "600", color: "#374151", marginBottom: "0.5rem" }}>Free Trials</h4>
                    <p style={{ fontSize: "0.875rem", color: "#6b7280", lineHeight: "1.5" }}>
                      Most software offers free trials ranging from 7 to 30 days. Try before you buy to ensure it fits your needs.
                    </p>
                  </div>

                  <div>
                    <h4 style={{ fontSize: "0.875rem", fontWeight: "600", color: "#374151", marginBottom: "0.5rem" }}>Customer Support</h4>
                    <p style={{ fontSize: "0.875rem", color: "#6b7280", lineHeight: "1.5" }}>
                      Each software provider offers dedicated customer support. Access help directly through your subscribed applications.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );

      case "settings":
        return renderSettingsPage();

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
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "platform-software", label: "Platform Software", icon: "🖥️" },
    { id: "platform-plans", label: "Platform Plans", icon: "📋" },
    { id: "user-subscriptions", label: "User Subscriptions", icon: "👤" },
    { id: "tenants", label: "Tenants", icon: "🏢" },
    { id: "customers", label: "Customers", icon: "👥" },
    { id: "analytics", label: "Analytics", icon: "📈" },
    {
      id: "marketplace-mgmt",
      label: "Marketplace Mgmt",
      icon: "🛒",
      hasSubmenu: true,
      submenu: [{ id: "app-listings", label: "App Listings" }],
    },
    {
      id: "my-activity",
      label: "My Activity",
      icon: "📱",
      hasSubmenu: true,
      submenu: [{ id: "my-subscriptions", label: "My Subscriptions" }],
    },
    { id: "marketplace", label: "Marketplace", icon: "🏪" },
    { id: "settings", label: "Settings", icon: "⚙️" },
    { id: "support", label: "Support", icon: "🎧" },
  ];

  const menuStyle = {
    cursor: "pointer",
    padding: "0.75rem 1rem",
    margin: "0.1rem 0",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    fontSize: "0.875rem",
    color: "#e5e7eb",
    transition: "all 0.2s",
  };

  const activeMenuStyle = {
    ...menuStyle,
    background: "#10b981",
    color: "white",
    fontWeight: "600",
  };

  return (
    <div style={{ display: "flex", height: "100vh", background: "#f9fafb" }}>
      <aside
        style={{
          width: "280px",
          background: "#1e293b",
          color: "#e5e7eb",
          height: "100vh",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ padding: "1.5rem", borderBottom: "1px solid #334155" }}>
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
          >
            <div
              style={{
                background: "#3b82f6",
                color: "white",
                padding: "8px",
                borderRadius: "8px",
                fontWeight: "bold",
                fontSize: "1.25rem",
              }}
            >
              🏢
            </div>
            <span style={{ fontWeight: "600", fontSize: "1.125rem" }}>
              SaaSibly Admin
            </span>
          </div>
        </div>
        <nav style={{ padding: "1rem", flex: 1 }}>
          {menuItems.map((item) => (
            <div key={item.id}>
              <div
                onClick={() =>
                  item.hasSubmenu
                    ? toggleSubmenu(item.id)
                    : setActiveSection(item.id)
                }
                style={activeSection === item.id ? activeMenuStyle : menuStyle}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    activeSection !== item.id ? "#334155" : "#10b981")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    activeSection !== item.id ? "transparent" : "#10b981")
                }
              >
                <span>{item.icon}</span>
                <span style={{ flex: 1 }}>{item.label}</span>
                {item.hasSubmenu && (
                  <span
                    style={{
                      fontSize: "0.75rem",
                      transition: "transform 0.2s",
                      transform: expandedMenus[item.id]
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                    }}
                  >
                    ▼
                  </span>
                )}
              </div>
              {item.hasSubmenu && expandedMenus[item.id] && (
                <div
                  style={{
                    marginLeft: "1rem",
                    borderLeft: "1px solid #4b5563",
                    paddingLeft: "1rem",
                    marginTop: "0.5rem",
                  }}
                >
                  {item.submenu.map((subItem) => (
                    <div
                      key={subItem.id}
                      onClick={() => setActiveSection(subItem.id)}
                      style={{
                        ...menuStyle,
                        padding: "0.5rem 1rem",
                        fontSize: "0.8rem",
                        color:
                          activeSection === subItem.id ? "#10b981" : "#9ca3af",
                      }}
                    >
                      <span>{subItem.icon || "—"}</span>
                      <span>{subItem.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
        <div style={{ padding: "1rem" }}>
          <div
            style={{
              background: "#334155",
              padding: "0.75rem",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              fontSize: "0.875rem",
            }}
          >
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "#10b981",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
              }}
            >
              {user.avatar}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: "500" }}>{user.name}</div>
              <div style={{ color: "#94a3b8", fontSize: "0.75rem" }}>
                {user.email}
              </div>
            </div>
            <button
              onClick={handleLogout}
              style={{
                background: "transparent",
                border: "none",
                color: "#ef4444",
                cursor: "pointer",
                fontSize: "1.2rem",
              }}
              title="Logout"
            >
              🚪
            </button>
          </div>
        </div>
      </aside>
      <main style={{ flex: 1, padding: "2rem", overflowY: "auto" }}>
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminDashboard;