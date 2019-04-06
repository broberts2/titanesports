import React, { Component } from "react";
import { AwesomeButton } from "react-awesome-button";
import styles from "react-awesome-button/src/styles/themes/theme-c137";

class Header extends Component {
  render() {
    return (
      <div className={"header"}>
        <img src={require("../img/logo.png")} />
        <div className={"button-cluster"}>
          <AwesomeButton type={"primary"} size={"icon"}>
            Text
          </AwesomeButton>
          <AwesomeButton type={"primary"} size={"icon"}>
            Text
          </AwesomeButton>
          <AwesomeButton type={"primary"} size={"icon"}>
            Text
          </AwesomeButton>
          <AwesomeButton type={"primary"} size={"icon"}>
            Text
          </AwesomeButton>
        </div>
      </div>
    );
  }
}

export default Header;
