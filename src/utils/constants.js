// Settings needed for form validation
export const formValidationSettings = {
  formSelector        : ".popup__form",
  inputSelector       : ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass : "popup__submit_disabled",
  inputErrorClass     : "popup__input_type_error",
  errorClass          : "popup__error_visible"
};

// Select page logo and profile picture Elements
export const pageLogoElement        = document.querySelector(".logo");
export const profilePicElement      = document.querySelector(".profile__avatar");

// Select required DOM Elements from User Profile
export const editProfileBtn         = document.querySelector(".profile__edit-btn");

// Select required DOM Elements from Edit User Profile Popup
export const editProfilePopup       = document.querySelector(".popup_rel_profile");
export const editProfilePopupForm   = editProfilePopup.querySelector(".popup__form");
export const editProfileNameInput   = editProfilePopupForm.querySelector("#name-input");
export const editProfileAboutInput  = editProfilePopupForm.querySelector("#about-input");

// Select required DOM Elements for adding new Image
export const addImgBtn              = document.querySelector(".profile__add-btn");

// Select required DOM Elements from Add New Image Popup
export const addImgPopup            = document.querySelector(".popup_rel_place");
export const addImgPopupForm        = addImgPopup.querySelector(".popup__form");
