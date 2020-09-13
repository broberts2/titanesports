import React from "react";
import styled, { ThemeProvider } from "styled-components";
import Router from "./components/Router/Router";
import Modal from "./components/Modal/Modal";
import Config from "./config/index";

const _App = styled.div`
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  background: rgb(24, 24, 24);
`;

const SEASON = "Divinity";

const SKIP_SETUP = false;

export default class App extends React.Component {
  state = {
    skip_setup: SKIP_SETUP,
    config: Config[SEASON],
    team_active: 1,
    last_team_active: 2,
    modalVisible: false,
    modalContent: null,
    setModalStatus: (modalVisible, modalContent) =>
      this.setState({ modalVisible, modalContent }),
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ team_active: 0, last_team_active: 1 });
      setTimeout(() => {
        this.setState({ team_active: 2, last_team_active: 1 });
        setTimeout(() => {
          this.setState({ team_active: 0, last_team_active: 2 });
          setTimeout(() => {
            this.setState({ team_active: 1, last_team_active: 2 });
          }, 1250);
        }, 4000);
      }, 1250);
    }, 4000);
  }

  render() {
    return (
      <_App>
        <Modal STATE={this.state} />
        <Router STATE={this.state} />
      </_App>
    );
  }
}
