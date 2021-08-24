// Check if all the Input Elements are valid at the moment
const hasInvalidInput = inputList => 
  inputList.some(inputElement => !inputElement.validity.valid);

// Toggle the state of the Submit button
const toggleButtonState = (buttonElement, inputList, { inactiveButtonClass }) => {
  if(hasInvalidInput(inputList)){
    console.log("if - The inputList has invalid value" + hasInvalidInput(inputList));
    console.log(inputList);
    buttonElement.disabled = true;
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    console.log("else - The inputList has invalid value" + hasInvalidInput(inputList));
    console.log(inputList);
    buttonElement.disabled = false;
    buttonElement.classList.remove(inactiveButtonClass);
  }
}

// Show the error message and change the Input Element style
const showInputError = (formElement, inputElement, settings) => {
  const errorSpan  = formElement.querySelector(`#${inputElement.id}-error`);
  const { inputErrorClass, errorClass } = settings;

  errorSpan.textContent = inputElement.validationMessage;
  errorSpan.classList.add(errorClass);
  inputElement.classList.add(inputErrorClass);
}

// Hide the error message and change the Input Element style
const hideInputError = (formElement, inputElement, settings) => {
  const errorSpan  = formElement.querySelector(`#${inputElement.id}-error`);
  const { inputErrorClass, errorClass } = settings;

  errorSpan.textContent = "";
  errorSpan.classList.remove(errorClass);
  inputElement.classList.remove(inputErrorClass);
}

// Check if the content of the Input Element is valid at the moment
const checkInputValidity = (formElement, inputElement, settings) => {
  (inputElement.validity.valid) ? 
    hideInputError(formElement, inputElement, settings) : 
    showInputError(formElement, inputElement, settings);
}

// Find all the fields of the form and set 'input' event listener
const setEventListeners = (formElement, settings) => {
  const { inputSelector, submitButtonSelector } = settings;
  const inputList = [...formElement.querySelectorAll(inputSelector)];
  const buttonElement = formElement.querySelector(submitButtonSelector);

  toggleButtonState(buttonElement, inputList, settings);
  inputList.forEach( inputElement => 
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, settings);
      toggleButtonState(buttonElement, inputList, settings);
    }));
}

// Find all the forms on the page, iterate over them and enable validation
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