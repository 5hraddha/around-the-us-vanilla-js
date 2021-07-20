//Select required DOM Elements from Profile
const profileEditBtn = document.querySelector(".profile__edit-btn");
const profileTitleEle = document.querySelector(".profile__title");
const profileSubtitleEle = document.querySelector(".profile__subtitle");

//Select required DOM Elements from Edit Profile Popup
const popupEle = document.querySelector(".popup");
const popupCloseBtn = document.querySelector(".popup__close-btn");
const popupFormEle = document.querySelector(".popup__container");
const popupNameInputEle = document.querySelector("#name");
const popupAboutInputEle = document.querySelector("#about-me");

//Select all Like buttons from Cards
const likeBtnList = document.querySelectorAll(".element__like-btn");

function popupOpen(){
  popupNameInputEle.value = profileTitleEle.textContent;
  popupAboutInputEle.value = profileSubtitleEle.textContent;
  popupEle.classList.add("popup_opened");
}

function popupClose(){
  popupEle.classList.remove("popup_opened");
}

// Open and Close the Edit Profile Popup
profileEditBtn.addEventListener("click", popupOpen);
popupCloseBtn.addEventListener("click", popupClose);

//Submit Edit Profile form data and update the respective values in the Profile
popupFormEle.addEventListener("submit", function(e){
  e.preventDefault();
  profileTitleEle.textContent = popupNameInputEle.value;
  profileSubtitleEle.textContent = popupAboutInputEle.value;
  popupClose();
});

//Add eventListener to all the Like buttons
for(let i=0; i<likeBtnList.length; i++){
  likeBtnList[i].addEventListener("click", function(){
    likeBtnList[i].classList.toggle("element__like-btn_active");
  })
}