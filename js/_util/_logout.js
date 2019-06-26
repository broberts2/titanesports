const _logout = () => {
  _delete_cookie();
  document.getElementById("logged_user").innerHTML = "";
  document.getElementById("sign_in").innerHTML = sign_in_div;
};
