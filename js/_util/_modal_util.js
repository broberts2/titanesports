const modals = ["loginModal", "playerSearchModal","teamSearchModal"];

const _modal_util = () =>
  modals.map(el =>
    $(`#${el}`).on("hidden.bs.modal", () => {
      let codeDiv = _accessNestedById(el, "code");
      codeDiv.innerHTML = "";
    })
  );

_modal_util();
