
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ padding: "1rem", background: "#222", color: "#fff" }}>
      <ul style={{ display: "flex", gap: "1rem", listStyle: "none", alignItems: "center" }}>
        <li><Link to="/" style={{ color: "#fff" }}>AMBSTATVA</Link></li>
        <li><Link to="/about" style={{ color: "#fff" }}>About</Link></li>
        <li><Link to="/portfolio" style={{ color: "#fff" }}>Portfolio</Link></li>
        <li><Link to="/blog" style={{ color: "#fff" }}>Blog</Link></li>
        <li style={{ position: "relative" }}>
          <span style={{ color: "#fff", cursor: "pointer" }}>Services ▼</span>
          <ul style={{
            position: "absolute",
            top: "1.5rem",
            left: 0,
            background: "#333",
            padding: "0.5rem",
            listStyle: "none",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem"
          }}>
            <li><Link to="/services/saas" style={{ color: "#fff" }}>SaaS Marketplace</Link></li>
            <li><Link to="/services/tuition" style={{ color: "#fff" }}>Tuition System</Link></li>
            <li><Link to="/services/courses" style={{ color: "#fff" }}>Courses Platform</Link></li>
            <li><Link to="/services/ecommerce" style={{ color: "#fff" }}>Handmade Shop</Link></li>
            <li><Link to="/services/astrology" style={{ color: "#fff" }}>Astrology & Tarot</Link></li>
            <li><Link to="/services/wellness" style={{ color: "#fff" }}>Life & Wellness Coaching</Link></li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
