/**
 * This module takes care of all the requests made to the API - https://around.nomoreparties.co
 * @module Api
 */

/** Class representing all the API related requests */
class Api {
  constructor(options){
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponseStatus = response => {
    return (response.ok) ? response.json() : Promise.reject(`Error: ${response.status}`);
  }

  getInitialCards = () => {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
      .then(response => this._checkResponseStatus(response));
  }

  getUserData = () => {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
      .then(response => this._checkResponseStatus(response));
  }

  updateUserData = (title, subtitle) => {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._headers.authorization,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: title,
        about: subtitle
      })
    })
      .then(response => this._checkResponseStatus(response));
  }

  addNewCard = (cardName, cardPicUrl) => {
    return fetch(`${this._baseUrl}/cards`,{
      method: "POST",
      headers: {
        authorization: this._headers.authorization,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: cardName,
        link: cardPicUrl
      })
    })
      .then(response => this._checkResponseStatus(response));
  }
}

export default Api;