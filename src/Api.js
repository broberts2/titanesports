const { bake_cookie, read_cookie, delete_cookie } = require("sfcookies");
const config = require("./config");

module.exports = {
  loginUser: async credentials => {
    const user = await fetch(`http://localhost:8000/loginUser`, {
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
  getUser: async user_id => {
    const user = await fetch(`http://localhost:8000/getUser?u=${user_id}`, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(res => res.json());
    return user;
  },
  validateToken: async () => {
    const titan_key = read_cookie("titan_key");
    const user = await fetch(`http://localhost:8000/s/validateToken`, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        titan_key
      }
    }).then(res => res.json());
    return user;
  },
  logoutUser: () => {
    delete_cookie("titan_key");
    window.location.reload();
  },
  createUser: async userData => {
    return await fetch(`http://localhost:8000/createUser`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    }).then(res => res.json());
  }
};
