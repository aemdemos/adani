/* global WebImporter */
export default function parse(element, { document }) {
  // Extract image slides from the left section
  const leftSection = element.querySelector(':scope .growth-left-sec');
  const slides = Array.from(leftSection.querySelectorAll('.leftimage img'));

  // Extract text content from the right section
  const rightSection = element.querySelector(':scope .growth-right-sec');
  const heading = rightSection.querySelector('.growth-heading');
  const subtext = rightSection.querySelector('.growth-subtext blockquote');
  const name = rightSection.querySelector('.info .name');
  const designation = rightSection.querySelector('.info .designation');

  // Create structured rows for the table
  const rows = slides.map((slide) => [
    slide,
    [
      heading ? heading.cloneNode(true) : '',
      subtext ? subtext.cloneNode(true) : '',
      name ? name.cloneNode(true) : '',
      designation ? designation.cloneNode(true) : '',
    ],
  ]);

  // Define header row
  const headerRow = ['Carousel (carousel60)'];

  // Combine header and content rows
  const cells = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}