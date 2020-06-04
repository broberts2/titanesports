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
  bounceIn,
  zoomIn,
  slideInLeft,
  slideInRight,
  slideInUp,
  slideInDown,
  slideOutLeft,
  slideOutRight,
  slideOutUp,
  slideOutDown,
} from "react-animations";
import Radium, { StyleRoot } from "radium";

const styles = {
  none: {},
  bounce: {
    animation: "1 1s",
    animationName: Radium.keyframes(bounce, "bounce"),
  },
  pulse: {
    animation: "infinite 1s",
    animationName: Radium.keyframes(pulse, "pulse"),
  },
  fadeOut: {
    animation: "1 2s forwards",
    animationName: Radium.keyframes(fadeOut, "fadeOut"),
  },
  fadeIn: {
    animation: "1 0.5s",
    animationName: Radium.keyframes(fadeIn, "fadeIn"),
  },
  fadeOutDown: {
    animation: "infinite 1s",
    animationName: Radium.keyframes(fadeOutDown, "fadeOutDown"),
  },
  flipInY: {
    animation: "1 0.5s",
    animationName: Radium.keyframes(flipInY, "flipInY"),
  },
  bounceIn: {
    animation: "1 1s",
    animationName: Radium.keyframes(bounceIn, "bounceIn"),
  },
  slideInLeft: {
    animation: "1 1s",
    animationName: Radium.keyframes(slideInLeft, "slideInLeft"),
  },
  slideInRight: {
    animation: "1 1s",
    animationName: Radium.keyframes(slideInRight, "slideInRight"),
  },
  slideInDown: {
    animation: "1 1s",
    animationName: Radium.keyframes(slideInDown, "slideInDown"),
  },
  slideInUp: {
    animation: "1 1s",
    animationName: Radium.keyframes(slideInUp, "slideInUp"),
  },
  slideOutLeft: {
    animation: "1 1s",
    animationName: Radium.keyframes(slideOutLeft, "slideOutLeft"),
  },
  slideOutRight: {
    animation: "1 1s",
    animationName: Radium.keyframes(slideOutRight, "slideOutRight"),
  },
  slideOutDown: {
    animation: "1 1s",
    animationName: Radium.keyframes(slideOutDown, "slideOutDown"),
  },
  slideOutUp: {
    animation: "1 1s",
    animationName: Radium.keyframes(slideOutUp, "slideOutUp"),
  },
  zoomInRight: {
    animation: "1 0.5s",
    animationName: Radium.keyframes(zoomInRight, "zoomInRight"),
  },
  zoomIn: {
    animation: "1 1s",
    animationName: Radium.keyframes(zoomIn, "zoomIn"),
  },
  flipZoom: {
    animation: "1 1s",
    animationName: Radium.keyframes(merge(zoomInRight, flipInY), "flipZoom"),
  },
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
            animationName: styles[this.props.animationName].animationName,
          }}
        >
          {this.props.children}
        </div>
      </StyleRoot>
    );
  }
}
