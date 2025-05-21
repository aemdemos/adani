/* global WebImporter */
export default function parse(element, { document }) {
    const rows = [];

    // Header row
    const headerRow = ['Columns (columns30)'];
    rows.push(headerRow);

    // Content rows
    const contentRow = [];
    const items = element.querySelectorAll(':scope .vaccordion-panel');

    items.forEach((item) => {
        const textContent = item.querySelector('.vaccordion-slide-text');
        const imgElement = item.querySelector('img');

        const columnContent = []; // Combine textContent and imgElement directly into one cell
        if (textContent) {
            columnContent.push(...Array.from(textContent.childNodes));
        }
        if (imgElement) {
            columnContent.push(imgElement);
        }

        contentRow.push(columnContent); // Ensure no additional wrapping div
    });

    rows.push(contentRow);

    // Create the table
    const table = WebImporter.DOMUtils.createTable(rows, document);

    // Replace the element
    element.replaceWith(table);
}