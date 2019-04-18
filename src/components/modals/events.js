import React, { Component } from "react";
import Modal from "react-awesome-modal";
import { AwesomeButton } from "react-awesome-button";

export default class Events extends Component {
  render() {
    return (
      <Modal
        visible={this.props.visible === this.props.index ? true : false}
        width={"75%"}
        height={"90%"}
        effect={"fadeInUp"}
        onClickAway={() => this.props.closeModal()}
      >
        <div className={"modal-style"}>
          <div className={"events"}>
            <iframe
              src="https://calendar.google.com/calendar/embed?showPrint=0&amp;showCalendars=0&amp;showTz=0&amp;height=600&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src=titanesportsleague%40gmail.com&amp;color=%231B887A&amp;ctz=America%2FNome"
              style={{ borderWidth: "0" }}
              width={"100%"}
              height={"100%"}
              frameborder="0"
              scrolling="no"
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
