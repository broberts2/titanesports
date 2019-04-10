import React, { Component } from "react";
import { AwesomeButton } from "react-awesome-button";
import styles from "react-awesome-button/src/styles/themes/theme-c137";
import MediaLink from "../media_links";
import MediaQuery from "react-responsive";

class Header extends Component {
  componentDidMount() {
    this.scale();
    this.resize();
    window.addEventListener("scroll", this.scale);
    window.addEventListener("resize", () => this.resize());
  }

  resize() {
    window.outerWidth < 701
      ? this.setState({ primaryRender: this.mini })
      : this.setState({ primaryRender: this.standard });
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

  standard = (
    <div>
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
      <div className={"button"}>
        <a href={MediaLink.youTube} target={"_blank"}>
          <AwesomeButton
            style={{ width: "65px", height: "65px" }}
            type={"primary"}
            size={"icon"}
          >
            <div className={`fab fa-youtube fa-2x`} />
          </AwesomeButton>
        </a>
      </div>
      <div
        className={"button"}
        onClick={() => this.props.modalAction.activateLeagues()}
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
  );

  mini = (
    <div
      className={"button"}
      onClick={() => this.props.modalAction.activateMiniMenu()}
    >
      <a>
        <AwesomeButton
          style={{ width: "45px", height: "45px" }}
          type={"primary"}
          size={"icon"}
        >
          <div className={`fas fa-bars fa-1x`} />
        </AwesomeButton>
      </a>
    </div>
  );

  state = {
    primaryRender: this.standard
  };

  render() {
    return (
      <div className={"header"}>
        <div className="header-content-wrapper">
          <div className={"header-content"}>
            <img id={"header-img"} src={require("../img/logo.png")} />
            <div id={"header-buttons"} className={"button-cluster"}>
              {this.state.primaryRender}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
