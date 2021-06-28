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
  tLogo: {
    width: "100%",
  },
  vs: { width: "100%", textAlign: "center" },
  teamname: {
    fontWeight: 800,
  },
  readyribbon: {
    border: "1px solid black",
    textAlign: "center",
    position: "absolute",
    width: "500px",
    padding: "25px",
    overflow: "hidden",
  },
  video: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    position: "absolute",
    left: 0,
    top: 0,
    zIndex: -1,
  },
  blue: {
    left: "-125px",
    top: "25px",
    transform: "rotate(-25deg)",
  },
  red: {
    right: "-125px",
    top: "25px",
    transform: "rotate(25deg)",
  },
  crown: {
    width: "150px",
    position: "absolute",
    left: "50%",
    top: "150px",
    transform: "translate(-50%,-50%)",
  },
}));
