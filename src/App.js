import React, { Component } from "react";
import Header from "./components/header";
import VideoBackground from "./components/video_background";
import Content from "./components/content";
import Features from "./components/features";
import modals from "./components/modals/_modals";
import WelcomeButton from "./components/welcome_button";
import "./index.css";

import api from "./api";

class App extends Component {
  state = {
    modal: 0,
    modals: null
  };

  closeModal() {
    this.setState({ modal: 0 });
  }

  componentDidMount() {
    (async () => {
      const val = await api.champion_rotation();
      console.log(val);
    })();
    this.setState({
      modals
    });
  }

  setMenu(modal) {
    this.setState({ modal });
  }

  render() {
    return (
      <div>
        <Header
          modalAction={{
            activateLeagues: () => this.setMenu(1),
            activateMiniMenu: () => this.setMenu(3)
          }}
        />
        {modals(
          this.state.modal,
          () => this.closeModal(),
          num => this.setMenu(num)
        )}
        <VideoBackground />
        <Content img={require("./img/lol_logo.png")}>
          <img width={"100%"} src={require("./img/website-mockup.png")} />
        </Content>
        <WelcomeButton modalAction={() => this.setMenu(4)} />
      </div>
    );
  }
}

export default App;
