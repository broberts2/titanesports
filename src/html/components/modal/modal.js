const modals = ["sign_in.js", "draft_builder.js"];
const path = "components/modal/comps";
let modalsObj = {};

modals.map(el => {
  modalsObj[el.replace(".js", "")] = () => {
    let script = document.createElement("script");
    script.src = `${path}/${el.replace(".js", "")}/${el}`;
    document.head.append(script);
    let styleSheet = document.createElement("link");
    styleSheet.href = script.src.replace(".js", ".css");
    styleSheet.rel = "stylesheet";
    document.head.append(styleSheet);
  };
});

let modal = this.document.createElement("div");
modal.innerHTML = `
  <div class="modal fade" id="modal" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
    <div id="modal-container" class="modal-dialog modal-dialog-centered"role="document">
      <div class="modal-content">
        <div class="modal-img"><img src="teslogo.png"></img></div>
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body" id="modal-body">
        </div>
        <div id="modal-footer"></div>
        <div id="modal-spinner"></div>
      </div>
    </div>
  </div>
`;
document.body.append(modal);

globals.fns.buildModal = _modal => {
  switch (_modal) {
    case "sign_in":
      return modalsObj.sign_in();
    case "draft_builder":
      return modalsObj.draft_builder();
  }
};

globals.fns.modalPending = isLoading => {
  if (isLoading) {
    document.body.style = "pointer-events: none;";
    document.getElementById("modal-spinner").innerHTML = `
    <div class="modal-spinner">
      <div class="icon">
        <div class="spinner-border" style="width: 200px; height: 200px;" role="status"></div>
      </div>
    </div>
    `;
  } else {
    document.getElementById("modal-spinner").innerHTML = ``;
    document.body.style = "pointer-events: auto;";
  }
};
