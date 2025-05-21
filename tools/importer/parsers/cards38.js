/* global WebImporter */
export default function parse(element, { document }) {
    const headerRow = ['Cards (cards38)'];

    const cards = Array.from(element.querySelectorAll(':scope .leadership-profile-div'));

    const rows = cards.map((card) => {
        const img = card.querySelector('img');
        const name = card.querySelector('.leadership-profile-name h3');
        const designation = card.querySelector('.leadership-profile-designation');
        const link = card.querySelector('a')?.getAttribute('href');

        const content = [];

        if (name) {
            content.push(name);
        }

        if (designation) {
            content.push(designation);
        }

        if (link) {
            const linkElement = document.createElement('a');
            linkElement.href = link;
            linkElement.textContent = 'Learn more';
            content.push(linkElement);
        }

        return [img, content];
    });

    const tableData = [headerRow, ...rows];

    const table = WebImporter.DOMUtils.createTable(tableData, document);

    element.replaceWith(table);
}