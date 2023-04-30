class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUser() {
    const token = localStorage.getItem('jwt')
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }

  getInitialCards() {
    const token = localStorage.getItem('jwt')
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: `Bearer ${token}`
      },
    }).then(this._checkResponse);
  }

  setUserInfo(data) {
    const token = localStorage.getItem('jwt')
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._checkResponse);
  }

  newCard(data) {
    const token = localStorage.getItem('jwt')
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._checkResponse);
  }

  setAvatar(avatar) {
    const token = localStorage.getItem('jwt')
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(avatar),
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    const token = localStorage.getItem('jwt')
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
      method: "DELETE",
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(id, isLiked) {
    const token = localStorage.getItem('jwt')
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: `${isLiked ? "PUT" : "DELETE"}`,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }
}

const api = new Api({
  baseUrl: "http://localhost:3000",
});

export default api;
