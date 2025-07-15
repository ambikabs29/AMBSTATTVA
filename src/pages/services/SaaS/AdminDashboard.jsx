
import React, { useState, useEffect } from "react";

/**
 * @typedef {React.CSSProperties} Style
 */

const AdminDashboard = () => {
  // ❗ Change this to false to simulate access denied
  const [isAdmin, setIsAdmin] = useState(true); // Will later be dynamic based on Firebase Auth
  const [activeSection, setActiveSection] = useState("dashboard");

  // State for the settings page's internal tabs
  const [activeSettingsTab, setActiveSettingsTab] = useState("General");

  const [expandedMenus, setExpandedMenus] = useState({});
  const [userCurrency, setUserCurrency] = useState({ code: 'USD', symbol: '$', rate: 1 });
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

  // Currency conversion function
  const convertPrice = (usdPrice) => {
    const convertedPrice = usdPrice * userCurrency.rate;

    // Format based on currency
    if (userCurrency.code === 'JPY' || userCurrency.code === 'KRW' || userCurrency.code === 'VND' || userCurrency.code === 'IDR') {
      return Math.round(convertedPrice);
    } else {
      return convertedPrice.toFixed(2);
    }
  };

  // Format currency display
  const formatCurrency = (usdPrice) => {
    const convertedPrice = convertPrice(usdPrice);
    return `${userCurrency.symbol}${convertedPrice}`;
  };

  // Currency detection and conversion
  useEffect(() => {
    const detectUserCurrency = async () => {
      try {
        // Get user's location
        const response = await fetch('https://ipapi.co/json/');
        const locationData = await response.json();

        // Currency mapping based on country
        const currencyMap = {
          'US': { code: 'USD', symbol: '$', rate: 1 },
          'GB': { code: 'GBP', symbol: '£', rate: 0.79 },
          'CA': { code: 'CAD', symbol: 'C$', rate: 1.35 },
          'AU': { code: 'AUD', symbol: 'A$', rate: 1.45 },
          'DE': { code: 'EUR', symbol: '€', rate: 0.85 },
          'FR': { code: 'EUR', symbol: '€', rate: 0.85 },
          'ES': { code: 'EUR', symbol: '€', rate: 0.85 },
          'IT': { code: 'EUR', symbol: '€', rate: 0.85 },
          'NL': { code: 'EUR', symbol: '€', rate: 0.85 },
          'IN': { code: 'INR', symbol: '₹', rate: 83 },
          'JP': { code: 'JPY', symbol: '¥', rate: 110 },
          'KR': { code: 'KRW', symbol: '₩', rate: 1200 },
          'CN': { code: 'CNY', symbol: '¥', rate: 7.2 },
          'BR': { code: 'BRL', symbol: 'R$', rate: 5.2 },
          'MX': { code: 'MXN', symbol: '$', rate: 18 },
          'AR': { code: 'ARS', symbol: '$', rate: 350 },
          'RU': { code: 'RUB', symbol: '₽', rate: 75 },
          'TR': { code: 'TRY', symbol: '₺', rate: 27 },
          'ZA': { code: 'ZAR', symbol: 'R', rate: 18 },
          'EG': { code: 'EGP', symbol: 'E£', rate: 31 },
          'NG': { code: 'NGN', symbol: '₦', rate: 750 },
          'KE': { code: 'KES', symbol: 'KSh', rate: 150 },
          'GH': { code: 'GHS', symbol: '₵', rate: 12 },
          'UG': { code: 'UGX', symbol: 'USh', rate: 3700 },
          'TZ': { code: 'TZS', symbol: 'TSh', rate: 2300 },
          'ZW': { code: 'ZWL', symbol: 'Z$', rate: 320 },
          'TH': { code: 'THB', symbol: '฿', rate: 35 },
          'VN': { code: 'VND', symbol: '₫', rate: 24000 },
          'ID': { code: 'IDR', symbol: 'Rp', rate: 15000 },
          'MY': { code: 'MYR', symbol: 'RM', rate: 4.7 },
          'SG': { code: 'SGD', symbol: 'S$', rate: 1.35 },
          'PH': { code: 'PHP', symbol: '₱', rate: 56 },
          'BD': { code: 'BDT', symbol: '৳', rate: 110 },
          'PK': { code: 'PKR', symbol: '₨', rate: 280 },
          'LK': { code: 'LKR', symbol: '₨', rate: 320 },
          'NP': { code: 'NPR', symbol: '₨', rate: 133 },
          'AF': { code: 'AFN', symbol: '؋', rate: 70 },
          'IQ': { code: 'IQD', symbol: 'ع.د', rate: 1300 },
          'IR': { code: 'IRR', symbol: '﷼', rate: 42000 },
          'SA': { code: 'SAR', symbol: '﷼', rate: 3.75 },
          'AE': { code: 'AED', symbol: 'د.إ', rate: 3.67 },
          'QA': { code: 'QAR', symbol: '﷼', rate: 3.64 },
          'KW': { code: 'KWD', symbol: 'د.ك', rate: 0.31 },
          'BH': { code: 'BHD', symbol: '.د.ب', rate: 0.38 },
          'OM': { code: 'OMR', symbol: '﷼', rate: 0.38 },
          'JO': { code: 'JOD', symbol: 'د.ا', rate: 0.71 },
          'LB': { code: 'LBP', symbol: '£', rate: 15000 },
          'SY': { code: 'SYP', symbol: '£', rate: 2500 },
          'IL': { code: 'ILS', symbol: '₪', rate: 3.7 },
          'PS': { code: 'ILS', symbol: '₪', rate: 3.7 }
        };

        const detectedCurrency = currencyMap[locationData.country_code] || currencyMap['US'];
        setUserCurrency(detectedCurrency);
      } catch (error) {
        console.error('Failed to detect currency:', error);
        // Fallback to USD
        setUserCurrency({ code: 'USD', symbol: '$', rate: 1 });
      }
    };

    detectUserCurrency();
  }, []);

  // If not admin, show access denied
  if (!isAdmin) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f3f4f6"
      }}>
        <div style={{
          backgroundColor: "white",
          padding: "3rem",
          borderRadius: "12px",
          textAlign: "center",
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          maxWidth: "400px"
        }}>
          <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🚫</div>
          <h2 style={{ color: "#dc2626", marginBottom: "1rem" }}>Access Denied</h2>
          <p style={{ color: "#6b7280", marginBottom: "2rem" }}>
            You don't have permission to access the admin dashboard.
          </p>
          <button
            onClick={() => window.location.href = '/'}
            style={{
              backgroundColor: "#3b82f6",
              color: "white",
              padding: "0.75rem 1.5rem",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "1rem"
            }}
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  // Define reusable styles
  const styles = {
    container: {
      display: "flex",
      minHeight: "100vh",
      backgroundColor: "#f8fafc"
    },
    sidebar: {
      width: "280px",
      backgroundColor: "white",
      borderRight: "1px solid #e5e7eb",
      padding: "0",
      overflow: "auto",
      boxShadow: "2px 0 4px rgba(0,0,0,0.05)"
    },
    sidebarHeader: {
      padding: "1.5rem",
      borderBottom: "1px solid #e5e7eb",
      backgroundColor: "#1f2937"
    },
    logo: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      color: "white",
      margin: 0
    },
    nav: {
      padding: "1rem 0"
    },
    navItem: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0.75rem 1.5rem",
      color: "#374151",
      textDecoration: "none",
      borderBottom: "1px solid #f3f4f6",
      cursor: "pointer",
      transition: "all 0.2s"
    },
    navItemActive: {
      backgroundColor: "#dbeafe",
      color: "#1d4ed8",
      borderRight: "3px solid #3b82f6"
    },
    navItemHover: {
      backgroundColor: "#f9fafb"
    },
    submenu: {
      backgroundColor: "#f8fafc",
      borderLeft: "3px solid #e5e7eb"
    },
    submenuItem: {
      padding: "0.5rem 2.5rem",
      color: "#6b7280",
      cursor: "pointer",
      fontSize: "0.9rem",
      borderBottom: "1px solid #f3f4f6"
    },
    submenuItemActive: {
      backgroundColor: "#dbeafe",
      color: "#1d4ed8"
    },
    mainContent: {
      flex: 1,
      padding: "2rem",
      overflow: "auto"
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "2rem",
      padding: "1rem 0",
      borderBottom: "1px solid #e5e7eb"
    },
    title: {
      fontSize: "2rem",
      fontWeight: "bold",
      color: "#1f2937",
      margin: 0
    },
    userSection: {
      display: "flex",
      alignItems: "center",
      gap: "1rem"
    },
    avatar: {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      backgroundColor: "#3b82f6",
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "bold"
    },
    logoutBtn: {
      backgroundColor: "#dc2626",
      color: "white",
      border: "none",
      padding: "0.5rem 1rem",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "0.9rem"
    },
    card: {
      backgroundColor: "white",
      borderRadius: "12px",
      padding: "1.5rem",
      boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
      border: "1px solid #e5e7eb",
      marginBottom: "1.5rem"
    },
    statsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "1.5rem",
      marginBottom: "2rem"
    },
    statCard: {
      backgroundColor: "white",
      padding: "1.5rem",
      borderRadius: "12px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      border: "1px solid #e5e7eb",
      textAlign: "center"
    },
    statNumber: {
      fontSize: "2.5rem",
      fontWeight: "bold",
      marginBottom: "0.5rem"
    },
    statLabel: {
      color: "#6b7280",
      fontSize: "0.9rem"
    },
    tabContainer: {
      borderBottom: "1px solid #e5e7eb",
      marginBottom: "2rem"
    },
    tabList: {
      display: "flex",
      gap: "2rem"
    },
    tab: {
      padding: "1rem 0",
      cursor: "pointer",
      borderBottom: "2px solid transparent",
      color: "#6b7280",
      fontWeight: "500",
      transition: "all 0.2s"
    },
    tabActive: {
      color: "#3b82f6",
      borderBottomColor: "#3b82f6"
    },
    formGroup: {
      marginBottom: "1.5rem"
    },
    label: {
      display: "block",
      marginBottom: "0.5rem",
      fontWeight: "500",
      color: "#374151"
    },
    input: {
      width: "100%",
      padding: "0.75rem",
      border: "1px solid #d1d5db",
      borderRadius: "8px",
      fontSize: "1rem",
      boxSizing: "border-box"
    },
    textarea: {
      width: "100%",
      padding: "0.75rem",
      border: "1px solid #d1d5db",
      borderRadius: "8px",
      fontSize: "1rem",
      minHeight: "120px",
      resize: "vertical",
      boxSizing: "border-box"
    },
    select: {
      width: "100%",
      padding: "0.75rem",
      border: "1px solid #d1d5db",
      borderRadius: "8px",
      fontSize: "1rem",
      backgroundColor: "white",
      boxSizing: "border-box"
    },
    button: {
      backgroundColor: "#3b82f6",
      color: "white",
      border: "none",
      padding: "0.75rem 1.5rem",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "1rem",
      fontWeight: "500"
    },
    buttonSecondary: {
      backgroundColor: "#6b7280",
      color: "white",
      border: "none",
      padding: "0.75rem 1.5rem",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "1rem",
      fontWeight: "500"
    },
    buttonDanger: {
      backgroundColor: "#dc2626",
      color: "white",
      border: "none",
      padding: "0.75rem 1.5rem",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "1rem",
      fontWeight: "500"
    },
    toggle: {
      position: "relative",
      display: "inline-block",
      width: "60px",
      height: "34px"
    },
    toggleInput: {
      opacity: 0,
      width: 0,
      height: 0
    },
    slider: {
      position: "absolute",
      cursor: "pointer",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "#ccc",
      transition: "0.4s",
      borderRadius: "34px"
    },
    sliderBefore: {
      position: "absolute",
      content: "''",
      height: "26px",
      width: "26px",
      left: "4px",
      bottom: "4px",
      backgroundColor: "white",
      transition: "0.4s",
      borderRadius: "50%"
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "1.5rem"
    },
    alertSuccess: {
      backgroundColor: "#dcfce7",
      border: "1px solid #bbf7d0",
      color: "#166534",
      padding: "1rem",
      borderRadius: "8px",
      marginBottom: "1rem"
    },
    alertWarning: {
      backgroundColor: "#fef3c7",
      border: "1px solid #fde68a",
      color: "#92400e",
      padding: "1rem",
      borderRadius: "8px",
      marginBottom: "1rem"
    },
    alertError: {
      backgroundColor: "#fee2e2",
      border: "1px solid #fecaca",
      color: "#991b1b",
      padding: "1rem",
      borderRadius: "8px",
      marginBottom: "1rem"
    }
  };

  // Settings styles
  const settingsStyles = {
    section: {
      marginBottom: "3rem"
    },
    sectionTitle: {
      fontSize: "1.25rem",
      fontWeight: "600",
      color: "#1f2937",
      marginBottom: "1rem",
      paddingBottom: "0.5rem",
      borderBottom: "2px solid #e5e7eb"
    },
    formRow: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "1.5rem",
      marginBottom: "1.5rem"
    },
    label: {
      display: "block",
      marginBottom: "0.5rem",
      fontWeight: "500",
      color: "#374151"
    },
    input: {
      width: "100%",
      padding: "0.75rem",
      border: "1px solid #d1d5db",
      borderRadius: "8px",
      fontSize: "1rem",
      boxSizing: "border-box"
    },
    textarea: {
      width: "100%",
      padding: "0.75rem",
      border: "1px solid #d1d5db",
      borderRadius: "8px",
      fontSize: "1rem",
      minHeight: "120px",
      resize: "vertical",
      boxSizing: "border-box"
    },
    select: {
      width: "100%",
      padding: "0.75rem",
      border: "1px solid #d1d5db",
      borderRadius: "8px",
      fontSize: "1rem",
      backgroundColor: "white",
      boxSizing: "border-box"
    },
    buttonGroup: {
      display: "flex",
      gap: "1rem",
      marginTop: "2rem"
    },
    checkboxGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem"
    },
    checkboxItem: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem"
    },
    checkbox: {
      width: "18px",
      height: "18px",
      accentColor: "#3b82f6"
    }
  };

  // Render content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <div>
            <div style={styles.statsGrid}>
              <div style={{...styles.statCard, borderLeft: "4px solid #3b82f6"}}>
                <div style={{...styles.statNumber, color: "#3b82f6"}}>1,247</div>
                <div style={styles.statLabel}>Total Users</div>
              </div>
              <div style={{...styles.statCard, borderLeft: "4px solid #10b981"}}>
                <div style={{...styles.statNumber, color: "#10b981"}}>{formatCurrency(89420)}</div>
                <div style={styles.statLabel}>Monthly Revenue</div>
              </div>
              <div style={{...styles.statCard, borderLeft: "4px solid #f59e0b"}}>
                <div style={{...styles.statNumber, color: "#f59e0b"}}>847</div>
                <div style={styles.statLabel}>Active Subscriptions</div>
              </div>
              <div style={{...styles.statCard, borderLeft: "4px solid #ef4444"}}>
                <div style={{...styles.statNumber, color: "#ef4444"}}>12</div>
                <div style={styles.statLabel}>Support Tickets</div>
              </div>
            </div>

            <div style={styles.grid}>
              <div style={styles.card}>
                <h3 style={{marginTop: 0, color: "#1f2937"}}>Recent Activity</h3>
                <div style={{color: "#6b7280"}}>
                  <p>• New user registration: john@example.com</p>
                  <p>• Payment received: {formatCurrency(99)} from UserID #1234</p>
                  <p>• Support ticket #567 resolved</p>
                  <p>• System backup completed successfully</p>
                </div>
              </div>

              <div style={styles.card}>
                <h3 style={{marginTop: 0, color: "#1f2937"}}>Quick Actions</h3>
                <div style={{display: "flex", flexDirection: "column", gap: "0.75rem"}}>
                  <button style={styles.button} onClick={() => setActiveSection("users")}>
                    Manage Users
                  </button>
                  <button style={styles.button} onClick={() => setActiveSection("settings")}>
                    Platform Settings
                  </button>
                  <button style={styles.button} onClick={() => setActiveSection("analytics")}>
                    View Analytics
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case "users":
        return (
          <div>
            <div style={styles.card}>
              <h3 style={{marginTop: 0, color: "#1f2937"}}>User Management</h3>
              <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem"}}>
                <input 
                  type="text" 
                  placeholder="Search users..." 
                  style={{...styles.input, width: "300px"}}
                />
                <button style={styles.button}>Add New User</button>
              </div>
              
              <div style={{overflow: "auto"}}>
                <table style={{width: "100%", borderCollapse: "collapse"}}>
                  <thead>
                    <tr style={{backgroundColor: "#f8fafc"}}>
                      <th style={{padding: "0.75rem", textAlign: "left", borderBottom: "1px solid #e5e7eb"}}>Name</th>
                      <th style={{padding: "0.75rem", textAlign: "left", borderBottom: "1px solid #e5e7eb"}}>Email</th>
                      <th style={{padding: "0.75rem", textAlign: "left", borderBottom: "1px solid #e5e7eb"}}>Status</th>
                      <th style={{padding: "0.75rem", textAlign: "left", borderBottom: "1px solid #e5e7eb"}}>Subscription</th>
                      <th style={{padding: "0.75rem", textAlign: "left", borderBottom: "1px solid #e5e7eb"}}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{padding: "0.75rem", borderBottom: "1px solid #f3f4f6"}}>John Doe</td>
                      <td style={{padding: "0.75rem", borderBottom: "1px solid #f3f4f6"}}>john@example.com</td>
                      <td style={{padding: "0.75rem", borderBottom: "1px solid #f3f4f6"}}>
                        <span style={{backgroundColor: "#dcfce7", color: "#166534", padding: "0.25rem 0.5rem", borderRadius: "4px", fontSize: "0.8rem"}}>Active</span>
                      </td>
                      <td style={{padding: "0.75rem", borderBottom: "1px solid #f3f4f6"}}>Pro Plan</td>
                      <td style={{padding: "0.75rem", borderBottom: "1px solid #f3f4f6"}}>
                        <button style={{...styles.button, marginRight: "0.5rem", fontSize: "0.8rem", padding: "0.5rem"}}>Edit</button>
                        <button style={{...styles.buttonDanger, fontSize: "0.8rem", padding: "0.5rem"}}>Delete</button>
                      </td>
                    </tr>
                    <tr>
                      <td style={{padding: "0.75rem", borderBottom: "1px solid #f3f4f6"}}>Jane Smith</td>
                      <td style={{padding: "0.75rem", borderBottom: "1px solid #f3f4f6"}}>jane@example.com</td>
                      <td style={{padding: "0.75rem", borderBottom: "1px solid #f3f4f6"}}>
                        <span style={{backgroundColor: "#fef3c7", color: "#92400e", padding: "0.25rem 0.5rem", borderRadius: "4px", fontSize: "0.8rem"}}>Pending</span>
                      </td>
                      <td style={{padding: "0.75rem", borderBottom: "1px solid #f3f4f6"}}>Basic Plan</td>
                      <td style={{padding: "0.75rem", borderBottom: "1px solid #f3f4f6"}}>
                        <button style={{...styles.button, marginRight: "0.5rem", fontSize: "0.8rem", padding: "0.5rem"}}>Edit</button>
                        <button style={{...styles.buttonDanger, fontSize: "0.8rem", padding: "0.5rem"}}>Delete</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case "analytics":
        return (
          <div>
            <div style={styles.card}>
              <h3 style={{marginTop: 0, color: "#1f2937"}}>Analytics Overview</h3>
              <div style={styles.statsGrid}>
                <div style={styles.statCard}>
                  <div style={{...styles.statNumber, color: "#3b82f6"}}>45,672</div>
                  <div style={styles.statLabel}>Page Views (30 days)</div>
                </div>
                <div style={styles.statCard}>
                  <div style={{...styles.statNumber, color: "#10b981"}}>3.2%</div>
                  <div style={styles.statLabel}>Conversion Rate</div>
                </div>
                <div style={styles.statCard}>
                  <div style={{...styles.statNumber, color: "#f59e0b"}}>2m 34s</div>
                  <div style={styles.statLabel}>Avg. Session Duration</div>
                </div>
                <div style={styles.statCard}>
                  <div style={{...styles.statNumber, color: "#ef4444"}}>15.7%</div>
                  <div style={styles.statLabel}>Bounce Rate</div>
                </div>
              </div>
            </div>

            <div style={styles.grid}>
              <div style={styles.card}>
                <h4 style={{marginTop: 0, color: "#1f2937"}}>Revenue Trends</h4>
                <div style={{height: "200px", backgroundColor: "#f8fafc", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: "#6b7280"}}>
                  [Chart Placeholder - Revenue over time]
                </div>
              </div>

              <div style={styles.card}>
                <h4 style={{marginTop: 0, color: "#1f2937"}}>User Growth</h4>
                <div style={{height: "200px", backgroundColor: "#f8fafc", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: "#6b7280"}}>
                  [Chart Placeholder - User signups over time]
                </div>
              </div>
            </div>
          </div>
        );

      case "settings":
        return (
          <div>
            <div style={styles.tabContainer}>
              <div style={styles.tabList}>
                {["General", "Security"].map((tab) => (
                  <div
                    key={tab}
                    style={{
                      ...styles.tab,
                      ...(activeSettingsTab === tab ? styles.tabActive : {})
                    }}
                    onClick={() => setActiveSettingsTab(tab)}
                  >
                    {tab}
                  </div>
                ))}
              </div>
            </div>

            {activeSettingsTab === "General" && (
              <div style={styles.card}>
                <h3 style={{marginTop: 0, color: "#1f2937"}}>General Settings</h3>
                
                <div style={settingsStyles.section}>
                  <h4 style={settingsStyles.sectionTitle}>Platform Information</h4>
                  <div style={settingsStyles.formRow}>
                    <div style={styles.formGroup}>
                      <label style={settingsStyles.label} htmlFor="platformName">Platform Name</label>
                      <input 
                        style={settingsStyles.input} 
                        type="text" 
                        id="platformName" 
                        defaultValue="SaaSible Platform" 
                      />
                    </div>
                    <div style={styles.formGroup}>
                      <label style={settingsStyles.label} htmlFor="platformDomain">Domain</label>
                      <input 
                        style={settingsStyles.input} 
                        type="text" 
                        id="platformDomain" 
                        defaultValue="saasible.com" 
                      />
                    </div>
                  </div>
                  
                  <div style={styles.formGroup}>
                    <label style={settingsStyles.label} htmlFor="platformDescription">Platform Description</label>
                    <textarea 
                      style={settingsStyles.textarea} 
                      id="platformDescription" 
                      defaultValue="A comprehensive SaaS platform for managing your business operations."
                    />
                  </div>
                </div>

                <div style={settingsStyles.section}>
                  <h4 style={settingsStyles.sectionTitle}>Contact Information</h4>
                  <div style={settingsStyles.formRow}>
                    <div style={styles.formGroup}>
                      <label style={settingsStyles.label} htmlFor="supportEmail">Support Email</label>
                      <input 
                        style={settingsStyles.input} 
                        type="email" 
                        id="supportEmail" 
                        defaultValue="support@saasible.com" 
                      />
                    </div>
                    <div style={styles.formGroup}>
                      <label style={settingsStyles.label} htmlFor="salesEmail">Sales Email</label>
                      <input 
                        style={settingsStyles.input} 
                        type="email" 
                        id="salesEmail" 
                        defaultValue="sales@saasible.com" 
                      />
                    </div>
                  </div>
                  
                  <div style={settingsStyles.formRow}>
                    <div style={styles.formGroup}>
                      <label style={settingsStyles.label} htmlFor="phoneNumber">Phone Number</label>
                      <input 
                        style={settingsStyles.input} 
                        type="tel" 
                        id="phoneNumber" 
                        defaultValue="+1 (555) 123-4567" 
                      />
                    </div>
                    <div style={styles.formGroup}>
                      <label style={settingsStyles.label} htmlFor="timezone">Default Timezone</label>
                      <select style={settingsStyles.select} id="timezone" defaultValue="UTC">
                        <option value="UTC">UTC</option>
                        <option value="EST">Eastern Standard Time</option>
                        <option value="PST">Pacific Standard Time</option>
                        <option value="GMT">Greenwich Mean Time</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div style={settingsStyles.section}>
                  <h4 style={settingsStyles.sectionTitle}>Feature Flags</h4>
                  <div style={settingsStyles.checkboxGroup}>
                    <div style={settingsStyles.checkboxItem}>
                      <input style={settingsStyles.checkbox} type="checkbox" id="enableRegistration" defaultChecked />
                      <label htmlFor="enableRegistration">Enable User Registration</label>
                    </div>
                    <div style={settingsStyles.checkboxItem}>
                      <input style={settingsStyles.checkbox} type="checkbox" id="enableChat" defaultChecked />
                      <label htmlFor="enableChat">Enable Live Chat Support</label>
                    </div>
                    <div style={settingsStyles.checkboxItem}>
                      <input style={settingsStyles.checkbox} type="checkbox" id="enableAnalytics" defaultChecked />
                      <label htmlFor="enableAnalytics">Enable Analytics Tracking</label>
                    </div>
                    <div style={settingsStyles.checkboxItem}>
                      <input style={settingsStyles.checkbox} type="checkbox" id="maintenanceMode" />
                      <label htmlFor="maintenanceMode">Maintenance Mode</label>
                    </div>
                  </div>
                </div>

                <div style={settingsStyles.buttonGroup}>
                  <button style={styles.button}>Save Changes</button>
                  <button style={styles.buttonSecondary}>Cancel</button>
                </div>
              </div>
            )}

            {activeSettingsTab === "Security" && (
              <div style={styles.card}>
                <h3 style={{marginTop: 0, color: "#1f2937"}}>Security Settings</h3>
                
                <div style={settingsStyles.section}>
                  <h4 style={settingsStyles.sectionTitle}>Authentication</h4>
                  <div style={settingsStyles.checkboxGroup}>
                    <div style={settingsStyles.checkboxItem}>
                      <input style={settingsStyles.checkbox} type="checkbox" id="requireMFA" defaultChecked />
                      <label htmlFor="requireMFA">Require Multi-Factor Authentication</label>
                    </div>
                    <div style={settingsStyles.checkboxItem}>
                      <input style={settingsStyles.checkbox} type="checkbox" id="requireStrongPasswords" defaultChecked />
                      <label htmlFor="requireStrongPasswords">Enforce Strong Password Policy</label>
                    </div>
                    <div style={settingsStyles.checkboxItem}>
                      <input style={settingsStyles.checkbox} type="checkbox" id="enableSSO" />
                      <label htmlFor="enableSSO">Enable Single Sign-On (SSO)</label>
                    </div>
                  </div>
                </div>

                <div style={settingsStyles.section}>
                  <h4 style={settingsStyles.sectionTitle}>Session Management</h4>
                  <div style={settingsStyles.formRow}>
                    <div style={styles.formGroup}>
                      <label style={settingsStyles.label} htmlFor="sessionTimeout">Session Timeout (minutes)</label>
                      <input 
                        style={settingsStyles.input} 
                        type="number" 
                        id="sessionTimeout" 
                        defaultValue="60" 
                        min="5" 
                        max="480"
                      />
                    </div>
                    <div style={styles.formGroup}>
                      <label style={settingsStyles.label} htmlFor="maxSessions">Max Concurrent Sessions</label>
                      <input 
                        style={settingsStyles.input} 
                        type="number" 
                        id="maxSessions" 
                        defaultValue="3" 
                        min="1" 
                        max="10"
                      />
                    </div>
                  </div>
                </div>

                <div style={settingsStyles.section}>
                  <h4 style={settingsStyles.sectionTitle}>API Security</h4>
                  <div style={settingsStyles.formRow}>
                    <div style={styles.formGroup}>
                      <label style={settingsStyles.label} htmlFor="apiRateLimit">API Rate Limit (requests/minute)</label>
                      <input 
                        style={settingsStyles.input} 
                        type="number" 
                        id="apiRateLimit" 
                        defaultValue="100" 
                        min="1" 
                        max="1000"
                      />
                    </div>
                    <div style={styles.formGroup}>
                      <label style={settingsStyles.label} htmlFor="apiKeyExpiry">API Key Expiry (days)</label>
                      <input 
                        style={settingsStyles.input} 
                        type="number" 
                        id="apiKeyExpiry" 
                        defaultValue="365" 
                        min="1" 
                        max="3650"
                      />
                    </div>
                  </div>
                </div>

                <div style={settingsStyles.section}>
                  <h4 style={settingsStyles.sectionTitle}>Data Protection</h4>
                  <div style={settingsStyles.checkboxGroup}>
                    <div style={settingsStyles.checkboxItem}>
                      <input style={settingsStyles.checkbox} type="checkbox" id="encryptData" defaultChecked />
                      <label htmlFor="encryptData">Encrypt Data at Rest</label>
                    </div>
                    <div style={settingsStyles.checkboxItem}>
                      <input style={settingsStyles.checkbox} type="checkbox" id="auditLogs" defaultChecked />
                      <label htmlFor="auditLogs">Enable Audit Logging</label>
                    </div>
                    <div style={settingsStyles.checkboxItem}>
                      <input style={settingsStyles.checkbox} type="checkbox" id="gdprCompliance" defaultChecked />
                      <label htmlFor="gdprCompliance">GDPR Compliance Mode</label>
                    </div>
                  </div>
                </div>

                <div style={styles.alertWarning}>
                  <strong>Warning:</strong> Changes to security settings may affect user access. Please test thoroughly before applying.
                </div>

                <div style={settingsStyles.buttonGroup}>
                  <button style={styles.button}>Update Security Settings</button>
                  <button style={styles.buttonSecondary}>Reset to Defaults</button>
                </div>
              </div>
            )}

            
          </div>
        );

      

      default:
        return <div>Section not found</div>;
    }
  };

  // Navigation menu data
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "users", label: "Users", icon: "👥" },
    { id: "analytics", label: "Analytics", icon: "📈" },
    {
      id: "settings",
      label: "Settings",
      icon: "⚙️",
      submenu: ["General", "Security"]
    }
  ];

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <h2 style={styles.logo}>Admin Panel</h2>
        </div>
        
        <nav style={styles.nav}>
          {menuItems.map((item) => (
            <div key={item.id}>
              <div
                style={{
                  ...styles.navItem,
                  ...(activeSection === item.id ? styles.navItemActive : {}),
                  cursor: "pointer"
                }}
                onClick={() => {
                  if (item.submenu) {
                    toggleSubmenu(item.id);
                  } else {
                    setActiveSection(item.id);
                  }
                }}
                onMouseEnter={(e) => {
                  if (activeSection !== item.id) {
                    e.target.style.backgroundColor = styles.navItemHover.backgroundColor;
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeSection !== item.id) {
                    e.target.style.backgroundColor = "transparent";
                  }
                }}
              >
                <span>
                  <span style={{ marginRight: "0.75rem", fontSize: "1.2rem" }}>{item.icon}</span>
                  {item.label}
                </span>
                {item.submenu && (
                  <span style={{ fontSize: "0.8rem" }}>
                    {expandedMenus[item.id] ? "▼" : "▶"}
                  </span>
                )}
              </div>
              
              {item.submenu && expandedMenus[item.id] && (
                <div style={styles.submenu}>
                  {item.submenu.map((subItem) => (
                    <div
                      key={subItem}
                      style={{
                        ...styles.submenuItem,
                        ...(activeSection === "settings" && activeSettingsTab === subItem ? styles.submenuItemActive : {})
                      }}
                      onClick={() => {
                        setActiveSection("settings");
                        setActiveSettingsTab(subItem);
                      }}
                    >
                      {subItem}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        <div style={styles.header}>
          <h1 style={styles.title}>
            {activeSection === "settings" ? `Settings - ${activeSettingsTab}` : 
             activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
          </h1>
          <div style={styles.userSection}>
            <div style={styles.avatar}>{user.avatar}</div>
            <div>
              <div style={{ fontWeight: "bold" }}>{user.name}</div>
              <div style={{ fontSize: "0.8rem", color: "#6b7280" }}>{user.email}</div>
            </div>
            <button style={styles.logoutBtn} onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>

        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
