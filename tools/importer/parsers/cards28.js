/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards28)'];

  // Extract columns with immediate children
  const columns = element.querySelectorAll(':scope > div > div > div.menu-column');

  const rows = Array.from(columns).flatMap((column) => 
    Array.from(column.querySelectorAll('.column-head')).map((item) => {
      const link = item.querySelector('a');

      // Validate and dynamically extract title and link
      const title = link ? link.textContent.trim() : '';
      const href = link ? link.href : '';

      // Create content structure preserving semantic meaning
      const contentDiv = document.createElement('div');
      const heading = document.createElement('h3');
      heading.textContent = title;
      if (title) contentDiv.appendChild(heading);

      const description = document.createElement('p');
      description.textContent = href;
      if (href) contentDiv.appendChild(description);

      const cell = [contentDiv];

      return cell;
    })
  );

  const cells = [headerRow, ...rows];

  // Create and replace the table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}