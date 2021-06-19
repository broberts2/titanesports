import { makeStyles } from "@material-ui/core/styles";
import Labels from "labels/index";

export default makeStyles((theme) => ({
  root: {
    color: theme.palette.background.default,
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
  },
  innerroot: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  body: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
  },
  baddraftImg: {
    width: "50%",
  },
  baddraftTypographyTitle: {
    [theme.breakpoints.down("md")]: {
      fontSize: `calc(${theme.typography.h3.fontSize}/1.5)`,
    },
  },
}));
