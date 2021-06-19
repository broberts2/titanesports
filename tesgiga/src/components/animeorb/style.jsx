import { makeStyles } from "@material-ui/core/styles";

export default (props) =>
  makeStyles((theme) => ({
    root: {
      width: `${props.size}`,
      height: `${props.size}`,
      borderRadius: "50%",
      overflow: "hidden",
      border: "1px solid black",
      position: "relative",
    },
    video: {
      opacity: 0.9,
      height: "100%",
    },
  }));
