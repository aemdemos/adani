/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the relevant data
  const rows = [];

  // Fixing header row to match exactly as specified
  rows.push(['Table (striped, bordered, tableStripedBordered41)']);

  // Extracting links from the search results and converting URLs to hyperlinks
  const searchResults = element.querySelector(':scope > li.search .search-container__results ul');
  if (searchResults) {
    const links = searchResults.querySelectorAll('li > a');
    links.forEach((link) => {
      const textContent = link.textContent.trim();
      const href = link.getAttribute('href');

      // Creating a hyperlink element
      const anchor = document.createElement('a');
      anchor.href = href;
      anchor.textContent = href;

      // Add a row with text content and hyperlink
      rows.push([textContent, anchor]);
    });
  }

  // Creating the table block using WebImporter.DOMUtils.createTable
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}