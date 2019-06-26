const scripts = [
  "js/_util/_config.js",
  "js/_util/_accessNestedById.js",
  "js/_util/_set_cookie.js",
  "js/_util/_read_cookie.js",
  "js/_util/_delete_cookie.js",
  "js/_util/_get_self.js",
  "js/_util/_http.js",
  "js/_util/_login.js",
  "js/_util/_logout.js",
  "js/_util/_request.js",
  "js/_util/_modal_util.js",
  "js/startup/_video_cycle.js",
  "js/startup/getPlayers.js",
  "js/startup/getTeams.js",
  "js/startup/loginStatus.js",
  "js/btn/loginBtn.js",
  "js/field/searchPlayer.js",
  "js/field/searchTeam.js"
];

const loader = index => {
  let script = document.createElement("script");
  script.src = scripts[index];
  document.head.appendChild(script);
  if (index < scripts.length) {
    script.onload = loader(++index);
  }
};

loader(0);
