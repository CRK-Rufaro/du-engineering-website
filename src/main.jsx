import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.jsx'

const rootElement = document.getElementById('root')
const app = (
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>
)

// Use hydrateRoot for prerendered pages (SEO), createRoot for dev/non-prerendered
if (rootElement.hasAttribute('data-prerendered')) {
  hydrateRoot(rootElement, app)
} else {
  createRoot(rootElement).render(app)
}
