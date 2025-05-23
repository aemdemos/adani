/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards81)'];

  const rows = [...element.querySelectorAll(':scope > .swiper > .swiper-wrapper > .three-imgcardBox')].map((cardBox) => {
    // Extract image element
    const image = cardBox.querySelector('picture img');

    // Extract text content
    const cardTextBox = cardBox.querySelector('.card-text-box');
    const cardDateElement = cardTextBox.querySelector('.card-date-text');
    const cardTitleLink = cardTextBox.querySelector('.card-sub-text a');

    const textContent = [];

    // Handle date
    if (cardDateElement) {
      const dateElement = document.createElement('p');
      dateElement.textContent = cardDateElement.textContent.trim();
      textContent.push(dateElement);
    }

    // Handle title and link
    if (cardTitleLink) {
      const titleElement = document.createElement('strong');
      titleElement.textContent = cardTitleLink.textContent.trim();
      textContent.push(titleElement);

      const linkElement = document.createElement('a');
      linkElement.href = cardTitleLink.href;
      linkElement.textContent = cardTitleLink.href;
      textContent.push(linkElement);
    }

    return [image, textContent];
  });

  // Construct cells for table
  const cells = [headerRow, ...rows];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(blockTable);
}