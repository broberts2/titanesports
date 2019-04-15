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
          <div className="linkButton">
            <div className={`fab fa-discord fa-2x`} />
          </div>
        </a>
      </div>
      <div className={"button"}>
        <a href={MediaLink.twitch} target={"_blank"}>
          <div className="linkButton">
            <div className={`fab fa-twitch fa-2x`} />
          </div>
        </a>
      </div>
      <div className={"button"}>
        <a href={MediaLink.youTube} target={"_blank"}>
          <div className="linkButton">
            <div className={`fab fa-youtube fa-2x`} />
          </div>
        </a>
      </div>
      <div
        className={"button"}
        onClick={() => this.props.modalAction.activateLeagues()}
      >
        <a>
          <div className="linkButton">
            <div className={`fas fa-file-signature fa-2x`} />
          </div>
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
        <div className="linkButton">
          <div className={`fas fa-bars fa-1x`} />
        </div>
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
              <h2
                style={{
                  float: "right",
                  marginRight: "30px",
                  textShadow:
                    "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"
                }}
              >
                {this.props.headerTitle}
              </h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
