import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Style from "./style";

export default (props) => {
  const classes = Style(props)();
  return (
    <div className={classes.root}>
      <div className={classes.page}>
        <CircularProgress size={120} className={classes.spinner} />
      </div>
    </div>
  );
};
