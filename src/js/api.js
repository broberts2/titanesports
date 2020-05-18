const production = false;

globals.constants.serverPath = production
  ? "https://titan-esports.org:8000"
  : "http://localhost:8000";

globals.constants.titanDraftPath = production
  ? "https//titan-esports.org:7001"
  : "http://localhost:7001";

globals.fns._t = async prm =>
  await new Promise(async (resolve, reject) => {
    setTimeout(() => resolve({ code: 500, msg: "Request timed out." }), 8000);
    const response = await prm;
    resolve(response);
  });

globals.fns._get = async (url, data) => {
  const titan_key = globals.fns.readTitanKey();
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      titan_key,
      authorization:
        data && data.credentials
          ? "Basic " +
            btoa(data.credentials.username + ":" + data.credentials.password)
          : null
    }
  });
  return response.json().then(res => res);
};

globals.fns._post = async (url, data) => {
  const titan_key = globals.fns.readTitanKey();
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      titan_key
    },
    body: JSON.stringify(data)
  });
  return response.json().then(res => res);
};

globals.fns._delete = async (url, data) => {
  const titan_key = globals.fns.readTitanKey();
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      titan_key
    },
    body: JSON.stringify(data)
  });
  return response.json().then(res => res);
};

// API CALLS
let script = document.createElement("script");
script.src = "js/api_calls.js";
document.head.append(script);

// AUTHENTICATOR
(async () => {
  const res = await globals.api.validateToken();
  if (res.code < 300) {
    globals.state.user = {
      username: res.username
    };
    document.getElementById("header-sign-in-bttn").innerHTML = "Sign Out";
    try {
      document.getElementById("sign-in-button-wrapper").innerHTML = "";
    } catch (e) {}
  } else {
    globals.state.user = null;
    try {
      document.getElementById("header-sign-in-bttn").innerHTML = "Sign In";
    } catch (e) {}
  }
})();
