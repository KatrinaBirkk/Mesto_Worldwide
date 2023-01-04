import { openPopup } from "./modal.js";
import { deleteCard, unLike, putLike } from "./api.js";
import { MyId } from "../index.js";

const popupImage = document.querySelector(".popup__image");
const popupLabel = document.querySelector(".popup__label");
const pictureFullSize = document.querySelector("#fullpicture");
const cardTemplate = document.querySelector("#cards").content;

function createGallery(cardsGallery, arrayOfCardsInfo) {
  arrayOfCardsInfo.forEach((element) => {
    const newCard = createCard(element);
    cardsGallery.prepend(newCard);
  });
}

function createCard({ name, link, likes, owner, _id }) {
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
  cardElement.querySelector(".element__title").textContent = name;
  cardElement.querySelector(".element__image").src = link;
  cardElement.querySelector(".element__image").alt = `Картинка ${name}`;

  let ownerId = owner._id;
  if (ownerId === MyId) {
    cardElement
      .querySelector(".element__button_type_delete")
      .classList.remove("element__button_type_delete_none");
  }
  if (likes === undefined) {
    likes = "0";
  } else {
    likes.forEach((element) => {
      if (MyId === element._id) {
        cardElement
          .querySelector(".element__button_type_like")
          .classList.add("element__button_type_liked");
      }
    });

    likes = likes.length;
  }
  cardElement.querySelector(".element__counter").textContent = likes;

  cardElement
    .querySelector(".element__button_type_like")
    .addEventListener("click", function (evt) {
      if (
        cardElement
          .querySelector(".element__button_type_like")
          .classList.contains("element__button_type_liked")
      ) {
        unLike(_id)
          .then((res) => {
            evt.target.classList.remove("element__button_type_liked");
            cardElement.querySelector(".element__counter").textContent =
              res.likes.length;
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        putLike(_id).then((res) => {
          evt.target.classList.add("element__button_type_liked");
          cardElement.querySelector(".element__counter").textContent =
            res.likes.length;
        });
      }
    });

  cardElement
    .querySelector(".element__button_type_delete")
    .addEventListener("click", function () {
      deleteCard(_id)
        .then((res) => {
          if (ownerId === MyId) {
            cardElement
              .querySelector(".element__button_type_delete")
              .classList.remove("element__button_type_delete_none");
            cardElement.remove();
          }
        })
        .catch((err) => {
          console.log(err);
        });
      // .finally((res) => {
      //   cardElement.remove();
      // });
    });

  cardElement
    .querySelector(".element__image")
    .addEventListener("click", function () {
      openPopup(pictureFullSize);
      popupImage.src = link;
      popupLabel.textContent = name;
      document.querySelector(".popup__image").alt = name;
    });
  return cardElement;
}

export { createGallery, createCard, pictureFullSize };
