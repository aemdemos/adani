/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Carousel (carousel59)'];

  // Extract heading content dynamically
  const heading = element.querySelector(':scope > .com-heading > .heading');

  let textCellContent;
  if (heading) {
    // Retain original formatting, including line breaks
    textCellContent = heading.cloneNode(true);
  } else {
    textCellContent = document.createTextNode('SUCCESS STORIES'); // Provide fallback
  }

  const cells = [
    headerRow, // Header row
    [textCellContent] // Single row with the heading content
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document); // Create the structured table

  element.replaceWith(block); // Replace the original element with the new block
}