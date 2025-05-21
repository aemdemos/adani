/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Create the header row
  const headerRow = ['Hero (hero40)'];
  cells.push(headerRow);

  // Extract the image from the img-box div
  const imgBox = element.querySelector(':scope > .img-box');
  const image = imgBox ? imgBox.querySelector('img') : null;

  // Extract the text content
  const textContainer = element.querySelector(':scope > .com-text-container');
  const textContent = textContainer ? textContainer.querySelector('.career-intro-text') : null;

  // Create the content rows separately
  const imageRow = [image || document.createElement('div')]; // Fallback to an empty div if image is null
  const textRow = [textContent || document.createElement('div')]; // Fallback to an empty div if textContent is null
  cells.push(imageRow);
  cells.push(textRow);

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the element with the new block table
  element.replaceWith(block);
}