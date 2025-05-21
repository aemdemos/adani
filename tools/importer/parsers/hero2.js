/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row based on the block name
  const headerRow = ['Hero (hero2)'];

  // Extract the image from the block
  const pictureElement = element.querySelector(':scope .leftimage picture');
  const imgElement = pictureElement?.querySelector('img');

  // Extract the quote text, ensuring all formatting is retained
  const quoteElement = element.querySelector(':scope .growth-subtext blockquote');

  // Extract the profile information
  const infoElement = element.querySelector(':scope .info');
  const nameElement = infoElement?.querySelector(':scope .name');
  const designationElement = infoElement?.querySelector(':scope .designation');

  // Extract the call-to-action button
  const ctaElement = infoElement?.querySelector(':scope .gradient-button');

  // Ensure all extracted elements are included dynamically in the table cells
  const secondRowContent = [
    imgElement,      // Extracted image
    quoteElement,    // Quote content
    nameElement,     // Name of the person
    designationElement, // Designation
    ctaElement       // Call-to-Action Button
  ].filter(Boolean); // Ensure no empty elements are added

  const cells = [
    headerRow,       // Header row as per example
    [secondRowContent] // Content row as per example
  ];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}