/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cardsNoImages37)'];

  // Extract immediate child elements matching the defined structure
  const sections = Array.from(element.querySelectorAll(':scope > div.spots-content'));
  
  const rows = sections.map((section) => {
    const paragraph = section.querySelector('p');
    const link = section.querySelector('a.cta');

    // Create row content combining paragraph and call-to-action link
    const content = [
      paragraph,
      link ? document.createElement('a') : null,
    ];

    if (link) {
      content[1].textContent = link.textContent;
      content[1].href = link.href;
    }

    return [content];
  });

  const tableData = [headerRow, ...rows];
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace original element with the new block table
  element.replaceWith(blockTable);
}