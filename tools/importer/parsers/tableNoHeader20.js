/* global WebImporter */
export default function parse(element, { document }) {
  // Extract and dynamically handle the content
  const headingElement = element.querySelector(':scope > h3');
  const headerText = headingElement ? headingElement.textContent : '';

  // Ensure header row matches example exactly
  const headerRow = ['Table (no header, tableNoHeader20)'];

  // Preserve semantic meaning and existing elements from source HTML
  const contentRow = [headingElement ? headingElement.cloneNode(true) : document.createTextNode('')];

  // Create the rows array for the table
  const rows = [headerRow, contentRow];

  // Create the block table
  const tableBlock = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block table
  element.replaceWith(tableBlock);
}