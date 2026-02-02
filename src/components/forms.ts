class RemoteForm {
  private iframeEmbedEl: HTMLElement | null;
  private iframeUrl: string;
  private successMessage: HTMLElement | null;

  constructor(componentEl: HTMLElement) {
    this.iframeEmbedEl = componentEl.querySelector('[data-remote-form]');

    this.iframeUrl = this.iframeEmbedEl?.dataset.remoteForm || '';
    this.successMessage = componentEl.querySelector('[data-remote-form-success-msg]');

    if (!this.iframeEmbedEl) {
      console.error(
        'RemoteForm: No element with data-remote-form attribute found. Add one with iframe URL.'
      );
      return;
    }

    if (!this.iframeUrl) {
      console.error('RemoteForm: No iframe URL provided in data-remote-form attribute');
      return;
    }

    this.init();
  }

  private init(): void {
    const urlParams = new URLSearchParams(window.location.search);
    const hasSuccess = urlParams.has('success');
    const hasReloaded = urlParams.has('RL');

    if (hasSuccess && !hasReloaded) {
      window.location.href = `${window.location.pathname}?success=1&RL=1`;
      return;
    }

    if (hasSuccess && hasReloaded) {
      this.showSuccessMessage();
    } else {
      this.loadIframe();
    }
  }

  private showSuccessMessage(): void {
    if (this.successMessage) {
      this.successMessage.classList.remove('hide');
    }
  }

  private loadIframe(): void {
    const iframe = document.createElement('iframe');
    iframe.setAttribute('target', '_parent');
    iframe.style.cssText = 'margin: 10px; width: 100%; height: 1000px; border: 0';
    iframe.setAttribute('frameBorder', '0');
    iframe.setAttribute('loading', 'lazy');
    iframe.src = this.iframeUrl;

    this.iframeEmbedEl?.appendChild(iframe);
  }

  static initAll(): void {
    const forms = document.querySelectorAll<HTMLElement>('[data-el="remote-form"]');
    forms.forEach((form) => new RemoteForm(form));
  }
}

window.addEventListener('load', () => {
  RemoteForm.initAll();
});
