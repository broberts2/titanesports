import React from "react";
import {
  merge,
  bounce,
  flipInY,
  zoomInRight,
  pulse,
  fadeOutDown,
  fadeOut,
  fadeIn,
  bounceIn
} from "react-animations";
import Radium, { StyleRoot } from "radium";

const styles = {
  none: {},
  bounce: {
    animation: "1 1s",
    animationName: Radium.keyframes(bounce, "bounce")
  },
  pulse: {
    animation: "infinite 1s",
    animationName: Radium.keyframes(pulse, "pulse")
  },
  fadeOut: {
    animation: "infinite 1s",
    animationName: Radium.keyframes(fadeOut, "fadeOut")
  },
  fadeIn: {
    animation: "infinite 1s",
    animationName: Radium.keyframes(fadeIn, "fadeIn")
  },
  fadeOutDown: {
    animation: "infinite 1s",
    animationName: Radium.keyframes(fadeOutDown, "fadeOutDown")
  },
  flipInY: {
    animation: "1 0.5s",
    animationName: Radium.keyframes(flipInY, "flipInY")
  },
  bounceIn: {
    animation: "infinite 2s",
    animationName: Radium.keyframes(bounceIn, "bounceIn")
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
