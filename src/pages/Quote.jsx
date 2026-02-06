import { useEffect } from 'react';
import SEO from '../components/SEO';
import Home from './Home';

function Quote() {
  // Auto-scroll to contact section on mount
  useEffect(() => {
    setTimeout(() => {
      const element = document.getElementById('contact');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }, []);

  return (
    <>
      <SEO
        title="Request a Free Quote | Solar & Electrical Services"
        description="Request a free quote for solar panel installation, battery backup systems, or electrical services in Klerksdorp, North West & Gauteng. DUE Engineering responds within 24 hours. Red Seal certified."
        path="/quote"
      />
      <Home skipSEO />
    </>
  );
}

export default Quote;
