/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Embed (embedSocial51)'];

  // Extract URL dynamically (example URL for embedding content)
  const urlElement = document.createElement('a');
  const twitterEmbedURL = 'https://twitter.com/creativecloud/status/1549061442904633345?s=20&t=ZmXIH_DWvqQXGXCq__W3sA';
  urlElement.href = twitterEmbedURL;
  urlElement.textContent = twitterEmbedURL;

  // Create table rows
  const tableData = [
    headerRow,
    [urlElement]
  ];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}