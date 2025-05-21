/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Hero (hero27)'];

  // Extracting the video element with poster
  const videoElement = element.querySelector('video');

  let posterImage = null;
  if (videoElement && videoElement.getAttribute('poster')) {
    posterImage = document.createElement('img');
    posterImage.src = videoElement.getAttribute('poster');
  }

  // Extracting the headline (h1)
  const headline = element.querySelector('h1.video-text');

  let headlineElement = null;
  if (headline && headline.innerHTML.trim()) {
    headlineElement = document.createElement('h1');
    headlineElement.innerHTML = headline.innerHTML;
  }

  // Verifying that content is properly included and no empty rows are created
  const contentRow = [];
  if (posterImage) {
    contentRow.push(posterImage);
  }
  if (headlineElement) {
    contentRow.push(headlineElement);
  }

  const cells = [
    headerRow,
    contentRow.length > 0 ? [contentRow] : [document.createTextNode('Fallback content: Missing Poster or Headline')],
  ];

  // Replacing the original element with the structured block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(blockTable);
}