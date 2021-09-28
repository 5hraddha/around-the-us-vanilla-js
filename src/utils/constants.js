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

// Select page logo and profile picture Elements
export const pageLogoElement        = document.querySelector(".logo");
export const profilePicElement      = document.querySelector(".profile__avatar");

// Select required DOM Elements from Card Elements
export const imgCardsContainer      = document.querySelector(".elements");

// Select required DOM Elements from User Profile
export const editProfileBtn         = document.querySelector(".profile__edit-btn");
export const profileTitle           = document.querySelector(".profile__title");
export const profileSubtitle        = document.querySelector(".profile__subtitle");

// Select required DOM Elements from Edit User Profile Popup
export const editProfilePopupForm   = profilePopup.querySelector(".popup__form");
export const editProfileNameInput   = profilePopupForm.querySelector("#name-input");
export const editProfileAboutInput  = profilePopupForm.querySelector("#about-input");

// Select required DOM Elements for adding new Image
export const addImgBtn              = document.querySelector(".profile__add-btn");

// Select required DOM Elements from Add New Image Popup
export const addImgPopupForm        = placePopup.querySelector(".popup__form");