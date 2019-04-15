import React, { Component } from "react";
import { AwesomeButton } from "react-awesome-button";

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
        <center>
          <div
            className={"button"}
            onClick={() => {
              console.log("clicked");
              document.querySelector(".content-pane").scrollIntoView();
              setTimeout(() => {
                window.scrollBy(0, -150);
              }, 500);
            }}
          >
            <div className="linkButton">Welcome to Titan eSports</div>
          </div>
          <h2
            style={{
              textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"
            }}
          >
            Titan eSports is currently in development and will be experiencing
            substantial feature and visual updates in the coming weeks. Check
            back soon!
          </h2>
        </center>
      </div>
    );
  }
}

export default WelcomeButton;
