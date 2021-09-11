// Import modules and data
import FormValidator    from "./FormValidator.js";
import Card             from "./Card.js";
import initialCards     from "./initial-cards.js";

// Settings needed for form validation
const formValidationSettings = {
  formSelector        : ".popup__form",
  inputSelector       : ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass : "popup__submit_disabled",
  inputErrorClass     : "popup__input_type_error",
  errorClass          : "popup__error_visible"
};

// Select required DOM Elements from Profile
const profileEditBtn          = document.querySelector(".profile__edit-btn");
const profileTitle            = document.querySelector(".profile__title");
const profileSubtitle         = document.querySelector(".profile__subtitle");
const profileAddPlaceBtn      = document.querySelector(".profile__add-btn");

// Select required DOM Elements from Card Elements
const cardContainer           = document.querySelector(".elements");

// Select required DOM Elements from Edit Profile Popup
const profilePopup            = document.querySelector(".popup_rel_profile");
const profilePopupCloseBtn    = profilePopup.querySelector(".popup__close-btn");
const profilePopupForm        = profilePopup.querySelector(".popup__form");
const profilePopupNameInput   = profilePopupForm.querySelector("#name-input");
const profilePopupAboutInput  = profilePopupForm.querySelector("#about-input");

// Select required DOM Elements from Add New Place Popup
const placePopup              = document.querySelector(".popup_rel_place");
const placePopupCloseBtn      = placePopup.querySelector(".popup__close-btn");
const placePopupForm          = placePopup.querySelector(".popup__form");
const placePopupNameInput     = placePopupForm.querySelector("#place-input");
const placePopupLinkInput     = placePopupForm.querySelector("#link-input");

// Select required DOM Elements from View Image Popup
const imgPopup                = document.querySelector(".popup_rel_image");
const imgPopupCloseBtn        = imgPopup.querySelector(".popup__close-btn_rel_image");

// Implement form validations for all the forms
const profilePopupFormValidator = new FormValidator(formValidationSettings, profilePopupForm);
const placePopupFormValidator   = new FormValidator(formValidationSettings, placePopupForm);
profilePopupFormValidator.enableValidation();
placePopupFormValidator.enableValidation();

/**
 *  @function closePopup
 *  Closes the opened popup.
 *  @param {Object} popup The popup which has to be closed.
 */
const closePopup = popup => {
  popup.classList.remove("popup_opened");
  document.removeEventListener("click", closePopupByClick);
  document.removeEventListener("keydown", closePopupByEsc);
}

/**
 *  @function closePopupByClick
 *  Closes the opened popup by clicking on overlay outside the borders of the popup itself.
 *  @param {Object} e The default event object.
 */
const closePopupByClick = e => {
  if(e.target.classList.contains("popup_opened")){
    closePopup(e.target);
  }
}

/**
 *  @function closePopupByEsc
 *  Closes the opened popup by pressing Escape key.
 *  @param {Object} e The default event object.
 */
const closePopupByEsc = e => {
  if(e.key === "Escape"){
    const popupToClose = document.querySelector(".popup_opened");
    closePopup(popupToClose);
  }
}

/**
 *  @function openPopup
 *  Opens the popup.
 *  @param {Object} popup The popup which has to be opened.
 */
const openPopup = popup => {
  popup.classList.add("popup_opened");
  document.addEventListener("click", closePopupByClick);
  document.addEventListener("keydown", closePopupByEsc);
}

/**
 *  @function addCardElement
 *  Adds the newly created card element to DOM.
 *  @param {string} title The title of the image in the card.
 *  @param {string} link The URL of the image in the card.
 */
const addCardElement = (title, link) => {
  const card = new Card({title, link}, "#element-template", openPopup);
  cardContainer.prepend(card.generateCard());
}

/**
 *  @function openEditProfilePopup
 *  Opens the Edit Profile popup.
 */
const openEditProfilePopup = () => {
  profilePopupNameInput.value = profileTitle.textContent;
  profilePopupAboutInput.value = profileSubtitle.textContent;
  profilePopupFormValidator.toggleButtonState();
  openPopup(profilePopup);
}

/**
 *  @function submitEditProfilePopup
 *  Submits the Edit Profile form data and update the respective values in the Profile section of the webpage.
 *  @param {Object} e The default event object.
 */
const submitEditProfilePopup = e => {
  e.preventDefault();
  profileTitle.textContent = profilePopupNameInput.value;
  profileSubtitle.textContent = profilePopupAboutInput.value;
  closePopup(profilePopup);
  profilePopupFormValidator.resetFormValidation();
}

/**
 *  @function openAddPlacePopup
 *  Opens Add New Place popup.
 */
const openAddPlacePopup = () => {
  placePopupNameInput.value = "";
  placePopupLinkInput.value = "";
  placePopupFormValidator.toggleButtonState();
  openPopup(placePopup);
}

/**
 *  @function submitAddPlacePopup
 *  Submits Add New place form data and add a new card in the beginning of the webpage.
 *  @param {Object} e The default event object.
 */
const submitAddPlacePopup = e => {
  e.preventDefault();
  addCardElement(placePopupNameInput.value, placePopupLinkInput.value);
  closePopup(placePopup);
  placePopupFormValidator.resetFormValidation();
}

//Add Event Listeners
profileEditBtn.addEventListener("click", openEditProfilePopup);
profilePopupCloseBtn.addEventListener("click", () => closePopup(profilePopup));
profilePopupForm.addEventListener("submit", submitEditProfilePopup);
profileAddPlaceBtn.addEventListener("click", openAddPlacePopup);
placePopupCloseBtn.addEventListener("click", () => closePopup(placePopup));
placePopupForm.addEventListener("submit", submitAddPlacePopup);
imgPopupCloseBtn.addEventListener("click", () => closePopup(imgPopup));

//Add intial cards on page load
initialCards.forEach(card => addCardElement(card.name, card.link));