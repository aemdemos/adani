/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards72)'];
  const rows = Array.from(element.querySelectorAll(':scope > .business-right-sec')).map((card) => {
    const image = card.querySelector('.big-thumb-image img');
    const title = card.querySelector('.top-text-heading');
    const description = card.querySelector('.bottom-text-description');
    const link = card.querySelector('.watch-cta a');

    const imageElement = image ? image.cloneNode(true) : '';
    const titleElement = title ? document.createElement('strong') : '';
    if (titleElement) titleElement.textContent = title.textContent.trim();
    const descriptionElement = description ? description.cloneNode(true) : '';
    const linkElement = link ? document.createElement('a') : '';
    if (linkElement) {
      linkElement.href = link.href;
      linkElement.textContent = link.textContent.trim();
    }

    return [
      imageElement,
      [titleElement, descriptionElement, linkElement].filter(Boolean),
    ];
  });

  const tableData = [headerRow, ...rows];
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(blockTable);
}