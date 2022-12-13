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
const popupImage = document.querySelector(".popup__image");
const popupLabel = document.querySelector(".popup__label");
const deleteButton = document.querySelector(".element__button_type_delete");
const formPlace = document.querySelector(".form_newplace"); //почему здесь не работает обращение по имени формы?
const formProfile = document.forms.profileForm;
const nameInput = container.querySelector(".form__field_type_author");
const jobInput = container.querySelector(".form__field_type_occupation");

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

editButton.addEventListener("click", function () {
  openPopup(popupEditProfile);
  nameInput.textContent = authorProfile.value;
  jobInput.textContent = aboutProfile.value;
  document.addEventListener("keydown", function (evt) {
    if ((evt.key = "Escape")) {
      closePopup(popupEditProfile);
    }
  });
});

addButton.addEventListener("click", function () {
  openPopup(popupNewPlace);
  document.addEventListener("keydown", function (evt) {
    if ((evt.key = "Escape")) {
      closePopup(popupNewPlace);
    }
  });
});

const overlays = document.querySelectorAll(".popup");
overlays.forEach((overlay) => {
  const popup = overlay.closest(".popup");
  overlay.addEventListener("click", () => closePopup(popup));
});

// находим все крестики проекта по универсальному селектору
const closeButtons = document.querySelectorAll(".popup__button_type_close");

closeButtons.forEach((button) => {
  // находим 1 раз ближайший к крестику попап
  const popup = button.closest(".popup");
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener("click", () => closePopup(popup));
});

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

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formProfile.addEventListener("submit", handleProfileFormSubmit);

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
  cardElement.querySelector(".element__image").alt = name;

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

  cardsBlock.prepend(cardElement);
}

create();

const formNewPlace = document.querySelector(".form_newplace");
const placeInput = document.querySelector(".form__field_type_place");
const linkInput = document.querySelector(".form__field_type_link");

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  createCard({ name: placeInput.value, link: linkInput.value });
  placeInput.value = "";
  linkInput.value = "";
  closePopup(popupNewPlace);
}

formNewPlace.addEventListener("submit", handleAddFormSubmit);

const pictureFullSize = document.querySelector("#fullpicture");

document
  .querySelector("#close_fullpicture")
  .addEventListener("click", function () {
    closePopup(pictureFullSize);
  });

//Блок с валидацией формы

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("form__field_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("form__field-error_active");
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("form__field_type_error");
  errorElement.classList.remove("form__field-error_active");
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

//переключение состояния кнопки
const toggleButtonState = (inputList, buttonElement) => {
  console.log(hasInvalidInput(inputList));
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute("disabled", true);
    buttonElement.classList.add("button_inactive");
  } else {
    buttonElement.removeAttribute("disabled");
    buttonElement.classList.remove("button_inactive");
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".form__field"));
  const buttonElement = formElement.querySelector(".popup__button_type_submit");

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".form"));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

    setEventListeners(formElement);
  });
};

enableValidation();
