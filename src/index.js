import "./pages/index.css";
import { createGallery, pictureFullSize } from "./components/cards.js";
import { openPopup, closePopup } from "./components/utils.js";
import { enableValidation } from "./components/validate.js";
import {
  handleAddFormSubmit,
  handleProfileFormSubmit,
  authorProfile,
  aboutProfile,
  nameInput,
  jobInput,
  popupEditProfile,
  popupNewPlace,
  cardsBlock,
} from "./components/modal.js";
import { initialCards } from "./components/data.js";

const editButton = document.querySelector(".profile__button_type_edit");
const formNewPlace = document.querySelector(".form_newplace");
const addButton = document.querySelector(".profile__button_type_add");
//почему здесь не работает обращение по имени формы?
const formProfile = document.forms.profileForm;

const overlays = document.querySelectorAll(".popup");

editButton.addEventListener("click", function () {
  openPopup(popupEditProfile);
  nameInput.textContent = authorProfile.value;
  jobInput.textContent = aboutProfile.value;
  document.addEventListener("keydown", function (evt) {
    if (evt.key === "Escape") {
      closePopup(popupEditProfile);
    }
  });
});

addButton.addEventListener("click", function () {
  openPopup(popupNewPlace);
  document.addEventListener("keydown", function (evt) {
    if (evt.key === "Escape") {
      closePopup(popupNewPlace);
    }
  });
});

overlays.forEach((overlay) => {
  overlay.addEventListener("click", (event) => {
    const target = event.target;
    if (
      target === overlay
      // target !== insideArea &&
      // target !== formProfile &&
      // target !== nameInput &&
      // target !== jobInput
    ) {
      closePopup(overlay);
    }
  });
});

// находим все крестики проекта по универсальному селектору
const closeButtons = document.querySelectorAll(".popup__button_type_close");

closeButtons.forEach((button) => {
  // находим 1 раз ближайший к крестику попап
  const popup = button.closest(".popup");
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener("click", () => closePopup(popup));
});

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formProfile.addEventListener("submit", handleProfileFormSubmit);

createGallery(cardsBlock, initialCards);

formNewPlace.addEventListener("submit", handleAddFormSubmit);

document
  .querySelector("#close_fullpicture")
  .addEventListener("click", function () {
    closePopup(pictureFullSize);
  });

enableValidation();
