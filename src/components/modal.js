function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

function closePopupBySubmitAndEscape(button, popup) {
  button.addEventListener("click", function () {
    openPopup(popup);
    document.addEventListener("keydown", function (evt) {
      if (evt.key === "Escape") {
        closePopup(popup);
      }
    });
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
  closePopupBySubmitAndEscape,
  closePopupByClickToOverlay,
  openPopup,
  closePopup,
};
