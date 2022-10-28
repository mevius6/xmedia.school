/**
 * @fileoverview This file contains the configuration for dynamically
 * loading modules.
 *
 * * * *
 *
 * [spec]: https://tc39.es/proposal-dynamic-import/
 * [repo]: https://github.com/tc39/proposal-dynamic-import
 *
 * @see `import()` [Specification][spec] and [Repository][repo]
 */

const parsedUrl = new URL(window.location.href);
const doc = document, { documentElement: root } = doc;

/* eslint-disable no-unused-vars */

(async () => {
  const toggle = await import('./modules/theme-switcher.js').then(() => {
    const themeSwitch = doc.querySelector('theme-switch');
    root.setAttribute('data-theme-style', themeSwitch.mode === 'dark'
      ? 'dark'
      : 'light'
    );
    themeSwitch.addEventListener('colorschemechange', () => {
      root.dataset.themeStyle = themeSwitch.mode;
    });
  });

  if (
    parsedUrl.pathname === '/' ||
    parsedUrl.pathname === '/index.html'
  ) {
    const player = await import('./modules/cloudinary-vp');
    // const player = await import('./modules/video-player');
    const header = await import('./modules/header');
    const nav = await import('./modules/nav');
    // const io = await import('./modules/class-toggle');
    const reveal = await import('./modules/reveal-effect');
    const lazyimg = await import('./modules/reveal-image');
    // const slideshow = await import('./modules/slideshow');
    const carousel = await import('./modules/carousel');
    const disclosure = await import('./modules/disclosure');
    const cursor = await import('./modules/cursor');
    // const form = await import('./modules/form');
  }
  if (
    parsedUrl.pathname === '/agenda' ||
    parsedUrl.pathname === '/agenda.html'
  ) {
    // const reveal = await import('./modules/reveal-effect');
    const header = await import('./modules/header');
    const nav = await import('./modules/nav');
    const cursor = await import('./modules/cursor');
  }
})();

/* eslint-enable no-unused-vars */
