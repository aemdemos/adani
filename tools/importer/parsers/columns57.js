/* global WebImporter */
export default function parse(element, { document }) {
  // Extract all slides within the Swiper wrapper
  const slides = Array.from(element.querySelectorAll(':scope > div.swiper > div.swiper-wrapper > div.four-imgcardBox'));

  // Check for edge cases: If no slides exist, return the element unchanged
  if (!slides.length) {
    return element;
  }

  // Map extracted child elements into table rows
  const rows = slides.map((slide) => {
    const imageBox = slide.querySelector('.image-box picture img');
    const cardHeading = slide.querySelector('.card-text-box .card-text-heading');
    const link = slide.querySelector('a');

    const imageElement = imageBox ? imageBox.cloneNode(true) : document.createTextNode('No image available'); // Handle missing image
    const headingContent = cardHeading ? cardHeading.textContent.trim() : 'No heading available'; // Handle missing heading
    const headingElement = document.createElement('div');
    headingElement.textContent = headingContent;

    const linkElement = link && link.href ? document.createElement('a') : document.createTextNode('No link available');
    if (link && link.href) {
      linkElement.href = link.href;
      linkElement.textContent = 'Learn more';
    }

    return [imageElement, headingElement, linkElement];
  });

  // Create header row
  const headerRow = ['Columns (columns57)'];

  // Combine header and rows
  const tableData = [headerRow, ...rows];

  // Create table block
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace original element with new block
  element.replaceWith(block);
}