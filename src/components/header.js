import React, { Component } from "react";
import { AwesomeButton } from "react-awesome-button";
import styles from "react-awesome-button/src/styles/themes/theme-c137";

class Header extends Component {
  render() {
    return (
      <div className={"header"}>
        <img src={require("../img/logo.png")} />
        <div className={"button-cluster"}>
          <div className={"button"}>
            <AwesomeButton type={"primary"} size={"large"}>
              Join Us on Discord
            </AwesomeButton>
          </div>
          <div className={"button"}>
            <AwesomeButton type={"primary"} size={"large"}>
              Watch Us on Twitch
            </AwesomeButton>
          </div>
          <div className={"button"}>
            <AwesomeButton type={"primary"} size={"large"}>
              Join the League
            </AwesomeButton>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
