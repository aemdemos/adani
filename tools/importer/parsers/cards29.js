/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards29)']; // Header row as specified

  const rows = []; // Initialize rows array

  // Extract dropdown links and nested structures
  const dropdown = element.querySelector('.business_dropdown');
  if (dropdown) {
    const dropdownLinks = Array.from(dropdown.querySelectorAll('a')).map((link) => {
      const img = link.querySelector('img');
      const label = link.querySelector('label');

      const linkContent = document.createElement('div');
      if (img) {
        linkContent.appendChild(img);
      }
      if (label) {
        const labelText = document.createElement('strong');
        labelText.textContent = label.textContent.trim();
        linkContent.appendChild(labelText);
      }

      const anchor = document.createElement('a');
      anchor.href = link.href;
      anchor.textContent = link.href; // Add href as text for clarity
      linkContent.appendChild(anchor);

      return [linkContent];
    });

    rows.push(...dropdownLinks); // Add dropdown links as separate rows
  }

  // Extract other content (e.g., header elements)
  const contactInfo = element.querySelector('.contact_info');
  if (contactInfo) {
    const img = contactInfo.querySelector('img');
    const phoneLink = contactInfo.querySelector('a');

    const content = document.createElement('div');
    if (img) {
      content.appendChild(img);
    }
    if (phoneLink) {
      const phoneAnchor = document.createElement('a');
      phoneAnchor.href = phoneLink.href;
      phoneAnchor.textContent = phoneLink.textContent.trim();
      content.appendChild(phoneAnchor);
    }

    rows.push([content]);
  }

  const tableData = [headerRow, ...rows]; // Combine header and rows

  const blockTable = WebImporter.DOMUtils.createTable(tableData, document); // Create the table
  element.replaceWith(blockTable); // Replace the original element
}