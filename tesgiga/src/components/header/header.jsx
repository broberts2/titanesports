import React from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import MenuOpenRoundedIcon from "@material-ui/icons/MenuOpenRounded";
import Collapse from "@material-ui/core/Collapse";
import Components from "../../components/components";
import Labels from "../../labels/index";
import Style from "./style";
import myConfig from "../../config";
import { Button, Grid, IconButton, Toolbar, Box } from "@material-ui/core";
import _GlobalActions from "../../globalactions/index";

const cfg = (config, setModal) => {
  const GlobalActions = _GlobalActions();
  switch (config) {
    case "leagueoflegends":
      return {
        title: "League of Legends",
        img: Labels.images.leagueoflegends,
        redir: "/",
        controls: [
          {
            text: "Statistics",
            cb: () => (window.location.href = "/statistics"),
          },
          {
            text: "Titan Draft",
            cb: () => (window.location.href = "/titandraft"),
          },
          {
            text: "Articles",
            cb: () => (window.location.href = "/articles"),
          },
          { text: "Staff", cb: () => (window.location.href = "/staff") },
          {
            text: "Applications",
            cb: () => (window.location.href = "/applications"),
          },
          {
            text: GlobalActions.Utils.isSignedIn() ? "Sign Out" : "Sign In",
            cb: () =>
              GlobalActions.Utils.isSignedIn()
                ? GlobalActions.Utils.signOut()
                : setModal({ state: true, body: "Login" }),
          },
        ],
      };
  }
};

export default (props) => {
  const classes = Style(props)();
  const config = cfg(props.cfg, props.setModal);
  const [collapse, setCollapse] = React.useState(false);
  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        className={classes.appbar}
        elevation={props.transparent ? 0 : 15}
      >
        <Toolbar>
          <Grid container>
            <Grid item xs={4}>
              <Box display="flex">
                <IconButton
                  color="inherit"
                  onClick={() =>
                    (window.location = `${window.location.protocol}//${
                      window.location.host.split(".")[1]
                    }${myConfig.production ? ".org" : ""}`)
                  }
                >
                  <ArrowBackRoundedIcon />
                </IconButton>
                <img className={classes.logo} src={Labels.images.logo} />
                {config.img ? (
                  <div
                    className={classes.headerImg}
                    onClick={() => (window.location.href = config.redir)}
                  >
                    <img src={config.img} />
                  </div>
                ) : (
                  <Components.Typography
                    variant="h4"
                    className={classes.title}
                    onClick={() => (window.location.href = config.redir)}
                  >
                    {config.title}
                  </Components.Typography>
                )}
              </Box>
            </Grid>
            <Grid item xs={8} className={classes.buttons}>
              <Box className={classes.toolbarButtons}>
                {config.controls.map((el) => (
                  <Button
                    onClick={() => (el.cb ? el.cb() : null)}
                    color="inherit"
                  >
                    {el.text}
                  </Button>
                ))}
              </Box>
            </Grid>
            <Grid item xs={8} className={classes.buttonMobile}>
              <Box className={classes.mobile}>
                <IconButton
                  color="inherit"
                  onClick={() => setCollapse(!collapse)}
                >
                  <MenuOpenRoundedIcon />
                </IconButton>
              </Box>
            </Grid>
            <Collapse in={collapse}>
              <Grid item xs={12} className={classes.buttonMobile}>
                <Box className={classes.toolbarButtons}>
                  {config.controls.map((el) => (
                    <Button
                      onClick={() => (el.cb ? el.cb() : null)}
                      color="inherit"
                    >
                      {el.text}
                    </Button>
                  ))}
                </Box>
              </Grid>
            </Collapse>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};
