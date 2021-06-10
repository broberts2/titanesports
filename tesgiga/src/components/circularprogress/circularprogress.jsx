import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Style from "./style";

export default (props) => {
  const classes = Style();
  return <CircularProgress {...props} />;
};
