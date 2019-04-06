import React, { Component } from "react";

const videos = [
  require("../webm/champion-garen-godking-animated.webm"),
  require("../webm/animated-darkstar-thresh.webm"),
  require("../webm/c-o-animated-azir.mp4"),
  require("../webm/c-o-animated-zoe-base.mp4"),
  require("../webm/c-o-animated-aprilfools-2015.mp4"),
  require("../webm/c-o-animated-aurelionsol.mp4"),
  require("../webm/c-o-animated-nunu.mp4"),
  require("../webm/c-o-animated-taliyah.mp4"),
  require("../webm/c-o-champion-akali-animated-splash.mp4"),
  require("../webm/c-o-champion-leona-eclipse-screensaver.mp4")
];

const _video = video => {
  return (
    <video key={video} width={"100%"} preload="auto" loop autoPlay>
      <source src={video} type={"video/webm"} />
    </video>
  );
};

class VideoBackground extends Component {
  state = {
    videoIndex1: this.setIndex(),
    videoIndex2: this.setIndex()
  };

  setIndex() {
    return Math.floor(Math.random() * videos.length);
  }

  componentDidMount() {
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
        {_video(videos[this.state.videoIndex1])}
        <div className={"fade-loop"}>
          {_video(videos[this.state.videoIndex2])}
        </div>
      </div>
    );
  }
}

export default VideoBackground;
