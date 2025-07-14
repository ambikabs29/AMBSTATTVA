import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [showServices, setShowServices] = useState(false);

  return (
    <nav style={{ padding: "1rem", background: "#eee" }}>
      <ul style={{ listStyle: "none", display: "flex", gap: "1rem" }}>
        <li>
          <Link to="/">AMBSTATVA</Link>
        </li>
        <li>
          <Link to="/about">About Me</Link>
        </li>
        <li>
          <Link to="/portfolio">Portfolio</Link>
        </li>
        <li>
          <Link to="/blog">Blog</Link>
        </li>

        {/* Services Dropdown */}
        <li
          style={{ position: "relative" }}
          onMouseEnter={() => setShowServices(true)}
          onMouseLeave={() => setShowServices(false)}
        >
          Services
          {showServices && (
            <ul
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                background: "#fff",
                border: "1px solid #ccc",
                listStyle: "none",
                padding: "0.5rem",
                zIndex: 1,
              }}
            >
              <li>
                <Link to="/services/saas">SaaS Marketplace</Link>
              </li>
              <li>
                <Link to="/services/tuition">Tuition</Link>
              </li>
              <li>
                <Link to="/services/courses">Courses</Link>
              </li>
              <li>
                <Link to="/services/ecommerce">Handmade Products</Link>
              </li>
              <li>
                <Link to="/services/astrology">Astrology & Tarot</Link>
              </li>
              <li>
                <Link to="/services/wellness">Wellness Coaching</Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
