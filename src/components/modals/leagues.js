import React, { Component } from "react";
import Modal from "react-awesome-modal";
import { AwesomeButton } from "react-awesome-button";
import MediaLink from "../../media_links";

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
        <div className={"modal-style"}>
          <div className={"modal-button-group"}>
            <div className={"button-group"}>
              <div
                className={"button"}
                onClick={() => this.props.actions.closeModal()}
              >
                <a
                  href={MediaLink.googleDocs.teamApplication}
                  target={"_blank"}
                >
                  <AwesomeButton type={"primary"} size={"large"}>
                    Team Application
                  </AwesomeButton>
                </a>
              </div>
              <div
                className={"button"}
                onClick={() => this.props.actions.closeModal()}
              >
                <a
                  href={MediaLink.googleDocs.soloApplication}
                  target={"_blank"}
                >
                  <AwesomeButton type={"primary"} size={"large"}>
                    Solo Application
                  </AwesomeButton>
                </a>
              </div>
              <div
                className={"button"}
                onClick={() => this.props.actions.closeModal()}
              >
                <a
                  href={MediaLink.googleDocs.shoutCastApplication}
                  target={"_blank"}
                >
                  <AwesomeButton type={"primary"} size={"large"}>
                    Shoutcast Application
                  </AwesomeButton>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}
