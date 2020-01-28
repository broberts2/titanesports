import React from "react";
import { connect } from "react-redux";
import Components from "../../components";
import "./video_loop.css";

const Videos = require("./videos.js");

const { read_cookie } = require("sfcookies");

const rand = Math.floor(Math.random() * Videos.length);

class VideoLoop extends React.Component {
  state = {
    displayLogin: false,
    autoPlayCycleDuration: 24000,
    domMounted: false,
    videoIndex: 1,
    video2Class: "",
    video1: this.createVideo(rand - 1 < 0 ? Videos.length - 1 : rand - 1),
    video2: this.createVideo(rand)
  };

  createVideo(index) {
    return (
      <video muted preload="auto" loop autoPlay>
        <source
          src={require(`./videos/${Videos[index].fileName}`)}
          type={Videos[index].type}
        />
      </video>
    );
  }

  renderVideo(video) {
    const videoIndex =
      this.state.videoIndex >= Videos.length - 1
        ? 0
        : this.state.videoIndex + 1;
    this.setState({
      [video]: null,
      videoIndex
    });
    this.setState({
      [video]: this.createVideo(videoIndex)
    });
  }

  async autoPlay(waiter) {
    await waiter(this.state.autoPlayCycleDuration / 4);
    this.setState({ video2Class: "anim-video-fade-in" });
    await waiter(this.state.autoPlayCycleDuration / 4);
    this.renderVideo("video1");
    await waiter(this.state.autoPlayCycleDuration / 4);
    this.setState({ video2Class: "anim-video-fade-out" });
    await waiter(this.state.autoPlayCycleDuration / 4);
    this.renderVideo("video2");
  }

  componentDidMount() {
    const displayLogin = read_cookie("titan_key").length > 0 ? false : true;
    const waiter = num =>
      new Promise((resolve, reject) => setTimeout(() => resolve(), num));
    this.setState({
      domMounted: true,
      displayLogin
    });
    this.autoPlay(waiter);
    this.intervalId = setInterval(
      () => this.autoPlay(waiter),
      this.state.autoPlayCycleDuration
    );
  }

  render() {
    return (
      <div className={"video_loop"}>
        <div className={`video1`}>{this.state.video1}</div>
        <div className={`video2 ${this.state.video2Class}`}>
          {this.state.video2}
        </div>
        {this.state.displayLogin ? (
          <div
            className={"button"}
            onClick={() => this.props.openModal(<Components.Login />)}
          >
            <div className={"content"}>
              <i className={"fas fa-user-lock"}></i>
              <h1>Sign In</h1>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default connect()(VideoLoop);
