/* global WebImporter */
export default function parse(element, { document }) {
  // Define header row based on the block name
  const headerRow = ['Columns (columns70)'];

  // Extract content rows dynamically
  const rows = [...element.querySelectorAll(':scope > div')].map((div) => {
    const cellContent = [];

    // Extract text elements (paragraphs, lists, links)
    const textContent = div.querySelectorAll('p, ul, ol, a');
    textContent.forEach((content) => {
      cellContent.push(content);
    });

    // Extract images
    const images = div.querySelectorAll('img');
    images.forEach((img) => {
      cellContent.push(img);
    });

    // Extract iframes or other non-image elements with a 'src' attribute and convert them to links
    const iframeLinks = div.querySelectorAll('[src]:not(img)');
    iframeLinks.forEach((iframe) => {
      const link = document.createElement('a');
      link.href = iframe.src;
      link.textContent = iframe.src;
      cellContent.push(link);
    });

    return cellContent;
  });

  // Create table structure with extracted content
  const tableData = [headerRow, ...rows.map(row => [row])];

  // Create table using WebImporter helper
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace original element with the structured block table
  element.replaceWith(blockTable);
}