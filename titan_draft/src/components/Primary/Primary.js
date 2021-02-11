import React from "react";
import styled from "styled-components";
import Header from "./Header/Header";
import Timer from "./Timer/Timer";
import Grid from "./Grid/Grid";
import _Background from "./Background/Background";
import FlipCard from "./FlipCard/FlipCard";

const Primary = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const Cavas = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: black;
  opacity: ${(props) => props.canvasOpacity};
  z-index: 999;
  pointer-events: none;
  transition: all 0.5 ease;
`;

export default class _ extends React.Component {
  state = {
    videoLoaded: false,
    loadSelf: false,
    canvasOpacity: 0,
  };

  runCanvas() {
    this.setState({ canvasOpacity: 0.75 });
    setTimeout(() => this.setState({ canvasOpacity: 0 }), 3250);
  }

  componentWillReceiveProps(newProps) {
    if (
      newProps.STATE.flipCardImg &&
      newProps.STATE.flipCardImg !== this.props.STATE.flipCardImg
    ) {
      this.runCanvas();
    } else if (this.props.STATE.loadPrimary !== newProps.STATE.loadPrimary)
      setTimeout(() => this.setState({ loadSelf: true }), 1000);
  }

  render() {
    return (
      <Primary>
        <_Background
          setVideoLoaded={() => this.setState({ videoLoaded: true })}
          STATE={this.props.STATE}
        />
        {this.state.videoLoaded && this.state.loadSelf ? (
          <React.Fragment>
            <Header STATE={this.props.STATE} />
            <Timer STATE={this.props.STATE} />
            <Grid STATE={this.props.STATE} />
          </React.Fragment>
        ) : null}
        <Cavas
          canvasOpacity={
            this.props.STATE.draftData.EVENTS_LOG.length >= 20
              ? 0
              : this.state.canvasOpacity
          }
        />
        <FlipCard STATE={this.props.STATE} />
      </Primary>
    );
  }
}
