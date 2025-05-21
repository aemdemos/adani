/* global WebImporter */
 export default function parse(element, { document }) {
  // Extract relevant content dynamically from the input element
  const headerRow = ['Table (no header, tableNoHeader8)'];

  // Initialize an array to collect rows
  const rows = [];

  // Extract heading, ensuring correct content extraction
  const heading = element.querySelector(':scope > .com-heading h2');
  if (heading) {
    rows.push([heading]);
  }

  // Extract tab items dynamically
  const tabs = element.querySelectorAll(':scope > .com-map-tab ul li a');
  tabs.forEach((tab) => {
    rows.push([tab]);
  });

  // Combine header row with extracted rows
  const cells = [headerRow, ...rows];

  // Create the block table using WebImporter.DOMUtils.createTable
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}