/* global WebImporter */
export default function parse(element, { document }) {
    // Define the header row
    const headerRow = ['Embed (embedSocial75)'];

    // Dynamically extract relevant content inside the element
    const content = element.querySelector(':scope > div');

    let extractedContent;
    if (content) {
        const heading = content.querySelector('h1');
        if (heading) {
            extractedContent = heading; // Preserve <h1> for semantic meaning
        } else {
            extractedContent = document.createElement('div');
            extractedContent.textContent = content.textContent.trim();
        }
    } else {
        console.error('No valid content found inside the element');
        return;
    }

    // Define table rows
    const rows = [
        headerRow,
        [extractedContent]
    ];

    // Create the table
    const block = WebImporter.DOMUtils.createTable(rows, document);

    // Replace the original element with the new block table
    element.replaceWith(block);
}