/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the image from the source element
  const imageElement = element.querySelector(':scope > div > div.accordianHeadImg img');
  const image = document.createElement('img');
  image.src = imageElement.getAttribute('src');
  image.alt = imageElement.getAttribute('alt');

  // Extract the text content from the source element
  const textWrapper = element.querySelector(':scope > div > div.accordianHeadText');
  const heading = textWrapper.querySelector('h3');
  const link = textWrapper.querySelector('a');
  const paragraphs = textWrapper.querySelectorAll('p');

  // Create the content cell dynamically
  const contentCell = document.createElement('div');
  if (heading) {
    const headingElement = document.createElement('h3');
    headingElement.textContent = heading.textContent;
    contentCell.appendChild(headingElement);
  }
  if (link) {
    const linkElement = document.createElement('a');
    linkElement.href = link.getAttribute('href');
    linkElement.target = link.getAttribute('target');
    linkElement.textContent = link.textContent;
    contentCell.appendChild(linkElement);
  }
  paragraphs.forEach(paragraph => {
    const paragraphElement = document.createElement('p');
    paragraphElement.innerHTML = paragraph.innerHTML;
    contentCell.appendChild(paragraphElement);
  });

  // Create the table rows based on the example
  const headerRow = ['Cards (cards18)'];
  const contentRow = [image, contentCell];

  // Use WebImporter.DOMUtils.createTable to create the table
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace the original element with the constructed table
  element.replaceWith(table);
}