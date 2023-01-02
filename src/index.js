import "./pages/index.css";
import { createCard } from "./components/cards.js";
import { enableValidation } from "./components/validate.js";
import {
  closePopupByClickToOverlay,
  openPopup,
  closePopup,
} from "./components/modal.js";
import {
  readProfileInfo,
  sendProfileData,
  sendNewCard,
  addCardsFromAPI,
  sendNewAvatar,
  MyId,
} from "./components/api.js";

export { authorProfile, aboutProfile, profileAvatar, cardsBlock };

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

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  authorProfile.textContent = nameInput.value;
  aboutProfile.textContent = jobInput.value;
  sendProfileData(
    "https://nomoreparties.co/v1/wbf-cohort-3/users/me",
    "b36172dc-4c92-418a-a285-4baac88e4766",
    nameInput.value,
    jobInput.value
  );
  closePopup(popupEditProfile);
}

readProfileInfo();

//Изменить изображение
function handleChangeAvatar(evt) {
  evt.preventDefault();
  sendNewAvatar(
    "https://nomoreparties.co/v1/wbf-cohort-3/users/me/avatar",
    "b36172dc-4c92-418a-a285-4baac88e4766",
    avatarInput.value
  );
  closePopup(popupChangeProfilePhoto);
  evt.target.reset();
}

changeAvatarForm.addEventListener("submit", handleChangeAvatar);

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const newCard = createCard({
    name: placeInput.value,
    link: linkInput.value,
    owner: { _id: MyId },
  });
  cardsBlock.prepend(newCard);
  sendNewCard(
    "https://nomoreparties.co/v1/wbf-cohort-3/cards",
    "b36172dc-4c92-418a-a285-4baac88e4766",
    placeInput.value,
    linkInput.value
  );
  closePopup(popupNewPlace);
  console.log(submitButton);
  submitButton.classList.add("button_inactive");
  submitButton.setAttribute("disabled", true);
  evt.target.reset();
  console.log(submitButton);
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

addCardsFromAPI(
  "https://nomoreparties.co/v1/wbf-cohort-3/cards",
  "b36172dc-4c92-418a-a285-4baac88e4766"
);

formNewPlace.addEventListener("submit", handleAddFormSubmit);

// document
//   .querySelector("#close_fullpicture")
//   .addEventListener("click", function () {
//     closePopup(pictureFullSize);
//   });

const settings = {
  formSelector: ".form",
  inputSelector: ".form__field",
  submitButtonSelector: ".popup__button_type_submit",
  inactiveButtonClass: "button_inactive",
  inputErrorClass: "form__field_type_error",
  errorClass: "form__field-error_active",
};

enableValidation(settings);
