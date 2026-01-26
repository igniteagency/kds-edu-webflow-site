/**
 * Adds AlpineJS script and template wrap tooling to the site
 */
class AlpineJSWebflow {
  constructor() {
    // Make necessary changes to the DOM before Alpine is loaded
    this.init();

    window
      .loadScript(
        'https://cdn.jsdelivr.net/npm/alpinejs@3.14.9/dist/cdn.min.js',
        {
          placement: 'head',
          name: 'alpinejs-script',
        },
        {
          defer: 'false',
          async: 'true',
        }
      )
      .then(() => {
        console.debug('AlpineJS init');
      });
  }

  private init() {
    document
      .querySelectorAll('[x-data] [x-for]:not(template), [x-data] [x-if]:not(template)')
      .forEach((el) => this.wrapInTemplate(el));
  }

  private getAlpineAttributes(el: HTMLElement) {
    const alpineAttributes = [];
    for (let i = 0; i < el.attributes.length; ++i) {
      const a = el.attributes[i];
      if (a.name.startsWith('x-')) {
        alpineAttributes.push(a);
      }
    }
    return alpineAttributes;
  }

  private wrapInTemplate(el: HTMLElement) {
    const template = document.createElement('template');

    const attributes = this.getAlpineAttributes(el);

    attributes.forEach((a) => {
      template.setAttribute(a.name, a.value);
      el.removeAttribute(a.name);
    });

    el.parentNode?.insertBefore(template, el);
    template.content.appendChild(el);
  }
}

new AlpineJSWebflow();
