import React, { Component } from "react";
import MediaLink from "../media_links";
import { AwesomeButton } from "react-awesome-button";
import api from "../utils/api";

class WelcomeButton extends Component {
  componentDidMount() {
    const el = document.getElementById("welcome-button");
    window.addEventListener("scroll", () => this.fade(el));
  }

  fade(el) {
    const distanceY = window.pageYOffset || document.documentElement.scrollTop;
    if (distanceY > 0) {
      el.classList.add("fade-out");
      el.classList.remove("fade-in");
    } else {
      el.classList.add("fade-in");
      el.classList.remove("fade-out");
    }
  }

  render() {
    return (
      <div id={"welcome-button"} className={"welcome-button"}>
        {api.get_cookie("titan_key") ? null : (
          <center>
            <div
              className={"button"}
              onClick={() => this.props.actions.setMenu(6)}
            >
              <div className={"circle-button"}>
                <div className={"icon"}>
                  <div className={`fas fa-user-lock fa-4x`} />
                </div>
              </div>
            </div>
          </center>
        )}
      </div>
    );
  }
}

export default WelcomeButton;
