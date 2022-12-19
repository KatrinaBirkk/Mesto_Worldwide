import { openPopup } from "./modal.js";

const popupImage = document.querySelector(".popup__image");
const popupLabel = document.querySelector(".popup__label");
const pictureFullSize = document.querySelector("#fullpicture");

const cardTemplate = document.querySelector("#cards").content;

function createGallery(cardsGallery, initialCardsMassive) {
  initialCardsMassive.forEach((element) => {
    const newCard = createCard(element);
    cardsGallery.prepend(newCard);
  });
}

function createCard({ name, link }) {
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
  cardElement.querySelector(".element__title").textContent = name;
  cardElement.querySelector(".element__image").src = link;
  cardElement.querySelector(".element__image").alt = `Картинка ${name}`;

  cardElement
    .querySelector(".element__button_type_like")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("element__button_type_liked");
    });

  cardElement
    .querySelector(".element__button_type_delete")
    .addEventListener("click", function () {
      cardElement.remove();
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
