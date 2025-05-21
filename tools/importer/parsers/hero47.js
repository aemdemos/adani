/* global WebImporter */
export default function parse(element, { document }) {
  // Ensure header row matches example structure
  const headerRow = ['Hero (hero47)'];

  // Extract image element dynamically
  const imageElement = element.querySelector(':scope picture img');

  // Create a container for text content
  const textContent = document.createElement('div');

  // Extract text elements dynamically
  const heading = element.querySelector(':scope blockquote');
  const name = element.querySelector(':scope .name');
  const designation = element.querySelector(':scope .designation');
  const ctaLink = element.querySelector(':scope .gradient-button');

  // Append extracted elements to the container, handling empty cases
  if (heading) textContent.appendChild(heading);
  if (name) textContent.appendChild(name);
  if (designation) textContent.appendChild(designation);
  if (ctaLink) textContent.appendChild(ctaLink);

  // Ensure all semantic meaning and text content is preserved
  const cells = [
    headerRow, // Header row as per example structure
    [imageElement, textContent], // Content row with extracted elements
  ];

  // Create the block table using WebImporter.DOMUtils
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}