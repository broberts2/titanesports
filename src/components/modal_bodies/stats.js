import React, { Component } from "react";
import Modal from "react-awesome-modal";
import { AwesomeButton } from "react-awesome-button";

export default class Stats extends Component {
  render() {
    return (
      <Modal
        visible={this.props.visible}
        width={"75%"}
        height={"400"}
        effect={"fadeInUp"}
        onClickAway={() => this.props.closeModal()}
      >
        <div className={"stats"}>
          <center>
            <div className={"element"}>
              <h1>Titan Esports Player/Team Lookup</h1>
            </div>
            <div className={"element"}>
              <input type={"text"} />
            </div>
            <div className={"element"}>
              <div className={"radio"}>
                <input type={"radio"} />
              </div>
              <div className={"radio"}>
                <h2>Player</h2>
              </div>
            </div>
            <div className={"element"}>
              <div className={"radio"}>
                <input type={"radio"} />
              </div>
              <div className={"radio"}>
                <h2>Team</h2>
              </div>
            </div>
            <div className={"element"}>
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
            </div>
          </center>
        </div>
      </Modal>
    );
  }
}
