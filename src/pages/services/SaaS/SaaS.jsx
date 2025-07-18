import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SaaS = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 960);

  // --- Data Arrays ---
  // [+] FIX: Replaced shorthand 'background' with specific 'backgroundImage' property
  const bannerSlides = [
    {
      title: "Host, Sell & Subscribe to SaaS",
      subtitle: "in One Platform",
      description:
        "SaaSibly lets you launch your software or subscribe to powerful tools - all in one place.",
      backgroundImage:
        "linear-gradient(rgba(102, 126, 234, 0.8), rgba(118, 75, 162, 0.8)), url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
    },
    {
      title: "Unlimited Possibilities",
      subtitle: "One Marketplace",
      description:
        "Explore a diverse range of applications, from productivity tools to enterprise-level software.",
      backgroundImage:
        "linear-gradient(rgba(240, 147, 251, 0.8), rgba(245, 87, 108, 0.8)), url('https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
    },
    {
      title: "Join the SaaS Revolution",
      subtitle: "Start Today",
      description:
        "Whether you're a vendor or customer, SaaSibly is your gateway to the future of software.",
      backgroundImage:
        "linear-gradient(rgba(79, 172, 254, 0.8), rgba(0, 242, 254, 0.8)), url('https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
    },
  ];
  const menuItems = [
    { id: "home", label: "Home" },
    { id: "features", label: "Features" },
    { id: "marketplace", label: "Marketplace" },
    { id: "pricing", label: "Pricing" },
    { id: "faqs", label: "FAQs" },
  ];
  const marketplaceSoftware = [
    {
      id: "sw1",
      name: "CMS Pro",
      author: "AmbaApps",
      icon: "📝",
      price: 20.0,
      rating: 4.8,
      description:
        "Advanced content management system with drag-and-drop editor and powerful SEO tools.",
      tags: ["Featured", "Content"],
    },
    {
      id: "sw2",
      name: "TaskMaster Pro",
      author: "TechCorp",
      icon: "✅",
      price: 29.99,
      rating: 4.6,
      description:
        "AI-powered task management with team collaboration and comprehensive analytics.",
      tags: ["Productivity", "AI"],
    },
    {
      id: "sw3",
      name: "Analytics Pro",
      author: "DataCorp",
      icon: "📊",
      price: 45.0,
      rating: 4.9,
      description:
        "Business intelligence platform with real-time dashboards and predictive analytics.",
      tags: ["Analytics", "Real-time"],
    },
  ];
  const userCurrency = { code: "USD", symbol: "$", rate: 1 };

  // --- Effects ---
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 960);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(
      () => setCurrentSlide((prev) => (prev + 1) % bannerSlides.length),
      5000,
    );
    return () => clearInterval(interval);
  }, [bannerSlides.length]);

  // --- Handlers & Helpers ---
  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId);
    setIsMenuOpen(false);
  };
  const formatCurrency = (usdPrice) =>
    `${userCurrency.symbol}${usdPrice.toFixed(2)}`;

  // --- Reusable UI Components ---
  const HamburgerIcon = () => (
    <button
      onClick={() => setIsMenuOpen(true)}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        fontSize: "1.75rem",
        zIndex: 1002,
      }}
    >
      ☰
    </button>
  );

  const MobileMenu = () => (
    <>
      <div
        onClick={() => setIsMenuOpen(false)}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1000,
          opacity: isMenuOpen ? 1 : 0,
          transition: "opacity 0.3s ease",
          pointerEvents: isMenuOpen ? "auto" : "none",
        }}
      />
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "280px",
          height: "100%",
          backgroundColor: "#1e293b",
          zIndex: 1001,
          transform: isMenuOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s ease",
          padding: "1.5rem",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2rem",
          }}
        >
          <div
            style={{
              background: "#3b82f6",
              color: "white",
              padding: "6px 12px",
              borderRadius: "6px",
              fontWeight: "bold",
            }}
          >
            📦 SaaSibly
          </div>
          <button
            onClick={() => setIsMenuOpen(false)}
            style={{
              background: "none",
              border: "none",
              color: "white",
              fontSize: "1.75rem",
              cursor: "pointer",
            }}
          >
            ×
          </button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: activeSection === item.id ? "#3b82f6" : "#cbd5e1",
                fontWeight: activeSection === item.id ? "bold" : "normal",
                fontSize: "1.1rem",
                textAlign: "left",
                padding: "0.5rem 0",
              }}
            >
              {item.label}
            </button>
          ))}
          <div style={{ borderTop: "1px solid #334155", margin: "1rem 0" }} />
          <Link
            to="/services/saas/login"
            onClick={() => setIsMenuOpen(false)}
            style={{
              color: "#cbd5e1",
              textDecoration: "none",
              padding: "0.5rem 0",
              fontSize: "1.1rem",
            }}
          >
            Login
          </Link>
          <Link
            to="/services/saas/signup"
            onClick={() => setIsMenuOpen(false)}
            style={{
              background: "#3b82f6",
              color: "white",
              padding: "10px 16px",
              borderRadius: "8px",
              textDecoration: "none",
              textAlign: "center",
              marginTop: "1rem",
            }}
          >
            Get Started
          </Link>
        </div>
      </div>
    </>
  );

  const SoftwareCard = ({ software }) => (
    <div
      style={{
        background: "white",
        borderRadius: "12px",
        border: "1px solid #e5e7eb",
        boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "transform 0.2s, box-shadow 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.05)";
      }}
    >
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "1rem",
          }}
        >
          <div
            style={{
              fontSize: "2.5rem",
              background: "#f8f9fa",
              width: "60px",
              height: "60px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "12px",
            }}
          >
            {software.icon}
          </div>
          <div>
            <h3
              style={{
                margin: 0,
                fontSize: "1.1rem",
                fontWeight: 600,
                color: "#212529",
              }}
            >
              {software.name}
            </h3>
            <p
              style={{
                margin: "0.25rem 0 0 0",
                fontSize: "0.8rem",
                color: "#6c757d",
              }}
            >
              by {software.author}
            </p>
          </div>
        </div>
        <p
          style={{
            fontSize: "0.875rem",
            color: "#495057",
            lineHeight: 1.6,
            minHeight: "65px",
          }}
        >
          {software.description}
        </p>
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            marginBottom: "1rem",
            flexWrap: "wrap",
          }}
        >
          {software.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: "0.7rem",
                fontWeight: 600,
                color: "#6c757d",
                backgroundColor: "#e9ecef",
                padding: "0.25rem 0.5rem",
                borderRadius: "4px",
                textTransform: "uppercase",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <div>
            <span
              style={{ fontSize: "1.5rem", fontWeight: 700, color: "#212529" }}
            >
              {formatCurrency(software.price)}
            </span>
            <span style={{ color: "#6c757d" }}>/mo</span>
          </div>
          <span style={{ color: "#fbbf24", fontWeight: "bold" }}>
            ★ {software.rating}
          </span>
        </div>
        <button
          style={{
            backgroundColor: "#0d6efd",
            color: "white",
            border: "none",
            padding: "0.6rem 1.2rem",
            borderRadius: "8px",
            fontWeight: "500",
            cursor: "pointer",
            fontSize: "0.9rem",
            width: "100%",
          }}
        >
          View Details
        </button>
      </div>
    </div>
  );
  const Section = ({ title, subtitle, children }) => (
    <div style={{ padding: "2rem 0" }}>
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h3
          style={{
            fontSize: isMobile ? "2rem" : "2.5rem",
            marginBottom: "1rem",
            color: "#1f2937",
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontSize: "1.1rem",
            color: "#6b7280",
            maxWidth: "700px",
            margin: "0 auto",
          }}
        >
          {subtitle}
        </p>
      </div>
      {children}
    </div>
  );
  const FaqItem = ({ q, a }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div
        style={{
          marginBottom: "1rem",
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
          background: "white",
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        }}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            width: "100%",
            textAlign: "left",
            padding: "1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "1.1rem",
            fontWeight: 600,
          }}
        >
          <h4 style={{ margin: 0, fontSize: "1rem", paddingRight: "1rem" }}>
            {q}
          </h4>
          <span
            style={{
              transition: "transform 0.2s",
              transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
              fontSize: "1.5rem",
              color: "#3b82f6",
            }}
          >
            +
          </span>
        </button>
        {isOpen && (
          <div
            style={{
              padding: "0 1.5rem 1.5rem 1.5rem",
              color: "#6b7280",
              lineHeight: "1.6",
            }}
          >
            {a}
          </div>
        )}
      </div>
    );
  };
  const FeatureCard = ({ icon, title, text, color }) => (
    <div
      style={{
        padding: "1.5rem",
        background: "white",
        borderRadius: "12px",
        boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
        border: "1px solid #e5e7eb",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "1rem",
          marginBottom: "0.8rem",
        }}
      >
        <div
          style={{
            fontSize: "2rem",
            background: `${color}20`,
            padding: "0.5rem",
            borderRadius: "8px",
            color,
          }}
        >
          {icon}
        </div>
        <div>
          <h5
            style={{
              fontSize: "1.1rem",
              color: "#1f2937",
              fontWeight: "600",
              margin: "0 0 0.5rem 0",
            }}
          >
            {title}
          </h5>
          <p
            style={{
              color: "#6b7280",
              lineHeight: "1.5",
              fontSize: "0.95rem",
              margin: 0,
            }}
          >
            {text}
          </p>
        </div>
      </div>
    </div>
  );
  const PricingCard = ({
    plan,
    description,
    price,
    features,
    popular,
    primaryColor,
  }) => (
    <div
      style={{
        padding: "2rem",
        border: `2px solid ${popular ? primaryColor : "#e5e7eb"}`,
        borderRadius: "12px",
        background: "white",
        boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
        position: "relative",
      }}
    >
      {popular && (
        <div
          style={{
            position: "absolute",
            top: "-15px",
            left: "50%",
            transform: "translateX(-50%)",
            background: primaryColor,
            color: "white",
            padding: "4px 12px",
            borderRadius: "12px",
            fontSize: "0.8rem",
            fontWeight: "bold",
          }}
        >
          POPULAR
        </div>
      )}
      <h4
        style={{ fontSize: "1.5rem", marginBottom: "0.5rem", color: "#1f2937" }}
      >
        {plan}
      </h4>
      <p style={{ color: "#6b7280", marginBottom: "1.5rem" }}>{description}</p>
      <div
        style={{
          fontSize: "2.5rem",
          fontWeight: "bold",
          color: primaryColor,
          marginBottom: "1.5rem",
        }}
      >
        {price}
        <span style={{ fontSize: "1rem", color: "#6b7280" }}>/month</span>
      </div>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          marginBottom: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
        }}
      >
        {features.map((feat, i) => (
          <li
            key={i}
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <span style={{ color: "#059669" }}>✓</span> {feat}
          </li>
        ))}
      </ul>
      <button
        style={{
          background: primaryColor,
          color: "white",
          padding: "12px 24px",
          border: "none",
          borderRadius: "8px",
          width: "100%",
          fontSize: "1rem",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Choose Plan
      </button>
    </div>
  );

  // --- Main Render Functions for Each Section ---
  const renderContent = () => {
    switch (activeSection) {
      case "home":
        return (
          <div>
            <div
              style={{
                // [+] FIX: Inline style object for the banner
                height: "auto",
                padding: isMobile ? "4rem 1.5rem" : "6rem 2rem",
                position: "relative",
                borderRadius: "12px",
                marginBottom: "4rem",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                color: "white",
                backgroundImage: bannerSlides[currentSlide].backgroundImage,
                backgroundSize: "cover",
                backgroundPosition: "center",
                transition: "background-image 1s ease-in-out",
              }}
            >
              <div>
                <h1
                  style={{
                    fontSize: isMobile ? "2.25rem" : "3.5rem",
                    marginBottom: "1rem",
                    fontWeight: "bold",
                  }}
                >
                  {bannerSlides[currentSlide].title}
                </h1>
                <p
                  style={{
                    fontSize: isMobile ? "1rem" : "1.2rem",
                    marginBottom: "2rem",
                    opacity: 0.9,
                    maxWidth: "600px",
                    margin: "0 auto 2rem auto",
                  }}
                >
                  {bannerSlides[currentSlide].description}
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                    justifyContent: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <Link
                    to="/services/saas/signup"
                    style={{
                      background: "#3b82f6",
                      color: "white",
                      padding: "12px 24px",
                      borderRadius: "8px",
                      textDecoration: "none",
                      fontSize: "1rem",
                      fontWeight: "500",
                    }}
                  >
                    Get Started
                  </Link>
                  <button
                    style={{
                      background: "rgba(255,255,255,0.2)",
                      color: "white",
                      padding: "12px 24px",
                      border: "1px solid white",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontSize: "1rem",
                      fontWeight: "500",
                    }}
                  >
                    🤖 Get AI Software Idea
                  </button>
                </div>
              </div>
            </div>
            <Section
              title="How SaaSibly Works"
              subtitle="A simple, streamlined process for software vendors and customers."
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(auto-fit, minmax(${isMobile ? "100%" : "250px"}, 1fr))`,
                  gap: "2rem",
                }}
              >
                <div style={{ textAlign: "center", padding: "1rem" }}>
                  <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>
                    🏠
                  </div>
                  <h4
                    style={{
                      fontSize: "1.5rem",
                      marginBottom: "1rem",
                      color: "#1f2937",
                    }}
                  >
                    Vendors: Launch Your Software
                  </h4>
                  <p style={{ color: "#6b7280", lineHeight: "1.6" }}>
                    Easily choose a SaaSible vendor plan, upload your software,
                    and create custom subscription tiers for your customers.
                  </p>
                </div>
                <div style={{ textAlign: "center", padding: "1rem" }}>
                  <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>
                    🛒
                  </div>
                  <h4
                    style={{
                      fontSize: "1.5rem",
                      marginBottom: "1rem",
                      color: "#1f2937",
                    }}
                  >
                    Customers: Discover & Subscribe
                  </h4>
                  <p style={{ color: "#6b7280", lineHeight: "1.6" }}>
                    Register for free to explore a marketplace of innovative
                    SaaS solutions and subscribe to the tools you need.
                  </p>
                </div>
                <div style={{ textAlign: "center", padding: "1rem" }}>
                  <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>
                    👥
                  </div>
                  <h4
                    style={{
                      fontSize: "1.5rem",
                      marginBottom: "1rem",
                      color: "#1f2937",
                    }}
                  >
                    Seamless Ecosystem
                  </h4>
                  <p style={{ color: "#6b7280", lineHeight: "1.6" }}>
                    SaaSibly connects software creators with users, providing a
                    robust platform for distribution and growth.
                  </p>
                </div>
              </div>
            </Section>
            <Section
              title="See SaaSibly in Action"
              subtitle="Watch this short video to get a quick overview of our platform and its capabilities."
            >
              <div
                style={{
                  maxWidth: "800px",
                  margin: "0 auto",
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                  aspectRatio: "16 / 9",
                }}
              >
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="SaaSibly Platform Overview"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ display: "block" }}
                />
              </div>
            </Section>
            <Section
              title="Loved by Vendors & Customers"
              subtitle="Hear what our users are saying about their SaaSible experience."
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(auto-fit, minmax(${isMobile ? "100%" : "300px"}, 1fr))`,
                  gap: "2rem",
                }}
              >
                <div
                  style={{
                    padding: "2rem",
                    background: "white",
                    borderRadius: "12px",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  }}
                >
                  <div style={{ display: "flex", marginBottom: "1rem" }}>
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        style={{ color: "#fbbf24", fontSize: "1.2rem" }}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <p
                    style={{
                      fontStyle: "italic",
                      color: "#6b7280",
                      marginBottom: "1.5rem",
                      lineHeight: "1.6",
                    }}
                  >
                    "SaaSible made it incredibly easy to get my software in
                    front of a wider audience. The platform is intuitive and the
                    support is top-notch!"
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <div
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        background: "#e5e7eb",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.5rem",
                      }}
                    >
                      JD
                    </div>
                    <div>
                      <div style={{ fontWeight: "bold", color: "#1f2937" }}>
                        Jane Doe
                      </div>
                      <div style={{ color: "#6b7280", fontSize: "0.9rem" }}>
                        Vendor, CEO of InnovativeApp
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    padding: "2rem",
                    background: "white",
                    borderRadius: "12px",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  }}
                >
                  <div style={{ display: "flex", marginBottom: "1rem" }}>
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        style={{ color: "#fbbf24", fontSize: "1.2rem" }}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <p
                    style={{
                      fontStyle: "italic",
                      color: "#6b7280",
                      marginBottom: "1.5rem",
                      lineHeight: "1.6",
                    }}
                  >
                    "Finding and subscribing to the tools I need for my business
                    has never been simpler. SaaSible's marketplace is a
                    game-changer."
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <div
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        background: "#e5e7eb",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.5rem",
                      }}
                    >
                      JS
                    </div>
                    <div>
                      <div style={{ fontWeight: "bold", color: "#1f2937" }}>
                        John Smith
                      </div>
                      <div style={{ color: "#6b7280", fontSize: "0.9rem" }}>
                        Customer, Founder of QuickStart Ltd.
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    padding: "2rem",
                    background: "white",
                    borderRadius: "12px",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  }}
                >
                  <div style={{ display: "flex", marginBottom: "1rem" }}>
                    {[...Array(4)].map((_, i) => (
                      <span
                        key={i}
                        style={{ color: "#fbbf24", fontSize: "1.2rem" }}
                      >
                        ★
                      </span>
                    ))}
                    <span style={{ color: "#d1d5db", fontSize: "1.2rem" }}>
                      ★
                    </span>
                  </div>
                  <p
                    style={{
                      fontStyle: "italic",
                      color: "#6b7280",
                      marginBottom: "1.5rem",
                      lineHeight: "1.6",
                    }}
                  >
                    "The vendor dashboard provides all the analytics I need to
                    understand my customer base and grow my SaaS business.
                    Highly recommended!"
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <div
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        background: "#e5e7eb",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.5rem",
                      }}
                    >
                      AG
                    </div>
                    <div>
                      <div style={{ fontWeight: "bold", color: "#1f2937" }}>
                        Alex Green
                      </div>
                      <div style={{ color: "#6b7280", fontSize: "0.9rem" }}>
                        Vendor, Solo Developer
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Section>
          </div>
        );
      case "features":
        return (
          <Section
            title="Powerful Features for Everyone"
            subtitle="SaaSibly is packed with tools to help vendors succeed and customers thrive."
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: "3rem",
              }}
            >
              <div>
                <h4
                  style={{
                    fontSize: "1.8rem",
                    marginBottom: "2rem",
                    color: "#1f2937",
                    borderBottom: "3px solid #3b82f6",
                    paddingBottom: "0.5rem",
                    display: "inline-block",
                  }}
                >
                  For Software Vendors
                </h4>
                <div style={{ display: "grid", gap: "1.2rem" }}>
                  <FeatureCard
                    icon="📤"
                    title="Easy Software Upload"
                    text="Quickly upload your software packages and define flexible subscription plans."
                    color="#3b82f6"
                  />
                  <FeatureCard
                    icon="🎛️"
                    title="Vendor Dashboard"
                    text="Monitor your subscribers, track earnings, and manage your software listings efficiently."
                    color="#3b82f6"
                  />
                  <FeatureCard
                    icon="📊"
                    title="Analytics & Insights"
                    text="Gain valuable insights into your software performance and customer engagement."
                    color="#3b82f6"
                  />
                </div>
              </div>
              <div>
                <h4
                  style={{
                    fontSize: "1.8rem",
                    marginBottom: "2rem",
                    color: "#059669",
                    borderBottom: "3px solid #059669",
                    paddingBottom: "0.5rem",
                    display: "inline-block",
                  }}
                >
                  For SaaS Customers
                </h4>
                <div style={{ display: "grid", gap: "1.2rem" }}>
                  <FeatureCard
                    icon="🌐"
                    title="Browse Diverse Software"
                    text="Discover a wide range of SaaS applications tailored to various needs and industries."
                    color="#059669"
                  />
                  <FeatureCard
                    icon="📋"
                    title="Flexible Subscriptions"
                    text="Choose from multiple subscription options offered by vendors to fit your budget."
                    color="#059669"
                  />
                  <FeatureCard
                    icon="⬇️"
                    title="Instant Access & Download"
                    text="Get immediate access to subscribed software or download project files effortlessly."
                    color="#059669"
                  />
                </div>
              </div>
            </div>
          </Section>
        );
      case "marketplace":
        return (
          <Section
            title="Marketplace Showcase"
            subtitle="Discover powerful tools and applications to boost your productivity."
          >
            <div
              style={{
                padding: "1rem",
                background: "white",
                borderRadius: "12px",
                border: "1px solid #e5e7eb",
                marginBottom: "2.5rem",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                flexDirection: isMobile ? "column" : "row",
              }}
            >
              <input
                type="text"
                placeholder="🔍 Search for software, categories, or features..."
                style={{
                  width: "100%",
                  border: "none",
                  fontSize: "1rem",
                  outline: "none",
                  padding: isMobile ? "0.5rem 0" : "0",
                }}
              />
              <button
                style={{
                  background: "#3b82f6",
                  color: "white",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  width: isMobile ? "100%" : "auto",
                }}
              >
                Search
              </button>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(auto-fit, minmax(${isMobile ? "100%" : "300px"}, 1fr))`,
                gap: "2rem",
              }}
            >
              {marketplaceSoftware.map((software) => (
                <SoftwareCard key={software.id} software={software} />
              ))}
            </div>
          </Section>
        );
      case "pricing":
        return (
          <Section
            title="Simple Plans for SaaS Vendors"
            subtitle="Customers register for free. Choose the right vendor plan to start selling your software."
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(auto-fit, minmax(${isMobile ? "100%" : "300px"}, 1fr))`,
                gap: "2rem",
              }}
            >
              <PricingCard
                plan="Basic Vendor"
                description="Perfect for getting started."
                price={formatCurrency(19)}
                features={[
                  "Upload 1 software",
                  "Basic dashboard access",
                  "Community support",
                ]}
                primaryColor="#059669"
              />
              <PricingCard
                plan="Pro Vendor"
                description="For growing vendors needing more features."
                price={formatCurrency(49)}
                features={[
                  "Upload up to 5 software",
                  "Full dashboard & analytics",
                  "Email & chat support",
                  "Subscriber tracking",
                ]}
                popular={true}
                primaryColor="#3b82f6"
              />
              <PricingCard
                plan="Enterprise"
                description="Tailored solutions for large-scale providers."
                price="Custom"
                features={[
                  "Unlimited software uploads",
                  "Priority support",
                  "White-labeled features",
                  "Custom integrations",
                ]}
                primaryColor="#1f2937"
              />
            </div>
          </Section>
        );
      case "faqs":
        return (
          <Section
            title="Frequently Asked Questions"
            subtitle="Find quick answers to common questions about SaaSibly."
          >
            <div style={{ maxWidth: "800px", margin: "0 auto" }}>
              <FaqItem
                q="Can anyone sell software on SaaSible?"
                a="Yes! Any software creator can join SaaSibly as a vendor. Simply choose a vendor plan, upload your software, and start selling."
              />
              <FaqItem
                q="Do I need to pay to explore or subscribe to software as a customer?"
                a="No, registration and browsing are completely free for customers. You only pay when you subscribe to specific software through vendor-offered plans."
              />
              <FaqItem
                q="What types of apps can I list or subscribe to?"
                a="SaaSible supports a wide variety of software applications including business tools, productivity apps, creative software, and specialized industry solutions."
              />
            </div>
          </Section>
        );
      default:
        return <h1>Page Not Found</h1>;
    }
  };

  return (
    <div
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        overflowX: "hidden",
      }}
    >
      <MobileMenu />
      <nav
        style={{
          background: "white",
          borderBottom: "1px solid #e5e7eb",
          padding: `1rem ${isMobile ? "1rem" : "2rem"}`,
          position: "sticky",
          top: 0,
          zIndex: 999,
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <Link
            to="/"
            onClick={() => handleNavClick("home")}
            style={{ textDecoration: "none" }}
          >
            <div
              style={{
                background: "#3b82f6",
                color: "white",
                padding: "6px 12px",
                borderRadius: "6px",
                fontWeight: "bold",
              }}
            >
              📦 SaaSibly
            </div>
          </Link>
          {isMobile ? (
            <HamburgerIcon />
          ) : (
            <>
              <div
                style={{ display: "flex", gap: "2rem", alignItems: "center" }}
              >
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: activeSection === item.id ? "#3b82f6" : "#6b7280",
                      fontWeight: activeSection === item.id ? "bold" : "normal",
                      textTransform: "capitalize",
                      fontSize: "1rem",
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <div
                style={{ display: "flex", gap: "1rem", alignItems: "center" }}
              >
                <Link
                  to="/services/saas/login"
                  style={{
                    color: "#6b7280",
                    textDecoration: "none",
                    fontSize: "1rem",
                    fontWeight: 500,
                  }}
                >
                  Login
                </Link>
                <Link
                  to="/services/saas/signup"
                  style={{
                    background: "#3b82f6",
                    color: "white",
                    padding: "8px 16px",
                    borderRadius: "8px",
                    textDecoration: "none",
                    fontWeight: 500,
                  }}
                >
                  Get Started
                </Link>
              </div>
            </>
          )}
        </div>
      </nav>

      <main
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: isMobile ? "1.5rem" : "2rem",
        }}
      >
        {renderContent()}
      </main>

      <div
        style={{
          background: "linear-gradient(135deg, #1e40af 0%, #7c3aed 100%)",
          color: "white",
          padding: "4rem 2rem",
          textAlign: "center",
          marginTop: "4rem",
        }}
      >
        <h3
          style={{
            fontSize: isMobile ? "2rem" : "2.5rem",
            marginBottom: "1rem",
            fontWeight: "bold",
          }}
        >
          Join the SaaS Revolution
        </h3>
        <p
          style={{
            fontSize: "1.2rem",
            marginBottom: "2rem",
            opacity: 0.9,
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          Whether you're a vendor looking to sell or a customer seeking
          solutions, SaaSibly is your gateway to the future of software.
        </p>
        <Link
          to="/services/saas/signup"
          style={{
            background: "white",
            color: "#1e40af",
            padding: "12px 24px",
            borderRadius: "8px",
            textDecoration: "none",
            fontSize: "1.1rem",
            fontWeight: "bold",
          }}
        >
          Get Started Now →
        </Link>
      </div>

      <footer
        style={{
          background: "#f9fafb",
          padding: "3rem 2rem",
          borderTop: "1px solid #e5e7eb",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: `repeat(auto-fit, minmax(${isMobile ? "100%" : "200px"}, 1fr))`,
            gap: "2rem",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "1rem",
              }}
            >
              <div
                style={{
                  background: "#3b82f6",
                  color: "white",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  fontWeight: "bold",
                }}
              >
                📦 SaaSibly
              </div>
            </div>
            <p style={{ color: "#6b7280", lineHeight: "1.6" }}>
              The all-in-one platform for hosting, selling, and subscribing to
              SaaS applications.
            </p>
          </div>
          <div>
            <h4 style={{ marginBottom: "1rem", color: "#1f2937" }}>
              Quick Links
            </h4>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <li>
                <button
                  onClick={() => handleNavClick("home")}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#6b7280",
                    cursor: "pointer",
                    padding: 0,
                    textAlign: "left",
                  }}
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  style={{
                    background: "none",
                    border: "none",
                    color: "#6b7280",
                    cursor: "pointer",
                    padding: 0,
                    textAlign: "left",
                  }}
                >
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h4 style={{ marginBottom: "1rem", color: "#1f2937" }}>
              Connect With Us
            </h4>
            <div style={{ display: "flex", gap: "1rem" }}>
              <button
                style={{
                  background: "none",
                  border: "none",
                  color: "#6b7280",
                  cursor: "pointer",
                  fontSize: "1.5rem",
                }}
              >
                📘
              </button>
              <button
                style={{
                  background: "none",
                  border: "none",
                  color: "#6b7280",
                  cursor: "pointer",
                  fontSize: "1.5rem",
                }}
              >
                🐦
              </button>
              <button
                style={{
                  background: "none",
                  border: "none",
                  color: "#6b7280",
                  cursor: "pointer",
                  fontSize: "1.5rem",
                }}
              >
                💼
              </button>
            </div>
            <p
              style={{
                color: "#6b7280",
                marginTop: "1rem",
                fontSize: "0.9rem",
              }}
            >
              Firebase Hosting ready.
            </p>
          </div>
        </div>
        <div
          style={{
            textAlign: "center",
            borderTop: "1px solid #e5e7eb",
            marginTop: "2rem",
            paddingTop: "2rem",
            color: "#6b7280",
            fontSize: "0.9rem",
          }}
        >
          © 2025 SaaSibly. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default SaaS;
