/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row exactly as specified in the example
  const headerRow = ['Embed (embedSocial7)'];

  // Check for relevant content within the element
  const content = element.querySelector(':scope > div.news-head > div.com-heading > h2');

  if (!content) {
    console.warn('No relevant content found in element:', element);
    return;
  }

  // Extract the text content dynamically
  const extractedContent = content.textContent.trim();

  // Create the cells array with the header and extracted content
  const cells = [
    headerRow,
    [extractedContent],
  ];

  // Generate the block table using WebImporter.DOMUtils.createTable
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}