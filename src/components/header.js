import React, { Component } from "react";
import { AwesomeButton } from "react-awesome-button";
import styles from "react-awesome-button/src/styles/themes/theme-c137";
import MediaLink from "../media_links";

class Header extends Component {
  componentDidMount() {
    this.scale();
    window.addEventListener("scroll", this.scale);
  }

  scale() {
    const distanceY = window.pageYOffset || document.documentElement.scrollTop,
      shrinkOn = 400,
      headerEl = document.getElementById("header-img"),
      headerEl2 = document.getElementById("header-buttons");
    if (distanceY > shrinkOn) {
      headerEl.classList.add("shrink");
      headerEl.classList.remove("grow");
      headerEl2.classList.add("shrink-less");
      headerEl2.classList.remove("grow-less");
    } else {
      headerEl.classList.add("grow");
      headerEl.classList.remove("shrink");
      headerEl2.classList.add("grow-less");
      headerEl2.classList.remove("shrink-less");
    }
  }

  render() {
    return (
      <div className={"header"}>
        <div className="header-content-wrapper">
          <div className={"header-content"}>
            <img id={"header-img"} src={require("../img/logo.png")} />
            <div id={"header-buttons"} className={"button-cluster"}>
              <div className={"button"}>
                <a href={MediaLink.discord} target={"_blank"}>
                  <AwesomeButton
                    style={{ width: "65px", height: "65px" }}
                    type={"primary"}
                    size={"icon"}
                  >
                    <div className={`fab fa-discord fa-2x`} />
                  </AwesomeButton>
                </a>
              </div>
              <div className={"button"}>
                <a href={MediaLink.twitch} target={"_blank"}>
                  <AwesomeButton
                    style={{ width: "65px", height: "65px" }}
                    type={"primary"}
                    size={"icon"}
                  >
                    <div className={`fab fa-twitch fa-2x`} />
                  </AwesomeButton>
                </a>
              </div>
              <div
                className={"button"}
                onClick={() => this.props.modalAction()}
              >
                <a>
                  <AwesomeButton
                    style={{ width: "65px", height: "65px" }}
                    type={"primary"}
                    size={"icon"}
                  >
                    <div className={`fas fa-file-signature fa-2x`} />
                  </AwesomeButton>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
