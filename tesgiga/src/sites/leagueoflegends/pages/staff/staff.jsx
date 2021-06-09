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
        <Components.Ruby src={Labels.images.fleetfootwork} />
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
            duty: "League Operations",
          },
        ])}
        {buildSection("Directors", [
          {
            img: Labels.images.fleetfootwork,
            discordId: "91010124667183104",
            name: "Braer",
            title: "Director",
            duty: "Game Development",
          },
          {
            img: Labels.images.fleetfootwork,
            discordId: "650848077766459426",
            name: "DontEatBees",
            title: "Director",
            duty: "League Director",
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
            discordId: "715789607358169119",
            name: "Mute",
            title: "Director",
            duty: "League Director",
          },
          {
            img: Labels.images.fleetfootwork,
            discordId: "538489444064428042",
            name: "Qurkii",
            title: "Director",
            duty: "Finance",
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
            discordId: "563966121578070018",
            name: "Khyroe",
            title: "Developer",
            duty: "Content Developer",
          },
          {
            img: Labels.images.fleetfootwork,
            discordId: "801913137497374752",
            name: "LolGermRat",
            title: "Developer",
            duty: "Information Technology",
          },
          {
            img: Labels.images.fleetfootwork,
            discordId: "679912644852973592",
            name: "Poptartism",
            title: "Developer",
            duty: "Graphic Design",
          },
        ])}
        {buildSection("Staff", [
          {
            img: Labels.images.fleetfootwork,
            discordId: "850209060753899550",
            name: "Kappa Krusader",
            title: "Staff",
            duty: "Moderator",
          },
        ])}
        {buildSection("SHOUTCASTERS", [
          {
            img: Labels.images.fleetfootwork,
            name: "JangoUltimus",
            title: "Shoutcaster",
            duty: "",
          },
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
