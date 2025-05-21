/* global WebImporter */
export default function parse(element, { document }) {
    const headerRow = ['Accordion (accordion24)'];

    // Fetch all immediate child <li> elements under the top-level <ul>
    const listItems = element.querySelectorAll(':scope > li');

    const rows = Array.from(listItems).map((item) => {
        // Extract title from the nav-link
        const titleElement = item.querySelector('a.nav-link');

        // Extract content from dropdown-menu if available
        const contentElement = item.querySelector('.dropdown-menu');
        const contentItems = contentElement ? contentElement.querySelectorAll('li a') : [];

        // Create an array of links for content
        const contentLinks = Array.from(contentItems).map((link) => {
            const anchor = document.createElement('a');
            anchor.href = link.href;
            anchor.textContent = link.textContent;
            return anchor;
        });

        // Title cell and Content cell
        return [titleElement, contentLinks];
    });

    // Create table
    const cells = [headerRow, ...rows];
    const blockTable = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element
    element.replaceWith(blockTable);
}