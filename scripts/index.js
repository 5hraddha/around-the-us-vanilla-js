//Select required DOM Elements from Profile
const profileEditBtn = document.querySelector(".profile__edit-btn");
const profileTitleEle = document.querySelector(".profile__title");
const profileSubtitleEle = document.querySelector(".profile__subtitle");
const profileAddPlaceBtn = document.querySelector(".profile__add-btn");

//Select required DOM Elements from Card Elements
const cardEleContainer = document.querySelector(".elements");

//Select required DOM Elements from Edit Profile Popup
const profilePopupEle = document.querySelector(".popup_rel_profile");
const profilePopupCloseBtn = document.querySelector(".popup__close-btn_rel_profile");
const profilePopupFormEle = document.querySelector(".popup__form_rel_profile");
const profilePopupNameInputEle = document.querySelector("#profile-name");
const profilePopupAboutInputEle = document.querySelector("#profile-about-me");

//Select required DOM Elements from Add New Place Popup
const placePopupEle = document.querySelector(".popup_rel_place");
const placePopupCloseBtn = document.querySelector(".popup__close-btn_rel_place");
const placePopupFormEle = document.querySelector(".popup__form_rel_place");
const placePopupNameInputEle = document.querySelector("#place-name");
const placePopupLinkInputEle = document.querySelector("#place-image-link");

//Select required DOM Elements from View Image Popup
const imgPopupEle = document.querySelector(".popup_rel_image");
const imgPopupCloseBtn = document.querySelector(".popup__close-btn_rel_image");

// Initial Cards to load while the page loads
const initialCards = [
  {
    name: "Antelope Canyon",
    link: "./images/antelope-canyon-arizona.jpg"
  },
  {
    name: "Cape Hatteras Lighthouse",
    link: "./images/cape-hatteras-lighthouse-north-carolina.jpeg"
  },
  {
    name: "Shenandoah National Park",
    link: "./images/shenandoah-national-park.jpeg"
  },
  {
    name: "Big Sur",
    link: "./images/big-sur-california.jpeg"
  },
  {
    name: "Killington Vermont",
    link: "./images/killington-vermont.jpeg"
  },
  {
    name: "Key West",
    link: "./images/key-west-florida.jpeg"
  }
];

//Open the popup
const openPopup = (popup) => {
  popup.classList.add("popup_opened");
}

//Close the opened popup
const closePopup = () => {
  document.querySelector(".popup_opened").classList.remove("popup_opened");
}

//Open View Image popup
const viewImage = e => {
  const popupImgEle = document.querySelector(".popup__img");
  const popupCaptionEle = document.querySelector(".popup__caption");

  openPopup(imgPopupEle);
  popupImgEle.src = e.target.src;
  popupImgEle.alt = e.target.alt;
  popupCaptionEle.textContent = e.target.alt;
}

//Create card element using the template before adding to DOM
const createCardElement = (title, link) => {
  const cardTemplateContent = document.querySelector("#element-template").content;
  const newCardEle = cardTemplateContent.querySelector(".element").cloneNode(true);
  const cardImgEle = newCardEle.querySelector(".element__img");
  const cardTitleEle = newCardEle.querySelector(".element__title");
  const cardLikeBtn = newCardEle.querySelector(".element__like-btn");
  const cardDeleteBtn = newCardEle.querySelector(".element__delete-btn");

  cardImgEle.src = link;
  cardImgEle.alt = title;
  cardTitleEle.textContent = title;

  cardLikeBtn.addEventListener("click", e => {
    e.target.classList.toggle("element__like-btn_active");
  });

  cardDeleteBtn.addEventListener("click", e => {
    const cardToDeleteEle = e.target.closest(".element");
    cardToDeleteEle.remove();
  });

  cardImgEle.addEventListener("click", viewImage);

  return newCardEle;
}

//Add card element to DOM
const addCardElement = (title, link) => {
  const cardElement = createCardElement(title, link);
  cardEleContainer.prepend(cardElement);
}

//Open Edit Profile form
const editProfile = () => {
  profilePopupNameInputEle.value = profileTitleEle.textContent;
  profilePopupAboutInputEle.value = profileSubtitleEle.textContent;
  openPopup(profilePopupEle);
}

//Submit Edit Profile form data and update the respective values in the Profile
const submitProfile = e => {
  e.preventDefault();
  profileTitleEle.textContent = profilePopupNameInputEle.value;
  profileSubtitleEle.textContent = profilePopupAboutInputEle.value;
  closePopup();
}

//Open Add New Place form
const addPlace = () => {
  openPopup(placePopupEle);
}

//Submit Add New place form data and add a new card in the beginning
const submitNewPlace = e => {
  e.preventDefault();
  addCardElement(placePopupNameInputEle.value, placePopupLinkInputEle.value);
  closePopup();
}

//Add Event Listeners
profileEditBtn.addEventListener("click", editProfile);
profilePopupCloseBtn.addEventListener("click", closePopup);
profilePopupFormEle.addEventListener("submit", submitProfile);
profileAddPlaceBtn.addEventListener("click", addPlace);
placePopupCloseBtn.addEventListener("click", closePopup);
placePopupFormEle.addEventListener("submit", submitNewPlace);
imgPopupCloseBtn.addEventListener("click", closePopup);

//Add intial cards on page load
initialCards.forEach(card => addCardElement(card.name, card.link));