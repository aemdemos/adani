/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the tab labels
  const tabs = Array.from(element.querySelectorAll(':scope > .tabWrapper > ul > li > a'));

  if (!tabs.length) {
    throw new Error('No tabs found in the given element.');
  }

  // Create header row
  const headerRow = ['Tabs (tabs73)'];

  // Extract tab labels and content
  const rows = tabs.map((tab) => {
    const label = tab.textContent.trim();
    const content = tab.getAttribute('data-rel'); // Assuming `data-rel` contains relevant content or reference

    if (!label) {
      throw new Error('Tab label missing for one of the tabs.');
    }
    const contentCell = content ? document.createTextNode(content) : document.createTextNode('No Content');
    return [label, contentCell];
  });

  // Combine header and rows into cells
  const cells = [headerRow, ...rows];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}