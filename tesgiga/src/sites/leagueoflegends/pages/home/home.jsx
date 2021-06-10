import React from "react";
import { Grid, ThemeProvider, Box } from "@material-ui/core";
import Components from "components/index";
import Labels from "../../../../labels/index";
import Style from "./style";

export default (props) => {
  const classes = Style();
  const Card = (props) => {
    return (
      <Grid item xs={6} md={4} lg={2} xl={2} align="flex">
        <Components.InteractiveCard
          anim={props.anim}
          delay={props.delay}
          disabled={props.disabled}
          fill
          onClick={() => props.onClick()}
        >
          <img className={classes.cardimg} src={props.src} />
          <Components.Typography className={classes.typographycardtext}>
            {props.title}
          </Components.Typography>
        </Components.InteractiveCard>
      </Grid>
    );
  };
  React.useEffect(() => props._());
  return (
    <ThemeProvider theme={Components.Themes.Dark}>
      <div className={classes.root}>
        <Components.Header cfg={"leagueoflegends"} setModal={props.setModal} />
        <Components.Banner
          top
          src={Labels.backgrounds.kindred}
          icon={Labels.images.comet}
        />
        <Components.Block style={{ display: "none" }}>
          Titan eSports Is An Amateur eSports Organization That Brings
          Competitive League of Legends Gameplay To All Skill Levels
        </Components.Block>
        <Grid
          container
          spacing={0}
          className={classes.majorsub2}
          align="center"
          justify="center"
        >
          <Card
            onClick={() => (window.location.href = "/statistics")}
            title={"Statistics"}
            src={Labels.images.sorcery}
          />
          <Card
            onClick={() => (window.location.href = "/titandraft")}
            title={"Titan Draft"}
            src={Labels.images.electrocute}
          />
          <Card
            onClick={() => (window.location.href = "/articles")}
            title={"News & Articles"}
            src={Labels.images.unsealedspellbook}
          />
          <Card
            onClick={() => (window.location.href = "/staff")}
            title={"TES Staff"}
            src={Labels.images.fleetfootwork}
          />
          <Card
            onClick={() => (window.location.href = "/applications")}
            title={"Applications"}
            src={Labels.images.scroll}
          />
        </Grid>
        <Components.TwitchEmbed />
        <Components.Block>Summer Leagues</Components.Block>
        <Grid
          container
          spacing={0}
          className={classes.majorsub2}
          align="center"
          justify="center"
        >
          <Card
            onClick={() => (window.location.href = "/divinity")}
            title={"Divinity"}
            src={Labels.images.gold}
          />
          <Card
            onClick={() => (window.location.href = "/conquerors")}
            title={"Conquerors"}
            src={Labels.images.diamond}
          />
        </Grid>
        <Components.Footer />
      </div>
    </ThemeProvider>
  );
};
