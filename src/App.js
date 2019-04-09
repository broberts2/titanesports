import React, { Component } from "react";
import Header from "./components/header";
import VideoBackground from "./components/video_background";
import Content from "./components/content";
import Features from "./components/features";
import modals from "./components/modals/_modals";
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
      </div>
    );
  }
}

export default App;
