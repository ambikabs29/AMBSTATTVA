
import React, { useState } from "react";
import { Link } from "react-router-dom";

const SupportMenu = () => {
  const [activeTab, setActiveTab] = useState("tickets");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f8fafc",
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        background: "white",
        borderBottom: "1px solid #e5e7eb",
        padding: "2rem",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <div>
              <h1 style={{ fontSize: "2rem", fontWeight: "700", color: "#1f2937", marginBottom: "0.5rem" }}>
                🛠️ Support Center
              </h1>
              <p style={{ color: "#6b7280", fontSize: "1rem" }}>
                Get help, submit tickets, and access support resources
              </p>
            </div>
            <Link 
              to="/services/saas/admin"
              style={{
                background: "#3b82f6",
                color: "white",
                padding: "0.75rem 1.5rem",
                borderRadius: "8px",
                textDecoration: "none",
                fontSize: "0.875rem",
                fontWeight: "500"
              }}
            >
              ← Back to Dashboard
            </Link>
          </div>

          {/* Search Bar */}
          <div style={{ position: "relative", maxWidth: "500px" }}>
            <input
              type="text"
              placeholder="Search help articles, tickets, or FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%",
                padding: "0.75rem 1rem 0.75rem 2.5rem",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                fontSize: "0.875rem",
                backgroundColor: "#f9fafb",
                outline: "none",
                boxSizing: "border-box"
              }}
            />
            <span style={{
              position: "absolute",
              left: "0.75rem",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#6b7280",
              fontSize: "1rem"
            }}>
              🔍
            </span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
        {/* Tab Navigation */}
        <div style={{
          display: "flex",
          gap: "0.5rem",
          marginBottom: "2rem",
          borderBottom: "1px solid #e5e7eb"
        }}>
          {[
            { id: "tickets", label: "Support Tickets", icon: "🎫" },
            { id: "knowledge", label: "Knowledge Base", icon: "📚" },
            { id: "contact", label: "Contact Support", icon: "📞" },
            { id: "status", label: "System Status", icon: "🟢" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.75rem 1.5rem",
                border: "none",
                background: activeTab === tab.id ? "#3b82f6" : "transparent",
                color: activeTab === tab.id ? "white" : "#6b7280",
                borderRadius: "8px 8px 0 0",
                cursor: "pointer",
                fontSize: "0.875rem",
                fontWeight: "500",
                transition: "all 0.2s"
              }}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div style={{ background: "white", borderRadius: "12px", padding: "2rem", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
          {activeTab === "tickets" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                <h2 style={{ fontSize: "1.5rem", fontWeight: "600", color: "#1f2937" }}>My Support Tickets</h2>
                <button style={{
                  background: "#10b981",
                  color: "white",
                  padding: "0.75rem 1.5rem",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  cursor: "pointer"
                }}>
                  + New Ticket
                </button>
              </div>

              {/* Tickets List */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {[
                  { id: "#12345", subject: "Login Issues with SSO", status: "Open", priority: "High", updated: "2 hours ago" },
                  { id: "#12344", subject: "Feature Request: Dark Mode", status: "In Progress", priority: "Medium", updated: "1 day ago" },
                  { id: "#12343", subject: "Billing Question", status: "Resolved", priority: "Low", updated: "3 days ago" }
                ].map((ticket) => (
                  <div key={ticket.id} style={{
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    padding: "1.5rem",
                    transition: "all 0.2s",
                    cursor: "pointer"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "1rem" }}>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.5rem" }}>
                          <span style={{ fontSize: "0.875rem", color: "#6b7280", fontWeight: "500" }}>{ticket.id}</span>
                          <span style={{
                            padding: "0.25rem 0.75rem",
                            borderRadius: "20px",
                            fontSize: "0.75rem",
                            fontWeight: "500",
                            background: ticket.status === "Open" ? "#fef3c7" : ticket.status === "In Progress" ? "#dbeafe" : "#d1fae5",
                            color: ticket.status === "Open" ? "#92400e" : ticket.status === "In Progress" ? "#1e40af" : "#065f46"
                          }}>
                            {ticket.status}
                          </span>
                          <span style={{
                            padding: "0.25rem 0.75rem",
                            borderRadius: "20px",
                            fontSize: "0.75rem",
                            fontWeight: "500",
                            background: ticket.priority === "High" ? "#fee2e2" : ticket.priority === "Medium" ? "#fef3c7" : "#f0f9ff",
                            color: ticket.priority === "High" ? "#dc2626" : ticket.priority === "Medium" ? "#d97706" : "#0284c7"
                          }}>
                            {ticket.priority}
                          </span>
                        </div>
                        <h3 style={{ fontSize: "1.125rem", fontWeight: "600", color: "#1f2937" }}>{ticket.subject}</h3>
                      </div>
                      <span style={{ fontSize: "0.75rem", color: "#6b7280" }}>Updated {ticket.updated}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "knowledge" && (
            <div>
              <h2 style={{ fontSize: "1.5rem", fontWeight: "600", color: "#1f2937", marginBottom: "2rem" }}>Knowledge Base</h2>
              
              {/* Categories Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
                {[
                  { title: "Getting Started", icon: "🚀", articles: 12, description: "Learn the basics of our platform" },
                  { title: "Account Management", icon: "👤", articles: 8, description: "Manage your account settings and preferences" },
                  { title: "Billing & Payments", icon: "💳", articles: 6, description: "Understand billing, invoices, and payment methods" },
                  { title: "Security & Privacy", icon: "🔒", articles: 10, description: "Keep your account secure and private" },
                  { title: "API Documentation", icon: "🔧", articles: 15, description: "Integrate with our powerful APIs" },
                  { title: "Troubleshooting", icon: "🛠️", articles: 20, description: "Solve common issues and problems" }
                ].map((category) => (
                  <div key={category.title} style={{
                    border: "1px solid #e5e7eb",
                    borderRadius: "12px",
                    padding: "1.5rem",
                    cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.1)";
                    e.currentTarget.style.transform = "translateY(-4px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                  >
                    <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>{category.icon}</div>
                    <h3 style={{ fontSize: "1.25rem", fontWeight: "600", color: "#1f2937", marginBottom: "0.5rem" }}>
                      {category.title}
                    </h3>
                    <p style={{ color: "#6b7280", fontSize: "0.875rem", marginBottom: "1rem" }}>
                      {category.description}
                    </p>
                    <div style={{ fontSize: "0.75rem", color: "#3b82f6", fontWeight: "500" }}>
                      {category.articles} articles
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "contact" && (
            <div>
              <h2 style={{ fontSize: "1.5rem", fontWeight: "600", color: "#1f2937", marginBottom: "2rem" }}>Contact Support</h2>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
                {/* Contact Methods */}
                <div>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: "600", color: "#1f2937", marginBottom: "1.5rem" }}>
                    Get in Touch
                  </h3>
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    {[
                      { method: "Live Chat", icon: "💬", description: "Chat with our support team", availability: "24/7", action: "Start Chat" },
                      { method: "Email Support", icon: "📧", description: "Send us an email", availability: "Response within 24h", action: "Send Email" },
                      { method: "Phone Support", icon: "📞", description: "Call our support line", availability: "Mon-Fri 9AM-6PM", action: "Call Now" },
                      { method: "Community Forum", icon: "👥", description: "Ask the community", availability: "Always active", action: "Visit Forum" }
                    ].map((contact) => (
                      <div key={contact.method} style={{
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                        padding: "1.5rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem"
                      }}>
                        <div style={{ fontSize: "1.5rem" }}>{contact.icon}</div>
                        <div style={{ flex: 1 }}>
                          <h4 style={{ fontSize: "1rem", fontWeight: "600", color: "#1f2937", marginBottom: "0.25rem" }}>
                            {contact.method}
                          </h4>
                          <p style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "0.25rem" }}>
                            {contact.description}
                          </p>
                          <p style={{ fontSize: "0.75rem", color: "#10b981" }}>
                            {contact.availability}
                          </p>
                        </div>
                        <button style={{
                          background: "#3b82f6",
                          color: "white",
                          padding: "0.5rem 1rem",
                          border: "none",
                          borderRadius: "6px",
                          fontSize: "0.875rem",
                          cursor: "pointer"
                        }}>
                          {contact.action}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Contact Form */}
                <div>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: "600", color: "#1f2937", marginBottom: "1.5rem" }}>
                    Quick Contact Form
                  </h3>
                  
                  <form style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", color: "#374151", marginBottom: "0.5rem" }}>
                        Subject
                      </label>
                      <input
                        type="text"
                        placeholder="How can we help you?"
                        style={{
                          width: "100%",
                          padding: "0.75rem",
                          border: "1px solid #d1d5db",
                          borderRadius: "6px",
                          fontSize: "0.875rem",
                          boxSizing: "border-box"
                        }}
                      />
                    </div>
                    
                    <div>
                      <label style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", color: "#374151", marginBottom: "0.5rem" }}>
                        Priority
                      </label>
                      <select style={{
                        width: "100%",
                        padding: "0.75rem",
                        border: "1px solid #d1d5db",
                        borderRadius: "6px",
                        fontSize: "0.875rem",
                        boxSizing: "border-box"
                      }}>
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                        <option>Urgent</option>
                      </select>
                    </div>
                    
                    <div>
                      <label style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", color: "#374151", marginBottom: "0.5rem" }}>
                        Message
                      </label>
                      <textarea
                        rows="4"
                        placeholder="Describe your issue or question..."
                        style={{
                          width: "100%",
                          padding: "0.75rem",
                          border: "1px solid #d1d5db",
                          borderRadius: "6px",
                          fontSize: "0.875rem",
                          resize: "vertical",
                          boxSizing: "border-box"
                        }}
                      />
                    </div>
                    
                    <button type="submit" style={{
                      background: "#10b981",
                      color: "white",
                      padding: "0.75rem 1.5rem",
                      border: "none",
                      borderRadius: "8px",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      cursor: "pointer"
                    }}>
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

          {activeTab === "status" && (
            <div>
              <h2 style={{ fontSize: "1.5rem", fontWeight: "600", color: "#1f2937", marginBottom: "2rem" }}>System Status</h2>
              
              {/* Overall Status */}
              <div style={{
                background: "#f0fdf4",
                border: "1px solid #bbf7d0",
                borderRadius: "12px",
                padding: "1.5rem",
                marginBottom: "2rem",
                display: "flex",
                alignItems: "center",
                gap: "1rem"
              }}>
                <div style={{ fontSize: "2rem" }}>✅</div>
                <div>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: "600", color: "#15803d", marginBottom: "0.25rem" }}>
                    All Systems Operational
                  </h3>
                  <p style={{ color: "#16a34a", fontSize: "0.875rem" }}>
                    All services are running normally. Last updated: 2 minutes ago
                  </p>
                </div>
              </div>

              {/* Service Status */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {[
                  { service: "API Gateway", status: "Operational", uptime: "99.9%" },
                  { service: "Authentication Service", status: "Operational", uptime: "99.8%" },
                  { service: "Database", status: "Operational", uptime: "99.9%" },
                  { service: "File Storage", status: "Operational", uptime: "99.7%" },
                  { service: "Email Service", status: "Operational", uptime: "99.6%" },
                  { service: "Analytics", status: "Operational", uptime: "99.5%" }
                ].map((service) => (
                  <div key={service.service} style={{
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    padding: "1.5rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                      <div style={{
                        width: "12px",
                        height: "12px",
                        borderRadius: "50%",
                        background: "#10b981"
                      }}></div>
                      <h4 style={{ fontSize: "1rem", fontWeight: "600", color: "#1f2937" }}>
                        {service.service}
                      </h4>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
                      <span style={{ fontSize: "0.875rem", color: "#10b981", fontWeight: "500" }}>
                        {service.status}
                      </span>
                      <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                        {service.uptime} uptime
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupportMenu;
