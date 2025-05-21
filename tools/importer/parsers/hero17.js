/* global WebImporter */
export default function parse(element, { document }) {
  // Extract necessary components from the element
  const spotlightWrap = element.querySelector(':scope > div > .spotlightWrap');

  // Safely extract the image from the img-box
  const imageBox = spotlightWrap?.querySelector(':scope > .img-box picture img');

  // Safely extract the title
  const title = spotlightWrap?.querySelector(':scope > .text-wraper .title');

  // Ensure only image and title are included in the content row
  const imageElement = imageBox || document.createElement('img');
  const titleElement = title || document.createElement('h1');

  // Create header row for the table
  const headerRow = ['Hero (hero17)'];

  // Construct the content row with only image and title
  const contentRow = [
    [imageElement, titleElement],
  ];

  // Create the table block
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace the original element with the table
  element.replaceWith(table);
}