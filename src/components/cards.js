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
  const templatePicture = cardElement.querySelector(".element__image");
  const templatePictureTitle = cardElement.querySelector(".element__title");
  templatePictureTitle.textContent = name;
  templatePicture.src = link;
  templatePicture.alt = `Картинка ${name}`;

  const ownerId = owner._id;
  const templateDeleteButton = cardElement.querySelector(
    ".element__button_type_delete"
  );
  const templateLikeButton = cardElement.querySelector(
    ".element__button_type_like"
  );
  const templateLikeCounter = cardElement.querySelector(".element__counter");

  if (ownerId === MyId) {
    templateDeleteButton.classList.remove("element__button_type_delete_none");
  }
  if (likes === undefined) {
    likes = "0";
  } else {
    likes.forEach((element) => {
      if (MyId === element._id) {
        templateLikeButton.classList.add("element__button_type_liked");
      }
    });

    likes = likes.length;
  }
  cardElement.querySelector(".element__counter").textContent = likes;

  templateLikeButton.addEventListener("click", function (evt) {
    if (templateLikeButton.classList.contains("element__button_type_liked")) {
      unLike(_id)
        .then((res) => {
          evt.target.classList.remove("element__button_type_liked");
          templateLikeCounter.textContent = res.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      putLike(_id)
        .then((res) => {
          evt.target.classList.add("element__button_type_liked");
          templateLikeCounter.textContent = res.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

  templateDeleteButton.addEventListener("click", function () {
    deleteCard(_id)
      .then((res) => {
        if (ownerId === MyId) {
          templateDeleteButton.classList.remove(
            "element__button_type_delete_none"
          );
          cardElement.remove();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });

  templatePicture.addEventListener("click", function () {
    openPopup(pictureFullSize);
    popupImage.src = link;
    popupLabel.textContent = name;
    popupImage.alt = name;
  });
  return cardElement;
}

export { createGallery, createCard, pictureFullSize };
