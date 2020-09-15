import React from "react";
import styled from "styled-components";
import Router from "./components/Router/Router";
import Modal from "./components/Modal/Modal";
import Config from "./config/index";
import __tooling__ from "./__tooling__";

const SEASON = "Divinity";

const SKIP_SETUP = false;

const TESTING = true;

const PRODUCTION = false;

const openSocket = require("socket.io-client");
const socket = openSocket(
  PRODUCTION ? "https://titandraft.titan-esports.org" : "http://localhost:7000"
);

const _App = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgb(24, 24, 24);
  & img {
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    user-drag: none;
  }
`;

export default class App extends React.Component {
  state = {
    testPing: () => socket.emit("test", "stuff"),
    skip_setup: SKIP_SETUP,
    config: Config[SEASON],
    team_active: 0,
    last_team_active: 0,
    modalVisible: false,
    modalContent: null,
    modalId: "pick/ban",
    setModalStatus: (modalVisible, modalContent) =>
      this.setState({ modalVisible, modalContent }),
  };

  componentDidMount() {
    if (TESTING) __tooling__(this);
  }

  render() {
    return (
      <_App>
        <Modal STATE={this.state} />
        <Router STATE={this.state} />
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            margin: "20px",
            width: "75px",
            height: "35px",
            backgroundColor: "pink",
            zIndex: 10,
          }}
          onClick={() => this.state.testPing()}
        />
      </_App>
    );
  }
}
