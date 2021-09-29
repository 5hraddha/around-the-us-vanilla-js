/**
 * This module takes care of specific functionalities of a Popup with a Form element.
 * @module PopupWithForm
 */
import Popup from "./Popup.js";

/** Class extending from the parent Popup component to implement the functionalities specific to the Form Popup Component */
class PopupWithForm extends Popup {
  /**
   * Creates a new Form Popup component.
   * @param {string} formPopupSelector -  The CSS class selector to select the form popup window.
   * @param {function(Object)} handleFormSubmit - The function that handles the form's `submit` event
   */
  constructor(formPopupSelector, handleFormSubmit) {
    super(formPopupSelector);
    this._formElement = this._popup.querySelector(".popup__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  /**
   * Gets all the values of the input elements of the form.
   * @returns {Object} An object having all the values of the form fields.
   */
  _getInputValues() {
    this._inputElementsList = [...this._formElement.querySelectorAll(".popup__input")];
    const formValues = {};
    this._inputElementsList.forEach(
      inputElement => 
        formValues[inputElement.name] = inputElement.value
    );
    return formValues;
  }

  /**
   * Sets all the event listeners on the popup window with form
   */
  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", e => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this._formElement.reset();
    });
  }

  /**
   * Closes the popup with form, removes the required event listeners and resets the form fields.
   */
  close() {
    super.close();
    this._formElement.reset();
  }
}

export default PopupWithForm;