import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Blog from './pages/Blog';

// Service Pages
import Astrology from './pages/services/Astrology/Astrology';
import Courses from './pages/services/Courses/Courses';
import Ecommerce from './pages/services/Ecommerce/Ecommerce';
import SaaS from './pages/services/SaaS/SaaS';
import Tuition from './pages/services/Tuition/Tuition';
import Wellness from './pages/services/Wellness/Wellness';

// SaaS specific pages
import Login from './pages/services/SaaS/Login';
import AdminDashboard from './pages/services/SaaS/AdminDashboard';
import SupportMenu from './pages/services/SaaS/SupportMenu';

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
        <Route path="/services/saas/login" element={<Login />} />
        <Route path="/services/saas/admin" element={<AdminDashboard />} />
        <Route path="/services/saas/support" element={<SupportMenu />} />
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