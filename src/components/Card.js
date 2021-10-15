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
  constructor({card, handleCardClick, handleTrashBtnClick, handleLikeBtnClick}, cardTemplateSelector, userId) {
    ({ _id                      : this._imgId,
      owner                     : this._imgOwnerInfo,
      name                      : this._imgName,
      link                      : this._imgLink,
      likes                     : this._imgLikes} = card);
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

  _getCardDOMElements = () => {
    this._cardImg             = this._cardElement.querySelector(".element__img");
    this._cardTitle           = this._cardElement.querySelector(".element__title");
    this._cardLikeBtn         = this._cardElement.querySelector(".element__like-btn");
    this._cardLikeCount       = this._cardElement.querySelector(".element__like-count");
    this._cardDeleteBtn       = this._cardElement.querySelector(".element__delete-btn");
  }

  _checkUserIdentity = () => {
    return (this._imgOwnerInfo._id === this._userId) ? true : false;
  }

  _isImgAlreadyLiked = e => {
    return e.target.classList.contains('element__like-btn_active');
  }

  _toggleLikeIcon = e => {
    this._handleLikeBtnClick(this._isImgAlreadyLiked(e), this._imgId)
      .then(cardData => {
        e.target.classList.toggle('element__like-btn_active');
        this._cardLikeCount.textContent = cardData.likes.length;
      })
      .catch(err => {
        console.log(`Error Name: ${err.name}`);
        console.log(`Error Message: ${err.message}`);
      });
  }

  /**
   * Sets all the event listeners on the new image card element
   */
  _setEventListeners() {
    if(this._checkUserIdentity()){
      this._cardDeleteBtn.addEventListener("click", e => this._handleTrashBtnClick(e));
    } else {
      this._cardDeleteBtn.remove();
      this._cardDeleteBtn = null;
    }
    this._cardLikeBtn.addEventListener("click", this._toggleLikeIcon);
    this._cardImg.addEventListener("click", () => this._handleCardClick(this._imgName, this._imgLink));
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
    this._cardLikeCount.textContent     = this._imgLikes.length;
    if(this._imgLikes.some(like => like._id === this._userId)){
      this._cardLikeBtn.classList.add('element__like-btn_active');
    }
    return this._cardElement;
  }
}

export default Card;