import React, { Component } from "react";

class AudioButton extends Component {
  state = { audio: null };

  async componentDidMount() {
    const sound = await require("../audio/music/tidecaller.mp3");
    let audio = await new Audio(sound);
    audio.pause();
    audio.currentTime = 0;
    audio.volume = 0.1;
    audio.play();
  }

  render() {
    return <div className={"audio_button"} />;
  }
}

export default AudioButton;
