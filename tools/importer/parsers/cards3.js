/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards3)'];
  const rows = [];

  // Extract all immediate child elements with initiatives-box class
  const cards = element.querySelectorAll('.swiper-wrapper .swiper-slide');

  cards.forEach((card) => {
    const image = card.querySelector('.image-box img');
    const title = card.querySelector('.overlay-text');
    const dateText = card.querySelector('.card-date-text').textContent.trim();
    const linkText = card.querySelector('.card-sub-text a').textContent.trim();
    const linkUrl = card.querySelector('.card-sub-text a').getAttribute('href');
    let description = '';
      // Create description using date and link
      if (dateText || linkText) {
        const description = document.createElement('div');
        description.classList.add('description');
        
        if (dateText) {
          const date = document.createElement('p');
          date.classList.add('date');
          date.textContent = dateText;
          description.appendChild(date);
        }
        
        if (linkText && linkUrl) {
          const link = document.createElement('a');
          link.textContent = linkText;
          link.href = linkUrl;
          description.appendChild(link);
        } else if (linkText) {
          const text = document.createElement('p');
          text.textContent = linkText;
          description.appendChild(text);
        }
      }
    // Create a row for each card
    rows.push([
      image,
      [title, description],
    ]);
  });

  const cells = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}