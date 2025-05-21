/* global WebImporter */
export default function parse(element, { document }) {
  // Helper function to extract and create content for the table cells
  const createCellContent = (blockElement) => {
    const img = blockElement.querySelector('img');
    const link = blockElement.querySelector('a');
    const paragraph = blockElement.querySelector('.card-sub-text, .card-date-text');

    const cellContent = [];

    // Add image to cell content
    if (img) {
      cellContent.push(img);
    }

    // Add paragraph or overlay text
    if (paragraph) {
      cellContent.push(paragraph);
    }

    // Add link
    if (link) {
      const anchor = document.createElement('a');
      anchor.href = link.href;
      anchor.textContent = link.href;
      cellContent.push(anchor);
    }

    return cellContent;
  };

  // Extract the relevant sections
  const blocks = Array.from(element.querySelectorAll(':scope > div > div.swiper-wrapper > div.three-imgcardBox'));

  const rows = [['Embed (embedVideo3)']];

  blocks.forEach((blockElement) => {
    const cellContent = createCellContent(blockElement);
    rows.push([cellContent]);
  });

  // Create the table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the created table
  element.replaceWith(table);
}