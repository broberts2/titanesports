import { makeStyles } from "@material-ui/core/styles";
import Labels from "labels/index";

export default makeStyles((theme) => ({
  root: {
    width: "100vw",
    height: "100vh",
    position: "relative",
  },
  bgVideo: {
    opacity: 1,
    top: 0,
    left: 0,
    position: "absolute",
    width: "100%",
    height: "100%",
    objectFit: "fill",
  },
}));
