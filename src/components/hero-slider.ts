import { SWIPER_LOADED_EVENT } from 'src/constants';

const COMPONENT_SELECTOR = '[data-slider-el="hero-slider"]';
const INITIALISED_ATTR = 'data-hero-slider-initialised';

function initHeroSlider(componentEl: HTMLElement) {
  const swiperEl =
    componentEl.matches('.swiper') === true
      ? componentEl
      : componentEl.querySelector<HTMLElement>('.swiper');

  if (!swiperEl) {
    console.debug('Hero slider container not found', componentEl);
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

  new Swiper(swiperEl, {
    effect: 'fade',
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    slidesPerView: 1,
    fadeEffect: {
      crossFade: true,
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

function initHeroSliders() {
  const components = document.querySelectorAll<HTMLElement>(COMPONENT_SELECTOR);

  if (!components.length) {
    console.debug('Hero slider component not found', `Looking for ${COMPONENT_SELECTOR}`);
    return;
  }

  components.forEach((componentEl) => {
    if (componentEl.getAttribute(INITIALISED_ATTR) === 'true') {
      return;
    }

    initHeroSlider(componentEl);
  });
}

if (typeof Swiper !== 'undefined') {
  initHeroSliders();
}

document.addEventListener(SWIPER_LOADED_EVENT, initHeroSliders);

// Ensure Swiper is present (mirrors slider.ts behaviour)
window.loadScript('https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.js', {
  name: 'swiper',
});
