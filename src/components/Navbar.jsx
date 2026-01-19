import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/projects', label: 'Projects' },
    { to: '/#services', label: 'Services' },
    { to: '/#contact', label: 'Contact' }
  ];

  const handleNavClick = (to) => {
    setIsMenuOpen(false);
    // Handle hash links for same-page navigation
    if (to.includes('#') && location.pathname === '/') {
      const element = document.getElementById(to.split('#')[1]);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-text">DU Engineering</span>
          <span className="logo-tagline">Perfection is possible</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="navbar-links desktop-nav">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`nav-link ${location.pathname === link.to ? 'active' : ''}`}
              onClick={() => handleNavClick(link.to)}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/#contact" className="btn btn-primary nav-cta">
            Get Quote
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        {/* Mobile Navigation */}
        <div className={`mobile-nav ${isMenuOpen ? 'open' : ''}`}>
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`mobile-nav-link ${location.pathname === link.to ? 'active' : ''}`}
              onClick={() => handleNavClick(link.to)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/#contact"
            className="btn btn-primary mobile-nav-cta"
            onClick={() => setIsMenuOpen(false)}
          >
            Get Free Quote
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
