/**
 * This module takes care of adding an image to the popup with its src attribute and caption.
 * @module PopupWithImage
 */
import Popup from "./Popup.js";

/** Class extending from the parent Popup component to implement the functionalities specific to the Image Popup Component */
class PopupWithImage extends Popup {
  /**
   * Creates a new Image Popup component.
   * @param {string} popupSelector -  The CSS class selector to select the image popup window.
   */
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage        = this._popup.querySelector(".popup__img");
    this._popupImageCaption = this._popup.querySelector(".popup__caption");
  }

  /**
   * Opens the image popup and sets the image caption and link.
   * @param {string} imgCaption -  The caption of the image to be previewed or opened.
   * @param {string} imgLink -  The url or link of the image to be previewed or opened.
   */
  open(imgCaption, imgLink) {
    this._popupImageCaption.textContent = imgCaption;
    this._popupImage.src                = imgLink;
    this._popupImage.alt                = imgCaption;
    super.open();
  }
}

export default PopupWithImage;