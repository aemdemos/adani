/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards44)'];

  // Process rows
  const rows = Array.from(element.querySelectorAll(':scope > div.benefitRow:not([style*="display: none"])')).map(row => {
    const icon = row.querySelector(':scope > div.benefit-Icon img');
    const copy = row.querySelector(':scope > div.benefitCopy');

    const title = copy.querySelector(':scope > div.head');
    const description = copy.querySelector(':scope > div.subText');

    return [
      icon,
      [title, description]
    ];
  });

  const cells = [headerRow, ...rows];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}