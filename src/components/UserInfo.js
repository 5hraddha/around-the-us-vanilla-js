/**
 * This module takes care of rendering information about the user on the page.
 * @module UserInfo
 */

/** Class is responsible for rendering information about the user on the page. */
class UserInfo {
  /**
   * Creates a new UserInfo component.
   * @param {Object} obj -  An object with the selectors of two elements: one containing the user's name, and another containing the user's job.
   */
  constructor({userTitleSelector, userSubtitleSelector}) {
    this._userTitleElement      = document.querySelector(userTitleSelector);
    this._userSubtitleElement   = document.querySelector(userSubtitleSelector);
  }

  /**
   * Gets the information about the user. 
   * @returns {Object} An object with information about the user. 
   */
  getUserInfo() {
    const userData = {
      title: this._userTitleElement.textContent,
      subtitle: this._userSubtitleElement.textContent
    };
    return userData;
  }

  /**
   * Sets the new information about the user. 
   * @param {string} title - The new name or title of the user.
   * @param {string} subtitle - The new job or subtitle of the user.
   */
  setUserInfo(title, subtitle) {
    this._userTitleElement.textContent = title;
    this._userSubtitleElement.textContent = subtitle;
  }
}

export default UserInfo;