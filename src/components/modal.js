function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", function (evt) {
    if (evt.key === "Escape") {
      popup.classList.remove("popup_opened");
    }
  });
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", function (evt) {
    if (evt.key === "Escape") {
      popup.classList.remove("popup_opened");
    }
  });
}

function closePopupByClickToOverlay(targetToClick) {
  targetToClick.forEach((overlay) => {
    overlay.addEventListener("click", (event) => {
      const target = event.target;
      if (target === overlay) {
        closePopup(overlay);
      }
    });
  });
}

export { closePopupByClickToOverlay, openPopup, closePopup };
