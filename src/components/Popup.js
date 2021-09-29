/**
 * This module takes care of generic functionalities of a popup, like opening and closing of a popup window
 * @module Popup
 */

/** Class representing a Popup component that has functionality to open and close the popup window. */
class Popup {
  /**
   * Creates a new Popup component.
   * @param {string} popupSelector -  The CSS class selector to select the popup window.
   */
  constructor(popupSelector) {
    this._popup               = document.querySelector(popupSelector);
    this._handleClickClose    = this._handleClickClose.bind(this);
    this._handleEscClose      = this._handleEscClose.bind(this);
  }

  /**
   * Handles the closing of the opened popup by pressing Escape key.
   * @param {Object} e The default event object.
   */
  _handleEscClose(e) {
    if(e.key === "Escape"){
      this.close();
    }
  }

  /**
   * Handles the closing of the opened popup by mouse click on overlay outside the borders of the popup itself.
   * @param {Object} e The default event object.
   */
  _handleClickClose(e) {
    if(e.target.classList.contains("popup_opened")){
      this.close();
    }
  }

  /**
   * Sets all the event listeners on the popup window
   */
  setEventListeners() {
    const popupCloseBtn = this._popup.querySelector(".popup__close-btn");
    popupCloseBtn.addEventListener("click", () => this.close());
  }

  /**
   * Opens the popup and attaches the required event listeners.
   */
  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("click", this._handleClickClose);
    document.addEventListener("keydown", this._handleEscClose);
  }

  /**
   * Closes the popup and removes the required event listeners.
   */
  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("click", this._handleClickClose);
    document.removeEventListener("keydown", this._handleEscClose);
  }
}

export default Popup;