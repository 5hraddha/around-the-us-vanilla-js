// Import main stylesheet
import "../pages/index.css";

// Import modules
import Card                 from "../components/Card.js";
import FormValidator        from "../components/FormValidator.js";
import PopupWithForm        from "../components/PopupWithForm.js";
import PopupWithImage       from "../components/PopupWithImage";
import Section              from "../components/Section.js";
import UserInfo             from "../components/UserInfo.js"

// Import Initial Card Data
import {initialCards}       from "../utils/constants.js";

// Import required constants from Profile

// Import required constants from Card Elements

// Import required constants from Edit Profile Popup

// Import required constants from Add New Place Popup

// Import required constants from from View Image Popup

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