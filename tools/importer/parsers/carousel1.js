/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Carousel (carousel1)'];

  // Select all immediate child elements of the block
  const children = Array.from(element.querySelectorAll(':scope .sustainabilityCompWrap .subcard'));

  // Transform child elements into rows for the table
  const rows = children.map((child) => {
    const anchor = child.querySelector(':scope > a');
    const image = child.getAttribute('data-bg');
    const overlayText = child.querySelector('.sustainabilityBox1');

    // Extracting image and text content
    const imageElement = document.createElement('img');
    imageElement.setAttribute('src', image);
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