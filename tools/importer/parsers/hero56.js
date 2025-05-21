/* global WebImporter */
export default function parse(element, { document }) {
  // Extracting the image
  const imageWrapper = element.querySelector('.leftimage picture img');
  const image = imageWrapper ? imageWrapper : null;

  // Extracting the blockquote text as a single cohesive unit
  const quoteWrapper = element.querySelector('.growth-subtext blockquote');
  const quoteText = quoteWrapper ? quoteWrapper.textContent.trim() : '';
  const formattedQuote = document.createElement('blockquote');
  formattedQuote.innerHTML = quoteText;

  // Extracting the name and designation with proper semantic tags
  const nameWrapper = element.querySelector('.info .name');
  const name = nameWrapper ? nameWrapper.textContent.trim() : '';

  const designationWrapper = element.querySelector('.info .designation');
  const designation = designationWrapper ? designationWrapper.textContent.trim() : '';

  const nameAndDesignation = document.createElement('div');
  nameAndDesignation.innerHTML = `<strong>${name}</strong><br>${designation}`;

  // Extracting the call-to-action button
  const buttonWrapper = element.querySelector('.btn-animation a');
  const button = buttonWrapper ? buttonWrapper.cloneNode(true) : null;

  // Constructing the table cells
  const headerRow = ['Hero (hero56)'];
  const contentRow = [
    image,
    formattedQuote,
    nameAndDesignation,
    button
  ];

  const cells = [
    headerRow,
    contentRow
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}