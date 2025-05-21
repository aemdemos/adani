/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns (columns55)'];

  // Select left image
  const leftImageContainer = element.querySelector(':scope .governLeft .governImage picture');

  // Select right text
  const rightTextWrapper = element.querySelector(':scope .governRight .govern-textWrapper');

  const cells = [
    headerRow,
    [leftImageContainer, rightTextWrapper]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  
  element.replaceWith(table);
}