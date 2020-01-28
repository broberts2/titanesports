import React from "react";
import { VideoLoop } from "arclight-react";

export default function Loop() {
  return (
    <div style={{ height: "700px" }}>
      <VideoLoop duration={12000} videos={require("./videos")} />
    </div>
  );
}
