//Select required DOM Elements from Profile
const profileEditBtn = document.querySelector(".profile__edit-btn");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const profileAddPlaceBtn = document.querySelector(".profile__add-btn");

//Select required DOM Elements from Card Elements
const cardContainer = document.querySelector(".elements");

//Select required DOM Elements from Edit Profile Popup
const profilePopup = document.querySelector(".popup_rel_profile");
const profilePopupCloseBtn = profilePopup.querySelector(".popup__close-btn_rel_profile");
const profilePopupForm = profilePopup.querySelector(".popup__form_rel_profile");
const profilePopupNameInput = profilePopupForm.querySelector("#name-input");
const profilePopupAboutInput = profilePopupForm.querySelector("#about-input");
const profilePopupSubmitBtn = profilePopupForm.querySelector(".popup__submit");
const profilePopupInputList = [...profilePopupForm.querySelectorAll(".popup__input")];

//Select required DOM Elements from Add New Place Popup
const placePopup = document.querySelector(".popup_rel_place");
const placePopupCloseBtn = placePopup.querySelector(".popup__close-btn_rel_place");
const placePopupForm = placePopup.querySelector(".popup__form_rel_place");
const placePopupNameInput = placePopupForm.querySelector("#place-input");
const placePopupLinkInput = placePopupForm.querySelector("#link-input");
const placePopupSubmitBtn = placePopupForm.querySelector(".popup__submit");
const placePopupInputList = [...placePopupForm.querySelectorAll(".popup__input")];

//Select required DOM Elements from View Image Popup
const imgPopup = document.querySelector(".popup_rel_image");
const imgPopupCloseBtn = imgPopup.querySelector(".popup__close-btn_rel_image");
const popupImg = imgPopup.querySelector(".popup__img");
const popupCaption = imgPopup.querySelector(".popup__caption");

//Select required DOM Elements from Card Template
const cardTemplateContent = document.querySelector("#element-template").content;

//Open the popup
const openPopup = popup => {
  popup.classList.add("popup_opened");
}

//Close the opened popup
const closePopup = popup => {
  popup.classList.remove("popup_opened");
}

//Open View Image popup
const viewImage = e => {
  openPopup(imgPopup);
  popupImg.src = e.target.src;
  popupImg.alt = e.target.alt;
  popupCaption.textContent = e.target.alt;
}

//Create card element using the template before adding to DOM
const createCardElement = (title, link) => {
  const newCard = cardTemplateContent.querySelector(".element").cloneNode(true);
  const cardImg = newCard.querySelector(".element__img");
  const cardTitle = newCard.querySelector(".element__title");
  const cardLikeBtn = newCard.querySelector(".element__like-btn");
  const cardDeleteBtn = newCard.querySelector(".element__delete-btn");

  cardImg.src = link;
  cardImg.alt = title;
  cardTitle.textContent = title;

  cardLikeBtn.addEventListener("click", e => {
    e.target.classList.toggle("element__like-btn_active");
  });

  cardDeleteBtn.addEventListener("click", e => {
    const cardToDelete = e.target.closest(".element");
    cardToDelete.remove();
  });

  cardImg.addEventListener("click", viewImage);

  return newCard;
}

//Add card element to DOM
const addCardElement = (title, link) => {
  const card = createCardElement(title, link);
  cardContainer.prepend(card);
}

//Open Edit Profile form
const editProfile = () => {
  profilePopupNameInput.value = profileTitle.textContent;
  profilePopupAboutInput.value = profileSubtitle.textContent;
  toggleButtonState(profilePopupSubmitBtn, profilePopupInputList, "popup__submit_disabled");
  openPopup(profilePopup);
}

//Submit Edit Profile form data and update the respective values in the Profile
const submitProfile = e => {
  e.preventDefault();
  profileTitle.textContent = profilePopupNameInput.value;
  profileSubtitle.textContent = profilePopupAboutInput.value;
  closePopup(profilePopup);
  resetFormValidation(profilePopupForm);
}

//Open Add New Place form
const openAddPlacePopup = () => {
  placePopupNameInput.value = "";
  placePopupLinkInput.value = "";
  toggleButtonState(placePopupSubmitBtn, placePopupInputList, "popup__submit_disabled");
  openPopup(placePopup);
}

//Submit Add New place form data and add a new card in the beginning
const submitNewPlace = e => {
  e.preventDefault();
  addCardElement(placePopupNameInput.value, placePopupLinkInput.value);
  closePopup(placePopup);
  resetFormValidation(placePopupForm);
}

//Add Event Listeners
profileEditBtn.addEventListener("click", editProfile);
profilePopupCloseBtn.addEventListener("click", () => closePopup(profilePopup));
profilePopupForm.addEventListener("submit", submitProfile);
profileAddPlaceBtn.addEventListener("click", openAddPlacePopup);
placePopupCloseBtn.addEventListener("click", () => closePopup(placePopup));
placePopupForm.addEventListener("submit", submitNewPlace);
imgPopupCloseBtn.addEventListener("click", () => closePopup(imgPopup));

//Add intial cards on page load
initialCards.forEach(card => addCardElement(card.name, card.link));