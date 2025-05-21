/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards53)'];

  // Extract all initiatives-box blocks
  const initiativeBlocks = element.querySelectorAll(':scope > .initiatives-box');

  const rows = Array.from(initiativeBlocks).map((block) => {
    const imageBox = block.querySelector('.image-box img');
    const bottomTextBox = block.querySelector('.bottom-text-box');

    const imageElement = imageBox.cloneNode(true);

    const titleElement = bottomTextBox.querySelector('.title-heading');
    const descriptionElement = bottomTextBox.querySelector('.text-box p');

    const contentElements = [];
    if (titleElement) contentElements.push(titleElement.cloneNode(true));
    if (descriptionElement) contentElements.push(descriptionElement.cloneNode(true));

    return [imageElement, contentElements];
  });

  const tableData = [headerRow, ...rows];

  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  element.replaceWith(blockTable);
}