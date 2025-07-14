
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Portfolio from "./pages/Portfolio";
import Blog from "./pages/Blog";
import SaaS from "./pages/services/SaaS/SaaS";
import Tuition from "./pages/services/Tuition/Tuition";
import Courses from "./pages/services/Courses/Courses";
import Ecommerce from "./pages/services/Ecommerce/Ecommerce";
import Astrology from "./pages/services/Astrology/Astrology";
import Wellness from "./pages/services/Wellness/Wellness";
import AdminDashboard from "./pages/services/SaaS/AdminDashboard";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/services/saas" element={<SaaS />} />
        <Route path="/services/saas/admin" element={<AdminDashboard />} />
        <Route path="/services/tuition" element={<Tuition />} />
        <Route path="/services/courses" element={<Courses />} />
        <Route path="/services/ecommerce" element={<Ecommerce />} />
        <Route path="/services/astrology" element={<Astrology />} />
        <Route path="/services/wellness" element={<Wellness />} />
      </Routes>
    </Router>
  );
}

export default App;
