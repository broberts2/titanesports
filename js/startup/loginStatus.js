const loginStatus = async () => {
  const cookie = _read_cookie();
  if (cookie.titan_key) {
    const value = await _get_self();
    console.log(value);
    document.getElementById("logged_user").innerHTML = `<p>Jetgorilla</p>`;
    document.getElementById("sign_in").innerHTML = "";
  }
};

loginStatus();
