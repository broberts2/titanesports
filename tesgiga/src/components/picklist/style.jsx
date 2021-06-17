import { makeStyles } from "@material-ui/core/styles";

export default (props) =>
  makeStyles((theme) => ({
    root: {
      width: "100%",
      margin: "10px",
      marginLeft: "0px",
      marginRight: "0px",
      color: "red",
    },
    select: {
      color: props.invertColor ? theme.palette.background.default : "",
    },
    label: {
      color: props.invertColor ? theme.palette.background.default : "",
    },
  }));
