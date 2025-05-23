/* global WebImporter */
export default function parse(element, { document }) {
  const slides = element.querySelectorAll(':scope > div > div.swiper-wrapper > div.swiper-slide');

  const headerRow = ['Carousel (carousel82)'];

  const cells = [headerRow];

  slides.forEach((slide) => {
    const imageBox = slide.querySelector(':scope .img-box');
    const textWrapper = slide.querySelector(':scope .text-wraper');

    let image = null;
    if (imageBox) {
      const imageUrl = imageBox.getAttribute('data-thumb');
      image = document.createElement('img');
      image.src = imageUrl;
    }

    const textContent = document.createElement('div');

    if (textWrapper) {
      const title = textWrapper.querySelector(':scope .title');
      const paragraph = textWrapper.querySelector(':scope .pargraph');
      const button = textWrapper.querySelector(':scope .btns-wrap a');

      if (title) {
        const heading = document.createElement('h2');
        heading.textContent = title.textContent.trim();
        textContent.appendChild(heading);
      }

      if (paragraph) {
        const paragraphEl = document.createElement('p');
        paragraphEl.textContent = paragraph.textContent.trim();
        textContent.appendChild(paragraphEl);
      }

      if (button) {
        const link = document.createElement('a');
        link.href = button.href;
        link.textContent = button.textContent.trim();
        textContent.appendChild(link);
      }
    }

    cells.push([image, textContent]);
  });

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(blockTable);
}