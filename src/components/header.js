import React, { Component } from "react";
import { AwesomeButton } from "react-awesome-button";
import styles from "react-awesome-button/src/styles/themes/theme-c137";
import MediaQuery from "react-responsive";
import api from "../api";

class Header extends Component {
  state = {
    primaryRender: this.standard,
    userLogged: false
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ userLogged: nextProps.userLogged });
  }

  componentDidMount() {
    api.get_cookie("titan_key")
      ? this.props.showUser(true)
      : this.props.showUser(false);
    this.scale();
    this.resize();
    window.addEventListener("scroll", this.scale);
    window.addEventListener("resize", () => this.resize());
  }

  resize() {
    window.outerWidth < 701
      ? this.setState({ primaryRender: 0 })
      : this.setState({ primaryRender: 1 });
  }

  scale() {
    try {
      const distanceY =
          window.pageYOffset || document.documentElement.scrollTop,
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
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div className={"header"}>
        <div className="header-content-wrapper">
          <div className={"header-content"}>
            <img id={"header-img"} src={require("../img/logo.png")} />
            <div id={"header-buttons"} className={"button-cluster"}>
              {this.state.primaryRender ? (
                <div>
                  {this.state.userLogged ? (
                    <div
                      className={"button"}
                      onClick={() =>
                        this.props.modalAction.activateUserProfile()}
                    >
                      <a>
                        <div className="linkButton">
                          <div className={`fas fa-user fa-2x`} />
                        </div>
                      </a>
                    </div>
                  ) : null}
                </div>
              ) : (
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
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
