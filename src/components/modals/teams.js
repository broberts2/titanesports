import React, { Component } from "react";
import Modal from "react-awesome-modal";
import { AwesomeButton } from "react-awesome-button";

export default class Teams extends Component {
  render() {
    return (
      <Modal
        visible={this.props.visible === this.props.index ? true : false}
        width={"90%"}
        height={"90%"}
        effect={"fadeInUp"}
        onClickAway={() => this.props.closeModal()}
      >
        <div className={"modal-style"}>
          <div className={"teams"}>
            <iframe
              src={
                "https://docs.google.com/spreadsheets/d/e/2PACX-1vSg9R52HrKes4u8z1E-EU_QOyNsiAqkgLQ8hE4qLj9jfjbnLK9DUH2m56qmPe27nnA9FJtBAFFX4eG_/pubhtml?widget=true&amp;headers=false"
              }
              width={"100%"}
              height={"100%"}
            />
            <div className={"button"}>
              <div
                className="linkButton"
                onClick={() => this.props.closeModal()}
              >
                close
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}
