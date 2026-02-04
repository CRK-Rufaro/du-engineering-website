import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

function About() {
  const values = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Quality First',
      description: 'We use only premium, industry-leading products and never cut corners on workmanship.'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'Client Focused',
      description: 'Every installation is tailored to meet your specific needs, budget, and energy goals.'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      title: 'Technical Excellence',
      description: 'Red Seal certified electricians with extensive training on the latest solar technologies.'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Reliable Support',
      description: '5-year workmanship warranty and ongoing maintenance support for peace of mind.'
    },
  ];

  const milestones = [
    { number: '500+', label: 'Installations Completed' },
    { number: '10+', label: 'Years Experience' },
    { number: '98%', label: 'Customer Satisfaction' },
    { number: '24hr', label: 'Quote Response' },
  ];

  return (
    <>
      <SEO
        title="About Us - Red Seal Certified Solar Installers"
        description="DUE Engineering is a Red Seal certified, SAPVIA accredited solar and electrical company based in Klerksdorp, North West. Serving Klerksdorp, Potchefstroom, Rustenburg, Johannesburg, and Pretoria with 500+ installations."
        path="/about"
      />
      {/* Hero Section */}
      <section className="page-hero about-hero">
        <div className="container">
          <h1>About DUE Engineering</h1>
          <p className="tagline">Perfection is possible</p>
        </div>
      </section>

      {/* Story Section */}
      <section className="about-story-section">
        <div className="container">
          <div className="story-content">
            <div className="story-text">
              <h2>Our Story</h2>
              <p>
                DUE Engineering was founded with a simple mission: to provide South African homes and businesses with reliable, high-quality solar and electrical solutions that actually work.
              </p>
              <p>
                Based in Klerksdorp, North West Province, we've grown from a small local operation to serving clients across Gauteng and beyond. Our success is built on a commitment to quality workmanship, honest advice, and using only the best products in the industry.
              </p>
              <p>
                As Red Seal certified electricians and SAPVIA-accredited solar installers, we bring professional expertise to every project - whether it's a residential backup system or a large commercial installation.
              </p>
            </div>
            <div className="story-image">
              <img
                src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=400&fit=crop"
                alt="Solar installation"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="milestones-section">
        <div className="container">
          <div className="milestones-grid">
            {milestones.map((milestone, index) => (
              <div key={index} className="milestone-item">
                <span className="milestone-number">{milestone.number}</span>
                <span className="milestone-label">{milestone.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <div className="section-header">
            <h2>What Drives Us</h2>
            <p>The principles that guide every installation we do</p>
          </div>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-us-section">
        <div className="container">
          <div className="why-us-content">
            <div className="why-us-text">
              <h2>Why Clients Choose Us</h2>
              <ul className="why-us-list">
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong>Certified Professionals</strong> - Red Seal electricians and PV Green Card installers</span>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong>Premium Products Only</strong> - Sunsynk, Luxpower, Pylontech, Canadian Solar</span>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong>Transparent Pricing</strong> - Detailed quotes with no hidden costs</span>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong>After-Sales Support</strong> - 5-year warranty and ongoing maintenance</span>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong>COC Issuing</strong> - Licensed to issue Certificates of Compliance</span>
                </li>
              </ul>
            </div>
            <div className="why-us-image">
              <img
                src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&h=500&fit=crop"
                alt="Professional electrician at work"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="service-area-section">
        <div className="container">
          <div className="section-header">
            <h2>Service Areas</h2>
            <p>We serve clients across the North West Province and Gauteng</p>
          </div>
          <div className="areas-grid">
            <div className="area-card">
              <h3>North West Province</h3>
              <ul>
                <li>Klerksdorp</li>
                <li>Potchefstroom</li>
                <li>Rustenburg</li>
                <li>Mahikeng</li>
                <li>Surrounding areas</li>
              </ul>
            </div>
            <div className="area-card">
              <h3>Gauteng</h3>
              <ul>
                <li>Johannesburg</li>
                <li>Pretoria</li>
                <li>Sandton</li>
                <li>Midrand</li>
                <li>Surrounding areas</li>
              </ul>
            </div>
            <div className="area-card">
              <h3>Other Areas</h3>
              <ul>
                <li>Free State (selected areas)</li>
                <li>Contact us for availability</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta-section">
        <div className="container">
          <div className="cta-box">
            <h2>Ready to Start Your Solar Journey?</h2>
            <p>Get in touch for a free consultation and quote.</p>
            <div className="cta-buttons">
              <a href="/#contact" className="btn btn-secondary btn-large">Get Free Quote</a>
              <Link to="/projects" className="btn btn-outline-light btn-large">View Our Work</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
