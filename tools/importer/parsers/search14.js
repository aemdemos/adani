/* global WebImporter */
export default function parse(element, { document }) {
    // Validate the presence of search-bar and query index URL
    const searchWrapper = element.querySelector('.search-bar.mob-search-icon');
    if (!searchWrapper) {
        console.error('Search wrapper not found in the provided element.');
        return;
    }

    // Hardcoded URL for query index
    const queryIndexURL = 'https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json';

    // Create header row dynamically, matching the example structure
    const headerRow = ['Search (search14)'];

    // Dynamically create query index link
    const queryLink = document.createElement('a');
    queryLink.href = queryIndexURL;
    queryLink.textContent = queryIndexURL;

    // Create table rows
    const cells = [
        headerRow,
        [queryLink]
    ];

    // Generate block table
    const blockTable = WebImporter.DOMUtils.createTable(cells, document);

    // Replace original element with the new block table
    element.replaceWith(blockTable);
}