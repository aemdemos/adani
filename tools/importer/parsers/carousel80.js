/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Carousel (carousel80)'];
  const rows = [];

  // Select all subcards (slides)
  const subcards = element.querySelectorAll(':scope > section > div.sustainabilityCompWrap > div.subcard');
  
  subcards.forEach((card) => {
    const imageSrc = card.getAttribute('data-bg');

    // Create image element dynamically
    const image = document.createElement('img');
    image.src = imageSrc;

    // Create content container
    const content = document.createElement('div');

    // Add card heading dynamically
    const heading = card.querySelector(':scope > div.card-heading');
    if (heading) {
      const h4 = document.createElement('h4');
      h4.textContent = heading.textContent.trim();
      content.appendChild(h4);
    }

    // Add sustainabilityBox2 content dynamically
    const box2 = card.querySelector(':scope > div.sustainabilityBoxWrap > div.sustainabilityBox2');
    if (box2) {
      const title = box2.querySelector('h4');
      if (title) {
        const h4 = document.createElement('h4');
        h4.textContent = title.textContent.trim();
        content.appendChild(h4);
      }

      const cta = box2.querySelector('a.sustainabilityBtn');
      if (cta) {
        const link = document.createElement('a');
        link.href = cta.href;
        link.textContent = cta.textContent.trim();
        content.appendChild(link);
      }
    }

    rows.push([image, content]);
  });

  // Create the table
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}