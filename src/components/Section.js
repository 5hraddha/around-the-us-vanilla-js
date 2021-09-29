/**
 * This module takes care of rendering a list of elements on a page
 * @module Section
 */

/** Class representing a Layer that takes ready-made markup and adds it to the DOM. */
class Section {
  /**
   * Creates a new layer.
   * @param {Object} obj - The object has two properties - `items` and `renderer`. The `items` property serve as an array of data and the `renderer` property is a function responsible for creating and rendering data on a page.
   * @param {string} containerSelector -  The CSS class selector to select the container for adding the card elements.
   */
  constructor({ items, renderer}, containerSelector) {
    this._items         = items;
    this._renderer      = renderer;
    this._container     = document.querySelector(containerSelector);
  }

  /**
   * Takes a DOM element and adds it to the container.
   * @param {HTMLElement} element The HTML Element to add to the container.
   */
  addItem(element) {
    this._container.prepend(element);
  }

  /**
   * Clears the container of all the child elements.
   */
  clear() {
    this._container.innerHTML = "";
  }

  /**
   * Iterates through the array of data elements and renders each element on a page.
   */
  renderItems() {
    this.clear();
    this._items.forEach(this._renderer);
  }
}

export default Section;