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

  const paginationEl =
    componentEl.querySelector<HTMLElement>('[data-slider-el="pagination"]') ??
    componentEl.querySelector<HTMLElement>('.swiper-pagination');
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
    pagination: paginationEl
      ? {
          el: paginationEl,
          clickable: true,
        }
      : undefined,
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
