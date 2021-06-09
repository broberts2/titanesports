import React from "react";
import Box from "@material-ui/core/Box";
import Style from "./style";

export default (props) => {
  const classes = Style();
  return <Box {...props}>{props.children}</Box>;
};
