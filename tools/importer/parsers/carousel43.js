/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Carousel (carousel43)'];

  const rows = Array.from(element.querySelectorAll(':scope > ul > li')).map((listItem) => {
    const image = listItem.querySelector('picture img');

    const imageElement = document.createElement('img');
    imageElement.src = image.src;
    imageElement.alt = image.alt;
    imageElement.width = image.width;
    imageElement.height = image.height;

    const overlayText = listItem.querySelector('.sports-overlay-text');
    const textContent = document.createElement('div');
    if (overlayText) {
      const heading = document.createElement('h2');
      heading.textContent = overlayText.textContent.trim();
      textContent.appendChild(heading);
    }

    return [imageElement, textContent];
  });

  const tableData = [headerRow, ...rows];
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  element.replaceWith(blockTable);
}