/**
 * This module takes care of all the validations of the forms
 * @module FormValidator
 */

/** Class representing a form validator */
class FormValidator {
  /**
   * Creates a new form validator.
   * @param {Object} formValidationSettings - The object having all the required settings for form validation.
   * @param {Object} formElement -  The form element that has to be validated.
   */
  constructor(formValidationSettings, formElement) {
    ({ formSelector           : this._formSelector,
      inputSelector           : this._inputSelector,
      submitButtonSelector    : this._submitButtonSelector,
      inactiveButtonClass     : this._inactiveButtonClass,
      inputErrorClass         : this._inputErrorClass,
      errorClass              : this._errorClass } = formValidationSettings);
    this._formElement         = formElement;
    this._inputList           = [...this._formElement.querySelectorAll(this._inputSelector)];
    this._buttonElement       = this._formElement.querySelector(this._submitButtonSelector);
  }

  /**
   *  Checks if all the Input Elements are valid at the moment.
   *  @returns {Boolean} true/false
   */
  _hasInvalidInput() {
    return this._inputList.some(inputElement => !inputElement.validity.valid);
  }

  /**
   *  Toggles the state (active or inactive) of the Submit button.
   */
  toggleButtonState() {
    if(this._hasInvalidInput()) {
      this._buttonElement.disabled = true;
      this._buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      this._buttonElement.disabled = false;
      this._buttonElement.classList.remove(this._inactiveButtonClass);
    }
  }

  /**
   *  Shows the error message and change the Input Element style
   *  @param {Object} inputElement The active input element at the moment.
   */
  _showInputError(inputElement) {
    const errorSpanElement        = this._formElement.querySelector(`#${inputElement.id}-error`);
    errorSpanElement.textContent  = inputElement.validationMessage;
    errorSpanElement.classList.add(this._errorClass);
    inputElement.classList.add(this._inputErrorClass);
  }

  /**
   *  Hides the error message and change the Input Element style
   *  @param {Object} inputElement The active input element at the moment.
   */
  _hideInputError(inputElement) {
    const errorSpanElement        = this._formElement.querySelector(`#${inputElement.id}-error`);
    errorSpanElement.textContent  = "";
    errorSpanElement.classList.remove(this._errorClass);
    inputElement.classList.remove(this._inputErrorClass);
  }

  /**
   *  Checks if the content of the Input Element is valid at the moment and hide or show errors accordingly
   *  @param {Object} inputElement The active input element at the moment.
   */
  _checkInputValidity(inputElement) {
    if(inputElement.validity.valid){
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement);
    }
  }

  /**
   *  Finds all the fields of the form and set 'input' event listener
   */
  _setEventListeners() {
    this.toggleButtonState();
    this._inputList.forEach( inputElement => 
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState();
      }));
  }

  /**
   *  Enables all the validations for the current form
   */
  enableValidation() {
    this._formElement.addEventListener("submit", e => e.preventDefault());
    this._setEventListeners();
  }

  /**
   *  Resets form validation in the current form.
   */
  resetFormValidation() {
    this._formElement.reset();
  }

}

export default FormValidator;