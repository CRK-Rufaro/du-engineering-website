/**
 * Google Analytics 4 Event Tracking Utility
 *
 * Events tracked:
 * 1. generate_lead - Quote form submissions (critical)
 * 2. contact - Phone/email clicks (critical)
 * 3. cta_click - Call-to-action button clicks
 */

// Check if gtag is available
const isGtagAvailable = () => typeof window !== 'undefined' && typeof window.gtag === 'function';

/**
 * Track form submission (lead generation)
 * @param {string} service - The service type selected
 */
export const trackFormSubmission = (service) => {
  if (!isGtagAvailable()) return;

  window.gtag('event', 'generate_lead', {
    event_category: 'conversion',
    event_label: service || 'not_specified',
    value: 1
  });
};

/**
 * Track phone number clicks
 */
export const trackPhoneClick = () => {
  if (!isGtagAvailable()) return;

  window.gtag('event', 'contact', {
    event_category: 'conversion',
    method: 'phone'
  });
};

/**
 * Track email link clicks
 */
export const trackEmailClick = () => {
  if (!isGtagAvailable()) return;

  window.gtag('event', 'contact', {
    event_category: 'conversion',
    method: 'email'
  });
};

/**
 * Track CTA button clicks
 * @param {string} buttonName - Name/label of the button
 * @param {string} location - Where on the page (hero, services, footer, etc.)
 */
export const trackCtaClick = (buttonName, location) => {
  if (!isGtagAvailable()) return;

  window.gtag('event', 'cta_click', {
    event_category: 'engagement',
    event_label: buttonName,
    location: location
  });
};

/**
 * Track project page views
 * @param {string} projectId - The project ID
 * @param {string} projectTitle - The project title
 * @param {string} category - Residential/Commercial
 */
export const trackProjectView = (projectId, projectTitle, category) => {
  if (!isGtagAvailable()) return;

  window.gtag('event', 'view_item', {
    event_category: 'project',
    item_id: projectId,
    item_name: projectTitle,
    item_category: category
  });
};

/**
 * Track external link clicks (brand websites)
 * @param {string} brandName - Name of the brand
 * @param {string} url - The URL clicked
 */
export const trackExternalLink = (brandName, url) => {
  if (!isGtagAvailable()) return;

  window.gtag('event', 'click', {
    event_category: 'outbound',
    event_label: brandName,
    link_url: url
  });
};
