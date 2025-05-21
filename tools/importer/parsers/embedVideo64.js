/* global WebImporter */
export default function parse(element, { document }) {
  // Verify the header row matches the example
  const headerRow = ['Embed (embedVideo64)'];

  // Extract the relevant content dynamically from the HTML element
  const headingElement = element.querySelector('.glance-head .com-heading h2');
  const headingText = headingElement ? headingElement.textContent.trim() : 'No content available';

  // Handle cases where an iframe is present
  const iframe = element.querySelector('iframe');
  const iframeLink = iframe ? document.createElement('a') : null;
  if (iframe) {
    iframeLink.href = iframe.src;
    iframeLink.textContent = iframe.src;
  }

  // Create the table structure, dynamically including extracted content
  const contentRow = iframe ? [headingText, iframeLink] : [headingText];
  const cells = [
    headerRow,       // Header row for the block name
    contentRow       // Content row with heading text and iframe link (if present)
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}