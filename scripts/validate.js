/**
 *  @function resetFormValidation
 *  Resets form validation in the popups.
 *  @param {Object} form Form to reset.
 */
const resetFormValidation = form => {
  form.reset();
}

/**
 *  @function hasInvalidInput
 *  Checks if all the Input Elements are valid at the moment.
 *  @param {Array} inputList An array of all the input elements.
 *  @returns {Boolean} true/false
 */
const hasInvalidInput = inputList => 
  inputList.some(inputElement => !inputElement.validity.valid);

/**
 *  @function toggleButtonState
 *  Toggles the state of the Submit button.
 *  @param {Object} buttonElement The Submit button of the form.
 *  @param {Array} inputList An array of all the input elements.
 *  @param {string} inactiveButtonClass The name of the class having styles of an inactive button
 */
const toggleButtonState = (buttonElement, inputList, inactiveButtonClass) => {
  if(hasInvalidInput(inputList)){
    buttonElement.disabled = true;
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(inactiveButtonClass);
  }
}

/**
 *  @function showInputError
 *  Shows the error message and change the Input Element style
 *  @param {Object} formElement The active form at the moment.
 *  @param {Object} inputElement The active input element at the moment.
 *  @param {Object} settings An object containing class names and class selectors.
 */
const showInputError = (formElement, inputElement, settings) => {
  const errorSpan  = formElement.querySelector(`#${inputElement.id}-error`);
  const { inputErrorClass, errorClass } = settings;

  errorSpan.textContent = inputElement.validationMessage;
  errorSpan.classList.add(errorClass);
  inputElement.classList.add(inputErrorClass);
}

/**
 *  @function hideInputError
 *  Hides the error message and change the Input Element style
 *  @param {Object} formElement The active form at the moment.
 *  @param {Object} inputElement The active input element at the moment.
 *  @param {Object} settings An object containing class names and class selectors.
 */
const hideInputError = (formElement, inputElement, settings) => {
  const errorSpan  = formElement.querySelector(`#${inputElement.id}-error`);
  const { inputErrorClass, errorClass } = settings;

  errorSpan.textContent = "";
  errorSpan.classList.remove(errorClass);
  inputElement.classList.remove(inputErrorClass);
}

/**
 *  @function checkInputValidity
 *  Checks if the content of the input element is valid at the moment and hide or show errors accordingly
 *  @param {Object} formElement The active form at the moment.
 *  @param {Object} inputElement The active input element at the moment.
 *  @param {Object} settings An object containing class names and class selectors.
 */
const checkInputValidity = (formElement, inputElement, settings) => {
  if(inputElement.validity.valid){
    hideInputError(formElement, inputElement, settings);
  } else {
    showInputError(formElement, inputElement, settings);
  }
}

/**
 *  @function setEventListeners
 *  Finds all the fields of the form and set 'input' event listener
 *  @param {Object} formElement The active form at the moment.
 *  @param {Object} settings An object containing class names and class selectors.
 */
const setEventListeners = (formElement, settings) => {
  const { inputSelector, submitButtonSelector } = settings;
  const inputList = [...formElement.querySelectorAll(inputSelector)];
  const buttonElement = formElement.querySelector(submitButtonSelector);

  toggleButtonState(buttonElement, inputList, settings.inactiveButtonClass);
  inputList.forEach( inputElement => 
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, settings);
      toggleButtonState(buttonElement, inputList, settings.inactiveButtonClass);
    }));
}

/**
 *  @function enableValidation
 *  Finds all the forms on the page, iterate over them and enable validation
 *  @param {Object} settings An object containing class names and class selectors.
 */
const enableValidation = settings => {
  const formList = [...document.querySelectorAll(settings.formSelector)];
  formList.forEach(formElement => {
    formElement.addEventListener("submit", e => e.preventDefault());
    setEventListeners(formElement, settings);
  });
}

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
});