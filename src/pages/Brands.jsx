import SEO from '../components/SEO';

function Brands() {
  const brandCategories = [
    {
      title: 'Inverters',
      description: 'Premium hybrid and string inverters from industry-leading manufacturers',
      brands: [
        { name: 'Sunsynk', logo: '/logos/inverters/sunsynk.png', url: 'https://www.sunsynk.org/', description: 'Premium Hybrid Inverters' },
        { name: 'Luxpower', logo: '/logos/inverters/luxpower-full.png', url: 'https://luxpowertek.com/', description: 'Advanced Solar Inverters' },
        { name: 'Deye', logo: '/logos/inverters/deye.png', url: 'https://www.deyeinverter.com/', description: 'Hybrid & String Inverters' },
        { name: 'Huawei', logo: '/logos/inverters/huawei.png', url: 'https://solar.huawei.com/', description: 'Smart PV Solutions' },
        { name: 'Victron', logo: '/logos/inverters/victron.png', url: 'https://www.victronenergy.com/', description: 'Off-Grid Power Solutions', logoScale: 1.8 },
        { name: 'Solis', logo: '/logos/inverters/solis.webp', url: 'https://www.solisinverters.com/', description: 'String Inverters' },
      ]
    },
    {
      title: 'Battery Storage',
      description: 'Reliable lithium battery solutions for backup power and energy storage',
      brands: [
        { name: 'Pylontech', logo: '/logos/batteries/pylontech.svg', url: 'https://www.pylontech.com.cn/', description: 'Lithium Battery Storage' },
        { name: 'Freedom Won', logo: '/logos/batteries/freedom-won.png', url: 'https://www.freedomwon.co.za/', description: 'SA-Made Lithium Batteries', darkBg: true },
        { name: 'Hubble', logo: '/logos/batteries/hubble.avif', url: 'https://www.hubbleconnected.com/', description: 'Lithium-Ion Solutions' },
        { name: 'Alpha ESS', logo: '/logos/batteries/alpha-ess.svg', url: 'https://www.alpha-ess.com/', description: 'Energy Storage Systems' },
        { name: 'Volta', logo: '/logos/batteries/volta.png', url: 'https://volta.energy/', description: 'Battery Solutions' },
        { name: 'HinaESS', logo: '/logos/batteries/hina-ess.webp', url: 'https://www.hinaess.com/', description: 'Energy Storage' },
        { name: 'SA Lithium', logo: '/logos/batteries/sa-lithium.avif', url: 'https://salithium.co.za/', description: 'South African Batteries' },
      ]
    },
    {
      title: 'Solar Panels',
      description: 'High-efficiency Tier-1 solar panels for maximum energy generation',
      brands: [
        { name: 'Canadian Solar', logo: '/logos/panels/canadian-solar.png', url: 'https://www.canadiansolar.com/', description: 'Tier-1 Solar Modules' },
        { name: 'JA Solar', logo: '/logos/panels/ja-solar.png', url: 'https://www.jasolar.com/', description: 'High-Performance Panels' },
        { name: 'Cinco', logo: '/logos/panels/cinco.avif', url: 'https://cincosolar.com/', description: 'Quality Solar Panels' },
      ]
    },
    {
      title: 'Mounting Systems',
      description: 'Professional mounting solutions for rooftop and ground installations',
      brands: [
        { name: 'Schletter', logo: '/logos/mounting/schletter.svg', url: 'https://www.schletter-group.com/', description: 'Mounting Systems' },
        { name: 'Renusol', logo: '/logos/mounting/renusol.svg', url: 'https://www.renusol.com/', description: 'Flat Roof Systems' },
      ]
    },
    {
      title: 'Electrical Components',
      description: 'Quality electrical protection and distribution equipment',
      brands: [
        { name: 'CBI Electric', logo: '/logos/electrical/cbi-electric.png', url: 'https://www.cbi-electric.com/', description: 'Circuit Protection' },
        { name: 'DEHN', logo: '/logos/electrical/dehn.svg', url: 'https://www.dehn.co.za/', description: 'Surge Protection' },
      ]
    },
  ];

  const certifications = [
    { name: 'PV Green Card', logo: '/logos/certifications/pv-greencard.png', description: 'SAPVIA Certified Installer' },
    { name: 'SAPVIA', logo: '/logos/certifications/sapvia.png', description: 'Industry Association Member' },
    { name: 'QCTO Red Seal', logo: '/logos/certifications/qcto.svg', description: 'Trade Qualification' },
  ];

  return (
    <>
      <SEO
        title="Premium Solar Brands & Partner Products"
        description="DUE Engineering partners with premium solar brands including Sunsynk, Luxpower, Pylontech, Canadian Solar, and more. SAPVIA certified installer using only industry-leading products."
        path="/brands"
      />
      {/* Hero Section */}
      <section className="page-hero">
        <div className="container">
          <h1>Our Partner Brands</h1>
          <p>We exclusively use premium, industry-leading products to ensure quality, reliability, and long-term performance for every installation.</p>
        </div>
      </section>

      {/* Brand Categories */}
      {brandCategories.map((category, index) => (
        <section key={index} className={`brands-category-section ${index % 2 === 1 ? 'alt-bg' : ''}`}>
          <div className="container">
            <div className="category-header">
              <h2>{category.title}</h2>
              <p>{category.description}</p>
            </div>
            <div className="brands-category-grid">
              {category.brands.map((brand, brandIndex) => (
                <a
                  key={brandIndex}
                  href={brand.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="brand-card-large"
                >
                  <div className={`brand-logo-large${brand.darkBg ? ' dark-logo-bg' : ''}`}>
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      style={brand.logoScale ? { transform: `scale(${brand.logoScale})` } : undefined}
                    />
                  </div>
                  <div className="brand-info">
                    <h3>{brand.name}</h3>
                    <p>{brand.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Certifications Section */}
      <section className="certifications-section">
        <div className="container">
          <div className="category-header">
            <h2>Our Certifications</h2>
            <p>Professional accreditations that guarantee quality workmanship</p>
          </div>
          <div className="certifications-grid">
            {certifications.map((cert, index) => (
              <div key={index} className="certification-item">
                <div className="cert-logo-large">
                  <img src={cert.logo} alt={cert.name} />
                </div>
                <h3>{cert.name}</h3>
                <p>{cert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="brands-cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Go Solar?</h2>
            <p>Get a free quote using the best products in the industry.</p>
            <a href="/#contact" className="btn btn-secondary btn-large">Get Free Quote</a>
          </div>
        </div>
      </section>
    </>
  );
}

export default Brands;
