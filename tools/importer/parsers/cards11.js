/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards11)'];
  const rows = [];

  // Extract all immediate child elements with initiatives-box class
  const cards = element.querySelectorAll(':scope > .initiatives-box');

  cards.forEach((card) => {
    const image = card.querySelector('.image-box img');
    const title = card.querySelector('.title-heading');
    const description = card.querySelector('.text-box p');

    // Create a row for each card
    rows.push([
      image,
      [title, description],
    ]);
  });

  const cells = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}