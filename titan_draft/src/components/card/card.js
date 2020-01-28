import React from "react";
import Components from "../../components";
import "./card.css";

class Card extends React.Component {
  state = {
    animationName: "none",
    opacity: "1"
  };

  componentDidMount() {
    if (this.props.state.active === this.props.id) {
      this.setState({ animationName: "pulse" });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.championData !== this.props.championData) {
      this.setState({ animationName: "flipInY", opacity: "1" });
    } else if (prevProps.state.active !== this.props.state.active) {
      if (this.props.state.active === this.props.id) {
        this.setState({ animationName: "pulse" });
      } else {
        this.setState({ animationName: "none" });
      }
    }
  }

  render() {
    return (
      <div className={`card`}>
        <Components.Anim animationName={this.state.animationName}>
          <div
            className={`body ${
              this.props.state.active === this.props.id ? "" : ""
            }`}
            style={{
              width: this.props.banned ? "75%" : "100%",
              backgroundColor: this.props.blue
                ? "rgb(33, 153, 191)"
                : "rgb(214, 61, 61)",
              opacity: this.state.opacity
            }}
          >
            {this.props.championData ? (
              <div className={"container"}>
                {this.props.banned ? (
                  <div className={"ban-icon"}>
                    <i className={"fas fa-ban"}></i>
                  </div>
                ) : null}
                <div className={"name"}>
                  {this.props.banned ? (
                    <h5>{this.props.championData.name}</h5>
                  ) : (
                    <h4>{this.props.championData.name}</h4>
                  )}
                </div>
                {this.props.simple ? (
                  <img
                    src={
                      this.props.championData.loadingImg
                        ? this.props.championData.loadingImg
                        : require("../../img/urf_loading.png")
                    }
                  />
                ) : (
                  <video muted preload="auto" loop>
                    <source
                      src={this.props.championData.vid}
                      type={"video/mp4"}
                    />
                  </video>
                )}
              </div>
            ) : (
              <div
                className={this.props.banned ? "banned-container" : "container"}
              >
                <img src={require("../../img/null.png")} />
              </div>
            )}
          </div>
        </Components.Anim>
      </div>
    );
  }
}

export default Card;
