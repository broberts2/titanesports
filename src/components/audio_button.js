import React, { Component } from "react";

class AudioButton extends Component {
  componentDidMount() {
    document.getElementById("audio_button").volume = 0.05;
  }

  render() {
    return (
      <div className={"audio_button"}>
        <audio id={"audio_button"} autoPlay loop>
          <source
            id={"audio_button"}
            src={require("../audio/music/irelia.mp3")}
            type={"audio/mpeg"}
          />
        </audio>
      </div>
    );
  }
}

export default AudioButton;
