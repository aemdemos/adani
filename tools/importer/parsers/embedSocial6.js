/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the heading text dynamically
  const headingDiv = element.querySelector(':scope > div.com-heading');
  const headingText = headingDiv ? headingDiv.querySelector('h2')?.textContent.trim() : 'No Content Found';

  // Create the header row with plain text
  const headerRow = ['Embed (embedSocial6)'];

  // Create the content row with plain text extracted from headingText
  const contentRow = [headingText];

  const tableCells = [headerRow, contentRow];

  // Create the table block using existing elements and document object
  const tableBlock = WebImporter.DOMUtils.createTable(tableCells, document);

  // Replace the original element with the newly created block
  element.replaceWith(tableBlock);
}