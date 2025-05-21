/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the heading and content dynamically
  const heading = element.querySelector('h3');

  const headerRow = ['Embed (embedVideo12)'];

  // Check if the heading or any other content exists
  let contentRow = [];
  if (heading) {
    contentRow.push(heading);
  }

  const cells = [
    // Header row
    headerRow,
    // Content row with extracted heading and any dynamically fetched data
    contentRow.length ? contentRow : ['No content available'],
  ];

  const block = WebImporter.DOM.createTable(cells, document);
  element.replaceWith(block);
}