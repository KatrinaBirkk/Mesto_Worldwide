const profile = document.querySelector(".profile__info");
const editButton = document.querySelector(".profile__button_type_edit");
const container = document.querySelector(".popup");
const closeButton = document.querySelector("#close_editform");
const popupEditProfile = document.querySelector(".popup_type_editprofile");
const popupNewPlace = document.querySelector(".popup_type_addcard");
const authorProfile = document.querySelector(".profile__title");
const aboutProfile = document.querySelector(".profile__subtitle");
const addButton = document.querySelector(".profile__button_type_add");
const saveButton = document.querySelector(".popup__button_type_submit");
const closeButtonAddForm = document.querySelector("#close_addform");

const deleteButton = document.querySelector(".element__button_type_delete");

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

editButton.addEventListener("click", function () {
  openPopup(popupEditProfile);
});

closeButton.addEventListener("click", function () {
  closePopup(popupEditProfile);
});

addButton.addEventListener("click", function () {
  openPopup(popupNewPlace);
});

closeButtonAddForm.addEventListener("click", function () {
  closePopup(popupNewPlace);
});

saveButton.addEventListener("click", function () {
  closePopup(popupEditProfile);
});

formElement = document.querySelector(".form"); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOMconst
nameInput = container.querySelector(".form__field_type_author"); // Воспользуйтесь инструментом .querySelector()const
jobInput = container.querySelector(".form__field_type_occupation"); // Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока// она никуда отправляться не будет
function formSubmitHandler(evt) {
  evt.preventDefault();
  // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.
  // Получите значение полей jobInput и nameInput из свойства value
  // Выберите элементы, куда должны быть вставлены значения полей
  // Вставьте новые значения с помощью textContent
  authorProfile.textContent = nameInput.value;
  aboutProfile.textContent = jobInput.value;
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", formSubmitHandler);

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const cardsBlock = document.querySelector(".elements");
const cardTemplate = document.querySelector("#cards").content;

function create() {
  initialCards.forEach(createCard);
}

function createCard({ name, link }) {
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
  cardElement.querySelector(".element__title").textContent = name;
  cardElement.querySelector(".element__image").src = link;

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
      const popupImage = document.querySelector(".popup__image");
      const popupLabel = document.querySelector(".popup__label");
      popupImage.src = link;
      popupLabel.textContent = name;
    });

  cardsBlock.prepend(cardElement);
}

create();

const formNewPlace = document.querySelector(".form_newplace");
const placeInput = document.querySelector(".form__field_type_place");
const linkInput = document.querySelector(".form__field_type_link");

function formAddPlace(evt) {
  evt.preventDefault();
  createCard({ name: placeInput.value, link: linkInput.value });
  placeInput.value = "";
  linkInput.value = "";
  closePopup(popupNewPlace);
}

formNewPlace.addEventListener("submit", formAddPlace);

const pictureFullSize = document.querySelector("#fullpicture");

document
  .querySelector("#close_fullpicture")
  .addEventListener("click", function () {
    closePopup(pictureFullSize);
  });
