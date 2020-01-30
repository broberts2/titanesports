import React from "react";
import VideoLoop from "./video_loop/video_loop";
import VideoButton from "./video_loop/video_loop";

export default arg => {
  switch (arg.match.params.id) {
    case "VideoLoop":
      return <VideoLoop />;
    case "VideoButton1":
      return (
        <VideoButton src={require("./video_button/videos/abstract_blue.mp4")} />
      );
  }
};
