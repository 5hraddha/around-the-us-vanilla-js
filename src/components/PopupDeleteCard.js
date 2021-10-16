/**
 * This module takes care of specific functionalities of a Popup for deleting an image card.
 * @module PopupWithForm
 */
import Popup from "./Popup.js";

/** Class extending from the parent Popup component to implement the functionalities of a Popup for deleting an image card. */
class PopupDeleteCard extends Popup {
  /**
   * Creates a new Popup component.
   * @param {string} formPopupSelector -  The CSS class selector to select the form popup window.
   * @param {function(Object)} handleFormSubmit - The function that handles the form's `submit` event
   */
  constructor(formPopupSelector, handleFormSubmit) {
    super(formPopupSelector);
    this._formElement = this._popup.querySelector(".popup__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  /**
   * Opens the popup and attaches the required event listeners.
   * @param {Object} e The default event object.
   * @param {string} cardId The id of the image card to delete.
   */
  open(e, cardId){
    super.open();
    this._cardId        = cardId;
    this._cardToDelete  = e.target.closest(".element");
  }

  /**
   * Sets all the event listeners on the popup window.
   */
  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", e => {
      e.preventDefault();
      this._handleFormSubmit(this._cardId, this._cardToDelete);
    });
  }
}

export default PopupDeleteCard;