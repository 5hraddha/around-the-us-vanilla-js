/**
 * This module takes care of creating a new image card element
 * @module Card
 */

const imgPopup                = document.querySelector(".popup_rel_image");
const popupImg                = imgPopup.querySelector(".popup__img");
const popupCaption            = imgPopup.querySelector(".popup__caption");

/** Class representing an image card in the webpage */
class Card {
  /**
   * Creates a new image card.
   * @param {Object} data - The object having the title and the link of the image to be added to the card.
   * @param {string} cardSelector -  The card template element selector.
   * @param {function} openPopupHandler - The function that handles the preview image functionality.
   */
  constructor(data, cardSelector, openPopupHandler) {
    ({ title            : this._imgTitle,
      link              : this._imgLink } = data);
    this._cardSelector      = cardSelector;
    this._openPopupHandler  = openPopupHandler;
  }

  /**
   * Gets the image card element from the HTML template.
   */
  _getTemplate() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector(".element")
      .cloneNode(true);
  }

  /**
   * Handles the clicking of the like button on the image card.
   * @param {Object} e The default event object.
   */
  _handleLikeIcon(e) {
    e.target
      .classList
      .toggle("element__like-btn_active");
  }

  /**
   * Handles the deletion of the image card, when delete icon on the image card is clicked.
   * @param {Object} e The default event object.
   */
  _handleDeleteCard(e) {
    e.target
      .closest(".element")
      .remove();
  }

  /**
   * Handles the preview image functionality.
   * @param {Object} e The default event object.
   */
  _handlePreviewImage(e) {
    this._openPopupHandler(imgPopup);
    popupImg.src = e.target.src;
    popupImg.alt = e.target.alt;
    popupCaption.textContent = e.target.alt;
  }

  /**
   * Sets all the event listeners on the new image card element
   */
  _setEventListeners() {
    this._cardLikeBtn     = this._cardElement.querySelector(".element__like-btn");
    this._cardDeleteBtn   = this._cardElement.querySelector(".element__delete-btn");
    this._cardImg         = this._cardElement.querySelector(".element__img");

    this._cardLikeBtn.addEventListener("click", e => this._handleLikeIcon(e));
    this._cardDeleteBtn.addEventListener("click", e => this._handleDeleteCard(e));
    this._cardImg.addEventListener("click", e => this._handlePreviewImage(e));
  }

  /**
   * Generates the new image card element and populates it with the required values.
   * @return {Object} The new image card element.
   */
  generateCard() {
    this._getTemplate();
    this._setEventListeners();

    this._cardTitle             = this._cardElement.querySelector(".element__title");
    this._cardImg.src           = this._imgLink;
    this._cardImg.alt           = this._imgTitle;
    this._cardTitle.textContent = this._imgTitle;

    return this._cardElement;
  }
}

export default Card;