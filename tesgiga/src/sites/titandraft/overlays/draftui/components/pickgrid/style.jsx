import { makeStyles } from "@material-ui/core/styles";
import Labels from "labels/index";

export default (props) =>
  makeStyles((theme) => ({
    root: {
      width: "calc(100% - 10px)",
      marginLeft: "5px",
      marginBottom: "5px",
      maxHeight: "50%",
      padding: "30px",
    },
    item: {
      position: "relative",
      padding: "2px",
      "& img": {
        width: "100%",
      },
    },
    controls: {
      width: "100%",
      position: "absolute",
      padding: "40px",
      top: "-95px",
    },
    title: {
      position: "absolute",
      bottom: 0,
      padding: "10px",
    },
    position: {
      width: "50px",
      display: "inline-block",
    },
  }));
