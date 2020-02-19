const production = false;

const serverPath = production
  ? "https://titan-esports.org:8000"
  : "http://localhost:8000";

const titanDraftPath = production
  ? "https//titan-esports.org:7001"
  : "http://localhost:7001";

const _t = async prm =>
  await new Promise(async (resolve, reject) => {
    setTimeout(() => resolve({ code: 500, msg: "Request timed out." }), 8000);
    const response = await prm;
    resolve(response);
  });

const _get = async (url, data) => {
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

const _post = async (url, data) => {
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

// API CALLS
globals.api.getDraftLogos = data =>
  _t(_get(`${serverPath}/getDraftLogos`, data));

globals.api.validateToken = () => _t(_get(`${serverPath}/s/validateToken`));

globals.api.loginUser = data => _t(_get(`${serverPath}/loginUser`, data));

globals.api.getAllUsers = data => _t(_get(`${serverPath}/getAllUsers`, data));

globals.api.createDraft = data =>
  _t(_post(`${titanDraftPath}/api/createDraft`, data));

globals.api.saveGameToDatabase = data =>
  _t(_post(`${titanDraftPath}/s/saveGameToDatabase`, data));

globals.api.getPlayerStatsByLolId = data =>
  _t(_get(`${titanDraftPath}/s/getPlayerStatsByLolId`, data));

globals.api.getGameStatsByCode = data =>
  _t(_get(`${titanDraftPath}/s/getGameStatsByCode`, data));

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
