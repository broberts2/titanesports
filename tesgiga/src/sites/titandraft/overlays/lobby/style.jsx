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
  item: {
    width: "100%",
    height: "100%",
  },
}));
