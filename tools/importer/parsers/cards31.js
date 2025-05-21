/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row exactly as provided in the example markdown
  const headerRow = ['Cards (cards31)'];

  // Extract cards dynamically from the HTML
  const cards = Array.from(element.querySelectorAll('.row .col-lg-6')).map((col) => {
    const image = col.querySelector('figure img');
    const title = col.querySelector('.section-title');
    const description = col.querySelector('.covidInfoText');
    const cta = col.querySelector('aside a');

    const textContent = [];

    // Add title if it exists, keeping the semantic meaning
    if (title) {
      const titleElement = document.createElement('h3');
      titleElement.textContent = title.textContent.trim();
      textContent.push(titleElement);
    }

    // Add description if it exists
    if (description) {
      const paragraphElement = document.createElement('p');
      paragraphElement.textContent = description.textContent.trim();
      textContent.push(paragraphElement);
    }

    // Add call-to-action link if it exists
    if (cta) {
      const linkElement = document.createElement('a');
      linkElement.href = cta.href;
      linkElement.textContent = cta.textContent.trim();
      textContent.push(linkElement);
    }

    return [image, textContent];
  });

  // Combine header row and cards into table data
  const tableData = [headerRow, ...cards];

  // Create the block table using the helper function
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the structured table block
  element.replaceWith(blockTable);
}