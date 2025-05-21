/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards54)'];
  const rows = [headerRow];

  // Get all initiative boxes within the element
  const cards = element.querySelectorAll(':scope > .initiatives-box');

  cards.forEach((card) => {
    const imageBox = card.querySelector('.image-box img');
    const bottomTextBox = card.querySelector('.bottom-text-box');
    const titleHeading = bottomTextBox.querySelector('.title-heading');
    const textBox = bottomTextBox.querySelector('.text-box p');

    // Ensure we have valid elements before proceeding
    const imageCell = imageBox ? imageBox : document.createElement('div');
    const textCell = [];
    
    if (titleHeading && titleHeading.textContent.trim()) {
      const titleElement = document.createElement('strong');
      titleElement.textContent = titleHeading.textContent.trim();
      textCell.push(titleElement);
    }

    if (textBox && textBox.textContent.trim()) {
      const descriptionElement = document.createElement('p');
      descriptionElement.textContent = textBox.textContent.trim();
      textCell.push(descriptionElement);
    }

    rows.push([imageCell, textCell]);
  });

  // Create and replace the table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}