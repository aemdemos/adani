/* global WebImporter */
export default function parse(element, { document }) {
  // Extract relevant content from the element
  const headingWrap = element.querySelector(':scope > .com-heading');
  const title = headingWrap?.querySelector('h2');
  const subheading = headingWrap?.querySelector('span > span');
  const buttonElement = element.querySelector(':scope > .right-btn > a');

  // Create the header row
  const headerRow = ['Hero (hero21)'];

  // Create content row
  const contentRow = [
    [title, subheading, buttonElement].filter(Boolean), // To handle missing data or empty elements
  ];

  // Create table cells
  const cells = [
    headerRow,
    contentRow,
  ];

  // Create table using WebImporter.DOMUtils.createTable
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}