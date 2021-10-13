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
}

export default Api;