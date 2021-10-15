export const setDataLoadingMsg = (form, loadingMsg) => {
  form.querySelector(".popup__submit").textContent = loadingMsg;
}