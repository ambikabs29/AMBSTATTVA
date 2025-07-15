
import React from "react";
import { Link } from "react-router-dom";

const SaaS = () => {
  // Placeholder data for marketplace items
  const marketplaceItems = [
    { id: 1, name: "Task Manager Pro", category: "Productivity", price: "$29/month", rating: 4.8 },
    { id: 2, name: "Analytics Dashboard", category: "Analytics", price: "$49/month", rating: 4.9 },
    { id: 3, name: "Customer Support Bot", category: "Support", price: "$19/month", rating: 4.7 },
    { id: 4, name: "E-commerce Suite", category: "E-commerce", price: "$99/month", rating: 4.6 },
  ];

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
      {/* Navigation */}
      <nav style={{
        background: "white",
        borderBottom: "1px solid #e5e7eb",
        padding: "1rem 2rem",
        position: "sticky",
        top: 0,
        zIndex: 50,
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div style={{ background: "#3b82f6", color: "white", padding: "6px 12px", borderRadius: "6px", fontWeight: "bold" }}>
              📦 SaaSibly
            </div>
          </div>
          
          <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
            <a href="#features" style={{ textDecoration: "none", color: "#6b7280", fontWeight: "normal" }}>Features</a>
            <a href="#marketplace" style={{ textDecoration: "none", color: "#6b7280", fontWeight: "normal" }}>Marketplace</a>
            <a href="#pricing" style={{ textDecoration: "none", color: "#6b7280", fontWeight: "normal" }}>Pricing</a>
            <a href="#faqs" style={{ textDecoration: "none", color: "#6b7280", fontWeight: "normal" }}>FAQs</a>
          </div>

          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <Link 
              to="/services/saas/login"
              style={{ 
                textDecoration: "none",
                color: "#3b82f6", 
                fontWeight: "bold"
              }}
            >
              Login
            </Link>
            <Link 
              to="/services/saas/register"
              style={{
                background: "#3b82f6",
                color: "white",
                padding: "8px 16px",
                borderRadius: "6px",
                textDecoration: "none",
                fontSize: "0.9rem"
              }}
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        padding: "4rem 2rem",
        textAlign: "center"
      }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h1 style={{ fontSize: "3.5rem", fontWeight: "bold", marginBottom: "1.5rem", lineHeight: "1.1" }}>
            Build Amazing SaaS Products
          </h1>
          <p style={{ fontSize: "1.25rem", marginBottom: "2.5rem", opacity: 0.9, lineHeight: "1.6" }}>
            Everything you need to create, deploy, and scale your next big idea. From development tools to marketplace integrations.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link 
              to="/services/saas/register"
              style={{
                background: "white",
                color: "#3b82f6",
                padding: "1rem 2rem",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: "bold",
                fontSize: "1.1rem",
                transition: "transform 0.2s"
              }}
              onMouseEnter={(e) => e.target.style.transform = "translateY(-2px)"}
              onMouseLeave={(e) => e.target.style.transform = "translateY(0)"}
            >
              Start Building Free
            </Link>
            <button style={{
              background: "transparent",
              color: "white",
              border: "2px solid white",
              padding: "1rem 2rem",
              borderRadius: "8px",
              fontSize: "1.1rem",
              cursor: "pointer",
              transition: "all 0.2s"
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "white";
              e.target.style.color = "#3b82f6";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "transparent";
              e.target.style.color = "white";
            }}>
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={{ padding: "5rem 2rem", background: "#f8fafc" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <h2 style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#1f2937", marginBottom: "1rem" }}>
              Everything You Need
            </h2>
            <p style={{ fontSize: "1.1rem", color: "#6b7280", maxWidth: "600px", margin: "0 auto" }}>
              Powerful tools and integrations to help you build, deploy, and scale your SaaS application.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
            {[
              { icon: "🚀", title: "Rapid Development", desc: "Build faster with our pre-built components and templates" },
              { icon: "🔒", title: "Enterprise Security", desc: "Bank-level security with encryption and compliance" },
              { icon: "📊", title: "Analytics Dashboard", desc: "Real-time insights into your application performance" },
              { icon: "🌐", title: "Global CDN", desc: "Lightning-fast delivery worldwide with our CDN network" },
              { icon: "🔧", title: "API Integration", desc: "Connect with 1000+ third-party services seamlessly" },
              { icon: "📱", title: "Mobile Ready", desc: "Responsive design that works perfectly on all devices" }
            ].map((feature, index) => (
              <div key={index} style={{
                background: "white",
                padding: "2rem",
                borderRadius: "12px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                textAlign: "center",
                transition: "transform 0.2s",
                cursor: "pointer"
              }}
              onMouseEnter={(e) => e.target.style.transform = "translateY(-4px)"}
              onMouseLeave={(e) => e.target.style.transform = "translateY(0)"}>
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>{feature.icon}</div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: "600", color: "#1f2937", marginBottom: "0.5rem" }}>
                  {feature.title}
                </h3>
                <p style={{ color: "#6b7280", lineHeight: "1.6" }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marketplace Section */}
      <section id="marketplace" style={{ padding: "5rem 2rem", background: "white" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <h2 style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#1f2937", marginBottom: "1rem" }}>
              App Marketplace
            </h2>
            <p style={{ fontSize: "1.1rem", color: "#6b7280", maxWidth: "600px", margin: "0 auto" }}>
              Extend your application with powerful integrations from our marketplace.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {marketplaceItems.map(item => (
              <div key={item.id} style={{
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                padding: "1.5rem",
                transition: "all 0.2s",
                cursor: "pointer"
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = "#3b82f6";
                e.target.style.boxShadow = "0 4px 12px rgba(59,130,246,0.15)";
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = "#e5e7eb";
                e.target.style.boxShadow = "none";
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                  <div>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: "600", color: "#1f2937", marginBottom: "0.25rem" }}>
                      {item.name}
                    </h3>
                    <span style={{
                      background: "#f3f4f6",
                      color: "#6b7280",
                      padding: "0.25rem 0.5rem",
                      borderRadius: "4px",
                      fontSize: "0.75rem"
                    }}>
                      {item.category}
                    </span>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "1rem", fontWeight: "600", color: "#1f2937" }}>{item.price}</div>
                    <div style={{ fontSize: "0.875rem", color: "#fbbf24" }}>⭐ {item.rating}</div>
                  </div>
                </div>
                <button style={{
                  width: "100%",
                  background: "#f9fafb",
                  border: "1px solid #e5e7eb",
                  padding: "0.75rem",
                  borderRadius: "6px",
                  color: "#374151",
                  cursor: "pointer",
                  transition: "all 0.2s"
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "#3b82f6";
                  e.target.style.color = "white";
                  e.target.style.borderColor = "#3b82f6";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "#f9fafb";
                  e.target.style.color = "#374151";
                  e.target.style.borderColor = "#e5e7eb";
                }}>
                  Install App
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" style={{ padding: "5rem 2rem", background: "#f8fafc" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <h2 style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#1f2937", marginBottom: "1rem" }}>
              Simple, Transparent Pricing
            </h2>
            <p style={{ fontSize: "1.1rem", color: "#6b7280" }}>
              Choose the plan that fits your needs. Upgrade or downgrade at any time.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
            {[
              {
                name: "Starter",
                price: "$0",
                period: "free forever",
                features: ["Up to 3 projects", "Basic analytics", "Community support", "5GB storage"],
                popular: false
              },
              {
                name: "Professional",
                price: "$29",
                period: "per month",
                features: ["Unlimited projects", "Advanced analytics", "Priority support", "100GB storage", "Custom domains"],
                popular: true
              },
              {
                name: "Enterprise",
                price: "$99",
                period: "per month",
                features: ["Everything in Pro", "Dedicated support", "Custom integrations", "1TB storage", "SLA guarantee"],
                popular: false
              }
            ].map((plan, index) => (
              <div key={index} style={{
                background: "white",
                borderRadius: "12px",
                padding: "2rem",
                border: plan.popular ? "2px solid #3b82f6" : "1px solid #e5e7eb",
                position: "relative",
                boxShadow: plan.popular ? "0 8px 25px rgba(59,130,246,0.15)" : "0 4px 6px rgba(0,0,0,0.1)"
              }}>
                {plan.popular && (
                  <div style={{
                    position: "absolute",
                    top: "-10px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "#3b82f6",
                    color: "white",
                    padding: "0.5rem 1rem",
                    borderRadius: "20px",
                    fontSize: "0.875rem",
                    fontWeight: "600"
                  }}>
                    Most Popular
                  </div>
                )}
                
                <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                  <h3 style={{ fontSize: "1.5rem", fontWeight: "600", color: "#1f2937", marginBottom: "0.5rem" }}>
                    {plan.name}
                  </h3>
                  <div style={{ marginBottom: "0.5rem" }}>
                    <span style={{ fontSize: "3rem", fontWeight: "bold", color: "#1f2937" }}>{plan.price}</span>
                    <span style={{ color: "#6b7280", marginLeft: "0.5rem" }}>/{plan.period}</span>
                  </div>
                </div>

                <ul style={{ listStyle: "none", padding: 0, marginBottom: "2rem" }}>
                  {plan.features.map((feature, idx) => (
                    <li key={idx} style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "0.75rem",
                      color: "#374151"
                    }}>
                      <span style={{ color: "#10b981", marginRight: "0.5rem" }}>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button style={{
                  width: "100%",
                  background: plan.popular ? "#3b82f6" : "white",
                  color: plan.popular ? "white" : "#3b82f6",
                  border: `2px solid #3b82f6`,
                  padding: "0.875rem",
                  borderRadius: "8px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.2s"
                }}
                onMouseEnter={(e) => {
                  if (!plan.popular) {
                    e.target.style.background = "#3b82f6";
                    e.target.style.color = "white";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!plan.popular) {
                    e.target.style.background = "white";
                    e.target.style.color = "#3b82f6";
                  }
                }}>
                  {plan.name === "Starter" ? "Get Started Free" : "Start Free Trial"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faqs" style={{ padding: "5rem 2rem", background: "white" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <h2 style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#1f2937", marginBottom: "1rem" }}>
              Frequently Asked Questions
            </h2>
            <p style={{ fontSize: "1.1rem", color: "#6b7280" }}>
              Got questions? We've got answers.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {[
              {
                question: "How quickly can I get started?",
                answer: "You can start building immediately with our free plan. No credit card required, and you'll have your first app running in minutes."
              },
              {
                question: "Can I change my plan later?",
                answer: "Absolutely! You can upgrade or downgrade your plan at any time. Changes take effect immediately and you'll only pay for what you use."
              },
              {
                question: "What kind of support do you offer?",
                answer: "We offer community support for free users, email support for Pro users, and dedicated support for Enterprise customers."
              },
              {
                question: "Is my data secure?",
                answer: "Yes! We use enterprise-grade security with encryption at rest and in transit. Your data is stored in secure, SOC 2 compliant data centers."
              }
            ].map((faq, index) => (
              <div key={index} style={{
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "1.5rem",
                background: "#fafbfc"
              }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: "600", color: "#1f2937", marginBottom: "0.75rem" }}>
                  {faq.question}
                </h3>
                <p style={{ color: "#6b7280", lineHeight: "1.6", margin: 0 }}>
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        padding: "4rem 2rem",
        textAlign: "center"
      }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
            Ready to Build Something Amazing?
          </h2>
          <p style={{ fontSize: "1.1rem", marginBottom: "2rem", opacity: 0.9 }}>
            Join thousands of developers who are already building the future with SaaSibly.
          </p>
          <Link 
            to="/services/saas/register"
            style={{
              background: "white",
              color: "#3b82f6",
              padding: "1rem 2rem",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "1.1rem",
              display: "inline-block",
              transition: "transform 0.2s"
            }}
            onMouseEnter={(e) => e.target.style.transform = "translateY(-2px)"}
            onMouseLeave={(e) => e.target.style.transform = "translateY(0)"}
          >
            Start Building Free Today
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "#1f2937", color: "#9ca3af", padding: "3rem 2rem 2rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem", marginBottom: "2rem" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
                <div style={{ background: "#3b82f6", color: "white", padding: "6px 12px", borderRadius: "6px", fontWeight: "bold" }}>
                  📦 SaaSibly
                </div>
              </div>
              <p style={{ lineHeight: "1.6", margin: 0 }}>
                The complete platform for building, deploying, and scaling SaaS applications.
              </p>
            </div>
            
            <div>
              <h4 style={{ color: "white", fontWeight: "600", marginBottom: "1rem" }}>Product</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <a href="#features" style={{ color: "#9ca3af", textDecoration: "none" }}>Features</a>
                <a href="#marketplace" style={{ color: "#9ca3af", textDecoration: "none" }}>Marketplace</a>
                <a href="#pricing" style={{ color: "#9ca3af", textDecoration: "none" }}>Pricing</a>
                <a href="#" style={{ color: "#9ca3af", textDecoration: "none" }}>Documentation</a>
              </div>
            </div>
            
            <div>
              <h4 style={{ color: "white", fontWeight: "600", marginBottom: "1rem" }}>Company</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <a href="#" style={{ color: "#9ca3af", textDecoration: "none" }}>About</a>
                <a href="#" style={{ color: "#9ca3af", textDecoration: "none" }}>Blog</a>
                <a href="#" style={{ color: "#9ca3af", textDecoration: "none" }}>Careers</a>
                <a href="#" style={{ color: "#9ca3af", textDecoration: "none" }}>Contact</a>
              </div>
            </div>
            
            <div>
              <h4 style={{ color: "white", fontWeight: "600", marginBottom: "1rem" }}>Support</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <a href="#" style={{ color: "#9ca3af", textDecoration: "none" }}>Help Center</a>
                <a href="#" style={{ color: "#9ca3af", textDecoration: "none" }}>Community</a>
                <a href="#" style={{ color: "#9ca3af", textDecoration: "none" }}>Status</a>
                <Link to="/services/saas/admin" style={{ color: "#9ca3af", textDecoration: "none" }}>Admin Dashboard</Link>
              </div>
            </div>
          </div>
          
          <div style={{ borderTop: "1px solid #374151", paddingTop: "2rem", textAlign: "center" }}>
            <p style={{ margin: 0 }}>
              © 2024 SaaSibly. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SaaS;
