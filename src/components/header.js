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
            <AwesomeButton type={"primary"} size={"medium"}>
              Text
            </AwesomeButton>
          </div>
          <div className={"button"}>
            <AwesomeButton type={"primary"} size={"medium"}>
              Text
            </AwesomeButton>
          </div>
          <div className={"button"}>
            <AwesomeButton type={"primary"} size={"medium"}>
              Text
            </AwesomeButton>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
