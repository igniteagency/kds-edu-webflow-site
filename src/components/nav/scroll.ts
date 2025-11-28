export function navbarScrollToggle() {
  const navbar = document.querySelector('.section_navbar');
  if (!navbar) return;

  ScrollTrigger.create({
    start: 'top+=500',
    end: 'max',
    onUpdate: (self) => {
      if (self.direction === 1) {
        navbar.classList.add('is-hidden');
      } else {
        navbar.classList.remove('is-hidden');
        if (self.isActive) {
          navbar.classList.add('is-fill');
        }
      }
    },
    onToggle: (self) => {
      if (self.isActive) {
        if (self.direction !== 1) {
          navbar.classList.add('is-fill');
        }
      } else {
        navbar.classList.remove('is-fill');
      }
    },
    invalidateOnRefresh: true,
  });
}
