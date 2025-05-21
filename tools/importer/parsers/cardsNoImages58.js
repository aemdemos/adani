/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cardsNoImages58)'];
  const rows = [];

  // Extract 'Latest News' heading
  const heading = element.querySelector(':scope > div.news-head > div.com-heading > h2');
  if (heading) {
    rows.push([heading]);
  }

  // Extract 'View All' button
  const buttonContainer = element.querySelector(':scope > div.news-head > div.right-btn > a');
  if (buttonContainer) {
    const link = document.createElement('a');
    link.href = buttonContainer.href;
    link.textContent = buttonContainer.textContent;
    rows.push([link]);
  }

  // Combine header with rows into table cells
  const cells = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the new table block
  element.replaceWith(block);
}