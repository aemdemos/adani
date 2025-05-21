/* global WebImporter */
export default function parse(element, { document }) {
  // Ensure the header row matches the example exactly
  const headerRow = ['Hero (hero61)'];

  // Extract relevant data from the element
  const slides = element.querySelectorAll(':scope > div.swiper > div.swiper-wrapper > div.swiper-slide');

  const contentRow = slides.length ? [
    Array.from(slides).flatMap(slide => {
      const slideWrap = slide.querySelector(':scope > div.slideWrap');
      const imgBox = slideWrap.querySelector(':scope > div.img-box');
      const textWrap = slideWrap.querySelector(':scope > div.text-wraper');

      const title = textWrap ? textWrap.querySelector(':scope > div.title') : null;
      const paragraph = textWrap ? textWrap.querySelector(':scope > div.pargraph') : null;
      const ctaLink = textWrap ? textWrap.querySelector(':scope > div.btns-wrap > a') : null;

      const imageSrc = imgBox ? imgBox.style.backgroundImage.match(/url\("(.*?)"\)/)?.[1] : null;
      const imageElement = imageSrc ? (() => {
        const img = document.createElement('img');
        img.src = imageSrc;
        return img;
      })() : null;

      const linkElement = ctaLink ? (() => {
        const link = document.createElement('a');
        link.href = ctaLink.href;
        link.textContent = ctaLink.textContent;
        return link;
      })() : null;

      return [...(imageElement ? [imageElement] : []), ...(title ? [title] : []), ...(paragraph ? [paragraph] : []), ...(linkElement ? [linkElement] : [])];
    })
  ] : [];

  const cells = [
    headerRow, // Header row
    [contentRow.flat()] // Content row with a single cell containing all elements
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}