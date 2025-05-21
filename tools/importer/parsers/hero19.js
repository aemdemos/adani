/* global WebImporter */
export default function parse(element, { document }) {
  // Extract image element
  const picture = element.querySelector(':scope picture');
  const img = picture.querySelector('img');

  // Extract content elements
  const bannerContent = element.querySelector(':scope .bannercontent_inner');
  const heading = bannerContent?.querySelector('h1');
  const subheading = bannerContent?.querySelector('p');

  // Handle edge cases for missing elements
  const tableContent = [];
  if (img) tableContent.push(img);
  if (heading) tableContent.push(heading);
  if (subheading) tableContent.push(subheading);

  // Build the table structure
  const headerRow = ['Hero (hero19)'];
  const contentRow = [tableContent];

  const blockTable = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}