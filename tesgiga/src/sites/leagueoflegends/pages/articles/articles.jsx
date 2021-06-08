import React from "react";
import { ThemeProvider } from "@material-ui/core";
import Components from "../../../../components/components";
import Labels from "../../../../labels/index";
import Style from "./style";

export default (props) => {
  const classes = Style();
  React.useEffect(() => props._());
  return (
    <ThemeProvider theme={Components.Themes.Dark}>
      <div className={classes.root}>
        <Components.Header cfg={"leagueoflegends"} setModal={props.setModal} />
        <Components.Ruby src={Labels.images.unsealedspellbook} />
        <Components.Blurb title={"News & Staff Articles"}>
          Welcome to the TES News & Articles section! Here you find our newest
          announcements, schedules, and seasonal power rankings. You'll also
          find many short blogs from staff members here detailing what they've
          been up to.
        </Components.Blurb>
        <Components.Footer />
      </div>
    </ThemeProvider>
  );
};
