/* global WebImporter */
export default function parse(element, { document }) {
    // Helper function to extract background image URL
    const extractBackgroundImage = (el) => {
        const bgStyle = el.dataset.bg || el.style.backgroundImage;
        if (bgStyle) {
            const match = bgStyle.match(/url\(['"]?(.*?)['"]?\)/);
            return match ? match[1] : null;
        }
        return null;
    };

    // Extract the cards from the section
    const cards = element.querySelectorAll(':scope > section > div > div');

    const contentCells = Array.from(cards).map((card) => {
        const imageURL = extractBackgroundImage(card);
        const imageElement = imageURL ? document.createElement('img') : null;
        if (imageElement) {
            imageElement.src = imageURL;
            imageElement.alt = card.querySelector('.card-heading')?.textContent.trim() || '';
        }

        const heading = card.querySelector('.card-heading');
        const sustainabilityBox1 = card.querySelector('.sustainabilityBox1');
        const sustainabilityBox2 = card.querySelector('.sustainabilityBox2');
        const ctaLink = sustainabilityBox2?.querySelector('a');

        const content = [];

        if (imageElement) {
            content.push(imageElement);
        }

        if (heading) {
            const headingElement = document.createElement('h1');
            headingElement.textContent = heading.textContent.trim();
            content.push(headingElement);
        }

        if (sustainabilityBox1) {
            const subheadingElement = document.createElement('p');
            subheadingElement.innerHTML = sustainabilityBox1.innerHTML.trim();
            content.push(subheadingElement);
        }

        if (sustainabilityBox2) {
            const boxHeading = sustainabilityBox2.querySelector('h4');
            if (boxHeading) {
                const boxHeadingElement = document.createElement('h4');
                boxHeadingElement.textContent = boxHeading.textContent.trim();
                content.push(boxHeadingElement);
            }
        }

        if (ctaLink) {
            const ctaElement = document.createElement('a');
            ctaElement.href = ctaLink.href;
            ctaElement.textContent = ctaLink.textContent.trim();
            content.push(ctaElement);
        }

        return content;
    });

    const headerRow = ['Hero (hero1)'];
    const cells = [headerRow, ...contentCells.map((content) => [content])];

    const block = WebImporter.DOMUtils.createTable(cells, document);

    element.replaceWith(block);
}