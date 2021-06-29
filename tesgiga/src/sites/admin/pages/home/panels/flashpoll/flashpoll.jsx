import React from "react";
import Components from "components/index";
import Style from "./style";

export default (props) => {
  const classes = Style();
  return (
    <div className={classes.root}>
      <Components.OracleCommands.FlashPoll />
    </div>
  );
};
