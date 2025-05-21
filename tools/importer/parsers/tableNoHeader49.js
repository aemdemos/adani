/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Table (no header, tableNoHeader49)'];
  
  // Extract the content dynamically from the given element.
  const contentRow = [element.querySelector('.com-heading h2')];

  // Ensure the table structure matches the example.
  const cells = [headerRow, contentRow];

  // Create the block table using WebImporter.DOMUtils.createTable
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new structured block table.
  element.replaceWith(block);
}