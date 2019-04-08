import React, { Component } from "react";
import Modal from "react-awesome-modal";
import { AwesomeButton } from "react-awesome-button";

export default class Leagues extends Component {
  compoonentWillReceiveProps(newProps) {
    console.log(newProps);
  }

  render() {
    console.log(this.props.visible);
    return (
      <Modal
        visible={this.props.visible === 1 ? true : false}
        width={"400"}
        height={"300"}
        effect={"fadeInUp"}
        onClickAway={() => this.props.closeModal()}
      >
        <div className={"modal-buttons"}>
          <div className={"button"} onClick={() => this.props.closeModal()}>
            <a
              href={
                "https://docs.google.com/forms/d/e/1FAIpQLSdbNu54hkyYr2n3XkPTGQujWWdGJ4iDPAACz5pMRbrEMc3-6g/viewform"
              }
              target={"_blank"}
            >
              <AwesomeButton type={"primary"} size={"large"}>
                Team Application
              </AwesomeButton>
            </a>
          </div>
          <div className={"button"} onClick={() => this.props.closeModal()}>
            <a
              href={
                "https://docs.google.com/forms/d/e/1FAIpQLScI3LEC4Ggvos90t_5IqgyDubWyitZbGkK69cKwMb4KcS-NXA/viewform"
              }
              target={"_blank"}
            >
              <AwesomeButton type={"primary"} size={"large"}>
                Solo Application
              </AwesomeButton>
            </a>
          </div>
          <div className={"button"} onClick={() => this.props.closeModal()}>
            <a
              href={
                "https://docs.google.com/forms/d/e/1FAIpQLScZlXf6KZM9jUPy8n8adZWDv6eQ-V6O1jfatO4HmU9ajiAqsg/viewform"
              }
              target={"_blank"}
            >
              <AwesomeButton type={"primary"} size={"large"}>
                Shoutcast Application
              </AwesomeButton>
            </a>
          </div>
        </div>
      </Modal>
    );
  }
}
