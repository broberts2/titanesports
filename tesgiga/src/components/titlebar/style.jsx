import { makeStyles } from "@material-ui/core/styles";

export default (props) =>
  makeStyles((theme) => ({
    root: {
      marginLeft: `calc(${props.width}/${21 * (45 / props.skew)})`,
      marginRight: `calc(${props.width}/${-21 * (45 / props.skew)})`,
    },
    bar: {
      display: "inline-block",
      position: "relative",
      width: props.width,
      height: props.height,
      transform: `skew(${props.skew}deg)`,
      overflow: "hidden",
      border: "1px solid black",
    },
    video: {
      transform: "skew(0deg)",
      width: "100%",
      height: "150%",
      objectFit: "cover",
      position: "absolute",
      top: 0,
      left: 0,
      opacity: 1,
      zIndex: 9,
    },
    typography: {
      fontWeight: 800,
      margin: "10px",
      fontSize: `calc(${props.height}/1.5)`,
      position: "relative",
      zIndex: 10,
      marginTop: "0px",
      marginBottom: "0px",
      transform: `skew(0deg)`,
      transform: `skew(${-props.skew}deg)`,
    },
  }));
