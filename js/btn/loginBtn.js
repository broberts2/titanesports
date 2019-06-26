let sign_in_div = document.getElementById("sign_in").innerHTML;

const loginBtn = async () => {
  const res = await _request(
    "login-content",
    {
      username: document.getElementById("login-username").value,
      password: document.getElementById("login-password").value
    },
    obj => _login(obj)
  );
  if (res.code < 300) {
    _set_cookie("titan_key", res.msg);
    document.getElementById("logged_user").innerHTML = `<p>Jetgorilla</p>`;
    document.getElementById("sign_in").innerHTML = "";
    $("#loginModal").modal("hide");
  }
};
