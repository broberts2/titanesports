import React, { Component } from "react";
import Header from "./components/header";
import AudioButton from "./components/audio_button";
import VideoBackground from "./components/video_background";
import Content from "./components/content";
import Features from "./components/features";
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
        <Header
          modalAction={() =>
            this.setState({ modal: true, modalType: "leagues" })}
        />
        {modal_router(this.state.modalType, this.state.modal, () =>
          this.setState({ modal: false })
        )}
        <VideoBackground />
        <Content img={require("./img/lol_logo.png")}>
          <Features
            modalControl={() =>
              this.setState({ modal: true, modalType: "stats" })}
          />
        </Content>
        <AudioButton />
      </div>
    );
  }
}

export default App;
