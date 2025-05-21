/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns (columns69)'];

  // Extract all the cards
  const cards = Array.from(element.querySelectorAll(':scope > div > div > .three-imgcardBox'));

  // Parse each card dynamically
  const cardContent = cards.map((card) => {
    const image = card.querySelector('img');
    const date = card.querySelector('.card-date-text');
    const textLink = card.querySelector('.card-sub-text a');

    const content = [];
    if (image) content.push(image);
    if (date) content.push(date);
    if (textLink) content.push(textLink);

    return content;
  });

  const tableData = [
    headerRow,
    ...cardContent
  ];

  const block = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(block);
}