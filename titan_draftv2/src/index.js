import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

const socket = require("socket.io-client")(
  require("./config").production
    ? "https://titandraft.titan-esports.org"
    : "http://localhost:7000"
);
let params = {};
window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, key, value) => {
  params[key] = value;
});
socket.emit("join", params);

ReactDOM.render(
  <React.StrictMode>
    <App socket={socket} />
  </React.StrictMode>,
  document.getElementById("root")
);
