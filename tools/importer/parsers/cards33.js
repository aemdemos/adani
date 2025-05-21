/* global WebImporter */
export default function parse(element, { document }) {
    const sectionChildren = element.querySelectorAll(':scope > div > div > div > div');

    const cells = [
        ['Cards (cards33)'],
    ];

    sectionChildren.forEach((child) => {
        const img = child.querySelector('img');
        const title = child.querySelector('h2');
        const link = child.querySelector('a');

        const imageElement = img ? img : '';
        const textContent = document.createElement('div');

        if (title) {
            const heading = document.createElement('h2');
            heading.textContent = title.textContent;
            textContent.appendChild(heading);
        }

        if (link) {
            const linkElement = document.createElement('a');
            linkElement.href = link.href;
            linkElement.textContent = link.textContent;
            textContent.appendChild(linkElement);
        }

        cells.push([imageElement, textContent]);
    });

    const block = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(block);
}