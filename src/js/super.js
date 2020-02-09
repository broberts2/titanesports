const scripts = [
  "js/api.js",
  "components/header/header.js",
  "components/footer/footer.js",
  "components/modal/modal.js",
  "components/video_loop/video_loop.js",
  "components/video_buttons/video_buttons.js"
];

scripts.map(el => {
  let script = document.createElement("script");
  script.src = el;
  document.head.append(script);
  let styleSheet = document.createElement("link");
  styleSheet.href = el.replace(".js", ".css");
  styleSheet.rel = "stylesheet";
  document.head.append(styleSheet);
});

let globals = {
  state: {},
  fns: {
    saveTitanKey: key => (document.cookie = `titan_key=${key}`),
    readTitanKey: () => {
      let cookie = document.cookie.match(
        "(^|[^;]+)\\s*titan_key\\s*=\\s*([^;]+)"
      );
      return cookie ? cookie.pop() : null;
    },
    deleteTitanKey: () =>
      (document.cookie =
        "titan_key=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;")
  },
  api: {}
};
