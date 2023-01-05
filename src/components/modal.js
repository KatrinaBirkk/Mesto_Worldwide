import { closePopup, openPopup } from "./utils.js";

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
