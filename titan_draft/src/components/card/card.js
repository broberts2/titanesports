import React from "react";
import Components from "../../components";
import "./card.css";

const config = require("../../../config");

class Card extends React.Component {
  state = {
    animationName: "none"
  };

  async playAudio(audioPath) {
    let audio = await new Audio(audioPath);
    audio.play();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.championData !== this.props.championData) {
      if (this.props.championData) {
        if (this.props.banned) {
          this.playAudio(this.props.championData.banAudio);
        } else {
          this.playAudio(this.props.championData.pickAudio);
        }
      }
      this.setState({ animationName: "flipInY" });
    }
  }

  render() {
    return (
      <div className={`card`}>
        <Components.Anim animationName={this.state.animationName}>
          <div
            className={`body ${
              this.props.state.active === this.props.id ? "active" : ""
            }`}
            style={{
              width: this.props.banned ? "75%" : "100%",
              backgroundColor: this.props.blue
                ? "rgb(33, 153, 191)"
                : "rgb(214, 61, 61)"
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
                  <img src={this.props.championData.loadingImg} />
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
