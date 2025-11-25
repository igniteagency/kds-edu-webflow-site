import { SWIPER_LOADED_EVENT } from 'src/constants';

const COMPONENT_SELECTOR = '[data-slider-el="news-slider"]';
const INITIALISED_ATTR = 'data-news-slider-initialised';

function initNewsSlider(componentEl: HTMLElement) {
  const swiperEl =
    componentEl.matches('.swiper') === true
      ? componentEl
      : componentEl.querySelector<HTMLElement>('.swiper');

  if (!swiperEl) {
    console.debug('News slider container not found', componentEl);
    return;
  }

  const paginationEl = (Array.from(
    componentEl.querySelectorAll<HTMLElement>('[data-slider-el="pagination"], .swiper-pagination')
  ).find((el) => el.closest(COMPONENT_SELECTOR) === componentEl) || null) as HTMLElement | null;
  const bulletClass = paginationEl?.getAttribute('data-bullet-class') || 'slider_pagination-bullet';
  const bulletActiveClass =
    paginationEl?.getAttribute('data-bullet-active-class') || 'is-active';
  const paginationConfig = paginationEl
    ? {
        el: paginationEl,
        clickable: true,
        bulletClass,
        bulletActiveClass,
      }
    : undefined;

  const nextEl = componentEl.querySelector<HTMLElement>('.swiper-button-next');
  const prevEl = componentEl.querySelector<HTMLElement>('.swiper-button-prev');

  componentEl.setAttribute(INITIALISED_ATTR, 'true');

  // Uses the bundled Swiper build (loaded separately via window.loadScript)
  new Swiper(swiperEl, {
    effect: 'creative',
    loop: true,
    loopAddBlankSlides: true,
    slidesPerView: 'auto',
    spaceBetween: 24,
    creativeEffect: {
      perspective: true,
      prev: {
        scale: 0.9,
        translate: [0, 12, -1],
        opacity: 0.66,
        origin: 'bottom center',
      },
      next: {
        translate: ['108%', 0, 0],
      },
      limitProgress: 8,
    },
    pagination: paginationConfig,
    navigation:
      nextEl && prevEl
        ? {
            nextEl,
            prevEl,
          }
        : undefined,
    a11y: {
      enabled: true,
    },
  });
}

function initNewsSliders() {
  const components = document.querySelectorAll<HTMLElement>(COMPONENT_SELECTOR);

  if (!components.length) {
    console.debug('News slider component not found', `Looking for ${COMPONENT_SELECTOR}`);
    return;
  }

  components.forEach((componentEl) => {
    if (componentEl.getAttribute(INITIALISED_ATTR) === 'true') {
      return;
    }

    initNewsSlider(componentEl);
  });
}

if (typeof Swiper !== 'undefined') {
  initNewsSliders();
}

document.addEventListener(SWIPER_LOADED_EVENT, initNewsSliders);

// Ensure Swiper is present (mirrors slider.ts behaviour)
window.loadScript('https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.js', {
  name: 'swiper',
});
