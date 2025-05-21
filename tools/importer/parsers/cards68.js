/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards68)'];

  // Select all immediate child elements of the block
  const slides = element.querySelectorAll(':scope > div.swiper > div.swiper-wrapper > div.two-imgeSlideBox');

  const rows = Array.from(slides).map((slide) => {
    // Extract the image element
    const img = slide.querySelector('picture img');

    // Extract the title and link
    const titleLinkElement = slide.querySelector('.slide-text-box .slide-sub-text a');
    const title = titleLinkElement ? titleLinkElement.textContent.trim() : '';
    const link = titleLinkElement ? document.createElement('a') : null;
    
    if (link) {
      link.href = titleLinkElement.href;
      link.textContent = title;
    }

    const imageCell = img;
    const textCell = link;

    return [imageCell, textCell];
  });

  const tableData = [headerRow, ...rows];

  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}