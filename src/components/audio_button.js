import React, { Component } from "react";

class AudioButton extends Component {
  componentDidMount() {
    document.getElementById("audio_button").volume = 0.1;
  }

  render() {
    return (
      <div className={"audio_button"}>
        <audio
          id={"audio_button"}
          id={"audio_button"}
          src={require("../audio/music/tidecaller.mp3")}
          type={"audio/mpeg"}
          autoPlay
          loop
        />
      </div>
    );
  }
}

export default AudioButton;
