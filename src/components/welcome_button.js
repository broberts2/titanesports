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
            <AwesomeButton
              style={{ width: "250px", height: "65px" }}
              type={"primary"}
              size={"large"}
            >
              <h3>Welcome to Titan ESports</h3>
            </AwesomeButton>
          </div>
          <div className={"button"} onClick={() => this.props.modalAction()}>
            <AwesomeButton
              style={{ width: "175px", height: "25px" }}
              type={"primary"}
              size={"large"}
            >
              Riot API Terms of Use
            </AwesomeButton>
          </div>
        </center>
      </div>
    );
  }
}

export default WelcomeButton;
