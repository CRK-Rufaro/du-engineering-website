import { useState } from 'react';
import { Link } from 'react-router-dom';
import { projects, services, brands, certifications } from '../data/projects';

function Home() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [formStatus, setFormStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('Thank you! We will contact you within 24 hours.');
    setTimeout(() => setFormStatus(''), 5000);
    setFormData({ name: '', email: '', phone: '', service: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Get 3 most recent projects for homepage
  const recentProjects = projects.slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background"></div>
        <div className="container hero-content">
          <h1 className="hero-title">Professional Solar & Electrical Solutions</h1>
          <p className="hero-subtitle">
            Save up to 70% on electricity with premium solar installations from Gauteng's trusted experts
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
          <h2 className="section-title">Why Choose DU Engineering?</h2>

          {/* Certifications Row */}
          <div className="certifications-row">
            <div className="certification-card">
              <div className="cert-image-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=300&fit=crop"
                  alt="PV Green Card - SAPVIA Certified Solar Installer"
                  className="cert-image"
                />
              </div>
              <div className="cert-content">
                <h3>PV Green Card</h3>
                <p>SAPVIA (South African Photovoltaic Industry Association) certified solar PV installer. The PV GreenCard programme ensures our installers meet the highest industry standards for solar installations.</p>
              </div>
            </div>

            <div className="certification-card">
              <div className="cert-image-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop"
                  alt="Red Seal Certified Electrician"
                  className="cert-image"
                />
              </div>
              <div className="cert-content">
                <h3>Red Seal Certified</h3>
                <p>Our electricians hold the nationally recognized Red Seal trade qualification - the highest standard of electrical trade certification in South Africa, approved by QCTO (Quality Council for Trades and Occupations).</p>
              </div>
            </div>

            <div className="certification-card">
              <div className="cert-image-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop"
                  alt="Wireman's Licence - Certificate of Compliance"
                  className="cert-image"
                />
              </div>
              <div className="cert-content">
                <h3>Wireman's Licence</h3>
                <p>Licensed to issue Certificates of Compliance (CoC) for electrical installations. Required for property sales, insurance, and ensuring your electrical system meets SANS 10142 safety standards.</p>
              </div>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-image-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop"
                  alt="Solar panel installation"
                  className="feature-image"
                />
              </div>
              <h4>500+ Installations</h4>
              <p>Trusted by homeowners and businesses across Gauteng for quality workmanship</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4>5-Year Warranty</h4>
              <p>Industry-leading workmanship guarantee on all installations</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4>Same-Day Quotes</h4>
              <p>Free consultations and quotes within 24 hours</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h4>Full Support</h4>
              <p>Ongoing maintenance and monitoring for peace of mind</p>
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
              <div className="brand-logo-placeholder">
                <span className="brand-name">Sunsynk</span>
              </div>
              <p>Premium Hybrid Inverters</p>
            </a>

            <a href="https://luxpowertek.co.za/" target="_blank" rel="noopener noreferrer" className="brand-card">
              <div className="brand-logo-placeholder">
                <span className="brand-name">Luxpower</span>
              </div>
              <p>Advanced Solar Inverters</p>
            </a>

            <a href="https://www.deyeinverter.com/" target="_blank" rel="noopener noreferrer" className="brand-card">
              <div className="brand-logo-placeholder">
                <span className="brand-name">Deye</span>
              </div>
              <p>Hybrid & String Inverters</p>
            </a>

            <a href="https://solar.huawei.com/" target="_blank" rel="noopener noreferrer" className="brand-card">
              <div className="brand-logo-placeholder">
                <span className="brand-name">Huawei</span>
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
                    <p>info@duengineering.co.za</p>
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
              {formStatus && (
                <div className="form-success">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  {formStatus}
                </div>
              )}

              <form onSubmit={handleSubmit} className="contact-form">
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

                <button type="submit" className="btn btn-primary btn-large submit-btn">
                  Request Free Quote
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
