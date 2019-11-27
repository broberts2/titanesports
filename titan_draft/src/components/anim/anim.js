import React from "react";
import { merge, bounce, flipInY, zoomInRight } from "react-animations";
import Radium, { StyleRoot } from "radium";

const styles = {
  none: {},
  bounce: {
    animation: "1 1s",
    animationName: Radium.keyframes(bounce, "bounce")
  },
  flipInY: {
    animation: "1 0.5s",
    animationName: Radium.keyframes(flipInY, "flipInY")
  },
  zoomInRight: {
    animation: "1 0.5s",
    animationName: Radium.keyframes(zoomInRight, "zoomInRight")
  },
  flipZoom: {
    animation: "1 1s",
    animationName: Radium.keyframes(merge(zoomInRight, flipInY), "flipZoom")
  }
};

export default class Anim extends React.Component {
  render() {
    return (
      <StyleRoot>
        <div
          style={{
            animation: this.props.animation
              ? this.props.animation
              : styles[this.props.animationName].animation,
            animationName: styles[this.props.animationName].animationName
          }}
        >
          {this.props.children}
        </div>
      </StyleRoot>
    );
  }
}
