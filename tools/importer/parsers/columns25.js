/* global WebImporter */
export default function parse(element, { document }) {
  // Fixing header row issue
  const headerRow = ['Columns (columns25)'];

  // Extract logo images from the footer-left section
  const footerLeft = element.querySelector('.footer-left');
  const footerLogo = footerLeft?.querySelector('.footer-logo');
  const logoImages = [];

  footerLogo?.querySelectorAll('img').forEach((img) => {
    logoImages.push(img);
  });

  // Extract social links from the footer-left section
  const footerSocialLinks = footerLeft?.querySelector('.footer-social-links ul');
  const socialLinks = [];

  footerSocialLinks?.querySelectorAll('li > a').forEach((anchor) => {
    socialLinks.push(anchor);
  });

  // Extract column links from the footer-right section
  const footerRight = element.querySelector('.footer-right');
  const footerColumns = [];

  footerRight?.querySelectorAll('.footer-col-links').forEach((column) => {
    const heading = column.querySelector('.footer-head a');
    const links = column.querySelectorAll('.footer-sub-link li > a');

    const columnContent = [];
    if (heading) columnContent.push(heading);

    links.forEach((link) => {
      columnContent.push(link);
    });

    footerColumns.push(columnContent);
  });

  // Build table rows dynamically with semantic grouping
  const cells = [
    headerRow,
    [
      [footerLogo, ...logoImages, ...socialLinks],
      footerColumns.map((col) => {
        const group = document.createElement('div');
        col.forEach((item) => group.appendChild(item));
        return group; // Semantic grouping maintained
      }),
    ],
  ];

  // Create block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the new block table
  element.replaceWith(blockTable);
}