import { Box } from "@material-ui/core";
import React from "react";
import Components from "components/index";
import Style from "./style";

export default (props) => {
  const classes = Style();
  return (
    <div className={classes.root}>
      <Box display="flex" width={"100%"} height={"100%"}>
        <Box m="auto">
          <Components.Ruby
            img
            src="https://static.wikia.nocookie.net/leagueoflegends/images/9/9e/Dark_Harvest_rune.png"
          />
          <Components.Block>
            Nice try sneaky. You're not allowed.
          </Components.Block>
        </Box>
      </Box>
    </div>
  );
};
