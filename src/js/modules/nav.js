import { selectAll, delay } from '../utils';

// WAAPI
const discloseItem = (item, speed, index, vars = {}) => {
  let anim = item.animate(
    {
      transform: ['translateY(24px)', 'translateY(0)'],
      opacity: [0, 1],
    }, {
      delay: speed * (index + 1),
      fill: 'forwards',
      duration: speed * 5,
    }
  );
  if (vars.reverse) anim.effect.updateTiming({ direction: 'reverse' });
}

const nav = document.getElementById('Nav');
const buttons = selectAll('button[aria-controls]', nav) || undefined;
const subMenus = selectAll(
  'button[aria-controls] + ul, button[aria-controls] + div', nav
) || undefined;
const navLinks = selectAll('.nav__link', nav);

// https://parceljs.org/languages/svg/#svg-in-javascript
const SVG_STAG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 50" width="100%" height="100%" fill="none">';
const SVG_ETAG = '</svg>';
const svgDecl = (content) => SVG_STAG + content + SVG_ETAG;

function openSubNav(buttonEl) {
  let navId = buttonEl.getAttribute('aria-controls');
  let navEl = document.getElementById(navId);

  if (navEl) {
    buttonEl.setAttribute('aria-expanded', 'true');
    buttonEl.setAttribute('aria-label', 'Hide');
    navEl.style.display = 'block';
  }
}

function closeSubNav(buttonEl) {
  let navId = buttonEl.getAttribute('aria-controls');
  let navEl = document.getElementById(navId);

  if (navEl) {
    buttonEl.setAttribute('aria-expanded', 'false');
    buttonEl.setAttribute('aria-label', 'Show');
    navEl.style.display = 'none';
  }
}

function closeAllSubNavs() {
  buttons.forEach(function (button) {
    closeSubNav(button);
  });
}

// event handlers
function handleButtonClick() {
  let button = this;
  let isOpen = button.getAttribute('aria-expanded') === 'true';
  if (isOpen) {
    closeSubNav(button);
  } else {
    closeAllSubNavs();
    openSubNav(button);
  }
}

function handleButtonKeyDown(event) {
  if (event.key === 'Escape' || event.key === 'Esc') {
    closeSubNav(this);
  }
}

function handleNavKeyDown(event) {
  if (event.key === 'Escape' || event.key === 'Esc') {
    let button = document.querySelector(
      `button[aria-controls=${this.id}]`
    );
    closeSubNav(button);
    button.focus();
  }
}

function handleNavFocusOut(event) {
  let navContainsFocus = this.contains(event.relatedTarget);
  if (!navContainsFocus) {
    let button = this.querySelector('button[aria-controls]');
    button && closeSubNav(button);
  }
}

// attach event listeners
buttons.forEach(function (button) {
  // button.addEventListener('mouseenter', handleButtonClick, false);
  button.addEventListener('click', handleButtonClick);
  button.addEventListener('keydown', handleButtonKeyDown);
});

subMenus.forEach(function (subMenu) {
  subMenu.addEventListener('keydown', handleNavKeyDown);
});

// attach focusout listener to the parent of both
// the disclosure button and the menu
let subNavContainers = selectAll('#Nav > ul > li');
subNavContainers.forEach(function (navContainer) {
  navContainer.addEventListener('focusout', handleNavFocusOut);
});

// handle aria-current onload (by pathname)
// (() => {
//   const parsedUrl = new URL(window.location.href);
//   navLinks.forEach((navLink) => {
//     let link = new URL(navLink.href);
//     let isCurrent = parsedUrl.pathname.includes(link.pathname);
//     if (isCurrent) navLink.setAttribute('aria-current', 'page');
//   });
// })();

// handle aria-current on-click (by hash)
// navLinks.forEach((navLink) => {
//   navLink.addEventListener('click', (e) => {
//     let parsedUrl = new URL(window.location);
//     let target = e.currentTarget;
//     let hash = target.hash;
//     let isCurrent = parsedUrl.hash.includes(hash);
//     if (isCurrent) target.setAttribute('aria-current', 'page');
//     // if (!isCurrent) navLink.removeAttribute('aria-current');
//   });
// });

// Toggle Menu
const menuToggle = document.querySelector('.nav__toggle');
const menu = document.querySelector('.nav__items');

// menuToggle.innerHTML = svgDecl(NAV_ICON);
// menuToggle.style.setProperty(`--nav-icon`, 'var(--sym-navicon)');

menuToggle.addEventListener('click', (e) => {
  e.preventDefault();

  menuToggle.classList.toggle('on');
  // menu.style.setProperty('--menu-box', 'visible');

  [...menu.childNodes].forEach((item, i) => discloseItem(item, 35, i) );

  if (menu.classList.contains('is-active')) {
    // menuToggle.innerHTML = svgDecl(NAV_ICON);

    [...menu.childNodes].forEach((item, i) => {
      discloseItem(item, 35, i, { reverse: true })
    });

    deactivate();
  } else {
    menu.classList.add('is-active');
    // menuToggle.innerHTML = svgDecl(NAV_ICON_CLOSE);
  }
});

async function deactivate() {
  await delay(400)
  menu.classList.remove('is-active');
  // await delay(300)
  // menu.style.setProperty('--menu-box', 'collapse');
}
