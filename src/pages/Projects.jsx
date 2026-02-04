import { useState } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';
import SEO from '../components/SEO';

function Projects() {
  const [filter, setFilter] = useState('all');

  const categories = ['all', 'Residential Solar', 'Commercial Solar'];

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(project => project.category === filter);

  return (
    <>
      <SEO
        title="Solar Installation Projects Portfolio"
        description="Explore DUE Engineering's portfolio of 500+ successful solar and electrical installations across Klerksdorp, Johannesburg, Pretoria, and North West Province. See real results and client savings."
        path="/projects"
      />
      {/* Hero Section */}
      <section className="page-hero">
        <div className="container">
          <h1>Our Projects</h1>
          <p>Explore our portfolio of successful solar and electrical installations across North West and Gauteng</p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="projects-page-section">
        <div className="container">
          {/* Filter Buttons */}
          <div className="project-filters">
            {categories.map((category) => (
              <button
                key={category}
                className={`filter-btn ${filter === category ? 'active' : ''}`}
                onClick={() => setFilter(category)}
              >
                {category === 'all' ? 'All Projects' : category}
              </button>
            ))}
          </div>

          {/* Stats Row */}
          <div className="project-stats">
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">Installations Completed</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">R2M+</span>
              <span className="stat-label">Client Savings Annually</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">15+</span>
              <span className="stat-label">Years Experience</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">Customer Satisfaction</span>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="projects-grid">
            {filteredProjects.map((project) => (
              <Link to={`/projects/${project.id}`} key={project.id} className="project-card">
                <div className="project-card-image">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                  />
                  <span className="project-badge">{project.category}</span>
                  <span className="project-date">{project.date}</span>
                </div>
                <div className="project-card-content">
                  <h3>{project.shortTitle}</h3>
                  <div className="project-meta">
                    <span className="project-location">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {project.location}
                    </span>
                    <span className="project-size">{project.systemSize}</span>
                  </div>
                  <p className="project-description">{project.description.substring(0, 120)}...</p>
                  <div className="project-result-badge">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    {project.result}
                  </div>
                  <span className="read-more">Read Full Case Study &rarr;</span>
                </div>
              </Link>
            ))}
          </div>

          {/* CTA Section */}
          <div className="projects-cta-section">
            <h2>Ready to Start Your Project?</h2>
            <p>Join our growing list of satisfied customers. Get a free consultation and quote today.</p>
            <Link to="/#contact" className="btn btn-primary btn-large">Get Free Quote</Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Projects;
