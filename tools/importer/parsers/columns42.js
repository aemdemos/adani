/* global WebImporter */
export default function parse(element, { document }) {
  // Extract immediate children of the element
  const children = Array.from(element.querySelectorAll(':scope > ul > li'));

  // Construct the header row
  const headerRow = ['Columns (columns42)'];

  // Parse each child and construct rows
  const rows = children.map((child) => {
    const imageDiv = child.querySelector('div img');
    const textSpan = child.querySelector('span');

    const image = imageDiv ? imageDiv : '';
    const textLink = textSpan ? textSpan : '';

    return [image, textLink];
  });

  // Create the table
  const cells = [headerRow, ...rows];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the element with the block table
  element.replaceWith(blockTable);
}