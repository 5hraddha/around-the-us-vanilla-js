// Import all the images
import antelopeCanyonImgUrl     from "../images/antelope-canyon-arizona.jpg";
import capeHatterasImgUrl       from "../images/cape-hatteras-lighthouse-north-carolina.jpeg";
import shenandoahImgUrl         from "../images/shenandoah-national-park.jpeg";
import bigSurImgUrl             from "../images/big-sur-california.jpeg";
import killingtonImgUrl         from "../images/killington-vermont.jpeg";
import keyWestImgUrl            from "../images/key-west-florida.jpeg";

// Initial Cards to show while the page loads
export const initialCards = [
  {
    name: "Antelope Canyon",
    link: antelopeCanyonImgUrl
  },
  {
    name: "Cape Hatteras Lighthouse",
    link: capeHatterasImgUrl
  },
  {
    name: "Shenandoah National Park",
    link: shenandoahImgUrl
  },
  {
    name: "Big Sur",
    link: bigSurImgUrl
  },
  {
    name: "Killington Vermont",
    link: killingtonImgUrl
  },
  {
    name: "Key West",
    link: keyWestImgUrl
  }
];

// Settings needed for form validation
export const formValidationSettings = {
  formSelector        : ".popup__form",
  inputSelector       : ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass : "popup__submit_disabled",
  inputErrorClass     : "popup__input_type_error",
  errorClass          : "popup__error_visible"
};

// Select required DOM Elements from Profile
export const profileEditBtn          = document.querySelector(".profile__edit-btn");
export const profileTitle            = document.querySelector(".profile__title");
export const profileSubtitle         = document.querySelector(".profile__subtitle");
export const profileAddPlaceBtn      = document.querySelector(".profile__add-btn");

// Select required DOM Elements from Card Elements
export const cardContainer           = document.querySelector(".elements");

// Select required DOM Elements from Edit Profile Popup
export const profilePopup            = document.querySelector(".popup_rel_profile");
export const profilePopupCloseBtn    = profilePopup.querySelector(".popup__close-btn");
export const profilePopupForm        = profilePopup.querySelector(".popup__form");
export const profilePopupNameInput   = profilePopupForm.querySelector("#name-input");
export const profilePopupAboutInput  = profilePopupForm.querySelector("#about-input");

// Select required DOM Elements from Add New Place Popup
export const placePopup              = document.querySelector(".popup_rel_place");
export const placePopupCloseBtn      = placePopup.querySelector(".popup__close-btn");
export const placePopupForm          = placePopup.querySelector(".popup__form");
export const placePopupNameInput     = placePopupForm.querySelector("#place-input");
export const placePopupLinkInput     = placePopupForm.querySelector("#link-input");

// Select required DOM Elements from View Image Popup
export const imgPopup                = document.querySelector(".popup_rel_image");
export const imgPopupCloseBtn        = imgPopup.querySelector(".popup__close-btn_rel_image");