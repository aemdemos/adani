/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Hero (hero15)'];

  // Extract background image
  const imageBox = element.querySelector('.image-box');
  let picture = null;
  if (imageBox) {
    picture = imageBox.querySelector('picture');
  }

  // Extract heading text
  const textWrap = element.querySelector('.crosslink-textWrap > p');
  let headingText = null;
  if (textWrap) {
    headingText = textWrap;
  } else {
    headingText = document.createElement('p');
    headingText.textContent = 'Heading missing';
  }

  // Extract call-to-action link
  const buttonWrap = element.querySelector('.btns-wrap .watch-btn');
  let callToAction = null;
  if (buttonWrap && buttonWrap.href) {
    callToAction = buttonWrap;
  } else {
    callToAction = document.createElement('span');
    callToAction.textContent = 'Call-to-Action link missing';
  }

  // Combine all content into a single cell for the second row
  const combinedContent = document.createElement('div');
  if (picture) combinedContent.appendChild(picture);
  combinedContent.appendChild(headingText);
  combinedContent.appendChild(callToAction);

  const cells = [
    headerRow, // Header row
    [combinedContent] // Single-column structure for content row
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(block);
}