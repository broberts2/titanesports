import React from "react";
import Components from "../../components";
import "./window.css";
import "./animations.css";

const Videos = require("./videos.js");

class VideoLoop extends React.Component {
  state = {
    displayLogin: false,
    autoPlayCycleDuration: 24000,
    domMounted: false,
    videoIndex: 1,
    video2Class: "",
    video1: this.createVideo(0),
    video2: this.createVideo(1),
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
      videoIndex,
    });
    this.setState({
      [video]: this.createVideo(videoIndex),
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
    const waiter = (num) =>
      new Promise((resolve, reject) => setTimeout(() => resolve(), num));
    this.autoPlay(waiter);
    this.intervalId = setInterval(
      () => this.autoPlay(waiter),
      this.state.autoPlayCycleDuration
    );
  }

  render() {
    return (
      <div>
        <div style={{ width: "100%", position: "absolute" }}>
          {this.state.video1}
        </div>
        <div
          className={this.state.video2Class}
          style={{ width: "100%", position: "absolute" }}
        >
          {this.state.video2}
        </div>
      </div>
    );
  }
}

class Window extends React.Component {
  render() {
    const _rowBalance = "14.5px";
    return (
      <div className={"window"}>
        <VideoLoop />
        <div className={"content"}>
          <table>
            <tbody>
              <tr>
                <td>
                  <div className={"blue"}>
                    <table>
                      <tbody>
                        <tr>
                          {Object.values(this.props.state.data.blue.pick).map(
                            (el, i) => (
                              <td align="left">
                                <Components.Card
                                  state={this.props.state}
                                  id={i}
                                  blue
                                  simple={this.props.state.simple}
                                  championData={el ? el : null}
                                />
                              </td>
                            )
                          )}
                        </tr>
                      </tbody>
                    </table>
                    <table style={{ marginLeft: _rowBalance }}>
                      <tbody>
                        <tr>
                          {Object.values(this.props.state.data.blue.ban).map(
                            (el, i) => (
                              <td align="left">
                                <Components.Card
                                  state={this.props.state}
                                  id={i + 10}
                                  blue
                                  simple={this.props.state.simple}
                                  banned
                                  championData={el ? el : null}
                                />
                              </td>
                            )
                          )}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </td>
                <td width={"10%"}>
                  <div className={"vs"}>
                    <img
                      src={require("../../img/vs_bilgewater.png")}
                      style={{ width: "100%" }}
                    />
                  </div>
                </td>
                <td>
                  <div className={"red"}>
                    <table>
                      <tbody>
                        <tr>
                          {Object.values(this.props.state.data.red.pick).map(
                            (el, i) => (
                              <td align="right">
                                <Components.Card
                                  state={this.props.state}
                                  id={i + 5}
                                  simple={this.props.state.simple}
                                  championData={el ? el : null}
                                />
                              </td>
                            )
                          )}
                        </tr>
                      </tbody>
                    </table>
                    <table style={{ marginRight: _rowBalance }}>
                      <tbody>
                        <tr>
                          {Object.values(this.props.state.data.red.ban).map(
                            (el, i) => (
                              <td align="right">
                                <Components.Card
                                  state={this.props.state}
                                  id={i + 15}
                                  simple={this.props.state.simple}
                                  banned
                                  championData={el ? el : null}
                                />
                              </td>
                            )
                          )}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Window;
