import { closePopup } from "./utils.js";
import { createCard } from "./cards.js";

const placeInput = document.querySelector(".form__field_type_place");
const linkInput = document.querySelector(".form__field_type_link");
const nameInput = document.querySelector(".form__field_type_author");
const jobInput = document.querySelector(".form__field_type_occupation");
const authorProfile = document.querySelector(".profile__title");
const aboutProfile = document.querySelector(".profile__subtitle");
const popupEditProfile = document.querySelector(".popup_type_editprofile");
const popupNewPlace = document.querySelector(".popup_type_addcard");
const cardsBlock = document.querySelector(".elements");

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

export {
  handleAddFormSubmit,
  handleProfileFormSubmit,
  authorProfile,
  aboutProfile,
  nameInput,
  jobInput,
  popupEditProfile,
  popupNewPlace,
  cardsBlock,
};
