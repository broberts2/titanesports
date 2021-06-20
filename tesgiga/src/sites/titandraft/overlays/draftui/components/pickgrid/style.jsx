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
      cursor: "pointer",
      position: "relative",
      padding: "1px",
      "& img": {
        width: "100%",
      },
    },
    controls: {
      width: "100%",
      position: "absolute",
      padding: "40px",
      top: "-110px",
    },
    title: {
      position: "absolute",
      bottom: 0,
      padding: "10px",
    },
    position: {
      width: "100%",
    },
  }));
