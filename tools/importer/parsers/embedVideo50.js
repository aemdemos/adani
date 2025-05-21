/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Embed (embedVideo50)'];

  // Create a cell for content
  const contentCell = [];

  // Identify heading element
  const heading = element.querySelector(':scope > div.com-heading > h2');
  if (heading) {
    contentCell.push(heading);
  }

  // Identify image element (poster)
  const image = element.querySelector('img');
  if (image) {
    contentCell.push(image);
  }

  // Identify link element (embed URL)
  const iframe = element.querySelector('iframe');
  if (iframe) {
    const link = document.createElement('a');
    link.href = iframe.src;
    link.textContent = iframe.src;
    contentCell.push(link);
  }

  // Create table structure
  const cells = [
    headerRow,
    [contentCell],
  ];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}