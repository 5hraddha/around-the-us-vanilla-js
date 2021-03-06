/**
 * This module takes care of all the requests made to the API - https://around.nomoreparties.co
 * @module Api
 */

/** Class representing all the API related requests */
class Api {
  /**
   * Sets the base URL and header authorization token for the API endpoints.
   * @param {options} obj - An object having the base URL and headers
   */
  constructor(options){
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  /**
   * Checks the server's response of the Fetch API call to tell whether it was successful or not.
   * @param {Object} response The response of the Fetch API call.
   * @return {Object} If the response was successful, returns the JSON else a Promise object with a given reason.
   */
  _checkResponseStatus = response => {
    return (response.ok)
      ? response.json()
      : Promise.reject(`Error Code: ${response.status} | Error Msg: ${response.statusText}`);
  }

  /**
   * Get initial image cards from the server using a GET request.
   * @return {Promise} The Promise of the Fetch API call.
   */
  getInitialCards = () => {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
      .then(this. _checkResponseStatus);
  }

  /**
   * Adds a new image card to the server using a POST request.
   * @param {string} cardName The name of the place in the new image card.
   * @param {string} cardPicUrl The URL of the picture in the new image card.
   * @return {Promise} The Promise of the Fetch API call.
   */
  addNewCard = (cardName, cardPicUrl) => {
    return fetch(`${this._baseUrl}/cards`,{
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: cardName,
        link: cardPicUrl
      })
    })
      .then(this. _checkResponseStatus);
  }

  /**
   * Deletes an existing image card from the server using a DELETE request.
   * @param {string} cardId The id of image card to be deleted.
   * @return {Promise} The Promise of the Fetch API call.
   */
  deleteCard = cardId => {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers
    })
      .then(this. _checkResponseStatus);
  }

  /**
   * Likes an existing image card from the server using a PUT request.
   * @param {string} cardId The id of image card to be liked.
   * @return {Promise} The Promise of the Fetch API call.
   */
  likeCard = cardId => {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers
    })
      .then(this. _checkResponseStatus);
  }

  /**
   * Unlikes a liked image card from the server using a DELETE request.
   * @param {string} cardId The id of image card to be unliked.
   * @return {Promise} The Promise of the Fetch API call.
   */
  unlikeCard = cardId => {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers
    })
      .then(this. _checkResponseStatus);
  }

  /**
   * Get the current user data from the server using a GET request.
   * @return {Promise} The Promise of the Fetch API call.
   */
  getUserData = () => {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
      .then(this. _checkResponseStatus);
  }

  /**
   * Updates the current user data from the server using a PATCH request.
   * @param {string} title The new title or name of the current user.
   * @param {string} subtitle The new subtitle or about info of the current user.
   * @return {Promise} The Promise of the Fetch API call.
   */
  updateUserData = (title, subtitle) => {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: title,
        about: subtitle
      })
    })
      .then(this. _checkResponseStatus);
  }

  /**
   * Updates the current user's avatar from the server using a PATCH request.
   * @param {string} newAvatarUrl The new URL of the user avatar.
   * @return {Promise} The Promise of the Fetch API call.
   */
  updateUserAvatar = newAvatarUrl => {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: newAvatarUrl
      })
    })
      .then(this. _checkResponseStatus);
  }
}

export default Api;