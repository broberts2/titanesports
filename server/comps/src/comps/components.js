import React from "react";
import Api from "./front_end_api/front_end_api";
import VideoLoop from "./video_loop/video_loop";
import VideoButton from "./video_button/video_button";

export default arg => {
  switch (arg.match.params.id) {
    case "Api":
      return Api;
    case "VideoLoop":
      return <VideoLoop />;
    case "VideoButton1":
      return (
        <div style={{ width: "500px", height: "400px" }}>
          <VideoButton
            src={require("./video_button/videos/abstract_blue.mp4")}
          />
        </div>
      );
  }
};
