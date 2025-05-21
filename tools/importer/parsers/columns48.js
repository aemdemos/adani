/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns (columns48)'];

  // Get the immediate child elements of the block
  const childElements = [...element.querySelectorAll(':scope > div .three-imgcardBox')];

  // Parse content from child elements
  const columns = childElements.map((card) => {
    const image = card.querySelector('img');
    const textBox = card.querySelector('.card-sub-text');

    const imgEl = image ? image : null;
    const textEl = textBox ? textBox : null;

    return [imgEl, textEl];
  });

  const table = WebImporter.DOMUtils.createTable([headerRow, ...columns], document);

  element.replaceWith(table);
}