try {
  const setup = async () => {
    document.getElementById("modal-container").classList.add("modal-lg");
    let selector = "blue";
    let blue_img = null;
    let red_img = null;

    const validate = () => {
      const team1_title =
        document.getElementById("team1-title").value.length > 0;
      const team2_title =
        document.getElementById("team2-title").value.length > 0;
      const bttn = document.getElementById("draft-builder-submit-bttn");
      if (team1_title && team2_title && blue_img && red_img) {
        bttn.classList.remove("restrict");
      } else {
        bttn.classList.add("restrict");
      }
    };

    const success_display = obj => {
      document.getElementById("modal-footer").innerHTML = "";
      const copy = num => {
        let copyText;
        switch (num) {
          case "1":
            copyText = document.getElementById("blue-link-box-text");
            break;
          case "2":
            copyText = document.getElementById("red-link-box-text");
            break;
          case "3":
            copyText = document.getElementById("spectator-link-box-text");
            break;
        }
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        document.execCommand("copy");
        alert("Copied to clipboard!");
      };
      document.getElementById("modal-body").innerHTML = `
          <h3>Blue Captain Link</h3>
          <div class="input-group mb-3" onclick="copy(1)">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1"><i class="far fa-clipboard"></i></span>
            </div>
            <input id="blue-link-box-text" readonly type="text" class="form-control" aria-describedby="basic-addon1" value="${obj.b}"></input>
          </div>
          <h3>Red Captain Link</h3>
          <div class="input-group mb-3" onclick="copy(2)">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1"><i class="far fa-clipboard"></i></span>
            </div>
            <input id="red-link-box-text" readonly type="text" class="form-control" aria-describedby="basic-addon1" value="${obj.r}"></input>
          </div>
          <h3>Spectator Link</h3>
          <div class="input-group mb-3" onclick="copy(3)">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1"><i class="far fa-clipboard"></i></span>
            </div>
            <input id="spectator-link-box-text" readonly type="text" class="form-control" aria-describedby="basic-addon1" value="${obj.s}"></input>
          </div>
        `;
    };
    globals.fns.modalPending(true);
    document.getElementById("modal-footer").innerHTML = `
        <div class="modal-footer">
          <h4 id="modal-error" style="color: red; position: absolute; left: 0; margin: 30px; margin-top: 0px;"></h4>
          <button id="draft-builder-submit-bttn" type="button" class="btn btn-primary restrict" id="modal-login-bttn">Generate Titan-Draft</button>
        </div>
      `;
    const imgs = await globals.api.getDraftLogos();
    const createBody = () => {
      let rows = [];
      let row = [];
      globals.state._items_loaded = 0;
      Object.values(imgs.logos).map((el, i) => {
        row.push(`<td id="draft-cell-${i}" style="padding: 0px;">
            <div class="img">
              <img id="draft-cell-img-${i}" src="${
          el["1"]
        }" onload="if(++globals.state._items_loaded >= 10) globals.fns.modalPending(false)"></img>
            </div></td>`);
        if ((i + 1) % 4 === 0) {
          rows.push(`<tr>${row.join()}</tr>`);
          row = [];
        }
      });
      if (row.length > 0) {
        rows.push(`<tr>${row.join()}</tr>`);
      }
      return rows.toString().replace(/,/g, "");
    };
    document.getElementById("modal-body").innerHTML = `
        <h3>Titan Draft</h3>
        <div class="draft-builder">
          <div class="scroll-table">
            <table class="table table-bordered table-dark">
              <tbody>
                ${createBody()}
              </tbody>
            </table>
          </div>
          <div class="btn-group">
            <button id="draft-team-bttn" type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Selecting Blue Logo
            </button>
            <div class="dropdown-menu">
              <div id="draft-drop-blue" class="dropdown-item">Blue</div>
              <div id="draft-drop-red" class="dropdown-item">Red</div>
            </div>
          </div>
          <div class="input-group mb-3">
            <input id="team1-title" type="text" class="form-control" placeholder="Blue Team Name" aria-label="Blue-Team"></input>
          </div>
          <div class="input-group mb-3">
            <input id="team2-title" type="text" class="form-control" placeholder="Red Team Name" aria-label="Red-Team"></input>
          </div>
        </div>
      `;
    Object.values(imgs.logos).map((el, i) => {
      let element = document.getElementById(`draft-cell-${i}`);
      element.addEventListener("click", e => {
        Object.values(imgs.logos).map((el, i) => {
          if (e.path[2].id !== `draft-cell-${i}`) {
            document
              .getElementById(`draft-cell-${i}`)
              .classList.remove(`inner-glow-${selector}`);
          } else {
            document
              .getElementById(`draft-cell-${i}`)
              .classList.add(`inner-glow-${selector}`);
            const img = document
              .getElementById(`draft-cell-img-${i}`)
              .src.split("/");
            if (selector === "blue") {
              blue_img = img[img.length - 1];
            } else {
              red_img = img[img.length - 1];
            }
            validate();
          }
        });
      });
    });
    document.getElementById("team1-title").addEventListener("input", validate);
    document.getElementById("team2-title").addEventListener("input", validate);
    document.getElementById("draft-drop-blue").addEventListener("click", () => {
      selector = "blue";
      const bttn = document.getElementById("draft-team-bttn");
      bttn.classList.remove("btn-danger");
      bttn.classList.add("btn-primary");
      bttn.innerHTML = `Selecting Blue Logo`;
    });
    document.getElementById("draft-drop-red").addEventListener("click", () => {
      selector = "red";
      const bttn = document.getElementById("draft-team-bttn");
      bttn.classList.remove("btn-primary");
      bttn.classList.add("btn-danger");
      bttn.innerHTML = `Selecting Red Logo`;
    });
    document
      .getElementById("draft-builder-submit-bttn")
      .addEventListener("click", async () => {
        globals.fns.modalPending(true);
        const res = await globals.api.createDraft({
          type: "tournament",
          t1_logo: blue_img,
          t2_logo: red_img,
          t1_name: document.getElementById("team1-title").value,
          t2_name: document.getElementById("team2-title").value
        });
        if (res.code < 300) {
          success_display(res.special);
        } else {
          document.getElementById("modal-error").innerHTML = res.msg;
        }
        globals.fns.modalPending(false);
      });
  };
  setup();
} catch (e) {}

$("#modal").modal();
