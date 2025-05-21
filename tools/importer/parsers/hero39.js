/* global WebImporter */

export default function parse(element, { document }) {
  // Extract the image element
  const imageWrapper = element.querySelector('.timeline_img picture img');

  // Extract the heading
  const headingWrapper = element.querySelector('.timeline-heading');
  const heading = headingWrapper ? headingWrapper.textContent.trim() : '';

  // Extract the subheading
  const subheadingWrapper = element.querySelector('.timeline-text');
  const subheading = subheadingWrapper ? subheadingWrapper.textContent.trim() : '';

  // Extract the CTA link
  const ctaWrapper = element.querySelector('.view-time-btn');
  const ctaLink = ctaWrapper ? ctaWrapper.href : '';
  const ctaText = ctaWrapper ? ctaWrapper.textContent.trim() : '';

  // Prepare the header row
  const headerRow = ['Hero (hero39)'];

  // Prepare the content row
  const contentRow = [];

  if (imageWrapper) {
    contentRow.push(imageWrapper);
  }

  const headingElement = document.createElement('h1');
  headingElement.textContent = heading;
  contentRow.push(headingElement);

  const subheadingElement = document.createElement('p');
  subheadingElement.textContent = subheading;
  contentRow.push(subheadingElement);

  if (ctaLink) {
    const ctaElement = document.createElement('a');
    ctaElement.href = ctaLink;
    ctaElement.textContent = ctaText;
    contentRow.push(ctaElement);
  }

  const tableData = [headerRow, [contentRow]];

  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  element.replaceWith(blockTable);
}