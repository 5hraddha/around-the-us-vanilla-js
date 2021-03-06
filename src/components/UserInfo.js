/**
 * This module takes care of rendering information about the user on the page.
 * @module UserInfo
 */

/** Class is responsible for rendering information about the user on the page. */
class UserInfo {
  /**
   * Creates a new UserInfo component.
   * @param {Object} obj -  An object with the selectors of three elements:  
   *                        1. Of the user's name, 
   *                        2. Of the user's about info and 
   *                        3. Of the user's avatar.
   */
  constructor({userTitleSelector, userSubtitleSelector, userProfilePicSelector}) {
    this._userTitleElement      = document.querySelector(userTitleSelector);
    this._userSubtitleElement   = document.querySelector(userSubtitleSelector);
    this._userProfilePicElement = document.querySelector(userProfilePicSelector);
    this._userTitle             = this._userTitleElement.textContent;
    this._userSubtitle          = this._userSubtitleElement.textContent;
    this._userProfilePic        = this._userProfilePicElement.src;
  }

  /**
   * Gets the information about the user. 
   * @returns {Object} An object with information about the user. 
   */
  getUserInfo() {
    const userData = {
      id: this._userId,
      name: this._userTitle,
      about: this._userSubtitle,
      avatar: this._userProfilePic
    };
    return userData;
  }

  /**
   * Sets the new information about the user. 
   * @param {string} title - The new name or title of the user.
   * @param {string} subtitle - The new job or subtitle of the user.
   * @param {string} avatar - The URL of the new avatar of the user.
   * @param {string} id - The id of the user.
   */
  setUserInfo( title = this._userTitle, 
              subtitle = this._userSubtitle, 
              avatar = this._userProfilePic,
              id = this._userId) {
    this._userId                            = id;
    this._userTitleElement.textContent      = title;
    this._userSubtitleElement.textContent   = subtitle;
    this._userProfilePicElement.src         = avatar;
    this._userProfilePicElement.alt         = title;
    this._userTitle                         = title;
    this._userSubtitle                      = subtitle;
    this._userProfilePic                    = avatar;
  }
}

export default UserInfo;