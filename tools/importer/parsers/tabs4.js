/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row with exact naming
  const headerRow = ['Tabs (tabs4)'];

  // Extracting tab labels dynamically
  const tabsContainer = element.querySelector(':scope > .reportsTab ul');
  const tabLinks = tabsContainer.querySelectorAll('li > a');

  const rows = Array.from(tabLinks).map((link) => {
    const tabLabel = link.textContent.trim();

    // Dynamically extract content for tab (currently unavailable in provided HTML)
    const tabContent = document.createElement('p');
    tabContent.textContent = tabLabel; // Use tab label as placeholder for content

    return [tabLabel, tabContent];
  });

  // Combine header and rows into a table structure
  const cells = [
    headerRow,
    ...rows,
  ];

  // Create the table block dynamically
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}