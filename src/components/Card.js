/**
 * This module takes care of creating a new image card element
 * @module Card
 */

/** Class representing an image card in the webpage */
class Card {
  /**
   * Creates a new image card.
   * @param {Object} obj - An object having new image card details and a callback to handle click on any image
   * @param {string} cardTemplateSelector -  The card template element selector.
   */
  constructor({card, handleCardClick, handleTrashBtnClick}, cardTemplateSelector, userId) {
    ({ owner                    : this._imgOwnerInfo,
      name                      : this._imgName,
      link                      : this._imgLink,
      likes                     : this._imgLikes} = card);
    this._userId                = userId;
    this._handleCardClick       = handleCardClick;
    this._handleTrashBtnClick   = handleTrashBtnClick;
    this._cardTemplateSelector  = cardTemplateSelector;
  }

  /**
   * Gets the image card element from the HTML template.
   */
  _getTemplate() {
    this._cardElement = document
      .querySelector(this._cardTemplateSelector)
      .content
      .querySelector(".element")
      .cloneNode(true);
  }

  /**
   * Handles the clicking of the like button on the image card.
   * @param {Object} e The default event object.
   */
  _handleLikeIcon = e => {
    e.target
      .classList
      .toggle("element__like-btn_active");
  }

  _checkUserIdentity = () => {
    return (this._imgOwnerInfo._id === this._userId) ? true : false;
  }

  /**
   * Sets all the event listeners on the new image card element
   */
  _setEventListeners() {
    this._cardLikeBtn     = this._cardElement.querySelector(".element__like-btn");
    this._cardDeleteBtn   = this._cardElement.querySelector(".element__delete-btn");
    this._cardImg         = this._cardElement.querySelector(".element__img");

    if(this._checkUserIdentity()){
      this._cardDeleteBtn.addEventListener("click", e => this._handleTrashBtnClick(e));
    } else {
      this._cardDeleteBtn.remove();
      this._cardDeleteBtn = null;
    }
    this._cardLikeBtn.addEventListener("click", this._handleLikeIcon);
    this._cardImg.addEventListener("click", () => this._handleCardClick(this._imgName, this._imgLink));
  }

  /**
   * Generates the new image card element and populates it with the required values.
   * @return {Object} The new image card element.
   */
  generateCard() {
    this._getTemplate();
    this._setEventListeners();

    this._cardTitle                     = this._cardElement.querySelector(".element__title");
    this._cardLikeCount                 = this._cardElement.querySelector(".element__like-count");
    this._cardImg.src                   = this._imgLink;
    this._cardImg.alt                   = this._imgName;
    this._cardTitle.textContent         = this._imgName;
    this._cardLikeCount.textContent     = this._imgLikes.length;
    return this._cardElement;
  }
}

export default Card;