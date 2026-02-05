import { useState } from 'react';
import { Link } from 'react-router-dom';
import { projects, services, brands, certifications } from '../data/projects';
import SEO from '../components/SEO';
import { trackFormSubmission, trackPhoneClick, trackEmailClick } from '../utils/analytics';

// Google Apps Script Web App URL - UPDATE THIS AFTER SETUP
const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || '';

function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    honeypot: '' // Spam protection - hidden field
  });
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Spam check - if honeypot is filled, silently reject
    if (formData.honeypot) {
      setFormStatus({ type: 'success', message: 'Thank you! We will contact you within 24 hours.' });
      return;
    }

    // Check if Google Script URL is configured
    if (!GOOGLE_SCRIPT_URL) {
      // Fallback for development/testing
      console.log('Form submission (Google Sheets not configured):', formData);
      trackFormSubmission(formData.service); // Track conversion even in dev
      setFormStatus({ type: 'success', message: 'Thank you! We will contact you within 24 hours.' });
      setFormData({ name: '', email: '', phone: '', service: '', message: '', honeypot: '' });
      return;
    }

    setIsSubmitting(true);
    setFormStatus({ type: '', message: '' });

    // Prepare form data for Google Apps Script
    const submitData = new FormData();
    submitData.append('name', formData.name);
    submitData.append('email', formData.email);
    submitData.append('phone', formData.phone);
    submitData.append('service', formData.service);
    submitData.append('message', formData.message);

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: submitData,
        mode: 'no-cors' // Required for Google Apps Script
      });

      // Success (no-cors means we assume success if no error thrown)
      trackFormSubmission(formData.service); // Track conversion
      setFormStatus({
        type: 'success',
        message: 'Thank you! We will contact you within 24 hours.'
      });
      setFormData({ name: '', email: '', phone: '', service: '', message: '', honeypot: '' });

    } catch (error) {
      console.error('Form submission error:', error);
      setFormStatus({
        type: 'error',
        message: 'Something went wrong. Please try again or email us directly at info@duengineering.co.za'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Get 3 most recent projects for homepage
  const recentProjects = projects.slice(0, 3);

  return (
    <>
      <SEO
        title="Professional Solar & Electrical Solutions in Klerksdorp"
        description="DUE Engineering provides professional solar installations, battery backup systems, and electrical services in Klerksdorp, North West & Gauteng. Red Seal certified, SAPVIA accredited. 500+ installations. Get a free quote today."
        path="/"
      />
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background"></div>
        <div className="container hero-content">
          <h1 className="hero-title">Professional Solar & Electrical Solutions</h1>
          <p className="hero-subtitle">
            Save up to 70% on electricity with premium solar installations from Klerksdorp's trusted installers
          </p>
          <p className="hero-tagline">Perfection is possible</p>
          <div className="hero-cta">
            <a href="#contact" className="btn btn-secondary btn-large">Get Free Quote</a>
            <Link to="/projects" className="btn btn-outline-light btn-large">View Our Work</Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-section">
        <div className="container">
          <h2 className="section-title">Why Choose DUE Engineering?</h2>

          {/* Certifications Row - Logo-based design */}
          <div className="certifications-grid">
            <div className="certification-card-v2">
              <div className="cert-logo-wrapper">
                <img
                  src="/logos/certifications/pv-greencard.png"
                  alt="PV Green Card"
                  className="cert-logo"
                />
              </div>
              <h3>PV Green Card</h3>
              <p>SAPVIA certified solar PV installer meeting the highest industry standards for solar installations.</p>
            </div>

            <div className="certification-card-v2">
              <div className="cert-logo-wrapper">
                <img
                  src="/logos/certifications/qcto.svg"
                  alt="QCTO Red Seal"
                  className="cert-logo"
                />
              </div>
              <h3>Red Seal Certified</h3>
              <p>Nationally recognized Red Seal trade qualification - the highest standard of electrical certification in South Africa.</p>
            </div>

            <div className="certification-card-v2">
              <div className="cert-logo-wrapper">
                <img
                  src="/logos/certifications/sapvia.png"
                  alt="SAPVIA Member"
                  className="cert-logo"
                />
              </div>
              <h3>SAPVIA Member</h3>
              <p>South African Photovoltaic Industry Association member committed to industry excellence.</p>
            </div>

            <div className="certification-card-v2">
              <div className="cert-logo-wrapper coc-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3>Wireman's Licence</h3>
              <p>Licensed to issue Certificates of Compliance (CoC) for electrical installations per SANS 10142.</p>
            </div>
          </div>

          {/* Stats Row */}
          <div className="stats-row">
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">Installations</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">5</span>
              <span className="stat-label">Year Warranty</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">24hr</span>
              <span className="stat-label">Quote Response</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">Satisfaction</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Brands Section */}
      <section className="brands-section">
        <div className="container">
          <h2 className="section-title">We Use Premium Products</h2>
          <p className="section-subtitle">Partnering with industry-leading brands for quality you can trust</p>

          <div className="brands-grid">
            <a href="https://www.sunsynk.org/" target="_blank" rel="noopener noreferrer" className="brand-card">
              <div className="brand-logo-wrapper">
                <img src="/logos/inverters/sunsynk.png" alt="Sunsynk" className="brand-logo" />
              </div>
              <p>Premium Hybrid Inverters</p>
            </a>

            <a href="https://luxpowertek.com/" target="_blank" rel="noopener noreferrer" className="brand-card">
              <div className="brand-logo-wrapper">
                <img src="/logos/inverters/luxpower-full.png" alt="Luxpower" className="brand-logo" />
              </div>
              <p>Advanced Solar Inverters</p>
            </a>

            <a href="https://www.deyeinverter.com/" target="_blank" rel="noopener noreferrer" className="brand-card">
              <div className="brand-logo-wrapper">
                <img src="/logos/inverters/deye.png" alt="Deye" className="brand-logo" />
              </div>
              <p>Hybrid & String Inverters</p>
            </a>

            <a href="https://solar.huawei.com/" target="_blank" rel="noopener noreferrer" className="brand-card">
              <div className="brand-logo-wrapper">
                <img src="/logos/inverters/huawei.png" alt="Huawei" className="brand-logo" />
              </div>
              <p>Smart PV Solutions</p>
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services-section">
        <div className="container">
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">Comprehensive solar and electrical solutions for homes and businesses</p>

          <div className="services-grid">
            {services.map((service) => (
              <div key={service.id} className="service-card">
                <div className="service-image-wrapper">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="service-image"
                    loading="lazy"
                  />
                </div>
                <div className="service-content">
                  <h3>{service.title}</h3>
                  <p>{service.shortDesc}</p>
                  <ul className="service-features">
                    {service.features.slice(0, 4).map((feature, idx) => (
                      <li key={idx}>
                        <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="service-footer">
                    <span className="service-price">{service.price}</span>
                    <a href="#contact" className="btn btn-primary">Get Quote</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Projects Section */}
      <section className="projects-preview-section">
        <div className="container">
          <h2 className="section-title">Recent Projects</h2>
          <p className="section-subtitle">See our latest solar and electrical installations</p>

          <div className="projects-preview-grid">
            {recentProjects.map((project) => (
              <Link to={`/projects/${project.id}`} key={project.id} className="project-preview-card">
                <div className="project-image-wrapper">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="project-image"
                    loading="lazy"
                  />
                  <span className="project-category">{project.category}</span>
                </div>
                <div className="project-content">
                  <h3>{project.shortTitle}</h3>
                  <p className="project-location">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {project.location}
                  </p>
                  <p className="project-result">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                    {project.result}
                  </p>
                  <span className="view-project">View Project Details &rarr;</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="projects-cta">
            <Link to="/projects" className="btn btn-primary btn-large">View All Projects</Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2>Get Your Free Quote</h2>
              <p>Ready to start saving on electricity? Fill out the form and we'll contact you within 24 hours with a custom quote.</p>

              <div className="contact-details">
                <div className="contact-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <strong>Email</strong>
                    <p><a href="mailto:info@duengineering.co.za" onClick={trackEmailClick}>info@duengineering.co.za</a></p>
                  </div>
                </div>

                <div className="contact-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <strong>Address</strong>
                    <p>14 Boshoff Street, LaHoff<br />Klerksdorp, North West, 2571</p>
                  </div>
                </div>

                <div className="contact-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <strong>Business Hours</strong>
                    <p>Mon-Fri: 8AM - 5PM<br />Sat: 9AM - 1PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-form-wrapper">
              {formStatus.message && (
                <div className={`form-status-message ${formStatus.type}`}>
                  {formStatus.type === 'success' ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  )}
                  {formStatus.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="contact-form">
                {/* Honeypot field - hidden from users, catches bots */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleChange}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-input"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Smith"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-input"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone" className="form-label">Phone *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="form-input"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="082 123 4567"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="service" className="form-label">Service Interest *</label>
                  <select
                    id="service"
                    name="service"
                    className="form-select"
                    value={formData.service}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a service...</option>
                    <option value="residential-solar">Residential Solar Installation</option>
                    <option value="commercial-solar">Commercial Solar Solutions</option>
                    <option value="battery-backup">Battery Backup Systems</option>
                    <option value="electrical">Electrical Services</option>
                    <option value="solar-geyser">Solar Geyser</option>
                    <option value="compliance">Compliance Certificate</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    className="form-textarea"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project or requirements..."
                    rows="4"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-large submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Request Free Quote'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
