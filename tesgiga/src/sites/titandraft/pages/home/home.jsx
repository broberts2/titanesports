import React from "react";
import { ThemeProvider } from "@material-ui/core";
import Components from "components/index";
import Labels from "labels/index";
import Overlays from "../../overlays/index";
import State from "../../state/index";
import Style from "./style";

export default (props) => {
  const classes = Style();
  React.useEffect(() => props._());
  return (
    <ThemeProvider theme={Components.Themes.Dark}>
      <div className={classes.root}>
        <video
          src={Labels.backgroundvideos.background1}
          className={classes.bgVideo}
          autoPlay
          muted
          loop
        />
        <Overlays.DraftUI />
      </div>
    </ThemeProvider>
  );
};
