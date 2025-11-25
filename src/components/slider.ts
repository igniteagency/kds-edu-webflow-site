import { SWIPER_LOADED_EVENT } from 'src/constants';

/**
 * General Slider component
 * To create standalone sliders on the page, add swiper script and this component script to the page
 */

class Slider {
  COMPONENT_SELECTOR = '[data-slider-el="component"]';
  NAV_PREV_BUTTON_SELECTOR = '[data-slider-el="nav-prev"]';
  NAV_NEXT_BUTTON_SELECTOR = '[data-slider-el="nav-next"]';
  PAGINATION_SELECTOR = '[data-slider-el="pagination"], .swiper-pagination';

  swiperComponents: NodeListOf<HTMLElement> | [];
  swiper: Swiper | null;

  constructor() {
    this.swiperComponents = document.querySelectorAll(this.COMPONENT_SELECTOR);
    this.initSliders();
  }

  initSliders() {
    this.swiperComponents.forEach((swiperComponent) => {
      const swiperEl = swiperComponent.querySelector('.swiper');
      if (!swiperEl) {
        console.error('`.swiper` element not found', swiperComponent);
        return;
      }

      const navPrevButtonEl = swiperComponent.querySelector(this.NAV_PREV_BUTTON_SELECTOR);
      const navNextButtonEl = swiperComponent.querySelector(this.NAV_NEXT_BUTTON_SELECTOR);

      const navigationConfig =
        navPrevButtonEl && navNextButtonEl
          ? {
              nextEl: navNextButtonEl,
              prevEl: navPrevButtonEl,
              disabledClass: 'is-disabled',
            }
          : false;

      // Optional pagination support (scoped)
      const paginationEl = (Array.from(
        swiperComponent.querySelectorAll(this.PAGINATION_SELECTOR)
      ).find((el) => el.closest(this.COMPONENT_SELECTOR) === swiperComponent) ||
        null) as HTMLElement | null;
      const bulletClass =
        paginationEl?.getAttribute('data-bullet-class') || 'slider_pagination-bullet';
      const bulletActiveClass =
        paginationEl?.getAttribute('data-bullet-active-class') || 'is-active';
      const paginationConfig = paginationEl
        ? {
            el: paginationEl,
            clickable: true,
            bulletClass,
            bulletActiveClass,
          }
        : false;

      this.swiper = new Swiper(swiperEl, {
        loop: false,
        spaceBetween: 24,
        slidesPerView: 'auto',
        pagination: paginationConfig,
        navigation: navigationConfig,
        slideActiveClass: 'is-active',
        slidePrevClass: 'is-previous',
        slideNextClass: 'is-next',
        a11y: {
          enabled: true,
        },
      });
    });
  }
}

window.loadScript('https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.js', {
  name: 'swiper',
});

document.addEventListener(SWIPER_LOADED_EVENT, () => {
  new Slider();
});
