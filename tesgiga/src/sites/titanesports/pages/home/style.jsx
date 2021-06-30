import { makeStyles } from "@material-ui/core/styles";
import { blueGrey as primary } from "@material-ui/core/colors";
import Labels from "../../../../labels/index";

export default makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
    position: "relative",
    width: "100vw",
    height: "100vh",
    background: "no-repeat",
    backgroundSize: "cover",
    overflowX: "hidden",
    typography: {
      color: "red",
    },
  },
  typographywelcometitle: {
    color: "slategray",
    [theme.breakpoints.down("xs")]: {
      fontSize: theme.typography.h4.fontSize,
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: theme.typography.h2.fontSize,
    },
  },
  typographywelcometext: {
    color: theme.palette.background.main,
    [theme.breakpoints.down("xs")]: {
      fontSize: theme.typography.h6.fontSize,
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: theme.typography.h4.fontSize,
    },
  },
  typographycardtext: {
    [theme.breakpoints.up("sm")]: {
      fontSize: theme.typography.h4.fontSize,
    },
  },
  major: {
    padding: "40px",
    [theme.breakpoints.up("sm")]: {
      height: "100vh",
    },
  },
  majorsub: {
    height: "100%",
    width: "100%",
    paddingTop: "0px",
    paddingBottom: "25px",
  },
  majorsub2: {
    height: "100%",
    width: "100%",
  },
  card: {
    paddingBottom: "25px",
  },
  items: {
    marginTop: "25px",
  },
  grid: {
    position: "relative",
  },
  gridpanel: {
    padding: "15px",
  },
  logo: {
    width: "50%",
  },
  cardimg: {
    width: "50%",
  },
  backgroundvideo: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
}));
