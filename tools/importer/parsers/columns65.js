/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns (columns65)'];

  const rows = [];

  // Select all the `four-imgcardBox` elements, which contain the individual cards
  const cards = element.querySelectorAll(':scope .four-imgcardBox');

  cards.forEach((card) => {
    const imageBox = card.querySelector('.image-box img');
    const cardHead = card.querySelector('.card-head');
    const cardSubText = card.querySelector('.card-sub-text');

    // Create the cell contents for this card
    const imageElement = imageBox.cloneNode(true); // clone the image element
    const cardContent = document.createElement('div');
    cardContent.append(cardHead, cardSubText); // Append card head and subtext

    rows.push([imageElement, cardContent]);
  });

  const cells = [headerRow, ...rows];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block
  element.replaceWith(block);
}