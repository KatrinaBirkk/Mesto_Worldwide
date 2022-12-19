import "./pages/index.css";
import { createGallery, pictureFullSize } from "./components/cards.js";
import { enableValidation } from "./components/validate.js";
import {
  closePopupBySubmitAndEscape,
  closePopupByClickToOverlay,
  openPopup,
  closePopup,
} from "./components/modal.js";
import { initialCards } from "./components/data.js";

const editButton = document.querySelector(".profile__button_type_edit");
const formNewPlace = document.querySelector(".form_newplace");

const formProfile = document.forms.profileForm;
const placeInput = document.querySelector(".form__field_type_place");
const linkInput = document.querySelector(".form__field_type_link");
const nameInput = document.querySelector(".form__field_type_author");
const jobInput = document.querySelector(".form__field_type_occupation");
const authorProfile = document.querySelector(".profile__title");
const aboutProfile = document.querySelector(".profile__subtitle");
const popupEditProfile = document.querySelector(".popup_type_editprofile");
const popupNewPlace = document.querySelector(".popup_type_addcard");
const cardsBlock = document.querySelector(".elements");
const addButton = document.querySelector(".profile__button_type_add");
const overlays = document.querySelectorAll(".popup");

// Обработчик «отправки» формы, хотя пока// она никуда отправляться не будет
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.
  // Получите значение полей jobInput и nameInput из свойства value
  // Выберите элементы, куда должны быть вставлены значения полей
  // Вставьте новые значения с помощью textContent
  authorProfile.textContent = nameInput.value;
  aboutProfile.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const newCard = createCard({ name: placeInput.value, link: linkInput.value });
  cardsBlock.prepend(newCard);
  placeInput.value = "";
  linkInput.value = "";
  closePopup(popupNewPlace);
}

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

closePopupBySubmitAndEscape(addButton, popupNewPlace);
closePopupByClickToOverlay(overlays);

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

const settings = {
  formSelector: ".form",
  inputSelector: ".form__field",
  submitButtonSelector: ".popup__button_type_submit",
  inactiveButtonClass: "button_inactive",
  inputErrorClass: "form__field_type_error",
  errorClass: "form__field-error_active",
};

enableValidation(settings);
