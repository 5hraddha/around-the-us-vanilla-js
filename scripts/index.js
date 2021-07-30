//Select required DOM Elements from Profile
const profileEditBtn = document.querySelector(".profile__edit-btn");
const profileTitleEle = document.querySelector(".profile__title");
const profileSubtitleEle = document.querySelector(".profile__subtitle");

//Select required DOM Elements from Card Elements
const cardEleContainer = document.querySelector(".elements");

//Select required DOM Elements from Edit Profile Popup
const popupEle = document.querySelector(".popup");
const popupCloseBtn = document.querySelector(".popup__close-btn");
const popupFormEle = document.querySelector(".popup__form");
const popupNameInputEle = document.querySelector("#name");
const popupAboutInputEle = document.querySelector("#about-me");

// Initial Cards to load while the page loads
const initialCards = [
  {
    name: "Antelope Canyon",
    link: "./images/antelope-canyon-arizona.jpeg"
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

const popupOpen = () => {
  popupNameInputEle.value = profileTitleEle.textContent;
  popupAboutInputEle.value = profileSubtitleEle.textContent;
  popupEle.classList.add("popup_opened");
}

const popupClose = () => {
  popupEle.classList.remove("popup_opened");
}

//Submit Edit Profile form data and update the respective values in the Profile
const handleFormSubmit = e => {
  e.preventDefault();
  profileTitleEle.textContent = popupNameInputEle.value;
  profileSubtitleEle.textContent = popupAboutInputEle.value;
  popupClose();
}

//Create card element using the template before adding to DOM
const createCardElement = (title, link) => {
  const cardTemplateContent = document.querySelector("#element-template").content;
  const newCardEle = cardTemplateContent.querySelector(".element").cloneNode(true);
  const cardImgEle = newCardEle.querySelector(".element__img");
  const cardTitleEle = newCardEle.querySelector(".element__title");
  const cardLikeBtn = newCardEle.querySelector(".element__like-btn");

  cardImgEle.src = link;
  cardImgEle.alt = title;
  cardTitleEle.textContent = title;

  return newCardEle;
}

//Add card element to DOM
const addCardElement = (title, link) => {
  const cardElement = createCardElement(title, link);
  cardEleContainer.prepend(cardElement);
}

//Add intial cards on page load
initialCards.forEach(card => addCardElement(card.name, card.link));

//Add Event Listeners
// Open and Close the Edit Profile Popup
profileEditBtn.addEventListener("click", popupOpen);
popupCloseBtn.addEventListener("click", popupClose);

popupFormEle.addEventListener("submit", handleFormSubmit);