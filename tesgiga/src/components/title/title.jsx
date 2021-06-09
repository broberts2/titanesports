import { Box } from "@material-ui/core";
import React from "react";
import Components from "components/index";
import Style from "./style";

export default (props) => {
  const classes = Style();
  return (
    <Box className={classes.root}>
      <Components.Typography className={classes.title} variant="h3">
        {props.children}
      </Components.Typography>
    </Box>
  );
};
