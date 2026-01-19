import { useParams, Link, useNavigate } from 'react-router-dom';
import { projects } from '../data/projects';

function ProjectDetail() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const project = projects.find(p => p.id === projectId);

  if (!project) {
    return (
      <section className="not-found-section">
        <div className="container">
          <h1>Project Not Found</h1>
          <p>The project you're looking for doesn't exist.</p>
          <Link to="/projects" className="btn btn-primary">View All Projects</Link>
        </div>
      </section>
    );
  }

  // Get related projects (same category, excluding current)
  const relatedProjects = projects
    .filter(p => p.category === project.category && p.id !== project.id)
    .slice(0, 2);

  return (
    <>
      {/* Hero Section */}
      <section className="project-hero" style={{ backgroundImage: `url(${project.heroImage})` }}>
        <div className="project-hero-overlay"></div>
        <div className="container project-hero-content">
          <button onClick={() => navigate(-1)} className="back-button">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Projects
          </button>
          <span className="project-category-badge">{project.category}</span>
          <h1>{project.title}</h1>
          <div className="project-hero-meta">
            <span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {project.location}
            </span>
            <span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {project.date}
            </span>
            <span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              {project.systemSize} System
            </span>
          </div>
        </div>
      </section>

      {/* Project Content */}
      <section className="project-content-section">
        <div className="container">
          <div className="project-content-grid">
            {/* Main Content */}
            <div className="project-main-content">
              {/* Result Highlight */}
              <div className="result-highlight">
                <div className="result-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div className="result-text">
                  <span className="result-label">Project Result</span>
                  <span className="result-value">{project.result}</span>
                </div>
              </div>

              {/* Overview */}
              <div className="content-block">
                <h2>Project Overview</h2>
                <p>{project.description}</p>
              </div>

              {/* Challenge */}
              <div className="content-block">
                <h2>The Challenge</h2>
                <p>{project.challenge}</p>
              </div>

              {/* Solution */}
              <div className="content-block">
                <h2>Our Solution</h2>
                <p>{project.solution}</p>
              </div>

              {/* Results */}
              <div className="content-block">
                <h2>Results Achieved</h2>
                <ul className="results-list">
                  {project.results.map((result, idx) => (
                    <li key={idx}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                      {result}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Testimonial */}
              {project.testimonial && (
                <div className="project-testimonial">
                  <svg className="quote-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <blockquote>"{project.testimonial.quote}"</blockquote>
                  <cite>
                    <strong>{project.testimonial.author}</strong>
                    <span>{project.testimonial.location}</span>
                  </cite>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="project-sidebar">
              {/* System Specifications */}
              <div className="sidebar-card specs-card">
                <h3>System Specifications</h3>
                <dl className="specs-list">
                  <div className="spec-item">
                    <dt>System Size</dt>
                    <dd>{project.systemSize}</dd>
                  </div>
                  <div className="spec-item">
                    <dt>Solar Panels</dt>
                    <dd>{project.panels}</dd>
                  </div>
                  <div className="spec-item">
                    <dt>Inverter</dt>
                    <dd>{project.inverter}</dd>
                  </div>
                  <div className="spec-item">
                    <dt>Battery Storage</dt>
                    <dd>{project.battery}</dd>
                  </div>
                </dl>
              </div>

              {/* CTA Card */}
              <div className="sidebar-card cta-card">
                <h3>Start Your Project</h3>
                <p>Ready to achieve similar results? Get a free consultation and custom quote.</p>
                <Link to="/#contact" className="btn btn-primary btn-block">
                  Get Free Quote
                </Link>
                <p className="cta-note">No obligation. We'll respond within 24 hours.</p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="related-projects-section">
          <div className="container">
            <h2>Related Projects</h2>
            <div className="related-projects-grid">
              {relatedProjects.map((relatedProject) => (
                <Link
                  to={`/projects/${relatedProject.id}`}
                  key={relatedProject.id}
                  className="related-project-card"
                >
                  <div className="related-project-image">
                    <img src={relatedProject.image} alt={relatedProject.title} loading="lazy" />
                  </div>
                  <div className="related-project-content">
                    <h4>{relatedProject.shortTitle}</h4>
                    <p>{relatedProject.result}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="related-projects-cta">
              <Link to="/projects" className="btn btn-outline">View All Projects</Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default ProjectDetail;
