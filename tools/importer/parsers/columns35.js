/* global WebImporter */
export default function parse(element, { document }) {
    const headerRow = ['Columns (columns35)'];

    // Extract and structure image dynamically
    const imageBox = element.querySelector(':scope > .image-box picture img');
    const imageElement = imageBox ? imageBox.cloneNode(true) : null;

    // Extract and structure text content dynamically
    const titleHeading = element.querySelector(':scope > .bottom-text-box .title-heading');
    const textBox = element.querySelector(':scope > .bottom-text-box .text-box');
    const textItems = textBox ? [...textBox.querySelectorAll('li')].map(li => li.textContent) : [];

    const textContent = document.createElement('div');
    if (titleHeading) textContent.appendChild(titleHeading.cloneNode(true));
    textItems.forEach(item => {
        const paragraph = document.createElement('p');
        paragraph.textContent = item;
        textContent.appendChild(paragraph);
    });

    // Extract and structure Read More link dynamically
    const readMoreBtn = element.querySelector(':scope > .bottom-text-box .readmre-btn');
    const readMoreLink = readMoreBtn ? document.createElement('a') : null;
    if (readMoreLink) {
        readMoreLink.href = '#';
        readMoreLink.textContent = readMoreBtn.dataset.more || 'Read More';
    }

    // Combine structured content into rows dynamically
    const rows = [headerRow];
    const contentRow = []; // Content row for images, text, and links

    if (imageElement) contentRow.push(imageElement);
    if (textContent.childNodes.length) contentRow.push(textContent);
    if (readMoreLink) contentRow.push(readMoreLink);

    rows.push([contentRow]);

    // Create block table
    const blockTable = WebImporter.DOMUtils.createTable(rows, document);

    // Replace original element with block table
    element.replaceWith(blockTable);
}