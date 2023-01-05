function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscape);
}

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

function renderLoading(isLoading, buttonSubmit, buttonText) {
  if (isLoading) {
    buttonSubmit.textContent = "Loading...";
  } else {
    buttonSubmit.textContent = buttonText;
  }
}

function renderError(err, buttonSubmit) {
  buttonSubmit.textContent = err;
}

export { checkResponse, openPopup, closePopup, renderLoading, renderError };
