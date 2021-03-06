import React from "react";
import Components from "components/index";
import FlashPoll from "../flashpoll/flashpoll";
import Style from "./style";

export default (props) => {
  const classes = Style();
  return (
    <div className={classes.root}>
      <FlashPoll />
    </div>
  );
};
