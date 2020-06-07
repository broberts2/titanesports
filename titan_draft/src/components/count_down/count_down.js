import React from "react";
import Components from "../../components";
import "./count_down.css";

class CountDown extends React.Component {
  state = {
    active: null,
    classes: {
      left: "slideInLeft",
      right: "slideInRight",
      circle: "0",
      bg: "rgba(18, 18, 18, 0)",
    },
    beepSFX: new Audio(require("../../sfx/beep.mp3")),
    countDownCount: 5,
  };

  run(num) {
    if (num >= 0) {
      return setTimeout(() => {
        this.setState({
          active: null,
        });
        if (num > 0) this.state.beepSFX.play();
        this.setState({
          active: (
            <Components.Anim animationName={"zoomIn"}>{num}</Components.Anim>
          ),
        });
        this.run(num - 1);
      }, 1000);
    } else {
      this.open();
    }
  }

  open() {
    this.setState({
      active: "fin",
      classes: {
        left: "slideOutLeft",
        right: "slideOutRight",
        circle: "0",
        bg: "rgba(18, 18, 18, 0)",
      },
    });
    // setTimeout(() => this.props.setCountdown(false), 1000);
  }

  componentDidMount() {
    this.state.beepSFX.volume = 0.025;
    this.state.classes.bg = "rgba(18, 18, 18, 0)";
    this.state.classes.circle = "0";
    setTimeout(() => this.props.setShowFill(false), 2000);
  }

  componentDidUpdate(prevProps) {
    if (this.props.countDown !== prevProps.countDown) {
      if (this.props.countDown) {
        this.run(this.state.countDownCount);
      }
    }
  }

  render() {
    return (
      <div
        className={"count_down"}
        style={{
          backgroundColor: this.state.classes.bg,
          pointerEvents:
            this.state.active && this.state.active.length > 0 ? "all" : "none",
        }}
      >
        <div className={"img"}>
          <div className={"left"}>
            <Components.Anim
              animationName={
                this.state.active ? this.state.classes.left : "none"
              }
            >
              <img
                src={require("../../img/left_bilgewater.png")}
                style={{ opacity: this.state.active !== null ? 1 : 0 }}
              />
            </Components.Anim>
          </div>
          <div className={"right"}>
            <Components.Anim
              animationName={
                this.state.active ? this.state.classes.right : "none"
              }
            >
              <img
                src={require("../../img/right_bilgewater.png")}
                style={{ opacity: this.state.active !== null ? 1 : 0 }}
              />
            </Components.Anim>
          </div>
          <div
            className={"circle"}
            style={{ opacity: this.state.classes.circle }}
          >
            <img src={require("../../img/circle_bilgewater.png")} />
            <div className={"number"}>{this.state.active}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default CountDown;
