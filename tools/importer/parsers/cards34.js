/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards34)'];
  const rows = [headerRow];

  const items = element.querySelectorAll(':scope > ul > li');

  items.forEach((item) => {
    const image = item.querySelector('picture img');
    const link = item.querySelector('a');

    const imageElement = image ? image.cloneNode(true) : null;
    const linkText = link ? document.createElement('div') : null;
    if (linkText) {
      linkText.innerHTML = link.querySelector('.overlay-text').innerHTML;
    }

    const linkElement = link ? document.createElement('a') : null;
    if (linkElement) {
      linkElement.href = link.href;
      linkElement.target = link.target;
      linkElement.append(linkText);
    }

    rows.push([imageElement, linkElement]);
  });

  const block = WebImporter.DOMUtils.createTable(rows, document);

  element.replaceWith(block);
}