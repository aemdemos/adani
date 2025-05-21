/* global WebImporter */
export default function parse(element, { document }) {
  // Validate presence of '.heading-wrap'
  const headingWrap = element.querySelector('.heading-wrap');
  if (!headingWrap) {
    console.warn("No '.heading-wrap' element found, skipping block parsing.");
    return;
  }

  // Correct header row matches the example exactly
  const headerRow = ['Table (striped, bordered)'];

  // Extract heading text
  const headingElement = headingWrap.querySelector('h2');
  const headingText = headingElement?.textContent.trim() || '';

  // Validate presence of '.business-right-tab'
  const businessRightTab = headingWrap.querySelector('.business-right-tab');
  if (!businessRightTab) {
    console.warn("No '.business-right-tab' element found, skipping block parsing.");
    return;
  }

  // Extract list items
  const listItems = Array.from(businessRightTab.querySelectorAll('ul > li')).map((li) => {
    const link = li.querySelector('a');
    return link?.textContent.trim() || '';
  }).filter((item) => item); // Filter out empty items

  // Validate list items presence
  if (listItems.length === 0) {
    console.warn("No valid list items found, skipping block parsing.");
    return;
  }

  // Generate table rows dynamically
  const tableRows = listItems.map((item) => [item]);

  // Combine all rows including the header
  const cells = [headerRow, [headingText], ...tableRows];

  // Create the block table using WebImporter.DOMUtils.createTable
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}