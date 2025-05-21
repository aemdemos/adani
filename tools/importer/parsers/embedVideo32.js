/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row exactly as specified
  const headerRow = ['Embed (embedVideo32)'];

  const contentRow = [];

  // Extract the select box content and its options in a readable format
  const selectBox = element.querySelector('select');
  if (selectBox) {
    const selectContent = [];

    // Add the displayed value if available
    const displayedValue = element.querySelector('.selectCountryCodeValDisplay');
    if (displayedValue) {
      const displayedText = document.createElement('div');
      displayedText.textContent = `Displayed Value: ${displayedValue.textContent}`;
      selectContent.push(displayedText);
    }

    // Add all options as separate divs for clarity
    const options = selectBox.querySelectorAll('option');
    options.forEach(option => {
      const optionDiv = document.createElement('div');
      optionDiv.textContent = `Option: ${option.textContent}`;
      selectContent.push(optionDiv);
    });

    contentRow.push(selectContent);
  }

  // Verify content is not empty before proceeding
  if (contentRow.length === 0) {
    console.warn('No content found for parsing');
    return;
  }

  // Create cells array with header and content rows
  const cells = [
    headerRow,
    [contentRow.flat()] // Flatten array to ensure proper structure
  ];

  // Generate the block table using the helper function
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the new block table
  element.replaceWith(block);
}