import React, { Component } from "react";
import { AwesomeButton } from "react-awesome-button";

const videos = require("../_videos.js");

const _video = video => {
  return (
    <video key={video} muted={true} width={"100%"} preload="auto" loop autoPlay>
      <source src={video} type={"video/webm"} />
    </video>
  );
};

class VideoBackground extends Component {
  exclusions = [0, 1, 2, 3];

  state = {
    videoIndex1: this.setIndex(),
    videoIndex2: this.setIndex(),
    loaded: false
  };

  setIndex() {
    let rand = 0;
    do {
      rand = Math.floor(Math.random() * videos.length);
    } while (this.exclusions.includes(rand));
    this.exclusions.shift();
    this.exclusions.push(rand);
    return rand;
  }

  async componentDidMount() {
    await Promise.all(videos.map(el => el));
    this.setState({ loaded: true });
    const interval = 20000;
    this.interval = setInterval(async () => {
      this.setState({
        videoIndex1: this.setIndex()
      });
      setTimeout(() => {
        this.setState({
          videoIndex2: this.setIndex()
        });
      }, interval / 2);
    }, interval);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className={"background-video"}>
        <div style={{ zIndex: 2 }} className={"fade-loop"}>
          {_video(videos[this.state.videoIndex2])}
        </div>
        <div style={{ zIndex: 1 }}>
          {_video(videos[this.state.videoIndex1])}
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default VideoBackground;
