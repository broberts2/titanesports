import React, { Component } from "react";
import Modal from "react-awesome-modal";
import moment from "moment";
import Loader from "./loader";

export default class Event extends Component {
  renderContent() {
    return (
      <div>
        {this.props.loading ? (
          <Loader />
        ) : (
          <div>
            {this.props.state.selectedEvent ? (
              <div className={"wrapper"}>
                <div
                  className={"back-button"}
                  onClick={() => {
                    this.props.actions.lastModal();
                  }}
                >
                  <i className="fas fa-arrow-alt-circle-left fa-3x" />
                </div>
                <div className={"image-container"}>
                  <img src={this.props.state.selectedEvent.imgURL} />
                </div>
                <div className={"content"}>
                  <h1>{this.props.state.selectedEvent.title}</h1>
                  <table style={{ width: "100%" }}>
                    <tbody>
                      <tr>
                        <td>
                          <h3>
                            {moment(
                              this.props.state.selectedEvent.start
                            ).format("MMMM Do, YYYY")}
                          </h3>
                        </td>
                        <td>
                          <h4>
                            {`${moment(
                              this.props.state.selectedEvent.start
                            ).format("h:mm a")} - ${moment(
                              this.props.state.selectedEvent.end
                            ).format("h:mm a")}`}
                          </h4>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <p>{this.props.state.selectedEvent.description}</p>
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>
    );
  }

  render() {
    return (
      <Modal
        visible={this.props.state.modal === this.props.index ? true : false}
        width={"50%"}
        height={"80%"}
        effect={"fadeInUp"}
        onClickAway={() => this.props.actions.closeModal()}
      >
        <div className={"modal-style"}>
          <div className={"event"}>{this.renderContent()}</div>
        </div>
      </Modal>
    );
  }
}
