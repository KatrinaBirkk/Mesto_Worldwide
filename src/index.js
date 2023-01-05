import "./pages/index.css";
import { createCard, createGallery } from "./components/cards.js";
import { enableValidation } from "./components/validate.js";
import {
  closePopupByClickToOverlay,
  openPopup,
  closePopup,
} from "./components/modal.js";
import {
  getUserInfo,
  sendProfileData,
  sendNewCard,
  getCards,
  sendNewAvatar,
} from "./components/api.js";

import { renderLoading, renderError } from "./components/utils.js";

export { authorProfile, aboutProfile, profileAvatar, cardsBlock, MyId };

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
const profileAvatar = document.querySelector(".profile__avatar");
const popupNewPlace = document.querySelector(".popup_type_addcard");
const cardsBlock = document.querySelector(".elements");
const addButton = document.querySelector(".profile__button_type_add");
const overlays = document.querySelectorAll(".popup");
const popupChangeProfilePhoto = document.querySelector(
  ".popup_type_changeProfilePhoto"
);
const submitButton = document.querySelector(".submit_picture");
const changeAvatarForm = document.querySelector(".form_profilePhoto");
const avatarInput = document.querySelector(".form__field_avatarInput");

let MyId = 0;

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const buttonFormSubmit = evt.submitter;
  const buttonText = buttonFormSubmit.textContent;
  renderLoading(true, buttonFormSubmit);
  sendProfileData(nameInput.value, jobInput.value)
    .then((res) => {
      authorProfile.textContent = nameInput.value;
      aboutProfile.textContent = jobInput.value;
      closePopup(popupEditProfile);
    })
    .catch((err) => {
      console.log(err);
      renderError(`Error ${err}`);
    })
    .finally(() => {
      renderLoading(false, buttonFormSubmit, buttonText);
    });
}

Promise.all([getUserInfo(), getCards()])
  // тут деструктурируете ответ от сервера, чтобы было понятнее, что пришло
  .then(([userData, cards]) => {
    // тут установка данных пользователя
    authorProfile.textContent = userData.name;
    aboutProfile.textContent = userData.about;
    profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
    MyId = userData._id;
    // и тут отрисовка карточек
    createGallery(cardsBlock, cards);
  })
  .catch((err) => {
    console.log(err);
  });

//Изменить изображение
function handleChangeAvatar(evt) {
  evt.preventDefault();
  const buttonFormSubmit = evt.submitter;
  const buttonText = buttonFormSubmit.textContent;
  renderLoading(true, buttonFormSubmit);
  sendNewAvatar(avatarInput.value)
    .then((res) => {
      profileAvatar.style.backgroundImage = `url(${res.avatar})`;
      closePopup(popupChangeProfilePhoto);
      evt.target.reset();
    })
    .catch((err) => {
      console.log(err);
      renderError(`Error ${err}`);
    })
    .finally(() => {
      renderLoading(false, buttonFormSubmit, buttonText);
    });
}

changeAvatarForm.addEventListener("submit", handleChangeAvatar);

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const buttonFormSubmit = evt.submitter;
  const buttonText = buttonFormSubmit.textContent;
  renderLoading(true, buttonFormSubmit);
  sendNewCard(placeInput.value, linkInput.value)
    .then((res) => {
      const newCard = createCard({
        name: res.name,
        link: res.link,
        owner: { _id: res.owner._id },
        _id: res._id,
      });
      cardsBlock.prepend(newCard);
      closePopup(popupNewPlace);
      // submitButton.classList.add("button_inactive");
      // submitButton.setAttribute("disabled", true);
      evt.target.reset();
    })
    .catch((err) => {
      console.log(err);
      renderError(`Error ${err}`);
    })
    .finally(() => {
      renderLoading(false, buttonFormSubmit, buttonText);
    });
}

editButton.addEventListener("click", function () {
  openPopup(popupEditProfile);
  nameInput.value = authorProfile.textContent;
  jobInput.value = aboutProfile.textContent;
});

profileAvatar.addEventListener("click", function () {
  openPopup(popupChangeProfilePhoto);
});

addButton.addEventListener("click", function () {
  openPopup(popupNewPlace);
});

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

formNewPlace.addEventListener("submit", handleAddFormSubmit);

const settings = {
  formSelector: ".form",
  inputSelector: ".form__field",
  submitButtonSelector: ".popup__button_type_submit",
  inactiveButtonClass: "button_inactive",
  inputErrorClass: "form__field_type_error",
  errorClass: "form__field-error_active",
};

enableValidation(settings);
