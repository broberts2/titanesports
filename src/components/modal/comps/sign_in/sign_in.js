document.getElementById("modal-body").innerHTML = `
  <h3>Username</h3>
  <div class="input-group mb-3">
    <input id="sign-in-username" type="text" class="form-control" placeholder="Username" aria-label="Username"></input>
  </div>
  <h3>Password</h3>
  <div class="input-group mb-3">
    <input id="sign-in-password" type="password" class="form-control" placeholder="Password" aria-label="Password"></input>
  </div>
`;
document.getElementById("modal-footer").innerHTML = `
  <div class="modal-footer">
    <h4 id="modal-error" style="color: red; position: absolute; left: 0; margin: 30px; margin-top: 0px;"></h4>
    <button type="button" class="btn btn-primary" id="modal-login-bttn">Login</button>
  </div>
`;
document.getElementById("modal-login-bttn").addEventListener("click", () => {
  globals.api
    .loginUser({
      credentials: {
        username: document.getElementById("sign-in-username").value,
        password: document.getElementById("sign-in-password").value
      }
    })
    .then(res => {
      globals.fns.modalPending(false);
      if (res.code < 300) {
        document.getElementById("modal-error").innerHTML = "";
        $("#modal").modal("hide");
      } else {
        document.getElementById("modal-error").innerHTML = res.msg;
      }
    });
  globals.fns.modalPending(true);
});
$("#modal").modal();
