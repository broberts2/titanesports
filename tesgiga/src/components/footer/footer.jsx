import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Components from "components/index";
import Style from "./style";
import { Button, Grid, Toolbar, Box } from "@material-ui/core";

export default (props) => {
  const classes = Style(props)();
  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        className={classes.appbar}
        elevation={props.transparent ? 0 : 15}
      >
        <Toolbar variant="dense">
          <Grid container>
            <Grid item xs={12}>
              <Box display="flex">
                <Components.Typography variant="h6" className={classes.title}>
                  Titan Esports © 2021
                </Components.Typography>
              </Box>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};
