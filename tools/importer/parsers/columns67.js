/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns (columns67)'];

  const leftImageElement = element.querySelector('.leftimage picture') || null;
  const leftContent = [leftImageElement];

  const rightContent = [];

  const textWrapper = element.querySelector('.textWrapper');
  if (textWrapper) {
    const subText = textWrapper.querySelector('.growth-subtext blockquote');
    const infoWrap = textWrapper.querySelector('.info-wrap');

    if (subText) {
      rightContent.push(subText);
    }

    if (infoWrap) {
      rightContent.push(infoWrap);
    }
  }

  const cells = [
    headerRow,
    [leftContent, rightContent],
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(block);
}