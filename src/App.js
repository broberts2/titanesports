import React, { Component } from "react";
import Header from "./components/header";
import "./index.css";

class App extends Component {
  state = { video: null };

  async componentDidMount() {
    const _video = await require("./webm/animated-kayle-morgana-login.webm");
    this.setState({
      video: (
        <video id="background-video" loop autoPlay>
          <source src={_video} type={"video/webm"} />
        </video>
      )
    });
  }

  render() {
    return <div>{this.state.video}</div>;
  }
}

export default App;
