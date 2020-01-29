import React from "react";
import VideoLoop from "./video_loop/video_loop";

export default arg => {
  switch (arg.match.params.id) {
    case "VideoLoop":
      return <VideoLoop />;
  }
};
