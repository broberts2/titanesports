import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ThemeProvider,
} from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import TimelineSharpIcon from "@material-ui/icons/TimelineSharp";
import OndemandVideoSharpIcon from "@material-ui/icons/OndemandVideoSharp";
import PanoramaOutlinedIcon from "@material-ui/icons/PanoramaOutlined";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import GamesRoundedIcon from "@material-ui/icons/GamesRounded";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import SettingsApplicationsRoundedIcon from "@material-ui/icons/SettingsApplicationsRounded";
import GroupWorkRoundedIcon from "@material-ui/icons/GroupWorkRounded";
import PeopleRoundedIcon from "@material-ui/icons/PeopleRounded";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import ShareRoundedIcon from "@material-ui/icons/ShareRounded";
import Divider from "@material-ui/core/Divider";
import Components from "components/index";
import _GlobalActions from "globalactions/index";
import Panels from "./panels/index";
import Style from "./style";

const GlobalActions = _GlobalActions("admin");

const panelSelector = (conditions) => {
  if (conditions.isAuth) {
    if (
      conditions.displayService === "Oracle" &&
      conditions.displayName === "Discord"
    ) {
      return <Panels.OracleDiscord />;
    } else if (
      conditions.displayService === "Oracle" &&
      conditions.displayName === "League of Legends"
    ) {
      return <Panels.OracleLeagueOfLegends />;
    } else if (
      conditions.displayService === "Oracle" &&
      conditions.displayName === "Social Media"
    ) {
      return <Panels.OracleSocialMedia />;
    } else if (conditions.displayService === "OBS Streamlabs") {
      return <Panels.OBSStreamlabs />;
    } else if (conditions.displayService === "Team Manager") {
      return <Panels.TeamManager />;
    } else if (conditions.displayService === "Player Manager") {
      return <Panels.PlayerManager />;
    } else if (conditions.displayService === "Media Manager") {
      return <Panels.MediaManager />;
    } else if (conditions.displayService === "Team Applications - Divinity") {
      return (
        <Panels.Applications
          callout="Team Applications - Divinity"
          component={"TeamApplication_Divinity"}
        />
      );
    } else if (conditions.displayService === "Team Applications - Conquerors") {
      return (
        <Panels.Applications
          callout="Team Applications - Conquerors"
          component={"TeamApplication_Conquerors"}
        />
      );
    } else if (conditions.displayService === "Staff Applications") {
      return (
        <Panels.Applications
          callout="Staff Applications"
          component={"StaffApplication"}
        />
      );
    } else if (conditions.displayService === "Community Feedback") {
      return (
        <Panels.Applications
          callout="Community Feedback"
          component={"Feedback"}
        />
      );
    }
  } else {
    if (conditions.isAuth === 0) {
      return <Panels.AccessDenied />;
    } else {
      return <Panels.SignIn />;
    }
  }
};

const items = (
  classes,
  displayName,
  setDisplayName,
  setDisplayService,
  gsAccordion,
  setGsAccordion,
  setModal,
  isAuth
) => {
  const listItem = (key, displayName, icon, inactive) => (
    <ListItem
      className={classes.listitem}
      style={inactive ? { opacity: 0.3, pointerEvents: "none" } : {}}
      button
      key={key}
      onClick={() => {
        setDisplayName(displayName);
        setGsAccordion(false);
      }}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={displayName} />
    </ListItem>
  );
  return [
    isAuth
      ? {
          icon: <GamesRoundedIcon />,
          accordion: (
            <Accordion
              expanded={gsAccordion}
              onClick={() => setGsAccordion(!gsAccordion)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Components.Typography>Games & Services</Components.Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  {listItem(
                    "li0",
                    "Discord",
                    <SettingsApplicationsRoundedIcon />
                  )}
                  {listItem("li1", "League of Legends", <SportsEsportsIcon />)}
                  {listItem("li2", "Social Media", <ShareRoundedIcon />)}
                  {listItem("li3", "Valorant", <SportsEsportsIcon />, true)}
                  {listItem(
                    "li4",
                    "World of Warcraft",
                    <SportsEsportsIcon />,
                    true
                  )}
                  {listItem("li5", "Valheim", <SportsEsportsIcon />, true)}
                </List>
              </AccordionDetails>
            </Accordion>
          ),
        }
      : null,
    isAuth
      ? {
          divider: true,
        }
      : null,
    isAuth &&
    (displayName === "Discord" ||
      displayName === "League of Legends" ||
      displayName === "Social Media")
      ? {
          text: "Oracle",
          icon: <TimelineSharpIcon />,
          cb: () => setDisplayService("Oracle"),
        }
      : null,
    isAuth && displayName === "League of Legends"
      ? {
          text: "OBS Streamlabs",
          icon: <OndemandVideoSharpIcon />,
          cb: () => setDisplayService("OBS Streamlabs"),
        }
      : null,
    isAuth && displayName === "League of Legends"
      ? {
          text: "Team Manager",
          icon: <GroupWorkRoundedIcon />,
          cb: () => setDisplayService("Team Manager"),
        }
      : null,
    isAuth && displayName === "League of Legends"
      ? {
          text: "Player Manager",
          icon: <PeopleRoundedIcon />,
          cb: () => setDisplayService("Player Manager"),
        }
      : null,
    isAuth && displayName === "League of Legends"
      ? {
          text: "Media Manager",
          icon: <PanoramaOutlinedIcon />,
          cb: () => setDisplayService("Media Manager"),
        }
      : null,
    isAuth && displayName === "League of Legends"
      ? {
          text: "Team Applications - Divinity",
          icon: <SupervisedUserCircleIcon />,
          cb: () => setDisplayService("Team Applications - Divinity"),
        }
      : null,
    isAuth && displayName === "League of Legends"
      ? {
          text: "Team Applications - Conquerors",
          icon: <SupervisedUserCircleIcon />,
          cb: () => setDisplayService("Team Applications - Conquerors"),
        }
      : null,
    isAuth && displayName === "League of Legends"
      ? {
          text: "Staff Applications",
          icon: <SupervisedUserCircleIcon />,
          cb: () => setDisplayService("Staff Applications"),
        }
      : null,
    isAuth && displayName === "League of Legends"
      ? {
          text: "Community Feedback",
          icon: <SupervisedUserCircleIcon />,
          cb: () => setDisplayService("Community Feedback"),
        }
      : null,
    isAuth
      ? {
          text: <div style={{ minWidth: "300px" }}>Sign Out</div>,
          icon: <ExitToAppRoundedIcon />,
          cb: () => GlobalActions.Utils.signOut(),
        }
      : {
          text: <div style={{ minWidth: "300px" }}>Sign In</div>,
          icon: <ExitToAppRoundedIcon />,
          cb: () => setModal({ state: true, body: "Login" }),
        },
  ];
};

export default (props) => {
  const classes = Style();
  const [displayName, setDisplayName] = React.useState("Discord");
  const [displayService, setDisplayService] = React.useState("Oracle");
  const [gsAccordion, setGsAccordion] = React.useState(false);
  const [isAuth, setIsAuth] = React.useState(null); // assign an object here with permissions on successful auth
  const listItems = (arr) => (
    <List>
      {arr
        .filter((el) => el)
        .map((el) =>
          el.divider ? (
            <Divider />
          ) : (
            <ListItem
              className={classes.listitem}
              button={!el.accordion}
              key={el.text}
              onClick={() => (el.cb ? el.cb() : null)}
            >
              <ListItemIcon>{el.icon}</ListItemIcon>
              {el.accordion ? el.accordion : <ListItemText primary={el.text} />}
            </ListItem>
          )
        )}
    </List>
  );
  React.useEffect(async () => {
    const permissions = await GlobalActions.Requests.getMyPermissions();
    const canAccess = () => {
      for (let key in permissions) {
        if (permissions[key]) {
          return true;
        }
      }
      return false;
    };
    if (permissions) {
      if (canAccess) {
        setIsAuth(permissions);
      } else {
        setIsAuth(0);
      }
    } else {
      setIsAuth(false);
    }
    props._();
  }, []);
  return (
    <ThemeProvider theme={Components.Themes.Dark}>
      <div className={classes.root}>
        <Box style={{ width: "100%", height: "100%" }} flexDirection="row">
          <Box style={{ width: "362.5px" }}>
            <Drawer variant="permanent" anchor={"left"}>
              {listItems(
                items(
                  classes,
                  displayName,
                  setDisplayName,
                  setDisplayService,
                  gsAccordion,
                  setGsAccordion,
                  props.setModal,
                  isAuth
                )
              )}
            </Drawer>
          </Box>
          {isAuth ? (
            <div className={classes.displayName}>
              <Components.Typography anim={"grow"} variant="h4">
                {displayName}
              </Components.Typography>
              <Components.Typography anim={"grow"} variant="h6">
                {displayService}
              </Components.Typography>
            </div>
          ) : null}
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            className={classes.content}
          >
            <div className={classes.innercontent}>
              {panelSelector({ isAuth, displayService, displayName })}
            </div>
          </Box>
        </Box>
      </div>
    </ThemeProvider>
  );
};
