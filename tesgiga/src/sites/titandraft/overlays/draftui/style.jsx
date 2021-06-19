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
    overflow: "hidden",
  },
  innerroot: {
    position: "relative",
    width: "100%",
    height: "100%",
    maxWidth: "2000px",
    margin: "auto",
  },
}));
