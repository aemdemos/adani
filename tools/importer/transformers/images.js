/*
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import { TransformHook } from './transform.js';

function adjustImageUrls(main, url, current) {
  [...main.querySelectorAll('img')].forEach((img) => {
    let src = img.getAttribute('src');
    if (src) {
      // remove all parameters from image URLs (after .png, .jpg, .jpeg, .gif, .webp, .svg, .bmp, .ico)
      const imageExtensions = /\.(png|jpg|jpeg|gif|webp|svg|bmp|ico)(\?|&)/i;
      if (imageExtensions.test(src)) {
        try {
          const urlObj = new URL(src);
          // check if the pathname ends with an image extension
          const pathExtensions = /\.(png|jpg|jpeg|gif|webp|svg|bmp|ico)$/i;
          if (pathExtensions.test(urlObj.pathname)) {
            // remove all query parameters and hash for image files
            src = `${urlObj.origin}${urlObj.pathname}`;
            img.setAttribute('src', src);
          }
        } catch (e) {
          // if URL parsing fails, try simple string replacement as fallback
          // remove everything after image extension including ? and # and &amp;
          src = src.replace(/(\.(png|jpg|jpeg|gif|webp|svg|bmp|ico))(\?|&|#).*$/i, '$1');
          img.setAttribute('src', src);
        }
      }

      // handle relative URLs that are not starting with ./ or / or ../
      try {
        /* eslint-disable no-new */
        new URL(src);
      } catch (e) {
        if (!src.startsWith('/')) {
          // enforce transform image url to relative url
          src = `./${src}`;
        }
      }

      try {
        if (src.startsWith('./') || src.startsWith('/') || src.startsWith('../')) {
          // transform relative URLs to absolute URLs
          const targetUrl = new URL(src, url);
          // eslint-disable-next-line no-param-reassign
          img.src = targetUrl.toString();
        } else if (current) {
          // also transform absolute URLs to current host
          const currentSrc = new URL(src);
          const currentUrl = new URL(current);
          if (currentSrc.host === currentUrl.host) {
            // if current host is same than src host, switch src host with url host
            // this is the case for absolutes URLs pointing to the same host
            const targetUrl = new URL(url);
            const newSrc = new URL(`${currentSrc.pathname}${currentSrc.search}${currentSrc.hash}`, `${targetUrl.protocol}//${targetUrl.host}`);
            // eslint-disable-next-line no-param-reassign
            img.src = newSrc.toString();
          }
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(`Unable to adjust image URL ${img.src} - removing image`);
        img.remove();
      }
    }
  });
}

export default function transform(hookName, element, { url, originalURL }) {
  if (hookName === TransformHook.beforeTransform) {
    // adjust image urls
    adjustImageUrls(element, url, originalURL);
  }
}
