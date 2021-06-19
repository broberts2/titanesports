import { makeStyles } from "@material-ui/core/styles";
import Labels from "labels/index";

export default (props) =>
  makeStyles((theme) => ({
    root: {
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      position: "absolute",
      width: `${props.size}vh`,
      height: `${props.size}vh`,
      display: "none",
    },
    rotating: {
      "-webkit-animation": "rotating 2s linear infinite",
    },
    "@-webkit-keyframes rotating": {
      from: {
        "-webkit-transform": "rotate(0deg)",
      },
      to: {
        "-webkit-transform": "rotate(360deg)",
      },
    },
  }));
