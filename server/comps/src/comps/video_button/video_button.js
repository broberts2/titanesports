import React from "react";
import { VideoButton } from "arclight-react";

export default function VButton(props) {
  return (
    <VideoButton
      style={"a"}
      data={{
        src: props.src,
        type: "video/mp4"
      }}
    />
  );
}
