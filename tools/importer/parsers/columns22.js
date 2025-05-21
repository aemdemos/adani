/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['<strong>Columns (columns22)</strong>'];

  // Select column containers dynamically
  const columns = Array.from(element.querySelectorAll(':scope > div.footerPanel2 > div'));

  // Process each column: extract links, headings, and text
  const rows = columns.map((col) => {
    const headingLink = col.querySelector('h5 > a');
    const listItems = Array.from(col.querySelectorAll('ul > li > a')).map((link) => link);

    // Include heading before list items, if it exists
    if (headingLink) {
      return [[headingLink, ...listItems]];
    } else {
      return [[...listItems]];
    }
  });

  // Extract footer content dynamically
  const footerContent = element.querySelector(':scope > div.footerPanel2 > div.ft-logo');
  const logoImage = footerContent.querySelector('img.img-fluid');
  const address = footerContent.querySelector('p span');
  const socialLinks = Array.from(footerContent.querySelectorAll('ul.ft-social > li > a')).map((link) => link);
  const googleMapsLink = footerContent.querySelector('p a');

  // Combine footer elements into a single cell
  const footerRow = [[logoImage, address, ...socialLinks, googleMapsLink]];

  // Create table cells array
  const cells = [headerRow, ...rows.flat(), footerRow];

  // Create the table using WebImporter helper function
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the new table
  element.replaceWith(table);
}