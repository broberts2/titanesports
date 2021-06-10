import React from "react";
import ReactPlayer from "react-player";
import Style from "./style";

export default (props) => {
  const classes = Style;
  return <ReactPlayer url={"https://www.twitch.tv/titanesportz"} controls />;
};
