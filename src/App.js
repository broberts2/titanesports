import React, { Component } from "react";
import Header from "./components/header";
import "./index.css";

class App extends Component {
  state = { video: null };

  async componentDidMount() {
    const _video = await require("./webm/champion-garen-godking-animated.webm");
    this.setState({
      video: (
        <video id={"background-video"} preload="auto" loop autoPlay>
          <source src={_video} type={"video/webm"} />
        </video>
      )
    });
  }

  render() {
    return (
      <div>
        {this.state.video ? (
          <div>
            <div className={"hyperlinks"}>
              <a>About</a>
              <a>News</a>
              <a>Statistics</a>
              <a>Contact Us</a>
              <a>Business Inquiry</a>
            </div>
            <Header />
            {this.state.video}
          </div>
        ) : null}
      </div>
    );
  }
}

export default App;
