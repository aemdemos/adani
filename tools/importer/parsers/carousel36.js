/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract slide content
  function getSlideContent(slideElement) {
    const imageSrc = slideElement.querySelector('.img-box')?.getAttribute('data-thumb');
    const titleElement = slideElement.querySelector('.title');
    const title = titleElement ? document.createElement('h2') : null;
    if (title) {
      const strongElement = document.createElement('strong');
      strongElement.textContent = titleElement.textContent.trim();
      title.appendChild(strongElement);
    }

    const paragraphElement = slideElement.querySelector('.pargraph');
    const paragraph = paragraphElement ? document.createElement('p') : null;
    if (paragraph) {
      paragraph.textContent = paragraphElement.textContent.trim();
    }

    const btnElement = slideElement.querySelector('.btns-wrap a');
    const btnLink = btnElement ? document.createElement('a') : null;
    if (btnLink) {
      btnLink.setAttribute('href', btnElement.href);
      btnLink.setAttribute('target', btnElement.target);
      btnLink.textContent = btnElement.textContent.trim();
    }

    const textContent = document.createElement('div');
    if (title) textContent.appendChild(title);
    if (paragraph) textContent.appendChild(paragraph);
    if (btnLink) textContent.appendChild(btnLink);

    const imageElement = document.createElement('img');
    imageElement.setAttribute('src', imageSrc);

    return [imageElement, textContent];
  }

  // Select unique slides only
  const slides = element.querySelectorAll('.swiper-slide');
  const rows = Array.from(slides).map(slide => getSlideContent(slide));

  // Add header row
  const headerRow = ['Carousel (carousel36)'];

  const tableData = [headerRow, ...rows.map(([image, textContent]) => [image, textContent])];
  
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  element.replaceWith(blockTable);
}