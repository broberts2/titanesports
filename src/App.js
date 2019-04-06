import React, { Component } from "react";
import Header from "./components/header";
import "./index.css";

class App extends Component {
  render() {
    return (
      <div>
        <video id="background-video" loop autoPlay>
          <source
            src={require("./webm/animated-kayle-morgana-login.webm")}
            type={"video/webm"}
          />
        </video>
      </div>
    );
  }
}

export default App;
