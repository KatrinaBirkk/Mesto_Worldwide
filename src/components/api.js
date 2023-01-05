import { checkResponse } from "./utils.js";

const config = {
  baseUrl: "https://nomoreparties.co/v1/wbf-cohort-3",
  headers: {
    authorization: "b36172dc-4c92-418a-a285-4baac88e4766",
    "Content-Type": "application/json",
  },
};

function getUserInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(checkResponse);
}

function sendProfileData(name, occupation) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: occupation,
    }),
  }).then(checkResponse);
}

function sendNewCard(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then(checkResponse);
}

function sendNewAvatar(avatar) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar,
    }),
  }).then(checkResponse);
}

function deleteCard(_id) {
  return fetch(`${config.baseUrl}/cards/${_id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);
}

function getCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(checkResponse);
}

function unLike(_id) {
  return fetch(`${config.baseUrl}/cards/likes/${_id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);
}

function putLike(_id) {
  return fetch(`${config.baseUrl}/cards/likes/${_id}`, {
    method: "PUT",
    headers: config.headers,
  }).then(checkResponse);
}

export {
  getUserInfo,
  sendProfileData,
  sendNewCard,
  getCards,
  sendNewAvatar,
  deleteCard,
  unLike,
  putLike,
};
