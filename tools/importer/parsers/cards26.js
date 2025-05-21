/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to create a table row for each card
  const createCardRow = (imageEl, textContentEl) => {
    return [
      imageEl, // First cell: Image element
      textContentEl, // Second cell: Text content
    ];
  };

  // Extracting all cards from the element
  const cards = Array.from(
    element.querySelectorAll(':scope > div.business-left-sec > ul.business-tab-home > li')
  );

  // Header row for the table
  const headerRow = ['Cards (cards26)'];

  // Rows for individual cards
  const cardRows = cards.map(cardItem => {
    const imageEl = cardItem.querySelector('img');

    // Extract text content dynamically
    const textContent = cardItem.querySelector('.overlay-text')?.textContent || '';

    // Create a text content element dynamically
    const textContentEl = document.createElement('div');
    if (textContent.trim()) {
      const titleEl = document.createElement('h3');
      titleEl.textContent = textContent.trim();
      textContentEl.appendChild(titleEl);
    }

    return createCardRow(imageEl, textContentEl);
  });

  // Create the table structure dynamically
  const cells = [headerRow, ...cardRows];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}