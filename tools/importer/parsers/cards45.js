/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards45)'];

  // Extract the list of businesses
  const businessCards = element.querySelectorAll(':scope ul.business-tab-home > li');

  const rows = Array.from(businessCards).map((card) => {
    const thumbnail = card.querySelector('.thumb-image picture');
    const overlayText = card.querySelector('.overlay-text');

    // Extract image
    const image = thumbnail.querySelector('img');

    // Extract title
    const title = document.createElement('strong');
    title.textContent = overlayText?.textContent.trim();

    return [image, title];
  });

  // Create the table
  const table = WebImporter.DOMUtils.createTable([headerRow, ...rows], document);

  // Replace the original element with the table
  element.replaceWith(table);
}