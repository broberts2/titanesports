import React, { Component } from "react";
import Header from "./components/header";
import AudioButton from "./components/audio_button";
import VideoBackground from "./components/video_background";
import Content from "./components/content";
import Features from "./components/features";
import Leagues from "./components/modals/leagues";
import Stats from "./components/modals/stats";
import "./index.css";

class App extends Component {
  state = {
    modal: 0,
    modals: null
  };

  closeModal() {
    this.setState({ modal: 0 });
  }

  componentDidMount() {
    this.setState({
      modals: [
        <Leagues
          visible={this.state.modal}
          closeModal={() => this.closeModal()}
        />,
        <Stats
          visible={this.state.modal}
          closeModal={() => this.closeModal()}
        />
      ]
    });
  }

  closeModal() {
    this.setState({ modal: 0 });
  }

  render() {
    return (
      <div>
        <Header modalAction={() => this.setState({ modal: 1 })} />
        {this.state.modals}
        <VideoBackground />
        <Content img={require("./img/lol_logo.png")}>
          <Features modalControl={() => this.setState({ modal: 2 })} />
        </Content>
        <AudioButton />
      </div>
    );
  }
}

export default App;
