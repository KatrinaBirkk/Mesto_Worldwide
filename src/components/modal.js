function openPopup(popup) {
  popup.classList.add("popup_opened");
  closePopupByEscapeButton(popup);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", function (evt) {
    if (evt.key === "Escape") {
      closePopup(popup);
    }
  });
}

function closePopupByEscapeButton(popup) {
  document.addEventListener("keydown", function (evt) {
    if (evt.key === "Escape") {
      closePopup(popup);
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

export {
  closePopupByClickToOverlay,
  closePopupByEscapeButton,
  openPopup,
  closePopup,
};
