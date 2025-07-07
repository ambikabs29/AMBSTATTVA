
import React, { useState } from "react";
import { Link } from "react-router-dom";

const SaaS = () => {
  const [activeSection, setActiveSection] = useState("marketplace");

  // Placeholder data for marketplace items
  const softwareList = [
    {
      id: 1,
      name: "Clinic Manager Pro",
      description: "Cloud-based clinic management software for doctors and clinics.",
      price: "₹299/month",
      category: "Healthcare"
    },
    {
      id: 2,
      name: "EduSmart Tuition",
      description: "Tuition and coaching class scheduler and fee manager.",
      price: "₹199/month",
      category: "Education"
    },
    {
      id: 3,
      name: "CraftShop CMS",
      description: "Sell handmade products online with your own mini-storefront.",
      price: "₹149/month",
      category: "E-commerce"
    },
    {
      id: 4,
      name: "HRDesk Pro",
      description: "Complete HR management system with payroll and attendance.",
      price: "₹499/month",
      category: "Business"
    },
    {
      id: 5,
      name: "InventoryGo",
      description: "Smart inventory management for small to medium businesses.",
      price: "₹349/month",
      category: "Business"
    },
    {
      id: 6,
      name: "BookKeeper Plus",
      description: "Simple accounting software for freelancers and small businesses.",
      price: "₹249/month",
      category: "Finance"
    }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "marketplace":
        return (
          <div>
            {/* Hero Section */}
            <div style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              padding: "4rem 2rem",
              borderRadius: "12px",
              marginBottom: "3rem",
              textAlign: "center"
            }}>
              <h1 style={{ fontSize: "3rem", marginBottom: "1rem", fontWeight: "bold" }}>
                Host, Sell & Subscribe to SaaS
              </h1>
              <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
                in <span style={{ color: "#4ade80" }}>One Platform</span>
              </h2>
              <p style={{ fontSize: "1.2rem", marginBottom: "2rem", opacity: 0.9 }}>
                SaaSible lets you launch your software or subscribe to powerful tools - all in one place.
              </p>
              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                <button style={{
                  background: "#3b82f6",
                  color: "white",
                  padding: "12px 24px",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}>
                  Get Started
                </button>
                <button style={{
                  background: "transparent",
                  color: "white",
                  padding: "12px 24px",
                  border: "2px solid white",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  cursor: "pointer"
                }}>
                  🤖 Get AI Software Idea
                </button>
              </div>
            </div>

            {/* Features Section */}
            <div style={{ marginBottom: "3rem" }}>
              <h3 style={{ fontSize: "2rem", marginBottom: "2rem", textAlign: "center" }}>
                Unlimited Possibilities, One Marketplace
              </h3>
              <p style={{ textAlign: "center", fontSize: "1.1rem", marginBottom: "3rem", opacity: 0.8 }}>
                Explore a diverse range of applications, from productivity tools to enterprise-level software, all in one place.
              </p>
              
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
                gap: "2rem",
                marginBottom: "3rem"
              }}>
                {softwareList.map((software) => (
                  <div
                    key={software.id}
                    style={{
                      border: "1px solid #e5e7eb",
                      borderRadius: "12px",
                      padding: "1.5rem",
                      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                      transition: "transform 0.2s, box-shadow 0.2s",
                      cursor: "pointer"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "translateY(-4px)";
                      e.target.style.boxShadow = "0 8px 25px rgba(0,0,0,0.15)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
                    }}
                  >
                    <div style={{ 
                      background: "#f3f4f6", 
                      color: "#6b7280", 
                      padding: "4px 8px", 
                      borderRadius: "4px", 
                      fontSize: "0.8rem",
                      display: "inline-block",
                      marginBottom: "1rem"
                    }}>
                      {software.category}
                    </div>
                    <h4 style={{ fontSize: "1.3rem", marginBottom: "0.5rem", color: "#1f2937" }}>
                      {software.name}
                    </h4>
                    <p style={{ color: "#6b7280", marginBottom: "1rem", lineHeight: "1.5" }}>
                      {software.description}
                    </p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <strong style={{ color: "#059669", fontSize: "1.1rem" }}>{software.price}</strong>
                      <button style={{
                        background: "#3b82f6",
                        color: "white",
                        padding: "8px 16px",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "0.9rem"
                      }}>
                        Subscribe
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "features":
        return (
          <div style={{ padding: "2rem 0" }}>
            <h3 style={{ fontSize: "2rem", marginBottom: "2rem" }}>Platform Features</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }}>
              <div style={{ padding: "1.5rem", border: "1px solid #e5e7eb", borderRadius: "8px" }}>
                <h4>🚀 Easy Deployment</h4>
                <p>Deploy your SaaS applications with one-click deployment and automatic scaling.</p>
              </div>
              <div style={{ padding: "1.5rem", border: "1px solid #e5e7eb", borderRadius: "8px" }}>
                <h4>💳 Integrated Payments</h4>
                <p>Built-in payment processing with support for subscriptions and one-time purchases.</p>
              </div>
              <div style={{ padding: "1.5rem", border: "1px solid #e5e7eb", borderRadius: "8px" }}>
                <h4>📊 Analytics Dashboard</h4>
                <p>Comprehensive analytics to track your software performance and revenue.</p>
              </div>
              <div style={{ padding: "1.5rem", border: "1px solid #e5e7eb", borderRadius: "8px" }}>
                <h4>🔐 Secure & Reliable</h4>
                <p>Enterprise-grade security with 99.9% uptime guarantee for your applications.</p>
              </div>
            </div>
          </div>
        );

      case "pricing":
        return (
          <div style={{ padding: "2rem 0" }}>
            <h3 style={{ fontSize: "2rem", marginBottom: "2rem" }}>Pricing Plans</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }}>
              <div style={{ padding: "2rem", border: "2px solid #e5e7eb", borderRadius: "12px", textAlign: "center" }}>
                <h4>Starter</h4>
                <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#3b82f6", margin: "1rem 0" }}>₹99/mo</div>
                <ul style={{ listStyle: "none", padding: 0, textAlign: "left" }}>
                  <li>✅ Up to 2 SaaS apps</li>
                  <li>✅ Basic analytics</li>
                  <li>✅ Email support</li>
                  <li>✅ 5GB storage</li>
                </ul>
                <button style={{ background: "#3b82f6", color: "white", padding: "10px 20px", border: "none", borderRadius: "6px", marginTop: "1rem" }}>
                  Choose Plan
                </button>
              </div>
              <div style={{ padding: "2rem", border: "2px solid #3b82f6", borderRadius: "12px", textAlign: "center", position: "relative" }}>
                <div style={{ background: "#3b82f6", color: "white", padding: "4px 12px", borderRadius: "12px", position: "absolute", top: "-10px", left: "50%", transform: "translateX(-50%)" }}>
                  Popular
                </div>
                <h4>Professional</h4>
                <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#3b82f6", margin: "1rem 0" }}>₹299/mo</div>
                <ul style={{ listStyle: "none", padding: 0, textAlign: "left" }}>
                  <li>✅ Up to 10 SaaS apps</li>
                  <li>✅ Advanced analytics</li>
                  <li>✅ Priority support</li>
                  <li>✅ 50GB storage</li>
                  <li>✅ Custom domain</li>
                </ul>
                <button style={{ background: "#3b82f6", color: "white", padding: "10px 20px", border: "none", borderRadius: "6px", marginTop: "1rem" }}>
                  Choose Plan
                </button>
              </div>
              <div style={{ padding: "2rem", border: "2px solid #e5e7eb", borderRadius: "12px", textAlign: "center" }}>
                <h4>Enterprise</h4>
                <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#3b82f6", margin: "1rem 0" }}>₹999/mo</div>
                <ul style={{ listStyle: "none", padding: 0, textAlign: "left" }}>
                  <li>✅ Unlimited SaaS apps</li>
                  <li>✅ Enterprise analytics</li>
                  <li>✅ 24/7 phone support</li>
                  <li>✅ 500GB storage</li>
                  <li>✅ White-label solution</li>
                </ul>
                <button style={{ background: "#3b82f6", color: "white", padding: "10px 20px", border: "none", borderRadius: "6px", marginTop: "1rem" }}>
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        );

      case "faqs":
        return (
          <div style={{ padding: "2rem 0" }}>
            <h3 style={{ fontSize: "2rem", marginBottom: "2rem" }}>Frequently Asked Questions</h3>
            <div style={{ maxWidth: "800px" }}>
              <div style={{ marginBottom: "2rem", padding: "1.5rem", border: "1px solid #e5e7eb", borderRadius: "8px" }}>
                <h4>How do I get started with SaaSible?</h4>
                <p>Simply sign up for an account, choose your pricing plan, and start uploading your SaaS applications or browse our marketplace to subscribe to existing tools.</p>
              </div>
              <div style={{ marginBottom: "2rem", padding: "1.5rem", border: "1px solid #e5e7eb", borderRadius: "8px" }}>
                <h4>What payment methods do you accept?</h4>
                <p>We accept all major credit cards, UPI, net banking, and digital wallets through our integrated payment partners.</p>
              </div>
              <div style={{ marginBottom: "2rem", padding: "1.5rem", border: "1px solid #e5e7eb", borderRadius: "8px" }}>
                <h4>Can I customize my SaaS application's appearance?</h4>
                <p>Yes! Our platform provides extensive customization options including themes, branding, and custom domains for Professional and Enterprise plans.</p>
              </div>
              <div style={{ marginBottom: "2rem", padding: "1.5rem", border: "1px solid #e5e7eb", borderRadius: "8px" }}>
                <h4>Is there a free trial available?</h4>
                <p>Yes, we offer a 14-day free trial for all our plans. No credit card required to get started.</p>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Select a section from the navigation.</div>;
    }
  };

  return (
    <div>
      {/* Top Navigation Bar */}
      <nav style={{
        background: "white",
        borderBottom: "1px solid #e5e7eb",
        padding: "1rem 2rem",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div style={{ background: "#3b82f6", color: "white", padding: "6px 12px", borderRadius: "6px", fontWeight: "bold" }}>
              📦 SaaSible
            </div>
          </div>
          
          <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
            <button 
              onClick={() => setActiveSection("marketplace")}
              style={{ 
                background: "none", 
                border: "none", 
                cursor: "pointer", 
                color: activeSection === "marketplace" ? "#3b82f6" : "#6b7280",
                fontWeight: activeSection === "marketplace" ? "bold" : "normal"
              }}
            >
              Home
            </button>
            <button 
              onClick={() => setActiveSection("features")}
              style={{ 
                background: "none", 
                border: "none", 
                cursor: "pointer", 
                color: activeSection === "features" ? "#3b82f6" : "#6b7280",
                fontWeight: activeSection === "features" ? "bold" : "normal"
              }}
            >
              Features
            </button>
            <button 
              onClick={() => setActiveSection("marketplace")}
              style={{ 
                background: "none", 
                border: "none", 
                cursor: "pointer", 
                color: "#6b7280"
              }}
            >
              Marketplace
            </button>
            <button 
              onClick={() => setActiveSection("pricing")}
              style={{ 
                background: "none", 
                border: "none", 
                cursor: "pointer", 
                color: activeSection === "pricing" ? "#3b82f6" : "#6b7280",
                fontWeight: activeSection === "pricing" ? "bold" : "normal"
              }}
            >
              Pricing
            </button>
            <button 
              onClick={() => setActiveSection("faqs")}
              style={{ 
                background: "none", 
                border: "none", 
                cursor: "pointer", 
                color: activeSection === "faqs" ? "#3b82f6" : "#6b7280",
                fontWeight: activeSection === "faqs" ? "bold" : "normal"
              }}
            >
              FAQs
            </button>
          </div>

          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <button style={{ background: "none", border: "none", cursor: "pointer", color: "#6b7280" }}>
              Login
            </button>
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
              Admin Panel
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
        {renderContent()}
      </div>

      {/* Footer Section */}
      <footer style={{ background: "#f9fafb", padding: "3rem 2rem", marginTop: "4rem", borderTop: "1px solid #e5e7eb" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
          <h3 style={{ marginBottom: "1rem" }}>Ready to Get Started?</h3>
          <p style={{ marginBottom: "2rem", color: "#6b7280" }}>
            Join thousands of developers and businesses using SaaSible to power their software marketplace.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button style={{
              background: "#3b82f6",
              color: "white",
              padding: "12px 24px",
              border: "none",
              borderRadius: "8px",
              fontSize: "1rem",
              cursor: "pointer",
              fontWeight: "bold"
            }}>
              Start Free Trial
            </button>
            <button style={{
              background: "transparent",
              color: "#3b82f6",
              padding: "12px 24px",
              border: "2px solid #3b82f6",
              borderRadius: "8px",
              fontSize: "1rem",
              cursor: "pointer"
            }}>
              View Documentation
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SaaS;
