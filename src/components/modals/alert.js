import React, { Component } from "react";
import Modal from "react-awesome-modal";
import { AwesomeButton } from "react-awesome-button";

export default class Alert extends Component {
  render() {
    return (
      <Modal
        visible={this.props.state.modal === this.props.index ? true : false}
        width={"75%"}
        height={"90%"}
        effect={"fadeInUp"}
        onClickAway={() => this.props.actions.closeModal()}
      >
        {this.props.state.alertHtml}
        <div className="linkButton">
          <div className={`fab fa-discord fa-2x`} />
        </div>
      </Modal>
    );
  }
}
