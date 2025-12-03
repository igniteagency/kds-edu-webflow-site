import { animatedDetailsAccordions } from '$components/accordions';
import Dialog from '$components/dialog';
import NavMenu from '$components/nav/menu';
import { navbarScrollToggle } from '$components/nav/scroll';
import { setCurrentYear } from '$utils/current-year';
import { initCursorFollow } from '$utils/cursor-follow';
import '$utils/disable-webflow-scroll';
import { disableWebflowAnchorSmoothScroll } from '$utils/disable-webflow-scroll';
import handleExternalLinks from '$utils/external-link';
import addMainElementId from '$utils/main-element-id';
import { duplicateMarqueeList } from '$utils/marquee-list';
import { addSafariBrowserClass } from '$utils/safari-detection';

window.Webflow = window.Webflow || [];
window.Webflow?.push(() => {
  setTimeout(() => {
    window.WF_IX = window.Webflow.require('ix3');
    console.debug('Webflow IX3 globalised:', window.WF_IX);
  }, 100);

  addSafariBrowserClass();

  // Set current year on respective elements
  setCurrentYear();
  addMainElementId();
  handleExternalLinks();

  initComponents();
  UIFunctions();
  webflowOverrides();

  loadScrollTimelineCSSPolyfill();
});

function initComponents() {
  new NavMenu();
  new Dialog();
}

function UIFunctions() {
  initCursorFollow();
  navbarScrollToggle();
  duplicateMarqueeList();
  animatedDetailsAccordions();
  window.conditionalLoadScript('[data-el="counter"]', 'components/counter.js');
  window.conditionalLoadScript('[data-slider-el="component"]', 'components/slider.js');
}

function webflowOverrides() {
  disableWebflowAnchorSmoothScroll();
}

function loadScrollTimelineCSSPolyfill() {
  window.loadScript('https://flackr.github.io/scroll-timeline/dist/scroll-timeline.js');
}
