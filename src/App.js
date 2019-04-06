import React, { Component } from "react";
import Header from "./components/header";
import AudioButton from "./components/audio_button";
import VideoBackground from "./components/video_background";
import modal_router from "./components/modal_bodies/modal_router";
import "./index.css";

class App extends Component {
  state = {
    modal: false,
    modalType: ""
  };

  render() {
    return (
      <div>
        {modal_router(this.state.modalType, this.state.modal, () =>
          this.setState({ modal: false })
        )}
        <VideoBackground />
        <div className={"hyperlinks"}>
          <a>About</a>
          <a>News</a>
          <a onClick={() => this.setState({ modal: true, modalType: "stats" })}>
            Statistics
          </a>
          <a>Contact Us</a>
          <a>Business Inquiry</a>
        </div>
        <Header
          modalAction={() =>
            this.setState({ modal: true, modalType: "leagues" })}
        />
        <AudioButton />
      </div>
    );
  }
}

export default App;
