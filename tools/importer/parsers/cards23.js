/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards23)'];

  const rows = Array.from(element.querySelectorAll(':scope > div > ul > li')).map((li) => {
    const imageContainer = li.querySelector('.joinus-img picture img');
    const image = imageContainer.cloneNode(true);

    const textContainer = li.querySelector('a .joinus-overlay-text');
    const title = document.createElement('div');

    title.style.fontWeight = 'bold';
    title.textContent = textContainer ? textContainer.textContent.trim() : '';

    const link = li.querySelector('a');


    return [image, [title]];
  });

  const tableCells = [headerRow, ...rows];

  const block = WebImporter.DOMUtils.createTable(tableCells, document);

  element.replaceWith(block);
}