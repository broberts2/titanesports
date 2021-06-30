import React from "react";
import { Box, Grid, ThemeProvider } from "@material-ui/core";
import Components from "components/index";
import Labels from "../../../../labels/index";
import Style from "./style";

export default (props) => {
  const classes = Style();
  const Card = (props) => (
    <Components.InteractiveCard
      fill
      onClick={() =>
        props.data.id && false
          ? window.open(`https://discord.com/channels/@me/${props.data.id}`)
          : null
      }
    >
      <Box className={classes.card}>
        <img className={classes.cardimg} src={props.data.img} />
        <Components.Typography className={classes.typographyh2} variant="h4">
          <b>{props.data.name}</b>
        </Components.Typography>
        <Components.Typography className={classes.typographyh3} variant="h6">
          {props.data.title}
        </Components.Typography>
        <Components.Typography className={classes.typographyh4} variant="h5">
          {props.data.duty}
        </Components.Typography>
      </Box>
    </Components.InteractiveCard>
  );
  const buildSection = (title, data) => {
    return (
      <React.Fragment>
        <Components.Title>{title}</Components.Title>
        <Grid container>
          {data
            .sort((el1, el2) => (el1.name < el2.name ? -1 : 1))
            .map((el) => (
              <Grid item xs={6} lg={3}>
                <Card
                  data={{
                    img: el.img,
                    id: el.discordId,
                    name: el.name,
                    title: el.title,
                    duty: el.duty,
                  }}
                />
              </Grid>
            ))}
        </Grid>
      </React.Fragment>
    );
  };
  React.useEffect(() => props._());
  return (
    <ThemeProvider theme={Components.Themes.Dark}>
      <div className={classes.root}>
        <Components.Header cfg={"leagueoflegends"} setModal={props.setModal} />
        <Components.Ruby src={"faUserFriends"} />
        <Components.Blurb title={"TES Staff"}>
          Welcome to the TES staff page. Here you will find all staff members
          responsible for TES - League of Legends operations.
        </Components.Blurb>
        {buildSection("Administrators", [
          {
            img: Labels.images.fleetfootwork,
            discordId: "405139546305593346",
            name: "Phortwenty",
            title: "Administrator",
            duty: "Operations",
          },
        ])}
        {buildSection("Directors", [
          {
            img: Labels.images.fleetfootwork,
            discordId: "650848077766459426",
            name: "DontEatBees",
            title: "Director",
            duty: "Divinity League Director",
          },
          {
            img: Labels.images.fleetfootwork,
            name: "JangoUltimus",
            title: "Director",
            duty: "Media Director",
          },
          {
            img: Labels.images.fleetfootwork,
            discordId: "84522855248691200",
            name: "Jetgorilla",
            title: "Director",
            duty: "Programming & APIs",
          },
          {
            img: Labels.images.fleetfootwork,
            discordId: "563966121578070018",
            name: "Khyroe",
            title: "Developer",
            duty: "Content Director",
          },
          {
            img: Labels.images.fleetfootwork,
            discordId: "715789607358169119",
            name: "Mute",
            title: "Director",
            duty: "Conqueror League Director",
          },
          {
            img: Labels.images.fleetfootwork,
            discordId: "610630704652353579",
            name: "Sammy2Slap",
            title: "Director",
            duty: "Roster Staff",
          },
          {
            img: Labels.images.fleetfootwork,
            discordId: "660741480834662415",
            name: "Zerobii",
            title: "Director",
            duty: "Player Integrity",
          },
        ])}
        {buildSection("Developers", [
          {
            img: Labels.images.fleetfootwork,
            discordId: "801913137497374752",
            name: "Hawk",
            title: "Developer",
            duty: "Content Creator",
          },
          {
            img: Labels.images.fleetfootwork,
            discordId: "801913137497374752",
            name: "S10 Survivor",
            title: "Developer",
            duty: "Content Creator",
          },
          {
            img: Labels.images.fleetfootwork,
            discordId: "801913137497374752",
            name: "SHOTDUCK",
            title: "Developer",
            duty: "Content Creator",
          },
          {
            img: Labels.images.fleetfootwork,
            discordId: "801913137497374752",
            name: "Uhavedaddyissues",
            title: "Developer",
            duty: "Content Creator",
          },
        ])}
        {buildSection("Staff", [
          {
            img: Labels.images.fleetfootwork,
            discordId: "850209060753899550",
            name: "Batman",
            title: "Staff",
            duty: "Player Integrity",
          },
          {
            img: Labels.images.fleetfootwork,
            discordId: "850209060753899550",
            name: "Kappa Krusader",
            title: "Staff",
            duty: "Moderator",
          },
          {
            img: Labels.images.fleetfootwork,
            discordId: "850209060753899550",
            name: "SEMZ",
            title: "Staff",
            duty: "Roster Staff",
          },
          {
            img: Labels.images.fleetfootwork,
            discordId: "850209060753899550",
            name: "Stunflower",
            title: "Staff",
            duty: "Roster Staff",
          },
        ])}
        {buildSection("SHOUTCASTERS", [
          {
            img: Labels.images.fleetfootwork,
            name: "MannyOrSonny",
            title: "Shoutcaster",
            duty: "",
          },
        ])}
        <Components.Footer />
      </div>
    </ThemeProvider>
  );
};
