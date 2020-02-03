import React from "react";
import { VideoButton, FontAwesomeIcon } from "arclight-react";
import "./video_button.css";

export default function VButton(props) {
  return (
    <div className={"video_button"}>
      <VideoButton
        style={"c"}
        pos={"top"}
        data={{
          src: props.src,
          type: "video/mp4",
          cnt: (
            <div className={"banner"}>
              <div className="GoldBkg" style={{ height: "80px" }}>
                <div className="BlockTitle">
                  <i
                    className="fas fa-user-plus"
                    style={{ paddingRight: "5px" }}
                  ></i>
                  New Members
                </div>
                <div className="BlockText">
                  New to TES? Click here to get a valet tour of what we offer.
                </div>
              </div>
            </div>
          )
        }}
      />
    </div>
  );
}
