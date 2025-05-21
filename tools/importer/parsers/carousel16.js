/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Carousel (carousel16)'];

  // Select all immediate child elements of the block
  const children = Array.from(element.querySelectorAll(':scope > li'));

  // Transform child elements into rows for the table
  const rows = children.map((child) => {
    const anchor = child.querySelector(':scope > a');
    const image = anchor.querySelector(':scope img');
    const overlayText = anchor.querySelector('.overlay-text');

    // Extracting image and text content
    const imageElement = image;
    const textContent = document.createElement('div');
    if (overlayText) {
      const title = document.createElement('h2');
      title.textContent = overlayText.textContent.trim();
      textContent.appendChild(title);
    }

    return [imageElement, textContent];
  });

  // Create the table
  const cells = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the new table
  element.replaceWith(block);
}