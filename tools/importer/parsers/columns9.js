/* global WebImporter */
export default function parse(element, { document }) {
  // Helper function to extract link and image elements in a structured format
  const processBox = (box) => {
    const anchor = box.querySelector('a');
    const picture = box.querySelector('picture');

    // Extract image
    const img = picture?.querySelector('img');

    // Validate content extraction
    if (!anchor || !img) {
      return null; // Skip if missing required elements
    }

    // Create structured elements
    const link = document.createElement('a');
    link.href = anchor.href;
    link.textContent = img.alt || '';

    return [img, link];
  };

  // Extract the boxes from the container
  const boxes = element.querySelectorAll(':scope > div.our-presence-box');

  // Parse and filter valid boxes
  const columns = Array.from(boxes)
    .map((box) => processBox(box))
    .filter((column) => column !== null);

  // Create the header row
  const headerRow = ['Columns (columns9)'];

  // Combine header row and content rows
  const cells = [headerRow, ...columns];

  // Generate block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the block table
  element.replaceWith(blockTable);
}