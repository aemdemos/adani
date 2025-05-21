/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns (columns10)'];

  // Extract the content from the left section (map)
  const leftSection = element.querySelector(':scope > div.left-sec');

  // Extract the map container
  const mapContainer = leftSection?.querySelector('.map-container');

  // Extract the content from the right section (details)
  const rightSection = element.querySelector(':scope > div.right-sec');

  // Extract the title and list of items
  const title = rightSection?.querySelector('h3');
  const list = rightSection?.querySelector('ul');

  // Validate that all required elements are extracted
  if (!mapContainer || !title || !list) {
    throw new Error('Missing required elements in the source HTML');
  }

  // Construct the second row based on extracted content
  const contentRow = [
    mapContainer,
    [title, list]
  ];

  const cells = [
    headerRow,
    contentRow
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(table);
}