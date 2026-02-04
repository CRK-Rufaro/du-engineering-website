import { Link } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Company Info */}
          <div className="footer-section">
            <h4 className="footer-title">DUE Engineering</h4>
            <p className="footer-tagline">Perfection is possible</p>
            <p className="footer-description">
              Professional solar and electrical installations across Klerksdorp and North West.
              Red Seal certified electricians and SAPVIA member.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/projects">Projects</Link></li>
              <li><Link to="/brands">Brands</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/#contact">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="footer-section">
            <h4 className="footer-title">Services</h4>
            <ul className="footer-links">
              <li><Link to="/#services">Residential Solar</Link></li>
              <li><Link to="/#services">Commercial Solar</Link></li>
              <li><Link to="/#services">Battery Backup</Link></li>
              <li><Link to="/#services">Electrical Services</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4 className="footer-title">Contact Us</h4>
            <div className="footer-contact">
              <p>
                <svg className="footer-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                info@duengineering.co.za
              </p>
              <p>
                <svg className="footer-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                14 Boshoff Street, LaHoff, Klerksdorp, North West, 2571
              </p>
            </div>
            <div className="footer-hours">
              <p><strong>Business Hours:</strong></p>
              <p>Mon-Fri: 8AM - 5PM</p>
              <p>Sat: 9AM - 1PM</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>&copy; {currentYear} DUE Engineering. All rights reserved.</p>
          <p className="footer-credit">
            Website by <a href="https://sparkstudios.co.za" target="_blank" rel="noopener noreferrer">Spark Studios</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
