import React, { Component } from "react";
import Modal from "react-awesome-modal";
import { AwesomeButton } from "react-awesome-button";

export default class Leagues extends Component {
  render() {
    return (
      <Modal
        visible={this.props.state.modal === this.props.index ? true : false}
        width={"400"}
        height={"300"}
        effect={"fadeInUp"}
        onClickAway={() => this.props.actions.closeModal()}
      >
        t
      </Modal>
    );
  }
}
