class FormValidator {
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

  _hasInvalidInput() {
    return this._inputList.some(inputElement => !inputElement.validity.valid);
  }

  toggleButtonState() {
    if(this._hasInvalidInput()) {
      this._buttonElement.disabled = true;
      this._buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      this._buttonElement.disabled = false;
      this._buttonElement.classList.remove(this._inactiveButtonClass);
    }
  }

  _showInputError(inputElement) {
    const errorSpanElement        = this._formElement.querySelector(`#${inputElement.id}-error`);
    errorSpanElement.textContent  = inputElement.validationMessage;
    errorSpanElement.classList.add(this._errorClass);
    inputElement.classList.add(this._inputErrorClass);
  }

  _hideInputError(inputElement) {
    const errorSpanElement        = this._formElement.querySelector(`#${inputElement.id}-error`);
    errorSpanElement.textContent  = "";
    errorSpanElement.classList.remove(this._errorClass);
    inputElement.classList.remove(this._inputErrorClass);
  }

  _checkInputValidity(inputElement) {
    if(inputElement.validity.valid){
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement);
    }
  }

  _setEventListeners() {
    this.toggleButtonState();
    this._inputList.forEach( inputElement => 
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState();
      }));
  }

  enableValidation() {
    this._formElement.addEventListener("submit", e => e.preventDefault());
    this._setEventListeners();
  }

  resetFormValidation() {
    this._formElement.reset();
  }

}

export default FormValidator;