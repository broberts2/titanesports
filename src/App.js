import React, { Component } from "react";
import Header from "./components/header";
import modal_router from "./components/modal_bodies/modal_router";
import "./index.css";

class App extends Component {
  state = { video: null, modal: false, modalType: "" };

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
        {modal_router(this.state.modalType, this.state.modal, () =>
          this.setState({ modal: false })
        )}
        {this.state.video ? (
          <div>
            <div className={"hyperlinks"}>
              <a>About</a>
              <a>News</a>
              <a
                onClick={() =>
                  this.setState({ modal: true, modalType: "stats" })}
              >
                Statistics
              </a>
              <a>Contact Us</a>
              <a>Business Inquiry</a>
            </div>
            <Header
              modalAction={() =>
                this.setState({ modal: true, modalType: "leagues" })}
            />
            {this.state.video}
          </div>
        ) : null}
      </div>
    );
  }
}

export default App;
