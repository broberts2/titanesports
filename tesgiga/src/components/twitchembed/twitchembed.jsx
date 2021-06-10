import React from "react";
import ReactPlayer from "react-player";
import Components from "components/index";
import Style from "./style";

export default (props) => {
  const classes = Style();
  return (
    <div className={classes.root}>
      <Components.Box
        display={"flex"}
        style={{ height: "100%", textAlign: "center" }}
        justifyContent="center"
      >
        <ReactPlayer
          url={"https://www.twitch.tv/titanesportz"}
          width={"100%"}
          height={"100%"}
          style={{ maxWidth: "inherit" }}
          controls
        />
      </Components.Box>
    </div>
  );
};
