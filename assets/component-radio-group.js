import { Component } from '@theme/component';

/**
 * A custom element that normalizes radio inputs into a single event stream.
 */
export class RadioGroupComponent extends Component {
  #controller = new AbortController();

  connectedCallback() {
    super.connectedCallback();

    const { signal } = this.#controller;

    this.addEventListener('change', this.#handleChange, { signal });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.#controller.abort();
  }

  /**
   * Event name to emit (attribute: `event`)
   * @returns {string}
   */
  get eventName() {
    return this.getAttribute('event') || 'radio-group:change';
  }

  /**
   * Native change handler.
   * @param {Event} event
   */
  #handleChange = (event) => {
    const target = event.target;

    if (!(target instanceof HTMLInputElement)) return;
    if (target.type !== 'radio') return;
    if (!target.checked) return;

    this.#emit(target.value, target);
  };

  /**
   * Emit normalized event
   * @param {string} value
   * @param {HTMLInputElement} input
   */
  #emit(value, input) {
    this.dispatchEvent(
      new CustomEvent(this.eventName, {
        bubbles: true,
        composed: true,
        detail: { value, input },
      })
    );
  }
}

if (!customElements.get('radio-group')) {
  customElements.define('radio-group', RadioGroupComponent);
}
