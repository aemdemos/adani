/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Carousel (carousel61)'];

  // Select all immediate child elements of the block
  const slides = Array.from(element.querySelectorAll(':scope > div.swiper > div.swiper-wrapper > div.swiper-slide'));

  // Transform child elements into rows for the table
  const rows = slides.map((slide) => {
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

      return [...(imageElement ? [imageElement] : []), ...(title ? [title] : [])];
    });

  // Create the table
  const cells = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the new table
  element.replaceWith(block);
}