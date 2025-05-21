/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards76)'];
  const rows = [headerRow];

  // Extract content for the card
  const imageContainer = element.querySelector('.accordianHeadImg img');
  const image = document.createElement('img');
  image.src = imageContainer.getAttribute('src');
  image.alt = imageContainer.getAttribute('alt');

  const textContainer = element.querySelector('.accordianHeadText');
  const title = textContainer.querySelector('h3');
  const link = textContainer.querySelector('a');
  const paragraphs = textContainer.querySelectorAll('p');

  const textContent = document.createElement('div');
  if (title) {
    const titleElement = document.createElement('h3');
    titleElement.textContent = title.textContent;
    textContent.appendChild(titleElement);
  }

  if (link) {
    const linkElement = document.createElement('a');
    linkElement.href = link.href;
    linkElement.target = link.target;
    linkElement.textContent = link.textContent;
    textContent.appendChild(linkElement);
  }

  paragraphs.forEach((paragraph) => {
    const paragraphElement = document.createElement('p');
    paragraphElement.innerHTML = paragraph.innerHTML;
    textContent.appendChild(paragraphElement);
  });

  const cardRow = [image, textContent];
  rows.push(cardRow);

  // Create the table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}