import React from "react";
import styled from "styled-components";
import Router from "./components/Router/Router";
import Modal from "./components/Modal/Modal";
import socketListeners from "./socketListeners/socketListeners";

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
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

export default class App extends React.Component {
  async componentDidMount() {
    socketListeners(this.props.socket, this);
  }

  render() {
    return (
      <_App>
        {this.state && this.state.draftData ? (
          <React.Fragment>
            <Modal STATE={this.state} />
            <Router STATE={this.state} />
          </React.Fragment>
        ) : null}
      </_App>
    );
  }
}
