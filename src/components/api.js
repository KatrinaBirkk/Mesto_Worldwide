import {
  authorProfile,
  aboutProfile,
  profileAvatar,
  cardsBlock,
} from "../index.js";
import { createGallery } from "./cards";

let MyId = 5;

function readProfileInfo() {
  fetch("https://nomoreparties.co/v1/wbf-cohort-3/users/me", {
    headers: {
      authorization: "b36172dc-4c92-418a-a285-4baac88e4766",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      authorProfile.textContent = res.name;
      aboutProfile.textContent = res.about;
      profileAvatar.style.backgroundImage = `url(${res.avatar})`;
      MyId = res._id;
      console.log(MyId);
    });
}

function sendProfileData(url, token, name, occupation) {
  fetch(url, {
    method: "PATCH",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      about: occupation,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
}

function sendNewCard(url, token, name, link) {
  fetch(url, {
    method: "POST",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
}

function sendNewAvatar(url, token, avatar) {
  fetch(url, {
    method: "PATCH",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
}

function deleteCard(url, token) {
  fetch(url, {
    method: "DELETE",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
}

function addCardsFromAPI(url, auth) {
  fetch(url, {
    headers: {
      authorization: auth,
    },
  })
    .then((res) => res.json())
    .then((res) => {
      createGallery(cardsBlock, res);
      console.log(res);
    });
}

function unLike(url, token) {
  fetch(url, {
    method: "DELETE",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
}

function putLike(url, token) {
  fetch(url, {
    method: "PUT",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
}

export {
  readProfileInfo,
  sendProfileData,
  sendNewCard,
  addCardsFromAPI,
  sendNewAvatar,
  MyId,
  deleteCard,
  unLike,
  putLike,
};
