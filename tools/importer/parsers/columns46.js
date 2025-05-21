/* global WebImporter */
 export default function parse(element, { document }) {
  const images = [...element.querySelectorAll(':scope img')];
  const textContent = element.querySelector(':scope .com_vision_text_box');
  const heading = element.querySelector(':scope .com-heading');

  const headerRow = ['Columns (columns46)'];

  const firstColumn = [
    heading,
    textContent,
  ];

  const secondColumn = images;

  const cells = [
    headerRow,
    [firstColumn, secondColumn],
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(blockTable);
}