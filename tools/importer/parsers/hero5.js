/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the headline
  const headlineElement = element.querySelector('.com-heading h2');
  const headline = headlineElement ? headlineElement : document.createElement('h2');
  headline.textContent = headlineElement ? headlineElement.textContent.trim() : 'Missing Headline';

  // Extract the call-to-action (link)
  const ctaElement = element.querySelector('.right-btn a');
  const ctaLink = ctaElement ? document.createElement('a') : document.createElement('span');
  if (ctaElement) {
    ctaLink.href = ctaElement.href;
    ctaLink.textContent = ctaElement.textContent.trim();
  } else {
    ctaLink.textContent = 'Missing CTA';
  }

  // Combine the headline and CTA link into a single cell
  const combinedContent = document.createElement('div');
  combinedContent.appendChild(headline);
  combinedContent.appendChild(ctaLink);

  // Build the table structure
  const headerRow = ['Hero (hero5)'];
  const contentRow = [combinedContent];

  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace the original element
  element.replaceWith(table);
}