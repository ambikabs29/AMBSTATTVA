
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SaaS = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [currentSlide, setCurrentSlide] = useState(0);

  // Sliding banner content
  const bannerSlides = [
    {
      title: "Host, Sell & Subscribe to SaaS",
      subtitle: "in One Platform",
      description: "SaaSibly lets you launch your software or subscribe to powerful tools - all in one place.",
      background: "linear-gradient(rgba(102, 126, 234, 0.8), rgba(118, 75, 162, 0.8)), url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
      backgroundSize: "cover",
      backgroundPosition: "center"
    },
    {
      title: "Unlimited Possibilities",
      subtitle: "One Marketplace",
      description: "Explore a diverse range of applications, from productivity tools to enterprise-level software.",
      background: "linear-gradient(rgba(240, 147, 251, 0.8), rgba(245, 87, 108, 0.8)), url('https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
      backgroundSize: "cover",
      backgroundPosition: "center"
    },
    {
      title: "Join the SaaS Revolution",
      subtitle: "Start Today",
      description: "Whether you're a vendor or customer, SaaSibly is your gateway to the future of software.",
      background: "linear-gradient(rgba(79, 172, 254, 0.8), rgba(0, 242, 254, 0.8)), url('https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
      backgroundSize: "cover",
      backgroundPosition: "center"
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const renderContent = () => {
    switch (activeSection) {
      case "home":
        return (
          <div>
            {/* Sliding Hero Banner */}
            <div style={{
              position: "relative",
              height: "500px",
              borderRadius: "12px",
              marginBottom: "3rem",
              overflow: "hidden"
            }}>
              {bannerSlides.map((slide, index) => (
                <div
                  key={index}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: slide.background,
                    backgroundSize: slide.backgroundSize,
                    backgroundPosition: slide.backgroundPosition,
                    color: "white",
                    padding: "4rem 2rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    opacity: currentSlide === index ? 1 : 0,
                    transition: "opacity 1s ease-in-out"
                  }}
                >
                  <h1 style={{ fontSize: "3rem", marginBottom: "1rem", fontWeight: "bold" }}>
                    {slide.title}
                  </h1>
                  <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
                    {slide.subtitle.includes("One Platform") ? 
                      <>in <span style={{ color: "#4ade80" }}>One Platform</span></> :
                      slide.subtitle
                    }
                  </h2>
                  <p style={{ fontSize: "1.2rem", marginBottom: "2rem", opacity: 0.9 }}>
                    {slide.description}
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
              ))}
              
              {/* Slide indicators */}
              <div style={{
                position: "absolute",
                bottom: "20px",
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                gap: "10px"
              }}>
                {bannerSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    style={{
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      border: "none",
                      background: currentSlide === index ? "#fff" : "rgba(255,255,255,0.5)",
                      cursor: "pointer",
                      transition: "background 0.3s"
                    }}
                  />
                ))}
              </div>
            </div>

            {/* How SaaSibly Works Section */}
            <div style={{ marginBottom: "4rem", background: "#f8fafc", padding: "4rem 2rem", borderRadius: "12px" }}>
              <h3 style={{ fontSize: "2.5rem", marginBottom: "1rem", textAlign: "center", color: "#1f2937" }}>
                How SaaSibly Works
              </h3>
              <p style={{ textAlign: "center", fontSize: "1.1rem", marginBottom: "3rem", color: "#6b7280" }}>
                A simple, streamlined process for software vendors and customers.
              </p>
              
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
                gap: "2rem"
              }}>
                <div style={{ textAlign: "center", padding: "2rem" }}>
                  <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🏠</div>
                  <h4 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "#1f2937" }}>Vendors: Launch Your Software</h4>
                  <p style={{ color: "#6b7280", lineHeight: "1.6" }}>
                    Easily choose a SaaSible vendor plan, upload your software, and create custom subscription tiers for your customers. Manage everything from one dashboard.
                  </p>
                </div>
                
                <div style={{ textAlign: "center", padding: "2rem" }}>
                  <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🛒</div>
                  <h4 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "#1f2937" }}>Customers: Discover & Subscribe</h4>
                  <p style={{ color: "#6b7280", lineHeight: "1.6" }}>
                    Register for free to explore a marketplace of innovative SaaS solutions. Subscribe to the tools you need with straightforward vendor plans.
                  </p>
                </div>
                
                <div style={{ textAlign: "center", padding: "2rem" }}>
                  <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>👥</div>
                  <h4 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "#1f2937" }}>Seamless Ecosystem</h4>
                  <p style={{ color: "#6b7280", lineHeight: "1.6" }}>
                    SaaSible connects software creators with users, providing a robust platform for distribution, subscription management, and growth for everyone.
                  </p>
                </div>
              </div>
            </div>

            {/* Video Section */}
            <div style={{ marginBottom: "4rem", textAlign: "center" }}>
              <h3 style={{ fontSize: "2.5rem", marginBottom: "1rem", color: "#1f2937" }}>
                See SaaSibly in Action
              </h3>
              <p style={{ fontSize: "1.1rem", marginBottom: "2rem", color: "#6b7280" }}>
                Watch this short video to get a quick overview of our platform and its capabilities.
              </p>
              <div style={{ 
                maxWidth: "800px", 
                margin: "0 auto",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
              }}>
                <iframe
                  width="100%"
                  height="450"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="SaaSibly Platform Overview"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ display: "block" }}
                />
              </div>
            </div>
          </div>
        );

      case "features":
        return (
          <div style={{ padding: "2rem 0" }}>
            <div style={{ marginBottom: "4rem", textAlign: "center", background: "#f1f5f9", padding: "3rem 2rem", borderRadius: "12px" }}>
              <h3 style={{ fontSize: "2.5rem", marginBottom: "1rem", color: "#1f2937" }}>
                Powerful Features for Everyone
              </h3>
              <p style={{ fontSize: "1.1rem", color: "#6b7280" }}>
                SaaSible is packed with tools to help vendors succeed and customers thrive.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", marginBottom: "4rem" }}>
              {/* For Software Vendors */}
              <div>
                <h4 style={{ fontSize: "1.8rem", marginBottom: "2rem", color: "#1f2937" }}>For Software Vendors</h4>
                <div style={{ display: "grid", gap: "1.5rem" }}>
                  <div style={{ padding: "1.5rem", background: "white", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                      <div style={{ fontSize: "1.5rem" }}>📤</div>
                      <h5 style={{ fontSize: "1.2rem", color: "#1f2937" }}>Easy Software Upload & Plan Creation</h5>
                    </div>
                    <p style={{ color: "#6b7280", lineHeight: "1.5" }}>
                      Quickly upload your software packages and define flexible subscription plans for your end-users.
                    </p>
                  </div>
                  
                  <div style={{ padding: "1.5rem", background: "white", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                      <div style={{ fontSize: "1.5rem" }}>🎛️</div>
                      <h5 style={{ fontSize: "1.2rem", color: "#1f2937" }}>Vendor Dashboard</h5>
                    </div>
                    <p style={{ color: "#6b7280", lineHeight: "1.5" }}>
                      Monitor your subscribers, track earnings, and manage your software listings efficiently.
                    </p>
                  </div>
                  
                  <div style={{ padding: "1.5rem", background: "white", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                      <div style={{ fontSize: "1.5rem" }}>📊</div>
                      <h5 style={{ fontSize: "1.2rem", color: "#1f2937" }}>Analytics & Insights</h5>
                    </div>
                    <p style={{ color: "#6b7280", lineHeight: "1.5" }}>
                      Gain valuable insights into your software performance and customer engagement.
                    </p>
                  </div>
                  
                  <div style={{ padding: "1.5rem", background: "white", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                      <div style={{ fontSize: "1.5rem" }}>🔐</div>
                      <h5 style={{ fontSize: "1.2rem", color: "#1f2937" }}>Secure Hosting & Distribution</h5>
                    </div>
                    <p style={{ color: "#6b7280", lineHeight: "1.5" }}>
                      Reliable infrastructure to host your software and deliver it securely to customers.
                    </p>
                  </div>
                </div>
              </div>

              {/* For SaaS Customers */}
              <div>
                <h4 style={{ fontSize: "1.8rem", marginBottom: "2rem", color: "#059669" }}>For SaaS Customers</h4>
                <div style={{ display: "grid", gap: "1.5rem" }}>
                  <div style={{ padding: "1.5rem", background: "white", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                      <div style={{ fontSize: "1.5rem" }}>🌐</div>
                      <h5 style={{ fontSize: "1.2rem", color: "#1f2937" }}>Browse Diverse Software</h5>
                    </div>
                    <p style={{ color: "#6b7280", lineHeight: "1.5" }}>
                      Discover a wide range of SaaS applications tailored to various needs and industries.
                    </p>
                  </div>
                  
                  <div style={{ padding: "1.5rem", background: "white", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                      <div style={{ fontSize: "1.5rem" }}>📋</div>
                      <h5 style={{ fontSize: "1.2rem", color: "#1f2937" }}>Flexible Subscription Plans</h5>
                    </div>
                    <p style={{ color: "#6b7280", lineHeight: "1.5" }}>
                      Choose from multiple subscription options offered by vendors to fit your budget and requirements.
                    </p>
                  </div>
                  
                  <div style={{ padding: "1.5rem", background: "white", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                      <div style={{ fontSize: "1.5rem" }}>🎛️</div>
                      <h5 style={{ fontSize: "1.2rem", color: "#1f2937" }}>Unified Customer Dashboard</h5>
                    </div>
                    <p style={{ color: "#6b7280", lineHeight: "1.5" }}>
                      Manage all your software subscriptions, billing, and access in one centralized place.
                    </p>
                  </div>
                  
                  <div style={{ padding: "1.5rem", background: "white", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                      <div style={{ fontSize: "1.5rem" }}>⬇️</div>
                      <h5 style={{ fontSize: "1.2rem", color: "#1f2937" }}>Instant Access & Download</h5>
                    </div>
                    <p style={{ color: "#6b7280", lineHeight: "1.5" }}>
                      Get immediate access to subscribed software or download project files effortlessly.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "marketplace":
        return (
          <div style={{ padding: "2rem 0" }}>
            <div style={{ textAlign: "center", background: "#f1f5f9", padding: "4rem 2rem", borderRadius: "12px", marginBottom: "3rem" }}>
              <h3 style={{ fontSize: "2.5rem", marginBottom: "1rem", color: "#1f2937" }}>
                Marketplace Showcase: Discover Top Software
              </h3>
              <p style={{ fontSize: "1.1rem", color: "#6b7280", marginBottom: "2rem" }}>
                The marketplace is growing! Check back soon for new software listings or visit our full marketplace.
              </p>
              
              <div style={{ 
                display: "flex", 
                flexDirection: "column", 
                alignItems: "center", 
                gap: "2rem",
                padding: "3rem 2rem"
              }}>
                <div style={{ fontSize: "4rem", color: "#6b7280" }}>🛒</div>
                <h4 style={{ fontSize: "1.5rem", color: "#6b7280" }}>Marketplace Preview Unavailable</h4>
                <p style={{ color: "#6b7280", textAlign: "center", maxWidth: "500px" }}>
                  Our software listings are currently being updated.
                </p>
                
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
                  Explore Full Marketplace →
                </button>
              </div>
            </div>
          </div>
        );

      case "pricing":
        return (
          <div style={{ padding: "2rem 0" }}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <h3 style={{ fontSize: "2.5rem", marginBottom: "1rem", color: "#1f2937" }}>
                Simple Plans for SaaS Vendors
              </h3>
              <p style={{ fontSize: "1.1rem", color: "#6b7280" }}>
                Customers register and subscribe to vendor-offered plans for free. Choose the right SaaSible vendor plan to start selling your software.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem", marginBottom: "3rem" }}>
              {/* Basic Vendor */}
              <div style={{ 
                padding: "2rem", 
                border: "2px solid #e5e7eb", 
                borderRadius: "12px", 
                background: "white",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
              }}>
                <h4 style={{ fontSize: "1.5rem", marginBottom: "0.5rem", color: "#1f2937" }}>Basic Vendor</h4>
                <p style={{ color: "#6b7280", marginBottom: "1rem" }}>Perfect for getting started and listing your first software.</p>
                <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#059669", marginBottom: "1rem" }}>
                  $19<span style={{ fontSize: "1rem", color: "#6b7280" }}>/month</span>
                </div>
                <ul style={{ listStyle: "none", padding: 0, marginBottom: "2rem" }}>
                  <li style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                    <span style={{ color: "#059669" }}>✓</span> Upload 1 software
                  </li>
                  <li style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                    <span style={{ color: "#059669" }}>✓</span> Basic dashboard access
                  </li>
                  <li style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                    <span style={{ color: "#059669" }}>✓</span> Community support
                  </li>
                </ul>
                <button style={{
                  background: "#059669",
                  color: "white",
                  padding: "12px 24px",
                  border: "none",
                  borderRadius: "8px",
                  width: "100%",
                  fontSize: "1rem",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}>
                  Choose Basic Plan
                </button>
              </div>

              {/* Pro Vendor */}
              <div style={{ 
                padding: "2rem", 
                border: "2px solid #3b82f6", 
                borderRadius: "12px", 
                background: "white",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                position: "relative"
              }}>
                <div style={{
                  position: "absolute",
                  top: "-10px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "#3b82f6",
                  color: "white",
                  padding: "4px 12px",
                  borderRadius: "12px",
                  fontSize: "0.8rem",
                  fontWeight: "bold"
                }}>
                  POPULAR
                </div>
                <h4 style={{ fontSize: "1.5rem", marginBottom: "0.5rem", color: "#1f2937" }}>Pro Vendor</h4>
                <p style={{ color: "#6b7280", marginBottom: "1rem" }}>For growing vendors needing more capacity and features.</p>
                <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#3b82f6", marginBottom: "1rem" }}>
                  $49<span style={{ fontSize: "1rem", color: "#6b7280" }}>/month</span>
                </div>
                <ul style={{ listStyle: "none", padding: 0, marginBottom: "2rem" }}>
                  <li style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                    <span style={{ color: "#059669" }}>✓</span> Upload up to 5 software
                  </li>
                  <li style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                    <span style={{ color: "#059669" }}>✓</span> Full dashboard & analytics
                  </li>
                  <li style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                    <span style={{ color: "#059669" }}>✓</span> Email & chat support
                  </li>
                  <li style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                    <span style={{ color: "#059669" }}>✓</span> Subscriber tracking
                  </li>
                </ul>
                <button style={{
                  background: "#3b82f6",
                  color: "white",
                  padding: "12px 24px",
                  border: "none",
                  borderRadius: "8px",
                  width: "100%",
                  fontSize: "1rem",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}>
                  Choose Pro Plan
                </button>
              </div>

              {/* Enterprise Vendor */}
              <div style={{ 
                padding: "2rem", 
                border: "2px solid #e5e7eb", 
                borderRadius: "12px", 
                background: "white",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
              }}>
                <h4 style={{ fontSize: "1.5rem", marginBottom: "0.5rem", color: "#1f2937" }}>Enterprise Vendor</h4>
                <p style={{ color: "#6b7280", marginBottom: "1rem" }}>Tailored solutions for large-scale software providers.</p>
                <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#3b82f6", marginBottom: "1rem" }}>
                  Custom
                </div>
                <ul style={{ listStyle: "none", padding: 0, marginBottom: "2rem" }}>
                  <li style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                    <span style={{ color: "#059669" }}>✓</span> Unlimited software uploads
                  </li>
                  <li style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                    <span style={{ color: "#059669" }}>✓</span> Priority support
                  </li>
                  <li style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                    <span style={{ color: "#059669" }}>✓</span> White-labeled features
                  </li>
                  <li style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                    <span style={{ color: "#059669" }}>✓</span> Custom integrations
                  </li>
                </ul>
                <button style={{
                  background: "#059669",
                  color: "white",
                  padding: "12px 24px",
                  border: "none",
                  borderRadius: "8px",
                  width: "100%",
                  fontSize: "1rem",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}>
                  Contact Sales
                </button>
              </div>
            </div>

            <div style={{ textAlign: "center", padding: "2rem", background: "#f8fafc", borderRadius: "8px" }}>
              <p style={{ color: "#6b7280", marginBottom: "1rem" }}>
                Looking for customer subscriptions? 
                <button 
                  onClick={() => setActiveSection("marketplace")}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#3b82f6",
                    cursor: "pointer",
                    textDecoration: "underline",
                    marginLeft: "0.5rem"
                  }}
                >
                  Explore the Software Marketplace.
                </button>
              </p>
            </div>
          </div>
        );

      case "testimonials":
        return (
          <div style={{ padding: "2rem 0" }}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <h3 style={{ fontSize: "2.5rem", marginBottom: "1rem", color: "#1f2937" }}>
                Loved by Vendors & Customers
              </h3>
              <p style={{ fontSize: "1.1rem", color: "#6b7280" }}>
                Hear what our users are saying about their SaaSible experience.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
              <div style={{ 
                padding: "2rem", 
                background: "white", 
                borderRadius: "12px", 
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)" 
              }}>
                <div style={{ display: "flex", marginBottom: "1rem" }}>
                  {[...Array(5)].map((_, i) => (
                    <span key={i} style={{ color: "#fbbf24", fontSize: "1.2rem" }}>★</span>
                  ))}
                </div>
                <p style={{ fontStyle: "italic", color: "#6b7280", marginBottom: "1.5rem", lineHeight: "1.6" }}>
                  "SaaSible made it incredibly easy to get my software in front of a wider audience. The platform is intuitive and the support is top-notch!"
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{ 
                    width: "50px", 
                    height: "50px", 
                    borderRadius: "50%", 
                    background: "#e5e7eb",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.5rem"
                  }}>
                    JD
                  </div>
                  <div>
                    <div style={{ fontWeight: "bold", color: "#1f2937" }}>Jane Doe</div>
                    <div style={{ color: "#6b7280", fontSize: "0.9rem" }}>Vendor, CEO of InnovativeApp</div>
                  </div>
                </div>
              </div>

              <div style={{ 
                padding: "2rem", 
                background: "white", 
                borderRadius: "12px", 
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)" 
              }}>
                <div style={{ display: "flex", marginBottom: "1rem" }}>
                  {[...Array(5)].map((_, i) => (
                    <span key={i} style={{ color: "#fbbf24", fontSize: "1.2rem" }}>★</span>
                  ))}
                </div>
                <p style={{ fontStyle: "italic", color: "#6b7280", marginBottom: "1.5rem", lineHeight: "1.6" }}>
                  "Finding and subscribing to the tools I need for my business has never been simpler. SaaSible's marketplace is a game-changer."
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{ 
                    width: "50px", 
                    height: "50px", 
                    borderRadius: "50%", 
                    background: "#e5e7eb",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.5rem"
                  }}>
                    JS
                  </div>
                  <div>
                    <div style={{ fontWeight: "bold", color: "#1f2937" }}>John Smith</div>
                    <div style={{ color: "#6b7280", fontSize: "0.9rem" }}>Customer, Founder of QuickStart Ltd.</div>
                  </div>
                </div>
              </div>

              <div style={{ 
                padding: "2rem", 
                background: "white", 
                borderRadius: "12px", 
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)" 
              }}>
                <div style={{ display: "flex", marginBottom: "1rem" }}>
                  {[...Array(4)].map((_, i) => (
                    <span key={i} style={{ color: "#fbbf24", fontSize: "1.2rem" }}>★</span>
                  ))}
                  <span style={{ color: "#d1d5db", fontSize: "1.2rem" }}>★</span>
                </div>
                <p style={{ fontStyle: "italic", color: "#6b7280", marginBottom: "1.5rem", lineHeight: "1.6" }}>
                  "The vendor dashboard provides all the analytics I need to understand my customer base and grow my SaaS business. Highly recommended!"
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{ 
                    width: "50px", 
                    height: "50px", 
                    borderRadius: "50%", 
                    background: "#e5e7eb",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.5rem"
                  }}>
                    AG
                  </div>
                  <div>
                    <div style={{ fontWeight: "bold", color: "#1f2937" }}>Alex Green</div>
                    <div style={{ color: "#6b7280", fontSize: "0.9rem" }}>Vendor, Solo Developer of TaskMaster Pro</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "faqs":
        return (
          <div style={{ padding: "2rem 0" }}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <h3 style={{ fontSize: "2.5rem", marginBottom: "1rem", color: "#1f2937" }}>
                Frequently Asked Questions
              </h3>
              <p style={{ fontSize: "1.1rem", color: "#6b7280" }}>
                Find quick answers to common questions about SaaSible.
              </p>
            </div>

            <div style={{ maxWidth: "800px", margin: "0 auto" }}>
              {[
                {
                  question: "Can anyone sell software on SaaSible?",
                  answer: "Yes! Any software creator can join SaaSible as a vendor. Simply choose a vendor plan, upload your software, and start selling to customers worldwide."
                },
                {
                  question: "Do I need to pay to explore or subscribe to software as a customer?",
                  answer: "No, registration and browsing are completely free for customers. You only pay when you subscribe to specific software through vendor-offered plans."
                },
                {
                  question: "What types of apps can I list or subscribe to?",
                  answer: "SaaSible supports a wide variety of software applications including business tools, productivity apps, creative software, and specialized industry solutions."
                },
                {
                  question: "How does billing work for vendors and customers?",
                  answer: "Vendors pay SaaSible platform fees based on their chosen plan. Customers pay vendors directly for software subscriptions through our secure payment system."
                },
                {
                  question: "Is there support available if I have issues?",
                  answer: "Yes! We offer multiple support channels including community forums, email support, and priority support for Pro and Enterprise vendors."
                }
              ].map((faq, index) => (
                <div key={index} style={{ 
                  marginBottom: "1.5rem", 
                  padding: "2rem", 
                  background: "white", 
                  borderRadius: "8px", 
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                }}>
                  <h4 style={{ fontSize: "1.2rem", marginBottom: "1rem", color: "#1f2937" }}>
                    {faq.question}
                  </h4>
                  <p style={{ color: "#6b7280", lineHeight: "1.6" }}>
                    {faq.answer}
                  </p>
                </div>
              ))}
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
              📦 SaaSibly
            </div>
          </div>
          
          <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
            <button 
              onClick={() => setActiveSection("home")}
              style={{ 
                background: "none", 
                border: "none", 
                cursor: "pointer", 
                color: activeSection === "home" ? "#3b82f6" : "#6b7280",
                fontWeight: activeSection === "home" ? "bold" : "normal"
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
                color: activeSection === "marketplace" ? "#3b82f6" : "#6b7280",
                fontWeight: activeSection === "marketplace" ? "bold" : "normal"
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
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
        {renderContent()}
      </div>

      {/* Call to Action Section */}
      <div style={{ 
        background: "linear-gradient(135deg, #1e40af 0%, #7c3aed 100%)", 
        color: "white", 
        padding: "4rem 2rem", 
        textAlign: "center",
        marginTop: "4rem"
      }}>
        <h3 style={{ fontSize: "2.5rem", marginBottom: "1rem", fontWeight: "bold" }}>
          Join the SaaS Revolution
        </h3>
        <p style={{ fontSize: "1.2rem", marginBottom: "2rem", opacity: 0.9 }}>
          Whether you're a vendor looking to sell or a customer seeking solutions, SaaSibly is your gateway to the future of software.
        </p>
        <button style={{
          background: "white",
          color: "#1e40af",
          padding: "12px 24px",
          border: "none",
          borderRadius: "8px",
          fontSize: "1.1rem",
          cursor: "pointer",
          fontWeight: "bold"
        }}>
          Get Started Now →
        </button>
      </div>

      {/* Footer Section */}
      <footer style={{ background: "#f9fafb", padding: "3rem 2rem", borderTop: "1px solid #e5e7eb" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
              <div style={{ background: "#3b82f6", color: "white", padding: "6px 12px", borderRadius: "6px", fontWeight: "bold" }}>
                📦 SaaSibly
              </div>
            </div>
            <p style={{ color: "#6b7280", lineHeight: "1.6" }}>
              The all-in-one platform for hosting, selling, and subscribing to SaaS applications.
            </p>
          </div>
          
          <div>
            <h4 style={{ marginBottom: "1rem", color: "#1f2937" }}>Quick Links</h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={{ marginBottom: "0.5rem" }}>
                <button 
                  onClick={() => setActiveSection("home")}
                  style={{ background: "none", border: "none", color: "#6b7280", cursor: "pointer" }}
                >
                  About Us
                </button>
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                <button style={{ background: "none", border: "none", color: "#6b7280", cursor: "pointer" }}>
                  Terms of Service
                </button>
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                <button style={{ background: "none", border: "none", color: "#6b7280", cursor: "pointer" }}>
                  Privacy Policy
                </button>
              </li>
              <li>
                <button style={{ background: "none", border: "none", color: "#6b7280", cursor: "pointer" }}>
                  Contact Us
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 style={{ marginBottom: "1rem", color: "#1f2937" }}>Connect With Us</h4>
            <div style={{ display: "flex", gap: "1rem" }}>
              <button style={{ background: "none", border: "none", color: "#6b7280", cursor: "pointer", fontSize: "1.5rem" }}>
                📘
              </button>
              <button style={{ background: "none", border: "none", color: "#6b7280", cursor: "pointer", fontSize: "1.5rem" }}>
                🐦
              </button>
              <button style={{ background: "none", border: "none", color: "#6b7280", cursor: "pointer", fontSize: "1.5rem" }}>
                💼
              </button>
              <button style={{ background: "none", border: "none", color: "#6b7280", cursor: "pointer", fontSize: "1.5rem" }}>
                📷
              </button>
            </div>
            <p style={{ color: "#6b7280", marginTop: "1rem", fontSize: "0.9rem" }}>
              Firebase Hosting ready.
            </p>
          </div>
        </div>
        
        <div style={{ textAlign: "center", marginTop: "2rem", paddingTop: "2rem", borderTop: "1px solid #e5e7eb" }}>
          <p style={{ color: "#6b7280", fontSize: "0.9rem" }}>
            © 2025 SaaSibly. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SaaS;
