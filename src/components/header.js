import React, { Component } from "react";
import { AwesomeButton } from "react-awesome-button";
import CModal from "../components/modal";
import styles from "react-awesome-button/src/styles/themes/theme-c137";

class Header extends Component {
  state = {
    modal: false
  };

  render() {
    return (
      <div className={"header"}>
        <CModal
          visible={this.state.modal}
          closeModal={() => this.setState({ modal: false })}
        />
        <img src={require("../img/logo.png")} />
        <div className={"button-cluster"}>
          <div className={"button"}>
            <a href={"https://discord.gg/u2VHyUR"} target={"_blank"}>
              <AwesomeButton type={"primary"} size={"large"}>
                Join Us on Discord
              </AwesomeButton>
            </a>
          </div>
          <div className={"button"}>
            <a href={"https://www.twitch.tv/titanesportz"} target={"_blank"}>
              <AwesomeButton type={"primary"} size={"large"}>
                Watch Us on Twitch
              </AwesomeButton>
            </a>
          </div>
          <div
            className={"button"}
            onClick={() => this.setState({ modal: true })}
          >
            <a>
              <AwesomeButton type={"primary"} size={"large"}>
                Join the League
              </AwesomeButton>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
