/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards74)'];

  const slides = element.querySelectorAll(':scope .swiper-slide');

  const rows = Array.from(slides).map((slide) => {
    const image = slide.querySelector('picture img');
    const title = slide.querySelector('h4');
    const description = slide.querySelector('p');
    const link = slide.querySelector('a');

    const textContent = [];
    if (title) {
      textContent.push(document.createElement('strong'));
      textContent.push(title);
    }
    if (description) {
      textContent.push(description);
    }
    if (link) {
      const linkElement = document.createElement('a');
      linkElement.href = link.href;
      linkElement.textContent = link.textContent;
      textContent.push(linkElement);
    }

    return [image, textContent];
  });

  const cells = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(block);
}