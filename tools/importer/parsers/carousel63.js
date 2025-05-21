/* global WebImporter */
export default function parse(element, { document }) {
    const headerRow = ['Carousel (carousel63)'];

    // Collect slides from both text and image containers
    const textSlides = Array.from(element.querySelectorAll(':scope > div.TextWithImageSliderWrap_text > div > div.TextWithImageSlider-box'));
    const imageSlides = Array.from(element.querySelectorAll(':scope > div.TextWithImageSliderWrap > div.oneAndHalfSlideWrapp > div.image-box'));

    const rows = textSlides.map((textSlide, index) => {
        const textContent = textSlide.querySelector(':scope > div.subText-wrap > div.subtext-box');
        const link = textSlide.querySelector(':scope > div.subText-wrap > div.watch-btn > a');
        const image = imageSlides[index]?.querySelector('img');

        const textCell = [];
        if (textContent) {
            textCell.push(textContent);
        }

        if (link) {
            const linkElement = document.createElement('a');
            linkElement.href = link.href;
            linkElement.textContent = link.textContent;
            textCell.push(linkElement);
        }

        return [image, textCell];
    });

    const tableData = [headerRow, ...rows];
    const table = WebImporter.DOMUtils.createTable(tableData, document);

    element.replaceWith(table);
}