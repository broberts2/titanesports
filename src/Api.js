const { bake_cookie, read_cookie, delete_cookie } = require("sfcookies");
const config = require("./config");

module.exports = {
  loginUser: async credentials => {
    const user = await fetch(`http://localhost:8000/u/loginUser`, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization:
          "Basic " + btoa(credentials.username + ":" + credentials.password)
      }
    }).then(res => res.json());
    if (user.token) {
      bake_cookie("titan_key", user.token);
    }
    console.log(user);
    return user;
  },
  logoutUser: () => {
    delete_cookie("titan_key");
    window.location.reload();
  },
  createUser: async userData => {
    return await fetch(`http://localhost:8000/u/createUser`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    }).then(res => res.json());
  }
};
