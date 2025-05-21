/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards62)'];

  const cells = [headerRow];

  // Extract card elements
  const cardElements = Array.from(element.querySelectorAll(':scope > div'));

  cardElements.forEach((card) => {
    // Extract image
    const image = card.querySelector('img');

    // Extract title and description
    const title = card.querySelector('h2, h3, h4, h5, h6');
    const description = card.querySelector('p');
    const cta = card.querySelector('a');

    // Build the content cell
    const contentCell = [];
    if (title) contentCell.push(title);
    if (description) contentCell.push(description);
    if (cta) contentCell.push(cta);

    // Push the row to cells
    cells.push([image, contentCell]);
  });

  const table = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(table);
}