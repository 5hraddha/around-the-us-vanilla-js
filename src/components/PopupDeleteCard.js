import Popup from "./Popup.js";

class PopupDeleteCard extends Popup {
  constructor(formPopupSelector, handleFormSubmit) {
    super(formPopupSelector);
    this._formElement = this._popup.querySelector(".popup__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  open(e, cardId){
    super.open();
    this._cardId        = cardId;
    this._cardToDelete  = e.target.closest(".element");
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", e => {
      e.preventDefault();
      this._handleFormSubmit(this._cardId, this._cardToDelete);
    });
  }
}

export default PopupDeleteCard;