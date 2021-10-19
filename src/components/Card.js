/**
 * This module takes care of creating a new image card element
 * @module Card
 */

/** Class representing an image card in the webpage */
class Card {
  /**
   * Creates a new image card.
   * @param {Object} obj - An object having new image card details and callbacks.
   * @param {string} cardTemplateSelector -  The card template element selector.
   * @param {string} userId -  The id of the current user.
   */
  constructor({card, handleCardClick, handleTrashBtnClick, handleLikeBtnClick}, cardTemplateSelector, userId) {
    ({ _id                      : this._imgId,
      owner                     : this._imgOwnerInfo,
      name                      : this._imgName,
      link                      : this._imgLink,
      likes                     : this._imgLikes} = card);
    this._cardData              = card;
    this._userId                = userId;
    this._handleCardClick       = handleCardClick;
    this._handleTrashBtnClick   = handleTrashBtnClick;
    this._handleLikeBtnClick    = handleLikeBtnClick;
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
   * Gets all the required DOM Elements from the image card.
   */
  _getCardDOMElements = () => {
    this._cardImg             = this._cardElement.querySelector(".element__img");
    this._cardTitle           = this._cardElement.querySelector(".element__title");
    this._cardLikeBtn         = this._cardElement.querySelector(".element__like-btn");
    this._cardLikeCount       = this._cardElement.querySelector(".element__like-count");
    this._cardDeleteBtn       = this._cardElement.querySelector(".element__delete-btn");
  }

  /**
   * Checks if the current user is the owner of the image.
   * @return {Boolean} true or false.
   */
  _checkUserIdentity = () => {
    return (this._imgOwnerInfo._id === this._userId) ? true : false;
  }

  /**
   * Checks if the image has been liked already.
   * @param {Object} e The default event object.
   * @return {Boolean} true or false.
   */
  _isImgAlreadyLiked = e => {
    return e.target.classList.contains('element__like-btn_active');
  }

  /**
   * Checks if current user liked the card
   * @return {Boolean} true or false.
   */
  _checkIfLiked = () => this._imgLikes.some(like => like._id === this._userId);

  /**
   * Sets all the event listeners on the new image card element.
   */
  _setEventListeners() {
    if(this._checkUserIdentity()){
      this._cardDeleteBtn.addEventListener("click", e => this._handleTrashBtnClick(e));
    } else {
      this._cardDeleteBtn.remove();
      this._cardDeleteBtn = null;
    }
    this._cardLikeBtn.addEventListener("click", e => this._handleLikeBtnClick(this._isImgAlreadyLiked(e), this._imgId));
    this._cardImg.addEventListener("click", () => this._handleCardClick(this._imgName, this._imgLink));
  }

  /**
   * Renders number of likes and change likes button state.
   * @param {Object} cardData The data of the image card.
   */
  renderLikes = cardData => {
    this._cardLikeCount.textContent = cardData.likes.length;
    this._cardLikeBtn.classList.toggle('element__like-btn_active');
  }

  /**
   * Generates the new image card element and populates it with the required values.
   * @return {Object} The new image card element.
   */
  generateCard() {
    this._getTemplate();
    this._getCardDOMElements();
    this._setEventListeners();

    this._cardImg.src                   = this._imgLink;
    this._cardImg.alt                   = this._imgName;
    this._cardTitle.textContent         = this._imgName;
    if(this._checkIfLiked()){
      this.renderLikes(this._cardData);
    }
    return this._cardElement;
  }
}

export default Card;