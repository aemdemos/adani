/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the header content
  const headerRow = ['Columns (columns66)'];

  // Extract the values section
  const valuesSection = element.querySelector(':scope > section');
  const cards = valuesSection.querySelectorAll('.fourImageCard-box');

  // Create rows for each core value card
  const rows = Array.from(cards).map((card) => {
    const image = card.querySelector('img');
    const title = card.querySelector('.card-head');
    const description = card.querySelector('.card-sub-text');

    return [
      image,
      [title, description],
    ];
  });

  // Combine the header and data rows
  const cells = [headerRow, ...rows];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}