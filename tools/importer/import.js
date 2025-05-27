/*
 * Copyright 2024 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
/* global WebImporter */
/* eslint-disable no-console */
import columns9Parser from './parsers/columns9.js';
import embedVideo3Parser from './parsers/embedVideo3.js';
import hero5Parser from './parsers/hero5.js';
import cards11Parser from './parsers/cards11.js';
import search14Parser from './parsers/search14.js';
import embedSocial6Parser from './parsers/embedSocial6.js';
import hero1Parser from './parsers/hero1.js';
import tabs4Parser from './parsers/tabs4.js';
import hero15Parser from './parsers/hero15.js';
import hero19Parser from './parsers/hero19.js';
import columns10Parser from './parsers/columns10.js';
import tableNoHeader20Parser from './parsers/tableNoHeader20.js';
import hero21Parser from './parsers/hero21.js';
import tableNoHeader8Parser from './parsers/tableNoHeader8.js';
import accordion24Parser from './parsers/accordion24.js';
import cards23Parser from './parsers/cards23.js';
import cards26Parser from './parsers/cards26.js';
import hero17Parser from './parsers/hero17.js';
import columns25Parser from './parsers/columns25.js';
import cards28Parser from './parsers/cards28.js';
import hero27Parser from './parsers/hero27.js';
import hero2Parser from './parsers/hero2.js';
import cards18Parser from './parsers/cards18.js';
import cards33Parser from './parsers/cards33.js';
import embedVideo32Parser from './parsers/embedVideo32.js';
import cards34Parser from './parsers/cards34.js';
import cardsNoImages37Parser from './parsers/cardsNoImages37.js';
import cards38Parser from './parsers/cards38.js';
import embedSocial7Parser from './parsers/embedSocial7.js';
import hero39Parser from './parsers/hero39.js';
import columns22Parser from './parsers/columns22.js';
import columns35Parser from './parsers/columns35.js';
import columns42Parser from './parsers/columns42.js';
import tableStripedBordered41Parser from './parsers/tableStripedBordered41.js';
import hero40Parser from './parsers/hero40.js';
import cards44Parser from './parsers/cards44.js';
import columns30Parser from './parsers/columns30.js';
import carousel43Parser from './parsers/carousel43.js';
import tableNoHeader49Parser from './parsers/tableNoHeader49.js';
import columns46Parser from './parsers/columns46.js';
import columns48Parser from './parsers/columns48.js';
import hero47Parser from './parsers/hero47.js';
import cards31Parser from './parsers/cards31.js';
import embedSocial51Parser from './parsers/embedSocial51.js';
import cards53Parser from './parsers/cards53.js';
import embedVideo50Parser from './parsers/embedVideo50.js';
import columns55Parser from './parsers/columns55.js';
import cards54Parser from './parsers/cards54.js';
import cards29Parser from './parsers/cards29.js';
import cardsNoImages58Parser from './parsers/cardsNoImages58.js';
import carousel36Parser from './parsers/carousel36.js';
import tableStripedBordered52Parser from './parsers/tableStripedBordered52.js';
import embedVideo12Parser from './parsers/embedVideo12.js';
import carousel63Parser from './parsers/carousel63.js';
import columns57Parser from './parsers/columns57.js';
import hero61Parser from './parsers/hero61.js';
import columns65Parser from './parsers/columns65.js';
import hero56Parser from './parsers/hero56.js';
import carousel60Parser from './parsers/carousel60.js';
import embedVideo64Parser from './parsers/embedVideo64.js';
import columns69Parser from './parsers/columns69.js';
import cards72Parser from './parsers/cards72.js';
import cards45Parser from './parsers/cards45.js';
import cards74Parser from './parsers/cards74.js';
import columns71Parser from './parsers/columns71.js';
import cards68Parser from './parsers/cards68.js';
import cards76Parser from './parsers/cards76.js';
import carousel16Parser from './parsers/carousel16.js';
import columns67Parser from './parsers/columns67.js';
import columns66Parser from './parsers/columns66.js';
import carousel59Parser from './parsers/carousel59.js';
import cards81Parser from './parsers/cards81.js';
import carousel80Parser from './parsers/carousel80.js';
import carousel82Parser from './parsers/carousel82.js';
import cards62Parser from './parsers/cards62.js';
import tabs73Parser from './parsers/tabs73.js';
import embedSocial75Parser from './parsers/embedSocial75.js';
import columns70Parser from './parsers/columns70.js';
import headerParser from './parsers/header.js';
import metadataParser from './parsers/metadata.js';
import cleanupTransformer from './transformers/cleanup.js';
import imageTransformer from './transformers/images.js';
import linkTransformer from './transformers/links.js';
import { TransformHook } from './transformers/transform.js';
import {
  generateDocumentPath,
  handleOnLoad,
  TableBuilder,
  mergeInventory,
} from './import.utils.js';

const parsers = {
  metadata: metadataParser,
  columns9: columns9Parser,
  embedVideo3: embedVideo3Parser,
  hero5: hero5Parser,
  cards11: cards11Parser,
  search14: search14Parser,
  embedSocial6: embedSocial6Parser,
  hero1: hero1Parser,
  tabs4: tabs4Parser,
  hero15: hero15Parser,
  hero19: hero19Parser,
  columns10: columns10Parser,
  tableNoHeader20: tableNoHeader20Parser,
  hero21: hero21Parser,
  tableNoHeader8: tableNoHeader8Parser,
  accordion24: accordion24Parser,
  cards23: cards23Parser,
  cards26: cards26Parser,
  hero17: hero17Parser,
  columns25: columns25Parser,
  cards28: cards28Parser,
  hero27: hero27Parser,
  hero2: hero2Parser,
  cards18: cards18Parser,
  cards33: cards33Parser,
  embedVideo32: embedVideo32Parser,
  cards34: cards34Parser,
  cardsNoImages37: cardsNoImages37Parser,
  cards38: cards38Parser,
  embedSocial7: embedSocial7Parser,
  hero39: hero39Parser,
  columns22: columns22Parser,
  columns35: columns35Parser,
  columns42: columns42Parser,
  tableStripedBordered41: tableStripedBordered41Parser,
  hero40: hero40Parser,
  cards44: cards44Parser,
  columns30: columns30Parser,
  carousel43: carousel43Parser,
  tableNoHeader49: tableNoHeader49Parser,
  columns46: columns46Parser,
  columns48: columns48Parser,
  hero47: hero47Parser,
  cards31: cards31Parser,
  embedSocial51: embedSocial51Parser,
  cards53: cards53Parser,
  embedVideo50: embedVideo50Parser,
  columns55: columns55Parser,
  cards54: cards54Parser,
  cards29: cards29Parser,
  cardsNoImages58: cardsNoImages58Parser,
  carousel36: carousel36Parser,
  tableStripedBordered52: tableStripedBordered52Parser,
  embedVideo12: embedVideo12Parser,
  carousel63: carousel63Parser,
  columns57: columns57Parser,
  hero61: hero61Parser,
  columns65: columns65Parser,
  hero56: hero56Parser,
  carousel60: carousel60Parser,
  embedVideo64: embedVideo64Parser,
  columns69: columns69Parser,
  cards72: cards72Parser,
  cards45: cards45Parser,
  cards74: cards74Parser,
  columns71: columns71Parser,
  cards68: cards68Parser,
  cards76: cards76Parser,
  carousel16: carousel16Parser,
  columns67: columns67Parser,
  columns66: columns66Parser,
  carousel59: carousel59Parser,
  cards62: cards62Parser,
  tabs73: tabs73Parser,
  embedSocial75: embedSocial75Parser,
  columns70: columns70Parser,
  cards81: cards81Parser,
  carousel80: carousel80Parser,
  carousel82: carousel82Parser,
};

const transformers = {
  cleanup: cleanupTransformer,
  images: imageTransformer,
  links: linkTransformer,
};

WebImporter.Import = {
  findSiteUrl: (instance, siteUrls) => (
    siteUrls.find(({ id }) => id === instance.urlHash)
  ),
  transform: (hookName, element, payload) => {
    // perform any additional transformations to the page
    Object.entries(transformers).forEach(([, transformerFn]) => (
      transformerFn.call(this, hookName, element, payload)
    ));
  },
  getParserName: ({ name, key }) => key || name,
  getElementByXPath: (document, xpath) => {
    const result = document.evaluate(
      xpath,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null,
    );
    return result.singleNodeValue;
  },
  getFragmentXPaths: (
    { urls = [], fragments = [] },
    sourceUrl = '',
  ) => (fragments.flatMap(({ instances = [] }) => instances)
    .filter((instance) => {
      // find url in urls array
      const siteUrl = WebImporter.Import.findSiteUrl(instance, urls);
      if (!siteUrl) {
        return false;
      }
      return siteUrl.url === sourceUrl;
    })
    .map(({ xpath }) => xpath)),
};

const pageElements = [{ name: 'metadata' }];

/**
* Page transformation function
*/
function transformPage(main, { inventory, ...source }) {
  const { urls = [], blocks: inventoryBlocks = [] } = inventory;
  const { document, params: { originalURL } } = source;

  // get fragment elements from the current page
  const fragmentElements = WebImporter.Import.getFragmentXPaths(inventory, originalURL)
    .map((xpath) => WebImporter.Import.getElementByXPath(document, xpath))
    .filter((el) => el);

  // get dom elements for each block on the current page
  const blockElements = inventoryBlocks
    .flatMap((block) => block.instances
      .filter((instance) => WebImporter.Import.findSiteUrl(instance, urls)?.url === originalURL)
      .map((instance) => ({
        ...block,
        element: WebImporter.Import.getElementByXPath(document, instance.xpath),
      })))
    .filter((block) => block.element);

  // remove fragment elements from the current page
  fragmentElements.forEach((element) => {
    if (element) {
      element.remove();
    }
  });

  // before page transform hook
  WebImporter.Import.transform(TransformHook.beforePageTransform, main, { ...source });

  const tableBuilder = TableBuilder(WebImporter.DOMUtils.createTable);
  // transform all block elements using parsers
  [...pageElements, ...blockElements].forEach(({ element = main, ...pageBlock }) => {
    const parserName = WebImporter.Import.getParserName(pageBlock);
    const parserFn = parsers[parserName];
    if (!parserFn) return;
    try {
      // before parse hook
      WebImporter.Import.transform(TransformHook.beforeParse, element, { ...source });
      // parse the element
      WebImporter.DOMUtils.createTable = tableBuilder.build(parserName);
      parserFn.call(this, element, { ...source });
      WebImporter.DOMUtils.createTable = tableBuilder.restore();
      // after parse hook
      WebImporter.Import.transform(TransformHook.afterParse, element, { ...source });
    } catch (e) {
      console.warn(`Failed to parse block: ${pageBlock.key}`, e);
    }
  });
}

/**
* Fragment transformation function
*/
function transformFragment(main, { fragment, inventory, ...source }) {
  const { document, params: { originalURL } } = source;

  if (fragment.name === 'nav') {
    const navEl = document.createElement('div');

    // get number of blocks in the nav fragment
    const navBlocks = Math.floor(fragment.instances.length / fragment.instances.filter((ins) => ins.uuid.includes('-00-')).length);
    console.log('navBlocks', navBlocks);

    for (let i = 0; i < navBlocks; i += 1) {
      const { xpath } = fragment.instances[i];
      const el = WebImporter.Import.getElementByXPath(document, xpath);
      if (!el) {
        console.warn(`Failed to get element for xpath: ${xpath}`);
      } else {
        navEl.append(el);
      }
    }

    // body width
    const bodyWidthAttr = document.body.getAttribute('data-hlx-imp-body-width');
    const bodyWidth = bodyWidthAttr ? parseInt(bodyWidthAttr, 10) : 1000;

    try {
      const headerBlock = headerParser(navEl, {
        ...source, document, fragment, bodyWidth,
      });
      main.append(headerBlock);
    } catch (e) {
      console.warn('Failed to parse header block', e);
    }
  } else {
    const tableBuilder = TableBuilder(WebImporter.DOMUtils.createTable);

    (fragment.instances || [])
      .filter((instance) => {
        const siteUrl = WebImporter.Import.findSiteUrl(instance, inventory.urls);
        if (!siteUrl) {
          return false;
        }
        return `${siteUrl.url}#${fragment.name}` === originalURL;
      })
      .map(({ xpath }) => ({
        xpath,
        element: WebImporter.Import.getElementByXPath(document, xpath),
      }))
      .filter(({ element }) => element)
      .forEach(({ xpath, element }) => {
        main.append(element);

        const fragmentBlock = inventory.blocks
          .find(({ instances }) => instances.find((instance) => {
            const siteUrl = WebImporter.Import.findSiteUrl(instance, inventory.urls);
            return `${siteUrl.url}#${fragment.name}` === originalURL && instance.xpath === xpath;
          }));

        if (!fragmentBlock) return;
        const parserName = WebImporter.Import.getParserName(fragmentBlock);
        const parserFn = parsers[parserName];
        if (!parserFn) return;
        try {
          WebImporter.DOMUtils.createTable = tableBuilder.build(parserName);
          parserFn.call(this, element, source);
          WebImporter.DOMUtils.createTable = tableBuilder.restore();
        } catch (e) {
          console.warn(`Failed to parse block: ${fragmentBlock.key}, with xpath: ${xpath}`, e);
        }
      });
  }
}

export default {
  onLoad: async (payload) => {
    await handleOnLoad(payload);
  },

  transform: async (source) => {
    const { document, params: { originalURL } } = source;

    // sanitize the original URL
    /* eslint-disable no-param-reassign */
    source.params.originalURL = new URL(originalURL).href;

    /* eslint-disable-next-line prefer-const */
    let publishUrl = window.location.origin;
    // $$publishUrl = '{{{publishUrl}}}';

    let inventory = null;
    // $$inventory = {{{inventory}}};
    if (!inventory) {
      const siteUrlsUrl = new URL('/tools/importer/site-urls.json', publishUrl);
      const inventoryUrl = new URL('/tools/importer/inventory.json', publishUrl);
      try {
        // fetch and merge site-urls and inventory
        const siteUrlsResp = await fetch(siteUrlsUrl.href);
        const inventoryResp = await fetch(inventoryUrl.href);
        const siteUrls = await siteUrlsResp.json();
        inventory = await inventoryResp.json();
        inventory = mergeInventory(siteUrls, inventory, publishUrl);
      } catch (e) {
        console.error('Failed to merge site-urls and inventory');
      }
      if (!inventory) {
        return [];
      }
    }

    let main = document.body;

    // before transform hook
    WebImporter.Import.transform(TransformHook.beforeTransform, main, { ...source, inventory });
    WebImporter.rules.transformBackgroundImages(main, document);
    // perform the transformation
    let path = null;
    const sourceUrl = new URL(originalURL);
    const fragName = sourceUrl.hash ? sourceUrl.hash.substring(1) : '';
    if (fragName) {
      // fragment transformation
      const fragment = inventory.fragments.find(({ name }) => name === fragName);
      if (!fragment) {
        return [];
      }
      main = document.createElement('div');
      transformFragment(main, { ...source, fragment, inventory });
      path = fragment.path;
    } else {
      // page transformation
      transformPage(main, { ...source, inventory });
      path = generateDocumentPath(source, inventory);
    }

    // after transform hook
    WebImporter.Import.transform(TransformHook.afterTransform, main, { ...source, inventory });

    return [{
      element: main,
      path,
    }];
  },
};
