/* global WebImporter */
export default function parse(element, { document }) {
    const headerRow = ['Columns (columns71)'];

    const cells = [headerRow];

    const boxes = element.querySelectorAll(':scope > div.our-presence-box');

    const row = Array.from(boxes).map((box) => {
        const image = box.querySelector('.image-box img');
        const link = box.querySelector('.text-box a');

        const imageElement = image ? image : null; // Handle missing images gracefully
        const linkElement = link ? link : null; // Handle missing links gracefully

        return [
            imageElement, // Add image element as-is
            linkElement // Add link element as-is
        ];
    });

    cells.push(...row);

    const blockTable = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(blockTable);
}