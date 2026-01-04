import { useState } from 'react'

function App() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })
  const [formStatus, setFormStatus] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormStatus('Thank you! We will contact you within 24 hours.')
    setTimeout(() => setFormStatus(''), 5000)
    setFormData({ name: '', email: '', phone: '', message: '' })
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      <nav style={{ background: 'white', borderBottom: '1px solid var(--gray-200)', padding: 'var(--space-4) 0', position: 'sticky', top: 0, zIndex: 100, boxShadow: 'var(--shadow-sm)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>DU Engineering</div>
          <div style={{ display: 'flex', gap: 'var(--space-6)', flexWrap: 'wrap' }}>
            <a href="#home">Home</a>
            <a href="#services">Services</a>
            <a href="#portfolio">Portfolio</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </nav>

      <section id="home" style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-hover) 100%)', color: 'white', padding: 'var(--space-16) 0' }}>
        <div className="container text-center">
          <h1 style={{ color: 'white', marginBottom: 'var(--space-6)', fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>Professional Solar & Electrical Solutions</h1>
          <p style={{ fontSize: 'clamp(1rem, 3vw, 1.25rem)', marginBottom: 'var(--space-8)', color: 'rgba(255,255,255,0.9)', maxWidth: '700px', margin: '0 auto var(--space-8)' }}>Save up to 70% on electricity with premium solar installations from Gauteng's trusted experts</p>
          <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#contact" className="btn btn-secondary btn-large">Get Free Quote</a>
            <a href="#portfolio" className="btn btn-large" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: '2px solid white' }}>View Our Work</a>
          </div>
        </div>
      </section>

      <section style={{ padding: 'var(--space-16) 0', background: 'var(--gray-50)' }}>
        <div className="container">
          <h2 className="text-center mb-12">Why Choose DU Engineering?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: '500+ Installations', desc: 'Trusted by homeowners and businesses across Gauteng' },
              { title: 'Certified Experts', desc: 'ECSA registered & Solar PV installer certified' },
              { title: '5-Year Warranty', desc: 'Industry-leading workmanship guarantee' },
              { title: 'Same-Day Quotes', desc: 'Free consultations within 24 hours' },
              { title: 'Premium Quality', desc: 'Only top-tier panels and components' },
              { title: 'Full Support', desc: 'Ongoing maintenance for peace of mind' }
            ].map((item, i) => (
              <div key={i} className="card">
                <div style={{ width: '48px', height: '48px', background: 'var(--color-primary-light)', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--space-4)', fontSize: '1.5rem', color: 'var(--color-primary)' }}>✓</div>
                <h4>{item.title}</h4>
                <p style={{ marginBottom: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" style={{ padding: 'var(--space-16) 0' }}>
        <div className="container">
          <h2 className="text-center mb-12">Our Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: 'Residential Solar', desc: 'Complete solar power systems for homes. Reduce bills by 70%.', price: 'From R45,000' },
              { title: 'Commercial Solar', desc: 'Large-scale installations. Custom-designed for max ROI.', price: 'Custom Quote' },
              { title: 'Electrical Services', desc: 'Maintenance, repairs, upgrades, and compliance certs.', price: 'From R850' },
              { title: 'Battery Systems', desc: 'Load shedding solutions. Keep power on 24/7.', price: 'From R25,000' },
              { title: 'Solar Geysers', desc: 'Save on water heating with solar geyser systems.', price: 'From R18,000' },
              { title: 'Compliance Certs', desc: 'Electrical CoC and solar PV certification.', price: 'From R1,200' }
            ].map((service, i) => (
              <div key={i} className="card">
                <h3 style={{ fontSize: '1.25rem' }}>{service.title}</h3>
                <p>{service.desc}</p>
                <div style={{ marginTop: 'auto', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--gray-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
                  <span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>{service.price}</span>
                  <a href="#contact" className="btn btn-primary">Get Quote</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" style={{ padding: 'var(--space-16) 0', background: 'var(--gray-50)' }}>
        <div className="container">
          <h2 className="text-center mb-12">Recent Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: 'Sandton 8kW', result: '65% savings', loc: 'Sandton' },
              { title: 'Midrand Office', result: 'R45k/month', loc: 'Midrand' },
              { title: 'Pretoria 6kW', result: '58% reduction', loc: 'Pretoria' },
              { title: 'JHB Retail', result: 'Zero load shedding', loc: 'JHB' },
              { title: 'Randburg Home', result: 'Full independence', loc: 'Randburg' },
              { title: 'Centurion 120kW', result: 'Commercial', loc: 'Centurion' }
            ].map((p, i) => (
              <div key={i} className="card">
                <div style={{ height: '180px', background: 'linear-gradient(135deg, var(--gray-200), var(--gray-300))', borderRadius: 'var(--radius-lg)', marginBottom: 'var(--space-4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gray-500)', fontSize: '0.875rem' }}>📷 Project Photo</div>
                <h4 style={{ fontSize: '1.125rem' }}>{p.title}</h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--gray-500)', marginBottom: 'var(--space-2)' }}>📍 {p.loc}</p>
                <p style={{ fontWeight: 600, color: 'var(--color-secondary)', marginBottom: 0 }}>✓ {p.result}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" style={{ padding: 'var(--space-16) 0' }}>
        <div className="container">
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 className="text-center mb-6">Get Your Free Quote</h2>
            <p className="text-center mb-8">Fill out the form and we'll contact you within 24 hours.</p>
            {formStatus && (<div style={{ padding: 'var(--space-4)', background: 'var(--color-primary-light)', color: 'var(--color-primary)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-6)', border: '1px solid var(--color-primary)', textAlign: 'center' }}>{formStatus}</div>)}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name" className="form-label">Full Name *</label>
                <input type="text" id="name" name="name" className="form-input" value={formData.name} onChange={handleChange} required placeholder="John Smith" />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email *</label>
                <input type="email" id="email" name="email" className="form-input" value={formData.email} onChange={handleChange} required placeholder="john@example.com" />
              </div>
              <div className="form-group">
                <label htmlFor="phone" className="form-label">Phone *</label>
                <input type="tel" id="phone" name="phone" className="form-input" value={formData.phone} onChange={handleChange} required placeholder="082 123 4567" />
              </div>
              <div className="form-group">
                <label htmlFor="message" className="form-label">Service Interest *</label>
                <textarea id="message" name="message" className="form-textarea" value={formData.message} onChange={handleChange} required placeholder="E.g., I'm interested in a 6kW solar installation..."></textarea>
              </div>
              <button type="submit" className="btn btn-primary btn-large" style={{ width: '100%' }}>Request Free Quote</button>
            </form>
          </div>
        </div>
      </section>

      <footer style={{ background: 'var(--gray-900)', color: 'white', padding: 'var(--space-12) 0' }}>
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3" style={{ marginBottom: 'var(--space-8)' }}>
            <div>
              <h4 style={{ color: 'white' }}>DU Engineering</h4>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem' }}>Professional solar and electrical installations across Gauteng.</p>
            </div>
            <div>
              <h4 style={{ color: 'white' }}>Contact</h4>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem' }}>📧 info@duengineering.co.za<br/>📱 011 234 5678<br/>📍 Gauteng, SA</p>
            </div>
            <div>
              <h4 style={{ color: 'white' }}>Hours</h4>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem' }}>Mon-Fri: 8AM-5PM<br/>Sat: 9AM-1PM<br/>Sun: Closed</p>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 'var(--space-6)', textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem' }}>
            <p style={{ marginBottom: 0 }}>© 2026 DU Engineering - DEMO by Spark Studios</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
